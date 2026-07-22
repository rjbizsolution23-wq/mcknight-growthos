import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const restaurantTemplate = (q: Record<string, string | undefined>) => {
  const bizName = param(q, 'bizName', 'Casa Bella Trattoria')
  const cuisine = param(q, 'cuisine', 'wood-fired Italian')
  const city = param(q, 'city', 'Albuquerque')
  const offer = param(q, 'offer', 'Free appetizer + dessert for two')
  const offerValue = param(q, 'offerValue', '$34')
  const rating = param(q, 'rating', '4.8')
  const reviewCount = param(q, 'reviewCount', '1,240+')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${bizName} — VIP Table Offer in ${city}`, q, { desc: `${bizName}: ${cuisine} in ${city}. Claim your VIP first-visit offer — ${offer} (${offerValue} value). ${rating}\u2605 from ${reviewCount} diners.`, type: 'Restaurant' })}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="relative bg-gradient-to-br from-gray-950 via-stone-900 to-amber-950 text-white overflow-hidden">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center relative z-10">
    <p class="inline-block bg-amber-500/20 text-amber-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-utensils mr-2"></i>${city} \u00b7 ${cuisine} \u00b7 New guest VIP offer</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">Your First Visit: ${offer} <span class="text-amber-300 text-3xl md:text-4xl">(${offerValue} value)</span></h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">${rating}\u2605 from ${reviewCount} local diners. Join the VIP list, show your confirmation at the table, and taste why ${city} keeps coming back.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8 glass-dark">
      <p class="text-sm text-gray-400 mb-1">VIP offer closes in:</p>
      <p class="text-3xl font-bold text-amber-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div><a href="#vip" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Claim My VIP Table \u2192</a></div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-star text-orange-400 mr-1"></i>${rating}\u2605 average \u00b7 <i class="fas fa-users text-amber-400 ml-2 mr-1"></i>${reviewCount} reviews</p>
  </div>
</header>

<!-- [2] WHY -->
<section id="why" class="py-16 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-10">Why ${city} Locals Call This Their Spot</h2>
    <div class="grid md:grid-cols-3 gap-5">
      ${[
        ['fa-fire', 'Made from scratch, daily', 'Dough, sauces, and desserts made in-house every morning \u2014 nothing frozen, nothing shipped in.'],
        ['fa-seedling', 'Local ingredients first', `We buy from ${city}-area farms and name them on the menu. You taste the difference.`],
        ['fa-heart', 'Hospitality that remembers you', 'Your server knows the menu cold \u2014 and by visit two, they know your favorite table.'],
      ].map(([icon, title, body]) => `
      <article class="bg-white rounded-2xl p-6 border border-gray-200 text-center">
        <i class="fas ${icon} text-3xl text-amber-500 mb-4"></i>
        <h3 class="font-bold text-lg mb-2">${title}</h3>
        <p class="text-gray-600 text-sm">${body}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [3] SIGNATURE -->
<section id="signature" class="py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-extrabold mb-6">The ${cuisine.charAt(0).toUpperCase() + cuisine.slice(1)} Everyone Talks About</h2>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">Signature dishes built on recipes we refused to compromise. Come hungry \u2014 portions are honest and the bread keeps coming.</p>
    <div class="grid md:grid-cols-4 gap-4 text-sm">
      ${['Chef\u2019s tasting favorites', 'Seasonal specials monthly', 'Full bar + local wine list', 'Private dining for events'].map(x => `<div class="bg-amber-50 border border-amber-200 rounded-xl p-4 font-semibold text-amber-900"><i class="fas fa-check text-amber-600 mr-1"></i>${x}</div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Before You Book</h2>
    <div class="space-y-3">
      ${[
        ['How does the VIP offer work?', 'Join the list below \u2014 you\u2019ll get an instant confirmation. Show it to your server on your first visit and the offer is applied automatically. One per table.'],
        ['Do I need a reservation?', 'Walk-ins welcome, but VIP list members get priority seating \u2014 we\u2019ll text you when your table is ready.'],
        ['Can you handle dietary restrictions?', 'Yes \u2014 gluten-free, vegetarian, and vegan options are marked, and the kitchen takes allergies seriously. Tell your server.'],
        ['Is there parking?', 'Free lot behind the building plus street parking. Accessible entrance on the main side.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [5] VIP FORM -->
<section id="vip" class="py-20 bg-gradient-to-br from-gray-950 via-stone-900 to-amber-950 text-white">
  <div class="max-w-xl mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Join the VIP List \u2014 ${offer}</h2>
    <p class="text-gray-300 mb-8">Instant confirmation. No purchase required to join. Offer valid on your first visit.</p>
    <form data-lead-form class="bg-white/10 glass-dark rounded-2xl p-6 space-y-4 text-left">
      <input name="name" required placeholder="Full name" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="email" type="email" required placeholder="Email address" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="phone" type="tel" placeholder="Mobile (for table-ready texts)" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <label class="flex items-start gap-2 text-xs text-gray-300"><input type="checkbox" name="smsConsent" class="mt-0.5">I agree to receive automated texts about my VIP offer and table status. Msg rates may apply. Reply STOP to opt out.</label>
      <button type="submit" class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Claim My VIP Offer \u2192</button>
    </form>
  </div>
</section>

<footer class="bg-gray-950 text-gray-400 text-center py-10 text-sm">
  <p class="font-bold text-white mb-1">${bizName}</p>
  <p>${city} \u00b7 ${cuisine} \u00b7 Offer subject to availability. One per table, first visit only.</p>
</footer>
${templateBadge}
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
<script src="/static/app.js"></script>
</body></html>`
}
