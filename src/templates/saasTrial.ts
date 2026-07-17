import { param, funnelHead, templateBadge } from './helpers'

export const saasTrialTemplate = (q: Record<string, string | undefined>) => {
  const productName = param(q, 'productName', 'PipelinePilot')
  const tagline = param(q, 'tagline', 'Stop Losing Deals in Spreadsheet Hell — Close 27% More With a CRM Your Team Will Actually Use')
  const audience = param(q, 'audience', 'sales teams of 2–50 who\'ve outgrown spreadsheets but hate bloated CRMs')
  const userCount = param(q, 'userCount', '8,400+')
  const starterPrice = param(q, 'starterPrice', '$29')
  const proPrice = param(q, 'proPrice', '$79')
  const teamPrice = param(q, 'teamPrice', '$149')
  const trialDays = param(q, 'trialDays', '14')

  return `${funnelHead(`${productName} — Free ${trialDays}-Day Trial`)}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center">
    <p class="inline-block bg-indigo-500/20 text-indigo-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-bolt mr-2"></i>Free ${trialDays}-day trial · No credit card required</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${tagline}</h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">${productName} is built for ${audience}. Set up in 10 minutes. Trusted by ${userCount} teams.</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="#pricing" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Start Free Trial →</a>
      <a href="#how" class="inline-block border-2 border-gray-600 hover:border-white text-white text-xl font-bold px-10 py-5 rounded-2xl"><i class="fas fa-play mr-2"></i>See How It Works</a>
    </div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-check text-indigo-400 mr-1"></i>No credit card · <i class="fas fa-check text-indigo-400 mx-1"></i>Full features · <i class="fas fa-check text-indigo-400 mx-1"></i>Cancel in 2 clicks</p>
  </div>
</header>

<!-- [2] PAIN -->
<section id="pain" class="py-16 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-10">Your Pipeline Is Leaking — and You Can\'t Even See Where</h2>
    <div class="grid md:grid-cols-2 gap-4 mb-10">
      ${[
        'Deals die silently because follow-ups live in someone\'s head',
        'Your "CRM" is a spreadsheet with 14 tabs nobody updates',
        'You tried a big-name CRM — your team abandoned it in 3 weeks',
        'Forecasting is a guess dressed up as a meeting',
        'New reps take months to ramp because nothing is documented',
      ].map(p => `<article class="bg-white rounded-xl p-5 border border-gray-200 flex gap-3"><i class="fas fa-xmark text-red-500 mt-1"></i><p class="text-gray-700">${p}</p></article>`).join('')}
    </div>
    <p class="text-center text-lg text-gray-600">CRMs fail for one reason: they\'re built for managers\' reports, not reps\' workflows. <strong>${productName} flips that.</strong></p>
  </div>
</section>

<!-- [3] HOW IT WORKS -->
<section id="how" class="py-16">
  <div class="max-w-5xl mx-auto px-4">
    <p class="text-center text-indigo-600 font-semibold uppercase tracking-wide mb-3">Live in 10 Minutes</p>
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-12">Three Steps From Chaos to Pipeline Clarity</h2>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['1. Import Everything', 'fa-file-import', 'One-click import from spreadsheets, Gmail/Outlook, or your old CRM. Contacts, deals, and history land pre-organized — no consultant required.'],
        ['2. Automate Follow-Up', 'fa-robot', 'Every deal gets a next step, automatically. Reps see exactly who to contact today. Nothing slips, because slipping is impossible by design.'],
        ['3. See the Truth', 'fa-chart-line', 'A forecast built from actual pipeline behavior, not vibes. Spot stuck deals, coaching gaps, and your real close rate in one dashboard.'],
      ].map(([t, i, d]) => `
      <article class="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
        <i class="fas ${i} text-3xl text-indigo-600 mb-4"></i>
        <h3 class="font-bold text-lg mb-2">${t}</h3>
        <p class="text-gray-600 text-sm">${d}</p>
      </article>`).join('')}
    </div>
    <div class="mt-10 grid md:grid-cols-4 gap-4 text-center">
      ${[
        ['10 min', 'average setup time'],
        ['27%', 'avg. close-rate lift reported*'],
        ['92%', 'weekly active usage rate*'],
        ['4.7★', 'average customer rating*'],
      ].map(([n, l]) => `<div class="bg-indigo-50 rounded-2xl p-5 border border-indigo-100"><p class="text-3xl font-extrabold text-indigo-700">${n}</p><p class="text-xs text-gray-500 mt-1">${l}</p></div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] SOCIAL PROOF -->
<section id="proof" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Teams That Switched — and Stayed</h2>
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      ${[
        ['Jordan M. · VP Sales, 12-rep team', 'We abandoned two CRMs before this. The difference: my reps actually open it every morning without being told. Usage solved everything else.'],
        ['Lena K. · Founder, agency', 'Follow-up automation recovered 4 deals in our first month that would have died in the spreadsheet. That alone is 20x the subscription.'],
        ['Sam R. · Sales Ops', 'Migration from our old CRM took an afternoon, not the quarter the consultants quoted. Forecast accuracy went from fiction to ±8%.'],
      ].map(([n, t]) => `
      <article class="bg-white rounded-2xl p-6 border border-gray-200">
        <div class="text-orange-400 mb-3">${'<i class="fas fa-star"></i>'.repeat(5)}</div>
        <p class="text-gray-700 text-sm mb-4">"${t}"</p>
        <p class="font-semibold text-sm">${n}</p>
      </article>`).join('')}
    </div>
    <p class="text-xs text-gray-500 text-center max-w-2xl mx-auto">*Example metrics and testimonials for template purposes — replace with your own verified product data and customer quotes before publishing.</p>
  </div>
</section>

<!-- [5] PRICING -->
<section id="pricing" class="py-16">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-3">Simple Pricing. Every Plan Starts Free.</h2>
    <p class="text-center text-gray-600 mb-10">${trialDays} days, full features, no credit card. Pick a plan only when it\'s already working.</p>
    <div class="grid md:grid-cols-3 gap-6 items-start">
      <article class="rounded-3xl border border-gray-200 p-8">
        <h3 class="font-bold text-xl mb-1">Starter</h3>
        <p class="text-4xl font-extrabold mb-4">${starterPrice}<span class="text-base text-gray-500 font-normal"> /user/mo</span></p>
        <ul class="text-sm text-gray-600 space-y-2 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Unlimited contacts &amp; deals</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Pipeline board + next-step automation</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Email sync (Gmail/Outlook)</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Mobile app</li>
        </ul>
        <a href="#" class="block text-center border-2 border-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-900 hover:text-white">Start Free →</a>
      </article>
      <article class="rounded-3xl border-4 border-orange-500 p-8 relative shadow-xl">
        <span class="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full">MOST POPULAR</span>
        <h3 class="font-bold text-xl mb-1">Pro</h3>
        <p class="text-4xl font-extrabold mb-4">${proPrice}<span class="text-base text-gray-500 font-normal"> /user/mo</span></p>
        <ul class="text-sm text-gray-600 space-y-2 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Everything in Starter, plus:</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Sequences &amp; multi-step automation</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Forecasting + stuck-deal alerts</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Reporting dashboard + goals</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>2,000+ integrations via API/Zapier</li>
        </ul>
        <a href="#" class="pulse-glow block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl">Start Free →</a>
      </article>
      <article class="rounded-3xl border border-gray-200 p-8">
        <h3 class="font-bold text-xl mb-1">Team</h3>
        <p class="text-4xl font-extrabold mb-4">${teamPrice}<span class="text-base text-gray-500 font-normal"> /user/mo</span></p>
        <ul class="text-sm text-gray-600 space-y-2 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Everything in Pro, plus:</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Roles, permissions &amp; territories</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Coaching insights + call scoring</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>SSO + audit logs</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Dedicated success manager</li>
        </ul>
        <a href="#" class="block text-center border-2 border-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-900 hover:text-white">Start Free →</a>
      </article>
    </div>
    <p class="text-center text-sm text-gray-500 mt-8"><i class="fas fa-tag text-emerald-500 mr-1"></i>Annual billing saves 20% · Cancel anytime, export everything, keep your data.</p>
  </div>
</section>

<!-- [6] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Fair Questions, Straight Answers</h2>
    <div class="space-y-3">
      ${[
        ['Do I need a credit card for the trial?', `No. ${trialDays} days, every feature unlocked, zero payment info. We want you convinced by the product, not trapped by a forgotten subscription.`],
        ['How painful is migration from my current CRM?', 'One-click importers for the major CRMs and spreadsheets. Most teams are fully migrated in under an afternoon — and support will do it WITH you on a call, free.'],
        ['What happens when the trial ends?', 'You pick a plan or you don\'t. If you don\'t, your data stays exportable for 90 days. No auto-charges, because we never took a card.'],
        ['Will my reps actually use it?', 'That\'s the entire design thesis: rep-first workflow, manager reports as a byproduct. Our weekly active usage rate is the metric we\'re proudest of.'],
        ['Is my data secure?', 'Encryption at rest and in transit, SOC 2-aligned controls, role-based permissions, and audit logs on Team plans. Your data is yours — export anytime.'],
        ['Can I cancel easily?', 'Two clicks in settings. No retention call, no "are you sure" gauntlet, no email to a hidden address.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [7] FINAL CTA -->
<section id="final-cta" class="py-20 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white text-center">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl md:text-5xl font-extrabold mb-6">Your Pipeline Has Leaks Right Now. Find Them in ${trialDays} Days — Free.</h2>
    <p class="text-gray-300 text-lg mb-8">${userCount} teams already did. Setup takes 10 minutes.</p>
    <a href="#pricing" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl mb-6">Start My Free Trial →</a>
    <p class="text-sm text-gray-400"><i class="fas fa-check mr-1"></i>No credit card · <i class="fas fa-check mx-1"></i>Full features · <i class="fas fa-check mx-1"></i>Cancel in 2 clicks</p>
  </div>
</section>

<footer class="bg-gray-950 text-gray-500 text-xs text-center py-8 px-4">
  <p class="mb-2">${productName} · Powered by RJ Business Solutions</p>
  <p class="max-w-2xl mx-auto">Example metrics, ratings, and testimonials are template placeholders — replace with your own verified product data before publishing.</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
</body>
</html>`
}
