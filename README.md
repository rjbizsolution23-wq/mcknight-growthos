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

### API
- `GET /health` — health check JSON

## Email Sequences Included (Email Vault)
1. **Sponsor Cold Outreach** — 6 touches (Day 0→21, incl. Loom script + breakup)
2. **Pre-Event Nurture** — 8 emails + 4 SMS (TCPA-noted)
3. **High-Ticket Post-Call Follow-Up** — 7 emails (NEPQ-aligned)
4. **Tax Lead Nurture** — 7 emails (compliance-wired, disclaimers baked in)
5. **Credit B2C Nurture** — 8 emails (CROA-wired)
6. **Credit SaaS Trial Nurture** — 6 emails

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
- **Platform**: Cloudflare Pages (ready) — currently running in sandbox via PM2 + wrangler pages dev
- **Status**: ✅ Active (sandbox)
- **Version**: 1.1.0 — 15 live templates
- **Last Updated**: 2026-07-17

---
⚠️ All templates and disclaimers are compliance-engineered from primary sources (CROA 15 U.S.C. §1679, Circular 230, TSR 16 C.F.R. 310, FTC Act §5, FCRA, GLBA, TCPA, CAN-SPAM) but are **not legal advice** — attorney review in your state is required before launch.
