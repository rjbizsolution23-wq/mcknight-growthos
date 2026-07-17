import { param, funnelHead, templateBadge } from './helpers'

export const creditSaasTemplate = (q: Record<string, string | undefined>) => {
  const productName = param(q, 'productName', 'DisputeForge')
  const tagline = param(q, 'tagline', 'The Credit Repair Software Built to Keep Your Business Compliant — and Growing')
  const starterPrice = param(q, 'starterPrice', '$97')
  const growthPrice = param(q, 'growthPrice', '$197')
  const scalePrice = param(q, 'scalePrice', '$397')

  return `${funnelHead(`${productName} — Compliance-First Credit Repair Software`)}
<body class="bg-white text-gray-900">

<!-- HERO -->
<header id="hero" class="bg-gray-950 text-white">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center">
    <p class="inline-block bg-blue-500/20 text-blue-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-shield-halved mr-2"></i>CROA-Compliant by Design · TSR-Ready Workflows</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${tagline}</h1>
    <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">CROA-compliant billing workflows. TSR-ready client management. Built for operators who want to stay in business long-term.</p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="#pricing" class="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl">Start Free Trial →</a>
      <a href="#features" class="border border-gray-600 hover:border-blue-400 text-white font-bold px-8 py-4 rounded-xl">Book a Demo →</a>
    </div>
  </div>
</header>

<!-- WHY COMPLIANCE-FIRST -->
<section id="why" class="py-16 bg-blue-50">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-extrabold mb-4">Why "Compliance-First" Isn't Marketing Fluff</h2>
    <p class="text-gray-700 mb-6 max-w-2xl mx-auto">In August 2024, the CFPB reached a $2M settlement with the industry's biggest software platform — for enabling its users to collect illegal upfront fees. The platform was held liable. The CEO paid personally.</p>
    <p class="text-gray-900 font-semibold text-lg">We built ${productName} so that the compliant way is the default way. Your business — and ours — depends on it.</p>
  </div>
</section>

<!-- FEATURES -->
<section id="features" class="py-16">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Every Feature, Tied to Compliance + Growth</h2>
    <div class="grid md:grid-cols-3 gap-5">
      ${[
        ['fa-file-shield', 'Dispute Management', 'Automated dispute round tracking with FCRA-aligned letter generation — never miss a 30-day bureau deadline.'],
        ['fa-credit-card', 'Post-Service Billing', 'Collect after each completed cycle, not before. CROA-compliant by design — billing literally cannot fire before work is logged complete.'],
        ['fa-window-restore', 'Client Portal', 'Give clients 24/7 visibility into dispute progress. Transparency builds trust — and trust builds retention.'],
        ['fa-file-contract', 'Compliance Documents', 'Auto-generate CROA-required disclosures: Consumer Rights Statement, Written Contract, Notice of Cancellation — compliant by default.'],
        ['fa-address-book', 'CRM + Lead Management', 'Manage leads, track conversions, automate follow-up — form-first flows that keep you outside TSR telemarketing triggers.'],
        ['fa-chart-pie', 'Reporting + Analytics', 'Disputes sent, responses received, items removed, client outcomes — the data your clients want to see.'],
        ['fa-map-location-dot', 'State Compliance Alerts', 'Get notified of state CSO law requirements in every state your clients reside — compliant everywhere you operate.'],
        ['fa-graduation-cap', 'Built-In Compliance Training', 'Every user completes CROA/TSR training before billing features unlock. Protects your clients — and you.'],
        ['fa-code', 'API + White Label (Scale tier)', 'Run your agency brand on our compliance engine. API access for custom integrations.'],
      ].map(([i, t, d]) => `
      <article class="border border-gray-200 rounded-2xl p-6 hover:border-blue-400 transition-colors">
        <i class="fas ${i} text-2xl text-blue-600 mb-3"></i>
        <h3 class="font-bold mb-2">${t}</h3>
        <p class="text-gray-600 text-sm">${d}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- SOCIAL PROOF -->
<section id="proof" class="py-16 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Operators Running On ${productName}</h2>
    <div class="grid md:grid-cols-2 gap-6 mb-4">
      <article class="bg-white rounded-2xl p-6 border border-gray-200">
        <p class="text-gray-700 mb-4">"I manage 140 active clients on the platform. The post-service billing automation means I never have to think about whether an invoice is CROA-safe — it just is."</p>
        <p class="font-semibold text-sm">Agency operator, Texas</p>
      </article>
      <article class="bg-white rounded-2xl p-6 border border-gray-200">
        <p class="text-gray-700 mb-4">"The state CSO alerts alone saved me — I had clients in two states I didn't realize required bonding. Caught it before it became a problem."</p>
        <p class="font-semibold text-sm">Solo operator, Georgia</p>
      </article>
    </div>
    <p class="text-xs text-gray-500 text-center">Template testimonials — replace with real, permissioned user statements. Results from operating a credit repair business depend on individual factors including compliance, marketing, and client outcomes.</p>
  </div>
</section>

<!-- PRICING -->
<section id="pricing" class="py-16">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Simple Pricing. Serious Infrastructure.</h2>
    <div class="grid md:grid-cols-3 gap-6 items-start">
      <article class="rounded-3xl border border-gray-200 p-8">
        <h3 class="font-bold text-xl mb-1">Starter</h3>
        <p class="text-4xl font-extrabold mb-4">${starterPrice}<span class="text-base text-gray-500 font-normal">/mo</span></p>
        <ul class="text-sm text-gray-600 space-y-2 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Up to 25 active clients</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Dispute management + letters</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Client portal + CROA doc generation</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Compliance training included</li>
        </ul>
        <a href="#" class="block text-center border-2 border-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-900 hover:text-white">Start Free Trial →</a>
      </article>
      <article class="rounded-3xl border-4 border-blue-600 p-8 relative shadow-xl">
        <span class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full">MOST POPULAR</span>
        <h3 class="font-bold text-xl mb-1">Growth</h3>
        <p class="text-4xl font-extrabold mb-4">${growthPrice}<span class="text-base text-gray-500 font-normal">/mo</span></p>
        <ul class="text-sm text-gray-600 space-y-2 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Up to 100 active clients</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Everything in Starter</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Post-service billing automation</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>State CSO compliance alerts</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Priority support</li>
        </ul>
        <a href="#" class="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl">Start Free Trial →</a>
      </article>
      <article class="rounded-3xl border border-gray-200 p-8">
        <h3 class="font-bold text-xl mb-1">Scale</h3>
        <p class="text-4xl font-extrabold mb-4">${scalePrice}<span class="text-base text-gray-500 font-normal">/mo</span></p>
        <ul class="text-sm text-gray-600 space-y-2 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Unlimited clients</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Everything in Growth</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>White label + API access</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Team seats + role permissions</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Dedicated success manager</li>
        </ul>
        <a href="#" class="block text-center border-2 border-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-900 hover:text-white">Book a Demo →</a>
      </article>
    </div>
  </div>
</section>

<!-- FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Operator Questions, Answered</h2>
    <div class="space-y-3">
      ${[
        ['Can I charge my clients upfront with this software?', 'No — and that\'s by design. CROA prohibits charging before services are fully performed, and the TSR is even stricter for telemarketing-sourced clients. Our billing engine only fires after work cycles are logged complete. That protects your clients, your business, and your license to operate.'],
        ['What happens during onboarding?', 'You\'ll complete our CROA/TSR compliance training module before billing features unlock, agree to our Terms that prohibit illegal billing practices, and get our full compliance resource library. Then you\'re building.'],
        ['Do you provide the CROA legal documents?', 'We auto-generate the Consumer Rights Statement (verbatim §1679c), Written Contract framework (§1679d elements), and Notice of Cancellation forms. Your attorney should review them for your state before use — state CSO laws add requirements in ~26 states.'],
        ['Is there a free trial?', 'Yes — 14 days, full Starter features, no credit card required to start.'],
        ['Can I white-label it for my agency?', 'Scale tier includes white label + API. Your brand, our compliance engine.'],
        ['What if my clients are in multiple states?', 'The state compliance alert system flags registration, bonding, and disclosure requirements for every state where your clients reside. Multi-state operators need this — most platforms ignore it entirely.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center text-sm">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform ml-3"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section id="final-cta" class="py-16 bg-gray-950 text-white text-center">
  <div class="max-w-2xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Build a Credit Repair Business That's Still Standing in 5 Years</h2>
    <p class="text-gray-400 mb-8">The operators getting banned all have one thing in common: they treated compliance as an afterthought. Don't be them.</p>
    <a href="#pricing" class="inline-block bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold px-10 py-5 rounded-2xl">Start My Free Trial →</a>
  </div>
</section>

<footer class="bg-black text-gray-600 text-xs text-center py-8 px-4">
  <p class="mb-2">${productName} · A compliance-first platform template by RJ Business Solutions</p>
  <p class="max-w-2xl mx-auto">${productName} is software for credit repair professionals — it is not a credit repair organization and does not provide credit repair services to consumers. Operators are responsible for their own compliance with CROA, TSR, FCRA, and applicable state laws. This page is a template — attorney review required before launch.</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
</body>
</html>`
}
