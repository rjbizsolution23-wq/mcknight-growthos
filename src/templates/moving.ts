import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const movingTemplate = (q: Record<string, string | undefined>) => {
  const company = param(q, 'company', 'Rock Steady Moving Co.')
  const city = param(q, 'city', 'Albuquerque')
  const service = param(q, 'service', 'local & long-distance moving')
  const offer = param(q, 'offer', 'Free In-Home Estimate + $100 Off Booking')
  const movesDone = param(q, 'movesDone', '9,800+')
  const rating = param(q, 'rating', '4.9')
  const claimRate = param(q, 'claimRate', '0.4%')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${company} — ${offer} in ${city}`, q, { desc: `${company}: licensed, insured ${service} in ${city}. ${offer}. ${movesDone} moves completed, ${rating}\u2605, damage claim rate just ${claimRate}.`, type: 'MovingCompany' })}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="relative bg-gradient-to-br from-gray-950 via-blue-950 to-slate-900 text-white overflow-hidden">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center relative z-10">
    <p class="inline-block bg-blue-500/20 text-blue-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-truck-fast mr-2"></i>${city} \u00b7 ${movesDone} moves \u00b7 Licensed & insured</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${offer} <span class="text-blue-300 text-3xl md:text-4xl">\u2014 binding quote, zero surprises</span></h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Moving is stressful enough without wondering if the quote doubles on move day. Our estimates are <strong>binding</strong> \u2014 the number we give is the number you pay. ${rating}\u2605 from ${city} families.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8 glass-dark">
      <p class="text-sm text-gray-400 mb-1">Booking discount ends in:</p>
      <p class="text-3xl font-bold text-blue-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div><a href="#quote" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Get My Free Estimate \u2192</a></div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-box-open text-blue-400 mr-1"></i>Damage claim rate: just ${claimRate} \u00b7 Full-value protection available</p>
  </div>
</header>

<!-- [2] WHY -->
<section id="why" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-3">The Anti-Horror-Story Moving Company</h2>
    <p class="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Every policy below exists because somebody else\u2019s mover did the opposite.</p>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['fa-file-signature', 'Binding Quotes, in Writing', 'Your in-home (or video) estimate becomes a binding contract price. No move-day "your stuff weighs more" ransom. Ever.'],
        ['fa-users', 'Our Crews, Not Day Labor', 'Uniformed, background-checked, trained employees \u2014 the same crew that loads is the crew that unloads. Tips never expected, always earned.'],
        ['fa-couch', 'Wrapped Like It\u2019s Ours', `Furniture blankets, floor runners, door jamb protectors on every job \u2014 that\u2019s why our claim rate is ${claimRate}, not the industry\u2019s 20%.`],
      ].map(([icon, title, body]) => `
      <article class="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl mb-4"><i class="fas ${icon}"></i></div>
        <h3 class="font-bold text-lg mb-2">${title}</h3>
        <p class="text-gray-600 text-sm">${body}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [3] SERVICES -->
<section id="services" class="py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-extrabold mb-6">Any Move, Handled</h2>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">From studio apartments to five-bedroom estates to the office over the weekend.</p>
    <div class="grid md:grid-cols-4 gap-4 text-sm">
      ${['Local home moves', 'Long-distance & interstate', 'Packing & unpacking', 'Office & commercial'].map(x => `<div class="bg-blue-50 border border-blue-200 rounded-xl p-4 font-semibold text-blue-900"><i class="fas fa-check text-blue-600 mr-1"></i>${x}</div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Moving Questions, Answered Straight</h2>
    <div class="space-y-3">
      ${[
        ['How does the binding estimate work?', 'We walk your home (in person or by video call), inventory everything, and hand you a written binding price. Add nothing, and that price cannot change on move day \u2014 it\u2019s in the contract.'],
        ['What does a typical move cost?', 'Local moves typically run $500\u2013$2,500 depending on size and access; long-distance is quoted by inventory and mileage. Your free estimate gives you the exact binding number.'],
        ['What if something does get damaged?', `Rare (${claimRate} claim rate), but if it happens: photo-document, report within 30 days, and we repair, replace, or pay out per your chosen protection level \u2014 full-value protection is available on every move.`],
        ['How far in advance should I book?', 'End-of-month and weekends fill 2\u20133 weeks out; mid-week dates often have same-week availability. The $100 booking discount locks in when you schedule your estimate.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [5] QUOTE FORM -->
<section id="quote" class="py-20 bg-gradient-to-br from-gray-950 via-blue-950 to-slate-900 text-white">
  <div class="max-w-xl mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Get Your Free Binding Estimate</h2>
    <p class="text-gray-300 mb-8">60 seconds now, one walkthrough later, zero surprises on move day. We\u2019ll text you to schedule.</p>
    <form data-lead-form class="bg-white/10 glass-dark rounded-2xl p-6 space-y-4 text-left">
      <input name="name" required placeholder="Full name" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="phone" type="tel" required placeholder="Mobile phone" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="email" type="email" placeholder="Email address" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <div class="grid grid-cols-2 gap-3">
        <select name="moveSize" class="bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
          <option value="">Move size</option>
          <option>Studio / 1 bed</option>
          <option>2\u20133 bed</option>
          <option>4+ bed</option>
          <option>Office / commercial</option>
        </select>
        <select name="moveDate" class="bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
          <option value="">Target date</option>
          <option>Within 2 weeks</option>
          <option>2\u20134 weeks</option>
          <option>1\u20132 months</option>
          <option>Just planning</option>
        </select>
      </div>
      <input name="route" placeholder="From \u2192 to (e.g. ABQ Westside \u2192 Rio Rancho)" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <label class="flex items-start gap-2 text-xs text-gray-300"><input type="checkbox" name="smsConsent" class="mt-0.5">I agree to receive automated texts about my estimate and move scheduling. Msg rates may apply. Reply STOP to opt out.</label>
      <button type="submit" class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Get My Estimate \u2192</button>
    </form>
  </div>
</section>

<footer class="bg-gray-950 text-gray-400 text-center py-10 text-sm">
  <p class="font-bold text-white mb-1">${company}</p>
  <p>${city} \u00b7 ${service} \u00b7 Licensed & insured \u00b7 Discount applies to new bookings only.</p>
</footer>
${templateBadge}
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
<script src="/static/app.js"></script>
</body></html>`
}
