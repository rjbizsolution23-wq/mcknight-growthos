import { Hono } from 'hono'
import { dashboardPage } from './pages/dashboard'
import { eventsPage } from './pages/events'
import { taxPage } from './pages/tax'
import { creditPage } from './pages/credit'
import { emailsPage } from './pages/emails'
import { compliancePage } from './pages/compliance'
import { builderPage } from './pages/builder'
import { eventLandingTemplate } from './templates/eventLanding'
import { sponsorDeckTemplate } from './templates/sponsorDeck'
import { taxLeadTemplate } from './templates/taxLead'
import { creditServiceTemplate } from './templates/creditService'
import { creditSaasTemplate } from './templates/creditSaas'

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

// ── Live funnel templates (parameterized via query string) ───
app.get('/t/event-landing', (c) => html(eventLandingTemplate(c.req.query())))
app.get('/t/sponsor-deck', (c) => html(sponsorDeckTemplate(c.req.query())))
app.get('/t/tax-lead', (c) => html(taxLeadTemplate(c.req.query())))
app.get('/t/credit-service', (c) => html(creditServiceTemplate(c.req.query())))
app.get('/t/credit-saas', (c) => html(creditSaasTemplate(c.req.query())))

// ── Health check ──────────────────────────────────────────────
app.get('/health', (c) => c.json({ status: 'ok', app: 'rj-funnel-command-center', version: '1.0.0' }))

export default app
