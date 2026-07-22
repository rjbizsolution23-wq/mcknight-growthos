// ── RJ Funnel Command Center — API layer ──────────────────────
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

  // ── v3.3: permanent D1 storage → powers the /leads Lead Inbox CRM ──
  const db = await saveLeadToD1(c.env, clean, ghl.contactId)

  // ── v3.4: Integration fan-out (Zapier/Make webhook, Slack, Discord,
  // Telegram, Twilio SMS, Airtable) — all configured channels fire in
  // parallel; failures are reported but never break the lead.
  let hooks: HookResult[] = []
  try { hooks = await fanOutLead(c.env, clean) } catch { /* never throws, belt+suspenders */ }
  const hooksOut = hooks.length ? Object.fromEntries(hooks.map((h) => [h.channel, h.ok ? true : (h.error || false)])) : undefined

  const key = c.env?.RESEND_API_KEY
  const to = c.env?.LEAD_NOTIFY_EMAIL || 'support@rjbusinesssolutions.org'
  const from = c.env?.LEAD_FROM_EMAIL || 'RJ Funnels <onboarding@resend.dev>'

  if (!key) {
    // No email key configured — accept the lead so funnels never break,
    // flag that delivery is not wired yet.
    return c.json({ ok: true, delivered: false, stored: db.saved, leadId: db.id, hooks: hooksOut, ghl: ghl.attempted ? { synced: ghl.ok, contactId: ghl.contactId, error: ghl.error } : undefined, note: ghl.ok ? 'Lead synced to GoHighLevel. Set RESEND_API_KEY to also enable email delivery.' : 'Lead accepted. Set RESEND_API_KEY and/or GHL_API_KEY to enable delivery (see /integrations).' })
  }

  const rows = Object.entries(clean)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;color:#1e3a8a">${k}</td><td style="padding:6px 12px">${v.replace(/</g, '&lt;')}</td></tr>`)
    .join('')
  const htmlBody = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto">
      <div style="background:linear-gradient(135deg,#2563eb,#0ea5e9);padding:20px;border-radius:12px 12px 0 0">
        <h2 style="color:#fff;margin:0">🔥 New Funnel Lead</h2>
        <p style="color:#dbeafe;margin:4px 0 0;font-size:13px">RJ Business Solutions — Supreme Funnel System</p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#f8fafc;border:1px solid #e2e8f0">${rows}</table>
      <p style="font-size:11px;color:#94a3b8;margin-top:12px">Source: ${(clean._source || 'funnel')} · ${new Date().toISOString()}</p>
    </div>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject: `🔥 New Lead — ${clean._source || 'RJ Funnel'} (${clean.name || clean.email || 'unknown'})`, html: htmlBody })
  })
  if (!res.ok) {
    const err = await res.text()
    return c.json({ ok: true, delivered: false, stored: db.saved, leadId: db.id, hooks: hooksOut, ghl: ghl.attempted ? { synced: ghl.ok, contactId: ghl.contactId, error: ghl.error } : undefined, note: 'Lead accepted; email delivery failed', providerError: err.slice(0, 300) }, 200)
  }
  return c.json({ ok: true, delivered: true, stored: db.saved, leadId: db.id, hooks: hooksOut, ghl: ghl.attempted ? { synced: ghl.ok, contactId: ghl.contactId, opportunity: ghl.opportunity, workflow: ghl.workflow, error: ghl.error } : undefined })
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

// ── v3.3: Lead Inbox CRM API (D1-backed) ─────────────────────
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
  return new Response(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="rj-funnel-leads.csv"' } })
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
  // UTM-tracked link so every social click is attributed in the Lead Inbox
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
  const desc = (q.desc || `${name} — powered by RJ Business Solutions.`).slice(0, 300)
  const url = (q.url || 'https://example.com').slice(0, 300)
  const city = (q.city || '').slice(0, 80)
  const niche = (q.niche || 'ProfessionalService').slice(0, 60)
  const keywords = (q.keywords || '').slice(0, 400)
  const logo = q.logo || 'https://storage.googleapis.com/msgsndr/qQnxRHDtyx0uydPd5sRl/media/67eb83c5e519ed689430646b.jpeg'

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
// Called manually (POST /api/seo-ping) or daily by the rj-seo-keeper Worker cron.
export const INDEXNOW_KEY = '0ba4bc5051534cffb4f950503fd5563d'

api.post('/seo-ping', async (c) => {
  const origin = new URL(c.req.url).origin
  // Never ping localhost/sandbox — engines would reject and it pollutes quota
  if (!/rjbusinesssolutions\.org|pages\.dev/.test(origin)) {
    return c.json({ ok: false, skipped: true, reason: 'non-production origin' })
  }
  const pages = ['/', '/events', '/tax', '/credit', '/emails', '/compliance', '/builder', '/leads', '/brand', '/seo', '/integrations']
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

// ── Health ─────────────────────────────────────────────────────
api.get('/health', (c) => c.json({ ok: true, stripe: !!c.env?.STRIPE_SECRET_KEY, email: !!c.env?.RESEND_API_KEY, ghl: ghlConfigured(c.env), d1: !!c.env?.DB, ai: aiConfigured(c.env), adminLock: !!c.env?.ADMIN_API_KEY, hooks: hooksConfigured(c.env) }))
