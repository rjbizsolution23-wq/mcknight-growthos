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
import { api } from './api'
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

const app = new Hono()

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

// ── Health check ──────────────────────────────────────────────
app.get('/health', (c) => c.json({ status: 'ok', app: 'rj-funnel-command-center', version: '2.0.0' }))

export default app
