import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const salonTemplate = (q: Record<string, string | undefined>) => {
  const salonName = param(q, 'salonName', 'Luxe Studio Salon')
  const city = param(q, 'city', 'Albuquerque')
  const specialty = param(q, 'specialty', 'balayage & precision color')
  const offer = param(q, 'offer', '30% Off Your First Color + Free Deep-Conditioning Treatment')
  const offerValue = param(q, 'offerValue', '$85')
  const stylistCount = param(q, 'stylistCount', '9')
  const rating = param(q, 'rating', '4.9')
  const reviewCount = param(q, 'reviewCount', '640+')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${salonName} — New Guest Offer in ${city}`, q, { desc: `${salonName}: ${specialty} in ${city}. New guest special — ${offer} (up to ${offerValue} value). ${rating}\u2605 from ${reviewCount} clients.`, type: 'HairSalon' })}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="relative bg-gradient-to-br from-gray-950 via-purple-950 to-pink-950 text-white overflow-hidden">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center relative z-10">
    <p class="inline-block bg-pink-500/20 text-pink-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-scissors mr-2"></i>${city} \u00b7 ${specialty} \u00b7 New guest exclusive</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${offer} <span class="text-pink-300 text-3xl md:text-4xl">(up to ${offerValue} value)</span></h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Walk out with the hair you keep screenshotting. ${stylistCount} award-trained stylists, ${rating}\u2605 from ${reviewCount} ${city} clients \u2014 and a first-visit offer that makes trying us easy.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8 glass-dark">
      <p class="text-sm text-gray-400 mb-1">New guest offer expires in:</p>
      <p class="text-3xl font-bold text-pink-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div><a href="#book" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Claim My New Guest Offer \u2192</a></div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-star text-orange-400 mr-1"></i>${rating}\u2605 average \u00b7 <i class="fas fa-heart text-pink-400 ml-2 mr-1"></i>${reviewCount} five-star reviews</p>
  </div>
</header>

<!-- [2] WHY -->
<section id="why" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-3">Why ${city} Books Weeks Ahead With Us</h2>
    <p class="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Great hair isn\u2019t luck \u2014 it\u2019s a consultation that actually listens, and a stylist who\u2019s mastered the craft.</p>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['fa-comments', 'Real Consultations', 'Every appointment starts with a sit-down consult \u2014 inspo photos welcome. We map your color journey before touching a strand.'],
        ['fa-award', 'Master-Trained Stylists', `Our team trains quarterly with national color educators. ${specialty.charAt(0).toUpperCase() + specialty.slice(1)} is our signature.`],
        ['fa-hand-holding-heart', 'The Redo Promise', 'Not 100% in love within 7 days? Come back and we\u2019ll adjust it free. No awkwardness, ever.'],
      ].map(([icon, title, body]) => `
      <article class="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-2xl mb-4"><i class="fas ${icon}"></i></div>
        <h3 class="font-bold text-lg mb-2">${title}</h3>
        <p class="text-gray-600 text-sm">${body}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [3] SERVICES -->
<section id="services" class="py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-extrabold mb-6">Your New Guest Experience</h2>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">First visits include the full treatment \u2014 because first impressions go both ways.</p>
    <div class="grid md:grid-cols-4 gap-4 text-sm">
      ${['Personal color consultation', 'Luxury wash + scalp massage', 'Free deep-conditioning treatment', 'Style-out + home care plan'].map(x => `<div class="bg-pink-50 border border-pink-200 rounded-xl p-4 font-semibold text-pink-900"><i class="fas fa-check text-pink-600 mr-1"></i>${x}</div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Before Your First Visit</h2>
    <div class="space-y-3">
      ${[
        ['How does the new guest offer work?', 'Claim it below and you\u2019ll get an instant confirmation. The discount and free treatment are applied automatically at your first appointment.'],
        ['Can I request a specific stylist?', 'Absolutely \u2014 tell us your vibe in the booking form and we\u2019ll match you, or request anyone by name.'],
        ['How long does color take?', 'Full color or balayage typically runs 2\u20133.5 hours including the consult. We\u2019ll give you an exact estimate when we confirm.'],
        ['What if I don\u2019t love the result?', 'Our Redo Promise: within 7 days, we\u2019ll adjust anything free of charge until you\u2019re obsessed with it.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [5] BOOK FORM -->
<section id="book" class="py-20 bg-gradient-to-br from-gray-950 via-purple-950 to-pink-950 text-white">
  <div class="max-w-xl mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Lock In Your New Guest Offer</h2>
    <p class="text-gray-300 mb-8">${offer} \u2014 instant confirmation, and our booking team texts you to find your perfect time slot.</p>
    <form data-lead-form class="bg-white/10 glass-dark rounded-2xl p-6 space-y-4 text-left">
      <input name="name" required placeholder="Full name" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="phone" type="tel" required placeholder="Mobile phone" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="email" type="email" placeholder="Email address" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <select name="service" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
        <option value="">What are you dreaming of?</option>
        <option>Balayage / highlights</option>
        <option>Full color transformation</option>
        <option>Cut + style refresh</option>
        <option>Color correction</option>
        <option>Not sure yet \u2014 help me decide</option>
      </select>
      <label class="flex items-start gap-2 text-xs text-gray-300"><input type="checkbox" name="smsConsent" class="mt-0.5">I agree to receive automated texts to schedule and manage my appointment. Msg rates may apply. Reply STOP to opt out.</label>
      <button type="submit" class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Claim My Offer \u2192</button>
    </form>
  </div>
</section>

<footer class="bg-gray-950 text-gray-400 text-center py-10 text-sm">
  <p class="font-bold text-white mb-1">${salonName}</p>
  <p>${city} \u00b7 ${specialty} \u00b7 New guest offer valid on first visit only.</p>
</footer>
${templateBadge}
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
<script src="/static/app.js"></script>
</body></html>`
}
