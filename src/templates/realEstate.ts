import { param, funnelHead, templateBadge } from './helpers'

export const realEstateTemplate = (q: Record<string, string | undefined>) => {
  const agentName = param(q, 'agentName', 'Rick Jefferson')
  const brokerage = param(q, 'brokerage', 'Summit Realty Group')
  const city = param(q, 'city', 'Albuquerque')
  const homesSold = param(q, 'homesSold', '340+')
  const avgDays = param(q, 'avgDays', '11')
  const avgOver = param(q, 'avgOver', '4.2%')
  const phone = param(q, 'phone', '(505) 555-0177')

  return `${funnelHead(`Sell Your ${city} Home — ${agentName} | ${brokerage}`, q)}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center">
    <p class="inline-block bg-blue-500/20 text-blue-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-house mr-2"></i>${city} Home Sellers</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">Find Out What Your ${city} Home Is Really Worth — In the Next 24 Hours</h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Get a free, no-obligation home value report built from live ${city} market data — not a computer guess. Then decide if now is your moment to sell.</p>
    <a href="#value-form" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Get My Free Home Value Report →</a>
    <div class="mt-10 grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
      <div><p class="text-3xl font-extrabold text-blue-300">${homesSold}</p><p class="text-xs text-gray-400">Homes Sold</p></div>
      <div><p class="text-3xl font-extrabold text-blue-300">${avgDays}</p><p class="text-xs text-gray-400">Avg Days on Market*</p></div>
      <div><p class="text-3xl font-extrabold text-blue-300">${avgOver}</p><p class="text-xs text-gray-400">Avg Over List Price*</p></div>
    </div>
  </div>
</header>

<!-- [2] PAIN -->
<section id="pain" class="py-16 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-10">Selling a Home in ${city} Right Now Feels Like a Guessing Game</h2>
    <div class="grid md:grid-cols-2 gap-4 mb-10">
      ${[
        'Zillow says one number, your neighbor says another — nobody agrees on what your home is worth',
        'You\'re scared of listing too low and leaving $20K+ on the table',
        'You\'re equally scared of listing too high and sitting stale for 90 days',
        'Agents keep calling — but they all say whatever gets them the listing',
        'You don\'t know if you should sell now, wait, or renovate first',
      ].map(p => `<article class="bg-white rounded-xl p-5 border border-gray-200 flex gap-3"><i class="fas fa-xmark text-red-500 mt-1"></i><p class="text-gray-700">${p}</p></article>`).join('')}
    </div>
    <p class="text-center text-lg text-gray-600">The fix isn\'t another opinion. It\'s <strong>data</strong> — pulled from real ${city} closings in the last 90 days, adjusted for your exact street, condition, and timing.</p>
  </div>
</section>

<!-- [3] MECHANISM -->
<section id="how" class="py-16">
  <div class="max-w-5xl mx-auto px-4">
    <p class="text-center text-blue-600 font-semibold uppercase tracking-wide mb-3">How It Works</p>
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-12">From "What\'s It Worth?" to Sold — In 3 Steps</h2>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['1. Get Your Report', 'fa-file-invoice-dollar', `Fill out the 60-second form. Within 24 hours you get a human-built value report using live ${city} comps — not an algorithm guess.`],
        ['2. Strategy Call', 'fa-comments', 'A free 15-minute call to walk through the numbers: sell now vs. wait, what (if anything) to fix, and the pricing strategy that creates bidding pressure.'],
        ['3. List & Close', 'fa-house-circle-check', `If you decide to sell, our full marketing system goes live: pro photos, targeted ads, and the negotiation playbook behind our ${avgOver} average over list.*`],
      ].map(([t, i, d]) => `
      <article class="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
        <i class="fas ${i} text-3xl text-blue-600 mb-4"></i>
        <h3 class="font-bold text-lg mb-2">${t}</h3>
        <p class="text-gray-600 text-sm">${d}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [4] AGENT AUTHORITY -->
<section id="agent" class="py-16 bg-gray-950 text-white">
  <div class="max-w-4xl mx-auto px-4 md:flex items-center gap-10">
    <div class="md:w-1/3 mb-8 md:mb-0">
      <div class="aspect-square bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl flex items-center justify-center text-6xl font-extrabold">${agentName.split(' ').map(w=>w[0]).join('')}</div>
    </div>
    <div class="md:w-2/3">
      <p class="text-blue-400 font-semibold uppercase tracking-wide mb-2">Your Listing Agent</p>
      <h2 class="text-3xl font-extrabold mb-4">${agentName} · ${brokerage}</h2>
      <p class="text-gray-300 mb-4">${homesSold} homes sold in the ${city} metro. Average of ${avgDays} days on market against a citywide average that\'s often 3x longer.* Every listing gets the same institutional-grade marketing — no listing is "too small."</p>
      <p class="text-gray-400 text-sm">Licensed. Local. And blunt: if the data says you should wait, I\'ll tell you to wait.</p>
    </div>
  </div>
</section>

<!-- [5] SOCIAL PROOF -->
<section id="proof" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Recent ${city} Sellers, In Their Own Words</h2>
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      ${[
        ['Sandra M. · Northeast Heights', 'The value report said $38K more than Zillow. We listed at that price and closed $6K over it in 9 days. I almost sold myself short.'],
        ['James & Priya L. · Rio Rancho', 'We interviewed 3 agents. This was the only one who showed us actual comp data instead of flattery. Sold in 13 days, full ask.'],
        ['Robert C. · Downtown', 'I was going to spend $25K renovating first. The strategy call showed the ROI wasn\'t there. Sold as-is and kept the cash.'],
      ].map(([n, t]) => `
      <article class="bg-white rounded-2xl p-6 border border-gray-200">
        <div class="text-orange-400 mb-3">${'<i class="fas fa-star"></i>'.repeat(5)}</div>
        <p class="text-gray-700 text-sm mb-4">"${t}"</p>
        <p class="font-semibold text-sm">${n}</p>
      </article>`).join('')}
    </div>
    <p class="text-xs text-gray-500 text-center max-w-2xl mx-auto">*Statistics reflect this agent\'s past transactions and are not a guarantee of your sale price or timeline. Market conditions vary. Replace all example testimonials and stats with your own verified data before publishing.</p>
  </div>
</section>

<!-- [6] LEAD FORM (THE OFFER) -->
<section id="value-form" class="py-16">
  <div class="max-w-3xl mx-auto px-4">
    <div class="rounded-3xl border-4 border-orange-500 p-8 md:p-10 shadow-xl">
      <h2 class="text-3xl font-extrabold text-center mb-2">Get Your Free ${city} Home Value Report</h2>
      <p class="text-center text-gray-600 mb-8">Human-built from live comps. Delivered in 24 hours. Zero obligation to list.</p>
      <form class="space-y-4" data-lead-form>
        <div class="grid md:grid-cols-2 gap-4">
          <input required placeholder="Full Name" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
          <input required type="tel" placeholder="Phone" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
        </div>
        <input required type="email" placeholder="Email" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
        <input required placeholder="Property Address" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
        <select class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-600">
          <option>When are you thinking of selling?</option><option>ASAP</option><option>1–3 months</option><option>3–6 months</option><option>Just curious about value</option>
        </select>
        <label class="flex gap-3 text-xs text-gray-500 items-start">
          <input type="checkbox" required class="mt-0.5">
          <span>By submitting, I agree to receive calls/texts about my home value request from ${brokerage} at the number provided, including via automated technology. Consent is not a condition of purchase. Msg &amp; data rates may apply. Reply STOP to opt out.</span>
        </label>
        <button class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Send My Free Value Report →</button>
      </form>
    </div>
  </div>
</section>

<!-- [7] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Straight Answers for ${city} Sellers</h2>
    <div class="space-y-3">
      ${[
        ['Is the value report really free?', 'Yes — 100% free, no strings. It\'s how we start relationships. Most people who get one don\'t list immediately, and that\'s fine.'],
        ['How is this different from Zillow\'s estimate?', 'Zillow\'s algorithm has a published median error rate of several percent — that can be tens of thousands of dollars on your home. This report is built by a licensed local agent using actual recent closings on comparable properties.'],
        ['Am I obligated to list with you?', 'No. The report and strategy call are free with zero commitment. If we earn your listing, great. If not, you still walk away knowing your real number.'],
        ['What if I\'m months away from selling?', 'Perfect timing, actually. The strategy call will tell you exactly what to do (and NOT do) between now and listing day to maximize your price.'],
        ['Do you handle homes in my price range?', `Every listing gets the same marketing system — pro photography, targeted digital ads, and staging guidance — whether it\'s $150K or $1.5M in the ${city} metro.`],
        ['What does it cost to sell with you?', 'Commission is discussed transparently on the strategy call — no surprises, everything in writing before you sign anything.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [8] FINAL CTA -->
<section id="final-cta" class="py-20 bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white text-center">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl md:text-5xl font-extrabold mb-6">Your Home Has One Real Number. Find Out What It Is.</h2>
    <p class="text-gray-300 text-lg mb-8">Free report in 24 hours. Zero obligation. Data, not opinions.</p>
    <a href="#value-form" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl mb-6">Get My Free Home Value Report →</a>
    <p class="text-sm text-gray-400"><i class="fas fa-phone mr-1"></i>Prefer to talk? Call ${phone}</p>
  </div>
</section>

<footer class="bg-gray-950 text-gray-500 text-xs text-center py-8 px-4">
  <p class="mb-2">${agentName} · ${brokerage} · Serving the ${city} Metro · ${phone}</p>
  <p class="max-w-2xl mx-auto">Licensed real estate professional. Equal Housing Opportunity. Past performance statistics do not guarantee future results. This page is a template — replace all example stats, testimonials, and license info with your own verified data before publishing.</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
</body>
</html>`
}
