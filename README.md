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

> McKnight GrowthOS provides marketing, workflow and decision-support technology. Templates, disclosures and compliance tools are provided for operational support and do not constitute legal, tax, financial or regulatory advice. Customers remain responsible for professional review, licensing, consent management, advertising approval and compliance with applicable laws.

---

© McKnight Opportunity Group · Powered by RJ Business Solutions
