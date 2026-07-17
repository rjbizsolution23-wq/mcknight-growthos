import { param, funnelHead, templateBadge } from './helpers'

export const insuranceTemplate = (q: Record<string, string | undefined>) => {
  const agencyName = param(q, 'agencyName', 'Jefferson Financial Group')
  const productLine = param(q, 'productLine', 'life insurance')
  const state = param(q, 'state', 'New Mexico')
  const familiesServed = param(q, 'familiesServed', '5,300+')
  const carrierCount = param(q, 'carrierCount', '40+')
  const startingPrice = param(q, 'startingPrice', '$23/mo')
  const phone = param(q, 'phone', '(505) 555-0166')

  return `${funnelHead(`${agencyName} — Free ${productLine} Quote`, q)}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="bg-gradient-to-br from-gray-950 via-gray-900 to-teal-950 text-white">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center">
    <p class="inline-block bg-teal-500/20 text-teal-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-shield-heart mr-2"></i>Licensed ${state} agency · ${carrierCount} carriers compared</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">Protect Your Family for Less Than Your Streaming Bills — Coverage From ${startingPrice}</h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Get a free ${productLine} quote comparison across ${carrierCount} top-rated carriers in about 5 minutes. Independent advice — we work for you, not one insurance company.</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="#quote" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Get My Free Quote →</a>
      <a href="tel:${phone.replace(/[^0-9+]/g, '')}" class="inline-block border-2 border-gray-600 hover:border-white text-white text-xl font-bold px-10 py-5 rounded-2xl"><i class="fas fa-phone mr-2"></i>${phone}</a>
    </div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-users text-teal-400 mr-1"></i><strong class="text-white">${familiesServed}</strong> families protected · No-exam options available · Quotes never affect your credit</p>
  </div>
</header>

<!-- [2] PAIN -->
<section id="pain" class="py-16 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-10">The Conversation Everyone Postpones — Until It\'s Too Late to Have</h2>
    <div class="grid md:grid-cols-2 gap-4 mb-10">
      ${[
        'If your income stopped tomorrow, your family\'s bills wouldn\'t',
        'You assume it\'s expensive — most people overestimate the cost by 3x',
        'The work policy you\'re counting on disappears the day you change jobs',
        'You started an application once... and the 40-page form won',
        'Every year you wait, the same coverage costs more — age is the price driver',
      ].map(p => `<article class="bg-white rounded-xl p-5 border border-gray-200 flex gap-3"><i class="fas fa-xmark text-red-500 mt-1"></i><p class="text-gray-700">${p}</p></article>`).join('')}
    </div>
    <p class="text-center text-lg text-gray-600">Here\'s the truth the industry hides in fine print: a healthy 35-year-old can often get meaningful term coverage for <strong>${startingPrice}</strong>.* The hard part was never the price — it was the process. We fixed the process.</p>
  </div>
</section>

<!-- [3] HOW IT WORKS -->
<section id="how" class="py-16">
  <div class="max-w-5xl mx-auto px-4">
    <p class="text-center text-teal-600 font-semibold uppercase tracking-wide mb-3">How It Works</p>
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-12">Five Minutes. ${carrierCount} Carriers. One Honest Answer.</h2>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['1. Tell Us About You', 'fa-clipboard-list', 'A 5-minute form — age, health basics, coverage goals. No credit check, no commitment, no spam-cannon to 50 call centers.'],
        ['2. We Shop the Market', 'fa-scale-unbalanced-flip', `A licensed advisor compares live rates across ${carrierCount} top-rated carriers and finds the ones that price YOUR profile best — smoker, diabetic, pilot, whatever your story is.`],
        ['3. You Choose (or Don\'t)', 'fa-circle-check', 'You get options in plain English: coverage, term, monthly cost. Apply in minutes — many policies approve without a medical exam. Or walk away. Zero pressure.'],
      ].map(([t, i, d]) => `
      <article class="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
        <i class="fas ${i} text-3xl text-teal-600 mb-4"></i>
        <h3 class="font-bold text-lg mb-2">${t}</h3>
        <p class="text-gray-600 text-sm">${d}</p>
      </article>`).join('')}
    </div>
    <div class="mt-10 grid md:grid-cols-4 gap-4 text-center">
      ${[
        [familiesServed, 'families protected'],
        [carrierCount, 'carriers compared'],
        ['No exam', 'options available'],
        ['$0', 'cost for our advice'],
      ].map(([n, l]) => `<div class="bg-teal-50 rounded-2xl p-5 border border-teal-100"><p class="text-3xl font-extrabold text-teal-700">${n}</p><p class="text-xs text-gray-500 mt-1">${l}</p></div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] SOCIAL PROOF -->
<section id="proof" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Families Who Stopped Postponing</h2>
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      ${[
        ['Carlos & Maria V. · Parents of 3', 'We put this off for six years because we thought it would be $300 a month. Our advisor found us $750K in coverage for less than we spend on coffee. Six years of worry, gone in one call.'],
        ['Tanya B. · Single mom', 'Type 2 diabetic — two websites quoted me insane rates. The advisor knew exactly which carriers are friendly to my profile and cut my quote nearly in half.'],
        ['Greg H. · Small business owner', 'They set up term for my family AND key-person coverage for my business in one sitting. Independent advice hits different — they showed me quotes I could verify myself.'],
      ].map(([n, t]) => `
      <article class="bg-white rounded-2xl p-6 border border-gray-200">
        <div class="text-orange-400 mb-3">${'<i class="fas fa-star"></i>'.repeat(5)}</div>
        <p class="text-gray-700 text-sm mb-4">"${t}"</p>
        <p class="font-semibold text-sm">${n}</p>
      </article>`).join('')}
    </div>
    <p class="text-xs text-gray-500 text-center max-w-2xl mx-auto">*Rates vary by age, health, coverage amount, and carrier underwriting; ${startingPrice} reflects an example healthy-applicant term rate and is not a guaranteed offer. Example testimonials are template placeholders — replace with your own verified, compliant client reviews before publishing.</p>
  </div>
</section>

<!-- [5] QUOTE FORM -->
<section id="quote" class="py-16">
  <div class="max-w-3xl mx-auto px-4">
    <div class="rounded-3xl border-4 border-orange-500 p-8 md:p-10 shadow-xl">
      <h2 class="text-3xl font-extrabold text-center mb-2">Get Your Free ${productLine.charAt(0).toUpperCase() + productLine.slice(1)} Quote</h2>
      <p class="text-center text-gray-600 mb-8">5 minutes · ${carrierCount} carriers compared · no credit impact · no obligation.</p>
      <form class="space-y-4" data-lead-form>
        <div class="grid md:grid-cols-2 gap-4">
          <input required placeholder="Full Name" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
          <input required type="tel" placeholder="Phone" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <input required type="email" placeholder="Email" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
          <input required placeholder="Date of Birth (MM/DD/YYYY)" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <select required class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-600">
            <option value="">Coverage Amount</option><option>$100,000</option><option>$250,000</option><option>$500,000</option><option>$1,000,000</option><option>Not sure — advise me</option>
          </select>
          <select required class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-600">
            <option value="">Tobacco Use?</option><option>Never</option><option>Quit 12+ months ago</option><option>Current</option>
          </select>
        </div>
        <label class="flex gap-3 text-xs text-gray-500 items-start">
          <input type="checkbox" required class="mt-0.5">
          <span>By submitting, I authorize ${agencyName} to contact me about insurance quotes at the number/email provided, including by call/text using automated technology. Consent is not a condition of purchase. Msg &amp; data rates may apply. Reply STOP to opt out. My information will not be sold to third-party lead buyers.</span>
        </label>
        <button class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Compare My Rates →</button>
      </form>
    </div>
  </div>
</section>

<!-- [6] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Honest Answers Before You Apply</h2>
    <div class="space-y-3">
      ${[
        ['How much coverage do I actually need?', 'A common starting framework is 10–12x your annual income, adjusted for debts, mortgage, and kids\' education. Your advisor will run the actual math with you — free — instead of guessing.'],
        ['Do I need a medical exam?', 'Often, no. Many carriers now offer no-exam policies at competitive rates for qualifying applicants. If an exam version saves you meaningful money, we\'ll show you both and let you choose.'],
        ['Why use an independent agency instead of going direct?', `A single carrier can only sell you their product at their price. We compare ${carrierCount} carriers and get paid roughly the same either way — so our only incentive is the right fit.`],
        ['What does your advice cost?', 'Nothing. We\'re compensated by the carrier you choose, at no markup to you — you pay the same premium as buying direct. Often less, because we know which carrier prices your profile best.'],
        ['I have a health condition. Can I still get covered?', 'Very likely yes. Carriers underwrite conditions differently — the exact condition that doubles your rate at one carrier is standard-rate at another. This is where independent shopping earns its keep.'],
        ['Will you spam me or sell my info?', 'No. Your information goes to one licensed advisor at our agency — not to a lead marketplace. One advisor, one conversation, your decision.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [7] FINAL CTA -->
<section id="final-cta" class="py-20 bg-gradient-to-br from-gray-950 via-gray-900 to-teal-950 text-white text-center">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl md:text-5xl font-extrabold mb-6">Every Birthday Raises the Price. Lock Yours In Today.</h2>
    <p class="text-gray-300 text-lg mb-8">5-minute quote · ${carrierCount} carriers · zero obligation · zero credit impact.</p>
    <a href="#quote" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl mb-6">Get My Free Quote →</a>
    <p class="text-sm text-gray-400"><i class="fas fa-phone mr-1"></i>Prefer a human? Call ${phone}</p>
  </div>
</section>

<footer class="bg-gray-950 text-gray-500 text-xs text-center py-8 px-4">
  <p class="mb-2">${agencyName} · Licensed insurance agency in ${state} · ${phone}</p>
  <p class="max-w-2xl mx-auto">Add your state license number(s) and licensed states list here before publishing. Rates shown are illustrative examples, not offers of coverage; final rates depend on carrier underwriting. Not affiliated with any government agency. Example reviews are template placeholders.</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
</body>
</html>`
}
