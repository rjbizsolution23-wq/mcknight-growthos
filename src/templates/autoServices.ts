import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const autoServicesTemplate = (q: Record<string, string | undefined>) => {
  const shopName = param(q, 'shopName', 'Precision Auto Care')
  const city = param(q, 'city', 'Albuquerque')
  const service = param(q, 'service', 'full-service auto repair')
  const offer = param(q, 'offer', '$29 Full-Vehicle Inspection + Oil Change')
  const offerValue = param(q, 'offerValue', '$129')
  const warranty = param(q, 'warranty', '24-month / 24,000-mile')
  const rating = param(q, 'rating', '4.9')
  const reviewCount = param(q, 'reviewCount', '870+')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${shopName} — ${offer} in ${city}`, q, { desc: `${shopName}: trusted ${service} in ${city}. New customer special — ${offer} (${offerValue} value) with ${warranty} warranty. ${rating}\u2605 from ${reviewCount} drivers.`, type: 'AutoRepair' })}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="relative bg-gradient-to-br from-gray-950 via-slate-900 to-red-950 text-white overflow-hidden">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center relative z-10">
    <p class="inline-block bg-red-500/20 text-red-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-car mr-2"></i>${city} \u00b7 New customer special \u00b7 ${warranty} warranty</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${offer} <span class="text-red-300 text-3xl md:text-4xl">(${offerValue} value)</span></h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Know exactly what\u2019s wrong with your car \u2014 in plain English, with photos \u2014 before you spend a dime on repairs. ${rating}\u2605 from ${reviewCount} ${city} drivers.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8 glass-dark">
      <p class="text-sm text-gray-400 mb-1">New customer pricing ends in:</p>
      <p class="text-3xl font-bold text-red-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div><a href="#book" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Book My ${offerValue.replace('$','$')} Inspection \u2192</a></div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-star text-orange-400 mr-1"></i>${rating}\u2605 average \u00b7 <i class="fas fa-shield-halved text-red-400 ml-2 mr-1"></i>${warranty} warranty on all work</p>
  </div>
</header>

<!-- [2] PAIN -->
<section id="pain" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-3">Tired of Shops That Treat You Like a Blank Check?</h2>
    <p class="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Most drivers put off maintenance because they don\u2019t trust the diagnosis. We fixed that.</p>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['fa-camera', 'Photo & Video Proof', 'Every recommended repair comes with photos or video of YOUR vehicle \u2014 no mystery upsells, ever.'],
        ['fa-file-invoice-dollar', 'Upfront Digital Estimates', 'Approve or decline each line item from your phone. Nothing gets touched without your OK.'],
        ['fa-user-check', 'ASE-Certified Techs', 'Master-certified technicians and a ${warranty} nationwide warranty on parts and labor.'],
      ].map(([icon, title, body]) => `
      <article class="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4"><i class="fas ${icon}"></i></div>
        <h3 class="font-bold text-lg mb-2">${title}</h3>
        <p class="text-gray-600 text-sm">${body}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [3] INCLUDED -->
<section id="included" class="py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-extrabold mb-6">What Your ${offerValue}-Value Visit Includes</h2>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">A bumper-to-bumper health report \u2014 the same inspection dealerships charge ${offerValue} for.</p>
    <div class="grid md:grid-cols-4 gap-4 text-sm">
      ${['Full synthetic-blend oil change', '50-point digital inspection', 'Brake & tire wear report', 'Battery + fluids health check'].map(x => `<div class="bg-red-50 border border-red-200 rounded-xl p-4 font-semibold text-red-900"><i class="fas fa-check text-red-600 mr-1"></i>${x}</div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Straight Answers</h2>
    <div class="space-y-3">
      ${[
        ['Is there a catch with the intro offer?', 'No. It\u2019s how we earn new customers. You get the inspection and oil change at the intro price \u2014 whether or not you approve any repairs.'],
        ['How long does the inspection take?', 'About 60\u201390 minutes. Comfortable waiting area with Wi-Fi, or we\u2019ll text you when it\u2019s done if you drop off.'],
        ['Do you work on all makes and models?', 'Yes \u2014 domestic, Asian, and European vehicles, including diesel trucks and hybrids.'],
        ['What if you find something serious?', 'You get photos, a plain-English explanation, and a written estimate. You decide \u2014 zero pressure, and the ${warranty} warranty covers anything we fix.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [5] BOOK FORM -->
<section id="book" class="py-20 bg-gradient-to-br from-gray-950 via-slate-900 to-red-950 text-white">
  <div class="max-w-xl mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Reserve Your Spot \u2014 ${offer}</h2>
    <p class="text-gray-300 mb-8">Limited new-customer slots each week. We\u2019ll text you to confirm your appointment time.</p>
    <form data-lead-form class="bg-white/10 glass-dark rounded-2xl p-6 space-y-4 text-left">
      <input name="name" required placeholder="Full name" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="phone" type="tel" required placeholder="Mobile phone" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="email" type="email" placeholder="Email (for your digital report)" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="vehicle" placeholder="Year / Make / Model (e.g. 2019 Toyota Tacoma)" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <label class="flex items-start gap-2 text-xs text-gray-300"><input type="checkbox" name="smsConsent" class="mt-0.5">I agree to receive automated texts to confirm and manage my appointment. Msg rates may apply. Reply STOP to opt out.</label>
      <button type="submit" class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Book My Inspection \u2192</button>
    </form>
  </div>
</section>

<footer class="bg-gray-950 text-gray-400 text-center py-10 text-sm">
  <p class="font-bold text-white mb-1">${shopName}</p>
  <p>${city} \u00b7 ${service} \u00b7 ${warranty} warranty \u00b7 Offer for new customers, one per vehicle.</p>
</footer>
${templateBadge}
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
<script src="/static/app.js"></script>
</body></html>`
}
