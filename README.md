# RJ Funnel Command Center

## Project Overview
- **Name**: RJ Funnel Command Center (webapp)
- **Goal**: A living all-in-one funnel system — 30 live parameterized funnel templates spanning Events/Tickets/Sponsors, Tax Services, Credit Repair, and every major local-business niche — white-label ready (client logo + brand color injection) so RJ Business Solutions can sell each funnel as a client’s own branded system, plus complete email sequence vaults and a compliance/disclaimer library.
- **Built by**: RJ Business Solutions · 1342 NM 333, Tijeras, New Mexico 87059 · rjbusinesssolutions.org

## URLs
- **Production (custom domain)**: https://funnels.rjbusinesssolutions.org
- **Sandbox (dev preview)**: https://3000-iegrgivf1owthq4y7nq1l-583b4d74.sandbox.novita.ai
- **Production**: not yet deployed (Cloudflare Pages ready)

## Currently Completed Features
### Command Center Pages
| Path | What it is |
|---|---|
| `/` | Dashboard — vertical cards, quick tools, live template index, 2026 conversion benchmarks |
| `/events` | Events & Sponsors hub — 5-stage funnel, sponsor tiers table, 6-touch outreach, close-call framework, objection scripts, stage-close + NEPQ scripts |
| `/tax` | Tax hub — 12 prohibited claims, compliant headline/CTA formulas, IRS programs education, pricing tiers, pre-launch checklist |
| `/credit` | Credit Repair hub — CROA six requirements, FCRA disputable vs. not, 15 banned claims, pricing benchmarks, CRC SaaS-liability lesson, 15 required docs, state CSO map |
| `/builder` | Funnel Builder — pick a template, fill fields, generate a customized live funnel with shareable URL + iframe preview |
| `/brand` | **Brand Kit Vault (v1.2)** — full RJ Business Solutions master brand kit: logo assets (URL/markdown/HTML/alt), 14 click-to-copy color swatches + gradients + CSS vars + Tailwind palette, fonts, business info, Rick Jefferson bios (short/medium/long), voice & taglines, 15 service categories + descriptions, 3 hero copy options, DFY Social Growth offer ($1,997/$997mo), CTA bank, about sections, social bios, email signatures, footer block, SEO meta pack, OG tags, JSON-LD Organization + Person schemas, nav structure, trust copy, master block — everything one-click copyable |
| `/emails` | Email Vault — 42 fully-written emails/SMS across 6 sequences with one-click copy |
| `/compliance` | Compliance Vault — verbatim disclaimers (TCPA, CAN-SPAM, FTC, CROA, Circular 230/OIC), launch checklists, hard stops |

### Live Funnel Templates (parameterized via query string)
| Path | Template | Key params |
|---|---|---|
| `/t/event-landing` | Event registration funnel (8 sections, countdown, 3-tier pricing, 10-Q FAQ) | `eventName, date, location, promise, audience, host, hostCred, gaPrice, vipPrice, elitePrice, registered, seats, deadline` |
| `/t/sponsor-deck` | Sponsor prospectus web deck (tiers, ROI calc, urgency) | `eventName, date, location, attendees, audience, contact, titlePrice, goldPrice, silverPrice, titleSpots, goldSpots` |
| `/t/tax-lead` | Tax resolution lead funnel (Circular 230/FTC/TSR compliant) | `firmName, credential, state, years, casesHandled, phone` |
| `/t/credit-service` | B2C credit repair funnel (CROA post-service billing, honest FAQ) | `companyName, state, clientsHelped, essentialPrice, essentialSetup, acceleratedPrice, acceleratedSetup, flatPrice` |
| `/t/credit-saas` | B2B credit repair SaaS funnel (compliance-first positioning) | `productName, tagline, starterPrice, growthPrice, scalePrice` |

### Top-10 Niche Funnel Templates (v1.1 — all full funnels: hero → pain → mechanism → authority → proof → offer/pricing → FAQ → final CTA)
| Path | Niche | Key params |
|---|---|---|
| `/t/real-estate` | Real estate seller lead gen (home value report magnet, TCPA form) | `agentName, brokerage, city, homesSold, avgDays, avgOver, phone` |
| `/t/fitness` | Fitness/weight-loss coaching cohort (3-pillar system, action guarantee) | `programName, coachName, promise, audience, price, vipPrice, clientCount, spots, deadline` |
| `/t/coaching` | High-ticket coaching/consulting (application-only, 4-quarter roadmap) | `programName, coachName, promise, audience, clientCount, revenue, investment` |
| `/t/ecommerce` | E-commerce/DTC product page (comparison table, bundle stack, FTC-safe) | `productName, brandName, promise, category, price, compareAt, bundlePrice, reviews, rating, deadline` |
| `/t/saas-trial` | SaaS free-trial funnel (no-CC trial, 3-tier pricing) | `productName, tagline, audience, userCount, trialDays, starterPrice, proPrice, teamPrice` |
| `/t/law-firm` | Law firm case review (contingency, bar-ad disclaimers) | `firmName, practiceArea, city, recovered, casesWon, years, phone` |
| `/t/home-services` | Home services free estimate (roofing/HVAC/solar; insurance-claim help) | `companyName, service, city, jobsDone, years, warranty, discount, phone, deadline` |
| `/t/med-spa` | Med spa new-client offer (physician-directed, medical screening) | `spaName, treatment, city, provider, offerPrice, offerValue, clientCount, deadline` |
| `/t/insurance` | Insurance/financial services quote (multi-carrier, TCPA + no-lead-resale) | `agencyName, productLine, state, familiesServed, carrierCount, startingPrice, phone` |
| `/t/agency` | Marketing agency growth audit (3-engine mechanism, performance guarantee) | `agencyName, niche, service, clientCount, leadsGenerated, avgRoas, retainer` |
| `/t/restaurant` | Restaurant VIP first-visit offer (priority seating, table-ready texts) | `bizName, cuisine, city, offer, offerValue, rating, reviewCount, deadline` |
| `/t/dental` | Dental $99 new-patient special (empathy copy, urgency triage) | `practice, dentist, city, offer, offerPrice, offerValue, patientCount, deadline` |
| `/t/auto-services` | Auto repair intro inspection + oil change (photo-proof trust, warranty) | `shopName, city, service, offer, offerValue, warranty, rating, reviewCount, deadline` |
| `/t/salon` | Salon new-guest offer (redo promise, stylist matching, service selector) | `salonName, city, specialty, offer, offerValue, stylistCount, rating, reviewCount, deadline` |
| `/t/mortgage` | Mortgage 60-second pre-approval (soft-pull, NMLS/Equal Housing compliant) | `loName, company, nmls, city, rate, program, closedCount, avgDays, deadline` |
| `/t/chiropractic` | Chiropractic $49 new-patient special (drug-free pain relief, condition chips) | `clinic, doctor, city, offer, offerPrice, offerValue, patientCount, deadline` |
| `/t/pet-care` | Pet care / vet free first wellness exam (fear-free positioning) | `bizName, city, service, offer, offerValue, petCount, rating, deadline` |
| `/t/landscaping` | Landscaping free design consult + 3D rendering (xeriscape/curb-appeal) | `company, city, service, offer, offerValue, projectCount, years, deadline` |
| `/t/cleaning` | Cleaning service $50-off first deep clean (re-clean guarantee, recurring upsell) | `company, city, service, offer, cleansDone, rating, guarantee, deadline` |
| `/t/childcare` | Childcare enrollment offer (licensed ratios, curriculum, tour CTA) | `center, city, ages, offer, offerValue, familyCount, ratio, deadline` |
| `/t/tutoring` | Tutoring free skills assessment (grade-gain proof, subject chips) | `bizName, city, subject, offer, offerValue, studentCount, gradeGain, deadline` |
| `/t/accounting` | CPA free tax savings review (avg-savings proof, niche positioning) | `firm, cpa, city, niche, offer, avgSavings, clientCount, deadline` |
| `/t/photography` | Photography $149 mini-session (portfolio trust, limited slots) | `studio, photographer, city, specialty, offer, offerPrice, offerValue, sessionCount, deadline` |
| `/t/wedding-venue` | Wedding venue champagne tour + date-hold (capacity/pricing transparency) | `venue, city, style, offer, capacity, weddingCount, startingPrice, deadline` |
| `/t/moving` | Moving company free in-home estimate (binding quote, claim-rate proof) | `company, city, service, offer, movesDone, rating, claimRate, deadline` |

### v2.0 Pages
| Path | What it is |
|---|---|
| `/seo` | **SEO · AEO · SGE Engine** — full search-pack generator (meta, OG graph, Twitter cards, JSON-LD by niche, sitemap.xml, AI-crawler robots.txt, AEO answer blocks), 2026 Search Trinity checklists (SEO/AEO/SGE), copy-paste schema library (FAQPage, AggregateRating, HowTo, BreadcrumbList) |
| `/integrations` | **Stripe + Email integration hub** — setup guides, live config status badges, drop-in checkout buttons, 3-tier pricing wiring, lead-form snippets, secrets reference |

### API (v2.0)
- `GET /health` — health check JSON
- `GET /api/health` — integration status (stripe/email configured?)
- `POST /api/lead` — lead capture → branded RJ Blue email via Resend (graceful no-key fallback; all 8 lead funnels wired via `data-lead-form`)
- `POST /api/checkout` — Stripe Checkout Session (priceId mode OR ad-hoc `{name, amount, interval?}` for one-time & subscriptions)
- `GET /api/seo-pack` — machine-readable SEO pack (`?name=&desc=&url=&city=&niche=&keywords=&logo=`)

### Universal Funnel Params (v2.0 — every template)
`seoTitle, seoDesc, seoKeywords, canonical, ogImage, theme=dark, noindex=1` — every funnel auto-emits meta description, robots, OG graph, Twitter cards, and JSON-LD ProfessionalService schema; `theme=dark` flips the whole funnel to the RJ Navy dark theme.

### GoHighLevel CRM Sync (v3.1 — every lead, automatically)
Every `POST /api/lead` (all funnel forms + dead-CTA rescue modals) syncs to your existing GHL sub-account via **LeadConnector API v2**:
1. **Contact upsert** — dedupes by email/phone (existing contacts updated, never duplicated)
2. **Auto-tags** — `rj-funnel`, `funnel-{slug}` (e.g. `funnel-mortgage`), `offer-{…}`, `utm-{campaign}` + custom per-link tags via `?ghlTag=client-acme,promo` (also a Builder field)
3. **Attribution note** — full form details + UTM/gclid/fbclid/ttclid + source URL pinned to the contact
4. **Opportunity** (optional) — auto-created when `GHL_PIPELINE_ID` + `GHL_STAGE_ID` are set
5. **Workflow enrollment** (optional) — via `GHL_WORKFLOW_ID`

Never blocks the funnel — if GHL is down/unconfigured, leads are still accepted + emailed. Health check: `GET /api/ghl/status` (live connection test, powers the /integrations badge). Secrets: `GHL_API_KEY` (Private Integration token, scopes: contacts.write/readonly, opportunities.write, locations.readonly, workflows.readonly) + `GHL_LOCATION_ID`; set via `wrangler pages secret put …` — full setup guide with copy-paste commands on `/integrations`.

### White-Label Client Branding (v3.0 — every template)
- `bizLogo=https://…` — client logo injected into the funnel hero (above the H1) and swapped into the footer
- `brandColor=16a34a` (6-digit hex, `#` optional) — re-skins every CTA button, pulse glow, focus ring, text selection, and gradient stat text to the client’s color
- `accentColor=0ea5e9` — optional secondary color for gradients (defaults to brandColor)
- Builder has dedicated **White-Label Client Branding** fields — fill them in, generate, and hand the client a funnel that looks 100% theirs

### Universal Tracking & Conversion Params (v2.2 — every template)
- **Pixels**: `ga4=G-XXXX`, `gtm=GTM-XXXX`, `metaPixel=ID`, `ttPixel=ID` — official snippets injected server-side; leads fire `generate_lead`, checkout buttons fire `begin_checkout` to all loaded pixels via `window.rjfTrack(event, data)`
- **Attribution**: `utm_source/medium/campaign/term/content`, `gclid`, `fbclid`, `ttclid` + first external referrer are captured (sessionStorage) and merged into every lead payload automatically
- **Conversion layer**: `redirect=/thank-you` (post-submit redirect), `cta=Text` (sticky bar + exit popup CTA), `exitTitle=…`, `exitDesc=…`; opt-outs: `exit=0`, `sticky=0`, `progress=0`, `toTop=0`
- **Payments anywhere**: `<button data-checkout='{"priceId":"price_xxx"}'>` or `data-checkout='{"name":"Setup","amount":199700,"interval":"month"}'` → Stripe Checkout with loading state + pixel event
- **Auto FAQ schema**: any funnel with 2+ `<details>` FAQs gets FAQPage JSON-LD generated client-side for rich snippets

### Integrations Secrets
Copy `.dev.vars.example` → `.dev.vars` locally; production via `wrangler pages secret put`: `STRIPE_SECRET_KEY`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL`.

## v3.3 — Cloudflare-Native Layer (D1 + Workers AI)
- **Lead Inbox CRM (`/leads`)** — every lead from all 30 funnels auto-stored in Cloudflare D1 (`rj-funnel-leads` DB): stats cards, funnel/status/search filters, clickable pipeline statuses (new → contacted → qualified → won/lost), CSV export (`/api/leads/export.csv`, 5K rows, full UTM + GHL attribution)
- **AI Lead Insights** — one click on /leads: Workers AI (llama-4-scout, runs on the same Cloudflare account — zero API keys) summarizes volume, names the top 3 leads to call first, flags campaign patterns (`POST /api/ai/insights`)
- **AI Copy Fill in Builder** — describe the client in one line → AI writes every template field (compliant, specific, editable) (`POST /api/ai/copy {template, fields[], brief}`)
- **Short funnel links** — save any builder config → `funnels.rjbusinesssolutions.org/f/{code}` with click tracking (`POST /api/links`, `GET /api/links`, redirect `/f/:code`)
- **Lead API**: `GET /api/leads?funnel=&status=&q=&limit=&offset=` · `GET /api/leads/stats` · `PATCH /api/leads/:id {status}`
- Health now reports bindings: `GET /api/health` → `{ d1: true, ai: true, … }`

## Email Sequences Included (Email Vault)
1. **Sponsor Cold Outreach** — 6 touches (Day 0→21, incl. Loom script + breakup)
2. **Pre-Event Nurture** — 8 emails + 4 SMS (TCPA-noted)
3. **High-Ticket Post-Call Follow-Up** — 7 emails (NEPQ-aligned)
4. **Tax Lead Nurture** — 7 emails (compliance-wired, disclaimers baked in)
5. **Credit B2C Nurture** — 8 emails (CROA-wired)
6. **Credit SaaS Trial Nurture** — 6 emails

### v2.0 — Niche Sequences (10 industries × 5 touches = 50 emails)
Real Estate (seller nurture, Fair-Housing-safe) · Fitness (FTC results-vary wired) · Coaching (earnings-claim compliant) · E-commerce (cart + post-purchase) · SaaS (trial-to-paid) · Law Firm (attorney-advertising labeled) · Home Services (estimate follow-up, license-wired) · Med Spa (HIPAA-aware) · Insurance (producer-license wired) · Agency (audit-call close)

## Compliance Vault (v2.0 — 10 industry packs added)
Real Estate (Fair Housing/RESPA) · Fitness (FTC health claims/DSHEA) · Coaching (earnings claims/click-to-cancel) · E-commerce (Consumer Review Rule/Mail Order Rule) · SaaS (GDPR/CCPA/negative option) · Law (Model Rules 7.1–7.3) · Home Services (licensing/cooling-off) · Med Spa (HIPAA marketing/before-after) · Insurance (DOI/CMS Medicare) · Agency (results claims/contracts)

## Data Architecture
- **Storage**: **Cloudflare D1** (`rj-funnel-leads`, id `c624734c-5fad-4f6e-a561-4b52163f1a04`) — tables: `leads` (name/email/phone/funnel/UTM/GHL id/status/full payload JSON) and `funnel_links` (short code → template+params, click counter). Migrations in `migrations/`; apply with `npx wrangler d1 migrations apply rj-funnel-leads --local|--remote`
- **AI**: **Cloudflare Workers AI** binding (`AI`), model `@cf/meta/llama-4-scout-17b-16e-instruct` — included with the Cloudflare account, no external API key
- **Data flow (lead)**: funnel form → POST /api/lead → GHL sync (if keys set) → **D1 insert** → email notify (if key set) → visible in /leads instantly
- **Data flow (builder)**: Builder form → query params → Hono route → server-rendered funnel; optionally saved to D1 as a `/f/{code}` short link

## Tech Stack
- Hono 4 + TypeScript on Cloudflare Pages architecture
- Vite build, PM2 + wrangler pages dev in sandbox
- Frontend: Tailwind (CDN), FontAwesome, vanilla JS (copy buttons, tabs, countdowns, builder)

## User Guide
1. Open the dashboard and pick a vertical (Events / Tax / Credit) to study the framework + grab copy blocks.
2. Go to **Builder**, choose a template, fill in your real details, hit **Generate** — you get a live preview + a shareable URL carrying your inputs.
3. Grab the matching sequence from the **Email Vault** (one-click copy), replace bracketed fields.
4. Pull required disclaimers from the **Compliance Vault** and run the pre-launch checklist.
5. Before any real launch: replace example testimonials/metrics with verified data and get attorney review (checklists flag exactly what).

## Features Not Yet Implemented
- Export funnel page as standalone HTML file download
- A/B variant generator per template
- Per-client login / multi-tenant lead inbox views
- AI email sequence generator (Workers AI is wired — natural next step)

## Recommended Next Steps
1. Deploy to Cloudflare Pages for a permanent URL
2. Add KV-backed "save my funnel" so configs get short shareable slugs
3. Wire template lead forms to a webhook/CRM endpoint
4. Add PDF export for the sponsor prospectus

## Deployment
- **Platform**: Cloudflare Pages — LIVE on Rick’s own Cloudflare account (project: rj-funnel-command-center)
- **Status**: ✅ LIVE in production — https://rj-funnel-command-center.pages.dev
- **Version**: 3.3.0 — Cloudflare-Native Layer: **D1 database** (permanent lead storage on every form submit + short funnel links `/f/{code}` with click tracking) + **Workers AI LLM** (llama-4-scout, zero API keys — AI Copy Fill in Builder writes every template field from a one-line client brief; AI Lead Insights on /leads names who to call first), new **/leads Lead Inbox CRM** (stats, filters, pipeline statuses, CSV export with full UTM/GHL attribution), lead API (`/api/leads[.../stats|/:id|/export.csv]`), links API (`/api/links`), fixed wedding-venue `style` param shadowing form.style (now `venueStyle`)
- **Version**: 3.2.0 — Niche Expansion Pack: **10 new premium templates** (chiropractic new-patient, pet care/vet, landscaping design, cleaning service, childcare enrollment, tutoring assessment, CPA tax savings, photography mini-session, wedding venue tour, moving company quote — each with unique gradient color scheme, schema.org type, FAQ JSON-LD, countdown urgency, TCPA-consent lead forms), dashboard now 30 live templates, Builder gains 10 template fieldsets, sitemap/seo-ping/SEO-keeper auto-include all 40 URLs
- **Version**: 3.1.0 — GoHighLevel Integration: full LeadConnector API v2 sync on every lead (contact upsert w/ dedupe → auto-tags incl. funnel slug + UTM campaign + custom `?ghlTag=` per-link tags → attribution note → optional pipeline opportunity → optional workflow enrollment), `GET /api/ghl/status` live connection check, GoHighLevel section on /integrations (setup guide, test curls, pipeline/workflow ID discovery commands, live status badge), Builder GHL tags field, 5 new secrets (`GHL_API_KEY`, `GHL_LOCATION_ID`, `GHL_PIPELINE_ID`, `GHL_STAGE_ID`, `GHL_WORKFLOW_ID`), graceful no-config fallback so funnels never break
- **Version**: 3.0.0 — All-In-One System: **white-label client branding** on every funnel (`bizLogo`, `brandColor`, `accentColor` URL params → server-side brand CSS override + motion.js client-logo injection into hero & footer), **5 new premium templates** (restaurant VIP table, dental new-patient, auto-repair inspection, salon new-guest, mortgage pre-approval — all with schema.org types, FAQ JSON-LD, countdown urgency, TCPA-consent forms, compliance language), dashboard now 20 live templates, Builder gains 5 template fieldsets + White-Label Branding section, sitemap/seo-ping/SEO-keeper auto-include all 30 URLs
- **Version**: 2.5.0 — Premium Pack + SEO Keeper: 3D tilt cards (perspective rotate-on-cursor), conic rotating glow borders on hero glass cards, animated gradient text on hero stats, scroll-parallax hero blobs, blur-in reveal variant, image shimmer skeletons, marquee utility; IndexNow integration (key file route + POST /api/seo-ping) and **rj-seo-keeper Cloudflare Worker** — daily cron (06:07 UTC) fetches the live sitemap, submits all 25 URLs to IndexNow (Bing/Yandex/Seznam/Naver shared index, multi-endpoint fallback) and warms the top 16 funnel pages for fast crawler responses; manual trigger at rj-seo-keeper.rickjefferson.workers.dev/run
- **Version**: 2.4.0 — Supreme Brand Integration: real RJ logo favicon (white serif RJ monogram on royal-blue radial gradient matching the official logo), BRAND config in helpers (single source of truth), Playfair Display luxury display font on funnel H1s, Glassmorphism 3.0 (Supreme liquid-glass spec), aurora ambient hero layer, kinetic char-by-char H1 typography, magnetic CTA buttons, branded footer block (logo + “Empowering Generational Wealth” tagline) on all 15 funnels, GEO meta (geo.region/placename/position/ICBM) on every page, Organization schema upgraded with logo ImageObject + full NM address + areaServed, apple-touch-icon + theme-color #003399
- **Version**: 2.3.0 — Gap-Closure: dead-CTA rescue (all 16 placeholder `href="#"` buy/apply buttons across 7 funnels now open a glass lead-capture modal wired to /api/lead with attribution + pixel events), `/sitemap.xml` (all 25 URLs, auto-origin), `/robots.txt` (AI crawlers welcomed: GPTBot, Google-Extended, PerplexityBot, ClaudeBot), universal `/thank-you` page (customizable via `?headline=&msg=&back=`, fires conversion pixels), branded 404 + 500 error pages (app.notFound/onError), `theme-color` meta on all funnels
- **Version**: 2.2.0 — Conversion Layer (`/static/funnel-extras.js`): exit-intent popup (desktop mouse-out + mobile fast-scroll fallback, once per session), sticky mobile CTA bar, scroll progress bar, back-to-top, auto FAQPage JSON-LD from `<details>` FAQs; one-line tracking pixels via URL params (`ga4`, `gtm`, `metaPixel`, `ttPixel`) with auto `generate_lead` / `begin_checkout` events (`window.rjfTrack`); UTM + gclid/fbclid/ttclid attribution auto-captured and attached to every lead; thank-you `redirect` param; universal `data-checkout` Stripe buttons; live status badges on /integrations; conversion-layer params (`cta`, `exitTitle`, `exitDesc`, `exit=0`, `sticky=0`, `progress=0`, `toTop=0`) + full Builder fields for all of it
- **Version**: 2.1.0 — RJ Design System: glassmorphism (`.glass`/`.glass-dark` auto-applied to hero cards & pills), framer-style motion engine (`/static/motion.js` — scroll reveals w/ stagger, hero gradient blobs, animated stat counters w/ expo-out easing, hover-lift cards), shadcn polish (focus-visible rings, input focus shadows, CTA shine sweep, spring transitions), icon micro-animations, auto © copyright footer on all 15 funnels + Command Center, full `prefers-reduced-motion` support
- **Version**: 2.0.0 — SEO/AEO/SGE engine, Stripe + email integrations, dark mode, 50 niche emails, 10 industry compliance packs
- **Version**: 1.2.0 — 15 live templates + Brand Kit Vault + full RJ Blue rebrand
- **v1.2 rebrand**: Command Center shell now runs the official RJ Blue + White system — logo in nav, `#2563eb → #0ea5e9` gradients, `rj.*` Tailwind palette, Space Grotesk headings, full brand footer (address, socials, © 2026, policy links), SEO meta description, OG/Twitter cards, and inline JSON-LD Organization schema in `<head>`
- **Last Updated**: 2026-07-22

---
⚠️ All templates and disclaimers are compliance-engineered from primary sources (CROA 15 U.S.C. §1679, Circular 230, TSR 16 C.F.R. 310, FTC Act §5, FCRA, GLBA, TCPA, CAN-SPAM) but are **not legal advice** — attorney review in your state is required before launch.
