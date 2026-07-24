# Handoff: McKnight Opportunity Group — Fleet Command Center

## Overview

The **Fleet Command Center** is a unified operating platform for the **McKnight Opportunity Group (MOG)** — a family of 10 connected brands led by Dr. McKnight across federal consulting, credit/funding, mortgage software, growth software, transportation, repair, childcare, learning software, housing nonprofit, and holdings/management.

**The Fleet — 10 brands:**

| # | Brand | Sector | Accent Color |
|---|---|---|---|
| 00 | McKnight Opportunity Group (MOG) | Parent / Holdings | Gold `#C9A961` |
| 01 | The Contracting Preacher (TCP) | Federal contracting consulting | Gold `#C9A961` |
| 02 | McKnight Housing Initiative (MHI) | Nonprofit 501(c)(3) housing | Quiet Green `#2F6B4A` |
| 03 | McKnight Capital Ready (MCR) | Credit / funding operator | Deep Gold `#9B7A2B` |
| 04 | McKnight MortgageOS (MMOS) | Mortgage software / IP | Steady Blue `#4A5FA5` |
| 05 | McKnight GrowthOS (MGOS) | Growth software / IP | Signal Red `#8B1F1F` |
| 06 | McKnight Freight Systems (MFS) | Transportation operator | Burnt Gold `#B8823A` |
| 07 | McKnight FleetWorks (MFW) | Fleet repair operator | Steel Grey `#5C6B7C` |
| 08 | McKnight Early Learning Academy (MELA) | Licensed childcare | Muted Rose `#B37A8C` |
| 09 | McKnight LearningOS (MLOS) | Childcare software / IP | Teal Navy `#4A6B7C` |

The Command Center provides:

1. **A P0 verification gate** — nothing publishes about any brand until entity, credential, and evidence documentation is complete
2. **A shared brand identity system** with a master shield + connected sub-brand marks
3. **Client-facing operating tools** (intake forms, bid scoring, Kanban pipeline, compliance matrix, onboarding checklist)
4. **Business operations templates** (invoices, agreements, NDA, teaming, case studies, sell sheet, pricing)
5. **Sales, marketing, and media assets** (outreach kit, testimonials, thank-you cards, certificates, podcast/YouTube/Zoom assets, grant tracker, FAQ)

**30 deliverables total**, spanning:
- 6 P0 command tools (Verification Packet · Dashboard · Brand System · Legal Entity Map · Clearance Tracker · Compliance Packets)
- 3 brand/identity documents
- 6 client-facing interactive tools
- 9 business operations documents
- 6 sales/voice/media assets
- 3 marketing content assets (Proposal Deck · Newsletter · Award Pack)

Plus the master **Fleet Command Center index** that hubs everything with a publication-lockdown banner and fleet status pills.

## About the Design Files

The files in this bundle are **design references created in HTML** — working prototypes that demonstrate the intended look, behavior, and interactions of the final product. They are **not production code to copy directly**.

The developer's task is to **recreate these HTML designs in the target codebase's existing environment** — React (Next.js), Vue (Nuxt), SwiftUI, Flutter, or native — using its established patterns, component libraries, state management, and routing.

**If no codebase exists yet** (which is likely for a fleet this size), the recommended stack is:

- **Next.js 14+ App Router** with React Server Components by default
- **Tailwind CSS** using the design tokens shipped in `design-tokens.css`
- **shadcn/ui** or **Radix UI** primitives for forms, dialogs, and interactive components
- **Framer Motion** for the subtle enter/hover transitions
- **Supabase or Cloudflare D1** for backing the interactive tools (verification packet, clearance tracker, grant tracker, opportunity Kanban) — currently all client-side localStorage
- Deploy to **Vercel** or **Cloudflare Pages**

For multi-tenant brands, plan for a **monorepo with a shared brand-system package**, where each of the 10 brands is either a separate route group with tenant-scoped styling, a subdomain, or (long-term) its own app sharing the design-tokens package.

## Fidelity

**High-fidelity (hifi).** Every file in this bundle is pixel-committed:
- Final brand palette, typography, spacing, and layout — no wireframes
- Exact hex values, font weights, and interaction states
- Print-ready CSS (media queries, page breaks, `aspect-ratio` for letter/deck)
- Working interactivity in all tools (drag-drop Kanban, click-cycle clearance dots, scoring sliders, autosave forms, editable matrix rows, search+filter FAQ)
- Sub-brand color-coding baked into the compliance packet CSS
- Placeholder content and warning banners consistently applied where verification blocks publication

Recreate the UI **pixel-perfectly** in the target codebase, then map interactivity to the framework's idioms (React state, form libraries, drag-drop packages, DB persistence in place of localStorage).

---

## Design Language Summary

### Voice & Positioning

- **Straight-shooting, faith-anchored, federal-fluent.** Serious tone for serious audiences (federal buyers, small-business owners, foundations, regulators).
- Scripture (Proverbs 16:3) appears as a **footer/closing element**, never a hero — faith is stewardship, not a sales hook.
- Numbers are always **specific and evidenced** ("89% win rate — placeholder pending verification"), never vague or invented.
- No emoji, no hype language, no dark-pattern urgency.
- Regulated brands (Housing, Capital Ready, MortgageOS, Freight, FleetWorks, Early Learning) always carry a **red warning strip** describing the compliance risk they operate under.

### Visual System

- **Serif for authority (Playfair Display headlines)** paired with **sans for clarity (Inter body)** and **mono for tags/stats (IBM Plex Mono)**.
- **Deep navy + pulpit gold + warm ivory** — the fleet's shared shell; evokes government seals and pulpit brass.
- **Signal red** used exclusively for CTAs, urgency, and warning strips (never decoration).
- **Italic gold accents** on headline emphasis words (`<em>` inside `<h1>`).
- **Aurora-style radial gradient overlays** on dark navy backgrounds — never full-bleed gradients.
- **Master shield mark** (see `Fleet Brand System.html`) is used across all 10 brands; sub-brand distinction comes through per-brand accent color + interior silhouette (house, steps, wrench, book, truck, chevrons, etc.).
- Ornamental elements (cross, seal, shield, monogram) are hand-built as simple SVG geometry — never AI illustrations or clip art.

### The Master Rule: Publication Lockdown

Every asset carries the same absolute rule:

> No public claim about win rates, dollar volumes, 501(c)(3) status, active housing programs, government contracting experience, credentials, or client counts publishes until documented evidence lives in the Fleet Verification Packet.

This means the developer must build the client-facing sites with **draft-mode-by-default patterns** — stats have placeholder values, testimonials have "permission required" flags, regulated-brand pages show pre-launch states until compliance closes.

---

## Screens / Views

### 1. Fleet Command Center Index — `index.html` (Primary Deliverable)

**Purpose:** Master directory. Anyone on the team can find any asset, see fleet status at a glance, and drill into P0 gate tools.

**Layout:**
- **Hero** (52px padding, navy background with two-point radial gradient): brand tab + meta corner → 68px Playfair "Architecture complete. Verification pending." headline → lede → 4-column stats row (Brands · Deliverables Shipped · P0 Gates Closed · Live Staging)
- **Publication Lockdown banner** (red-left-border on ivory): the absolute rule with anchor links to Verification Packet + Dashboard
- **Section 01 — P0 Command Tools** (2×3 grid of gate cards): Verification Packet · Fleet Dashboard · Fleet Brand System · Legal Entity Map · **Clearance Tracker** · **Compliance Packets**
- **Section 02 — Fleet at a Glance**: fleet-strip card with 10 color-coded brand pills (locked · staging · blocked · launched) and CTA to open Dashboard
- **Section 03 — Brand Kit & Identity** (3-column cards): Portal · Kit · Fleet System
- **Section 04 — Client-Facing Tools** (3×2 grid): Intake Form · Scorecard · Kanban · Matrix · Onboarding · Workbook
- **Section 05 — Business Operations** (3×3 grid): Invoice/Estimate · Engagement · NDA · Teaming · Case Study · Sell Sheet · Pricing · Capability Statement · SAM Checklist
- **Section 06 — Sales · Voice · Media** (3×2 grid): Outreach Kit · Testimonials · Thank-You/Cert · Media Pack · Grant Tracker · FAQ
- **Section 07 — Deck · Newsletter · Announcements** (3-column): Proposal Deck · Newsletter · Award Pack

**Components:**

- **Gate card** (`.gate` class): Navy background · red left-border · 5px thick · badge pill (top) · h4 with italic gold em · description · gold arrow. Hover: `translateY(-2px)` + shadow deepen. See css for gates with different left-border colors indicating priority (red for blocker, gold for status board, gold-3 for draft, slate for counsel, warn/gold for interactive, ok/green for regulated).
- **Standard card** (`.card` class): White with light-gray border · 16:10 thumb with badge + big glyph · body with title/description/foot arrow. Thumbs alternate navy/ivory/gold background variants.

---

### 2. P0 Command Tools

#### 2a. Fleet Verification Packet — `Fleet Verification Packet.html`

**Purpose:** Live intake tool that captures every entity, credential, and compliance packet field required before any public brand launch.

**Layout:** Two-column app shell — 260px sticky sidebar + main content.

**Sidebar:**
- Brand mark + product name
- Section nav grouped by priority: **P0** (Founder · Legal Entities · Names & Domains · Brand Assets · Services & Pricing) · **P0 Compliance** (Housing · Capital Ready · MortgageOS · Freight · FleetWorks · Early Learning) · **P1** (Content & Proof · Tech Access · Data Migration)
- Progress bar showing % of all fields filled
- Action buttons: Save Draft · Export JSON · Print/PDF · Clear

**Main:**
- Header with lockdown badge banner
- 14 sections, each with numbered heading + P0/P1 tag + sub/intro paragraph
- Section 2 (Entities) uses expandable `<details>` accordions — 10 entities each with 12-18 fields
- Compliance sections (6-11) each carry their own red warning strip
- Footer bar with scripture verse + Save/Export/Send-to-Dr. McKnight buttons

**Fields use standard patterns:**
- Text input: transparent background, no border except 1.5px dashed bottom (gold when focused), Playfair 14px italic
- Textarea: full 1px bordered box, Inter 13px
- Select: custom triangle indicator, Inter 13px
- Checkgroup: 3-column pill labels with hover fill, checked = solid navy background + ivory text

**State:** Persists everything to `localStorage` under key `mog_fleet_packet_v1` on every `input`/`change` event. Progress recalculates on every change.

**Interactive behaviors:**
- Autosave (no explicit save button needed except for the toast confirmation)
- Progress calculation: (filled inputs) / (total inputs) × 100
- Entity accordion header "role" text turns green when ≥40% of fields inside are filled
- Send-to-Dr. McKnight: exports JSON + opens mailto with pre-filled subject/body

#### 2b. Fleet Dashboard — `Fleet Dashboard.html`

**Purpose:** Visual P0/P1/P2 status board for all 10 brands. Publication gate at a glance.

**Layout:**
- **Hero** (navy, 44px padding): brand + status timestamp meta → 52px headline "Architecture complete. Verification pending." → lede → 4-stat row (Brands · P0 Gate Closed · In Staging · Publicly Launched)
- **Publication Lockdown warning strip** (red-left-border)
- **Section 01 — Brand Status** (2-column grid, 10 brand cards)
- **Section 02 — Recommended Launch Order** (navy card with 3×3 grid of 9 sequential steps)

**Brand card** (`.b-card`):
- Header (navy background, radial gradient overlay): brand ID (mono) · name (Playfair 20px 800) · role (mono 9px) → status pill (locked/blocked/staging/launched) + big % (Playfair 26px gold-3)
- Body: 3-column progress strip (P0 red-border · P1 warn-border · P2 ok-border) each showing done/total + progress bar
- 3 expandable `<details>` sections (P0 / P1 / P2) each containing a 2-column grid of checkable items
- Footer strip (ivory): domain name + current blocker text (red if P0 incomplete)

**Interactive behaviors:**
- Click any checkbox → toggles state in `localStorage` key `mog_fleet_dashboard_v1`
- Aggregate stats re-render on every check
- Status pill auto-flips from "blocked" to "staging OK" when P0 hits 100%
- Reset Checks button clears local state
- Export Status Report → JSON with full brand-by-brand item state

#### 2c. Fleet Brand System — `Fleet Brand System.html`

**Purpose:** Master identity blueprint showing how the 10 brands connect visually.

**Sections:**
1. **Hero** — MOG parent mark + "One family. Ten brands." headline
2. **System diagram** — Navy card with center parent mark + 9-column grid of sub-brand silhouettes below with names + roles
3. **Sub-brand lockups** — 2-column grid of 10 brand cards each showing dark + light lockup preview + usage strip
4. **Sub-brand accent color palette** — Horizontal 10-swatch strip with each brand's accent color
5. **Fleet rules** — 8 rule cards (2× warn + 6× informational): pending clearance, regulated brands, shape rule, type rule, neutrals rule, accent use, voice, naming

**Sub-brand SVG shields** (all inherit master shield geometry):
- MOG: Circle with "MOG" text + "OPPORTUNITY" curved
- TCP: Cross + document (existing mark)
- MHI: House inside shield
- MCR: Ascending steps + growth line
- MMOS: House + circuit dots
- MGOS: Rocket upward arrow with speed lines
- MFS: Truck profile with cab + trailer + wheels
- MFW: Crossed wrenches
- MELA: Book + sprout / candle
- MLOS: Nested chevrons (growth/learning)

Each shield uses the same outer path so they read as siblings, but the interior silhouette instantly signals sector.

#### 2d. Legal Entity Map — `Legal Entity Map.html`

**Purpose:** Structural blueprint — parent/child relationships, IP ownership, signing authority, intercompany agreements.

**Layout:**
- Warning strip at top: "This document is a template — not legal advice"
- **Section 1 — Ownership Tree**: MOG parent node at top (navy), 9 child nodes below indented with dashed gold-left-border tree connector
- **Section 2 — Authority Matrix**: Full-width table with rows for each entity, columns for Sign Clients / Sign Vendors / Bank Signer / Employs Staff / Owns Software IP / Files Taxes
- **Section 3 — Intercompany Agreements**: 3×2 grid of 6 agreement types (Management Services · IP License · Referral/Cross-Sell · Sublease/Facilities · Employee Assignment · Nonprofit Firewall)

**Node styles:**
- Parent node: navy background with gold radial gradient
- Child nodes: white background with gray border, contain ID (mono) + name (Playfair) + role + meta columns (Signer · Insurance · Special IDs)

#### 2e. Clearance Tracker — `Clearance Tracker.html` (NEW · Interactive)

**Purpose:** Section 3 of the Verification Packet in interactive form — track name/trademark/domain/social clearance across 13 fleet names.

**Layout:**
- Header (navy): brand + 4 stats (Names Tracked · Fully Clear · Risk Flagged · Unchecked) + Export/Reset buttons
- Lockdown strip
- 4-item color legend (Unknown gray · Clear green · Hold amber · Risk red)
- Main grid: 13 rows, each with:
  - **Name cell** (ivory, 200px wide): ID + name + domain
  - **8 check cells**: SC SoS · USPTO TM · State TM · Common-Law · Domain · Socials · Similar-Risk · Counsel
  - Each check cell shows a colored dot + status text; state-{clear/hold/risk} classes apply background color hints
- Below the grid: 13 expandable `<details>` panels, each with a 5-field notes form (USPTO note, SC SoS note, Domain note, Socials note, Similar-name notes textarea)

**Interactive behaviors:**
- Click any check cell → opens a floating menu (positioned below the cell) with 4 options (Unknown / Clear / Hold / Risk)
- Keyboard shortcuts (menu open): U/C/H/R to set state, Escape to close
- Click cycles: Unknown → Clear → Hold → Risk → Unknown (menu is optional shortcut)
- Notes autosave on input
- Export JSON dumps full clearance state + notes per brand
- Reset requires confirmation

**Storage:** `localStorage` key `mog_clearance_v1`

#### 2f. Compliance Packets — `Compliance Packets.html` (NEW · Print-first)

**Purpose:** Six one-page compliance handouts, one per regulated brand.

**Format:** Each sheet is 8.5×11 aspect ratio with `page-break-after: always` — designed to print as a 6-page PDF or view as a scrollable book online.

**Universal sheet structure:**
1. **Top brand-strip** (8px): navy → sub-brand accent color at 62% split
2. **Header** (navy background, radial gradient): 
   - Brand mark (colored to sub-brand accent) + brand name + subtitle
   - Stamp (right-aligned): "Compliance Packet · P0" + Volume/Sheet reference
   - 28px Playfair headline with sub-brand-colored italic em
   - Small serif italic sub-line
3. **Red warning strip**: brand-specific regulatory risk
4. **Body** (2-column grid): 2 categories of checklist items, each with checkbox squares
5. **Readiness Sequence**: 5-step process rows with big colored numbers, timelines
6. **Footer strip** (navy, absolute bottom): key contact placeholders + scripture

**Six sheets, each with sub-brand color scheme:**

| Sheet | Brand | Accent | Warning |
|---|---|---|---|
| 1 | Housing | `#2F6B4A` Quiet Green | 501(c)(3) / CHDO claims require IRS letter |
| 2 | Capital Ready | `#9B7A2B` Deep Gold | CROA + state credit-services-org law |
| 3 | MortgageOS | `#4A5FA5` Steady Blue | Loan limits must verify against official source |
| 4 | Freight | `#B8823A` Burnt Gold | FMCSA authority + insurance filings required |
| 5 | FleetWorks | `#5C6B7C` Steel Grey | State-varying repair-consumer statutes |
| 6 | Early Learning | `#B37A8C` Muted Rose | No enrollment before license + background checks |

Local nav at top with 6 category jump-links.

---

### 3. Brand Kit & Identity (already documented in earlier handoff)

- **`Brand Portal.html`** — interactive download portal
- **`Brand Kit.html`** — print-ready 15-section brand book
- **`Fleet Brand System.html`** — see 2c above

---

### 4. Client-Facing Interactive Tools

All of these use `localStorage` for persistence in the prototype. In production, migrate to authenticated backend storage.

- **`Client Intake Form.html`** — 9-section autosaving form (`tcp_intake_v1`)
- **`Bid Scorecard.html`** — 100-point scoring (10 disqualifiers + 9 weighted sliders)
- **`Opportunity Tracker.html`** — Kanban drag-drop pipeline (`tcp_pipeline_v1`)
- **`Compliance Matrix.html`** — Editable RTM with inline selects
- **`Onboarding Checklist.html`** — 24-checkpoint 90-day roadmap with sign-off blocks
- **`Intake Workbook.html`** — 20-section operating manual (reference doc)

---

### 5. Business Operations Documents (draft — counsel review required)

- **`Practical Assets.html`** — Sticky-nav single-page bundle of 8 templates:
  - Invoice · Estimate · Master Engagement Agreement · Mutual NDA · Teaming Agreement (FAR 9.601) · Case Study · Sell Sheet · 3-Tier Pricing
- **`Capability Statement.html`** — 1-page SAM/GSA federal document
- **`SAM Registration Checklist.html`** — 1-page client handout

---

### 6. Sales · Voice · Media Assets

- **`Outreach Kit.html`** — 18 copy-paste scripts (email sequence · LinkedIn · phone · voicemail · follow-ups · objections). Each has a Copy button that grabs formatted text to clipboard.
- **`Testimonial Cards.html`** — 6 square variants + 3 horizontal bars + web block + message-style — all with red-warning "permission required" banner
- **`Thank You & Certificate.html`** — Fold-cards (ivory + navy), 6×4 postcard, 11×8.5 Certificate of Engagement with double gold frame
- **`Media & Presence Pack.html`** — Podcast covers 3000×3000, YouTube channel banner 2560×1440, YouTube thumbnails 1280×720, Zoom backgrounds 1920×1080 (speaker-safe middle zone), retractable banner 33×80, yard sign 24×18
- **`Grant Tracker.html`** — Editable grants pipeline table + Grants.gov cheat sheet + quarterly reporting calendar
- **`FAQ Knowledge Base.html`** — 30 answers across 5 categories, live search, sticky sidebar with counts, scroll-spy

---

### 7. Marketing Content

- **`Proposal Deck.html`** — 12-slide 1920×1080 presentation using `deck_stage.js` web component
- **`Newsletter Template.html`** — "From the Pulpit" weekly email template
- **`Award Announcements.html`** — 6 social posts + LinkedIn long-form + 1-page press release

---

## Interactions & Behavior

### Global patterns across all files

**Loading state** — Not needed for static prototypes. For production: skeleton loaders on any async data-driven components (grants table, opportunity Kanban, verification packet if backed by DB).

**Error state** — Client-side validation on all forms. For production: inline error messages under fields on blur, disable submit until all required fields valid.

**Toast pattern** — 20px offset from bottom-right, gold left-border, `translateY(20px)→0` with opacity, 2.4s auto-dismiss. Used to confirm copy-to-clipboard, save, export, and delete actions.

**Warning strip pattern** — Red left-border (4px), pink background `#FBEEEE`, dark red text `#5B1414`, mono uppercase label at top followed by inline body. Used across every regulated brand and every publication-blocking rule.

**Draft-mode default** — Every stat with a specific number (89% win rate, $50M+, 500+ businesses) is marked as placeholder in the source code with a comment. In production, gate rendering on an `isVerified` boolean per stat, and show a "Placeholder — pending verification" pill instead if `false`.

### Fleet Verification Packet
- Autosave on every `input`/`change` event
- Progress recalculates for both the top-level and per-entity (accordion "role" turns green)
- Export JSON downloads file named after `f_legal_name`

### Fleet Dashboard
- Checkbox toggle → save immediately → re-render aggregates
- Status pill auto-flips based on P0 percentage (100% = "Staging OK")
- Sections use `<details>` — TCP row opens by default (has actual staging)

### Clearance Tracker
- Click cell → floating menu appears positioned below cell
- Menu closes on: outside click, Escape key, selection
- Keyboard: U/C/H/R while menu open
- Notes autosave to `state[brandId].notes[key]`
- Menu is auto-positioned to avoid overflow on right edge

### Grant Tracker
- Every input change triggers save
- Amount parsing supports "$2.4M", "$500,000", "$75K" formats
- Status pill color-coded (researching gray · drafting amber · submitted blue · awarded green · denied red)

### FAQ
- Search input filters `[data-search]` attributes (all lowercase)
- Matched items auto-open, non-matched items hidden
- Sections with 0 visible items auto-hide
- Sticky sidebar with scroll-spy active state
- Clear button appears when input has value

### Outreach Kit
- Copy button per script → assembles subject + content into single clipboard string
- Button morphs to "✓ Copied" gold background for 1.6s
- Sticky top nav for quick section jumping

### Opportunity Tracker (Kanban)
- HTML5 drag-and-drop between columns
- Column body gets `.drag-over` class during hover
- Card being dragged gets `.dragging` opacity 0.4
- Stats auto-calculate: parseValue supports "$X.XM", "$XK" formats

---

## State Management

Every interactive tool currently uses `localStorage`. In production migration, replace with authenticated backend storage:

### localStorage Keys in Use

| Key | Tool | Shape |
|---|---|---|
| `mog_fleet_packet_v1` | Fleet Verification Packet | Flat object, key = field name, value = string \| boolean |
| `mog_fleet_dashboard_v1` | Fleet Dashboard | `{ [brandId]: { [tier_i]: boolean } }` |
| `mog_clearance_v1` | Clearance Tracker | `{ [brandId]: { [check]: state, notes: { [key]: string } } }` |
| `tcp_intake_v1` | Client Intake Form | Flat field map |
| `tcp_pipeline_v1` | Opportunity Tracker | `{ cards: Card[] }` where Card = `{id, title, agency, value, due, score, col, tags[]}` |
| `tcp_grant_tracker_v1` | Grant Tracker | Grant row array `[{name, agency, category, amount, match, due, status, owner}]` |

### Recommended production shape (Supabase / Postgres)

```sql
-- Entities table (Verification Packet + Legal Entity Map source of truth)
CREATE TABLE entities (
  id UUID PRIMARY KEY,
  brand_id TEXT UNIQUE NOT NULL, -- 'mog', 'tcp', 'mhi', etc.
  legal_name TEXT,
  dba TEXT,
  entity_type TEXT,
  formation_state TEXT,
  ein TEXT ENCRYPTED,  -- vault
  authorized_signer TEXT,
  bank_owner TEXT,
  status TEXT DEFAULT 'draft', -- draft, staging, launched
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Fleet gate progress (Dashboard)
CREATE TABLE fleet_gate_progress (
  brand_id TEXT NOT NULL REFERENCES entities(brand_id),
  tier TEXT NOT NULL, -- 'p0', 'p1', 'p2'
  item_key TEXT NOT NULL,
  is_complete BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  completed_by UUID REFERENCES users(id),
  evidence_url TEXT,
  PRIMARY KEY (brand_id, tier, item_key)
);

-- Clearance tracking (Clearance Tracker)
CREATE TABLE name_clearance (
  brand_id TEXT NOT NULL,
  check_type TEXT NOT NULL, -- 'sc_sos', 'uspto', etc.
  state TEXT NOT NULL DEFAULT 'unknown', -- unknown, clear, hold, risk
  note TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (brand_id, check_type)
);

-- Opportunity pipeline
CREATE TABLE opportunities (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  agency TEXT,
  estimated_value TEXT,
  due_date DATE,
  score INT CHECK (score BETWEEN 0 AND 100),
  column_state TEXT DEFAULT 'lead',
  tags TEXT[],
  owner_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Grant pipeline
CREATE TABLE grants (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  agency TEXT,
  category TEXT, -- Federal, State, Local, Foundation, Corporate
  amount TEXT,
  match_required TEXT,
  due_date DATE,
  status TEXT DEFAULT 'researching',
  owner_id UUID REFERENCES users(id)
);
```

### Auth requirements

Given the sensitivity of the Verification Packet (contains EINs, banking, staff data), production requires:

- Row-level security (RLS) per user role
- Encrypted-at-rest storage for sensitive fields (EIN, banking, credit)
- Owner-approval workflow before any external submission
- Audit log for who touched what and when
- No stat renders publicly until backing `is_verified` flag is true

---

## Design Tokens

### Colors — Master Palette (used across all fleet brands)

```css
--tcp-navy:         #0A1628;   /* Primary — authority, headers */
--tcp-navy-2:       #0F1E36;   /* Navy hover / secondary dark */
--tcp-navy-3:       #152947;   /* Navy tint for gradients */
--tcp-gold:         #C9A961;   /* Fleet accent — MOG + TCP */
--tcp-gold-dark:    #B08D3F;   /* Gold hover / dim gold text */
--tcp-gold-light:   #E4CB92;   /* Gold accents on navy, subheads */
--tcp-ivory:        #F7F3EA;   /* Warm neutral background */
--tcp-ivory-2:      #EFE8D6;   /* Ivory tint — dashed borders, hover fills */
--tcp-body-bg:      #EBE4D2;   /* Global app-shell warm background */
--tcp-red:          #8B1F1F;   /* CTA + urgency + warning */
--tcp-ok:           #2F6B4A;   /* Success (also MHI accent) */
--tcp-warn:         #B87A1F;   /* Warning states */
--tcp-slate:        #4A5568;   /* Secondary text */
--tcp-slate-2:      #718096;   /* Tertiary text */
--tcp-line:         #E5DFD0;   /* Default dividers */
--tcp-line-2:       #D6CFB8;   /* Emphasized dividers */
```

### Colors — Sub-brand Accents

```css
--mog-accent:   #C9A961;  /* Pulpit Gold — parent + TCP */
--mhi-accent:   #2F6B4A;  /* Quiet Green — Housing nonprofit */
--mcr-accent:   #9B7A2B;  /* Deep Gold — Capital Ready */
--mmos-accent:  #4A5FA5;  /* Steady Blue — MortgageOS */
--mgos-accent:  #8B1F1F;  /* Signal Red — GrowthOS */
--mfs-accent:   #B8823A;  /* Burnt Gold — Freight */
--mfw-accent:   #5C6B7C;  /* Steel Grey — FleetWorks */
--mela-accent:  #B37A8C;  /* Muted Rose — Early Learning */
--mlos-accent:  #4A6B7C;  /* Teal Navy — LearningOS */
```

### Typography

```css
--font-serif:  'Playfair Display', Georgia, serif;  /* Headlines, hero, italic emphasis */
--font-sans:   'Inter', system-ui, sans-serif;      /* Body, UI, buttons */
--font-mono:   'IBM Plex Mono', ui-monospace, monospace;  /* Tags, stats, labels */
```

**Weights used:**
- Playfair Display: 400 (scripture italic), 600 (subheads), 700 (headlines), 800 (hero + stats)
- Inter: 300 (fine print), 400 (body), 500 (medium), 600 (UI), 700 (CTAs)
- IBM Plex Mono: 400 (metadata), 500 (stats), 600 (uppercase labels/tags), 700 (uppercase button text)

**Type scale:**
- Fleet Hero: 68px / lh 0.98 / weight 800 / letter-spacing -0.025em (Playfair)
- Section H2: 32-52px / weight 800 / letter-spacing -0.015 to -0.02em (Playfair)
- Card H3: 20-28px / weight 700-800 (Playfair)
- Lede: 15-20px italic / weight 400 (Playfair)
- Body: 13-16px / lh 1.5-1.7 / weight 400 (Inter)
- Eyebrow: 10-12px / letter-spacing 0.2-0.24em / uppercase (IBM Plex Mono)
- Stat number: 26-140px / weight 800 (Playfair)

### Spacing (4pt baseline)

```
xs   4px       lg   24px      3xl  64px
sm   8px       xl   32px      4xl  96px
md   16px      2xl  48px
```

### Radius

- Universal: **2px** (subtle, print-safe)
- Rare exceptions: 20px on tag counts, 50% on avatars, 10px on message-frame styles

### Shadows

```css
--shadow-sm:    0 2px 6px -3px rgba(10,22,40,0.15);
--shadow-card:  0 12px 30px -18px rgba(10,22,40,0.25);
--shadow-lift:  0 20px 40px -30px rgba(10,22,40,0.35);
--shadow-modal: 0 30px 80px -30px rgba(0,0,0,0.5);
--shadow-toast: 0 20px 40px -20px rgba(10,22,40,0.5);
```

### Gradient patterns (reusable)

```css
/* Aurora — used on nearly every hero and dark background */
background:
  radial-gradient(circle at 85% 20%, rgba(201,169,97,0.20), transparent 45%),
  radial-gradient(circle at 15% 90%, rgba(201,169,97,0.10), transparent 50%),
  var(--tcp-navy);

/* Brand strip — top of every letterhead, document, form */
background: linear-gradient(90deg, #0A1628 0%, #0A1628 62%, #C9A961 62%, #C9A961 100%);
height: 6-8px;

/* CTA gradient — for urgency-red CTA blocks */
background: linear-gradient(135deg, #8B1F1F 0%, #6d1616 100%);

/* Sub-brand strip variant — same pattern with accent-color at 62% */
background: linear-gradient(90deg, #0A1628 0%, #0A1628 62%, {sub-brand-accent} 62%, {sub-brand-accent} 100%);
```

### Motion

- Standard transition: `0.15s ease` on all hover states
- Fast transition: `0.12s ease` on buttons and interactive elements
- Slow transition: `0.25s cubic-bezier(0.2, 0.8, 0.2, 1)` for toasts, modals
- Card lift: `transform: translateY(-2px)` + shadow deepen on hover
- Never `0.3s+` — feels sluggish for a federal-buyer audience

---

## Assets

### SVG symbols (referenced across many files)

All defined inline in each file for portability. In production, extract to a shared symbol sprite (`/public/sprites/brand.svg`) and reference via `<use href="/sprites/brand.svg#mark">`.

- `#tcp-mark` / `#mark-shield` — master TCP/parent shield with cross accent
- `#mark-mog` — MOG monogram (circle + "MOG" + "OPPORTUNITY" curved text)
- `#mark-tcp` — TCP shield with pulpit cross
- `#mark-mhi` — MHI shield with house silhouette
- `#mark-mcr` — MCR shield with ascending steps + growth line
- `#mark-mmos` — MMOS shield with house + circuit dots
- `#mark-mgos` — MGOS shield with rocket + speed lines
- `#mark-mfs` — MFS shield with truck profile
- `#mark-mfw` — MFW shield with crossed wrenches
- `#mark-mela` — MELA shield with book + sprout
- `#mark-mlos` — MLOS shield with nested chevrons
- `#seal` — Ceremonial seal with curved text (used in Certificate of Engagement)
- `#monogram` — TCP monogram (circle + Playfair "TCP" + "EST · FEDERAL" curved)

### Pre-baked raster assets (in `assets/`)

- `logo-primary.svg` · `logo-reversed.svg` · `logo-mark-navy.svg` · `logo-mark-gold.svg` · `logo-monogram.svg` · `logo-seal.svg` · `logo-favicon.svg`
- `favicon-16.png` · `favicon-32.png` · `favicon-64.png` · `favicon-192.png`
- `apple-touch-icon.png` (180×180)
- `og-image.png` (1200×630)
- `twitter-card.png` (1200×630)

### External dependencies (Google Fonts)

Playfair Display · Inter · IBM Plex Mono — all loaded with `display=swap`

### Client / brand content

All client names, stats, testimonials, and dollar figures throughout the bundle are **illustrative placeholders**. The publication-lockdown pattern must be preserved when integrating with a CMS/database — every stat rendered publicly must gate on a backing verified evidence record.

---

## Files

**Included in this handoff bundle:**

### P0 Command Tools
- `index.html` — Fleet Command Center master directory
- `Fleet Verification Packet.html`
- `Fleet Dashboard.html`
- `Fleet Brand System.html`
- `Legal Entity Map.html`
- `Clearance Tracker.html`
- `Compliance Packets.html`

### Brand Kit
- `Brand Portal.html`
- `Brand Kit.html`

### Client-facing Tools
- `Client Intake Form.html`
- `Bid Scorecard.html`
- `Opportunity Tracker.html`
- `Compliance Matrix.html`
- `Onboarding Checklist.html`
- `Intake Workbook.html`

### Business Operations
- `Practical Assets.html`
- `Capability Statement.html`
- `SAM Registration Checklist.html`

### Sales · Voice · Media
- `Outreach Kit.html`
- `Testimonial Cards.html`
- `Thank You & Certificate.html`
- `Media & Presence Pack.html`
- `Grant Tracker.html`
- `FAQ Knowledge Base.html`

### Marketing
- `Proposal Deck.html` (uses `deck_stage.js`)
- `Newsletter Template.html`
- `Award Announcements.html`

### Support Files
- `deck_stage.js` — Slide-deck web component for Proposal Deck
- `design-tokens.css` — Paste-ready CSS custom properties
- `tailwind.config.example.js` — Tailwind config extension
- `assets/` — All logo SVGs + pre-baked PNGs

---

## Recommended Implementation Architecture

For a fleet this size, plan for a **monorepo** with:

```
/apps
  /fleet-hq                 # Fleet Command Center + internal ops
  /tcp-www                  # The Contracting Preacher public site
  /mhi-www                  # McKnight Housing Initiative (post-501c3)
  /mcr-www                  # Capital Ready (post-licensing)
  ...                       # One per public-facing brand

/packages
  /brand-system             # Design tokens · shared components · SVG sprites
    /tokens                 # design-tokens.css + JSON
    /components             # Button, Card, GateCard, WarningStrip, etc.
    /icons                  # Fleet SVG symbols
  /db                       # Prisma schema / Supabase types
  /auth                     # Shared auth + RLS
  /forms                    # Verification Packet form primitives
  /tools                    # Kanban, Scorecard, Matrix, Clearance — as importable widgets
```

**Framework recommendations:**

- Next.js 14+ (App Router, RSC by default)
- Tailwind CSS with the design tokens
- shadcn/ui or Radix primitives for form controls
- react-hook-form + zod for form validation
- @dnd-kit/core for Kanban drag-drop (accessible)
- TanStack Table for Compliance Matrix and Grant Tracker
- Framer Motion for subtle transitions
- Sonner for toasts

**Deploy considerations:**

- All the tools currently use localStorage — production must migrate to authenticated backend (Supabase or Cloudflare D1)
- Print-first documents (Capability Statement, SAM Checklist, Compliance Packets, Thank You cards, Certificate) need server-rendered HTML for shareable URLs
- The Verification Packet is highly sensitive — implement encrypted-at-rest fields for EIN, banking, staff data
- Publication-lockdown is not a design suggestion — it's a legal risk mitigation. Every public stat/claim/testimonial must render conditionally based on a backing `verified` record

---

## Deploy / Publish Path

The direct route from this handoff is **Genspark Code**, which can develop and deploy the design online (Genspark Design cannot). Genspark Code will pick up the framework choices, tokens, sub-brand accent system, and interactions documented above and produce a production Next.js (or preferred) app deployable to Vercel / Cloudflare Pages / Netlify.

For external developers (Claude Code, Cursor, hand-coding): this README + the HTML files + `design-tokens.css` + `tailwind.config.example.js` is a complete brief. Every color, every font weight, every interaction is either documented here or observable in the source HTML.

---

*"Commit to the Lord whatever you do, and he will establish your plans." — Proverbs 16:3*
