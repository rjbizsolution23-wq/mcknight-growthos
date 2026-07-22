# RJ Funnel Command Center

## Project Overview
- **Name**: RJ Funnel Command Center (webapp)
- **Goal**: A living funnel system — 15 live parameterized funnel templates spanning Events/Tickets/Sponsors, Tax Services, Credit Repair, and the top 10 business niches — plus complete email sequence vaults and a compliance/disclaimer library.
- **Built by**: RJ Business Solutions · 1342 NM 333, Tijeras, New Mexico 87059 · rjbusinesssolutions.org

## URLs
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

### Universal Tracking & Conversion Params (v2.2 — every template)
- **Pixels**: `ga4=G-XXXX`, `gtm=GTM-XXXX`, `metaPixel=ID`, `ttPixel=ID` — official snippets injected server-side; leads fire `generate_lead`, checkout buttons fire `begin_checkout` to all loaded pixels via `window.rjfTrack(event, data)`
- **Attribution**: `utm_source/medium/campaign/term/content`, `gclid`, `fbclid`, `ttclid` + first external referrer are captured (sessionStorage) and merged into every lead payload automatically
- **Conversion layer**: `redirect=/thank-you` (post-submit redirect), `cta=Text` (sticky bar + exit popup CTA), `exitTitle=…`, `exitDesc=…`; opt-outs: `exit=0`, `sticky=0`, `progress=0`, `toTop=0`
- **Payments anywhere**: `<button data-checkout='{"priceId":"price_xxx"}'>` or `data-checkout='{"name":"Setup","amount":199700,"interval":"month"}'` → Stripe Checkout with loading state + pixel event
- **Auto FAQ schema**: any funnel with 2+ `<details>` FAQs gets FAQPage JSON-LD generated client-side for rich snippets

### Integrations Secrets
Copy `.dev.vars.example` → `.dev.vars` locally; production via `wrangler pages secret put`: `STRIPE_SECRET_KEY`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL`.

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
- **Storage**: none required — all content is statically generated server-side; template customization travels in the URL query string (shareable, bookmarkable, stateless)
- **Data flow**: Builder form → query params → Hono route → server-rendered custom funnel HTML

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
- Persisting saved funnel configurations (would use Cloudflare D1/KV)
- Export funnel page as standalone HTML file download
- Lead form → CRM/webhook wiring on templates (forms are stubbed with alerts)
- A/B variant generator per template
- Production deployment to Cloudflare Pages

## Recommended Next Steps
1. Deploy to Cloudflare Pages for a permanent URL
2. Add KV-backed "save my funnel" so configs get short shareable slugs
3. Wire template lead forms to a webhook/CRM endpoint
4. Add PDF export for the sponsor prospectus

## Deployment
- **Platform**: Cloudflare Pages — LIVE on Rick’s own Cloudflare account (project: rj-funnel-command-center)
- **Status**: ✅ LIVE in production — https://rj-funnel-command-center.pages.dev
- **Version**: 2.3.0 — Gap-Closure: dead-CTA rescue (all 16 placeholder `href="#"` buy/apply buttons across 7 funnels now open a glass lead-capture modal wired to /api/lead with attribution + pixel events), `/sitemap.xml` (all 25 URLs, auto-origin), `/robots.txt` (AI crawlers welcomed: GPTBot, Google-Extended, PerplexityBot, ClaudeBot), universal `/thank-you` page (customizable via `?headline=&msg=&back=`, fires conversion pixels), branded 404 + 500 error pages (app.notFound/onError), `theme-color` meta on all funnels
- **Version**: 2.2.0 — Conversion Layer (`/static/funnel-extras.js`): exit-intent popup (desktop mouse-out + mobile fast-scroll fallback, once per session), sticky mobile CTA bar, scroll progress bar, back-to-top, auto FAQPage JSON-LD from `<details>` FAQs; one-line tracking pixels via URL params (`ga4`, `gtm`, `metaPixel`, `ttPixel`) with auto `generate_lead` / `begin_checkout` events (`window.rjfTrack`); UTM + gclid/fbclid/ttclid attribution auto-captured and attached to every lead; thank-you `redirect` param; universal `data-checkout` Stripe buttons; live status badges on /integrations; conversion-layer params (`cta`, `exitTitle`, `exitDesc`, `exit=0`, `sticky=0`, `progress=0`, `toTop=0`) + full Builder fields for all of it
- **Version**: 2.1.0 — RJ Design System: glassmorphism (`.glass`/`.glass-dark` auto-applied to hero cards & pills), framer-style motion engine (`/static/motion.js` — scroll reveals w/ stagger, hero gradient blobs, animated stat counters w/ expo-out easing, hover-lift cards), shadcn polish (focus-visible rings, input focus shadows, CTA shine sweep, spring transitions), icon micro-animations, auto © copyright footer on all 15 funnels + Command Center, full `prefers-reduced-motion` support
- **Version**: 2.0.0 — SEO/AEO/SGE engine, Stripe + email integrations, dark mode, 50 niche emails, 10 industry compliance packs
- **Version**: 1.2.0 — 15 live templates + Brand Kit Vault + full RJ Blue rebrand
- **v1.2 rebrand**: Command Center shell now runs the official RJ Blue + White system — logo in nav, `#2563eb → #0ea5e9` gradients, `rj.*` Tailwind palette, Space Grotesk headings, full brand footer (address, socials, © 2026, policy links), SEO meta description, OG/Twitter cards, and inline JSON-LD Organization schema in `<head>`
- **Last Updated**: 2026-07-17

---
⚠️ All templates and disclaimers are compliance-engineered from primary sources (CROA 15 U.S.C. §1679, Circular 230, TSR 16 C.F.R. 310, FTC Act §5, FCRA, GLBA, TCPA, CAN-SPAM) but are **not legal advice** — attorney review in your state is required before launch.
