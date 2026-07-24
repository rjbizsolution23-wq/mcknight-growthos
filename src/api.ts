// ── McKnight GrowthOS — API layer ──────────────────────
// Stripe checkout + email lead capture + GoHighLevel CRM sync,
// edge-native (fetch only, no SDKs).
// Secrets via wrangler secret put (prod) / .dev.vars (local):
//   STRIPE_SECRET_KEY, RESEND_API_KEY, LEAD_NOTIFY_EMAIL, LEAD_FROM_EMAIL,
//   GHL_API_KEY, GHL_LOCATION_ID, GHL_PIPELINE_ID, GHL_STAGE_ID, GHL_WORKFLOW_ID
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { pushLeadToGHL, ghlStatus, ghlConfigured, type GhlEnv } from './ghl'
import { generateFunnelCopy, generateLeadInsights, generateSocialPosts, aiConfigured, type AiEnv } from './ai'
import { fanOutLead, hooksConfigured, type HooksEnv, type HookResult } from './hooks'
import { KNOWN_KEYS, KEY_GROUPS, isKnownKey, parseEnvFile, maskValue, cfg, invalidateVaultCache, loadVault } from './keys'
import { sendMail, mailProvidersConfigured, pickProvider, campaignHtml, type MailEnv } from './mail'
import { optimizeFunnelCopy, optimizeAllFunnels, getCopyOverrides, logAgent, type AgentEnv } from './agents'
import { FUNNEL_SLUGS, isFunnelSlug } from './funnels'
import { cfConfigured, cfVerify, deployFunnel, deleteDeployment, listDeployments, type CfEnv } from './cloudflare'
import { processChangeRequest, revertChangeRequest, listChangeRequests } from './changeagent'
import { FUNNEL_PARAMS, COMMON_PARAMS } from './paramschema'
import { TEMPLATES } from './templateRegistry'
import { zoomConfigured, zoomVerify, createZoomEvent, registerLead, listRegistrants, deleteZoomEvent, listStoredWebinars, findWebinarForFunnel, type ZoomEnv } from './zoom'
import { PIPELINES, BRANDS, LIFECYCLE_STAGES, HEALTH_FACTORS, healthBand, computeHealth, logActivity, convertLeadToClient, pipelineForFunnel, type ClientOsEnv } from './clientos'

type Bindings = GhlEnv & AiEnv & HooksEnv & {
  STRIPE_SECRET_KEY?: string
  RESEND_API_KEY?: string
  LEAD_NOTIFY_EMAIL?: string
  LEAD_FROM_EMAIL?: string
  ADMIN_API_KEY?: string
  DB?: D1Database
}

// ── v3.5: Enterprise security layer ─────────────────────────
// Admin gate: when ADMIN_API_KEY is set, lead data / links / insights
// require it (x-admin-key header, Bearer token, or ?key= for CSV links).
// When unset (fresh install), endpoints stay open so nothing bricks —
// /api/health reports adminLock:false so you know to set it.
const adminOK = (c: { env?: Bindings; req: { header: (k: string) => string | undefined; query: (k: string) => string | undefined } }): boolean => {
  const key = c.env?.ADMIN_API_KEY
  if (!key) return true
  const given = c.req.header('x-admin-key') || (c.req.header('authorization') || '').replace(/^Bearer\s+/i, '') || c.req.query('key') || ''
  if (given.length !== key.length) return false
  // constant-time compare
  let diff = 0
  for (let i = 0; i < key.length; i++) diff |= key.charCodeAt(i) ^ given.charCodeAt(i)
  return diff === 0
}
const requireAdmin = (c: any): Response | null =>
  adminOK(c) ? null : c.json({ ok: false, error: 'Unauthorized — provide x-admin-key header (ADMIN_API_KEY)' }, 401)

// Per-isolate sliding-window rate limiter for lead submissions (anti-abuse;
// each edge isolate keeps its own window — lightweight, no KV round-trip).
const rlMap = new Map<string, number[]>()
const rateLimited = (ip: string, limit = 10, windowMs = 60_000): boolean => {
  const now = Date.now()
  const hits = (rlMap.get(ip) || []).filter((t) => now - t < windowMs)
  if (hits.length >= limit) { rlMap.set(ip, hits); return true }
  hits.push(now)
  rlMap.set(ip, hits)
  if (rlMap.size > 5000) rlMap.clear() // memory guard
  return false
}

// ── v3.3: D1 lead persistence (never throws — funnels never break) ──
const funnelFromSource = (src: string | undefined): string => {
  const m = (src || '').match(/\/t\/([a-z0-9-]+)/i)
  return m ? m[1].toLowerCase() : (src || 'unknown').slice(0, 60)
}

const saveLeadToD1 = async (env: Bindings, clean: Record<string, string>, ghlContactId?: string): Promise<{ saved: boolean; id?: number }> => {
  if (!env.DB) return { saved: false }
  try {
    const r = await env.DB.prepare(
      `INSERT INTO leads (name, email, phone, funnel, source, utm_campaign, utm_source, utm_medium, ghl_contact_id, payload) VALUES (?,?,?,?,?,?,?,?,?,?)`
    ).bind(
      clean.name || null, clean.email || null, clean.phone || null,
      funnelFromSource(clean._source), clean._source || null,
      clean._utm_campaign || clean.utm_campaign || null,
      clean._utm_source || clean.utm_source || null,
      clean._utm_medium || clean.utm_medium || null,
      ghlContactId || null, JSON.stringify(clean).slice(0, 8000)
    ).run()
    return { saved: true, id: r.meta.last_row_id as number }
  } catch { return { saved: false } }
}

export const api = new Hono<{ Bindings: Bindings }>()
api.use('*', cors())

// ── v2.0: Key Vault middleware — merge D1-stored keys over env secrets on
// every API request, so keys uploaded from the UI instantly power ALL
// integrations (email, GHL, Stripe, hooks, admin lock) with zero redeploys.
api.use('*', async (c, next) => {
  try { (c as any).env = await cfg(c.env) } catch { /* env stays as-is */ }
  await next()
})

// ── POST /api/lead — capture funnel form + email notification ──
api.post('/lead', async (c) => {
  // v3.5: rate limit per IP (10/min) — stops bot floods, invisible to real users
  const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown'
  if (rateLimited(ip)) return c.json({ ok: false, error: 'Too many submissions — please wait a minute and try again.' }, 429)

  let data: Record<string, string>
  try {
    data = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'Invalid JSON body' }, 400)
  }

  // v3.5: honeypot — hidden "_website" field humans never see; bots fill it.
  // Silently accept (bot thinks it worked) but store/deliver nothing.
  if (typeof data._website === 'string' && data._website.trim()) {
    return c.json({ ok: true, delivered: true })
  }

  // Basic validation + sanitization
  const clean: Record<string, string> = {}
  for (const [k, v] of Object.entries(data)) {
    if (typeof v === 'string' && v.trim() && k.length <= 60) clean[k.slice(0, 60)] = v.trim().slice(0, 2000)
  }
  if (!Object.keys(clean).length) return c.json({ ok: false, error: 'Empty lead payload' }, 400)

  // ── GoHighLevel CRM sync (contact upsert → note → opportunity → workflow) ──
  // Runs first-class alongside email; never blocks or fails the lead.
  const ghl = await pushLeadToGHL(c.env, clean)

  // ── v3.3: permanent D1 storage → powers the /leads LeadFlow CRM CRM ──
  const db = await saveLeadToD1(c.env, clean, ghl.contactId)

  // ── v5.0: ClientOS bridge — every lead becomes a Client 360 record +
  // an opportunity in the correct brand pipeline. Fail-soft always.
  let clientos: { clientId?: number; opportunityId?: number; created?: boolean } | undefined
  try {
    const conv = await convertLeadToClient(c.env as unknown as ClientOsEnv, clean, db.id)
    if (conv.ok) clientos = { clientId: conv.clientId, opportunityId: conv.opportunityId, created: conv.created }
  } catch { /* leads must never break */ }

  // ── v4.0: Zoom auto-registration — if this funnel is linked to a webinar
  // (explicit _webinar field from the page, or a D1 webinar row with this
  // funnel slug), register the lead with Zoom and hand back their unique
  // join link. Fail-soft: Zoom problems never break the lead.
  let joinUrl: string | undefined
  let webinarReg: { zoomId: string; ok: boolean; error?: string } | undefined
  try {
    if (zoomConfigured(c.env as unknown as ZoomEnv) && clean.email) {
      let target: { zoom_id: string; kind: string } | null = null
      if (clean._webinar) {
        const row = await c.env?.DB?.prepare("SELECT zoom_id, kind FROM webinars WHERE zoom_id = ? AND status != 'deleted'").bind(clean._webinar.slice(0, 40)).first<any>()
        if (row) target = row
      }
      if (!target) {
        const funnel = (clean.funnel || funnelFromSource(clean._source) || '').slice(0, 60)
        if (funnel) target = await findWebinarForFunnel(c.env as unknown as ZoomEnv, funnel)
      }
      if (target) {
        const reg = await registerLead(c.env as unknown as ZoomEnv, target.zoom_id, target.kind || 'webinar', {
          email: clean.email,
          name: clean.name || [clean.firstName, clean.lastName].filter(Boolean).join(' ') || clean.email,
          phone: clean.phone
        })
        webinarReg = { zoomId: target.zoom_id, ok: reg.ok, error: reg.error }
        if (reg.ok && reg.joinUrl) joinUrl = reg.joinUrl
      }
    }
  } catch { /* fail-soft — leads must never break */ }

  // ── v3.4: Integration fan-out (Zapier/Make webhook, Slack, Discord,
  // Telegram, Twilio SMS, Airtable) — all configured channels fire in
  // parallel; failures are reported but never break the lead.
  let hooks: HookResult[] = []
  try { hooks = await fanOutLead(c.env, clean) } catch { /* never throws, belt+suspenders */ }
  const hooksOut = hooks.length ? Object.fromEntries(hooks.map((h) => [h.channel, h.ok ? true : (h.error || false)])) : undefined

  // ── v5.1: workflow → ClientOS timeline — every automation that fired for
  // this lead is recorded on the client's unified timeline. Fail-soft.
  try {
    if (clientos?.clientId) {
      const cid = clientos.clientId
      const coEnv = c.env as unknown as ClientOsEnv
      if (webinarReg?.ok) await logActivity(coEnv, cid, 'webinar', 'Registered for Zoom webinar', `Zoom ID ${webinarReg.zoomId}${joinUrl ? ' — unique join link issued' : ''}`, { actor: 'automation' })
      if (ghl.attempted && ghl.ok) await logActivity(coEnv, cid, 'system', 'Synced to GoHighLevel CRM', `Contact ${ghl.contactId || ''}`, { actor: 'automation' })
      const fired = hooks.filter((h) => h.ok).map((h) => h.channel)
      if (fired.length) await logActivity(coEnv, cid, 'system', 'Workflow notifications fired', fired.join(', '), { actor: 'automation' })
    }
  } catch { /* timeline is bonus — never break the lead */ }

  const key = c.env?.RESEND_API_KEY
  const to = c.env?.LEAD_NOTIFY_EMAIL || 'support@rjbusinesssolutions.org'
  const from = c.env?.LEAD_FROM_EMAIL || 'McKnight GrowthOS <onboarding@resend.dev>'

  if (!key) {
    // No email key configured — accept the lead so funnels never break,
    // flag that delivery is not wired yet.
    return c.json({ ok: true, delivered: false, stored: db.saved, leadId: db.id, joinUrl, webinar: webinarReg, clientos, hooks: hooksOut, ghl: ghl.attempted ? { synced: ghl.ok, contactId: ghl.contactId, error: ghl.error } : undefined, note: ghl.ok ? 'Lead synced to GoHighLevel. Set RESEND_API_KEY to also enable email delivery.' : 'Lead accepted. Set RESEND_API_KEY and/or GHL_API_KEY to enable delivery (see /integrations).' })
  }

  const rows = Object.entries(clean)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;color:#1e3a8a">${k}</td><td style="padding:6px 12px">${v.replace(/</g, '&lt;')}</td></tr>`)
    .join('')
  const htmlBody = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto">
      <div style="background:linear-gradient(135deg,#2563eb,#0ea5e9);padding:20px;border-radius:12px 12px 0 0">
        <h2 style="color:#fff;margin:0">🔥 New Funnel Lead</h2>
        <p style="color:#dbeafe;margin:4px 0 0;font-size:13px">McKnight GrowthOS · Powered by RJ Business Solutions</p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#f8fafc;border:1px solid #e2e8f0">${rows}</table>
      <p style="font-size:11px;color:#94a3b8;margin-top:12px">Source: ${(clean._source || 'funnel')} · ${new Date().toISOString()}</p>
    </div>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject: `🔥 New Lead — ${clean._source || 'McKnight GrowthOS'} (${clean.name || clean.email || 'unknown'})`, html: htmlBody })
  })
  if (!res.ok) {
    const err = await res.text()
    return c.json({ ok: true, delivered: false, stored: db.saved, leadId: db.id, joinUrl, webinar: webinarReg, clientos, hooks: hooksOut, ghl: ghl.attempted ? { synced: ghl.ok, contactId: ghl.contactId, error: ghl.error } : undefined, note: 'Lead accepted; email delivery failed', providerError: err.slice(0, 300) }, 200)
  }
  return c.json({ ok: true, delivered: true, stored: db.saved, leadId: db.id, joinUrl, webinar: webinarReg, clientos, hooks: hooksOut, ghl: ghl.attempted ? { synced: ghl.ok, contactId: ghl.contactId, opportunity: ghl.opportunity, workflow: ghl.workflow, error: ghl.error } : undefined })
})

// ── v3.4: GET /api/hooks/status — which fan-out channels are configured ──
api.get('/hooks/status', (c) => c.json({ ok: true, channels: hooksConfigured(c.env) }))

// ── v3.4: POST /api/hooks/test — send a test alert through every configured channel ──
api.post('/hooks/test', async (c) => {
  const cfg = hooksConfigured(c.env)
  const anyOn = Object.values(cfg).some(Boolean)
  if (!anyOn) return c.json({ ok: false, error: 'No integrations configured yet — set at least one secret (see /integrations).', channels: cfg }, 400)
  const results = await fanOutLead(c.env, {
    name: 'Integration Test',
    email: 'test@rjbusinesssolutions.org',
    phone: '+15055550100',
    _source: '/t/integration-test',
    _utm_campaign: 'hooks-test'
  })
  return c.json({ ok: results.every((r) => r.ok), results })
})

// ── v3.3: LeadFlow CRM CRM API (D1-backed) ─────────────────────
// GET /api/leads?funnel=&status=&q=&limit=&offset= — filtered list
api.get('/leads', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  const q = c.req.query()
  const limit = Math.min(parseInt(q.limit || '50', 10) || 50, 200)
  const offset = Math.max(parseInt(q.offset || '0', 10) || 0, 0)
  const conds: string[] = []
  const binds: unknown[] = []
  if (q.funnel) { conds.push('funnel = ?'); binds.push(q.funnel.slice(0, 60)) }
  if (q.status) { conds.push('status = ?'); binds.push(q.status.slice(0, 20)) }
  if (q.q) { conds.push('(name LIKE ? OR email LIKE ? OR phone LIKE ?)'); const like = `%${q.q.slice(0, 80)}%`; binds.push(like, like, like) }
  const where = conds.length ? `WHERE ${conds.join(' AND ')}` : ''
  const rows = await c.env.DB.prepare(`SELECT id, name, email, phone, funnel, utm_campaign, ghl_contact_id, status, created_at FROM leads ${where} ORDER BY id DESC LIMIT ? OFFSET ?`).bind(...binds, limit, offset).all()
  const total = await c.env.DB.prepare(`SELECT COUNT(*) as n FROM leads ${where}`).bind(...binds).first<{ n: number }>()
  return c.json({ ok: true, leads: rows.results, total: total?.n ?? 0, limit, offset })
})

// GET /api/leads/stats — dashboard numbers
api.get('/leads/stats', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  const [total, today, week, byFunnel, byStatus] = await Promise.all([
    c.env.DB.prepare('SELECT COUNT(*) as n FROM leads').first<{ n: number }>(),
    c.env.DB.prepare("SELECT COUNT(*) as n FROM leads WHERE created_at >= datetime('now','start of day')").first<{ n: number }>(),
    c.env.DB.prepare("SELECT COUNT(*) as n FROM leads WHERE created_at >= datetime('now','-7 days')").first<{ n: number }>(),
    c.env.DB.prepare('SELECT funnel, COUNT(*) as n FROM leads GROUP BY funnel ORDER BY n DESC LIMIT 10').all(),
    c.env.DB.prepare('SELECT status, COUNT(*) as n FROM leads GROUP BY status').all()
  ])
  return c.json({ ok: true, total: total?.n ?? 0, today: today?.n ?? 0, week: week?.n ?? 0, byFunnel: byFunnel.results, byStatus: byStatus.results })
})

// PATCH /api/leads/:id — update pipeline status
api.patch('/leads/:id', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  const id = parseInt(c.req.param('id'), 10)
  if (!Number.isFinite(id)) return c.json({ ok: false, error: 'bad id' }, 400)
  let body: { status?: string }
  try { body = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  const allowed = ['new', 'contacted', 'qualified', 'won', 'lost']
  if (!body.status || !allowed.includes(body.status)) return c.json({ ok: false, error: `status must be one of ${allowed.join('|')}` }, 400)
  await c.env.DB.prepare('UPDATE leads SET status = ? WHERE id = ?').bind(body.status, id).run()
  return c.json({ ok: true, id, status: body.status })
})

// GET /api/leads/export.csv — CSV download for spreadsheets/clients
api.get('/leads/export.csv', async (c) => {
  if (!adminOK(c)) return c.text('Unauthorized — append ?key=YOUR_ADMIN_API_KEY', 401)
  if (!c.env?.DB) return c.text('D1 not bound', 503)
  const rows = await c.env.DB.prepare('SELECT id, name, email, phone, funnel, source, utm_campaign, utm_source, utm_medium, ghl_contact_id, status, created_at FROM leads ORDER BY id DESC LIMIT 5000').all()
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const header = 'id,name,email,phone,funnel,source,utm_campaign,utm_source,utm_medium,ghl_contact_id,status,created_at'
  const csv = [header, ...rows.results.map((r: Record<string, unknown>) => [r.id, r.name, r.email, r.phone, r.funnel, r.source, r.utm_campaign, r.utm_source, r.utm_medium, r.ghl_contact_id, r.status, r.created_at].map(esc).join(','))].join('\n')
  return new Response(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="leadflow-crm-export.csv"' } })
})

// ── v3.3: Short funnel links (D1-backed) ────────────────────
// POST /api/links { template, params, label? } → { code, url }
api.post('/links', async (c) => {
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  let body: { template?: string; params?: string; label?: string }
  try { body = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  if (!body.template || !/^[a-z0-9-]{2,40}$/.test(body.template)) return c.json({ ok: false, error: 'template slug required' }, 400)
  const params = (body.params || '').replace(/^\?/, '').slice(0, 4000)
  const code = Array.from(crypto.getRandomValues(new Uint8Array(5))).map((b) => 'abcdefghjkmnpqrstuvwxyz23456789'[b % 31]).join('')
  await c.env.DB.prepare('INSERT INTO funnel_links (code, template, params, label) VALUES (?,?,?,?)').bind(code, body.template, params, (body.label || '').slice(0, 120) || null).run()
  const origin = new URL(c.req.url).origin
  return c.json({ ok: true, code, url: `${origin}/f/${code}`, target: `/t/${body.template}${params ? '?' + params : ''}` })
})

// GET /api/links — recent saved links + click counts
api.get('/links', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  const rows = await c.env.DB.prepare('SELECT code, template, params, label, clicks, created_at FROM funnel_links ORDER BY created_at DESC LIMIT 100').all()
  return c.json({ ok: true, links: rows.results })
})

// ── v3.3: Workers AI endpoints (Cloudflare LLM — no API key needed) ──
// POST /api/ai/copy { template, fields: string[], brief } → { fields: {…} }
api.post('/ai/copy', async (c) => {
  if (!aiConfigured(c.env)) return c.json({ ok: false, error: 'Workers AI not bound (run in Cloudflare environment)' }, 503)
  let body: { template?: string; fields?: string[]; brief?: string }
  try { body = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  if (!body.template || !Array.isArray(body.fields) || !body.fields.length) return c.json({ ok: false, error: 'template and fields[] required' }, 400)
  const fields = body.fields.filter((f) => typeof f === 'string' && /^[a-zA-Z]{1,40}$/.test(f)).slice(0, 20)
  const result = await generateFunnelCopy(c.env, body.template.slice(0, 40), fields, body.brief || 'a great local business')
  return c.json(result, result.ok ? 200 : 502)
})

// v3.5: POST /api/ai/social { template, params?, brief? } → platform-specific promo posts
// Builds a UTM-tracked funnel link and asks the LLM for FB/IG/LinkedIn/X/TikTok posts.
api.post('/ai/social', async (c) => {
  if (!aiConfigured(c.env)) return c.json({ ok: false, error: 'Workers AI not bound (run in Cloudflare environment)' }, 503)
  let body: { template?: string; params?: string; brief?: string }
  try { body = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  if (!body.template || !/^[a-zA-Z]{1,40}$/.test(body.template)) return c.json({ ok: false, error: 'template required' }, 400)
  const origin = new URL(c.req.url).origin
  // UTM-tracked link so every social click is attributed in the LeadFlow CRM
  const qs = new URLSearchParams(body.params || '')
  qs.set('utm_source', 'social')
  qs.set('utm_medium', 'organic')
  qs.set('utm_campaign', `${body.template}-social`)
  const funnelUrl = `${origin}/t/${body.template}?${qs.toString()}`
  const result = await generateSocialPosts(c.env, body.template.slice(0, 40), funnelUrl, body.brief || '')
  return c.json(result.ok ? { ...result, funnelUrl } : result, result.ok ? 200 : 502)
})

// POST /api/ai/insights — AI summary + call-first priorities from D1 leads
api.post('/ai/insights', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  if (!aiConfigured(c.env)) return c.json({ ok: false, error: 'Workers AI not bound (run in Cloudflare environment)' }, 503)
  const rows = await c.env.DB.prepare('SELECT name, email, phone, funnel, utm_campaign, status, created_at FROM leads ORDER BY id DESC LIMIT 60').all()
  if (!rows.results.length) return c.json({ ok: false, error: 'No leads yet — insights will appear once funnels capture leads' })
  const result = await generateLeadInsights(c.env, rows.results as Array<Record<string, unknown>>)
  return c.json(result, result.ok ? 200 : 502)
})

// ── GET /api/ghl/status — GHL connection health (used by /integrations badge) ──
api.get('/ghl/status', async (c) => c.json(await ghlStatus(c.env)))

// ── POST /api/checkout — Stripe Checkout Session ──────────────
// Body: { priceId } OR { name, amount (cents), currency?, interval? ('month'|'year' for subs) }
api.post('/checkout', async (c) => {
  const key = c.env?.STRIPE_SECRET_KEY
  if (!key) return c.json({ ok: false, error: 'Stripe not configured. Set STRIPE_SECRET_KEY (see /integrations).' }, 503)

  let body: Record<string, string>
  try { body = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON body' }, 400) }

  const origin = new URL(c.req.url).origin
  const p = new URLSearchParams()
  p.set('mode', body.interval ? 'subscription' : 'payment')
  p.set('success_url', body.successUrl || `${origin}/?checkout=success`)
  p.set('cancel_url', body.cancelUrl || `${origin}/?checkout=cancel`)

  if (body.priceId) {
    p.set('line_items[0][price]', body.priceId)
    p.set('line_items[0][quantity]', '1')
  } else if (body.name && body.amount) {
    const amount = parseInt(body.amount, 10)
    if (!Number.isFinite(amount) || amount < 50 || amount > 99999999) return c.json({ ok: false, error: 'amount must be 50–99999999 cents' }, 400)
    p.set('line_items[0][price_data][currency]', body.currency || 'usd')
    p.set('line_items[0][price_data][product_data][name]', body.name.slice(0, 120))
    p.set('line_items[0][price_data][unit_amount]', String(amount))
    if (body.interval) p.set('line_items[0][price_data][recurring][interval]', body.interval === 'year' ? 'year' : 'month')
    p.set('line_items[0][quantity]', '1')
  } else {
    return c.json({ ok: false, error: 'Provide priceId OR name+amount' }, 400)
  }

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: p.toString()
  })
  const session = await res.json() as { url?: string; error?: { message?: string } }
  if (!res.ok || !session.url) return c.json({ ok: false, error: session.error?.message || 'Stripe error' }, 502)
  return c.json({ ok: true, url: session.url })
})

// ── GET /api/seo-pack — machine-readable SEO pack generator ────
api.get('/seo-pack', (c) => {
  const q = c.req.query()
  const name = (q.name || 'Your Business').slice(0, 120)
  const desc = (q.desc || `${name} — built with McKnight GrowthOS.`).slice(0, 300)
  const url = (q.url || 'https://example.com').slice(0, 300)
  const city = (q.city || '').slice(0, 80)
  const niche = (q.niche || 'ProfessionalService').slice(0, 60)
  const keywords = (q.keywords || '').slice(0, 400)
  const logo = q.logo || 'https://mcknight-growthos.pages.dev/static/logo.svg'

  const org = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness',
    name, description: desc, url, image: logo,
    ...(city ? { address: { '@type': 'PostalAddress', addressLocality: city } } : {})
  }
  return c.json({
    ok: true,
    meta: {
      title: `${name}${city ? ' | ' + city : ''} — ${desc.slice(0, 50)}`,
      description: desc, keywords, canonical: url, robots: 'index, follow, max-image-preview:large'
    },
    openGraph: { 'og:type': 'website', 'og:title': name, 'og:description': desc, 'og:url': url, 'og:image': logo, 'og:site_name': name },
    twitter: { 'twitter:card': 'summary_large_image', 'twitter:title': name, 'twitter:description': desc, 'twitter:image': logo },
    jsonLd: org,
    sitemapXml: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>\n</urlset>`,
    robotsTxt: `User-agent: *\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\nSitemap: ${url.replace(/\/$/, '')}/sitemap.xml`,
    niche
  })
})

// ── v2.5: SEO Ping — submits all site URLs to IndexNow (Bing/Yandex/Seznam/Naver
// share the index) so new/updated funnels get discovered within hours, not weeks.
// Called manually (POST /api/seo-ping) or daily by an optional SEO-keeper Worker cron.
export const INDEXNOW_KEY = '0ba4bc5051534cffb4f950503fd5563d'

api.post('/seo-ping', async (c) => {
  const origin = new URL(c.req.url).origin
  // Never ping localhost/sandbox — engines would reject and it pollutes quota
  if (!/rjbusinesssolutions\.org|pages\.dev/.test(origin)) {
    return c.json({ ok: false, skipped: true, reason: 'non-production origin' })
  }
  const pages = ['/', '/deploy', '/events', '/tax', '/credit', '/emails', '/compliance', '/builder', '/leads', '/brand', '/seo', '/integrations']
  const funnels = ['event-landing', 'sponsor-deck', 'tax-lead', 'credit-service', 'credit-saas', 'real-estate', 'fitness', 'coaching', 'ecommerce', 'saas-trial', 'law-firm', 'home-services', 'med-spa', 'insurance', 'agency', 'restaurant', 'dental', 'auto-services', 'salon', 'mortgage', 'chiropractic', 'pet-care', 'landscaping', 'cleaning', 'childcare', 'tutoring', 'accounting', 'photography', 'wedding-venue', 'moving']
  const urlList = [...pages, ...funnels.map((f) => `/t/${f}`)].map((p) => origin + p)

  const results: Record<string, unknown> = {}
  try {
    const r = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: new URL(origin).host, key: INDEXNOW_KEY, keyLocation: `${origin}/${INDEXNOW_KEY}.txt`, urlList })
    })
    results.indexnow = { status: r.status, ok: r.status === 200 || r.status === 202 }
  } catch (e) { results.indexnow = { error: String(e) } }

  return c.json({ ok: true, submitted: urlList.length, origin, results, at: new Date().toISOString() })
})

// ═══════════════════════════════════════════════════════════════
// v2.0 — ULTIMATE FUNNEL COMMAND LAYER
// Key Vault · AI Agents · Mailer · Per-funnel Analytics
// ═══════════════════════════════════════════════════════════════

// ── KEY VAULT ──────────────────────────────────────────────────
// GET /api/keys — grouped key registry with configured/masked status
api.get('/keys', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const vault = await loadVault(c.env)
  const keys = KNOWN_KEYS.map((k) => {
    const inVault = vault[k.name]
    const inEnv = (c.env as any)?.[k.name]
    const val = inVault || inEnv || ''
    return {
      name: k.name, group: k.group, label: k.label, hint: k.hint || '',
      configured: !!val,
      source: inVault ? 'vault' : (inEnv ? 'secret' : ''),
      masked: val ? (k.secret === false ? String(val).slice(0, 60) : maskValue(String(val))) : ''
    }
  })
  return c.json({ ok: true, groups: KEY_GROUPS, keys })
})

// POST /api/keys { KEY: value, ... } — save individual keys to the vault
api.post('/keys', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  let body: Record<string, string>
  try { body = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  const saved: string[] = []
  const rejected: string[] = []
  for (const [k, v] of Object.entries(body)) {
    const name = k.toUpperCase().trim()
    if (!isKnownKey(name) || typeof v !== 'string' || !v.trim()) { rejected.push(k); continue }
    await c.env.DB.prepare('INSERT INTO settings (key, value, updated_at) VALUES (?,?,CURRENT_TIMESTAMP) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=CURRENT_TIMESTAMP').bind(name, v.trim().slice(0, 2000)).run()
    saved.push(name)
  }
  invalidateVaultCache()
  return c.json({ ok: true, saved, rejected })
})

// POST /api/keys/upload — raw .env file body → parse + route every key
api.post('/keys/upload', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  const text = (await c.req.text()).slice(0, 100_000)
  const { accepted, unknown, skipped } = parseEnvFile(text)
  const saved: string[] = []
  for (const [k, v] of Object.entries(accepted)) {
    await c.env.DB.prepare('INSERT INTO settings (key, value, updated_at) VALUES (?,?,CURRENT_TIMESTAMP) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=CURRENT_TIMESTAMP').bind(k, v).run()
    saved.push(k)
  }
  invalidateVaultCache()
  return c.json({ ok: true, saved, unknown, skippedLines: skipped, message: `${saved.length} keys routed to their integrations${unknown.length ? `; ${unknown.length} unknown keys ignored: ${unknown.slice(0, 10).join(', ')}` : ''}` })
})

// DELETE /api/keys/:name — remove a vault key (falls back to env secret if set)
api.delete('/keys/:name', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  const name = c.req.param('name').toUpperCase()
  if (!isKnownKey(name)) return c.json({ ok: false, error: 'unknown key' }, 400)
  await c.env.DB.prepare('DELETE FROM settings WHERE key = ?').bind(name).run()
  invalidateVaultCache()
  return c.json({ ok: true, deleted: name })
})

// ── AI AGENTS ──────────────────────────────────────────────────
// GET /api/agents/status — per-funnel override freshness + recent log
api.get('/agents/status', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  const overrides = await c.env.DB.prepare('SELECT funnel, overrides, agent, updated_at FROM copy_overrides ORDER BY updated_at DESC').all()
  const log = await c.env.DB.prepare('SELECT agent, funnel, action, detail, created_at FROM agent_log ORDER BY id DESC LIMIT 50').all()
  return c.json({ ok: true, funnels: FUNNEL_SLUGS, overrides: overrides.results, log: log.results, ai: aiConfigured(c.env) })
})

// POST /api/agents/run { funnel? } — run SEO/SGE/AEO agent now (one or all)
api.post('/agents/run', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!aiConfigured(c.env)) return c.json({ ok: false, error: 'Workers AI not bound (deploy to Cloudflare)' }, 503)
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  let body: { funnel?: string } = {}
  try { body = await c.req.json() } catch { /* empty body = run all */ }
  if (body.funnel) {
    if (!(FUNNEL_SLUGS as readonly string[]).includes(body.funnel)) return c.json({ ok: false, error: 'unknown funnel' }, 400)
    const r = await optimizeFunnelCopy(c.env as AgentEnv, body.funnel)
    return c.json({ ok: r.ok, funnel: body.funnel, overrides: r.overrides, error: r.error })
  }
  const r = await optimizeAllFunnels(c.env as AgentEnv, [...FUNNEL_SLUGS])
  return c.json({ ok: r.ok, optimized: r.optimized, failed: r.failed })
})

// DELETE /api/agents/overrides/:funnel — clear agent copy (back to hand-written)
api.delete('/agents/overrides/:funnel', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  const funnel = c.req.param('funnel')
  await c.env.DB.prepare('DELETE FROM copy_overrides WHERE funnel = ?').bind(funnel).run()
  await logAgent(c.env as AgentEnv, 'seo-agent', funnel, 'overrides_cleared')
  return c.json({ ok: true, funnel })
})

// ── ANALYTICS (per-funnel data separation) ─────────────────────
// GET /api/analytics — views + leads + conversion per funnel
api.get('/analytics', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  const days = Math.min(parseInt(c.req.query('days') || '30', 10) || 30, 90)
  const [views, leads, daily] = await Promise.all([
    c.env.DB.prepare(`SELECT funnel, SUM(views) n FROM funnel_views WHERE day >= date('now', ?) GROUP BY funnel`).bind(`-${days} day`).all(),
    c.env.DB.prepare(`SELECT funnel, COUNT(*) n FROM leads WHERE created_at >= datetime('now', ?) GROUP BY funnel`).bind(`-${days} day`).all(),
    c.env.DB.prepare(`SELECT day, SUM(views) views FROM funnel_views WHERE day >= date('now', ?) GROUP BY day ORDER BY day`).bind(`-${days} day`).all(),
  ])
  const vMap: Record<string, number> = {}; for (const r of views.results as any[]) vMap[r.funnel] = Number(r.n)
  const lMap: Record<string, number> = {}; for (const r of leads.results as any[]) lMap[r.funnel] = Number(r.n)
  const funnels = [...new Set([...Object.keys(vMap), ...Object.keys(lMap)])].map((f) => ({
    funnel: f, views: vMap[f] || 0, leads: lMap[f] || 0,
    conversion: vMap[f] ? +(((lMap[f] || 0) / vMap[f]) * 100).toFixed(2) : null
  })).sort((a, b) => b.views - a.views)
  return c.json({ ok: true, days, funnels, daily: daily.results })
})

// ── MAILER ─────────────────────────────────────────────────────
// GET /api/mail/status — configured providers + audience sizes per funnel
api.get('/mail/status', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const providers = mailProvidersConfigured(c.env as MailEnv)
  const active = pickProvider(c.env as MailEnv)
  let segments: any[] = []
  let log: any[] = []
  if (c.env?.DB) {
    const seg = await c.env.DB.prepare("SELECT funnel, COUNT(DISTINCT email) n FROM leads WHERE email IS NOT NULL AND email != '' GROUP BY funnel ORDER BY n DESC").all()
    segments = seg.results as any[]
    const lg = await c.env.DB.prepare('SELECT provider, to_count, subject, funnel, ok, error, created_at FROM mail_log ORDER BY id DESC LIMIT 20').all()
    log = lg.results as any[]
  }
  return c.json({ ok: true, providers, active, from: (c.env as any)?.LEAD_FROM_EMAIL || '', segments, log })
})

// POST /api/mail/send { subject, html, funnel?, status?, to?, provider?, test? }
// funnel='' → all leads with email; funnel='mortgage' → that segment only.
// test=true → sends only to LEAD_NOTIFY_EMAIL (safe preview).
api.post('/mail/send', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  let body: { subject?: string; html?: string; funnel?: string; status?: string; to?: string; provider?: string; test?: boolean }
  try { body = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  if (!body.subject?.trim() || !body.html?.trim()) return c.json({ ok: false, error: 'subject and html required' }, 400)

  let recipients: string[] = []
  if (body.test) {
    const t = (c.env as any)?.LEAD_NOTIFY_EMAIL
    if (!t) return c.json({ ok: false, error: 'Set LEAD_NOTIFY_EMAIL in the Key Vault to receive test sends' }, 400)
    recipients = [t]
  } else if (body.to?.trim()) {
    recipients = body.to.split(/[,;\s]+/).filter((e) => /.+@.+\..+/.test(e)).slice(0, 500)
  } else {
    if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
    const conds: string[] = ["email IS NOT NULL AND email != ''"]
    const binds: unknown[] = []
    if (body.funnel?.trim()) { conds.push('funnel = ?'); binds.push(body.funnel.trim().slice(0, 60)) }
    if (body.status?.trim()) { conds.push('status = ?'); binds.push(body.status.trim().slice(0, 20)) }
    const rows = await c.env.DB.prepare(`SELECT DISTINCT email FROM leads WHERE ${conds.join(' AND ')} LIMIT 500`).bind(...binds).all()
    recipients = (rows.results as any[]).map((r) => r.email)
  }
  if (!recipients.length) return c.json({ ok: false, error: 'No recipients match this segment' }, 400)

  const html = campaignHtml(body.subject.trim().slice(0, 200), body.html.slice(0, 100_000))
  const result = await sendMail(c.env as MailEnv, { to: recipients, subject: body.subject.trim().slice(0, 200), html, provider: body.provider })
  try { await c.env?.DB?.prepare('INSERT INTO mail_log (provider, to_count, subject, funnel, ok, error) VALUES (?,?,?,?,?,?)').bind(result.provider, recipients.length, body.subject.trim().slice(0, 200), body.funnel || (body.test ? '(test)' : body.to ? '(manual)' : ''), result.ok ? 1 : 0, result.error || null).run() } catch { /* log only */ }
  return c.json({ ok: result.ok, provider: result.provider, recipients: recipients.length, test: !!body.test, error: result.error })
})

// ═══════════════════════════════════════════════════════════════
// v3.0 — CLOUDFLARE DEPLOY + CHANGE AGENT
// ═══════════════════════════════════════════════════════════════

// ── CLOUDFLARE DEPLOY (user's own account) ─────────────────────
// GET /api/cf/status — token/account verification + deployment list
api.get('/cf/status', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const verify = await cfVerify(c.env as CfEnv)
  const deployments = await listDeployments(c.env as CfEnv)
  return c.json({ ok: true, configured: cfConfigured(c.env as CfEnv), verify, deployments, funnels: FUNNEL_SLUGS })
})

// POST /api/cf/deploy { funnel, name?, params? } — deploy a funnel to the
// user's Cloudflare account as a standalone Worker. Params are baked into
// the HTML; live copy_overrides are merged too (so agent copy ships).
api.post('/cf/deploy', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  let body: { funnel?: string; name?: string; params?: Record<string, string> }
  try { body = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  const funnel = (body.funnel || '').trim()
  if (!isFunnelSlug(funnel)) return c.json({ ok: false, error: 'unknown funnel' }, 400)
  const tpl = TEMPLATES[funnel]

  // Merge: agent overrides as defaults, explicit params win (same as /t/:slug)
  const q: Record<string, string | undefined> = { _slug: funnel } // v5.1 brand theming
  if (body.params && typeof body.params === 'object') {
    for (const [k, v] of Object.entries(body.params)) if (typeof v === 'string' && v.trim()) q[k] = v.trim().slice(0, 400)
  }
  try {
    const overrides = await getCopyOverrides(c.env as AgentEnv, funnel)
    for (const [k, v] of Object.entries(overrides)) if (!q[k]) q[k] = v
  } catch { /* render anyway */ }

  // Baked-in origin must be reachable from Cloudflare's edge — never localhost/sandbox
  let platformOrigin = new URL(c.req.url).origin
  if (/localhost|127\.0\.0\.1|\.sandbox\./.test(platformOrigin)) platformOrigin = 'https://mcknight-growthos.pages.dev'
  const html = tpl(q)
  const result = await deployFunnel(c.env as CfEnv, { funnel, html, platformOrigin, name: body.name, params: q as Record<string, string> })
  return c.json(result, result.ok ? 200 : 502)
})

// DELETE /api/cf/deploy/:worker — remove a deployed funnel worker
api.delete('/cf/deploy/:worker', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const r = await deleteDeployment(c.env as CfEnv, c.req.param('worker'))
  return c.json(r, r.ok ? 200 : 502)
})

// ── CHANGE AGENT (plain-English funnel edits) ──────────────────
// GET /api/changes?funnel= — request history
api.get('/changes', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const funnel = c.req.query('funnel') || undefined
  const requests = await listChangeRequests(c.env as AgentEnv, funnel)
  return c.json({ ok: true, requests, funnels: FUNNEL_SLUGS, ai: aiConfigured(c.env) })
})

// GET /api/changes/params/:funnel — the editable param schema + live values
api.get('/changes/params/:funnel', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const funnel = c.req.param('funnel')
  if (!isFunnelSlug(funnel)) return c.json({ ok: false, error: 'unknown funnel' }, 400)
  const overrides = await getCopyOverrides(c.env as AgentEnv, funnel)
  return c.json({ ok: true, funnel, params: FUNNEL_PARAMS[funnel] || [], common: COMMON_PARAMS, live: overrides })
})

// POST /api/changes { funnel, request } — AI applies the plain-English change
api.post('/changes', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  let body: { funnel?: string; request?: string }
  try { body = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  const funnel = (body.funnel || '').trim()
  if (!isFunnelSlug(funnel)) return c.json({ ok: false, error: 'unknown funnel' }, 400)
  if (!body.request?.trim()) return c.json({ ok: false, error: 'Describe the change you want' }, 400)
  const r = await processChangeRequest(c.env as AgentEnv, funnel, body.request.trim())
  return c.json(r, r.ok ? 200 : 422)
})

// POST /api/changes/:id/revert — undo one applied change request
api.post('/changes/:id/revert', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const id = parseInt(c.req.param('id'), 10)
  if (!id) return c.json({ ok: false, error: 'bad id' }, 400)
  const r = await revertChangeRequest(c.env as AgentEnv, id)
  return c.json(r, r.ok ? 200 : 422)
})

// ═══ v4.0: ZOOM WEBINAR COMMAND CENTER ═════════════════════════
// Host webinars right from the platform. Server-to-Server OAuth app:
// marketplace.zoom.us → Build App → Server-to-Server OAuth → drop
// ZOOM_ACCOUNT_ID / ZOOM_CLIENT_ID / ZOOM_CLIENT_SECRET in the Key Vault.

// GET /api/zoom/status — connection check + stored events + registration counts
api.get('/zoom/status', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const env = c.env as unknown as ZoomEnv
  const configured = zoomConfigured(env)
  let verify: any = { ok: false }
  if (configured) verify = await zoomVerify(env)
  const events = await listStoredWebinars(env)
  let regTotal = 0
  const regByEvent: Record<string, number> = {}
  try {
    const rows = await c.env?.DB?.prepare('SELECT zoom_id, COUNT(*) as n FROM webinar_registrations GROUP BY zoom_id').all()
    for (const r of (rows?.results as any[]) || []) { regByEvent[r.zoom_id] = r.n; regTotal += r.n }
  } catch { /* table may not exist yet */ }
  return c.json({
    ok: true, configured, connected: verify.ok,
    account: verify.ok ? { email: verify.user?.email, name: [verify.user?.first_name, verify.user?.last_name].filter(Boolean).join(' '), type: verify.user?.type, webinarLicense: verify.webinarLicense } : undefined,
    error: configured && !verify.ok ? verify.error : undefined,
    events: events.map((e: any) => ({ ...e, registrants: regByEvent[e.zoom_id] || 0 })),
    registrationsTotal: regTotal
  })
})

// POST /api/zoom/webinars { topic, startTime, duration?, timezone?, agenda?, funnel?, useMeeting? }
api.post('/zoom/webinars', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const env = c.env as unknown as ZoomEnv
  if (!zoomConfigured(env)) return c.json({ ok: false, error: 'Zoom not configured — add ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET in the Key Vault (/integrations).' }, 400)
  let body: { topic?: string; startTime?: string; duration?: number; timezone?: string; agenda?: string; funnel?: string; useMeeting?: boolean }
  try { body = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  if (!body.topic?.trim()) return c.json({ ok: false, error: 'topic required' }, 400)
  if (!body.startTime?.trim()) return c.json({ ok: false, error: 'startTime required (ISO 8601, e.g. 2026-08-01T19:00:00)' }, 400)
  if (body.funnel && !isFunnelSlug(body.funnel)) return c.json({ ok: false, error: `Unknown funnel slug '${body.funnel}'` }, 400)

  const r = await createZoomEvent(env, {
    topic: body.topic.trim().slice(0, 200),
    startTime: body.startTime.trim(),
    duration: Math.min(Math.max(body.duration || 60, 10), 720),
    timezone: (body.timezone || 'America/Chicago').slice(0, 60),
    agenda: (body.agenda || '').slice(0, 2000),
    funnel: body.funnel || '',
    useMeeting: !!body.useMeeting
  })
  if (!r.ok) return c.json({ ok: false, error: r.error }, 502)

  // Slack notify (fail-soft) — owner sees new events in the team channel
  const slack = (c.env as any)?.SLACK_WEBHOOK_URL
  if (slack) {
    try {
      await fetch(slack, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        text: `🎥 New ${r.kind} scheduled: *${body.topic.trim()}* — ${body.startTime}${body.funnel ? ` · funnel: /t/${body.funnel}` : ''}\nRegistration: ${r.event?.registration_url || r.event?.join_url || 'n/a'}`
      }) })
    } catch { /* never blocks */ }
  }
  return c.json({ ok: true, kind: r.kind, event: r.event })
})

// GET /api/zoom/webinars/:id/registrants — live from Zoom + D1 fallback
api.get('/zoom/webinars/:id/registrants', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const env = c.env as unknown as ZoomEnv
  const zoomId = c.req.param('id').slice(0, 40)
  const row = await c.env?.DB?.prepare('SELECT kind FROM webinars WHERE zoom_id = ?').bind(zoomId).first<any>()
  const kind = row?.kind || 'webinar'
  let live: any[] = []
  if (zoomConfigured(env)) {
    const r = await listRegistrants(env, zoomId, kind)
    if (r.ok) live = r.registrants || []
  }
  const stored = await c.env?.DB?.prepare('SELECT email, name, phone, join_url, created_at FROM webinar_registrations WHERE zoom_id = ? ORDER BY id DESC LIMIT 500').bind(zoomId).all()
  return c.json({ ok: true, zoomId, kind, live, stored: (stored?.results as any[]) || [] })
})

// DELETE /api/zoom/webinars/:id — cancel in Zoom + soft-delete in D1
api.delete('/zoom/webinars/:id', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const env = c.env as unknown as ZoomEnv
  const zoomId = c.req.param('id').slice(0, 40)
  const row = await c.env?.DB?.prepare('SELECT kind FROM webinars WHERE zoom_id = ?').bind(zoomId).first<any>()
  const r = await deleteZoomEvent(env, zoomId, row?.kind || 'webinar')
  return c.json(r, r.ok ? 200 : 502)
})

// ═══ v4.0: TWILIO SMS BLAST ENGINE ═════════════════════════════
// POST /api/sms/send { body, funnel?, status?, to?, test? }
// Same segment logic as /api/mail/send: funnel='' → all leads with a
// phone; funnel='mortgage' → that segment only; to='+1...' → manual list.
api.post('/sms/send', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const env = c.env as any
  if (!env?.TWILIO_ACCOUNT_SID || !env?.TWILIO_AUTH_TOKEN || !env?.TWILIO_FROM) {
    return c.json({ ok: false, error: 'Twilio not configured — add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM in the Key Vault (/integrations).' }, 400)
  }
  let body: { body?: string; funnel?: string; status?: string; to?: string; test?: boolean }
  try { body = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  const msg = (body.body || '').trim()
  if (!msg) return c.json({ ok: false, error: 'body (message text) required' }, 400)
  if (msg.length > 1600) return c.json({ ok: false, error: 'Message too long (1600 char max)' }, 400)

  let recipients: string[] = []
  if (body.test) {
    const t = env?.TWILIO_TO
    if (!t) return c.json({ ok: false, error: 'Set TWILIO_TO in the Key Vault to receive test sends' }, 400)
    recipients = [t]
  } else if (body.to?.trim()) {
    recipients = body.to.split(/[,;\s]+/).filter((p) => /^\+?[\d\-().\s]{7,20}$/.test(p)).slice(0, 200)
  } else {
    if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
    const conds: string[] = ["phone IS NOT NULL AND phone != ''"]
    const binds: unknown[] = []
    if (body.funnel?.trim()) { conds.push('funnel = ?'); binds.push(body.funnel.trim().slice(0, 60)) }
    if (body.status?.trim()) { conds.push('status = ?'); binds.push(body.status.trim().slice(0, 20)) }
    const rows = await c.env.DB.prepare(`SELECT DISTINCT phone FROM leads WHERE ${conds.join(' AND ')} LIMIT 200`).bind(...binds).all()
    recipients = (rows.results as any[]).map((r) => r.phone)
  }
  if (!recipients.length) return c.json({ ok: false, error: 'No recipients with phone numbers match this segment' }, 400)

  // Send sequentially in small parallel batches (Twilio rate-friendly)
  const auth = 'Basic ' + btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`)
  const url = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`
  let sent = 0
  const errors: string[] = []
  const batchSize = 10
  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize)
    const results = await Promise.allSettled(batch.map(async (to) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: { Authorization: auth, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ From: env.TWILIO_FROM, To: to, Body: msg }).toString()
      })
      if (!res.ok) { const e = await res.text(); throw new Error(e.slice(0, 150)) }
      return true
    }))
    for (const r of results) { if (r.status === 'fulfilled') sent++; else if (errors.length < 5) errors.push(String(r.reason?.message || r.reason).slice(0, 150)) }
  }

  const ok = sent > 0
  try { await c.env?.DB?.prepare('INSERT INTO sms_log (to_count, sent_count, body, funnel, ok, error) VALUES (?,?,?,?,?,?)').bind(recipients.length, sent, msg.slice(0, 500), body.funnel || (body.test ? '(test)' : body.to ? '(manual)' : ''), ok ? 1 : 0, errors.length ? errors.join(' | ').slice(0, 500) : null).run() } catch { /* log only */ }
  return c.json({ ok, recipients: recipients.length, sent, failed: recipients.length - sent, test: !!body.test, errors: errors.length ? errors : undefined })
})

// GET /api/sms/status — Twilio config + segments + recent blasts
api.get('/sms/status', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const env = c.env as any
  const configured = !!(env?.TWILIO_ACCOUNT_SID && env?.TWILIO_AUTH_TOKEN && env?.TWILIO_FROM)
  let segments: any[] = []
  let log: any[] = []
  try {
    const seg = await c.env?.DB?.prepare("SELECT funnel, COUNT(DISTINCT phone) as n FROM leads WHERE phone IS NOT NULL AND phone != '' GROUP BY funnel ORDER BY n DESC").all()
    segments = (seg?.results as any[]) || []
  } catch { /* no leads table yet */ }
  try {
    const lg = await c.env?.DB?.prepare('SELECT * FROM sms_log ORDER BY id DESC LIMIT 20').all()
    log = (lg?.results as any[]) || []
  } catch { /* no sms_log yet */ }
  return c.json({ ok: true, configured, from: env?.TWILIO_FROM || '', segments, log })
})

// ═══ v5.0: McKNIGHT CLIENTOS — CRM + CLIENT OPERATIONS ═════════
// GrowthOS captures. ClientOS operates. Vertical pipelines deliver.

// GET /api/clientos/meta — pipelines, brands, lifecycle, health factors
api.get('/clientos/meta', (c) => c.json({ ok: true, pipelines: PIPELINES, brands: BRANDS, lifecycle: LIFECYCLE_STAGES, healthFactors: HEALTH_FACTORS }))

// GET /api/clients?brand=&pipeline=&stage=&lifecycle=&q=&limit=&offset=
api.get('/clients', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  const q = c.req.query()
  const limit = Math.min(parseInt(q.limit || '50', 10) || 50, 200)
  const offset = Math.max(parseInt(q.offset || '0', 10) || 0, 0)
  const conds: string[] = []
  const binds: unknown[] = []
  if (q.brand) { conds.push('brand = ?'); binds.push(q.brand.slice(0, 40)) }
  if (q.lifecycle) { conds.push('lifecycle_stage = ?'); binds.push(q.lifecycle.slice(0, 40)) }
  if (q.q) { conds.push('(first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone LIKE ? OR business_name LIKE ?)'); const like = `%${q.q.slice(0, 80)}%`; binds.push(like, like, like, like, like) }
  const where = conds.length ? `WHERE ${conds.join(' AND ')}` : ''
  const rows = await c.env.DB.prepare(`SELECT * FROM clients ${where} ORDER BY updated_at DESC LIMIT ? OFFSET ?`).bind(...binds, limit, offset).all()
  const count = await c.env.DB.prepare(`SELECT COUNT(*) as n FROM clients ${where}`).bind(...binds).first<any>()
  return c.json({ ok: true, clients: rows.results, total: count?.n || 0 })
})

// POST /api/clients — create/update a client manually
api.post('/clients', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  let b: Record<string, any>
  try { b = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  const FIELDS = ['client_type','first_name','last_name','preferred_name','email','secondary_email','phone','alt_phone','preferred_channel','language','timezone','address','city','state','zip','county','business_name','dba','entity_type','website','industry','naics','employees','revenue_range','uei','cage','sam_expiration','certifications','licenses','business_goals','funding_needs','lead_source','campaign','funnel','referral_partner','referral_code','assigned_to','brand','lifecycle_stage','next_action','tags','risk_flags']
  if (b.lifecycle_stage && !(LIFECYCLE_STAGES as readonly string[]).includes(b.lifecycle_stage)) return c.json({ ok: false, error: `Invalid lifecycle stage. Allowed: ${LIFECYCLE_STAGES.join(', ')}` }, 400)
  if (b.brand && !BRANDS[b.brand]) return c.json({ ok: false, error: `Invalid brand. Allowed: ${Object.keys(BRANDS).join(', ')}` }, 400)

  if (b.id) {
    const sets: string[] = []; const binds: unknown[] = []
    for (const f of FIELDS) if (f in b) { sets.push(`${f} = ?`); binds.push(String(b[f] ?? '').slice(0, 500) || null) }
    if (!sets.length) return c.json({ ok: false, error: 'No fields to update' }, 400)
    binds.push(parseInt(b.id, 10))
    await c.env.DB.prepare(`UPDATE clients SET ${sets.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).bind(...binds).run()
    if (b.lifecycle_stage) await logActivity(c.env as unknown as ClientOsEnv, parseInt(b.id, 10), 'stage', `Lifecycle → ${b.lifecycle_stage}`, '', { actor: 'admin' })
    return c.json({ ok: true, id: parseInt(b.id, 10), updated: true })
  }
  if (!b.email && !b.phone) return c.json({ ok: false, error: 'email or phone required' }, 400)
  const cols: string[] = []; const binds: unknown[] = []
  for (const f of FIELDS) if (f in b && b[f] != null && String(b[f]).trim()) { cols.push(f); binds.push(String(b[f]).slice(0, 500)) }
  const r = await c.env.DB.prepare(`INSERT INTO clients (${cols.join(',')}, consent_ts, last_contact) VALUES (${cols.map(() => '?').join(',')}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`).bind(...binds).run()
  const id = r.meta.last_row_id as number
  await logActivity(c.env as unknown as ClientOsEnv, id, 'system', 'Client created manually', '', { actor: 'admin' })
  return c.json({ ok: true, id, created: true })
})

// GET /api/clients/:id — Client 360: profile + opportunities + timeline + tasks + tickets + docs + health
api.get('/clients/:id', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  const id = parseInt(c.req.param('id'), 10)
  const client = await c.env.DB.prepare('SELECT * FROM clients WHERE id = ?').bind(id).first()
  if (!client) return c.json({ ok: false, error: 'Client not found' }, 404)
  const [opps, timeline, tasks, tix, docs, refs] = await Promise.all([
    c.env.DB.prepare('SELECT * FROM opportunities WHERE client_id = ? ORDER BY updated_at DESC').bind(id).all(),
    c.env.DB.prepare('SELECT * FROM activities WHERE client_id = ? ORDER BY id DESC LIMIT 100').bind(id).all(),
    c.env.DB.prepare('SELECT * FROM client_tasks WHERE client_id = ? ORDER BY (status = \'done\'), due_date').bind(id).all(),
    c.env.DB.prepare('SELECT * FROM tickets WHERE client_id = ? ORDER BY id DESC LIMIT 50').bind(id).all(),
    c.env.DB.prepare('SELECT * FROM client_documents WHERE client_id = ? ORDER BY id DESC').bind(id).all(),
    c.env.DB.prepare('SELECT * FROM referrals WHERE referrer_client_id = ? OR referred_client_id = ? ORDER BY id DESC LIMIT 50').bind(id, id).all(),
  ])
  const health = await computeHealth(c.env as unknown as ClientOsEnv, id)
  return c.json({ ok: true, client, health: { ...health, ...healthBand(health.score) }, opportunities: opps.results, timeline: timeline.results, tasks: tasks.results, tickets: tix.results, documents: docs.results, referrals: refs.results })
})

// POST /api/clients/:id/activity { kind, subject, body?, direction? } — log a touch
api.post('/clients/:id/activity', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const id = parseInt(c.req.param('id'), 10)
  let b: any; try { b = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  if (!b.subject?.trim()) return c.json({ ok: false, error: 'subject required' }, 400)
  const kind = ['note','email','sms','call','meeting','document','payment','system'].includes(b.kind) ? b.kind : 'note'
  await logActivity(c.env as unknown as ClientOsEnv, id, kind, b.subject.trim(), (b.body || '').trim(), { direction: b.direction, actor: 'admin' })
  return c.json({ ok: true })
})

// GET /api/opportunities?pipeline= — kanban board data
api.get('/opportunities', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  const pipeline = c.req.query('pipeline') || 'consulting'
  if (!PIPELINES[pipeline]) return c.json({ ok: false, error: 'Unknown pipeline' }, 400)
  const rows = await c.env.DB.prepare(`SELECT o.*, cl.first_name, cl.last_name, cl.email, cl.phone, cl.business_name, cl.health_score FROM opportunities o JOIN clients cl ON cl.id = o.client_id WHERE o.pipeline = ? AND o.status = 'open' ORDER BY o.updated_at DESC LIMIT 300`).bind(pipeline).all()
  const closed = await c.env.DB.prepare(`SELECT status, COUNT(*) as n, SUM(value) as v FROM opportunities WHERE pipeline = ? AND status != 'open' GROUP BY status`).bind(pipeline).all()
  return c.json({ ok: true, pipeline, name: PIPELINES[pipeline].name, stages: PIPELINES[pipeline].stages, opportunities: rows.results, closed: closed.results })
})

// POST /api/opportunities/:id/move { stage } | { status: won|lost, lost_reason? }
api.post('/opportunities/:id/move', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  const id = parseInt(c.req.param('id'), 10)
  let b: any; try { b = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  const opp = await c.env.DB.prepare('SELECT * FROM opportunities WHERE id = ?').bind(id).first<any>()
  if (!opp) return c.json({ ok: false, error: 'Opportunity not found' }, 404)
  if (b.status === 'won' || b.status === 'lost') {
    const closeValue = typeof b.value === 'number' ? b.value : (opp.value || 0)
    await c.env.DB.prepare("UPDATE opportunities SET status = ?, value = ?, lost_reason = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(b.status, closeValue, (b.lost_reason || '').slice(0, 300) || null, id).run()
    if (b.status === 'won') await c.env.DB.prepare("UPDATE clients SET lifecycle_stage = 'active', account_value = account_value + ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(closeValue, opp.client_id).run()
    if (b.status === 'lost') await c.env.DB.prepare("UPDATE clients SET lifecycle_stage = 'lost', updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(opp.client_id).run()
    await logActivity(c.env as unknown as ClientOsEnv, opp.client_id, 'stage', `Opportunity ${b.status}: ${opp.title}`, b.lost_reason || '', { opportunityId: id, actor: 'admin' })
    return c.json({ ok: true, status: b.status })
  }
  const stages = PIPELINES[opp.pipeline]?.stages || []
  if (!b.stage || !stages.includes(b.stage)) return c.json({ ok: false, error: `Invalid stage for ${opp.pipeline}. Allowed: ${stages.join(' | ')}` }, 400)
  await c.env.DB.prepare('UPDATE opportunities SET stage = ?, stage_entered_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(b.stage, id).run()
  await logActivity(c.env as unknown as ClientOsEnv, opp.client_id, 'stage', `${PIPELINES[opp.pipeline].name}: ${opp.stage} → ${b.stage}`, '', { opportunityId: id, actor: 'admin' })
  if (typeof b.value === 'number') await c.env.DB.prepare('UPDATE opportunities SET value = ? WHERE id = ?').bind(b.value, id).run()
  return c.json({ ok: true, stage: b.stage })
})

// POST /api/clients/:id/tasks { title, description?, due_date?, priority?, assigned_to? }
api.post('/clients/:id/tasks', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const id = parseInt(c.req.param('id'), 10)
  let b: any; try { b = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  if (!b.title?.trim()) return c.json({ ok: false, error: 'title required' }, 400)
  const r = await c.env!.DB!.prepare('INSERT INTO client_tasks (client_id, title, description, due_date, priority, assigned_to) VALUES (?,?,?,?,?,?)')
    .bind(id, b.title.trim().slice(0, 200), (b.description || '').slice(0, 2000) || null, (b.due_date || '').slice(0, 20) || null, ['low','normal','high','urgent'].includes(b.priority) ? b.priority : 'normal', (b.assigned_to || '').slice(0, 80) || null).run()
  await logActivity(c.env as unknown as ClientOsEnv, id, 'task', `Task created: ${b.title.trim()}`, '', { actor: 'admin' })
  return c.json({ ok: true, id: r.meta.last_row_id })
})

// POST /api/tasks/:id/status { status }
api.post('/tasks/:id/status', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const id = parseInt(c.req.param('id'), 10)
  let b: any; try { b = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  const allowed = ['open','in_progress','waiting_client','waiting_internal','done','cancelled']
  if (!allowed.includes(b.status)) return c.json({ ok: false, error: `status must be one of: ${allowed.join(', ')}` }, 400)
  const task = await c.env!.DB!.prepare('SELECT client_id, title FROM client_tasks WHERE id = ?').bind(id).first<any>()
  if (!task) return c.json({ ok: false, error: 'Task not found' }, 404)
  await c.env!.DB!.prepare(`UPDATE client_tasks SET status = ?, completed_at = ${b.status === 'done' ? 'CURRENT_TIMESTAMP' : 'NULL'} WHERE id = ?`).bind(b.status, id).run()
  if (b.status === 'done') await logActivity(c.env as unknown as ClientOsEnv, task.client_id, 'task', `Task completed: ${task.title}`, '', { actor: 'admin' })
  return c.json({ ok: true })
})

// ── Tickets ────────────────────────────────────────────────────
api.get('/tickets', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  const status = c.req.query('status')
  const where = status ? 'WHERE t.status = ?' : "WHERE t.status NOT IN ('closed')"
  const binds = status ? [status.slice(0, 30)] : []
  const rows = await c.env.DB.prepare(`SELECT t.*, cl.first_name, cl.last_name, cl.email FROM tickets t LEFT JOIN clients cl ON cl.id = t.client_id ${where} ORDER BY CASE t.priority WHEN 'urgent' THEN 0 WHEN 'high' THEN 1 WHEN 'normal' THEN 2 ELSE 3 END, t.id DESC LIMIT 200`).bind(...binds).all()
  return c.json({ ok: true, tickets: rows.results })
})

api.post('/tickets', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  let b: any; try { b = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  if (!b.subject?.trim()) return c.json({ ok: false, error: 'subject required' }, 400)
  const r = await c.env!.DB!.prepare('INSERT INTO tickets (client_id, brand, category, priority, subject, description, assigned_to) VALUES (?,?,?,?,?,?,?)')
    .bind(b.client_id ? parseInt(b.client_id, 10) : null, BRANDS[b.brand] ? b.brand : 'growthos', (b.category || 'general').slice(0, 40), ['low','normal','high','urgent'].includes(b.priority) ? b.priority : 'normal', b.subject.trim().slice(0, 200), (b.description || '').slice(0, 4000) || null, (b.assigned_to || '').slice(0, 80) || null).run()
  if (b.client_id) await logActivity(c.env as unknown as ClientOsEnv, parseInt(b.client_id, 10), 'ticket', `Ticket opened: ${b.subject.trim()}`, '', { actor: 'admin' })
  return c.json({ ok: true, id: r.meta.last_row_id })
})

api.post('/tickets/:id/status', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const id = parseInt(c.req.param('id'), 10)
  let b: any; try { b = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  const allowed = ['new','assigned','investigating','waiting_client','waiting_internal','escalated','resolved','closed','reopened']
  if (!allowed.includes(b.status)) return c.json({ ok: false, error: `status must be one of: ${allowed.join(', ')}` }, 400)
  const t = await c.env!.DB!.prepare('SELECT client_id, subject FROM tickets WHERE id = ?').bind(id).first<any>()
  if (!t) return c.json({ ok: false, error: 'Ticket not found' }, 404)
  await c.env!.DB!.prepare('UPDATE tickets SET status = ?, resolution = COALESCE(?, resolution), satisfaction = COALESCE(?, satisfaction), updated_at = CURRENT_TIMESTAMP WHERE id = ?')
    .bind(b.status, (b.resolution || '').slice(0, 2000) || null, b.satisfaction ? parseInt(b.satisfaction, 10) : null, id).run()
  if (t.client_id && (b.status === 'resolved' || b.status === 'closed')) await logActivity(c.env as unknown as ClientOsEnv, t.client_id, 'ticket', `Ticket ${b.status}: ${t.subject}`, b.resolution || '', { actor: 'admin' })
  return c.json({ ok: true })
})

// ── Referrals ──────────────────────────────────────────────────
api.get('/referrals', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  const rows = await c.env.DB.prepare('SELECT * FROM referrals ORDER BY id DESC LIMIT 200').all()
  return c.json({ ok: true, referrals: rows.results })
})

api.post('/referrals', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  let b: any; try { b = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  if (!b.referrer_name?.trim() && !b.referrer_client_id) return c.json({ ok: false, error: 'referrer required' }, 400)
  const r = await c.env!.DB!.prepare('INSERT INTO referrals (referrer_client_id, referrer_name, referred_client_id, referred_name, service, brand, disclosure_provided, client_consent, compensation, notes) VALUES (?,?,?,?,?,?,?,?,?,?)')
    .bind(b.referrer_client_id ? parseInt(b.referrer_client_id, 10) : null, (b.referrer_name || '').slice(0, 120) || null, b.referred_client_id ? parseInt(b.referred_client_id, 10) : null, (b.referred_name || '').slice(0, 120) || null, (b.service || '').slice(0, 120) || null, BRANDS[b.brand] ? b.brand : 'growthos', b.disclosure_provided ? 1 : 0, b.client_consent ? 1 : 0, parseFloat(b.compensation || '0') || 0, (b.notes || '').slice(0, 1000) || null).run()
  return c.json({ ok: true, id: r.meta.last_row_id })
})

api.post('/referrals/:id/status', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const id = parseInt(c.req.param('id'), 10)
  let b: any; try { b = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  const allowed = ['new','contacted','converted','paid','declined']
  if (!allowed.includes(b.status)) return c.json({ ok: false, error: `status must be one of: ${allowed.join(', ')}` }, 400)
  await c.env!.DB!.prepare("UPDATE referrals SET status = ?, compensation_status = CASE WHEN ? = 'paid' THEN 'paid' ELSE compensation_status END WHERE id = ?").bind(b.status, b.status, id).run()
  return c.json({ ok: true })
})

// ── Documents (vault metadata) ─────────────────────────────────
api.post('/clients/:id/documents', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const id = parseInt(c.req.param('id'), 10)
  let b: any; try { b = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  if (!b.name?.trim()) return c.json({ ok: false, error: 'name required' }, 400)
  const r = await c.env!.DB!.prepare('INSERT INTO client_documents (client_id, category, name, url, expiration_date, confidentiality) VALUES (?,?,?,?,?,?)')
    .bind(id, (b.category || 'general').slice(0, 40), b.name.trim().slice(0, 200), (b.url || '').slice(0, 500) || null, (b.expiration_date || '').slice(0, 20) || null, ['public','internal','restricted'].includes(b.confidentiality) ? b.confidentiality : 'internal').run()
  await logActivity(c.env as unknown as ClientOsEnv, id, 'document', `Document added: ${b.name.trim()}`, '', { actor: 'admin' })
  return c.json({ ok: true, id: r.meta.last_row_id })
})

api.post('/documents/:id/verify', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  const id = parseInt(c.req.param('id'), 10)
  let b: any; try { b = await c.req.json() } catch { return c.json({ ok: false, error: 'Invalid JSON' }, 400) }
  const allowed = ['unverified','verified','rejected','expired']
  if (!allowed.includes(b.status)) return c.json({ ok: false, error: `status must be one of: ${allowed.join(', ')}` }, 400)
  await c.env!.DB!.prepare('UPDATE client_documents SET verification_status = ?, verified_by = ? WHERE id = ?').bind(b.status, (b.verified_by || 'admin').slice(0, 80), id).run()
  return c.json({ ok: true })
})

// GET /api/clientos/stats — executive dashboard numbers
api.get('/clientos/stats', async (c) => {
  const deny = requireAdmin(c); if (deny) return deny
  if (!c.env?.DB) return c.json({ ok: false, error: 'D1 not bound' }, 503)
  const [clients, byBrand, byStage, opps, wonLost, tix, refs, tasks, expiring] = await Promise.all([
    c.env.DB.prepare('SELECT COUNT(*) as n, AVG(health_score) as avg_health FROM clients').first<any>(),
    c.env.DB.prepare('SELECT brand, COUNT(*) as n FROM clients GROUP BY brand ORDER BY n DESC').all(),
    c.env.DB.prepare('SELECT lifecycle_stage, COUNT(*) as n FROM clients GROUP BY lifecycle_stage').all(),
    c.env.DB.prepare("SELECT pipeline, COUNT(*) as n, SUM(value) as v FROM opportunities WHERE status = 'open' GROUP BY pipeline").all(),
    c.env.DB.prepare("SELECT status, COUNT(*) as n, SUM(value) as v FROM opportunities WHERE status != 'open' GROUP BY status").all(),
    c.env.DB.prepare("SELECT COUNT(*) as open FROM tickets WHERE status NOT IN ('resolved','closed')").first<any>(),
    c.env.DB.prepare("SELECT COUNT(*) as n, SUM(CASE WHEN status = 'converted' THEN 1 ELSE 0 END) as converted FROM referrals").first<any>(),
    c.env.DB.prepare("SELECT COUNT(*) as overdue FROM client_tasks WHERE status NOT IN ('done','cancelled') AND due_date IS NOT NULL AND due_date < date('now')").first<any>(),
    c.env.DB.prepare("SELECT COUNT(*) as n FROM client_documents WHERE expiration_date IS NOT NULL AND expiration_date BETWEEN date('now') AND date('now','+30 day')").first<any>(),
  ])
  return c.json({ ok: true, clients: clients?.n || 0, avgHealth: Math.round(clients?.avg_health || 0), byBrand: byBrand.results, byLifecycle: byStage.results, openPipelines: opps.results, closed: wonLost.results, openTickets: tix?.open || 0, referrals: refs, overdueTasks: tasks?.overdue || 0, expiringDocs: expiring?.n || 0 })
})

// ── Health ─────────────────────────────────────────────────────
// ── v6.2 FLEET VERIFICATION COMMAND CENTER ────────────────────
// Trackable launch-readiness checklist (P0/P1/P2) per brand. Blocking items
// gate a brand's launch: launch_ready only when every blocking item for that
// brand (or 'fleet') is verified or na.
const VERIFY_STATUSES = ['pending', 'in_progress', 'received', 'verified', 'blocked', 'na']

api.get('/verify/summary', async (c) => {
  if (!c.env?.DB) return c.json({ error: 'DB not configured' }, 500)
  const rows = (await c.env.DB.prepare('SELECT brand, priority, status, blocking FROM verification_items').all()).results as Array<{ brand: string; priority: string; status: string; blocking: number }>
  const brands: Record<string, { total: number; done: number; blocking: number; blockingDone: number }> = {}
  const pri: Record<string, { total: number; done: number }> = {}
  for (const r of rows) {
    const done = r.status === 'verified' || r.status === 'na'
    const b = (brands[r.brand] ||= { total: 0, done: 0, blocking: 0, blockingDone: 0 })
    b.total++; if (done) b.done++
    if (r.blocking) { b.blocking++; if (done) b.blockingDone++ }
    const p = (pri[r.priority] ||= { total: 0, done: 0 })
    p.total++; if (done) p.done++
  }
  const fleet = brands['fleet'] || { blocking: 0, blockingDone: 0, total: 0, done: 0 }
  const launch: Record<string, boolean> = {}
  for (const [b, v] of Object.entries(brands)) {
    if (b === 'fleet') continue
    launch[b] = v.blockingDone >= v.blocking && fleet.blockingDone >= fleet.blocking
  }
  return c.json({ ok: true, brands, priorities: pri, launch_ready: launch, total: rows.length })
})

api.get('/verify/items', async (c) => {
  if (!c.env?.DB) return c.json({ error: 'DB not configured' }, 500)
  const brand = c.req.query('brand'); const priority = c.req.query('priority')
  const section = c.req.query('section'); const status = c.req.query('status')
  const conds: string[] = []; const binds: string[] = []
  if (brand) { conds.push('brand = ?'); binds.push(brand) }
  if (priority) { conds.push('priority = ?'); binds.push(priority) }
  if (section) { conds.push('section = ?'); binds.push(section) }
  if (status) { conds.push('status = ?'); binds.push(status) }
  const where = conds.length ? ' WHERE ' + conds.join(' AND ') : ''
  const rows = await c.env.DB.prepare(`SELECT * FROM verification_items${where} ORDER BY CASE priority WHEN 'P0' THEN 0 WHEN 'P1' THEN 1 ELSE 2 END, blocking DESC, section, id`).bind(...binds).all()
  return c.json({ ok: true, items: rows.results })
})

api.put('/verify/items/:id', async (c) => {
  if (!c.env?.DB) return c.json({ error: 'DB not configured' }, 500)
  const id = Number(c.req.param('id'))
  const b = await c.req.json().catch(() => ({} as Record<string, unknown>))
  const sets: string[] = []; const binds: unknown[] = []
  if (typeof b.status === 'string' && VERIFY_STATUSES.includes(b.status)) { sets.push('status = ?'); binds.push(b.status) }
  if (typeof b.evidence === 'string') { sets.push('evidence = ?'); binds.push(b.evidence.slice(0, 1000)) }
  if (typeof b.notes === 'string') { sets.push('notes = ?'); binds.push(b.notes.slice(0, 2000)) }
  if (!sets.length) return c.json({ error: 'Nothing to update (status/evidence/notes)' }, 400)
  sets.push('updated_at = CURRENT_TIMESTAMP')
  await c.env.DB.prepare(`UPDATE verification_items SET ${sets.join(', ')} WHERE id = ?`).bind(...binds, id).run()
  const row = await c.env.DB.prepare('SELECT * FROM verification_items WHERE id = ?').bind(id).first()
  return c.json({ ok: true, item: row })
})

api.get('/health', async (c) => {
  const mailConf = mailProvidersConfigured(c.env as MailEnv)
  const envAny = c.env as any
  return c.json({ ok: true, version: '6.0.0', clientos: !!c.env?.DB, stripe: !!c.env?.STRIPE_SECRET_KEY, email: !!c.env?.RESEND_API_KEY, ghl: ghlConfigured(c.env), d1: !!c.env?.DB, ai: aiConfigured(c.env), adminLock: !!c.env?.ADMIN_API_KEY, hooks: hooksConfigured(c.env), mail: { providers: mailConf, active: pickProvider(c.env as MailEnv) }, vault: !!c.env?.DB, cfDeploy: cfConfigured(c.env as CfEnv), changeAgent: aiConfigured(c.env), zoom: zoomConfigured(c.env as unknown as ZoomEnv), sms: !!(envAny?.TWILIO_ACCOUNT_SID && envAny?.TWILIO_AUTH_TOKEN && envAny?.TWILIO_FROM), slack: !!envAny?.SLACK_WEBHOOK_URL })
})
