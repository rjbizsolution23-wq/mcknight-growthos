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
import { api, INDEXNOW_KEY } from './api'
import { eventLandingTemplate } from './templates/eventLanding'
import { sponsorDeckTemplate } from './templates/sponsorDeck'
import { taxLeadTemplate } from './templates/taxLead'
import { creditServiceTemplate } from './templates/creditService'
import { creditSaasTemplate } from './templates/creditSaas'
import { realEstateTemplate } from './templates/realEstate'
import { fitnessTemplate } from './templates/fitness'
import { coachingTemplate } from './templates/coaching'
import { ecommerceTemplate } from './templates/ecommerce'
import { saasTrialTemplate } from './templates/saasTrial'
import { lawFirmTemplate } from './templates/lawFirm'
import { homeServicesTemplate } from './templates/homeServices'
import { medSpaTemplate } from './templates/medSpa'
import { insuranceTemplate } from './templates/insurance'
import { agencyTemplate } from './templates/agency'
import { restaurantTemplate } from './templates/restaurant'
import { dentalTemplate } from './templates/dental'
import { autoServicesTemplate } from './templates/autoServices'
import { salonTemplate } from './templates/salon'
import { mortgageTemplate } from './templates/mortgage'
import { chiropracticTemplate } from './templates/chiropractic'
import { petCareTemplate } from './templates/petCare'
import { landscapingTemplate } from './templates/landscaping'
import { cleaningTemplate } from './templates/cleaning'
import { childcareTemplate } from './templates/childcare'
import { tutoringTemplate } from './templates/tutoring'
import { accountingTemplate } from './templates/accounting'
import { photographyTemplate } from './templates/photography'
import { weddingVenueTemplate } from './templates/weddingVenue'
import { movingTemplate } from './templates/moving'

type AppBindings = { DB?: D1Database }
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

// ── API layer: Stripe checkout + lead capture + SEO pack ─────
app.route('/api', api)

// ── Live funnel templates (parameterized via query string) ───
app.get('/t/event-landing', (c) => html(eventLandingTemplate(c.req.query())))
app.get('/t/sponsor-deck', (c) => html(sponsorDeckTemplate(c.req.query())))
app.get('/t/tax-lead', (c) => html(taxLeadTemplate(c.req.query())))
app.get('/t/credit-service', (c) => html(creditServiceTemplate(c.req.query())))
app.get('/t/credit-saas', (c) => html(creditSaasTemplate(c.req.query())))

// ── Top-10 niche funnel templates ─────────────────────────────
app.get('/t/real-estate', (c) => html(realEstateTemplate(c.req.query())))
app.get('/t/fitness', (c) => html(fitnessTemplate(c.req.query())))
app.get('/t/coaching', (c) => html(coachingTemplate(c.req.query())))
app.get('/t/ecommerce', (c) => html(ecommerceTemplate(c.req.query())))
app.get('/t/saas-trial', (c) => html(saasTrialTemplate(c.req.query())))
app.get('/t/law-firm', (c) => html(lawFirmTemplate(c.req.query())))
app.get('/t/home-services', (c) => html(homeServicesTemplate(c.req.query())))
app.get('/t/med-spa', (c) => html(medSpaTemplate(c.req.query())))
app.get('/t/insurance', (c) => html(insuranceTemplate(c.req.query())))
app.get('/t/agency', (c) => html(agencyTemplate(c.req.query())))
app.get('/t/restaurant', (c) => html(restaurantTemplate(c.req.query())))
app.get('/t/dental', (c) => html(dentalTemplate(c.req.query())))
app.get('/t/auto-services', (c) => html(autoServicesTemplate(c.req.query())))
app.get('/t/salon', (c) => html(salonTemplate(c.req.query())))
app.get('/t/mortgage', (c) => html(mortgageTemplate(c.req.query())))

// ── v3.2: 10 more premium niche funnel templates ──────────────
app.get('/t/chiropractic', (c) => html(chiropracticTemplate(c.req.query())))
app.get('/t/pet-care', (c) => html(petCareTemplate(c.req.query())))
app.get('/t/landscaping', (c) => html(landscapingTemplate(c.req.query())))
app.get('/t/cleaning', (c) => html(cleaningTemplate(c.req.query())))
app.get('/t/childcare', (c) => html(childcareTemplate(c.req.query())))
app.get('/t/tutoring', (c) => html(tutoringTemplate(c.req.query())))
app.get('/t/accounting', (c) => html(accountingTemplate(c.req.query())))
app.get('/t/photography', (c) => html(photographyTemplate(c.req.query())))
app.get('/t/wedding-venue', (c) => html(weddingVenueTemplate(c.req.query())))
app.get('/t/moving', (c) => html(movingTemplate(c.req.query())))

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
app.get('/health', (c) => c.json({ status: 'ok', app: 'rj-funnel-command-center', version: '3.4.0' }))

// ── v2.3: SEO infrastructure — sitemap.xml + robots.txt ───────
const PAGES = ['/', '/events', '/tax', '/credit', '/emails', '/compliance', '/builder', '/leads', '/brand', '/seo', '/integrations']
const FUNNELS = ['event-landing', 'sponsor-deck', 'tax-lead', 'credit-service', 'credit-saas', 'real-estate', 'fitness', 'coaching', 'ecommerce', 'saas-trial', 'law-firm', 'home-services', 'med-spa', 'insurance', 'agency', 'restaurant', 'dental', 'auto-services', 'salon', 'mortgage', 'chiropractic', 'pet-care', 'landscaping', 'cleaning', 'childcare', 'tutoring', 'accounting', 'photography', 'wedding-venue', 'moving']

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
<title>Thank You | RJ Business Solutions</title><meta name="robots" content="noindex, nofollow">
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
  <p class="text-slate-500 text-xs mt-10">&copy; ${new Date().getFullYear()} RJ Business Solutions &middot; 1342 NM 333, Tijeras, NM 87059 &middot; <a href="https://rjbusinesssolutions.org" class="underline">rjbusinesssolutions.org</a></p>
</main>
<script>try{if(window.gtag)gtag('event','conversion_thank_you');if(window.fbq)fbq('track','Lead')}catch(e){}</script>
</body></html>`)
})

// ── v2.3: Branded 404 + error handler ─────────────────────────
const errorPage = (code: number, title: string, msg: string) => `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${code} — ${title} | RJ Funnel Command Center</title><meta name="robots" content="noindex">
<link rel="icon" type="image/svg+xml" href="/static/favicon.svg"><script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>body{font-family:Inter,sans-serif}h1,p.code{font-family:Poppins,sans-serif}</style></head>
<body class="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 min-h-screen flex items-center justify-center p-6 text-white text-center">
<main><p class="code text-8xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4">${code}</p>
<h1 class="text-2xl font-extrabold mb-3">${title}</h1>
<p class="text-slate-400 mb-8 max-w-md mx-auto">${msg}</p>
<a href="/" class="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition">← Command Center</a>
<p class="text-slate-600 text-xs mt-10">&copy; ${new Date().getFullYear()} RJ Business Solutions</p></main></body></html>`

app.notFound((c) => new Response(errorPage(404, 'Page Not Found', 'That route doesn\u2019t exist (or moved). Head back to the Command Center and grab a funnel from there.'), { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } }))
app.onError((err, c) => {
  console.error('Unhandled error:', err)
  return new Response(errorPage(500, 'Something Broke', 'Our side, not yours. The team has the error and it\u2019ll be fixed fast — try again in a minute.'), { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } })
})

export default app
