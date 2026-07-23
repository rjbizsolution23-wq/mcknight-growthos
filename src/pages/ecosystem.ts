// ── McKnight Ecosystem — all brands, entity separation, infrastructure & revenue architecture ──
import { shell, copyBlock } from './layout'

type EcoBrand = {
  slug: string
  name: string
  structure: string
  icon: string
  accent: string       // per-vertical secondary accent
  tagline: string
  role: string
  infraTitle: string
  infra: string[]
  extraSections?: { title: string; icon: string; items: string[] }[]
  revenue: string[]
  complianceNote?: { text: string; source: string; url: string }
}

export const ECOSYSTEM_BRANDS: EcoBrand[] = [
  {
    slug: 'opportunity-group', name: 'McKnight Opportunity Group', structure: 'Parent / management company',
    icon: 'fa-building-columns', accent: '#d4a72c',
    tagline: 'One portfolio. Separate entities. Shared standards.',
    role: 'Holds governance, brand standards, shared back office and the Executive Command Center. Every operating company keeps its own legal entity, bank account and books.',
    infraTitle: 'Shared Back Office (infrastructure the public never sees)',
    infra: ['Bookkeeping and chart of accounts (per entity)', 'Payroll', 'Expense approvals', 'Vendor onboarding', 'Contract repository', 'Accounts receivable', 'Accounts payable', 'Collections workflow', 'Tax calendar', 'Insurance-renewal calendar', 'License-renewal calendar', 'Policy acknowledgments', 'Employee onboarding', 'Contractor onboarding', 'Customer support tickets', 'Incident management', 'KPI dashboards'],
    extraSections: [
      { title: 'Executive Command Center', icon: 'fa-gauge-high', items: ['One portfolio dashboard across all entities', 'Preserves each entity\'s legal and data boundaries', 'Per-brand KPI rollups without commingled data', 'Compliance calendar rollup (licenses, insurance, registrations)'] },
      { title: 'Entity Separation Rule', icon: 'fa-scale-balanced', items: ['Do NOT mix nonprofit donations, daycare tuition, trucking revenue, credit-repair payments and SaaS subscriptions in one account', 'Separate bank accounts per entity', 'Separate books and tax filings per entity', 'Inter-company services under written fair-market-value agreements'] },
    ],
    revenue: ['Management fees (written inter-company agreements)', 'Shared-services cost allocation', 'IP licensing to operating companies'],
  },
  {
    slug: 'contracting-preacher', name: 'The Contracting Preacher', structure: 'Consulting and education business',
    icon: 'fa-file-signature', accent: '#2563eb',
    tagline: 'Win the contract. Keep the covenant.',
    role: 'Government-contracting consulting and education: readiness, registrations, capability statements, proposals and opportunity intelligence for small businesses.',
    infraTitle: 'Contracting Delivery System',
    infra: ['Federal, SC, county, city and school opportunity feeds', 'Saved-search profiles', 'Bid/no-bid scoring', 'Deadline calendar', 'Solicitation document extraction', 'Amendment monitoring', 'Compliance matrix generator', 'Capability-statement builder', 'Past-performance library', 'Technical proposal workspace', 'Pricing workbook', 'Teaming-partner directory', 'Subcontractor database', 'Contract-performance dashboard', 'Invoice and deliverables tracker', 'Debrief and loss-analysis workflow'],
    extraSections: [
      { title: 'Missing Business Assets To Build', icon: 'fa-list-check', items: ['Productized service packages', 'Pricing ranges', 'Service agreements', 'Refund/cancellation policy', 'Client qualification criteria', 'Proposal turnaround standards', 'Proof for performance claims', 'At least three detailed case studies'] },
    ],
    revenue: ['Free readiness assessment', 'Paid strategy session', 'Registration package', 'Capability-statement package', 'Proposal package', 'Monthly opportunity intelligence'],
    complianceNote: { text: 'SAM.gov All Awards registration requires verified identity, taxpayer, banking, ownership and entity information — the Readiness Passport collects it once.', source: 'SAM.gov Entity Registration Checklist (GSA)', url: 'https://sam.gov/sites/default/files/2024-11/entity-checklist.pdf' },
  },
  {
    slug: 'contracting-preacher-os', name: 'Contracting Preacher OS', structure: 'SaaS / IP product',
    icon: 'fa-microchip', accent: '#4f46e5',
    tagline: 'The contracting playbook, productized.',
    role: 'The software product behind the consulting practice: opportunity feeds, compliance matrices, proposal workspace and deadline automation as a subscription.',
    infraTitle: 'Product Modules',
    infra: ['Opportunity search + saved profiles', 'Bid/no-bid scoring engine', 'Solicitation extraction (requirements → checklist)', 'Compliance matrix generator', 'Capability-statement builder', 'Proposal workspace with approved-content library', 'Pricing workbook', 'Deadline reminders + amendment alerts', 'Teaming and subcontractor directory', 'Performance and invoice tracking'],
    extraSections: [
      { title: 'AI Boundaries (built into the product)', icon: 'fa-robot', items: ['AI drafts, extracts, scores and reminds — humans certify, sign, price and submit', 'Approved-data-only population from the Evidence Vault', 'No invented credentials: every claim traces to a verified document', 'Full audit trail on AI-assisted sections'] },
    ],
    revenue: ['Contracting Preacher OS subscription tiers', 'Seat expansion', 'Enterprise / agency licensing'],
  },
  {
    slug: 'housing-initiative', name: 'McKnight Housing Initiative', structure: 'Independent nonprofit',
    icon: 'fa-house-chimney-heart', accent: '#0ea5e9',
    tagline: 'Housing people, not just projects.',
    role: 'An independent 501(c)(3) with its own board, books and mission — affordable housing development, resident services and community partnerships.',
    infraTitle: 'Nonprofit Infrastructure (more than a donation page)',
    infra: ['Independent board of directors', 'Bylaws and conflict-of-interest policy', 'IRS exemption documentation', 'Whistleblower and document-retention policies', 'Grant accounting', 'Restricted-fund tracking', 'Donor receipts', 'Property acquisition criteria', 'Development budget templates', 'Resident eligibility workflow', 'Fair-housing procedures', 'Property and grant reporting', 'Partnerships with municipalities, developers and lenders', 'Environmental-review tracking', 'Property management plan', 'Outcome and impact measurement'],
    revenue: ['Donations', 'Grants', 'Program-related investments', 'Public-private development partnerships', 'Sponsorships', 'Property and program revenue where permissible'],
    complianceNote: { text: 'CHDO status is not automatic from having a 501(c)(3): HUD requires legal-status, organizational-structure, board-representation and capacity requirements to be satisfied.', source: 'HUD Exchange — HOME CHDO requirements', url: 'https://www.hudexchange.info/programs/home/topics/chdo/' },
  },
  {
    slug: 'capital-ready', name: 'McKnight Capital Ready', structure: 'Credit education and funding-readiness company',
    icon: 'fa-coins', accent: '#16a34a',
    tagline: 'Ready for capital. Ready for scrutiny.',
    role: 'Two strictly separated client journeys: a consumer-credit track built around CROA protections, and a business-funding readiness track for entity credit and lender matching.',
    infraTitle: 'Consumer-Credit Track',
    infra: ['Written service agreement', 'Required disclosures', 'Cancellation workflow', 'No prohibited advance billing', 'Consumer authorization', 'Dispute-evidence upload', 'Accurate-information policy', 'Complaint resolution', 'Attorney escalation', 'Audit history'],
    extraSections: [
      { title: 'Business-Funding Track (separate journey)', icon: 'fa-briefcase', items: ['Entity-readiness checklist', 'Business-credit profile', 'Cash-flow analysis', 'Debt schedule', 'Funding-use plan', 'Lender matching', 'Application tracker', 'Personal-guarantee disclosure', 'Denial-reason tracking', 'Reapplication timeline'] },
    ],
    revenue: ['Credit education', 'Business-readiness audit', 'Funding-readiness package', 'Subscription monitoring', 'Independent attorney referrals'],
    complianceNote: { text: 'CROA prohibits advance payment and requires written contracts and other consumer protections — the consumer track is built around these rules, not around loopholes.', source: 'FTC — Credit Repair Organizations Act', url: 'https://www.ftc.gov/legal-library/browse/statutes/credit-repair-organizations-act' },
  },
  {
    slug: 'capital-ready-legal', name: 'Capital Ready Legal Network', structure: 'Referral / network brand — NOT a law firm',
    icon: 'fa-gavel', accent: '#9333ea',
    tagline: 'Independent counsel, transparent referrals.',
    role: 'A referral network connecting clients to independent attorneys. It is not a law firm, gives no legal advice, and every engagement is a direct attorney-client relationship.',
    infraTitle: 'Law-Firm Partnership Controls',
    infra: ['Independent attorney-client relationship', 'No legal advice from nonlawyers', 'No fee-sharing without counsel approval', 'Referral disclosure', 'Conflict-check process', 'Data-processing agreement', 'Fair-market-value service agreement', 'Marketing approval workflow', 'Clear statement that the network is not a law firm'],
    revenue: ['Fair-market-value administrative/marketing services to network attorneys (structured with counsel)', 'No fee-splitting for legal services'],
  },
  {
    slug: 'freight-systems', name: 'McKnight Freight Systems', structure: 'Motor-carrier / transportation company',
    icon: 'fa-truck-fast', accent: '#ea580c',
    tagline: 'Authority, insurance, lanes — in that order.',
    role: 'FMCSA-regulated trucking operation: authority, safety compliance, dispatch, settlements and government transportation contracts.',
    infraTitle: 'Trucking Operating Package',
    infra: ['USDOT/MC authority verification', 'BOC-3', 'UCR registration', 'Insurance', 'Driver qualification files', 'Drug-and-alcohol program', 'Clearinghouse procedures', 'Vehicle maintenance files', 'Hours-of-service workflow', 'Accident register', 'Dispatch SOP', 'Fuel and toll tracking', 'Rate-confirmation workflow', 'Bill-of-lading storage', 'Proof-of-delivery workflow', 'Factoring controls', 'Detention and lumper documentation', 'Owner-operator settlement statements', 'Lease termination process'],
    revenue: ['Freight revenue', 'Dedicated lanes', 'Government transportation contracts'],
    complianceNote: { text: 'Owner-operator lease packages must follow 49 CFR Part 376 — written terms governing possession, control, compensation, charge-backs, records and receipts.', source: '49 CFR Part 376 — Lease and Interchange of Vehicles (eCFR)', url: 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-376' },
  },
  {
    slug: 'fleetworks', name: 'McKnight FleetWorks', structure: 'Repair and maintenance operation',
    icon: 'fa-screwdriver-wrench', accent: '#dc2626',
    tagline: 'Trucks back on the road, records back in the file.',
    role: 'Truck, tire and trailer repair — shop and mobile. Integrates with DriverHub so reported defects automatically become inspection or repair tickets.',
    infraTitle: 'Shop Infrastructure',
    infra: ['Facility/mobile-service licensing review', 'Garage liability and workers\' compensation', 'Customer authorization before repairs', 'VIN and unit records', 'Inspection forms', 'Estimates and change orders', 'Technician assignments', 'Labor-time tracking', 'Parts and tire inventory', 'Core-return tracking', 'Warranty records', 'DOT inspection preparation', 'Preventive-maintenance schedules', 'Roadside-service dispatch', 'Before/after photos', 'Invoicing and fleet accounts', 'Environmental and waste-disposal procedures'],
    extraSections: [
      { title: 'Biggest Integration Win', icon: 'fa-link', items: ['Defects reported through DriverHub automatically become FleetWorks inspection or repair tickets', 'Closed-loop maintenance history per unit (VIN)', 'DOT-inspection readiness driven by live defect data'] },
    ],
    revenue: ['Fleet-maintenance contracts', 'Tire programs', 'Roadside membership', 'Retail repair revenue'],
  },
  {
    slug: 'early-learning', name: 'McKnight Early Learning Academy', structure: 'Licensed childcare provider',
    icon: 'fa-children', accent: '#f59e0b',
    tagline: 'Licensed care. Documented quality. Growing minds.',
    role: 'A licensed South Carolina childcare operation with a quality engine: licensing, staffing compliance, safety, curriculum evidence and family engagement.',
    infraTitle: 'Licensing & Quality Engine',
    infra: ['Licensing status and capacity', 'Facility inspections', 'Staff background checks', 'Staff qualification records', 'CPR/first-aid tracking', 'Child-to-staff ratio monitoring', 'Attendance and authorized-pickup controls', 'Immunization and medical records', 'Medication administration logs', 'Incident reporting', 'Emergency plans', 'Meal and allergy management', 'Parent handbook', 'Tuition and subsidy tracking', 'Classroom observations', 'Curriculum evidence', 'Staff-development plans', 'Family-engagement documentation'],
    revenue: ['Tuition', 'Subsidy/voucher payments', 'Enrollment and activity fees', 'Childcare grants'],
    complianceNote: { text: 'ABC Quality is South Carolina\'s voluntary quality-rating and improvement program — the portal turns its standards into an evidence checklist and improvement plan, not a claimed rating badge.', source: 'SC ABC Quality — Statewide Programs', url: 'https://abcquality.org/families/statewide-programs/' },
  },
  {
    slug: 'learningos', name: 'McKnight LearningOS', structure: 'Childcare SaaS / IP product',
    icon: 'fa-graduation-cap', accent: '#06b6d4',
    tagline: 'Run the center. Protect the child data.',
    role: 'Childcare management software that strictly separates operational data from educational data — with privacy controls designed for records about children.',
    infraTitle: 'Core Modules',
    infra: ['Enrollment CRM', 'Waitlist', 'Parent portal', 'Attendance', 'Billing', 'Classroom roster', 'Lesson planning', 'Developmental observations', 'Learning goals', 'Family messaging', 'Staff compliance', 'Quality-rating evidence', 'Grant finder', 'Director analytics'],
    extraSections: [
      { title: 'Privacy Controls (non-negotiable)', icon: 'fa-user-shield', items: ['Parent/guardian consent', 'Minimum necessary child data', 'Role-based permissions', 'Tenant isolation', 'Encryption', 'Download restrictions', 'Audit logs', 'Data-retention rules', 'Account deletion', 'Incident response', 'Vendor security review', 'NEVER use identifiable child records for AI model training without a separately reviewed legal basis and explicit authorization'] },
    ],
    revenue: ['LearningOS subscriptions', 'Multi-location licensing'],
  },
]

const EXECUTION_ORDER = ['Governance and verified intake', 'Master brand system', 'Shared CRM, identity and evidence vault', 'The Contracting Preacher rebuild', 'Contracting Preacher OS', 'McKnight Housing Initiative', 'McKnight Capital Ready', 'McKnight Freight Systems', 'McKnight FleetWorks', 'McKnight Early Learning Academy', 'McKnight LearningOS']

const SMART_ADDITIONS: [string, string, string][] = [
  ['McKnight Academy', 'fa-chalkboard-user', 'Paid courses, certifications and staff training across the fleet.'],
  ['McKnight Partner Network', 'fa-handshake', 'Attorneys, accountants, grant writers, primes, lenders, developers and vendors.'],
  ['McKnight Vendor Exchange', 'fa-store', 'Directory connecting small businesses with subcontracting opportunities.'],
  ['McKnight Workforce Hub', 'fa-users-gear', 'Driver, mechanic, teacher and proposal-specialist recruiting.'],
  ['McKnight Procurement Data Lab', 'fa-chart-column', 'Agency-spending analysis, expiring contracts and buyer intelligence.'],
  ['McKnight Impact Report', 'fa-file-lines', 'Public annual report: awards pursued, housing impact, jobs, learners, community investment.'],
  ['Executive Command Center', 'fa-gauge-high', 'One portfolio dashboard while preserving each entity\'s legal and data boundaries.'],
]

const SOURCES: [string, string, string][] = [
  ['SAM.gov Entity Registration Checklist — GSA', 'https://sam.gov/sites/default/files/2024-11/entity-checklist.pdf', 'SAM registration requires verified identity, taxpayer, banking, ownership and entity information.'],
  ['Grants.gov Applicant Registration', 'https://www.grants.gov/applicants/applicant-registration', 'Organizational grant applicants must first complete SAM registration and assign authorized roles.'],
  ['HUD Exchange — HOME CHDO', 'https://www.hudexchange.info/programs/home/topics/chdo/', 'CHDO status requires legal-status, structure, board-representation and capacity requirements.'],
  ['FTC — Credit Repair Organizations Act', 'https://www.ftc.gov/legal-library/browse/statutes/credit-repair-organizations-act', 'CROA prohibits advance payment and requires written contracts and consumer protections.'],
  ['49 CFR Part 376 — eCFR', 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-376', 'Regulated carrier equipment leases must satisfy federal written-lease requirements.'],
  ['SC ABC Quality — Statewide Programs', 'https://abcquality.org/families/statewide-programs/', 'ABC Quality is South Carolina\'s voluntary childcare quality-rating and improvement program.'],
]

const card = (b: EcoBrand) => `
<a href="/ecosystem/${b.slug}" class="block bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-5 hover:border-[${b.accent}] hover:-translate-y-0.5 transition group" style="border-top: 3px solid ${b.accent}">
  <div class="flex items-start justify-between mb-3">
    <span class="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style="background:${b.accent}22;color:${b.accent}"><i class="fas ${b.icon}"></i></span>
    <span class="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full bg-gray-800 text-gray-300">${b.structure}</span>
  </div>
  <h3 class="text-white font-bold mb-1 group-hover:text-mk-cyan">${b.name}</h3>
  <p class="text-gray-400 text-xs italic mb-2">"${b.tagline}"</p>
  <p class="text-gray-500 text-xs leading-relaxed">${b.role.slice(0, 130)}…</p>
  <p class="mt-3 text-xs font-semibold" style="color:${b.accent}">Open brand funnel <i class="fas fa-arrow-right ml-1"></i></p>
</a>`

export const ecosystemPage = () => shell('McKnight Ecosystem — All Brands', 'ecosystem', `
<section id="eco-hero" class="mb-10">
  <p class="inline-block gold-bg text-black text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider"><i class="fas fa-sitemap mr-1"></i> McKnight Opportunity Group — Full Portfolio</p>
  <h1 class="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">One Ecosystem.<br><span class="grad-text">Ten Brands. Zero Commingling.</span></h1>
  <p class="text-gray-400 max-w-3xl text-lg">Every McKnight company is its own legal entity with its own bank account, books and compliance file — governed by one parent, one brand system, and one verified data engine: the <a href="/passport" class="text-mk-cyan underline">Business Readiness Passport + Evidence Vault</a>.</p>
  <div class="mt-5 bg-red-900/20 border border-red-700/40 rounded-xl p-4 max-w-3xl">
    <p class="text-red-300 text-sm font-semibold"><i class="fas fa-triangle-exclamation mr-2"></i>Separation rule: never mix nonprofit donations, daycare tuition, trucking revenue, credit-repair payments and SaaS subscriptions in one account.</p>
  </div>
</section>

<section id="eco-structure" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-diagram-project text-mk-gold mr-2"></i>Recommended Separation</h2>
  <div class="overflow-x-auto bg-[#0d1b30] border border-blue-900/40 rounded-2xl">
    <table class="w-full text-sm">
      <thead><tr class="text-left text-gray-400 border-b border-blue-900/40"><th class="p-4">Brand</th><th class="p-4">Likely structure</th><th class="p-4"></th></tr></thead>
      <tbody>${ECOSYSTEM_BRANDS.map((b) => `<tr class="border-b border-blue-900/20 hover:bg-blue-900/10"><td class="p-4 text-white font-semibold"><i class="fas ${b.icon} mr-2" style="color:${b.accent}"></i>${b.name}</td><td class="p-4 text-gray-400">${b.structure}</td><td class="p-4"><a href="/ecosystem/${b.slug}" class="text-mk-cyan text-xs font-semibold hover:underline">View funnel →</a></td></tr>`).join('')}</tbody>
    </table>
  </div>
</section>

<section id="eco-grid" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-1"><i class="fas fa-layer-group text-mk-gold mr-2"></i>Brand Funnels</h2>
  <p class="text-gray-500 text-sm mb-5">Each brand gets its own funnel page: positioning, required infrastructure, revenue ladder and compliance anchors.</p>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">${ECOSYSTEM_BRANDS.map(card).join('')}</div>
</section>

<section id="eco-order" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-list-ol text-mk-gold mr-2"></i>Recommended Execution Order</h2>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-6">
    <ol class="grid md:grid-cols-2 gap-x-8 gap-y-2">${EXECUTION_ORDER.map((s, i) => `<li class="flex items-center gap-3 text-sm ${i < 3 ? 'text-mk-goldLight font-semibold' : 'text-gray-300'}"><span class="w-7 h-7 rounded-full ${i < 3 ? 'gold-bg text-black' : 'bg-gray-800 text-gray-400'} flex items-center justify-center text-xs font-bold shrink-0">${i + 1}</span>${s}</li>`).join('')}</ol>
    <p class="mt-5 text-sm text-gray-400 border-t border-blue-900/40 pt-4"><i class="fas fa-lightbulb text-mk-gold mr-2"></i><strong class="text-white">The first real build is not another landing page.</strong> It is the McKnight Business Readiness Passport + Evidence Vault — the trusted data engine powering every contract, grant, funding application, website and operating company. <a href="/passport" class="text-mk-cyan underline font-semibold">Open the Passport →</a></p>
  </div>
</section>

<section id="eco-additions" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-rocket text-mk-gold mr-2"></i>Smart Additions Worth Building</h2>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">${SMART_ADDITIONS.map(([n, ic, d]) => `<div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4"><p class="text-white font-semibold text-sm mb-1"><i class="fas ${ic} text-mk-cyan mr-2"></i>${n}</p><p class="text-gray-500 text-xs">${d}</p></div>`).join('')}</div>
</section>

<section id="eco-brand-assets" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-palette text-mk-gold mr-2"></i>Brand Assets Still Needed (shared McKnight identity)</h2>
  <div class="grid md:grid-cols-2 gap-4">
    <div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-5">
      <ul class="text-sm text-gray-300 space-y-1.5">${['Master logo', 'Individual vertical logos', 'Vector SVG files', 'Horizontal and square lockups', 'Dark/light versions', 'Favicon', 'Social profile images', 'Open Graph graphics', 'Photography guidelines'].map((i) => `<li><i class="far fa-square text-gray-600 mr-2"></i>${i}</li>`).join('')}</ul>
    </div>
    <div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-5">
      <ul class="text-sm text-gray-300 space-y-1.5">${['Founder biography', 'Approved credentials', 'Brand-claim rules', 'Voice and terminology guide', 'Email templates', 'Presentation templates', 'Proposal templates', 'Capability-statement template', 'Orientation PowerPoint template'].map((i) => `<li><i class="far fa-square text-gray-600 mr-2"></i>${i}</li>`).join('')}</ul>
    </div>
  </div>
  <p class="mt-3 text-sm text-gray-400"><i class="fas fa-swatchbook text-mk-gold mr-2"></i>Visual DNA: The Contracting Preacher's <strong class="text-white">navy and gold</strong> as the parent system, then one secondary accent per vertical (shown on each brand card above).</p>
</section>

<section id="eco-domains" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-globe text-mk-gold mr-2"></i>Domains & Communication (decide before launch)</h2>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-6">
    <div class="grid md:grid-cols-2 gap-x-8 gap-y-1.5 text-sm text-gray-300">${['Primary domain for each brand', 'Defensive domains', 'Support addresses', 'Sales addresses', 'Grant and procurement addresses', 'Legal notices address', 'Shared phone system', 'Call routing', 'SMS consent', 'CRM inbox ownership', 'Social handles'].map((i) => `<p><i class="fas fa-circle-dot text-mk-cyan mr-2 text-[8px] align-middle"></i>${i}</p>`).join('')}</div>
    <p class="mt-4 text-xs text-amber-300/90 bg-amber-900/15 border border-amber-700/30 rounded-lg p-3"><i class="fas fa-hand mr-2"></i>Domains should remain unpurchased until name and trademark clearance is completed.</p>
  </div>
</section>

<section id="eco-sources" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-book text-mk-gold mr-2"></i>Verified Sources</h2>
  <div class="space-y-2">${SOURCES.map(([t, u, s]) => `<div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4 text-sm"><a href="${u}" target="_blank" rel="noopener" class="text-mk-cyan font-semibold hover:underline">${t} <i class="fas fa-external-link text-[10px]"></i></a><p class="text-gray-500 text-xs mt-1">${s}</p></div>`).join('')}</div>
  <p class="mt-4 text-xs text-gray-500"><span class="text-green-400 font-semibold">🚦 RISK TIER: 🟢 Planning and architecture.</span> This page is planning and architecture only — legal filings, entity formation, licensing and tax structure require professional review.</p>
</section>

<section id="eco-cta" class="text-center py-10 border-t border-blue-900/40">
  <h2 class="text-3xl font-bold text-white mb-3">The Data Engine Comes First</h2>
  <p class="text-gray-400 mb-6 max-w-2xl mx-auto">Passport + Evidence Vault power every registration, grant, proposal and funding application across all ten brands.</p>
  <a href="/passport" class="inline-block gold-bg text-black font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition"><i class="fas fa-passport mr-2"></i>Open the Business Readiness Passport</a>
</section>
`)

export const ecosystemBrandPage = (slug: string): string | null => {
  const b = ECOSYSTEM_BRANDS.find((x) => x.slug === slug)
  if (!b) return null
  const others = ECOSYSTEM_BRANDS.filter((x) => x.slug !== slug).slice(0, 6)
  return shell(`${b.name} — McKnight Ecosystem`, 'ecosystem', `
<nav id="eco-breadcrumb" class="text-xs text-gray-500 mb-6"><a href="/ecosystem" class="hover:text-mk-cyan">McKnight Ecosystem</a> <i class="fas fa-chevron-right mx-2 text-[8px]"></i> <span class="text-gray-300">${b.name}</span></nav>

<section id="brand-hero" class="mb-10">
  <div class="flex items-center gap-4 mb-4">
    <span class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style="background:${b.accent}22;color:${b.accent}"><i class="fas ${b.icon}"></i></span>
    <div>
      <span class="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full bg-gray-800 text-gray-300">${b.structure}</span>
      <h1 class="text-3xl md:text-4xl font-extrabold text-white mt-1">${b.name}</h1>
    </div>
  </div>
  <p class="text-xl italic mb-3" style="color:${b.accent}">"${b.tagline}"</p>
  <p class="text-gray-400 max-w-3xl">${b.role}</p>
  ${b.complianceNote ? `<div class="mt-5 bg-amber-900/15 border border-amber-700/30 rounded-xl p-4 max-w-3xl"><p class="text-amber-200/90 text-sm"><i class="fas fa-scale-balanced mr-2"></i>${b.complianceNote.text}</p><a href="${b.complianceNote.url}" target="_blank" rel="noopener" class="text-mk-cyan text-xs font-semibold hover:underline mt-1 inline-block">Source: ${b.complianceNote.source} <i class="fas fa-external-link text-[9px]"></i></a></div>` : ''}
</section>

<section id="brand-infra" class="mb-10">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-cubes mr-2" style="color:${b.accent}"></i>${b.infraTitle}</h2>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-6">
    <div class="grid md:grid-cols-2 gap-x-8 gap-y-2">${b.infra.map((i) => `<p class="text-sm text-gray-300"><i class="far fa-square-check mr-2" style="color:${b.accent}"></i>${i}</p>`).join('')}</div>
  </div>
</section>

${(b.extraSections || []).map((s) => `
<section class="mb-10">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas ${s.icon} mr-2" style="color:${b.accent}"></i>${s.title}</h2>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-6">
    <ul class="space-y-2">${s.items.map((i) => `<li class="text-sm text-gray-300"><i class="fas fa-circle-dot mr-2 text-[8px] align-middle" style="color:${b.accent}"></i>${i}</li>`).join('')}</ul>
  </div>
</section>`).join('')}

<section id="brand-revenue" class="mb-10">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-stairs mr-2" style="color:${b.accent}"></i>Revenue Ladder</h2>
  <div class="space-y-2">${b.revenue.map((r, i) => `<div class="flex items-center gap-4 bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4"><span class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0" style="background:${b.accent}22;color:${b.accent}">${i + 1}</span><p class="text-sm text-white font-medium">${r}</p></div>`).join('')}</div>
</section>

<section id="brand-passport-tie" class="mb-10 bg-gradient-to-r from-[#0d1b30] to-[#101f38] border border-mk-gold/30 rounded-2xl p-6">
  <h2 class="text-xl font-bold text-white mb-2"><i class="fas fa-passport text-mk-gold mr-2"></i>Powered by the Readiness Passport</h2>
  <p class="text-gray-400 text-sm mb-4">Every registration, proposal, grant and funding application for ${b.name} pulls verified data from the shared Business Readiness Passport and Evidence Vault — no invented credentials, no expired documents, no commingled records.</p>
  <a href="/passport" class="inline-block gold-bg text-black font-bold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition">Open the Passport <i class="fas fa-arrow-right ml-1"></i></a>
</section>

<section id="brand-siblings" class="mb-6">
  <h2 class="text-lg font-bold text-white mb-3">More of the McKnight Fleet</h2>
  <div class="flex flex-wrap gap-2">${others.map((o) => `<a href="/ecosystem/${o.slug}" class="text-xs px-3 py-1.5 rounded-full bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition"><i class="fas ${o.icon} mr-1.5" style="color:${o.accent}"></i>${o.name}</a>`).join('')}<a href="/ecosystem" class="text-xs px-3 py-1.5 rounded-full gold-bg text-black font-semibold">All brands →</a></div>
</section>
`)
}
