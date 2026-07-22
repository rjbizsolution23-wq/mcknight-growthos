import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const cleaningTemplate = (q: Record<string, string | undefined>) => {
  const company = param(q, 'company', 'Spotless Pro Cleaning')
  const city = param(q, 'city', 'Albuquerque')
  const service = param(q, 'service', 'home & office cleaning')
  const offer = param(q, 'offer', '$50 Off Your First Deep Clean')
  const cleansDone = param(q, 'cleansDone', '22,000+')
  const rating = param(q, 'rating', '4.9')
  const guarantee = param(q, 'guarantee', '24-hour re-clean guarantee')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${company} — ${offer} in ${city}`, q, { desc: `${company}: trusted ${service} in ${city}. ${offer} — vetted, insured cleaners with a ${guarantee}. ${rating}\u2605, ${cleansDone} cleans completed.`, type: 'HousekeepingService' })}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="relative bg-gradient-to-br from-gray-950 via-indigo-950 to-cyan-950 text-white overflow-hidden">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center relative z-10">
    <p class="inline-block bg-cyan-500/20 text-cyan-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-broom mr-2"></i>${city} \u00b7 ${cleansDone} cleans \u00b7 Background-checked pros</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${offer} <span class="text-cyan-300 text-3xl md:text-4xl">\u2014 book in 60 seconds</span></h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Come home to a house that smells like a fresh start. Vetted, insured, background-checked cleaners \u2014 backed by our ${guarantee}. ${rating}\u2605 from ${city} homes.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8 glass-dark">
      <p class="text-sm text-gray-400 mb-1">First-clean discount ends in:</p>
      <p class="text-3xl font-bold text-cyan-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div><a href="#quote" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Get My Instant Quote \u2192</a></div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-shield-halved text-cyan-400 mr-1"></i>Bonded & insured \u00b7 <i class="fas fa-rotate-left text-orange-400 ml-2 mr-1"></i>${guarantee}</p>
  </div>
</header>

<!-- [2] WHY -->
<section id="why" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-3">Why ${city} Trusts Us With Their Keys</h2>
    <p class="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Letting someone into your home is a trust decision. We built the whole company around earning it.</p>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['fa-user-shield', 'Vetted, Not Gig-Sourced', 'Every cleaner is a trained W-2 employee \u2014 background-checked, reference-verified, and drug-screened. No random app strangers.'],
        ['fa-list-check', 'The 50-Point Checklist', 'Every clean follows a published 50-point checklist, photographed on completion. You know exactly what "clean" means \u2014 every single time.'],
        ['fa-rotate-left', 'Re-Clean Guarantee', `Not thrilled with any spot? Tell us within 24 hours and we come back and re-clean it free. That\u2019s the ${guarantee}.`],
      ].map(([icon, title, body]) => `
      <article class="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center text-2xl mb-4"><i class="fas ${icon}"></i></div>
        <h3 class="font-bold text-lg mb-2">${title}</h3>
        <p class="text-gray-600 text-sm">${body}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [3] SERVICES -->
<section id="services" class="py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-extrabold mb-6">Pick Your Clean</h2>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">One-time, recurring, or move-day rescue \u2014 flat-rate pricing you see before you book.</p>
    <div class="grid md:grid-cols-4 gap-4 text-sm">
      ${['Standard recurring clean', 'Deep clean (first visit)', 'Move-in / move-out', 'Office & commercial'].map(x => `<div class="bg-cyan-50 border border-cyan-200 rounded-xl p-4 font-semibold text-cyan-900"><i class="fas fa-check text-cyan-600 mr-1"></i>${x}</div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Fair Questions, Straight Answers</h2>
    <div class="space-y-3">
      ${[
        ['Do I need to be home during the clean?', 'Totally your call. Most clients give us a door code or lockbox \u2014 every entry and exit is logged, and the same trusted team returns each visit.'],
        ['Do you bring supplies and equipment?', 'Yes \u2014 professional-grade, pet-safe, kid-safe products included. Prefer your own or fragrance-free? Just note it at booking.'],
        ['How does pricing work?', 'Flat-rate by home size and clean type \u2014 quoted instantly before you book. No hourly meters running, no upsells at the door.'],
        ['What if something gets damaged?', 'We\u2019re bonded and insured. In the rare event of damage, report it within 48 hours and we make it right \u2014 repair, replace, or reimburse.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [5] QUOTE FORM -->
<section id="quote" class="py-20 bg-gradient-to-br from-gray-950 via-indigo-950 to-cyan-950 text-white">
  <div class="max-w-xl mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Get Your Instant Quote \u2014 ${offer}</h2>
    <p class="text-gray-300 mb-8">60 seconds, no phone tag. We text your flat-rate price right back.</p>
    <form data-lead-form class="bg-white/10 glass-dark rounded-2xl p-6 space-y-4 text-left">
      <input name="name" required placeholder="Full name" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="phone" type="tel" required placeholder="Mobile phone" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="email" type="email" placeholder="Email address" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <div class="grid grid-cols-2 gap-3">
        <select name="homeSize" class="bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
          <option value="">Home size</option>
          <option>1\u20132 bed</option>
          <option>3 bed</option>
          <option>4 bed</option>
          <option>5+ bed / office</option>
        </select>
        <select name="cleanType" class="bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
          <option value="">Clean type</option>
          <option>Deep clean</option>
          <option>Recurring (weekly/biweekly)</option>
          <option>Move-in / move-out</option>
          <option>Office / commercial</option>
        </select>
      </div>
      <label class="flex items-start gap-2 text-xs text-gray-300"><input type="checkbox" name="smsConsent" class="mt-0.5">I agree to receive automated texts with my quote and booking details. Msg rates may apply. Reply STOP to opt out.</label>
      <button type="submit" class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Text Me My Quote \u2192</button>
    </form>
  </div>
</section>

<footer class="bg-gray-950 text-gray-400 text-center py-10 text-sm">
  <p class="font-bold text-white mb-1">${company}</p>
  <p>${city} \u00b7 ${service} \u00b7 Bonded & insured \u00b7 First-clean offer for new customers.</p>
</footer>
${templateBadge}
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
<script src="/static/app.js"></script>
</body></html>`
}
