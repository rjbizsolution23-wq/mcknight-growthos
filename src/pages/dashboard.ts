import { shell } from './layout'

export const dashboardPage = () => shell('Dashboard', 'dashboard', `
<section id="hero-section" class="text-center py-10">
  <p class="inline-block bg-gray-800 text-brand-cyan text-xs font-mono px-3 py-1 rounded-full mb-4"><i class="fas fa-bolt mr-1"></i>SUPREME FUNNEL SYSTEM v3.5 — 30 TEMPLATES · D1 CRM · WORKERS AI · 9 INTEGRATIONS · ENTERPRISE SECURITY · AI SOCIAL POSTS</p>
  <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4">The <span class="grad-text">Funnel Command Center</span></h1>
  <p class="text-gray-400 max-w-2xl mx-auto text-lg">30 compliance-engineered live funnel templates across events, tax, credit, and every major local-business niche — all white-label ready with client logo + brand color injection — plus email vaults, legal disclaimer libraries, and a parameterized funnel builder. Customize and deploy.</p>
</section>

<section id="vertical-cards" class="grid md:grid-cols-3 gap-6 mb-12">
  <a href="/events" class="card p-6 block group">
    <div class="grad-bg w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl mb-4"><i class="fas fa-ticket"></i></div>
    <h2 class="text-xl font-bold text-white mb-2 group-hover:text-brand-cyan">Events · Tickets · Sponsors</h2>
    <p class="text-gray-400 text-sm mb-4">5-stage event monetization funnel, sponsor acquisition machine, high-ticket offer stacks. Hook-Story-Offer + Hormozi + Cialdini encoded.</p>
    <ul class="text-xs text-gray-500 space-y-1">
      <li><i class="fas fa-check text-brand-success mr-1"></i>Event registration funnel template (live)</li>
      <li><i class="fas fa-check text-brand-success mr-1"></i>Sponsor prospectus template (live)</li>
      <li><i class="fas fa-check text-brand-success mr-1"></i>6-touch sponsor outreach sequence</li>
      <li><i class="fas fa-check text-brand-success mr-1"></i>Pre-event nurture emails + SMS</li>
    </ul>
  </a>
  <a href="/tax" class="card p-6 block group">
    <div class="bg-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl mb-4"><i class="fas fa-scale-balanced"></i></div>
    <h2 class="text-xl font-bold text-white mb-2 group-hover:text-brand-cyan">Tax Services</h2>
    <p class="text-gray-400 text-sm mb-4">IRS Circular 230, FTC Act, TSR, GLBA, TCPA compliant. Built on the lessons of the $77.7M FTC v. American Tax Service case.</p>
    <ul class="text-xs text-gray-500 space-y-1">
      <li><i class="fas fa-check text-brand-success mr-1"></i>Tax resolution lead funnel (live)</li>
      <li><i class="fas fa-check text-brand-success mr-1"></i>Compliant headline + CTA formulas</li>
      <li><i class="fas fa-check text-brand-success mr-1"></i>7-email nurture sequence</li>
      <li><i class="fas fa-check text-brand-success mr-1"></i>Full disclaimer library</li>
    </ul>
  </a>
  <a href="/credit" class="card p-6 block group">
    <div class="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl mb-4"><i class="fas fa-chart-line"></i></div>
    <h2 class="text-xl font-bold text-white mb-2 group-hover:text-brand-cyan">Credit Repair</h2>
    <p class="text-gray-400 text-sm mb-4">CROA, FCRA, TSR, CFPB-aware. Service, SaaS, education, and affiliate funnels — engineered post-Credit Repair Cloud settlement.</p>
    <ul class="text-xs text-gray-500 space-y-1">
      <li><i class="fas fa-check text-brand-success mr-1"></i>B2C credit service funnel (live)</li>
      <li><i class="fas fa-check text-brand-success mr-1"></i>B2B SaaS platform funnel (live)</li>
      <li><i class="fas fa-check text-brand-success mr-1"></i>8-email B2C + 6-email B2B sequences</li>
      <li><i class="fas fa-check text-brand-success mr-1"></i>CROA document checklist</li>
    </ul>
  </a>
</section>

<section id="quick-tools" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-toolbox text-brand-cyan mr-2"></i>Quick Tools</h2>
  <div class="grid md:grid-cols-3 gap-6">
    <a href="/builder" class="card p-6 block group">
      <h3 class="font-bold text-white mb-2 group-hover:text-brand-cyan"><i class="fas fa-wand-magic-sparkles text-brand-pink mr-2"></i>Funnel Builder</h3>
      <p class="text-gray-400 text-sm">Fill in your event, firm, or offer details — get a fully customized live funnel page with a shareable URL. Zero placeholders.</p>
    </a>
    <a href="/leads" class="card p-6 block group">
      <h3 class="font-bold text-white mb-2 group-hover:text-brand-cyan"><i class="fas fa-inbox text-brand-pink mr-2"></i>Lead Inbox <span class="text-[9px] font-mono bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded ml-1">NEW</span></h3>
      <p class="text-gray-400 text-sm">Every lead from all 30 funnels, stored forever in Cloudflare D1. Pipeline statuses, filters, CSV export, and AI “who to call first” insights.</p>
    </a>
    <a href="/emails" class="card p-6 block group">
      <h3 class="font-bold text-white mb-2 group-hover:text-brand-cyan"><i class="fas fa-envelope-open-text text-brand-pink mr-2"></i>Email Vault</h3>
      <p class="text-gray-400 text-sm">Every nurture sequence, sponsor outreach touch, and follow-up email — fully written, one-click copy, compliance footers included.</p>
    </a>
    <a href="/compliance" class="card p-6 block group">
      <h3 class="font-bold text-white mb-2 group-hover:text-brand-cyan"><i class="fas fa-shield-halved text-brand-pink mr-2"></i>Compliance Vault</h3>
      <p class="text-gray-400 text-sm">Verbatim disclaimers, TCPA consent language, CROA docs checklist, prohibited-claims lists — the legal armor for every launch.</p>
    </a>
  </div>
</section>

<section id="live-templates" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-eye text-brand-cyan mr-2"></i>Live Funnel Templates</h2>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    ${[
      ['/t/event-landing', 'Event Registration Funnel', 'fa-ticket', 'Full landing page: hero, pain, big domino, speakers, social proof, 3-tier pricing, FAQ, final CTA'],
      ['/t/sponsor-deck', 'Sponsor Prospectus', 'fa-handshake', 'Web-version sponsor deck: audience data, tier tables, ROI calculator, booking CTA'],
      ['/t/tax-lead', 'Tax Resolution Lead Funnel', 'fa-scale-balanced', 'Circular 230 + FTC compliant: education-first, IRS programs explained, disclaimered'],
      ['/t/credit-service', 'Credit Repair Service Funnel', 'fa-chart-line', 'CROA-compliant B2C funnel: post-service billing, rights disclosures, honest FAQ'],
      ['/t/credit-saas', 'Credit Repair SaaS Funnel', 'fa-laptop-code', 'B2B software funnel: compliance-first positioning, post-CRC-settlement safe'],
      ['/t/real-estate', 'Real Estate Seller Lead Funnel', 'fa-house', 'Home value report lead magnet: data-driven positioning, TCPA consent, agent authority'],
      ['/t/fitness', 'Fitness Coaching Funnel', 'fa-dumbbell', 'Cohort enrollment funnel: 3-pillar mechanism, action guarantee, health disclaimers'],
      ['/t/coaching', 'High-Ticket Coaching Funnel', 'fa-chess-king', 'Application-only advisory funnel: 4-quarter roadmap, qualification criteria, strategy session'],
      ['/t/ecommerce', 'E-commerce Product Funnel', 'fa-cart-shopping', 'DTC sales page: comparison table, bundle offer stack, ice-test guarantee, FTC-safe'],
      ['/t/saas-trial', 'SaaS Free Trial Funnel', 'fa-bolt', 'No-credit-card trial funnel: 3-step onboarding story, 3-tier pricing, churn-safe FAQ'],
      ['/t/law-firm', 'Law Firm Case Review Funnel', 'fa-gavel', 'PI lead gen: contingency positioning, 24/7 CTA, bar-advertising disclaimers baked in'],
      ['/t/home-services', 'Home Services Estimate Funnel', 'fa-house-chimney', 'Free inspection funnel: no-pressure process, insurance-claim help, countdown offer'],
      ['/t/med-spa', 'Med Spa New Client Funnel', 'fa-spa', 'Discounted first-session offer: physician-directed authority, medical screening language'],
      ['/t/insurance', 'Insurance Quote Funnel', 'fa-shield-heart', 'Multi-carrier quote funnel: independent-agent positioning, TCPA consent, no-exam angle'],
      ['/t/agency', 'Marketing Agency Audit Funnel', 'fa-rocket', 'Growth audit funnel: 3-engine mechanism, performance guarantee, area exclusivity'],
      ['/t/restaurant', 'Restaurant VIP Table Funnel', 'fa-utensils', 'First-visit VIP offer: countdown, signature dishes, priority-seating list, table-ready texts'],
      ['/t/dental', 'Dental New Patient Funnel', 'fa-tooth', '$99 new-patient special: empathy-first copy, included-services stack, urgency triage select'],
      ['/t/auto-services', 'Auto Repair Inspection Funnel', 'fa-car', 'Intro inspection + oil change offer: photo-proof trust angle, warranty positioning, vehicle capture'],
      ['/t/salon', 'Salon New Guest Funnel', 'fa-scissors', 'First-visit discount + free treatment: redo promise, service selector, stylist matching'],
      ['/t/mortgage', 'Mortgage Pre-Approval Funnel', 'fa-house-chimney', '60-second rate check: soft-pull messaging, program stack, NMLS + Equal Housing compliance'],
      ['/t/chiropractic', 'Chiropractic New Patient Funnel', 'fa-user-doctor', '$49 exam + adjustment special: drug-free pain relief angle, condition chips, insurance-friendly FAQ'],
      ['/t/pet-care', 'Pet Care / Vet Funnel', 'fa-paw', 'Free first wellness exam + groom discount: fear-free positioning, multi-service chips, pet-parent trust'],
      ['/t/landscaping', 'Landscaping Design Funnel', 'fa-leaf', 'Free design consult + 3D rendering: xeriscape/curb-appeal angles, project gallery chips, seasonal urgency'],
      ['/t/cleaning', 'Cleaning Service Funnel', 'fa-broom', '$50-off first deep clean: background-checked teams, re-clean guarantee, recurring-plan upsell'],
      ['/t/childcare', 'Childcare Enrollment Funnel', 'fa-children', 'Free registration + first-week discount: licensed ratios, curriculum highlights, tour-booking CTA'],
      ['/t/tutoring', 'Tutoring Assessment Funnel', 'fa-graduation-cap', 'Free skills assessment + first session free: grade-gain proof, subject chips, parent-focused FAQ'],
      ['/t/accounting', 'CPA Tax Savings Funnel', 'fa-calculator', 'Free tax savings review: average-savings proof, niche positioning, year-round advisory upsell'],
      ['/t/photography', 'Photography Mini-Session Funnel', 'fa-camera-retro', '$149 mini session offer: portfolio-driven trust, specialty chips, limited-slots scarcity'],
      ['/t/wedding-venue', 'Wedding Venue Tour Funnel', 'fa-champagne-glasses', 'Champagne tour + date-hold: capacity/pricing transparency, style positioning, date-scarcity urgency'],
      ['/t/moving', 'Moving Company Quote Funnel', 'fa-truck-fast', 'Free in-home estimate + $100 off: binding-quote promise, damage-claim-rate proof, licensed & insured'],
    ].map(([href, title, icon, desc]) => `
    <a href="${href}" target="_blank" class="card p-5 block group">
      <h3 class="font-bold text-white text-sm mb-1 group-hover:text-brand-cyan"><i class="fas ${icon} text-brand-cyan mr-2"></i>${title} <i class="fas fa-arrow-up-right-from-square text-xs text-gray-600 ml-1"></i></h3>
      <p class="text-gray-500 text-xs">${desc}</p>
    </a>`).join('')}
  </div>
</section>

<section id="benchmarks" class="card p-6">
  <h2 class="text-xl font-bold text-white mb-4"><i class="fas fa-chart-bar text-brand-cyan mr-2"></i>2026 Conversion Benchmarks (encoded in every template)</h2>
  <div class="grid md:grid-cols-3 gap-6 text-sm">
    <div>
      <h3 class="font-semibold text-brand-cyan mb-2">Events</h3>
      <ul class="text-gray-400 space-y-1 text-xs">
        <li>Cold opt-in: 15–25% · Warm: 35–55%</li>
        <li>VIP upgrade OTO: 20–35%</li>
        <li>Order bump: 20–40%</li>
        <li>Replay purchase: 15–30%</li>
        <li>Sponsor cold email reply: 3–8%</li>
        <li>Sponsor call close: 20–35%</li>
      </ul>
    </div>
    <div>
      <h3 class="font-semibold text-emerald-400 mb-2">Tax</h3>
      <ul class="text-gray-400 space-y-1 text-xs">
        <li>Consult opt-in (warm): 35–55%</li>
        <li>Consult → engagement: 20–35%</li>
        <li>Prep pricing: $197–$10,000+ tiers</li>
        <li>Strategy funnel: $3K–$25K applications</li>
        <li>OIC acceptance (IRS): ~40–45% historical</li>
      </ul>
    </div>
    <div>
      <h3 class="font-semibold text-blue-400 mb-2">Credit Repair</h3>
      <ul class="text-gray-400 space-y-1 text-xs">
        <li>Consult → enrollment: 20–35%</li>
        <li>Monthly: $99–$250 · Flat: $1,000–$1,500</li>
        <li>SaaS trial → paid: 15–25%</li>
        <li>SaaS demo → close: 25–40%</li>
        <li>Affiliate lead → enrollment: 5–12%</li>
      </ul>
    </div>
  </div>
</section>
`)
