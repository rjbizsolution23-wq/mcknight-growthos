// ── v6.0 Brand configs — one per fleet brand, content from the fleet blueprint ──
import { renderBrandSite, type BrandSiteConfig } from './brandSites'

const T = (cfg: BrandSiteConfig) => (q: Record<string, string | undefined>) => renderBrandSite(cfg, q)

// 1 · McKnight Opportunity Group — corporate umbrella
export const opportunityGroupSite = T({
  slug: 'opportunity-group', brandKey: 'mog',
  product: 'Executive Command Center', function: 'Portfolio governance across contracts, capital, communities, mobility and learning',
  positioning: 'McKnight Opportunity Group builds practical systems that help businesses compete, families advance, communities strengthen and essential services operate with greater control.',
  heroKicker: 'The McKnight Opportunity Group Portfolio', heroCta: 'Partner With Us',
  nav: ['Our Companies', 'Our Mission', 'Leadership', 'Community Impact', 'Partners', 'News', 'Contact'],
  stats: [['9', 'Operating brands'], ['5', 'Business lines'], ['1', 'Unified mission'], ['∞', 'Community impact']],
  services: [
    ['fa-file-contract', 'The Contracting Preacher', 'Government contracting systems and the Contracting Preacher OS Client Command Center — its own platform with its own dedicated CRM.'],
    ['fa-building', 'Housing Initiative', 'Affordable housing development, preservation and resident stability services through the Housing Impact Portal.'],
    ['fa-coins', 'Capital Ready', 'Personal credit readiness and business funding readiness — two separated lanes, one Capital Ready OS.'],
    ['fa-house-chimney', 'MortgageOS', 'Mortgage intelligence APIs: prequalification, guideline simulation, closing costs and compliance timing.'],
    ['fa-rocket', 'GrowthOS', 'Funnels, LeadFlow CRM, campaigns, sponsors and analytics — the marketing engine behind every brand.'],
    ['fa-truck', 'Freight, Fleet & Learning', 'McKnight Freight Systems + DriverHub, FleetWorks ServiceHub, Early Learning Academy and LearningOS.'],
  ],
  portalName: 'Executive Portfolio Dashboard', portalDesc: 'Brand performance, revenue summaries, compliance status, open risks, renewals, staffing, vendors, board documents and incident reporting — summary metrics only, never unrestricted child, credit, mortgage, housing or driver records.',
  portalFeatures: [['fa-chart-line', 'Brand performance'], ['fa-sack-dollar', 'Revenue summaries'], ['fa-shield-halved', 'Compliance status'], ['fa-triangle-exclamation', 'Open risks'], ['fa-id-card', 'License renewals'], ['fa-users', 'Staffing'], ['fa-handshake', 'Vendor management'], ['fa-gavel', 'Board documents']],
  workflowTitle: 'How the Portfolio Operates',
  workflow: ['Brand captures demand', 'GrowthOS routes the lead', 'Brand platform serves the client', 'Compliance controls verify', 'Impact reported to the Group'],
  complianceTitle: 'Separate Data. Separate Legal Boundaries.',
  compliance: [
    'Each operating company maintains a separate tenant boundary, access roles, storage namespace and retention policy.',
    'The Contracting Preacher runs its own platform with a dedicated CRM — other brands do not share that client database.',
    'The corporate dashboard receives summary metrics only — never unrestricted child, credit, mortgage, housing or driver records.',
    'Shared code ≠ shared unrestricted data.',
  ],
  faq: [
    { q: 'What is McKnight Opportunity Group?', a: 'The parent organization behind nine operating brands spanning government contracting, housing, capital readiness, mortgage technology, marketing systems, freight, fleet repair and early learning.' },
    { q: 'Do the brands share client data?', a: 'No. Each platform has separate tenant boundaries, access roles, storage and retention policies. The Contracting Preacher CRM in particular is fully dedicated and not shared.' },
    { q: 'How do I partner with the Group?', a: 'Use the contact form below — tell us which business line you want to work with and our team will route your inquiry to the right operating company.' },
  ],
  formTitle: 'Work With the Group', formNote: 'Partnerships, media, careers or brand inquiries — routed to the right operating company.',
  interestOptions: ['Partnership', 'Vendor / Supplier', 'Media', 'Careers', 'Community program', 'Other'],
})

// 2 · The Contracting Preacher
export const contractingPreacherSite = T({
  slug: 'contracting-preacher', brandKey: 'contracting',
  product: 'Contracting Preacher OS', function: 'Government contracting readiness, capture and delivery systems',
  positioning: 'Win government contracts with systems, not luck. Registration, certification, capture, proposal and delivery — managed in one dedicated Client Command Center.',
  heroKicker: 'Government Contracting · Its Own Platform · Its Own CRM', heroCta: 'Start Your GovCon Journey',
  nav: ['Services', 'Client Command Center', 'Process', 'Compliance', 'FAQ', 'Results', 'Contact'],
  stats: [['SAM', 'Registration guided'], ['8(a)/WOSB/SDVOSB', 'Certification pathways'], ['RFP→Award', 'Full capture cycle'], ['1', 'Dedicated CRM']],
  services: [
    ['fa-id-badge', 'Registration & Setup', 'SAM registration, UEI, CAGE, NAICS selection and business-identity consistency — the foundation every award depends on.'],
    ['fa-certificate', 'Certifications', '8(a), HUBZone, WOSB, SDVOSB and state/local certification preparation with document readiness tracking.'],
    ['fa-magnifying-glass-chart', 'Opportunity Capture', 'Sources Sought, RFI and RFP monitoring matched to your NAICS codes and past performance.'],
    ['fa-file-pen', 'Proposal Systems', 'Compliance matrices, win themes, pricing structure and submission workflows that pass the first gate.'],
    ['fa-diagram-project', 'Contract Delivery', 'Post-award management: deliverables, invoicing, subcontractor coordination and CPARS readiness.'],
    ['fa-church', 'The Preacher Method', 'Discipline, preparation and stewardship — contracting taught the way it actually gets won.'],
  ],
  portalName: 'Client Command Center', portalDesc: 'A dedicated CRM for contracting clients only. Business intake, readiness, certifications, pipeline, proposals and delivery — never shared with other McKnight brands.',
  portalFeatures: [['fa-clipboard-check', 'Business intake'], ['fa-list-check', 'Readiness checklist'], ['fa-certificate', 'Certification tracker'], ['fa-binoculars', 'Opportunity pipeline'], ['fa-file-lines', 'Proposal workspace'], ['fa-folder-open', 'Document vault'], ['fa-comments', 'Secure messaging'], ['fa-chart-column', 'Win-rate analytics']],
  workflowTitle: 'The GovCon Pipeline',
  workflow: ['Business Intake', 'Registration & Readiness', 'Certification', 'Opportunity Match', 'Capture & Proposal', 'Award', 'Delivery & Past Performance'],
  complianceTitle: 'What We Are — and Are Not',
  compliance: [
    'We provide consulting, systems and preparation support — we are not a government agency and do not award contracts.',
    'No guaranteed awards, guaranteed certifications or guaranteed set-aside approvals — outcomes depend on agency decisions.',
    'The Contracting Preacher client database is fully separate from every other McKnight brand.',
    'Certification eligibility rules are set by SBA and certifying agencies — we prepare, they decide.',
  ],
  faq: [
    { q: 'Do you guarantee contract awards?', a: 'No one can. We build the registration, certification and proposal systems that make your business genuinely competitive — the award decision always belongs to the agency.' },
    { q: 'Is my data shared with other McKnight companies?', a: 'No. The Contracting Preacher OS is its own platform with a dedicated CRM. Other brands do not have access to this client database.' },
    { q: 'What certifications can you help with?', a: '8(a), HUBZone, WOSB/EDWOSB, SDVOSB/VOSB and state or local equivalents — including document preparation and readiness tracking.' },
  ],
  formTitle: 'Get Contract-Ready', formNote: 'Tell us where you are — registration, certification or capture — and we will map your path.',
  interestOptions: ['New to GovCon', 'SAM registration', 'Certification (8a/WOSB/SDVOSB/HUBZone)', 'Proposal support', 'Post-award delivery', 'Other'],
})

// 3 · McKnight Housing Initiative
export const housingInitiativeSite = T({
  slug: 'housing-initiative', brandKey: 'housing',
  product: 'Housing Impact Portal', function: 'Affordable housing development, preservation and resident stability',
  positioning: 'Develop, preserve and support affordable housing while connecting residents with services that improve long-term housing stability.',
  heroKicker: 'Housing Programs · Resident Services · Community Impact', heroCta: 'Apply for Assistance',
  nav: ['Housing Programs', 'Properties', 'Housing Stability', 'Resident Services', 'Partner With Us', 'Impact', 'Contact'],
  stats: [['HOME/CDBG', 'Funding programs tracked'], ['LIHTC', 'Development pipeline'], ['360°', 'Resident support'], ['100%', 'Financial transparency']],
  services: [
    ['fa-house-user', 'Housing Programs', 'Affordable rental pathways, homeownership preparation and housing-stability programs matched to household eligibility.'],
    ['fa-hammer', 'Home Repair', 'Critical repair coordination that keeps families safely housed in the homes they already own.'],
    ['fa-hand-holding-heart', 'Resident Services', 'Case-managed connections to services that improve long-term stability — not just placement.'],
    ['fa-city', 'Property Pipeline', 'Acquisition, development budgets, capital stacks, construction timelines and compliance-period tracking.'],
    ['fa-landmark-dome', 'Funding Workspace', 'HOME, CDBG, LIHTC, HUD notices, USDA Rural Development, state programs, trust funds and foundations.'],
    ['fa-people-group', 'Partner Network', 'Developers, contractors, property managers, lenders and community organizations working one plan.'],
  ],
  portalName: 'Housing Impact Portal', portalDesc: 'Applicant workspace, property pipeline, funding workspace and nonprofit administration — appeals and correction requests built in.',
  portalFeatures: [['fa-clipboard-list', 'Prescreening'], ['fa-users', 'Household profile'], ['fa-file-invoice-dollar', 'Income documentation'], ['fa-universal-access', 'Accessibility needs'], ['fa-upload', 'Document uploads'], ['fa-calendar-check', 'Appointment booking'], ['fa-message', 'Secure messaging'], ['fa-rotate-left', 'Appeals & corrections']],
  workflowTitle: 'The Applicant Journey',
  workflow: ['Prescreening', 'Household Profile', 'Documentation', 'Eligibility Review', 'Program Match', 'Appointment', 'Decision & Appeals'],
  complianceTitle: 'Launch Gates We Honor',
  compliance: [
    'No claim of active 501(c)(3) status without an IRS determination letter.',
    'No claim of CHDO status without formal designation — HUD requires specific legal, organizational, board and capacity qualifications.',
    'No listing of properties not legally controlled.',
    'No guaranteed housing placement and no guaranteed financial assistance — eligibility and funding availability govern.',
  ],
  faq: [
    { q: 'Is assistance guaranteed if I apply?', a: 'No. Applications are reviewed against program eligibility and funding availability. We commit to a clear process, honest timelines and a documented appeals path.' },
    { q: 'What programs might I qualify for?', a: 'Depending on household situation: affordable rental, homeownership preparation, housing stability support or home repair. Prescreening identifies your likely matches before you complete a full application.' },
    { q: 'How are you funded?', a: 'A combination of public programs (HOME, CDBG, LIHTC and others as awarded), foundations, banks, community-development finance and sponsors — with financial transparency reporting.' },
  ],
  formTitle: 'Apply for Assistance', formNote: 'Start with prescreening — takes minutes and identifies which programs fit your household.',
  interestOptions: ['Rental assistance', 'Homeownership preparation', 'Home repair', 'Housing stability support', 'Partner with us', 'Donate', 'Other'],
})

// 4 · McKnight Capital Ready
export const capitalReadySite = T({
  slug: 'capital-ready', brandKey: 'capital',
  product: 'Capital Ready OS', function: 'Personal credit readiness and business funding readiness — two separated lanes',
  positioning: 'Build credit. Build capital. Build forward. Two separated service lanes — Personal Credit Readiness and Business Funding Readiness — never blended into a vague "guaranteed funding" offer.',
  heroKicker: 'Credit Education · Funding Readiness · Attorney Referral Network', heroCta: 'Check Your Readiness',
  nav: ['Personal Credit', 'Business Funding', 'Capital Matching', 'Legal Network', 'Compliance', 'Pricing', 'Contact'],
  stats: [['2', 'Separated service lanes'], ['12+', 'Funding product types'], ['0', 'Guaranteed-outcome claims'], ['100%', 'Written contracts']],
  services: [
    ['fa-graduation-cap', 'Personal Credit Readiness', 'Credit education, report review, consumer-rights education, personal action plans and dispute-document workflow with progress tracking.'],
    ['fa-briefcase', 'Business Funding Readiness', 'Entity health, identity consistency, banking history, revenue and cash-flow analysis, business-credit profile and readiness score.'],
    ['fa-magnifying-glass-dollar', 'Capital Matching', 'Cards, lines, term loans, SBA-related products, equipment, invoice financing, CDFIs, microloans, grants and RBF — every match carries provider, criteria, cost structure and referral disclosure.'],
    ['fa-scale-balanced', 'Attorney Referral Network', 'An independent referral layer — not a law firm. Conflict checks, client authorization, referral disclosure and independent engagement agreements.'],
    ['fa-list-check', 'Application Tracker', 'Every application, every decline reason, every next step — tracked so nothing dies in an inbox.'],
    ['fa-chart-line', 'Readiness Score', 'A transparent score built from profile completion, documents, financials and credit education progress — with the "why" shown for every factor.'],
  ],
  portalName: 'Capital Ready OS Dashboard', portalDesc: 'Readiness score, profile completion, credit education, business documents, financial readiness, funding matches, applications, attorney escalations, appointments, payments, messages and your action plan.',
  portalFeatures: [['fa-gauge-high', 'Readiness Score'], ['fa-user-check', 'Profile completion'], ['fa-book-open', 'Credit education'], ['fa-folder-open', 'Business documents'], ['fa-coins', 'Funding matches'], ['fa-paper-plane', 'Applications'], ['fa-gavel', 'Attorney escalations'], ['fa-route', 'Action plan']],
  workflowTitle: 'From Readiness to Capital',
  workflow: ['Intake', 'Lane Selection', 'Education & Documentation', 'Readiness Score', 'Capital Matching', 'Applications', 'Funding & Follow-Through'],
  complianceTitle: 'Credit Compliance — Non-Negotiable',
  compliance: [
    'No payment demanded before promised services are performed; written contracts and statutory consumer protections per the Credit Repair Organizations Act.',
    'Prohibited claims we will never make: guaranteed score increase, guaranteed deletion, new credit identity, guaranteed approval, guaranteed funding amount, removal of accurate information, "no denial" funding.',
    'Personal credit and business funding are separate lanes with separate agreements — never blended.',
    'The Legal Network is independent attorneys — no nonlawyer legal advice, no unauthorized fee sharing, conflict checks and client authorization on every referral.',
  ],
  faq: [
    { q: 'Can you guarantee my score goes up or my funding is approved?', a: 'No — and anyone who says otherwise is violating federal law. We provide education, organization, readiness scoring and matching. Outcomes depend on your profile and lender decisions.' },
    { q: 'What is the difference between the two lanes?', a: 'Personal Credit Readiness is education and dispute-documentation support for consumers. Business Funding Readiness prepares your company — entity, banking, revenue, documents — for capital. Separate agreements, separate workflows.' },
    { q: 'How does capital matching work?', a: 'Your readiness profile is matched against lender criteria across 12+ product types. Every match shows the provider, minimum criteria, estimated range, cost structure, guarantee/collateral requirements and our referral disclosure.' },
  ],
  formTitle: 'Start Your Readiness Assessment', formNote: 'Pick your lane — personal credit or business funding — and get a clear, honest starting point.',
  interestOptions: ['Personal Credit Readiness', 'Business Funding Readiness', 'Business setup', 'Capital matching', 'Attorney referral', 'Other'],
})

// 5 · McKnight MortgageOS
export const mortgageosSite = T({
  slug: 'mortgageos', brandKey: 'mortgage',
  product: 'Mortgage Intelligence API', function: 'Mortgage decision-support technology for lenders, brokers and fintechs',
  positioning: 'Mortgage intelligence. Faster decisions. Cleaner pipelines. Prequalification, guideline simulation, closing costs, compliance timing and document intelligence — as APIs.',
  heroKicker: 'Mortgage Technology · Decision Support · API Software', heroCta: 'Get API Access',
  nav: ['Platform', 'Prequalification', 'Guideline Simulation', 'Compliance Timing', 'Document Intelligence', 'API Docs', 'Contact'],
  stats: [['5', 'Core engines'], ['4', 'Program types simulated'], ['<1s', 'Decision-support latency'], ['API', 'First architecture']],
  services: [
    ['fa-calculator', 'Prequalification Engine', 'Income, debt, DTI, credit band, down payment, assets, employment, occupancy, veteran eligibility and USDA-area indicators — program comparisons in one call.'],
    ['fa-sitemap', 'Guideline Simulation', 'Conventional, FHA, VA and USDA program flags, conditions, missing information, risk warnings and manual-review triggers.'],
    ['fa-file-invoice-dollar', 'Closing Cost Intelligence', 'State and county transfer taxes, recording, title, prepaids, escrows, lender charges, seller credits — cash-to-close estimates.'],
    ['fa-stopwatch', 'Compliance Timing', 'Disclosure timing, intent-to-proceed tracking, changed-circumstance alerts, CD timelines, business-day calculations and audit evidence.'],
    ['fa-file-circle-question', 'Document Intelligence', 'Paystub and W-2 extraction, bank-statement analysis, income categorization, missing-page detection and fraud-risk flags — with human verification.'],
    ['fa-bolt', 'Lead Intelligence', 'Score and route mortgage leads by program fit before a loan officer ever touches the file.'],
  ],
  portalName: 'Customer Dashboard', portalDesc: 'API keys, usage, quotas, requests, error logs, webhooks, team members, billing, security and documentation — everything an integration team needs.',
  portalFeatures: [['fa-key', 'API keys'], ['fa-chart-area', 'Usage & quotas'], ['fa-bug', 'Error logs'], ['fa-satellite-dish', 'Webhooks'], ['fa-users-gear', 'Team members'], ['fa-credit-card', 'Billing'], ['fa-lock', 'Security'], ['fa-book', 'Documentation']],
  workflowTitle: 'From Lead to Clear-to-Close Support',
  workflow: ['Lead Intake', 'Prequalification', 'Program Simulation', 'Document Intelligence', 'Compliance Timing', 'Decision Support', 'Audit Evidence'],
  complianceTitle: 'Required Positioning — Read This',
  compliance: [
    'McKnight MortgageOS is mortgage technology: decision support, guideline simulation, pre-screening infrastructure and API software.',
    'It is NOT a lender, NOT a mortgage broker, NOT an official automated underwriting system, NOT a loan approval and NOT a commitment to lend.',
    'All outputs are decision support requiring review by licensed professionals.',
    'Document intelligence includes human verification — extraction is assistive, never final.',
  ],
  faq: [
    { q: 'Is MortgageOS a lender or AUS?', a: 'Neither. It is decision-support software — simulation and pre-screening infrastructure. Official underwriting decisions come from lenders and official AUS systems.' },
    { q: 'Who is it for?', a: 'Lenders, brokers, LOs and fintech teams that want faster pre-screening, cleaner pipelines and audit-ready compliance timing without building the engines in-house.' },
    { q: 'How do I integrate?', a: 'REST APIs with keys, webhooks, usage dashboards and full documentation. Request access below and we will provision a sandbox key.' },
  ],
  formTitle: 'Request API Access', formNote: 'Tell us your volume and use case — we will set up a sandbox and walk your team through the docs.',
  interestOptions: ['Prequalification API', 'Guideline simulation', 'Closing cost intelligence', 'Compliance timing', 'Document intelligence', 'Full platform', 'Other'],
})

// 6 · McKnight GrowthOS — Growth Command Center
export const growthCommandSite = T({
  slug: 'growth-command', brandKey: 'growthos',
  product: 'Growth Command Center', function: 'Funnels, marketing CRM, campaigns, sponsors and analytics',
  positioning: 'Turn attention into pipeline—and pipeline into growth. Funnel Studio, LeadFlow CRM, Campaign Vault, Sponsor Engine, Compliance Guard and Growth Analytics — one command center.',
  heroKicker: 'The Marketing Engine Behind Every McKnight Brand', heroCta: 'Launch Your First Funnel',
  nav: ['Funnel Studio', 'LeadFlow CRM', 'Campaign Vault', 'Sponsor Engine', 'Compliance Guard', 'Templates', 'Contact'],
  stats: [['32+', 'Live funnel templates'], ['11', 'Template suites'], ['6', 'Notification channels'], ['1', 'Command center']],
  services: [
    ['fa-filter', 'Funnel Studio', 'Landing pages, lead magnets, webinar, appointment, application, event, sponsor, checkout and upsell funnels — white-label branding and custom domains.'],
    ['fa-address-book', 'LeadFlow CRM', 'The marketing CRM: leads, sources, campaigns, conversations, appointments, marketing consent, follow-up and conversion attribution. Not the Contracting Preacher CRM.'],
    ['fa-envelopes-bulk', 'Campaign Vault', 'Email and SMS templates, nurture sequences, reactivation, appointment reminders, no-show recovery and referral requests.'],
    ['fa-handshake', 'Sponsor Engine', 'Sponsor database, prospectus builder, tiers, outreach sequences, deliverables, agreements, payments and post-event reporting.'],
    ['fa-shield-halved', 'Compliance Guard', 'Industry-specific disclaimer blocks, consent-language controls, approval history, content risk flags and unsubscribe management.'],
    ['fa-chart-pie', 'Growth Analytics', 'Visitors, leads, appointments, conversion, revenue attribution, cost per lead, cost per client and funnel drop-off.'],
  ],
  portalName: 'Growth Command Center', portalDesc: 'Every module in one operating view — funnels, leads, campaigns, sponsors, compliance and analytics, wired to ClientOS pipelines per brand.',
  portalFeatures: [['fa-filter', 'Funnel Studio'], ['fa-address-book', 'LeadFlow CRM'], ['fa-envelopes-bulk', 'Campaign Vault'], ['fa-handshake', 'Sponsor Engine'], ['fa-shield-halved', 'Compliance Guard'], ['fa-magnifying-glass-chart', 'SEO Intelligence'], ['fa-share-nodes', 'Social AI'], ['fa-chart-pie', 'Growth Analytics']],
  workflowTitle: 'Attention → Pipeline → Growth',
  workflow: ['Traffic', 'Funnel', 'Lead Captured', 'CRM + ClientOS Routing', 'Nurture Campaign', 'Appointment', 'Client Won', 'Attribution Reported'],
  complianceTitle: 'Compliance-Aware, Stated Honestly',
  compliance: [
    'Templates are compliance-aware, not automatically legally compliant — industry review is always required before launch.',
    'LeadFlow CRM manages marketing leads — it is separate from the dedicated Contracting Preacher client CRM.',
    'Consent language, unsubscribe management and advertising-claim evidence are built into Compliance Guard.',
    'White-label client branding never removes required disclaimers.',
  ],
  faq: [
    { q: 'Is GrowthOS a CRM?', a: 'It includes LeadFlow CRM for marketing leads and attribution. Post-sale client operations live in ClientOS; the Contracting Preacher runs its own dedicated CRM entirely.' },
    { q: 'Are the templates legally compliant?', a: 'They are compliance-aware — built with disclaimer blocks and consent controls — but every industry has specific rules. Attorney review before launch is required and stated on every template.' },
    { q: 'Which industries have template suites?', a: 'Events & sponsors, credit businesses, tax professionals, mortgage professionals, law firms, childcare, home services, coaching, SaaS, real estate and local businesses.' },
  ],
  formTitle: 'Get Your Growth System', formNote: 'Tell us your industry and goal — we will map the funnel, CRM and campaign stack for it.',
  interestOptions: ['Funnel build', 'LeadFlow CRM', 'Campaign sequences', 'Sponsor engine', 'Full platform', 'White-label / agency', 'Other'],
})

// 7 · McKnight Freight Systems
export const freightSystemsSite = T({
  slug: 'freight-systems', brandKey: 'freight',
  product: 'McKnight DriverHub', function: 'Transportation operations — freight services, dispatch and driver management',
  positioning: 'Freight moved with discipline. Dry van, dedicated routes, government freight and an owner-operator program — run on DriverHub with safety-first onboarding and clean settlements.',
  heroKicker: 'Freight Services · Driver Careers · Owner-Operators', heroCta: 'Get a Freight Quote',
  nav: ['Freight Services', 'Government Freight', 'Owner-Operators', 'Driver Careers', 'Safety', 'Track a Load', 'Contact'],
  stats: [['DOT', 'Safety-first operations'], ['10-step', 'Driver mobile workflow'], ['49 CFR 376', 'Lease review standard'], ['24/7', 'Dispatch discipline']],
  services: [
    ['fa-truck', 'Dry Van & Dedicated', 'Reliable dry-van capacity and dedicated-route programs built around shipper schedules — advertised only for equipment we actually run.'],
    ['fa-landmark', 'Government Freight', 'Government freight support aligned with the Contracting Preacher pipeline — compliance documents ready before the load.'],
    ['fa-user-tie', 'Owner-Operator Program', 'Transparent lease terms, settlements, chargebacks and escrow — documents reviewed against truth-in-leasing rules (49 CFR Part 376).'],
    ['fa-route', 'Dispatch Operations', 'Load, broker, pickup, delivery, rate, miles, fuel advances, accessorials, stops, status and documents — one record per load.'],
    ['fa-clipboard-check', 'Safety & Compliance', 'CDL, medical card, MVR, Clearinghouse workflow, drug-and-alcohol program, road tests and safety orientation.'],
    ['fa-boxes-stacked', 'Final Mile & Expedited', 'Time-critical moves handled with the same discipline as line-haul — status visible at every step.'],
  ],
  portalName: 'McKnight DriverHub', portalDesc: 'Driver onboarding, dispatch, the 10-step driver mobile workflow, equipment management and lease management with settlement statements.',
  portalFeatures: [['fa-id-card', 'Driver onboarding'], ['fa-headset', 'Dispatch board'], ['fa-mobile-screen', 'Driver mobile workflow'], ['fa-truck-ramp-box', 'Load documents & POD'], ['fa-truck-moving', 'Equipment management'], ['fa-file-signature', 'Lease management'], ['fa-money-check-dollar', 'Settlement statements'], ['fa-triangle-exclamation', 'Defect reporting']],
  workflowTitle: 'The Driver Mobile Workflow',
  workflow: ['Assigned', 'Accepted', 'En Route to Pickup', 'Arrived', 'Loaded', 'In Transit', 'Arrived at Delivery', 'Unloaded', 'POD Uploaded', 'Completed'],
  complianceTitle: 'Advertised Honestly. Operated Legally.',
  compliance: [
    'We do not advertise equipment types or operating authority the company does not possess.',
    'Owner-operator and equipment lease documents are reviewed against truth-in-leasing rules under 49 CFR Part 376.',
    'Driver qualification follows FMCSA requirements: CDL, medical card, MVR, Clearinghouse and drug-and-alcohol program.',
    'Vehicle inspection, repair and maintenance records are kept per 49 CFR Part 396 — connected to FleetWorks ServiceHub.',
  ],
  faq: [
    { q: 'What freight do you run?', a: 'Dry van, dedicated routes, government freight, final mile and expedited — only service lines matching our actual equipment and insurance. Reefer and flatbed are listed only when equipped and insured.' },
    { q: 'How does the owner-operator program work?', a: 'Written lease with clear compensation, chargebacks, escrow terms and settlement statements — documents structured for review under federal truth-in-leasing rules.' },
    { q: 'How do drivers get maintenance issues fixed?', a: 'Report the defect in DriverHub → a FleetWorks ticket is created → inspection, estimate, repair → the vehicle record updates and both driver and dispatcher are notified.' },
  ],
  formTitle: 'Move Freight With Us', formNote: 'Shippers, drivers and owner-operators — tell us what you need and dispatch will follow up.',
  interestOptions: ['Shipper — freight quote', 'Driver career', 'Owner-operator program', 'Government freight', 'Dedicated routes', 'Other'],
})

// 8 · McKnight FleetWorks
export const fleetworksSite = T({
  slug: 'fleetworks', brandKey: 'fleetworks',
  product: 'FleetWorks ServiceHub', function: 'Commercial truck and trailer repair with fleet account management',
  positioning: 'Keep the fleet moving. Preventive maintenance, truck and trailer repair, commercial tires, mobile service and roadside assistance — with a work-order system your fleet manager will actually love.',
  heroKicker: 'Truck Repair · Trailer Repair · Mobile Service · Fleet Accounts', heroCta: 'Schedule Service',
  nav: ['Truck Repair', 'Trailer Repair', 'Mobile Service', 'Preventive Maintenance', 'Fleet Accounts', 'Service Areas', 'Contact'],
  stats: [['DOT', 'Inspection preparation'], ['10-stage', 'Work-order workflow'], ['Mobile', 'Service units'], ['49 CFR 396', 'Records standard']],
  services: [
    ['fa-oil-can', 'Preventive Maintenance', 'Oil and filter service, brake inspection, cooling and air systems — scheduled before failures cost you a load.'],
    ['fa-truck', 'Truck Repair', 'Electrical diagnostics, brakes, suspension and driveline — diagnosed with codes, documented with photos.'],
    ['fa-trailer', 'Trailer Repair', 'Lights, brakes, doors, liftgates and suspension — DOT inspection preparation included.'],
    ['fa-circle-dot', 'Commercial Tires', 'Replacement and repair with position tracking, casing management and cost-per-mile visibility.'],
    ['fa-truck-pickup', 'Mobile & Roadside', 'Mobile repair units and emergency roadside assistance — only dispatched within our actual service area.'],
    ['fa-building-user', 'Fleet Accounts', 'Credit terms, PO rules, approved contacts, service history and multi-location billing in one account.'],
  ],
  portalName: 'FleetWorks ServiceHub', portalDesc: 'Customer records, the 10-stage work order, parts inventory and the DriverHub connection — defect to repaired, documented end-to-end.',
  portalFeatures: [['fa-folder-user', 'Customer records'], ['fa-file-pen', 'Work orders'], ['fa-barcode', 'Parts inventory'], ['fa-camera', 'Photo documentation'], ['fa-signature', 'Customer authorization'], ['fa-shield', 'Warranty tracking'], ['fa-link', 'DriverHub connection'], ['fa-calendar-check', 'Next-service scheduling']],
  workflowTitle: 'The Work Order, Start to Finish',
  workflow: ['Request', 'Triage', 'Inspection', 'Estimate', 'Customer Authorization', 'Parts Ordered', 'Repair', 'Quality Check', 'Invoice', 'Pickup/Return', 'Follow-Up'],
  complianceTitle: 'Only What We Can Actually Deliver',
  compliance: [
    'We list only services actually supported by our tools, technicians, insurance and licensing.',
    'Federal rules (49 CFR Part 396) require systematic inspection, repair and maintenance with records available for inspection — our work orders are built to that standard.',
    'Every repair beyond the estimate requires documented customer authorization before work continues.',
    'Warranty terms are written on the work order — parts and labor, stated plainly.',
  ],
  faq: [
    { q: 'Do you handle fleet accounts?', a: 'Yes — credit terms, purchase-order rules, approved contacts, consolidated billing and full service history per vehicle across locations.' },
    { q: 'How does the DriverHub connection work?', a: 'A driver reports a defect in DriverHub → ServiceHub opens a ticket → we inspect, estimate and repair after authorization → the vehicle record updates and driver + dispatcher are notified automatically.' },
    { q: 'Can you prepare vehicles for DOT inspection?', a: 'Yes — DOT inspection preparation is a core service, with documentation designed to satisfy 49 CFR Part 396 record requirements.' },
  ],
  formTitle: 'Schedule Service', formNote: 'Breakdown, PM due or fleet account setup — tell us the unit and the issue.',
  interestOptions: ['Schedule repair', 'Preventive maintenance', 'Commercial tires', 'Mobile / roadside', 'Fleet account setup', 'DOT inspection prep', 'Other'],
})

// 9 · McKnight Early Learning Academy
export const earlyLearningSite = T({
  slug: 'early-learning', brandKey: 'earlylearning',
  product: 'Family Portal', function: 'Licensed early childhood education and family services',
  positioning: 'Strong beginnings. Brighter futures. Programs from infants through school-age, a transparent enrollment journey and a Family Portal that keeps parents connected all day.',
  heroKicker: 'Infants · Toddlers · Preschool · Pre-K · School-Age', heroCta: 'Schedule a Tour',
  nav: ['Programs', 'Curriculum', 'Enrollment', 'Tuition', 'Family Resources', 'Quality Commitment', 'Contact'],
  stats: [['9-step', 'Enrollment journey'], ['Daily', 'Parent reports'], ['ABC', 'Quality participation'], ['Licensed', 'Program types only']],
  services: [
    ['fa-baby', 'Infants & Toddlers', 'Warm, responsive care with daily reports on meals, naps and activities — published only for licensed, approved capacity.'],
    ['fa-shapes', 'Preschool & Pre-K', 'Play-based learning tied to developmental domains, learning observations and kindergarten readiness.'],
    ['fa-school', 'School-Age & Summer', 'After-school and summer programs that keep learning going — homework support, activities and field experiences.'],
    ['fa-book-open-reader', 'Curriculum & Assessment', 'Learning objectives, observations, evidence and progress reports shared with families each term.'],
    ['fa-hand-holding-heart', 'Family Resources', 'Financial-assistance guidance, community connections and family engagement events.'],
    ['fa-award', 'Quality Commitment', 'Licensing compliance, staff qualifications, training hours and ABC Quality evidence — tracked continuously.'],
  ],
  portalName: 'Family Enrollment Portal', portalDesc: 'Family profile, the 9-step enrollment workflow and a parent portal with attendance, daily reports, photos (with consent), tuition, documents and incident reports.',
  portalFeatures: [['fa-users', 'Family profile'], ['fa-calendar-check', 'Attendance'], ['fa-utensils', 'Meals & naps'], ['fa-images', 'Photos (with consent)'], ['fa-message', 'Messages'], ['fa-file-invoice-dollar', 'Tuition & receipts'], ['fa-notes-medical', 'Incident reports'], ['fa-user-shield', 'Pickup authorization']],
  workflowTitle: 'The Enrollment Journey',
  workflow: ['Inquiry', 'Tour', 'Application', 'Waitlist', 'Offer', 'Enrollment Documents', 'Tuition Setup', 'Classroom Placement', 'Orientation', 'Active'],
  complianceTitle: 'Licensed. Transparent. Family-First.',
  compliance: [
    'We publish only programs approved by our license and facility capacity.',
    'South Carolina childcare programs must be licensed, registered, approved or legally exempt depending on program type — our status is stated plainly.',
    'ABC Quality is South Carolina\u2019s voluntary quality-rating and improvement program — participation evidence is maintained in our Quality Improvement Center.',
    'Photos are shared only with documented parental consent; custody restrictions are honored in every pickup authorization.',
  ],
  faq: [
    { q: 'What ages do you serve?', a: 'Infants through school-age, subject to licensed capacity per classroom. The current openings and waitlist status are shared during your tour.' },
    { q: 'How does enrollment work?', a: 'Inquiry → tour → application → waitlist (if needed) → offer → enrollment documents → tuition setup → classroom placement → orientation → active. You always know exactly which step you are on.' },
    { q: 'Is financial assistance available?', a: 'We help families explore assistance options and subsidies where eligible — ask during your tour and we will walk through it together.' },
  ],
  formTitle: 'Schedule Your Tour', formNote: 'Come see the classrooms, meet the teachers and get your questions answered in person.',
  interestOptions: ['Infant care', 'Toddler program', 'Preschool', 'Pre-K', 'School-age / after-school', 'Summer program', 'Careers', 'Other'],
})

// 10 · McKnight LearningOS
export const learningosSite = T({
  slug: 'learningos', brandKey: 'learning',
  product: 'Childcare SaaS', function: 'Learning and center operations software for childcare providers',
  positioning: 'Childcare operations and learning, connected. Director, teacher and parent portals with enrollment CRM, classroom hub, learning tracker, billing, staff compliance, quality tracker and grant finder.',
  heroKicker: 'For Centers, Preschools, Academies & Multi-Location Operators', heroCta: 'Book a Demo',
  nav: ['Platform', 'Director Portal', 'Teacher Portal', 'Parent Portal', 'Quality Tracker', 'Grant Finder', 'Contact'],
  stats: [['3', 'Connected portals'], ['1:1', 'Ratio monitoring'], ['ABC', 'Quality standards tracked'], ['AI', 'Drafts — humans submit']],
  services: [
    ['fa-user-tie', 'Director Portal', 'Enrollment, capacity, waitlist, attendance, ratios, tuition, subsidies, staff schedules, credentials, compliance, incidents and reports.'],
    ['fa-chalkboard-user', 'Teacher Portal', 'Classroom roster, attendance, daily reports, meals, naps, activities, lesson plans, observations, assessments and family messages.'],
    ['fa-house-user', 'Parent Portal', 'Child dashboard, attendance, daily updates, messages, calendar, documents, billing, statements, authorized pickups and consent management.'],
    ['fa-seedling', 'Learning Tracker', 'Developmental domains, objectives, observations, evidence, assessments, parent input, individual goals and intervention referrals.'],
    ['fa-award', 'Quality Tracker', 'ABC Quality standards, licensing evidence, staff credentials, training, classroom environment, improvement plans and document expiration.'],
    ['fa-magnifying-glass-dollar', 'Grant Finder', 'Provider, facility, quality-improvement, workforce, curriculum, nutrition and technology grants — AI identifies and drafts, your director verifies and submits.'],
  ],
  portalName: 'Director, Teacher & Parent Portals', portalDesc: 'One platform, three roles, strict permissions — child and family data stays inside the center\u2019s tenant boundary with separate AI permissions.',
  portalFeatures: [['fa-clipboard-list', 'Enrollment CRM'], ['fa-people-roof', 'Classroom Hub'], ['fa-chart-line', 'Learning Tracker'], ['fa-file-invoice-dollar', 'Billing & subsidies'], ['fa-id-badge', 'Staff compliance'], ['fa-award', 'Quality Tracker'], ['fa-magnifying-glass-dollar', 'Grant Finder'], ['fa-lock', 'Consent management']],
  workflowTitle: 'A Day on LearningOS',
  workflow: ['Check-In', 'Ratio Monitor', 'Daily Reports', 'Learning Observations', 'Family Messages', 'Billing Sync', 'Compliance Evidence', 'Director Report'],
  complianceTitle: 'Child Data Is Different — We Treat It That Way',
  compliance: [
    'Child and family data lives in a separate domain with its own tenant boundary, access roles, storage namespace, retention policy and AI permissions.',
    'Photos, observations and records are shared only under documented parental consent.',
    'Grant Finder AI identifies and drafts — a director or authorized organizational representative must verify and submit.',
    'Quality Tracker maps to ABC Quality standards and licensing evidence, with expiration alerts before documents lapse.',
  ],
  faq: [
    { q: 'Who is LearningOS for?', a: 'Childcare centers, preschools, learning academies, after-school programs, multi-location operators and early-learning nonprofits.' },
    { q: 'How is this different from the Early Learning Academy?', a: 'The Academy is our own licensed childcare provider. LearningOS is the standalone SaaS product any provider can run their center on — separate brand, separate data domains.' },
    { q: 'Does the AI submit grants for us?', a: 'No. AI identifies opportunities and drafts applications; a director or authorized representative always verifies and submits. Accountability stays human.' },
  ],
  formTitle: 'Book Your Demo', formNote: 'See the director, teacher and parent portals live — with your center\u2019s workflow mapped in the call.',
  interestOptions: ['Single center', 'Multi-location operator', 'Preschool / academy', 'After-school program', 'Nonprofit', 'Migration from another system', 'Other'],
})
