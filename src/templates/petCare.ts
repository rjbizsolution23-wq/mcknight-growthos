import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const petCareTemplate = (q: Record<string, string | undefined>) => {
  const bizName = param(q, 'bizName', 'Happy Tails Veterinary & Grooming')
  const city = param(q, 'city', 'Albuquerque')
  const service = param(q, 'service', 'veterinary care & grooming')
  const offer = param(q, 'offer', 'Free First Wellness Exam + 20% Off First Groom')
  const offerValue = param(q, 'offerValue', '$95')
  const petCount = param(q, 'petCount', '15,000+')
  const rating = param(q, 'rating', '4.9')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${bizName} — New Pet Family Offer in ${city}`, q, { desc: `${bizName}: ${service} in ${city}. New pet family special — ${offer} (${offerValue} value). ${rating}\u2605, ${petCount} pets cared for.`, type: 'VeterinaryCare' })}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="relative bg-gradient-to-br from-gray-950 via-sky-950 to-amber-950 text-white overflow-hidden">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center relative z-10">
    <p class="inline-block bg-sky-500/20 text-sky-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-paw mr-2"></i>${city} \u00b7 ${petCount} pets cared for \u00b7 New family welcome offer</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${offer} <span class="text-sky-300 text-3xl md:text-4xl">(${offerValue} value)</span></h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Your pet deserves a team that treats them like family \u2014 fear-free handling, honest pricing, and vets who actually call you back. ${rating}\u2605 from ${city} pet parents.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8 glass-dark">
      <p class="text-sm text-gray-400 mb-1">Welcome offer ends in:</p>
      <p class="text-3xl font-bold text-sky-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div><a href="#book" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Claim My Pet\u2019s Free Exam \u2192</a></div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-star text-orange-400 mr-1"></i>${rating}\u2605 average \u00b7 <i class="fas fa-heart text-sky-400 ml-2 mr-1"></i>Fear-free certified team</p>
  </div>
</header>

<!-- [2] WHY -->
<section id="why" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-3">Why ${city} Pet Parents Switch to Us</h2>
    <p class="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Because "we\u2019ll squeeze you in in three weeks" isn\u2019t good enough when your best friend is hurting.</p>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['fa-clock', 'Same-Week Appointments', 'Sick-pet visits prioritized daily and new clients seen within the week \u2014 not the month.'],
        ['fa-file-invoice', 'Estimates Before Treatment', 'Written estimates before anything happens. You approve every line \u2014 no surprise invoices at checkout.'],
        ['fa-shield-dog', 'Fear-Free Handling', 'Certified fear-free techniques, treats-first visits, and calm rooms \u2014 pets that used to shake now pull their owners through our door.'],
      ].map(([icon, title, body]) => `
      <article class="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-2xl mb-4"><i class="fas ${icon}"></i></div>
        <h3 class="font-bold text-lg mb-2">${title}</h3>
        <p class="text-gray-600 text-sm">${body}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [3] SERVICES -->
<section id="services" class="py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-extrabold mb-6">Everything Under One Roof</h2>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">From puppy\u2019s first shots to senior comfort care \u2014 one team that knows your pet\u2019s whole story.</p>
    <div class="grid md:grid-cols-4 gap-4 text-sm">
      ${['Wellness exams & vaccines', 'Dental cleanings', 'Full-service grooming', 'Digital X-ray & in-house lab'].map(x => `<div class="bg-sky-50 border border-sky-200 rounded-xl p-4 font-semibold text-sky-900"><i class="fas fa-check text-sky-600 mr-1"></i>${x}</div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Pet Parent Questions</h2>
    <div class="space-y-3">
      ${[
        ['How does the free first exam work?', 'Claim the offer below, and your pet\u2019s first wellness exam is on us \u2014 a full nose-to-tail check with a written health report. Vaccines and treatments, if needed, are quoted before anything happens.'],
        ['My pet gets anxious at the vet. Can you help?', 'That\u2019s our specialty. Fear-free certified handling, pheromone-calmed rooms, and unhurried appointments. Tell us in the form and we\u2019ll plan extra time.'],
        ['Do you see exotic pets?', 'We focus on dogs and cats to stay excellent at it. For exotics, we\u2019ll happily refer you to trusted colleagues.'],
        ['What if my pet needs urgent care?', 'Call us first \u2014 we hold sick-visit slots every day. For after-hours emergencies, we partner with the local 24/7 ER and share records instantly.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [5] BOOK FORM -->
<section id="book" class="py-20 bg-gradient-to-br from-gray-950 via-sky-950 to-amber-950 text-white">
  <div class="max-w-xl mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Claim Your Pet\u2019s Welcome Offer</h2>
    <p class="text-gray-300 mb-8">${offer} \u2014 our team texts you to find the perfect first-visit time.</p>
    <form data-lead-form class="bg-white/10 glass-dark rounded-2xl p-6 space-y-4 text-left">
      <input name="name" required placeholder="Your name" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="phone" type="tel" required placeholder="Mobile phone" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="email" type="email" placeholder="Email address" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="petName" placeholder="Pet\u2019s name + type (e.g. Luna, 3yo Lab mix)" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <label class="flex items-start gap-2 text-xs text-gray-300"><input type="checkbox" name="smsConsent" class="mt-0.5">I agree to receive automated texts about my pet\u2019s appointments and care reminders. Msg rates may apply. Reply STOP to opt out.</label>
      <button type="submit" class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Claim the Offer \u2192</button>
    </form>
  </div>
</section>

<footer class="bg-gray-950 text-gray-400 text-center py-10 text-sm">
  <p class="font-bold text-white mb-1">${bizName}</p>
  <p>${city} \u00b7 ${service} \u00b7 Welcome offer for new clients, one per household.</p>
</footer>
${templateBadge}
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
<script src="/static/app.js"></script>
</body></html>`
}
