import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const accountingTemplate = (q: Record<string, string | undefined>) => {
  const firm = param(q, 'firm', 'Summit CPA Advisors')
  const cpa = param(q, 'cpa', 'Daniel Ortiz, CPA')
  const city = param(q, 'city', 'Albuquerque')
  const niche = param(q, 'niche', 'small business owners & contractors')
  const offer = param(q, 'offer', 'Free Tax Savings Review')
  const avgSavings = param(q, 'avgSavings', '$11,400')
  const clientCount = param(q, 'clientCount', '650+')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${firm} — ${offer} for ${city} Business Owners`, q, { desc: `${firm}: proactive accounting for ${niche} in ${city}. ${offer} — clients find an average of ${avgSavings}/yr in missed deductions and entity savings. ${clientCount} businesses served.`, type: 'AccountingService' })}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="relative bg-gradient-to-br from-gray-950 via-slate-900 to-emerald-950 text-white overflow-hidden">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center relative z-10">
    <p class="inline-block bg-emerald-500/20 text-emerald-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-calculator mr-2"></i>${city} \u00b7 Built for ${niche} \u00b7 ${clientCount} businesses</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${offer}: Find What Your Tax Pro Missed <span class="text-emerald-300 text-3xl md:text-4xl">\u2014 avg. ${avgSavings}/yr recovered</span></h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Most business owners overpay taxes \u2014 not because they cheat themselves, but because their preparer only files history instead of planning the future. ${cpa} reviews your last return free and shows you the money.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8 glass-dark">
      <p class="text-sm text-gray-400 mb-1">Free review slots this quarter close in:</p>
      <p class="text-3xl font-bold text-emerald-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div><a href="#review" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Get My Free Review \u2192</a></div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-lock text-emerald-400 mr-1"></i>Confidential \u00b7 No obligation \u00b7 Licensed CPA firm</p>
  </div>
</header>

<!-- [2] MECHANISM -->
<section id="mechanism" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-3">Filing Is Not Planning</h2>
    <p class="text-center text-gray-600 mb-10 max-w-2xl mx-auto">A tax return records what already happened. Tax planning changes what happens next. That gap is where your money leaks.</p>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['fa-magnifying-glass-dollar', 'The 40-Point Return Review', 'We re-examine your last return against 40 commonly missed strategies \u2014 entity structure, retirement stacking, home office, vehicle, family payroll, and more.'],
        ['fa-sitemap', 'Entity & Comp Optimization', 'S-corp vs. LLC vs. sole prop isn\u2019t academic \u2014 the wrong structure quietly costs owners five figures a year in self-employment tax alone.'],
        ['fa-calendar-days', 'Year-Round, Not April-Only', 'Quarterly planning sessions, proactive estimates, and a CPA who answers in hours \u2014 so December decisions don\u2019t become April regrets.'],
      ].map(([icon, title, body]) => `
      <article class="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-4"><i class="fas ${icon}"></i></div>
        <h3 class="font-bold text-lg mb-2">${title}</h3>
        <p class="text-gray-600 text-sm">${body}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [3] SERVICES -->
<section id="services" class="py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-extrabold mb-6">One Firm, Whole Financial Back Office</h2>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">Stop stitching together a bookkeeper, a payroll service, and a tax guy who\u2019ve never spoken to each other.</p>
    <div class="grid md:grid-cols-4 gap-4 text-sm">
      ${['Tax planning & preparation', 'Monthly bookkeeping', 'Payroll & contractor 1099s', 'CFO-level advisory'].map(x => `<div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 font-semibold text-emerald-900"><i class="fas fa-check text-emerald-600 mr-1"></i>${x}</div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Owner Questions</h2>
    <div class="space-y-3">
      ${[
        ['What do I need for the free review?', 'Just your most recent business and personal returns. Upload them securely after booking \u2014 the debrief call takes 30 minutes and you keep the findings either way.'],
        ['Is the average savings number realistic?', `${avgSavings} is the average first-year finding across new clients \u2014 some find less, some find multiples of it. Entity restructuring and retirement stacking drive most of it. Your number depends on your facts, which is exactly what the review determines.`],
        ['I already have a bookkeeper. Do I have to switch?', 'No. Plenty of clients keep their bookkeeper and use us for planning and filing only. If your books need rescue work, we\u2019ll tell you honestly.'],
        ['What does year-round service cost?', 'Flat monthly packages \u2014 no hourly meters, no surprise invoices for a phone call. Exact pricing comes with your review debrief, sized to your business.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [5] REVIEW FORM -->
<section id="review" class="py-20 bg-gradient-to-br from-gray-950 via-slate-900 to-emerald-950 text-white">
  <div class="max-w-xl mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Book Your Free Tax Savings Review</h2>
    <p class="text-gray-300 mb-8">30 minutes with ${cpa}. Worst case: confirmation you\u2019re optimized. Best case: five figures back.</p>
    <form data-lead-form class="bg-white/10 glass-dark rounded-2xl p-6 space-y-4 text-left">
      <input name="name" required placeholder="Full name" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="phone" type="tel" required placeholder="Mobile phone" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="email" type="email" required placeholder="Email address" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <div class="grid grid-cols-2 gap-3">
        <select name="bizType" class="bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
          <option value="">Business type</option>
          <option>Sole prop / 1099</option>
          <option>LLC</option>
          <option>S-corp</option>
          <option>C-corp / partnership</option>
        </select>
        <select name="revenue" class="bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
          <option value="">Annual revenue</option>
          <option>Under $100K</option>
          <option>$100K\u2013$500K</option>
          <option>$500K\u2013$2M</option>
          <option>$2M+</option>
        </select>
      </div>
      <label class="flex items-start gap-2 text-xs text-gray-300"><input type="checkbox" name="smsConsent" class="mt-0.5">I agree to receive automated texts about my review scheduling. Msg rates may apply. Reply STOP to opt out.</label>
      <button type="submit" class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Claim My Free Review \u2192</button>
    </form>
    <p class="mt-6 text-gray-500 text-xs">Savings figures are historical averages, not guarantees; results depend on individual circumstances. Not tax advice until engaged in writing.</p>
  </div>
</section>

<footer class="bg-gray-950 text-gray-400 text-center py-10 text-sm">
  <p class="font-bold text-white mb-1">${firm} \u00b7 ${cpa}</p>
  <p>${city} \u00b7 Licensed CPA firm \u00b7 Free review for business owners; one per business.</p>
</footer>
${templateBadge}
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
<script src="/static/app.js"></script>
</body></html>`
}
