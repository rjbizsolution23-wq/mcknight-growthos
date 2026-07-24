import { Hono } from 'hono'
import { dashboardPage } from './pages/dashboard'
import { eventsPage } from './pages/events'
import { taxPage } from './pages/tax'
import { creditPage } from './pages/credit'
import { emailsPage } from './pages/emails'
import { compliancePage } from './pages/compliance'
import { builderPage } from './pages/builder'
import { brandPage } from './pages/brand'
import { seoPage } from './pages/seo'
import { integrationsPage } from './pages/integrations'
import { leadsPage } from './pages/leads'
import { ecosystemPage, ecosystemBrandPage, ECOSYSTEM_BRANDS } from './pages/ecosystem'
import { passportPage } from './pages/passport'
import { api, INDEXNOW_KEY } from './api'
import { agentsPage } from './pages/agents'
import { mailerPage } from './pages/mailer'
import { analyticsPage } from './pages/analytics'
import { deployPage } from './pages/deploy'
import { webinarsPage } from './pages/webinars'
import { clientsPage } from './pages/clients'
import { verifyPage } from './pages/verify'
import { trafficPage } from './pages/traffic'
import { fleetPage } from './pages/fleet'
import { brandApi, mcp, llmsTxt } from './brandapi'
import { FUNNEL_SLUGS } from './funnels'
import { TEMPLATES } from './templateRegistry'
import { getCopyOverrides, trackView, maybeRefreshFunnel } from './agents'

type AppBindings = { DB?: D1Database; AI?: any }
const app = new Hono<{ Bindings: AppBindings }>()

const html = (body: string) =>
  new Response(body, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })

// ── Command Center pages ──────────────────────────────────────
app.get('/', (c) => html(dashboardPage()))
app.get('/events', (c) => html(eventsPage()))
app.get('/tax', (c) => html(taxPage()))
app.get('/credit', (c) => html(creditPage()))
app.get('/emails', (c) => html(emailsPage()))
app.get('/compliance', (c) => html(compliancePage()))
app.get('/builder', (c) => html(builderPage()))
app.get('/brand', (c) => html(brandPage()))
app.get('/seo', (c) => html(seoPage()))
app.get('/integrations', (c) => html(integrationsPage()))
app.get('/leads', (c) => html(leadsPage()))
app.get('/ecosystem', (c) => html(ecosystemPage()))
app.get('/ecosystem/:slug', (c) => {
  const page = ecosystemBrandPage(c.req.param('slug'))
  return page ? html(page) : c.notFound()
})
app.get('/passport', (c) => html(passportPage()))
app.get('/agents', (c) => html(agentsPage()))
app.get('/mailer', (c) => html(mailerPage()))
app.get('/analytics', (c) => html(analyticsPage()))
app.get('/deploy', (c) => html(deployPage()))
app.get('/webinars', (c) => html(webinarsPage()))
app.get('/clients', (c) => html(clientsPage()))
app.get('/verify', (c) => html(verifyPage()))
app.get('/traffic', (c) => html(trafficPage()))
app.get('/fleet', (c) => html(fleetPage()))

// ── API layer: Stripe checkout + lead capture + SEO pack ─────
app.route('/api', api)

// ── v6.7: Agent Access Layer — brand asset API + MCP server ──
app.route('/api/brand', brandApi)
app.route('/mcp', mcp)
app.get('/llms.txt', (c) => c.text(llmsTxt(new URL(c.req.url).origin)))

// ── v2.0: Live funnel templates — unified registry with per-funnel view
// tracking, AI-agent copy overrides (SEO/SGE/AEO, weekly lazy refresh),
// and zero-latency background work via executionCtx.waitUntil.
// TEMPLATES registry moved to './templateRegistry' (shared with api.ts for CF deploys)

app.get('/t/:slug', async (c) => {
  const slug = c.req.param('slug')
  const tpl = TEMPLATES[slug]
  if (!tpl) return c.notFound()
  const q: Record<string, string | undefined> = c.req.query()
  q._slug = slug // v5.1: brand theming — funnel wears its brand's colors

  // Merge AI-agent copy overrides as new defaults; explicit URL params win.
  if (c.env?.DB) {
    try {
      const overrides = await getCopyOverrides(c.env, slug)
      for (const [k, v] of Object.entries(overrides)) if (!q[k]) q[k] = v
    } catch { /* funnel must always render */ }

    // Background (zero latency): count the view + weekly agent refresh
    try {
      c.executionCtx.waitUntil(trackView(c.env, slug))
      if (c.env.AI || (c.env as any).OPENROUTER_API_KEY || (c.env as any).HF_API_TOKEN) c.executionCtx.waitUntil(maybeRefreshFunnel(c.env, slug))
    } catch { /* executionCtx may be absent in some dev contexts */ }
  }
  return html(tpl(q))
})

// ── v3.3: short funnel links — /f/:code → saved builder config (D1) ──
app.get('/f/:code', async (c) => {
  const code = c.req.param('code')
  if (!c.env?.DB || !/^[a-z0-9]{3,12}$/.test(code)) return c.redirect('/', 302)
  const row = await c.env.DB.prepare('SELECT template, params FROM funnel_links WHERE code = ?').bind(code).first<{ template: string; params: string }>()
  if (!row) return c.redirect('/', 302)
  c.executionCtx?.waitUntil?.(c.env.DB.prepare('UPDATE funnel_links SET clicks = clicks + 1 WHERE code = ?').bind(code).run())
  return c.redirect(`/t/${row.template}${row.params ? '?' + row.params : ''}`, 302)
})

// ── Health check ──────────────────────────────────────────────
app.get('/health', (c) => c.json({ status: 'ok', app: 'mcknight-growthos', version: '6.7.0' }))

// ── v2.3: SEO infrastructure — sitemap.xml + robots.txt ───────
const PAGES = ['/', '/events', '/tax', '/credit', '/emails', '/compliance', '/builder', '/leads', '/brand', '/seo', '/integrations', '/ecosystem', '/passport', '/agents', '/mailer', '/analytics', '/deploy', '/webinars', '/clients', '/verify', '/traffic', '/fleet', ...ECOSYSTEM_BRANDS.map((b) => `/ecosystem/${b.slug}`)]
const FUNNELS = [...FUNNEL_SLUGS]

app.get('/sitemap.xml', (c) => {
  const base = new URL(c.req.url).origin
  const today = new Date().toISOString().slice(0, 10)
  const urls = [...PAGES, ...FUNNELS.map((f) => `/t/${f}`)]
    .map((p) => `  <url><loc>${base}${p}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${p === '/' ? '1.0' : p.startsWith('/t/') ? '0.9' : '0.7'}</priority></url>`)
    .join('\n')
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
})

// IndexNow key verification file (search engines fetch this to validate ownership)
app.get(`/${INDEXNOW_KEY}.txt`, (c) => c.text(INDEXNOW_KEY))

app.get('/robots.txt', (c) => {
  const base = new URL(c.req.url).origin
  return c.text(`User-agent: *\nAllow: /\n\n# AI / answer engines welcome (AEO + SGE)\nUser-agent: GPTBot\nAllow: /\nUser-agent: Google-Extended\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`)
})

// ── v2.3: Universal thank-you page (use ?redirect=/thank-you on any funnel) ──
app.get('/thank-you', (c) => {
  const q = c.req.query()
  const name = q.headline || 'You\u2019re In! \u{1F389}'
  const msg = q.msg || 'We got your info and a real human will reach out within one business day. Keep an eye on your inbox (and spam folder, just in case).'
  const back = q.back || '/'
  return html(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Thank You | McKnight GrowthOS</title><meta name="robots" content="noindex, nofollow">
<link rel="icon" type="image/svg+xml" href="/static/favicon.svg"><script src="https://cdn.tailwindcss.com"></script>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>body{font-family:Inter,sans-serif}h1{font-family:Poppins,sans-serif}@keyframes pop{0%{transform:scale(0)}70%{transform:scale(1.15)}100%{transform:scale(1)}}.pop{animation:pop .6s cubic-bezier(.22,1,.36,1) both}</style></head>
<body class="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 min-h-screen flex items-center justify-center p-6 text-white">
<main class="max-w-lg w-full text-center">
  <div class="pop w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30"><i class="fas fa-check text-4xl"></i></div>
  <h1 class="text-4xl font-extrabold mb-4">${name.replace(/</g, '&lt;')}</h1>
  <p class="text-slate-300 leading-relaxed mb-8">${msg.replace(/</g, '&lt;')}</p>
  <div class="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left text-sm text-slate-300 space-y-3">
    <p class="font-bold text-white text-base"><i class="fas fa-list-check text-cyan-400 mr-2"></i>What happens next</p>
    <p><span class="text-cyan-400 font-bold mr-2">1.</span>We review your info today.</p>
    <p><span class="text-cyan-400 font-bold mr-2">2.</span>You get a personal reply within one business day.</p>
    <p><span class="text-cyan-400 font-bold mr-2">3.</span>We map your exact next step together — zero pressure.</p>
  </div>
  <a href="${back.replace(/"/g, '')}" class="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition"><i class="fas fa-arrow-left mr-2"></i>Back to site</a>
  <p class="text-slate-500 text-xs mt-10">&copy; ${new Date().getFullYear()} McKnight Opportunity Group &middot; Powered by RJ Business Solutions &middot; 1342 NM 333, Tijeras, NM 87059</p>
</main>
<script>try{if(window.gtag)gtag('event','conversion_thank_you');if(window.fbq)fbq('track','Lead')}catch(e){}</script>
</body></html>`)
})

// ── v2.3: Branded 404 + error handler ─────────────────────────
const errorPage = (code: number, title: string, msg: string) => `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${code} — ${title} | McKnight GrowthOS</title><meta name="robots" content="noindex">
<link rel="icon" type="image/svg+xml" href="/static/favicon.svg"><script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>body{font-family:Inter,sans-serif}h1,p.code{font-family:Poppins,sans-serif}</style></head>
<body class="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 min-h-screen flex items-center justify-center p-6 text-white text-center">
<main><p class="code text-8xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4">${code}</p>
<h1 class="text-2xl font-extrabold mb-3">${title}</h1>
<p class="text-slate-400 mb-8 max-w-md mx-auto">${msg}</p>
<a href="/" class="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition">← Command Center</a>
<p class="text-slate-600 text-xs mt-10">&copy; ${new Date().getFullYear()} McKnight Opportunity Group · Powered by RJ Business Solutions</p></main></body></html>`

app.notFound((c) => new Response(errorPage(404, 'Page Not Found', 'That route doesn\u2019t exist (or moved). Head back to the Command Center and grab a funnel from there.'), { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } }))
app.onError((err, c) => {
  console.error('Unhandled error:', err)
  return new Response(errorPage(500, 'Something Broke', 'Our side, not yours. The team has the error and it\u2019ll be fixed fast — try again in a minute.'), { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } })
})

export default app
