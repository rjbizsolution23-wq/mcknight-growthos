// ── Fleet Command Center — official MOG handoff package (uploaded by Dr. McKnight) ──
// 27 pixel-committed HTML deliverables + brand assets + design tokens, served
// verbatim from /static/fleet/. This page is the organized directory inside
// GrowthOS; the package's own index.html hub is also available.
import { shell } from './layout'

type Doc = { file: string; title: string; desc: string; icon: string }
type Group = { key: string; title: string; tag: string; tagColor: string; icon: string; docs: Doc[] }

const GROUPS: Group[] = [
  {
    key: 'p0', title: 'P0 Command Tools', tag: 'GATE — NOTHING PUBLISHES UNTIL CLOSED', tagColor: 'bg-red-900/60 text-red-300 border border-red-700/50', icon: 'fa-shield-halved',
    docs: [
      { file: 'fleet-verification-packet.html', title: 'Fleet Verification Packet', desc: 'Live intake for every entity, credential & compliance field — the publication gate', icon: 'fa-file-shield' },
      { file: 'fleet-dashboard.html', title: 'Fleet Dashboard', desc: '10-brand status board — locked / staging / blocked / launched', icon: 'fa-gauge-high' },
      { file: 'fleet-brand-system.html', title: 'Fleet Brand System', desc: 'Master shield + 10 connected sub-brand marks & accent colors', icon: 'fa-shield' },
      { file: 'legal-entity-map.html', title: 'Legal Entity Map', desc: 'Entity structure across all 10 brands — holdings, operators, IP, nonprofit', icon: 'fa-sitemap' },
      { file: 'clearance-tracker.html', title: 'Clearance Tracker', desc: 'Click-cycle clearance dots per brand per requirement', icon: 'fa-list-check' },
      { file: 'compliance-packets.html', title: 'Compliance Packets', desc: 'Per-brand regulatory packets — Housing, Capital, Mortgage, Freight, FleetWorks, Early Learning', icon: 'fa-folder-closed' },
    ],
  },
  {
    key: 'brand', title: 'Brand Kit & Identity', tag: 'IDENTITY', tagColor: 'bg-yellow-900/40 text-yellow-300 border border-yellow-700/40', icon: 'fa-palette',
    docs: [
      { file: 'brand-portal.html', title: 'Brand Portal', desc: 'TCP brand portal — logos, colors, type, downloads', icon: 'fa-door-open' },
      { file: 'brand-kit.html', title: 'Brand Kit', desc: 'Complete TCP brand kit — palette, typography, voice, usage', icon: 'fa-swatchbook' },
      { file: 'media-and-presence-pack.html', title: 'Media & Presence Pack', desc: 'Podcast / YouTube / Zoom assets & social presence', icon: 'fa-photo-film' },
    ],
  },
  {
    key: 'client', title: 'Client-Facing Tools', tag: 'INTERACTIVE', tagColor: 'bg-sky-900/40 text-sky-300 border border-sky-700/40', icon: 'fa-handshake',
    docs: [
      { file: 'client-intake-form.html', title: 'Client Intake Form', desc: 'Autosave client intake with standard field patterns', icon: 'fa-file-pen' },
      { file: 'bid-scorecard.html', title: 'Bid Scorecard', desc: 'Scoring sliders — bid / no-bid decisions on federal opportunities', icon: 'fa-scale-balanced' },
      { file: 'opportunity-tracker.html', title: 'Opportunity Tracker', desc: 'Drag-drop Kanban pipeline for federal opportunities', icon: 'fa-table-columns' },
      { file: 'compliance-matrix.html', title: 'Compliance Matrix', desc: 'Editable RFP requirement-by-requirement compliance rows', icon: 'fa-table-cells' },
      { file: 'onboarding-checklist.html', title: 'Onboarding Checklist', desc: 'Client onboarding steps from signature to kickoff', icon: 'fa-clipboard-check' },
      { file: 'intake-workbook.html', title: 'Intake Workbook', desc: 'Deep intake workbook — capability, past performance, targets', icon: 'fa-book-open' },
    ],
  },
  {
    key: 'ops', title: 'Business Operations', tag: 'OPS', tagColor: 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/40', icon: 'fa-briefcase',
    docs: [
      { file: 'practical-assets.html', title: 'Practical Assets', desc: 'Invoice / estimate / engagement / NDA / teaming templates', icon: 'fa-file-invoice-dollar' },
      { file: 'capability-statement.html', title: 'Capability Statement', desc: 'One-page federal capability statement — print-ready', icon: 'fa-id-card' },
      { file: 'sam-registration-checklist.html', title: 'SAM.gov Checklist', desc: 'Step-by-step SAM registration checklist', icon: 'fa-square-check' },
    ],
  },
  {
    key: 'sales', title: 'Sales · Voice · Media', tag: 'GROWTH', tagColor: 'bg-purple-900/40 text-purple-300 border border-purple-700/40', icon: 'fa-bullhorn',
    docs: [
      { file: 'outreach-kit.html', title: 'Outreach Kit', desc: 'Cold email / call scripts & outreach sequences', icon: 'fa-paper-plane' },
      { file: 'testimonial-cards.html', title: 'Testimonial Cards', desc: 'Social-proof cards (permission-required flags applied)', icon: 'fa-quote-left' },
      { file: 'thank-you-and-certificate.html', title: 'Thank You & Certificate', desc: 'Client thank-you card + completion certificate', icon: 'fa-award' },
      { file: 'grant-tracker.html', title: 'Grant Tracker', desc: 'Grant opportunity tracker with deadlines & status', icon: 'fa-hand-holding-dollar' },
      { file: 'faq-knowledge-base.html', title: 'FAQ Knowledge Base', desc: 'Search + filter FAQ for clients and prospects', icon: 'fa-circle-question' },
    ],
  },
  {
    key: 'content', title: 'Deck · Newsletter · Announcements', tag: 'CONTENT', tagColor: 'bg-orange-900/40 text-orange-300 border border-orange-700/40', icon: 'fa-newspaper',
    docs: [
      { file: 'proposal-deck.html', title: 'Proposal Deck', desc: 'Full HTML proposal deck — keyboard nav, print-to-PDF, speaker notes', icon: 'fa-person-chalkboard' },
      { file: 'newsletter-template.html', title: 'Newsletter — From the Pulpit', desc: 'Weekly email newsletter template', icon: 'fa-envelope-open-text' },
      { file: 'award-announcements.html', title: 'Award Announcements', desc: 'Contract-award announcement templates', icon: 'fa-trophy' },
    ],
  },
]

const FLEET_BRANDS = [
  ['00', 'MOG — Opportunity Group', '#C9A961'], ['01', 'The Contracting Preacher', '#C9A961'],
  ['02', 'Housing Initiative', '#2F6B4A'], ['03', 'Capital Ready', '#9B7A2B'],
  ['04', 'MortgageOS', '#4A5FA5'], ['05', 'GrowthOS', '#8B1F1F'],
  ['06', 'Freight Systems', '#B8823A'], ['07', 'FleetWorks', '#5C6B7C'],
  ['08', 'Early Learning Academy', '#B37A8C'], ['09', 'LearningOS', '#4A6B7C'],
] as const

export const fleetPage = () => shell('Fleet Command Center', 'fleet', `
<section id="fleet-hero" class="mb-8">
  <div class="flex items-center gap-4 mb-4">
    <img src="/static/fleet/assets/shield-gold.png" alt="MOG shield" class="w-14 h-14">
    <div>
      <p class="inline-block gold-bg text-black text-xs font-bold px-3 py-1.5 rounded-full mb-2 uppercase tracking-wider"><i class="fas fa-anchor mr-1"></i> Official MOG Handoff Package</p>
      <h1 class="text-4xl font-extrabold text-white leading-tight">Fleet <span class="grad-text">Command Center</span></h1>
    </div>
  </div>
  <p class="text-gray-400 max-w-3xl">All 27 pixel-committed deliverables for the McKnight Opportunity Group fleet — P0 verification gates, brand system, client tools, business operations, and media assets. Served exactly as designed.</p>
  <div class="mt-4 flex flex-wrap gap-3">
    <a href="/static/fleet/index.html" target="_blank" class="grad-bg text-white font-semibold px-5 py-2.5 rounded-lg text-sm"><i class="fas fa-compass mr-2"></i>Open Master Index</a>
    <a href="/static/fleet/fleet-verification-packet.html" target="_blank" class="bg-red-900/60 border border-red-700/50 text-red-200 font-semibold px-5 py-2.5 rounded-lg text-sm"><i class="fas fa-lock mr-2"></i>Verification Packet (P0 Gate)</a>
    <a href="/static/fleet/design-tokens.css" target="_blank" class="bg-gray-800 border border-gray-700 text-gray-300 font-semibold px-5 py-2.5 rounded-lg text-sm"><i class="fas fa-code mr-2"></i>design-tokens.css</a>
  </div>
</section>

<section id="fleet-lockdown" class="mb-10 rounded-xl border-l-4 border-red-600 bg-red-950/30 p-5">
  <p class="text-red-300 font-bold text-sm uppercase tracking-wider mb-1"><i class="fas fa-triangle-exclamation mr-2"></i>Publication Lockdown — The Master Rule</p>
  <p class="text-gray-300 text-sm">No public claim about win rates, dollar volumes, 501(c)(3) status, active housing programs, contracting experience, credentials, or client counts publishes until documented evidence lives in the <a href="/static/fleet/fleet-verification-packet.html" target="_blank" class="text-red-300 underline">Fleet Verification Packet</a>.</p>
</section>

<section id="fleet-brands" class="mb-10">
  <h2 class="text-lg font-bold text-white mb-4"><i class="fas fa-layer-group text-mk-gold mr-2"></i>The Fleet — 10 Brands</h2>
  <div class="flex flex-wrap gap-2">
    ${FLEET_BRANDS.map(([n, name, hex]) => `<span class="inline-flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-full px-3 py-1.5 text-xs text-gray-300"><span class="w-2.5 h-2.5 rounded-full" style="background:${hex}"></span><span class="font-mono text-gray-500">${n}</span> ${name}</span>`).join('')}
  </div>
</section>

${GROUPS.map((g) => `
<section id="fleet-${g.key}" class="mb-10">
  <div class="flex items-center gap-3 mb-4">
    <h2 class="text-lg font-bold text-white"><i class="fas ${g.icon} text-mk-gold mr-2"></i>${g.title}</h2>
    <span class="text-[10px] font-bold px-2 py-1 rounded ${g.tagColor} uppercase tracking-wider">${g.tag}</span>
  </div>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    ${g.docs.map((d) => `
    <a href="/static/fleet/${d.file}" target="_blank" class="card p-5 block hover:border-mk-gold/60 transition group">
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-lg grad-bg flex items-center justify-center shrink-0"><i class="fas ${d.icon} text-white"></i></div>
        <div class="min-w-0">
          <h3 class="font-bold text-white text-sm group-hover:text-mk-gold transition">${d.title}</h3>
          <p class="text-gray-500 text-xs mt-1 leading-relaxed">${d.desc}</p>
        </div>
      </div>
    </a>`).join('')}
  </div>
</section>`).join('')}

<section id="fleet-assets" class="mb-10">
  <h2 class="text-lg font-bold text-white mb-4"><i class="fas fa-images text-mk-gold mr-2"></i>Brand Assets</h2>
  <div class="grid md:grid-cols-4 gap-4">
    ${[
      ['og-image.png', 'OG / Social Card (1024×538)'],
      ['logo-horizontal-light.png', 'Logo — Light on Navy'],
      ['logo-horizontal-dark.png', 'Logo — Dark Variant'],
      ['shield-gold.png', 'Shield — Gold'],
      ['shield-navy.png', 'Shield — Navy'],
      ['shield-outline-lg.png', 'Shield — Gold Outline'],
      ['apple-touch-icon.png', 'Apple Touch Icon'],
      ['favicon-32.png', 'Favicon 32px'],
    ].map(([f, label]) => `
    <a href="/static/fleet/assets/${f}" target="_blank" class="card p-4 text-center block hover:border-mk-gold/60 transition">
      <div class="h-20 flex items-center justify-center mb-2 bg-[#0A1628] rounded-lg"><img src="/static/fleet/assets/${f}" alt="${label}" class="max-h-16 max-w-full object-contain"></div>
      <p class="text-xs text-gray-400">${label}</p>
    </a>`).join('')}
  </div>
</section>

<section id="fleet-dev" class="card p-6">
  <h2 class="text-lg font-bold text-white mb-3"><i class="fas fa-code text-mk-gold mr-2"></i>Developer Files</h2>
  <div class="grid md:grid-cols-2 gap-3 text-sm">
    <a href="/static/fleet/design-tokens.css" target="_blank" class="text-mk-gold hover:underline"><i class="fas fa-file-code mr-2"></i>design-tokens.css — paste-ready TCP tokens (colors, type, spacing)</a>
    <a href="/static/fleet/tailwind.config.example.js" target="_blank" class="text-mk-gold hover:underline"><i class="fas fa-file-code mr-2"></i>tailwind.config.example.js — Tailwind theme extension</a>
    <a href="/static/fleet/deck_stage.js" target="_blank" class="text-mk-gold hover:underline"><i class="fas fa-file-code mr-2"></i>deck_stage.js — &lt;deck-stage&gt; web component (proposal deck engine)</a>
    <a href="/static/fleet/HANDOFF-README.md" target="_blank" class="text-mk-gold hover:underline"><i class="fas fa-file-lines mr-2"></i>HANDOFF-README.md — full 30-deliverable handoff spec</a>
  </div>
</section>
`)
