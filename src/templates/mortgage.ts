import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const mortgageTemplate = (q: Record<string, string | undefined>) => {
  const loName = param(q, 'loName', 'Marcus Reed')
  const company = param(q, 'company', 'Summit Home Lending')
  const nmls = param(q, 'nmls', 'NMLS #123456')
  const city = param(q, 'city', 'Albuquerque')
  const rate = param(q, 'rate', '5.99%')
  const program = param(q, 'program', 'first-time buyer')
  const closedCount = param(q, 'closedCount', '1,400+')
  const avgDays = param(q, 'avgDays', '18')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${company} — Get Pre-Approved in ${city} | Rates from ${rate}`, q, { desc: `${company} (${nmls}): ${program} home loans in ${city} from ${rate} APR*. Free 60-second pre-qualification, ${closedCount} families funded, average ${avgDays}-day close.`, type: 'FinancialService' })}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="relative bg-gradient-to-br from-gray-950 via-blue-950 to-emerald-950 text-white overflow-hidden">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center relative z-10">
    <p class="inline-block bg-emerald-500/20 text-emerald-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-house-chimney mr-2"></i>${city} \u00b7 ${program} programs \u00b7 ${closedCount} families funded</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">Get Pre-Approved in 60 Seconds <span class="text-emerald-300 text-3xl md:text-4xl">\u2014 rates from ${rate} APR*</span></h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Stop guessing what you can afford. A real pre-approval letter puts you at the front of every offer \u2014 and ours closes in an average of ${avgDays} days.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8 glass-dark">
      <p class="text-sm text-gray-400 mb-1">Current rate lock window closes in:</p>
      <p class="text-3xl font-bold text-emerald-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div><a href="#prequal" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Check My Rate \u2014 Free \u2192</a></div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-lock text-emerald-400 mr-1"></i>Soft credit check \u00b7 No impact on your score \u00b7 <i class="fas fa-bolt text-orange-400 ml-2 mr-1"></i>${avgDays}-day average close</p>
  </div>
</header>

<!-- [2] TRUST -->
<section id="trust" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-3">Why Buyers in ${city} Choose ${loName}</h2>
    <p class="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Big-bank rates without big-bank runaround. One loan officer, one phone number, start to keys.</p>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['fa-bolt', 'Same-Day Pre-Approval', 'Apply in the morning, shop with a letter by the afternoon. Sellers take your offer seriously from day one.'],
        ['fa-layer-group', 'Every Program, One Place', 'Conventional, FHA, VA, USDA, jumbo, and down-payment assistance \u2014 we shop 40+ lenders so you don\u2019t have to.'],
        ['fa-phone', 'A Human Who Answers', `${loName} personally guides your file. Nights-and-weekends availability, because homes don\u2019t wait for business hours.`],
      ].map(([icon, title, body]) => `
      <article class="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-4"><i class="fas ${icon}"></i></div>
        <h3 class="font-bold text-lg mb-2">${title}</h3>
        <p class="text-gray-600 text-sm">${body}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [3] STATS -->
<section id="stats" class="py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-extrabold mb-10">The Numbers Behind the Name</h2>
    <div class="grid md:grid-cols-4 gap-4">
      ${[
        [closedCount, 'families funded'],
        [avgDays, 'day average close'],
        ['40+', 'lenders shopped'],
        ['$0', 'cost to get pre-approved'],
      ].map(([n, label]) => `<div class="bg-emerald-50 border border-emerald-200 rounded-xl p-6"><p class="text-3xl font-extrabold text-emerald-700">${n}</p><p class="text-sm font-semibold text-emerald-900 mt-1">${label}</p></div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Mortgage Questions, Straight Answers</h2>
    <div class="space-y-3">
      ${[
        ['Will checking my rate hurt my credit?', 'No. The 60-second pre-qualification uses a soft pull that never affects your score. A full credit pull only happens later, with your written consent.'],
        ['How much do I need for a down payment?', `Possibly less than you think \u2014 FHA starts at 3.5%, VA and USDA can be 0% down, and ${city} down-payment assistance programs may cover the rest.`],
        ['I\u2019m self-employed \u2014 can I still qualify?', 'Yes. Bank-statement and 1099 programs are built for business owners. Bring 12\u201324 months of statements and we\u2019ll find your fit.'],
        ['What if my credit isn\u2019t perfect?', 'We fund loans down to 580 FICO on some programs, and if you\u2019re not ready yet, you\u2019ll get a free action plan to get there \u2014 no charge, no obligation.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [5] PREQUAL FORM -->
<section id="prequal" class="py-20 bg-gradient-to-br from-gray-950 via-blue-950 to-emerald-950 text-white">
  <div class="max-w-xl mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Check Your Rate \u2014 60 Seconds, No Score Impact</h2>
    <p class="text-gray-300 mb-8">Answer a few questions and ${loName} will text you your real numbers \u2014 rate, payment, and buying power.</p>
    <form data-lead-form class="bg-white/10 glass-dark rounded-2xl p-6 space-y-4 text-left">
      <input name="name" required placeholder="Full name" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="phone" type="tel" required placeholder="Mobile phone" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="email" type="email" required placeholder="Email address" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <select name="goal" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
        <option value="">What\u2019s your goal?</option>
        <option>Buy my first home</option>
        <option>Buy my next home</option>
        <option>Refinance / lower my payment</option>
        <option>Cash-out for renovations or debt</option>
        <option>Investment property</option>
      </select>
      <select name="timeline" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
        <option value="">When are you looking to move?</option>
        <option>ASAP \u2014 I\u2019m actively shopping</option>
        <option>1\u20133 months</option>
        <option>3\u20136 months</option>
        <option>Just exploring my options</option>
      </select>
      <label class="flex items-start gap-2 text-xs text-gray-300"><input type="checkbox" name="smsConsent" class="mt-0.5">I agree to receive automated texts about my pre-qualification. Msg rates may apply. Reply STOP to opt out. Consent not required to obtain a loan.</label>
      <button type="submit" class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Get My Numbers \u2192</button>
    </form>
    <p class="mt-6 text-gray-500 text-xs leading-relaxed">*Rate shown is a sample APR for qualified borrowers and is subject to change. ${company}, ${nmls}. Equal Housing Lender. This is not a commitment to lend. All loans subject to credit approval.</p>
  </div>
</section>

<footer class="bg-gray-950 text-gray-400 text-center py-10 text-sm">
  <p class="font-bold text-white mb-1">${company} \u00b7 ${loName}</p>
  <p>${city} \u00b7 ${nmls} \u00b7 Equal Housing Lender \u00b7 Not a commitment to lend.</p>
</footer>
${templateBadge}
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
<script src="/static/app.js"></script>
</body></html>`
}
