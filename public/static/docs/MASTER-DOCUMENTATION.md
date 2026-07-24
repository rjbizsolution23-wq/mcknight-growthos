# McKnight GrowthOS — Master Documentation

**Version 6.7.0** · Production: https://mcknight-growthos.pages.dev · GitHub: https://github.com/rjbizsolution23-wq/mcknight-growthos

> The complete operating manual for the McKnight GrowthOS platform: every dashboard page, every API endpoint, the funnel + style engine, the Brand Asset API / MCP server, integrations, database schema, and deployment runbook.

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [Architecture & Tech Stack](#2-architecture--tech-stack)
3. [Dashboard Pages (23 pages)](#3-dashboard-pages)
4. [Funnel System — 42 Live Funnels](#4-funnel-system)
5. [URL Parameter Engine (31 params)](#5-url-parameter-engine)
6. [Style & Effects Engine (v6.4)](#6-style--effects-engine)
7. [AI Change Agent](#7-ai-change-agent)
8. [Brand Asset API + MCP Server (v6.7)](#8-brand-asset-api--mcp-server)
9. [Fleet Command Center (v6.6)](#9-fleet-command-center)
10. [Full REST API Reference](#10-full-rest-api-reference)
11. [Integrations (GHL · Zoom · Stripe · Email · SMS · AI)](#11-integrations)
12. [Key Vault — Zero-Redeploy Configuration](#12-key-vault)
13. [Database Schema (D1)](#13-database-schema)
14. [ClientOS — CRM & Pipelines](#14-clientos)
15. [Traffic Engine (v6.5)](#15-traffic-engine)
16. [SEO / AEO Infrastructure](#16-seo--aeo-infrastructure)
17. [Deployment & Operations Runbook](#17-deployment--operations-runbook)
18. [Version History](#18-version-history)

---

## 1. Platform Overview

McKnight GrowthOS is an edge-native marketing operating system for the **McKnight Opportunity Group** 10-brand fleet. It runs entirely on Cloudflare Pages/Workers (zero servers) and provides:

- **42 live conversion funnels** across 10 brands — every headline, color, animation, and effect editable via URL parameters, a visual Builder, or a plain-English AI Change Agent.
- **Full CRM (ClientOS)** — leads, clients, pipelines, tasks, documents, tickets, referrals, health scoring — in Cloudflare D1.
- **Integration hub** — GoHighLevel, Zoom, Stripe, 6 email providers, Twilio SMS, Slack/Discord/Telegram webhooks, 3 AI providers — all configured through an encrypted key vault with **zero redeploys**.
- **Agent Access Layer** — REST Brand API + MCP server so AI agents can pull the brand system into any build.
- **Fleet Command Center** — the official 27-document brand handoff package served verbatim.

### The 10-Brand Fleet

| # | Brand | Official Accent | Live Funnel Theme |
|---|-------|----------------|-------------------|
| 00 | MOG — Opportunity Group | `#C9A961` gold | `#d4a72c` |
| 01 | The Contracting Preacher | `#C9A961` gold | `#d4a72c` |
| 02 | Housing Initiative | `#2F6B4A` green | `#16a34a` |
| 03 | Capital Ready | `#9B7A2B` deep gold | `#059669` |
| 04 | MortgageOS | `#4A5FA5` blue | `#2563eb` |
| 05 | GrowthOS | `#8B1F1F` signal red | `#0ea5e9` |
| 06 | Freight Systems | `#B8823A` burnt gold | `#4682b4` |
| 07 | FleetWorks | `#5C6B7C` steel grey | `#f97316` |
| 08 | Early Learning Academy | `#B37A8C` rose | `#38bdf8` |
| 09 | LearningOS | `#4A6B7C` teal navy | `#7c3aed` |

> **Note:** "Official Accent" = the handoff/master brand system palette (source of truth for brand identity, from the Fleet package). "Live Funnel Theme" = colors currently rendered on the 42 funnels. Both are exposed by `GET /api/brand/themes`. Re-theming funnels to the official palette is a pending decision.

---

## 2. Architecture & Tech Stack

```
┌─────────────────────────────────────────────────────────────┐
│  Cloudflare Pages  (mcknight-growthos.pages.dev)            │
│  ┌───────────────────────────┐  ┌─────────────────────────┐ │
│  │  dist/_worker.js (Hono 4) │  │  /static/* (direct CDN) │ │
│  │  - 23 dashboard pages     │  │  - motion.js, app.js    │ │
│  │  - 42 funnel templates    │  │  - fleet/ (27 docs)     │ │
│  │  - /api/* (70+ endpoints) │  │  - fleet/assets/ (PNGs) │ │
│  │  - /api/brand/* + /mcp    │  │  - docs/ (this file)    │ │
│  └────────────┬──────────────┘  └─────────────────────────┘ │
│               │                                              │
│  ┌────────────▼──────────────┐                               │
│  │  D1: mcknight-growthos-leads (SQLite at edge)            │
│  │  7 migrations · leads, clients, pipelines, keys vault,   │
│  │  changes, webinars, verification, campaigns              │
│  └───────────────────────────┘                               │
└─────────────────────────────────────────────────────────────┘
External (via fetch, keys from vault): GHL · Zoom S2S OAuth ·
Stripe · Resend/SendGrid/Mailgun/Brevo/Postmark · Twilio ·
OpenRouter/HuggingFace/Workers AI · Slack/Discord/Telegram
```

- **Framework**: Hono 4 (TypeScript/TSX), built with Vite → single `dist/_worker.js` (~999 kB, 270 kB gzip)
- **Runtime**: Cloudflare Workers (edge, no Node APIs — pure fetch/Web Crypto)
- **Database**: Cloudflare D1 (`mcknight-growthos-leads`), migrations `0001`–`0007`
- **Frontend**: Server-rendered HTML + TailwindCSS CDN + FontAwesome + Chart.js + vanilla JS (`/static/app.js`, `/static/motion.js`, `/static/funnel-extras.js`)
- **Routing**: `_routes.json` sends `/*` to the worker, excludes `/static/*` (served directly by CDN)
- **Repo layout**:

```
src/
  index.tsx          # App entry: page routes, sitemap, robots, /llms.txt, mounts /api + /api/brand + /mcp
  api.ts             # 70+ REST endpoints (leads, clients, keys, changes, zoom, mail, sms, traffic, verify...)
  brandapi.ts        # v6.7 Brand Asset API + MCP server + llms.txt
  changeagent.ts     # AI Change Agent (plain English → funnel params)
  paramschema.ts     # 31 URL params: COMMON_PARAMS + per-funnel FUNNEL_PARAMS
  funnels.ts         # FUNNEL_SLUGS (42) + brand-site slugs
  templateRegistry.ts# Funnel template registry (shared with CF deploy engine)
  templates/helpers.ts # BRAND_THEMES, FONT_PRESETS, styleFxCss, funnelHead
  ghl.ts / zoom.ts / mail.ts / ai.ts / hooks.ts / cloudflare.ts / clientos.ts / keys.ts / agents.ts
  pages/             # 23 dashboard pages (layout.ts = shared shell + nav)
public/static/       # JS assets, fleet/ package, docs/
migrations/          # 0001–0007 D1 SQL
ecosystem.config.cjs # PM2 dev config (port 3001)
wrangler.jsonc       # CF Pages config + D1 binding
```

---

## 3. Dashboard Pages

All pages share the dark command-center shell (`src/pages/layout.ts`) with sidebar navigation.

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home Dashboard | KPIs, funnel directory, quick links |
| `/events` | RJ Funnel Command Center | Event funnel management (frozen/stable) |
| `/tax` | Tax Funnel | Tax lead funnel control |
| `/credit` | Credit Funnels | Credit repair/SaaS funnel control |
| `/emails` | Email Center | Email templates & sending |
| `/compliance` | Compliance | Compliance documentation |
| `/builder` | **Funnel Builder** | Visual editor: every param as form field incl. Style & Effects dropdowns; generates shareable funnel URLs |
| `/leads` | Leads | Lead table, filters, CSV export, status updates |
| `/brand` | Brand | Brand identity overview |
| `/seo` | SEO Center | SEO pack, sitemap, IndexNow ping |
| `/integrations` | **Integrations** | Key vault UI: paste keys for GHL/Zoom/Stripe/email/SMS/AI — live status badges, zero redeploy |
| `/ecosystem` | Ecosystem | 10-brand directory |
| `/ecosystem/:slug` | Brand Detail | Per-brand page with funnels |
| `/passport` | Passport | Cross-brand identity |
| `/agents` | AI Agents | Copy optimization agents, run log |
| `/mailer` | Mailer | Campaign composer, provider picker |
| `/analytics` | Analytics | Funnel views, leads, conversion charts |
| `/deploy` | Deploy | One-click deploy funnels as standalone CF Workers |
| `/webinars` | Webinars | Zoom webinar create/manage/registrants |
| `/clients` | **ClientOS** | Full CRM: clients, pipelines, tasks, docs, tickets, referrals, health |
| `/verify` | Fleet Verification | D1-backed verification command center |
| `/traffic` | Traffic Engine | Campaigns → AI posts → UTM-tracked links |
| `/fleet` | **Fleet Command Center** | 27 official handoff docs, brand assets, agent access section |

Utility routes: `/t/:slug` (42 funnels) · `/f/:code` (short links) · `/thank-you` · `/health` · `/sitemap.xml` · `/robots.txt` · `/llms.txt`

---

## 4. Funnel System

**42 live funnels** at `/t/:slug`, server-rendered, brand-themed, SEO-optimized, with view tracking and AI copy overrides.

### Funnel Slugs (42)

**Brand sites (10):** `opportunity-group` `contracting-preacher` `housing-initiative` `capital-ready` `mortgageos` `growth-command` `freight-systems` `fleetworks` `early-learning` `learningos`

**Industry funnels (32):** `tax-lead` `credit-service` `credit-saas` `accounting` `mortgage` `real-estate` `insurance` `law-firm` `dental` `chiropractic` `med-spa` `fitness` `salon` `restaurant` `cleaning` `landscaping` `home-services` `auto-services` `moving` `pet-care` `photography` `wedding-venue` `tutoring` `childcare` `coaching` `agency` `saas-trial` `ecommerce` `webinar-live` `event-landing` `vsl` `sponsor-deck`

### How a funnel renders

1. Request hits `/t/:slug` → template from `templateRegistry.ts`
2. `paramschema.ts` validates query params against `allowedParams(slug)` (common + per-funnel)
3. `funnelHead()` (helpers.ts) assembles: brand theme → accent remap CSS → dark mode → custom brand color → **style/effects CSS** → font link → `window.__RJF` config for JS effects
4. AI copy overrides (if the weekly agent produced any) are applied
5. View tracked in D1 (`waitUntil`, zero latency)
6. Lead forms POST to `/api/lead` → D1 + GHL push + email notify + webhook fan-out

---

## 5. URL Parameter Engine

Every funnel accepts URL query parameters. **31 total params** — all validated, all combinable.

### Content & Tracking Params

| Param | Purpose | Example |
|-------|---------|---------|
| `seoTitle` | Page title override | `?seoTitle=Book Your Spot` |
| `seoDesc` | Meta description | `?seoDesc=Limited seats...` |
| `seoKeywords` | Meta keywords | |
| `cta` | Primary CTA button text | `?cta=Claim My Spot` |
| `deadline` | Countdown deadline | `?deadline=2026-08-01` |
| `exitTitle` / `exitDesc` | Exit-intent modal copy | |
| `redirect` | Post-submit redirect URL | |
| `theme` | `light` / `dark` | `?theme=dark` |
| `brandColor` / `accentColor` | Custom hex accents | `?brandColor=%23C9A961` |
| `bizLogo` | Logo image URL | |
| `ghlTag` | Extra GHL tag on leads | `?ghlTag=vip` |
| `ga4` / `gtm` / `metaPixel` / `ttPixel` | Analytics IDs injected | `?ga4=G-XXXX` |

Plus per-funnel params (headlines, offers, pricing, testimonials, etc.) defined in `FUNNEL_PARAMS` — see `/api/changes/params/:funnel` for the live schema of any funnel.

### Style & Effects Params (15 — see §6)

`anim` `animSpeed` `fx` `particles` `confetti` `heroFx` `font` `radius` `btnFx` `cursorFx` `shadowFx` `bgPattern` `tilt` `kinetic` `marquee`

---

## 6. Style & Effects Engine

**v6.4** — every visual/motion aspect of all 42 funnels is editable three ways: URL params, Builder dropdowns, or plain English through the Change Agent.

| Param | Values | Effect |
|-------|--------|--------|
| `anim` | `fade` `slide` `zoom` `flip` `none` | Scroll-reveal animation style |
| `animSpeed` | `slow` `normal` `fast` | Animation duration multiplier |
| `fx` | `off` `subtle` `normal` `max` | Master intensity (off kills all JS effects) |
| `particles` | `stars` `snow` `bubbles` `fireflies` `confetti` | Canvas particle engine (~30fps) |
| `confetti` | `1` | Confetti burst on lead-form success |
| `heroFx` | `aurora` `spotlight` `waves` | Hero section effect (spotlight tracks mouse) |
| `font` | `modern` `elegant` `bold` `playful` `mono` | Font preset (elegant=Cormorant Garamond+Lora, bold=Archivo Black, playful=Fredoka+Nunito, mono=JetBrains Mono) |
| `radius` | `none` `small` `normal` `round` `pill` | Global corner radius |
| `btnFx` | `pulse` `bounce` `shine` `glow` | CTA button effect |
| `cursorFx` | `glow` `ring` | Custom cursor follower (lerp) |
| `shadowFx` | `none` `soft` `dramatic` `glow` | Card/element shadows |
| `bgPattern` | `grid` `dots` `noise` `mesh` | Background pattern overlay |
| `tilt` | `1` | 3D tilt on cards |
| `kinetic` | `1` | Kinetic typography on headlines |
| `marquee` | `1` | Marquee strips |

**Implementation:** `styleFxCss(q, c1, c2)` in `templates/helpers.ts` emits scoped CSS + font `<link>`; JS effects read `window.__RJF` (set by `funnelHead`) in `public/static/motion.js` (sections 6b/6c/6c2/6d). `prefers-reduced-motion` and `fx=off` disable everything.

**Example:**
```
/t/tax-lead?particles=stars&heroFx=spotlight&btnFx=bounce&font=bold&confetti=1&fx=max
```

---

## 7. AI Change Agent

Plain-English funnel editing. POST a request; the agent maps vocabulary → params, validates against the funnel's allow-list, stores the change in D1, and the funnel serves it live.

```
POST /api/changes        { "funnel": "tax-lead", "request": "make it more exciting with stars and a bouncy button" }
GET  /api/changes        → history
POST /api/changes/:id/revert
GET  /api/changes/params/:funnel  → full param schema for that funnel
```

Vocabulary mapping (in the SYSTEM prompt, `src/changeagent.ts`): "more exciting/flashy" → `particles` + `btnFx=bounce` + `heroFx=spotlight`; "elegant/luxury" → `font=elegant` + `shadowFx=dramatic` + `fx=subtle`; "calmer/professional" → `fx=subtle` + `anim=fade`; etc.

Requires an AI provider key in the vault (OpenRouter / HuggingFace / Workers AI). Status: `/api/health` → `changeAgent: true`.

---

## 8. Brand Asset API + MCP Server

**v6.7** — read-only, public, CORS-enabled, no auth. Lets any AI agent or builder pull the brand system into a build.

### REST Endpoints

| Endpoint | Returns |
|----------|---------|
| `GET /api/brand` | Manifest: all endpoints, MCP info, usage snippets |
| `GET /api/brand/tokens` | Design tokens JSON: colors, typography, spacing (4pt), radius (2px system), shadows, motion, gradients |
| `GET /api/brand/tokens.css` | 302 → `/static/fleet/design-tokens.css` |
| `GET /api/brand/themes` | Official fleet accents + live funnel themes + funnel→brand map + 42 slugs |
| `GET /api/brand/themes/:key` | One theme (`mog growthos contracting capital mortgage housing freight fleetworks earlylearning learning`) |
| `GET /api/brand/assets` | 8 logo/shield/icon/OG PNGs, absolute URLs |
| `GET /api/brand/docs` | All 27 fleet deliverables grouped + hub + dev files |
| `GET /api/brand/fonts` | Font stacks + Google Fonts import URL |
| `GET /llms.txt` | Plain-text agent guide (also `/api/brand/llms.txt`) |

### MCP Server — `POST /mcp`

JSON-RPC 2.0 over streamable HTTP. Methods: `initialize`, `ping`, `tools/list`, `tools/call`, `resources/list`, `prompts/list`, notifications (→ 202), batch.

**7 tools:** `get_brand_manifest` · `get_brand_tokens` · `list_brand_themes` · `get_brand_theme` · `list_brand_assets` · `list_fleet_docs` · `get_fonts`

**Connect:**
```bash
# Claude Code
claude mcp add --transport http mcknight-brand https://mcknight-growthos.pages.dev/mcp
```
```json
{ "mcpServers": { "mcknight-brand": { "url": "https://mcknight-growthos.pages.dev/mcp" } } }
```
```bash
# Raw curl
curl -X POST https://mcknight-growthos.pages.dev/mcp -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_brand_tokens","arguments":{}}}'
```

### Brand Rules for Builders

1. Gold `#C9A961` = prestige accent. Red `#8B1F1F` = CTAs/urgency ONLY, never decoration.
2. Headings: Playfair Display · Body: Inter · Eyebrows/labels: IBM Plex Mono uppercase 0.2em tracking.
3. Radius 2px nearly everywhere (pill 20px, avatar 9999px). Spacing on 4pt baseline.
4. `logo-horizontal-light.png` on dark surfaces; `logo-horizontal-dark.png` on light.

---

## 9. Fleet Command Center

**v6.6** — the official MOG handoff package (27 pixel-committed HTML deliverables) served verbatim at `/static/fleet/`, organized at `/fleet`.

### Document Index (grouped)

**P0 Command Tools** (gate — nothing publishes until closed): `fleet-verification-packet` · `fleet-dashboard` · `fleet-brand-system` · `legal-entity-map` · `clearance-tracker` · `compliance-packets`

**Brand Kit & Identity:** `brand-portal` · `brand-kit` · `media-and-presence-pack`

**Client-Facing Tools:** `client-intake-form` · `bid-scorecard` · `opportunity-tracker` · `compliance-matrix` · `onboarding-checklist` · `intake-workbook`

**Business Operations:** `practical-assets` · `capability-statement` · `sam-registration-checklist`

**Sales · Voice · Media:** `outreach-kit` · `testimonial-cards` · `thank-you-and-certificate` · `grant-tracker` · `faq-knowledge-base`

**Deck · Newsletter · Announcements:** `proposal-deck` · `newsletter-template` · `award-announcements`

Plus the package hub: `index.html`. URL pattern: `https://mcknight-growthos.pages.dev/static/fleet/<slug>.html` (Cloudflare also serves the extensionless pretty URL).

### Brand Assets (`/static/fleet/assets/`)

`logo-horizontal-light.png` · `logo-horizontal-dark.png` · `shield-navy.png` · `shield-gold.png` · `shield-outline-lg.png` · `og-image.png` · `favicon-32.png` · `apple-touch-icon.png`

### Dev Files

`design-tokens.css` (paste-ready `--tcp-*` custom properties) · `tailwind.config.example.js` · `deck_stage.js` (proposal deck engine) · `HANDOFF-README.md`

---

## 10. Full REST API Reference

Base: `https://mcknight-growthos.pages.dev/api` · CORS enabled · Admin-locked endpoints require `Authorization: Bearer <ADMIN_API_KEY>` **only if** `ADMIN_API_KEY` is set in the vault (check `/api/health` → `adminLock`).

### Health & Meta
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/health` | Full integration status: stripe/email/ghl/d1/ai/zoom/sms/slack/mail/vault/cfDeploy/changeAgent |
| GET | `/api/funnels` | All 42 funnel slugs + metadata |
| GET | `/api/seo-pack` | SEO metadata pack |
| POST | `/api/seo-ping` | IndexNow ping to search engines |

### Leads & Links
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/lead` | Capture lead: D1 + GHL push + email notify + webhook fan-out. Body: `{name, email, phone?, funnel?, offer?, utm_*?...}` |
| GET | `/api/leads` | List leads (filter: `?funnel=&status=&q=`) |
| GET | `/api/leads/stats` | Counts by funnel/status/day |
| GET | `/api/leads/export.csv` | CSV export |
| PATCH | `/api/leads/:id` | Update status/notes |
| POST | `/api/links` | Create short link → `/f/:code` |
| GET | `/api/links` | List short links + click counts |
| POST | `/api/checkout` | Stripe checkout session |

### Brand & Agent Access (v6.7)
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/brand` `/tokens` `/tokens.css` `/themes` `/themes/:key` `/assets` `/docs` `/fonts` `/llms.txt` | See §8 |
| GET/POST | `/mcp` | MCP server (§8) |

### Change Agent & Params
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/changes` | Plain-English change request `{funnel, request}` |
| GET | `/api/changes` | Change history |
| POST | `/api/changes/:id/revert` | Revert a change |
| GET | `/api/changes/params/:funnel` | Full param schema for a funnel |

### AI
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/ai/copy` | Generate funnel copy |
| POST | `/api/ai/insights` | Lead insights |
| POST | `/api/ai/social` | Social post generation |
| GET | `/api/agents/status` | Copy-agent status + overrides |
| POST | `/api/agents/run` | Run copy optimization |
| DELETE | `/api/agents/overrides/:funnel` | Clear overrides |

### Key Vault
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/keys` | List configured keys (masked) |
| POST | `/api/keys` | Set key — **FLAT body**: `{"name":"GHL_API_KEY","value":"..."}` |
| POST | `/api/keys/upload` | Bulk upload .env file content |
| DELETE | `/api/keys/:name` | Remove key |

### Integrations Status & Send
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/ghl/status` | GHL config + connectivity |
| GET | `/api/zoom/status` | Zoom S2S OAuth status |
| POST | `/api/zoom/webinars` | Create webinar/meeting |
| GET | `/api/zoom/webinars/:id/registrants` | List registrants |
| DELETE | `/api/zoom/webinars/:id` | Delete |
| GET | `/api/mail/status` | Email providers configured |
| POST | `/api/mail/send` | Send campaign/email |
| GET | `/api/sms/status` | Twilio status |
| POST | `/api/sms/send` | Send SMS |
| GET | `/api/hooks/status` | Webhook fan-out status |
| POST | `/api/hooks/test` | Test webhooks |
| GET | `/api/cf/status` | CF deploy engine status |
| POST | `/api/cf/deploy` | Deploy funnel as standalone Worker |
| DELETE | `/api/cf/deploy/:worker` | Remove deployment |

### ClientOS (CRM)
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/clientos/meta` | Pipelines, brands, stages, health factors |
| GET | `/api/clientos/stats` | CRM stats |
| GET/POST | `/api/clients` | List/create clients |
| GET | `/api/clients/:id` | Client detail (activity, tasks, docs) |
| POST | `/api/clients/:id/activity` `/tasks` `/documents` | Add records |
| POST | `/api/tasks/:id/status` | Update task |
| POST | `/api/documents/:id/verify` | Verify doc |
| GET/POST | `/api/tickets` + `/api/tickets/:id/status` | Support tickets |
| GET/POST | `/api/referrals` + `/api/referrals/:id/status` | Referrals |
| GET | `/api/opportunities` + POST `/api/opportunities/:id/move` | Kanban pipeline |

### Traffic & Verification
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/traffic/campaign` | Create campaign (AI posts + UTM links) |
| GET | `/api/traffic/campaigns` | List campaigns |
| GET | `/api/traffic/attribution` | UTM attribution report |
| GET | `/api/verify/summary` + `/api/verify/items` | Fleet verification state |
| PUT | `/api/verify/items/:id` | Update verification item |
| GET | `/api/analytics` | Funnel views/leads analytics |

---

## 11. Integrations

All keys go in the **vault** via `/integrations` UI or `POST /api/keys` — live in ≤30s, **no redeploy ever**.

### GoHighLevel (CRM push)
Keys: `GHL_API_KEY` `GHL_LOCATION_ID` `GHL_PIPELINE_ID` `GHL_STAGE_ID` `GHL_WORKFLOW_ID`.
Every lead → GHL contact with tags `['growthos','funnel-'+slug]` + offer/custom/UTM tags; extra form fields land in the contact note. Pipeline/stage/workflow attach if configured.

### Zoom (S2S OAuth — webinars/meetings)
Keys: `ZOOM_ACCOUNT_ID` `ZOOM_CLIENT_ID` `ZOOM_CLIENT_SECRET` (Server-to-Server OAuth app).
Create webinars from `/webinars`, auto-register leads, fail-safe: funnel still captures leads if Zoom fails. **Currently unconfigured — awaiting the 3 keys.**

### Stripe
Key: `STRIPE_SECRET_KEY` → `POST /api/checkout` creates checkout sessions.

### Email (6 providers, auto-pick or force with `MAIL_PROVIDER`)
`RESEND_API_KEY` · `SENDGRID_API_KEY` · `MAILGUN_API_KEY`+`MAILGUN_DOMAIN` · `BREVO_API_KEY` · `POSTMARK_SERVER_TOKEN`. Lead notifications: `LEAD_NOTIFY_EMAIL` `LEAD_FROM_EMAIL`.

### SMS
`TWILIO_ACCOUNT_SID` `TWILIO_AUTH_TOKEN` `TWILIO_FROM` (+optional `TWILIO_TO` for notify).

### AI (3 providers, router picks; force with `AI_PROVIDER`)
`OPENROUTER_API_KEY` (+`OPENROUTER_MODEL`) · `HF_API_TOKEN` (+`HF_MODEL`) · Cloudflare Workers AI (built-in). Powers: Change Agent, copy generation, insights, social posts, traffic campaigns.

### Webhook Fan-out (lead events)
`SLACK_WEBHOOK_URL` · `DISCORD_WEBHOOK_URL` · `TELEGRAM_BOT_TOKEN`+`TELEGRAM_CHAT_ID` · `LEAD_WEBHOOK_URL` (generic) · Airtable: `AIRTABLE_API_KEY`+`AIRTABLE_BASE_ID`+`AIRTABLE_TABLE`.

### CF Deploy Engine
`CF_DEPLOY_API_TOKEN` `CF_DEPLOY_ACCOUNT_ID` → deploy any funnel as a standalone Cloudflare Worker from `/deploy`.

### Admin Lock
`ADMIN_API_KEY` — when set, mutating endpoints require `Authorization: Bearer <key>`.

---

## 12. Key Vault

- **UI**: `/integrations` — paste keys, live status badges
- **API**: `POST /api/keys` with **flat** body `{"name":"...","value":"..."}`; bulk: `POST /api/keys/upload` with .env content
- **Storage**: D1 `keys` table; values masked in all reads
- **Runtime**: `cfg()` proxy merges vault over env bindings with a **30-second cache** — new keys are live within 30s, zero redeploys
- 38 known key names across 12 groups (GHL, Zoom, Stripe, Email×5, SMS, AI×3, webhooks×4, Airtable, CF deploy, admin)

---

## 13. Database Schema

D1 database: `mcknight-growthos-leads`. Migrations in `/migrations`:

| Migration | Tables |
|-----------|--------|
| `0001_leads_and_links.sql` | `leads` (name/email/phone/funnel/offer/utm/status/notes), `links` (short codes + clicks) |
| `0002_command_center.sql` | `funnel_views`, `copy_overrides`, `agent_log`, `keys` (vault) |
| `0003_deploy_and_changes.sql` | `deployments` (CF workers), `change_requests` (Change Agent history) |
| `0004_webinars_and_sms.sql` | `webinars` (Zoom events), `sms_log` |
| `0005_clientos.sql` | `clients`, `client_activity`, `client_tasks`, `client_documents`, `tickets`, `referrals` |
| `0006_verification.sql` | `verify_items` (fleet verification state) |
| `0007_campaigns.sql` | `campaigns`, `campaign_posts` (Traffic Engine) |

**Commands:**
```bash
npx wrangler d1 migrations apply mcknight-growthos-leads --local   # local
npx wrangler d1 migrations apply mcknight-growthos-leads          # production
npx wrangler d1 execute mcknight-growthos-leads --command="SELECT COUNT(*) FROM leads" --json
```

---

## 14. ClientOS

Full CRM at `/clients`, D1-backed.

- **8 pipelines** (consulting, contracting, credit, tax, mortgage, freight, learning, housing) — each with brand + ordered stages; funnels auto-route via `pipelineForFunnel()`
- **Lifecycle stages** + **health scoring** (`computeHealth` over engagement/payment/activity factors → health bands)
- **Convert lead → client** with one call; activity log, tasks, document verification, support tickets, referral tracking
- Kanban opportunities board (`/api/opportunities` + move endpoint)

---

## 15. Traffic Engine

**v6.5** at `/traffic`: create a campaign → AI generates platform-specific posts → each post gets a UTM-tracked short link to a funnel → attribution report ties leads back to campaign/platform/post (`/api/traffic/attribution`).

---

## 16. SEO / AEO Infrastructure

- `sitemap.xml` — 74 URLs (23 pages + 42 funnels + ecosystem pages), auto-dated
- `robots.txt` — explicitly welcomes GPTBot, Google-Extended, PerplexityBot, ClaudeBot
- **IndexNow** — key file served at `/<key>.txt`; `POST /api/seo-ping` notifies engines
- `/llms.txt` — agent-readable platform/brand guide
- Funnel-level: `seoTitle/seoDesc/seoKeywords` params, OG tags, JSON-LD, canonical URLs
- AI copy agents refresh funnel copy weekly (lazy) for SEO/SGE/AEO

---

## 17. Deployment & Operations Runbook

### Local Development (sandbox)
```bash
cd /home/user/mcknight-growthos
npm run build                                  # vite → dist/_worker.js
pm2 start ecosystem.config.cjs                 # 'growthos' on port 3001 (~13s warmup)
curl http://localhost:3001/health              # {"status":"ok","version":"6.7.0"}
pm2 logs growthos --nostream                   # safe log check
```

### Production Deploy
```bash
npm run build
npx wrangler pages deploy dist --project-name mcknight-growthos --branch main
# wait ~30s for propagation, then verify:
curl -s https://mcknight-growthos.pages.dev/api/health
```

### New D1 migration
```bash
# create migrations/000X_name.sql, then:
npx wrangler d1 migrations apply mcknight-growthos-leads --local   # test locally
npx wrangler d1 migrations apply mcknight-growthos-leads           # then prod
```

### Adding an integration key (zero redeploy)
```bash
curl -X POST https://mcknight-growthos.pages.dev/api/keys \
  -H 'Content-Type: application/json' \
  -d '{"name":"ZOOM_ACCOUNT_ID","value":"..."}'
# live within 30s (cfg cache)
```

### Git
```bash
git add -A && git commit -m "message" && git push origin main
```
Repo: `rjbizsolution23-wq/mcknight-growthos`, branch `main`.

### Health Checklist
- `/health` → version matches latest deploy
- `/api/health` → verify `d1:true`, `ai:true`, `changeAgent:true`; `ghl/zoom/mail` reflect vault keys
- `/t/tax-lead` → funnel renders; `/fleet` → 27 docs; `/api/brand` → manifest; `POST /mcp initialize` → serverInfo

---

## 18. Version History

| Version | Commit | Delivered |
|---------|--------|-----------|
| v6.7.0 | `71c5cce` | **Agent Access Layer**: Brand Asset API (`/api/brand/*`), MCP server (`/mcp`, 7 tools), `/llms.txt`, /fleet Agent Access section |
| v6.6.0 | `caa9b29` | **Fleet Command Center**: 27 official handoff docs + 8 brand assets + design tokens at `/static/fleet/`, `/fleet` page |
| v6.5.0 | `b5d129f` | **Traffic Engine**: campaigns → AI posts → UTM links → attribution; multi-provider AI router; `/api/funnels` |
| v6.4.0 | `dc58ec5` | **Style & Effects Engine**: 15 style params on all 42 funnels (URL/Builder/Change Agent); particle/cursor/hero FX; font presets |
| v6.3 | — | Zoom E2E + fail-safe lead capture |
| v6.2 | — | Fleet Verification Command Center (D1) |
| v6.1 | — | Universal accent branding across funnels |
| v6.0 | — | Brand-title guard |
| ≤v5.x | — | Funnels, ClientOS CRM, key vault, GHL/Stripe/email/SMS integrations, AI agents, deploy engine, SEO infra, webinars, analytics |

---

**Pending / awaiting user input:**
- Zoom keys (3) → live webinar E2E · GHL keys → CRM push live · Email provider key → notifications live
- Decision: re-theme 42 funnels to official handoff palette (`#C9A961` system)
- Decision: back fleet interactive tools (Verification Packet, Clearance Tracker, Kanban) with D1
- Decision: wire GHL customFields (currently extra fields go to contact note)

*Generated 2026-07-24 · McKnight GrowthOS v6.7.0*
