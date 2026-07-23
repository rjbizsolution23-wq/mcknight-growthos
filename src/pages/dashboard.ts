import { shell } from './layout'

export const dashboardPage = () => shell('Growth Command Center', 'dashboard', `
<section id="hero-section" class="text-center py-10">
  <p class="inline-block bg-gray-800 text-brand-cyan text-xs font-mono px-3 py-1 rounded-full mb-4"><i class="fas fa-bolt mr-1"></i>McKNIGHT GROWTHOS PLATFORM v1.0 — 30 CONVERSION PLAYBOOKS · LEADFLOW CRM · WORKERS AI · 9 INTEGRATIONS · ENTERPRISE SECURITY · SOCIAL AI</p>
  <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4">Turn Attention Into <span class="grad-text">Automated Growth</span></h1>
  <p class="text-gray-400 max-w-2xl mx-auto text-lg">McKnight GrowthOS connects conversion-focused funnels, lead management, email and SMS follow-up, SEO intelligence, social content and performance analytics—so businesses can capture more opportunities and move the right leads forward.</p>
  <div class="flex items-center justify-center gap-3 mt-6 flex-wrap">
    <a href="/builder" class="grad-bg text-white font-bold px-6 py-3 rounded-xl hover:opacity-90"><i class="fas fa-bolt mr-2"></i>Launch My Growth System</a>
    <a href="#platform-suite" class="text-gray-300 border border-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-800">Explore the Platform</a>
  </div>
  <p class="text-xs text-gray-500 mt-4">Built for agencies, consultants, professional services, events and local businesses.</p>
</section>

<section id="platform-suite" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-2 text-center">One Growth System. <span class="gold-text">Every Lead Connected.</span></h2>
  <p class="text-gray-500 text-sm text-center max-w-2xl mx-auto mb-6">From the first click to the booked call — launch campaigns, capture leads, automate follow-up and measure what creates revenue.</p>
  <div class="grid grid-cols-2 md:grid-cols-5 gap-3 text-center text-xs">
    ${[
      ['fa-hammer', 'Funnel Studio', '/builder'],
      ['fa-inbox', 'LeadFlow CRM', '/leads'],
      ['fa-envelope', 'Campaign Vault', '/emails'],
      ['fa-handshake', 'Sponsor Engine', '/events'],
      ['fa-brain', 'Conversion Intelligence', '/leads'],
      ['fa-shield-halved', 'Compliance Guard', '/compliance'],
      ['fa-magnifying-glass-chart', 'SEO Intelligence', '/seo'],
      ['fa-share-nodes', 'Social AI Studio', '/builder'],
      ['fa-plug', 'Integration Hub', '/integrations'],
      ['fa-chart-line', 'Growth Analytics', '/leads'],
    ].map(([icon, label, href]) => `
    <a href="${href}" class="card p-4 block group">
      <i class="fas ${icon} text-brand-cyan text-lg mb-2 block group-hover:text-mk-gold"></i>
      <span class="text-gray-300 font-semibold">${label}</span>
    </a>`).join('')}
  </div>
</section>

<section id="ecosystem-banner" class="mb-12">
  <div class="bg-gradient-to-r from-[#0d1b30] via-[#101f38] to-[#0d1b30] border border-mk-gold/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
    <div class="flex-1">
      <p class="text-[10px] uppercase tracking-wider font-bold text-mk-gold mb-2"><i class="fas fa-sitemap mr-1"></i> New — McKnight Opportunity Group Portfolio</p>
      <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2">The McKnight Ecosystem: <span class="grad-text">10 Brands, One Data Engine</span></h2>
      <p class="text-gray-400 text-sm max-w-2xl">Contracting, housing, capital readiness, freight, fleet repair, early learning and two SaaS products — each its own entity, all powered by the Business Readiness Passport + Evidence Vault. See every brand funnel in one place.</p>
    </div>
    <div class="flex flex-col gap-3 shrink-0">
      <a href="/ecosystem" class="gold-bg text-black font-bold px-6 py-3 rounded-xl text-sm text-center hover:opacity-90 transition"><i class="fas fa-layer-group mr-2"></i>View All Brands</a>
      <a href="/passport" class="border border-mk-gold/50 text-mk-goldLight font-semibold px-6 py-3 rounded-xl text-sm text-center hover:bg-mk-gold/10 transition"><i class="fas fa-passport mr-2"></i>Readiness Passport</a>
    </div>
  </div>
</section>

<section id="vertical-cards" class="grid md:grid-cols-3 gap-6 mb-12">
  <a href="/events" class="card p-6 block group">
    <div class="grad-bg w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl mb-4"><i class="fas fa-ticket"></i></div>
    <h2 class="text-xl font-bold text-white mb-2 group-hover:text-brand-cyan">McKnight Event Growth</h2>
    <p class="text-gray-400 text-sm mb-1">Fill the room. Fund the experience. Grow the impact.</p>
    <p class="text-gray-500 text-xs mb-4">Event registration engine, ticket sales funnels, sponsor prospectus builder, outreach sequences, VIP upgrades, pre/post-event nurture.</p>
    <ul class="text-xs text-gray-500 space-y-1">
      <li><i class="fas fa-check text-brand-success mr-1"></i>Event registration funnel template (live)</li>
      <li><i class="fas fa-check text-brand-success mr-1"></i>Sponsor prospectus template (live)</li>
      <li><i class="fas fa-check text-brand-success mr-1"></i>6-touch sponsor outreach sequence</li>
      <li><i class="fas fa-check text-brand-success mr-1"></i>Pre-event nurture emails + SMS</li>
    </ul>
  </a>
  <a href="/tax" class="card p-6 block group">
    <div class="bg-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl mb-4"><i class="fas fa-scale-balanced"></i></div>
    <h2 class="text-xl font-bold text-white mb-2 group-hover:text-brand-cyan">McKnight Tax Growth</h2>
    <p class="text-gray-400 text-sm mb-1">Turn tax-season attention into year-round client growth.</p>
    <p class="text-gray-500 text-xs mb-4">Compliance-aware for IRS Circular 230, FTC Act, TSR, GLBA and TCPA — informed by the lessons of the $77.7M FTC v. American Tax Service case. Requires professional review before deployment.</p>
    <ul class="text-xs text-gray-500 space-y-1">
      <li><i class="fas fa-check text-brand-success mr-1"></i>Tax resolution lead funnel (live)</li>
      <li><i class="fas fa-check text-brand-success mr-1"></i>Compliance-aware headline + CTA formulas</li>
      <li><i class="fas fa-check text-brand-success mr-1"></i>7-email nurture sequence</li>
      <li><i class="fas fa-check text-brand-success mr-1"></i>Full disclaimer library</li>
    </ul>
  </a>
  <a href="/credit" class="card p-6 block group">
    <div class="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl mb-4"><i class="fas fa-chart-line"></i></div>
    <h2 class="text-xl font-bold text-white mb-2 group-hover:text-brand-cyan">McKnight Credit Growth</h2>
    <p class="text-gray-400 text-sm mb-1">Build trust. Capture demand. Move qualified clients forward.</p>
    <p class="text-gray-500 text-xs mb-4">CROA, FCRA, TSR and CFPB-aware content controls. Service, SaaS, education and affiliate funnels — built with compliance controls, post-Credit Repair Cloud settlement.</p>
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
      <h3 class="font-bold text-white mb-2 group-hover:text-brand-cyan"><i class="fas fa-wand-magic-sparkles text-brand-pink mr-2"></i>Funnel Studio</h3>
      <p class="text-gray-400 text-sm">Fill in your event, firm, or offer details — get a fully customized live funnel page with a shareable URL. Zero placeholders. AI copy fill included.</p>
    </a>
    <a href="/leads" class="card p-6 block group">
      <h3 class="font-bold text-white mb-2 group-hover:text-brand-cyan"><i class="fas fa-inbox text-brand-pink mr-2"></i>LeadFlow CRM</h3>
      <p class="text-gray-400 text-sm">Every lead from all 30 playbooks, stored permanently in Cloudflare D1. Pipeline statuses, filters, CSV export, and Conversion Intelligence “who to call first” insights.</p>
    </a>
    <a href="/emails" class="card p-6 block group">
      <h3 class="font-bold text-white mb-2 group-hover:text-brand-cyan"><i class="fas fa-envelope-open-text text-brand-pink mr-2"></i>Campaign Vault</h3>
      <p class="text-gray-400 text-sm">Every nurture sequence, sponsor outreach touch, and follow-up email — fully written, one-click copy, configurable disclosure footers included.</p>
    </a>
    <a href="/compliance" class="card p-6 block group">
      <h3 class="font-bold text-white mb-2 group-hover:text-brand-cyan"><i class="fas fa-shield-halved text-brand-pink mr-2"></i>Compliance Guard</h3>
      <p class="text-gray-400 text-sm">Configurable disclosure language, TCPA consent templates, CROA docs checklist, prohibited-claims lists — designed to support compliant implementation. Not legal advice.</p>
    </a>
  </div>
</section>

<section id="live-templates" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-2"><i class="fas fa-eye text-brand-cyan mr-2"></i>Conversion Playbooks <span class="text-sm font-normal text-gray-500">— 30 live, parameterized</span></h2>
  <p class="text-gray-500 text-xs mb-6">McKnight Local Growth: proven growth systems for businesses that run locally and think bigger — plus Event, Tax and Credit Growth suites.</p>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    ${[
      ['/t/event-landing', 'Event Registration Funnel', 'fa-ticket', 'Full landing page: hero, pain, big domino, speakers, social proof, 3-tier pricing, FAQ, final CTA'],
      ['/t/sponsor-deck', 'Sponsor Prospectus', 'fa-handshake', 'Web-version sponsor deck: audience data, tier tables, ROI calculator, booking CTA'],
      ['/t/tax-lead', 'Tax Resolution Lead Funnel', 'fa-scale-balanced', 'Circular 230 + FTC compliance-aware: education-first, IRS programs explained, disclaimered'],
      ['/t/credit-service', 'Credit Repair Service Funnel', 'fa-chart-line', 'CROA-aware B2C funnel: post-service billing, rights disclosures, honest FAQ'],
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
  <h2 class="text-xl font-bold text-white mb-1"><i class="fas fa-chart-bar text-brand-cyan mr-2"></i>Growth Intelligence — Planning Assumptions</h2>
  <p class="text-[11px] text-gray-500 mb-4">These figures are planning assumptions for campaign modeling — not benchmarks, guarantees or expected results. Actual performance varies by offer, market, traffic source and execution. Validate against your own measured data.</p>
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
