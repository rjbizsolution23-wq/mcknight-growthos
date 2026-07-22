// ── RJ Funnel Command Center — API layer ──────────────────────
// Stripe checkout + email lead capture, edge-native (fetch only, no SDKs).
// Secrets via wrangler secret put (prod) / .dev.vars (local):
//   STRIPE_SECRET_KEY, RESEND_API_KEY, LEAD_NOTIFY_EMAIL, LEAD_FROM_EMAIL
import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  STRIPE_SECRET_KEY?: string
  RESEND_API_KEY?: string
  LEAD_NOTIFY_EMAIL?: string
  LEAD_FROM_EMAIL?: string
}

export const api = new Hono<{ Bindings: Bindings }>()
api.use('*', cors())

// ── POST /api/lead — capture funnel form + email notification ──
api.post('/lead', async (c) => {
  let data: Record<string, string>
  try {
    data = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'Invalid JSON body' }, 400)
  }

  // Basic validation + sanitization
  const clean: Record<string, string> = {}
  for (const [k, v] of Object.entries(data)) {
    if (typeof v === 'string' && v.trim() && k.length <= 60) clean[k.slice(0, 60)] = v.trim().slice(0, 2000)
  }
  if (!Object.keys(clean).length) return c.json({ ok: false, error: 'Empty lead payload' }, 400)

  const key = c.env?.RESEND_API_KEY
  const to = c.env?.LEAD_NOTIFY_EMAIL || 'support@rjbusinesssolutions.org'
  const from = c.env?.LEAD_FROM_EMAIL || 'RJ Funnels <onboarding@resend.dev>'

  if (!key) {
    // No email key configured — accept the lead so funnels never break,
    // flag that delivery is not wired yet.
    return c.json({ ok: true, delivered: false, note: 'Lead accepted. Set RESEND_API_KEY to enable email delivery (see /integrations).' })
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
    return c.json({ ok: true, delivered: false, note: 'Lead accepted; email delivery failed', providerError: err.slice(0, 300) }, 200)
  }
  return c.json({ ok: true, delivered: true })
})

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
  const pages = ['/', '/events', '/tax', '/credit', '/emails', '/compliance', '/builder', '/brand', '/seo', '/integrations']
  const funnels = ['event-landing', 'sponsor-deck', 'tax-lead', 'credit-service', 'credit-saas', 'real-estate', 'fitness', 'coaching', 'ecommerce', 'saas-trial', 'law-firm', 'home-services', 'med-spa', 'insurance', 'agency']
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
api.get('/health', (c) => c.json({ ok: true, stripe: !!c.env?.STRIPE_SECRET_KEY, email: !!c.env?.RESEND_API_KEY }))
