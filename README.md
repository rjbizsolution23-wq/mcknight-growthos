# McKnight GrowthOS

**AI-Powered Conversion and Revenue Operations Platform**

> Turn attention into pipeline—and pipeline into growth.

- **Parent organization**: McKnight Opportunity Group
- **Technology**: Powered by [RJ Business Solutions](https://rjbusinesssolutions.org)
- **Version**: 4.0.0 — Business Command Center

---

## Project Overview

McKnight GrowthOS connects conversion-focused funnels, lead management, email and SMS follow-up, SEO intelligence, social content and performance analytics — so businesses can capture more opportunities and move the right leads forward.

A landing page is not a growth system. GrowthOS is the operating layer connecting the entire customer journey:

```
Traffic → Landing Pages → Lead Capture → Lead Scoring → Email & SMS
→ Appointments & Sales → Payments → Follow-Up → Retention → Revenue Intelligence
```

## URLs

- **Production**: https://mcknight-growthos.pages.dev
- **GitHub**: https://github.com/rjbizsolution23-wq/mcknight-growthos
- **Health check**: https://mcknight-growthos.pages.dev/health → `{"status":"ok","app":"mcknight-growthos","version":"1.0.0"}`

## Platform Architecture

```
McKnight Opportunity Group
└── McKnight GrowthOS
    ├── Funnel Studio            (/builder)      — funnel customization & AI copywriting
    ├── LeadFlow CRM             (/leads)        — D1-backed lead inbox, AI prioritization, CSV export
    ├── Campaign Vault           (/emails)       — email & SMS sequences
    ├── Compliance Guard         (/compliance)   — compliance-aware language vault
    ├── SEO Intelligence         (/seo)          — meta/OG/schema tooling, sitemap, SEO pack API
    ├── Social AI Studio         (/builder)      — Workers AI platform-native promo posts
    ├── Integration Hub          (/integrations) — 9 integrations
    ├── Growth Command Center    (/)             — dashboard home
    ├── Conversion Playbooks     (/t/*)          — 30 industry funnel templates
    ├── Brand Control Center     (/brand)        — brand system, voice, colors, pricing tiers
    ├── Growth Intelligence      (dashboard)     — planning assumptions (not guaranteed results)
    ├── McKnight Ecosystem       (/ecosystem)    — full 10-brand portfolio map + brand funnels
    └── Readiness Passport       (/passport)     — Business Readiness Passport + Evidence Vault
```

### McKnight Ecosystem Layer (v1.1)

The `/ecosystem` hub maps the entire McKnight Opportunity Group portfolio — every brand as its own legal entity, with its own funnel page (`/ecosystem/:slug`) covering positioning, required infrastructure, revenue ladder and compliance anchors:

| Brand | Structure | Route |
|---|---|---|
| McKnight Opportunity Group | Parent/management company | `/ecosystem/opportunity-group` |
| The Contracting Preacher | Consulting and education business | `/ecosystem/contracting-preacher` |
| Contracting Preacher OS | SaaS/IP product | `/ecosystem/contracting-preacher-os` |
| McKnight Housing Initiative | Independent nonprofit | `/ecosystem/housing-initiative` |
| McKnight Capital Ready | Credit education & funding-readiness | `/ecosystem/capital-ready` |
| Capital Ready Legal Network | Referral/network brand — not a law firm | `/ecosystem/capital-ready-legal` |
| McKnight Freight Systems | Motor-carrier/transportation company | `/ecosystem/freight-systems` |
| McKnight FleetWorks | Repair and maintenance operation | `/ecosystem/fleetworks` |
| McKnight Early Learning Academy | Licensed childcare provider | `/ecosystem/early-learning` |
| McKnight LearningOS | Childcare SaaS/IP product | `/ecosystem/learningos` |

**Entity separation rule**: nonprofit donations, daycare tuition, trucking revenue, credit-repair payments and SaaS subscriptions are never mixed in one account.

The `/passport` page hosts the **Business Readiness Passport + Evidence Vault** — 15 verified intake data groups, 17 evidence document types (each with owner/version/effective/expiration/confidentiality/verification/AI-usage metadata), the AI can/cannot governance matrix, 6 required human approval roles, the 18-item Dr. McKnight master intake package (with copy-ready request email), and a lead-capture intake form (`_source: passport-intake`). Compliance anchors cited: SAM.gov entity checklist, Grants.gov registration, HUD CHDO, FTC CROA, 49 CFR Part 376, SC ABC Quality.

### Vertical Growth Suites

| Suite | Route | Tagline |
|---|---|---|
| **McKnight Event Growth** | `/events` | Fill the room. Fund the experience. Grow the impact. |
| **McKnight Tax Growth** | `/tax` | Turn tax-season attention into year-round client growth. |
| **McKnight Credit Growth** | `/credit` | Build trust. Capture demand. Move qualified clients forward. |
| **McKnight Local Growth** | `/t/*` (30 templates) | Proven growth systems for businesses that run locally and think bigger. |

## Completed Features

- ✅ 30 Conversion Playbooks (funnel templates) across real estate, fitness, coaching, e-commerce, SaaS, law, home services, med spa, insurance, agencies, restaurants, dental, auto, salons, mortgage, chiropractic, pet care, landscaping, cleaning, childcare, tutoring, accounting, photography, weddings, moving, events, tax, credit & more
- ✅ Funnel Studio with query-parameter customization + AI field autofill (Workers AI)
- ✅ LeadFlow CRM: D1 lead storage, AI lead prioritization, CSV export (`leadflow-crm-export.csv`), unlock UI
- ✅ Campaign Vault: email + SMS sequences per vertical
- ✅ Compliance Guard: compliance-aware language vault (CROA, TSR, Circular 230, FTC, TCPA, CAN-SPAM aware)
- ✅ SEO Intelligence: sitemap, robots, JSON-LD, OG tooling, SEO pack API
- ✅ Social AI Studio: `POST /api/ai/social` — 5 platforms with UTM-tracked funnel links
- ✅ Integration Hub: Resend, GHL, Stripe, Slack, Discord, Telegram, Twilio, Airtable, generic webhook
- ✅ Enterprise security: ADMIN_API_KEY lock, rate limiting, honeypot spam trap
- ✅ Brand Control Center: full McKnight brand system, voice, colors, pricing architecture
- ✅ White-label: `?brandName=&logo=&theme=dark` overrides per funnel
- ✅ McKnight Ecosystem hub: 10 brand funnels, execution order, smart additions, brand-asset & domain checklists, verified sources (v1.1)
- ✅ Business Readiness Passport + Evidence Vault page with governance matrix and intake capture (v1.1)


## v2.0 — Ultimate Funnel Command

All 30 funnels re-skinned in McKnight navy/gold, plus four new command layers:

### 🔐 Key Vault (`/integrations`)
- Upload a `.env` file (or paste keys) → every key auto-routes to its integration **instantly, no redeploy**
- Vault keys (stored in D1 `settings`) override deployed secrets via a merge proxy; masked status per key, grouped by integration
- API: `GET/POST /api/keys`, `POST /api/keys/upload` (raw .env body), `DELETE /api/keys/:name` — admin-locked when `ADMIN_API_KEY` set

### 🤖 AI Agent Command (`/agents`)
- SEO/SGE/AEO agent rewrites each funnel's `seoTitle`/`seoDesc`/`seoKeywords` **weekly** (lazy cron: auto-fires on traffic after 7 days, zero visitor latency via `waitUntil`) + manual Run Now (one or all 30)
- Reads last-7-day views + conversion per funnel; sharpens the angle when conversion is weak; compliance-aware prompt
- Explicit URL params always beat agent overrides — client customizations never touched; per-funnel reset
- API: `GET /api/agents/status`, `POST /api/agents/run`, `DELETE /api/agents/overrides/:funnel`

### 📬 Mail Command (`/mailer`)
- Send branded campaigns from the platform via SMTP-relay REST APIs: **Resend, SendGrid, Mailgun, Postmark, Brevo, SMTP2GO** (Workers can't open raw SMTP sockets — same providers, same result)
- Segment by funnel + lead status, or paste recipients; test-send to `LEAD_NOTIFY_EMAIL` first; full send log
- API: `GET /api/mail/status`, `POST /api/mail/send`

### 📊 Funnel Analytics (`/analytics`)
- Per-funnel data separation: views, leads, conversion % + daily views chart (7/30/90-day windows)
- View tracking fires automatically on every `/t/:slug` render
- API: `GET /api/analytics?days=N`

### New D1 tables (migration 0002)
`settings` (key vault), `copy_overrides` (agent copy), `funnel_views` (daily counters), `agent_log`, `mail_log`

## v3.0 — Cloudflare Deploy + Change Agent

### ☁️ Cloudflare Deploy (`/deploy`)
- Users add **their own** `CF_DEPLOY_API_TOKEN` + `CF_DEPLOY_ACCOUNT_ID` in the Key Vault → one-click deploy any of the 30 funnels to **their Cloudflare account** as a standalone Worker with its own `*.workers.dev` URL (live in ~5s)
- Custom params + live AI-agent copy baked into the deployed HTML; `/static/*` and `/api/lead`, `/api/checkout` etc. proxy back to the platform — **leads still flow into LeadFlow CRM, GHL, email, and alerts**
- Deployments listed + deletable from the UI; every deploy/failure/delete persisted in D1 `cf_deployments`
- API: `GET /api/cf/status` (token verification + list), `POST /api/cf/deploy` `{funnel, name?, params?}`, `DELETE /api/cf/deploy/:worker`

### 🪄 Change Agent (`/agents`)
- Describe any funnel change in **plain English** ("change the company to Summit Lending, city to Denver, CTA should say Book My Call") → the AI translates it into real funnel field changes and applies them **live instantly**
- Safety rails: agent may only set fields from each funnel's real param schema (`src/paramschema.ts`, 245 per-funnel params + 17 common params) — never arbitrary HTML/JS; values escaped by templates; compliance rules enforced
- Every request logged in D1 `change_requests` with the exact changes applied + one-click **revert** per request
- Change Agent and SEO Agent merge into the same `copy_overrides` — neither clobbers the other; explicit URL params always win
- API: `GET /api/changes`, `GET /api/changes/params/:funnel`, `POST /api/changes` `{funnel, request}`, `POST /api/changes/:id/revert`

### New D1 tables (migration 0003)
`cf_deployments` (every user deployment), `change_requests` (every plain-English change + revert state)

## Functional Entry Points (API)

| Method | Path | Purpose |
|---|---|---|
| GET | `/health` | App/version health |
| GET | `/api/health` | Integration + admin-lock status |
| POST | `/api/lead` | Lead capture (D1 + optional email/GHL/hooks delivery, honeypot, rate-limited) |
| GET | `/api/leads` | LeadFlow CRM data (requires `X-Admin-Key` when `ADMIN_API_KEY` set) |
| GET | `/api/leads/export` | CSV export (admin-locked) |
| POST | `/api/ai/copy` | AI funnel copywriting `{ template, brief }` |
| POST | `/api/ai/prioritize` | AI lead scoring (admin-locked) |
| POST | `/api/ai/social` | Social posts `{ template, params?, brief? }` → 5 platform posts w/ UTM links |
| GET | `/api/seo-pack?slug=` | Per-funnel SEO meta pack |
| GET | `/sitemap.xml`, `/robots.txt` | SEO surface |

## Data Architecture

- **Storage**: Cloudflare D1 `mcknight-growthos-leads` (id `404fcc20-c31f-4585-b061-40f541b1f8d5`), binding `DB`
- **Models**: `leads` (name, email, phone, source, UTM fields, score, created_at), `short_links`
- **AI**: Cloudflare Workers AI binding `AI` — `@cf/meta/llama-4-scout-17b-16e-instruct`
- **Migrations**: `migrations/0001_leads_and_links.sql` (applied local + remote)

## Brand System

- **Colors**: McKnight Navy `#0a1628` · Deep Navy `#050b16` · Gold `#d4a72c` / `#f4ce65` · Growth Blue `#2563eb` · Growth Cyan `#0ea5e9` · Growth Indigo `#4f46e5`
- **Primary gradient**: `linear-gradient(135deg, #0a1628 0%, #1e3a8a 48%, #0ea5e9 100%)`
- **Logo**: stylized M built from three connected pipeline nodes with an upward conversion path and a gold endpoint (`/static/logo.svg`) — infrastructure, not hype
- **Pricing tiers**: Sandbox (free) · Launch · Growth · Scale · Enterprise

## Deployment

- **Platform**: Cloudflare Pages (project `mcknight-growthos`)
- **Status**: ✅ Active — https://mcknight-growthos.pages.dev
- **Tech Stack**: Hono 4 + TypeScript + Vite + TailwindCSS (CDN) + Cloudflare D1 + Workers AI
- **Last Updated**: 2026-07-24 (v3.0.0 — Cloudflare Deploy + Change Agent)

### Local Development

```bash
npm install
npm run build
npx wrangler d1 migrations apply mcknight-growthos-leads --local
pm2 start ecosystem.config.cjs      # port 3001
curl http://localhost:3001/health
```

### Production Deploy

```bash
npm run build
npx wrangler d1 migrations apply mcknight-growthos-leads --remote   # when new migrations exist
npx wrangler pages deploy dist --project-name mcknight-growthos --branch main
```

### Secrets (optional integrations)

```bash
npx wrangler pages secret put ADMIN_API_KEY --project-name mcknight-growthos   # locks /api/leads
npx wrangler pages secret put RESEND_API_KEY --project-name mcknight-growthos
npx wrangler pages secret put GHL_API_KEY --project-name mcknight-growthos
# + SLACK_WEBHOOK_URL, DISCORD_WEBHOOK_URL, TELEGRAM_*, TWILIO_*, AIRTABLE_*, STRIPE_*
```

## Not Yet Implemented / Next Steps

- Custom domain (recommended: **McKnightGrowthOS.com** — purchase + DNS are handled outside this repo; ecosystem subdomain alternative: `growth.mcknightopportunity.com`)
- Set `ADMIN_API_KEY` secret to lock LeadFlow CRM endpoints in production
- Wire live integration keys (Resend / GHL / Stripe / notification hooks)
- McKnight Capital Ready hand-off integration (GrowthOS = acquisition, Capital Ready = delivery — distinct products)
- Published methodology/sources for Growth Intelligence planning assumptions

## Relationship to the McKnight Fleet

GrowthOS is the front-end acquisition engine for the McKnight ecosystem (Contracting Preacher OS, Capital Ready OS, MortgageOS, DriverHub, FleetWorks ServiceHub, LearningOS). GrowthOS owns marketing, funnels, lead capture, follow-up, campaigns, conversion tracking, SEO, social content and white-label growth infrastructure; sibling platforms own service delivery.

## Platform Disclaimer

## v4.0 — Business Command Center

**The all-in-one webinar + VSL + SMS growth machine, native on Cloudflare.**

### 🎥 Webinar Command Center (`/webinars`)
- **Host Zoom webinars right from GrowthOS** — Server-to-Server OAuth (no user login flow); drop `ZOOM_ACCOUNT_ID` + `ZOOM_CLIENT_ID` + `ZOOM_CLIENT_SECRET` in the Key Vault (create the app at marketplace.zoom.us → Build App → Server-to-Server OAuth)
- Create scheduled **webinars** (auto-registration, cloud recording, practice session, Q&A); accounts without a webinar license transparently **fall back to a registration-enabled meeting** — same workflow either way
- Link an event to any funnel → **every lead auto-registers with Zoom and receives their unique `join_url` instantly** (shown on the page + stored in D1)
- Events table: host Start link, Join link, Zoom registration page, registrant counts, cancel; Slack notification on every event created (if `SLACK_WEBHOOK_URL` set)
- API: `GET /api/zoom/status`, `POST /api/zoom/webinars`, `GET /api/zoom/webinars/:id/registrants`, `DELETE /api/zoom/webinars/:id`

### 🖥️ New funnel templates (32 total now)
- **`/t/webinar-live`** — webinar registration funnel: countdown, 3-secrets hero, host section, lead form that auto-registers with the linked Zoom event (`?webinar=<id>`) and reveals the personal join link on the spot
- **`/t/vsl`** — video sales letter funnel: `videoUrl` param auto-embeds **YouTube / Vimeo / Loom / Wistia / direct .mp4**, proof strip, strategy-call lead form, optional `gate=1` lead-gate
- Both fully wired into Funnel Studio, Change Agent param schema, SEO agent, analytics, CF Deploy and sitemap

### 📲 Twilio SMS Blast Engine (`/webinars`)
- Blast lead **segments by funnel** (same segment logic as Mail Command), manual number lists, or a safe test send to `TWILIO_TO`
- Batched sending (10-parallel), per-blast log in D1 `sms_log`, TCPA reminder built into the UI
- API: `POST /api/sms/send` `{body, funnel?, to?, test?}`, `GET /api/sms/status`

### 🔗 Lead pipeline upgrade
- `/api/lead` now: GHL sync → D1 → fan-out (Slack/Discord/Telegram/Twilio/Zapier/Airtable) → **Zoom auto-registration** (via explicit `_webinar` field or funnel-linked event) → email — all fail-soft, leads never break
- `/api/health` reports `zoom`, `sms`, `slack` readiness + platform `version`

### Data (migration 0004)
`webinars` (zoom_id, kind, topic, start_time, funnel, join/start/registration URLs, status) · `webinar_registrations` (per-lead unique join links) · `sms_log` (blast history)

---

## v5.0 — McKnight ClientOS (CRM Layer)

> **Every client. Every conversation. Every next step. Connected.**
> GrowthOS captures the lead. ClientOS manages everything after that.

### What shipped
- **Client 360** (`/clients`) — one record per person or business: personal, business, relationship and consent fields, unified activity timeline, tasks, tickets, documents, referrals, and a transparent health score.
- **8 brand-vertical pipelines** (blueprint-verbatim stages):
  | Pipeline | Brand |
  |---|---|
  | General Consulting | McKnight GrowthOS |
  | Government Contracting | Contracting Preacher OS |
  | Capital Readiness | McKnight Capital Ready |
  | Housing | McKnight Housing Initiative |
  | Mortgage Technology | McKnight MortgageOS |
  | Trucking | McKnight Freight Systems / DriverHub |
  | Fleet Repair | McKnight FleetWorks |
  | Childcare | McKnight Early Learning / LearningOS |
- **Automatic lead → client conversion** — every `/api/lead` submission is upserted (matched by email, then phone) into a Client 360 record and an open opportunity in the correct pipeline, routed by funnel slug (e.g. `tax-lead` → Capital Readiness, `mortgage` → Mortgage Tech, `childcare` → Childcare). Fail-soft: conversion errors never break lead capture.
- **21-stage controlled lifecycle** — visitor → lead → MQL → SQL → … → retained / referral partner / do-not-contact.
- **Transparent health scores** — 8 weighted operational factors (onboarding, documents, engagement, appointments, payments, projects, support, renewal), each with a human-readable "why". Never uses protected demographics. Bands: Thriving / Healthy / Needs attention / At risk / Immediate intervention.
- **Tickets** — 9-stage support flow (new → … → resolved → closed → reopened) with satisfaction tracking.
- **Referrals** — disclosure-provided + client-consent tracked per record, compensation status, conflict flags (regulated-referral controls per blueprint).
- **Document vault (metadata)** — categories, verification workflow (unverified/verified/rejected/expired), confidentiality levels, expiration alerts.
- **Kanban board** — drag-free stage movement (← / →), won/lost closing (won bumps the client to Active and adds account value).

### ClientOS API (admin key required except `/meta`)
| Endpoint | Purpose |
|---|---|
| `GET /api/clientos/meta` | Pipelines, brands, lifecycle stages, health factors |
| `GET/POST /api/clients` | List/search + create/update clients |
| `GET /api/clients/:id` | Full Client 360 (health, opps, timeline, tasks, tickets, docs, referrals) |
| `POST /api/clients/:id/activity` | Log a timeline event |
| `GET /api/opportunities?pipeline=` | Kanban board data |
| `POST /api/opportunities/:id/move` | Move stage or close won/lost |
| `POST /api/clients/:id/tasks` · `POST /api/tasks/:id/status` | Task management |
| `GET/POST /api/tickets` · `POST /api/tickets/:id/status` | Support tickets |
| `GET/POST /api/referrals` · `POST /api/referrals/:id/status` | Referral tracking |
| `POST /api/clients/:id/documents` · `POST /api/documents/:id/verify` | Document vault |
| `GET /api/clientos/stats` | Executive dashboard numbers |

### Data model (migration 0005)
`clients`, `opportunities`, `activities`, `client_tasks`, `tickets`, `referrals`, `client_documents`

### Deferred to future releases (per blueprint Release 2–4 phasing)
Client portal auth, e-signatures, billing/invoicing, appointment booking engine, form builder, workflow automation designer, AI client copilot.

## v5.1 — Brand-Themed Funnels + Full Workflow Wiring

### Every funnel now wears its brand's colors
All 32 funnels are automatically themed to the McKnight brand they feed — CTAs, accents, gradients, aurora backdrops, focus rings, selection color, scrollbar, plus a brand ribbon (top) and ecosystem footer strip on every page:

| Brand | Color | Funnels |
|---|---|---|
| McKnight Capital Ready | 🟢 #059669 | tax-lead, credit-service, credit-saas, accounting |
| McKnight MortgageOS | 🟣 #7c3aed | mortgage |
| McKnight Housing Initiative | 🔵 #0ea5e9 | real-estate |
| McKnight DriverHub | 🟠 #f59e0b | moving |
| FleetWorks ServiceHub | 🔴 #dc2626 | auto-services |
| McKnight LearningOS | 🩷 #ec4899 | childcare, tutoring |
| Contracting Preacher OS | 🔵 #2563eb | sponsor-deck |
| McKnight GrowthOS (flagship gold) | 🟡 #d4a72c | all remaining funnels |

- Force any brand for demos: `?brand=fleetworks` on any funnel URL.
- Client white-label (`?brandColor=` / `?bizLogo=`) still wins over brand theming.
- The visual map (`FUNNEL_BRAND` in helpers.ts) mirrors the CRM routing map (`FUNNEL_PIPELINE` in clientos.ts) — what a visitor sees is the brand whose pipeline they land in.

### Everything wired together (verified end-to-end)
One form submit on any funnel now triggers the complete connected flow:
1. **Lead stored** in D1 (LeadFlow CRM `/leads`)
2. **GoHighLevel sync** (contact → note → opportunity → workflow) when configured
3. **ClientOS conversion** — Client 360 record + opportunity in the correct brand pipeline (`/clients`)
4. **Zoom webinar auto-registration** with unique join link when the funnel is linked to a webinar
5. **Workflow fan-out** — Zapier/Make webhook, Slack, Discord, Telegram, Twilio SMS, Airtable
6. **Email notification** via the active mail provider
7. **NEW: unified timeline logging** — webinar registrations, GHL syncs and fired workflow channels are all recorded on the client's ClientOS timeline automatically

Verified per-brand: tax-lead→capital:Intake, mortgage→mortgage:Developer Lead, real-estate→housing:Inquiry, moving→trucking:Driver/Customer Lead, auto-services→fleetrepair:Service Request, childcare→childcare:Family Inquiry, sponsor-deck→govcon:Business Intake, everything else→consulting:New Lead. All 61 routes 200.

## v6.0 — Full Brand + Platform Fleet (McKnight Opportunity Group)

**10 brand flagship sites**, built with a premium dark-navy brand-site engine (`src/templates/brandSites.ts`) and blueprint-verbatim configs (`src/templates/brandSiteConfigs.ts`). Each site ships: sticky glass nav, kinetic hero, stats band, 6-card services grid, portal showcase (with data-isolation note), numbered workflow strip, compliance checklist, FAQ (schema.org), lead form, and the mandated attribution footer — *"A McKnight Opportunity Group platform. Technology powered by RJ Business Solutions."*

| Funnel | Brand | Accent | ClientOS Pipeline |
|---|---|---|---|
| `/t/opportunity-group` | McKnight Opportunity Group | Gold #d4a72c | consulting |
| `/t/contracting-preacher` | The Contracting Preacher | Gold #d4a72c | govcon |
| `/t/housing-initiative` | McKnight Housing Initiative | Green #16a34a | housing |
| `/t/capital-ready` | McKnight Capital Ready | Emerald #059669 | capital |
| `/t/mortgageos` | McKnight MortgageOS | Fintech blue #2563eb | mortgage |
| `/t/growth-command` | McKnight GrowthOS | Cyan/indigo #0ea5e9 | consulting |
| `/t/freight-systems` | McKnight Freight Systems | Steel blue #4682b4 | trucking |
| `/t/fleetworks` | McKnight FleetWorks | Safety orange #f97316 | fleetrepair |
| `/t/early-learning` | McKnight Early Learning Academy | Sky blue #38bdf8 | childcare |
| `/t/learningos` | McKnight LearningOS | Violet #7c3aed | childcare |

**Wiring**: brand sites are full funnels — leads post via `data-lead-form` → D1 → GHL → ClientOS pipeline (table above) → Zoom → hooks fan-out → email, with automation timeline logging. `BRAND_THEMES`/`FUNNEL_BRAND` (helpers.ts) stay in sync with `BRANDS`/`FUNNEL_PIPELINE` (clientos.ts). All 42 funnels in sitemap (71 routes total).

**AI copy protection**: `BRAND_SITE_SLUGS` (funnels.ts) excludes the 10 flagship sites from the SEO agent (`getCopyOverrides` / `maybeRefreshFunnel` / `optimizeFunnelCopy` all guard) — blueprint taglines, compliance language and attribution are canonical and never AI-rewritten.

**Compliance gates honored**: no 501(c)(3)/CHDO claims without determination; CROA prohibited claims excluded (no guaranteed deletions/score increases/funding); MortgageOS positioned as technology — NOT a lender/broker/AUS; 49 CFR 376 (truth-in-leasing) & 396 (inspection/maintenance) referenced; SC licensing/ABC Quality noted; AI drafts grants — humans verify and submit; Contracting Preacher CRM separation stated on-site. "Shared code ≠ shared unrestricted data."

**Deferred (per blueprint risk tier)**: real authenticated portals (Housing Impact, Capital Ready OS, DriverHub, ServiceHub, Family/Director/Teacher/Parent portals), live payments, mortgage API productization, childcare operations — require verified credentials/licenses before public activation.

## v6.1 — Universal Brand Engine (one branding logic, all 42 funnels)

Every funnel template now runs the **exact same branding pipeline** — no exceptions, no hardcoded off-brand colors:

- **`accentRemapCss(color, color2, darkText)`** (helpers.ts) — a single generator that remaps *every* Tailwind accent family templates use (orange/amber/yellow/blue/cyan/sky/teal/indigo/violet/purple/pink/rose/emerald) across every design token: CTA buttons + hovers, text accents, borders, chip tints, gradient heroes (`from/to/via-*-950` dark tints via `color-mix`), pulse-glow keyframes, `::selection`, focus rings, aurora, gradient text, glow borders, scrollbar. Red preserved for urgency/error semantics; grays untouched.
- **Same logic for both layers**: the funnel-brand layer (`brandThemeCss`) and the client white-label layer (`brandCss`, `?brandColor=`) both call `accentRemapCss` — white-label injected last, still wins.
- **GrowthOS exception removed**: the flagship brand (cyan `#0ea5e9` / indigo) now goes through the identical remap — all 42 funnels, one code path.
- **Brand favicon**: dynamic per-brand SVG favicon (brand color tile + brand initial), plus `theme-color` meta = brand hex (branded mobile browser chrome).
- **White-label contrast**: dark-vs-light button text auto-computed from client color luminance (`hexLum`).

Brand matrix (verified in production): tax-lead/credit-*/accounting → emerald, mortgage → fintech blue, real-estate → green, moving → steel blue, auto-services → safety orange, childcare/tutoring → violet, sponsor-deck → gold, all other local funnels → GrowthOS cyan, 10 flagship sites → own accents.

## v6.2 — Fleet Verification & Launch-Readiness Command Center (/verify)

The complete P0/P1/P2 verification framework, operationalized as a live system — **146 tracked items, 76 launch-blocking**, seeded into D1 (`verification_items`, migration 0006):

- **P0 (105 items)**: legal-entity map (per brand: legal name, DBA, EIN, ownership, signer, insurance, licenses, who owns software/employs staff/signs clients), name clearance ×13 (SC SoS, USPTO, common-law, domains, socials, attorney), domain decisions ×10 + governance, founder verified profile (every public credential needs evidence + permission), brand asset kits, exact service definitions, final pricing per brand, and 6 regulated compliance packets (Housing/Capital/Mortgage/Freight/FleetWorks/Early Learning) — each blocking.
- **P1 (29 items)**: verified case studies (no anonymous stats without documented calculation), testimonial standards, portfolio evidence, SOPs ×10, staffing/permissions matrix (no cross-line auto-access), platform inventory, delegated dev access, client-data migration audit (no import without consent + suppression history), per-brand integrations.
- **P2 (12 items)**: per-brand policy sets (not copy-pasted — different data/risk per business), support system, monitoring & recovery.
- **Founder Fleet Verification Packet**: all 30 packet items tracked individually, key ones blocking.

**Launch gates**: `/api/verify/summary` computes per-brand `launch_ready` — true only when all blocking items for the brand AND fleet-wide blocking items are verified/NA. `/verify` dashboard: gate cards per brand (READY/GATED + progress), filters (brand/priority/status/blocking-only), inline status updates + evidence/notes attach.

**API**: `GET /api/verify/summary` · `GET /api/verify/items?brand=&priority=&section=&status=` · `PUT /api/verify/items/:id` `{status|evidence|notes}` (statuses: pending/in_progress/received/verified/blocked/na).

**Standing position**: sites are built and deployed; production *claims* (credentials, stats, regulated language, contract pricing) stay out of public copy until the relevant gate is green.


## v6.4 — Style & Effects Engine (funnels fully editable)

**Animations and effects are now first-class editable parameters on every funnel** — via URL params, the Funnel Studio Builder (new "Style & Effects Engine" section), or plain-English requests to the AI Change Agent ("make it more exciting", "elegant luxury feel", "confetti when someone signs up").

| Param | Options | What it does |
|---|---|---|
| `anim` | fade, slide-up, slide-left, slide-right, zoom, flip, blur, none | Section entrance animation |
| `animSpeed` | slow, normal, fast | Animation speed |
| `fx` | max, normal, subtle, off | Overall effect intensity (off = kill everything) |
| `particles` | stars, snow, bubbles, fireflies, confetti, none | Canvas particle layer in the hero (~30fps, cheap) |
| `confetti` | 1 | Confetti burst when a lead submits any form |
| `heroFx` | aurora, blobs, spotlight, grid, waves, none | Hero background effect (spotlight follows cursor) |
| `font` | modern, elegant, bold, playful, mono | Typography preset (Google Fonts auto-loaded) |
| `radius` | sharp, soft, round, pill | Corner style system |
| `btnFx` | pulse, shine, bounce, glow, shake, none | CTA button animation |
| `cursorFx` | glow, ring, none | Custom cursor effect (fine pointers only) |
| `shadowFx` | soft, dramatic, neon, flat | Card shadow style |
| `bgPattern` | dots, grid, noise, none | Page background pattern |
| `tilt` / `kinetic` / `marquee` | 0 | Kill switches for 3D tilt / kinetic headline / marquee |

- CSS side generated by `styleFxCss()` in `src/templates/helpers.ts`; JS effects (particles, cursor, spotlight, waves, confetti) run in `motion.js` via `window.__RJF` flags.
- Effects respect `prefers-reduced-motion` and `fx=off`; colors follow the funnel's brand palette (or white-label `brandColor`).
- Change Agent system prompt now maps style vocabulary → params, so "add animations and effects" requests apply instead of being rejected.
- Example: `/t/coaching?anim=zoom&font=elegant&particles=stars&btnFx=bounce&heroFx=spotlight&confetti=1`


## v6.5 — Traffic Engine + Multi-Provider AI (OpenRouter · Hugging Face · Workers AI)

**The full loop: post → traffic → landing page → lead → attribution.**

### Traffic Command Center (`/traffic`)
- **Campaign Launcher** — pick any of the 42 funnels, add business name + brief, and AI generates ready-to-publish posts for Facebook, Instagram, LinkedIn, X (and TikTok when returned) with a UTM-tracked funnel link baked in.
- **UTM auto-tagging** — every campaign link carries `utm_source=social&utm_medium=organic&utm_campaign=<name>`; leads captured on the funnel inherit the tags, closing the attribution loop.
- **Attribution panels** — leads by source / campaign / funnel (`/api/traffic/attribution?days=30`), campaign history with per-campaign lead counts.
- **Multi-business ready** — each campaign stores `business` + `brand`, so you can run campaigns for every McKnight brand (or client) from one dashboard.

### Multi-Provider AI Router (`src/ai.ts` → `runLLM`)
Fail-soft chain — first configured provider wins, automatic fallthrough on errors:
1. **OpenRouter** (`OPENROUTER_API_KEY`, default model `meta-llama/llama-4-scout:free`)
2. **Hugging Face** (`HF_API_TOKEN`, default `meta-llama/Llama-3.1-8B-Instruct`)
3. **Cloudflare Workers AI** (built-in, always available in prod)

- `AI_PROVIDER` env forces preferred order (`openrouter` / `huggingface` / `workers`).
- ALL AI features route through the chain: social posts, funnel copy refresh, lead insights, SEO agents, Change Agent.
- `/api/health` now reports `aiProviders: {openrouter, huggingface, workersAi, chain}`.
- Keys hot-swap via the Integration Hub vault (`/integrations`) — no redeploy needed.

### New API endpoints
| Endpoint | What it does |
|---|---|
| `GET /api/funnels` | Public 42-slug funnel list |
| `POST /api/traffic/campaign` | Generate + save a social campaign (funnel, brief?, business?, brand?, campaign?, params?) |
| `GET /api/traffic/campaigns` | Saved campaigns + per-campaign lead counts |
| `GET /api/traffic/attribution` | Leads by source / campaign / funnel (`?days=` up to 90) |

### Data
- Migration `0007_campaigns.sql` — `campaigns` table (funnel, brand, business, campaign, funnel_url, posts JSON, brief) — applied local + remote.

### Verified
- 42/42 funnels pass the brand matrix (theme-color hex + brand name per FUNNEL_BRAND map).
- Live prod campaign generation E2E test passed (Workers AI), test row cleaned.
- Sitemap now 73 routes (incl. `/traffic`).


## v6.6 — Fleet Command Center (Official MOG Handoff Package)

Dr. McKnight's complete **Fleet Command Center** handoff — 27 pixel-committed HTML deliverables, brand assets, and design tokens — is now integrated and served live from GrowthOS.

### Fleet Command Center page (`/fleet`)
Organized directory of the entire package, grouped exactly per the handoff spec:
- **P0 Command Tools** (publication gate): Verification Packet · Fleet Dashboard · Fleet Brand System · Legal Entity Map · Clearance Tracker · Compliance Packets
- **Brand Kit & Identity**: Brand Portal · Brand Kit · Media & Presence Pack
- **Client-Facing Tools**: Client Intake · Bid Scorecard · Opportunity Kanban · Compliance Matrix · Onboarding · Intake Workbook
- **Business Operations**: Practical Assets (invoice/NDA/teaming) · Capability Statement · SAM Checklist
- **Sales · Voice · Media**: Outreach Kit · Testimonials · Thank You & Certificate · Grant Tracker · FAQ
- **Content**: Proposal Deck (with `deck_stage.js` engine) · Newsletter · Award Announcements
- Publication Lockdown banner + 10-brand fleet pill strip (official accent hexes from the handoff)

### Static package (`/static/fleet/`)
- All 27 documents served verbatim with slugified filenames; internal cross-links rewritten so the package's own `index.html` hub navigates correctly.
- `assets/` — official OG image, horizontal logos (light/dark), shield marks (gold/navy/outline), favicon, apple-touch-icon.
- Developer files: `design-tokens.css` (paste-ready TCP tokens), `tailwind.config.example.js`, `deck_stage.js`, `HANDOFF-README.md` (full 30-deliverable spec).

### Verified
- 27/27 documents return 200 in production; brand assets, tokens, and deck engine all live.
- Sitemap now 74 routes (incl. `/fleet`).

## v6.7 — Agent Access Layer: Brand Asset API + MCP Server (NEW)

AI agents & builders can now pull the entire McKnight brand system programmatically — read-only, public, no auth.

### REST API (JSON)
| Endpoint | Returns |
|---|---|
| `GET /api/brand` | Manifest: all endpoints, MCP info, usage snippets |
| `GET /api/brand/tokens` | Design tokens JSON — colors (navy `#0A1628` / gold `#C9A961` system), typography (Playfair Display / Inter / IBM Plex Mono + scale), spacing, radius, shadows, motion, gradients |
| `GET /api/brand/tokens.css` | 302 → `/static/fleet/design-tokens.css` (paste-ready CSS custom properties) |
| `GET /api/brand/themes` | 10 official fleet accent hexes + 10 live funnel themes + funnel→brand map + 42 funnel slugs |
| `GET /api/brand/themes/:key` | One theme (`mog growthos contracting capital mortgage housing freight fleetworks earlylearning learning`) with official fleet accent |
| `GET /api/brand/assets` | 8 logo/shield/icon/OG PNGs with absolute URLs |
| `GET /api/brand/docs` | All 27 fleet deliverables (grouped) + hub + dev files |
| `GET /api/brand/fonts` | Font stacks + ready Google Fonts import URL |
| `GET /llms.txt` | Plain-text agent guide (also at `/api/brand/llms.txt`) |

### MCP Server — `POST /mcp` (JSON-RPC 2.0, streamable HTTP)
- **7 tools**: `get_brand_manifest`, `get_brand_tokens`, `list_brand_themes`, `get_brand_theme`, `list_brand_assets`, `list_fleet_docs`, `get_fonts`
- Handles `initialize` / `ping` / `tools/list` / `tools/call` / notifications (202) / batch requests
- **Connect (Claude Code)**: `claude mcp add --transport http mcknight-brand https://mcknight-growthos.pages.dev/mcp`
- **Generic config**: `{"mcpServers":{"mcknight-brand":{"url":"https://mcknight-growthos.pages.dev/mcp"}}}`
- `GET /mcp` returns human/agent discovery info + connect instructions

### Files
- `src/brandapi.ts` — DESIGN_TOKENS (structured JSON of design-tokens.css), BRAND_ASSETS, brandApi router, MCP server, llms.txt generator
- `/fleet` page — new "Agent Access" section with clickable endpoints + connect snippets
- CORS enabled on both `/api/brand/*` and `/mcp`; 5-min cache headers on brand JSON

## v6.7.1 — Master Documentation (NEW)

- **`/docs`** — full platform documentation rendered in-app: sticky filterable table of contents, download button, print-to-PDF. In the nav after Fleet Command.
- **Source of truth**: `public/static/docs/MASTER-DOCUMENTATION.md` (raw at `/static/docs/MASTER-DOCUMENTATION.md`)
- **18 sections**: platform overview, architecture, all 23 dashboard pages, 42 funnels, 31 URL params, Style & Effects Engine, Change Agent, Brand API + MCP, Fleet Command Center, full REST reference (70+ endpoints), integrations (38 vault keys), D1 schema (7 migrations), ClientOS, Traffic Engine, SEO/AEO, ops runbook, version history.

## v6.7.2 — GTM & Sales Plan (NEW)

- **`/docs?doc=GTM-SALES-PLAN.md`** — complete go-to-market & sales plan for selling the GrowthOS model: 15 sections (positioning, 3 ICPs, 4 productized offers A–D with pricing, sales system w/ personalized-demo motion, 6 marketing channels, 90-day launch plan, cold email/call/SMS scripts, objection handling, 15-min demo playbook, partnerships/licensing tiers, KPIs + 12-month revenue model, risks, asset inventory).
- `/docs` upgraded to a **Documentation Center** with doc-switcher tabs (Master Documentation | GTM & Sales Plan), deep-linkable via `?doc=` param; download/raw buttons follow the active doc.
- Source: `public/static/docs/GTM-SALES-PLAN.md`

> McKnight GrowthOS provides marketing, workflow and decision-support technology. Templates, disclosures and compliance tools are provided for operational support and do not constitute legal, tax, financial or regulatory advice. Customers remain responsible for professional review, licensing, consent management, advertising approval and compliance with applicable laws.

---

© McKnight Opportunity Group · Powered by RJ Business Solutions
