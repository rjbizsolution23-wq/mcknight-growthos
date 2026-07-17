import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const medSpaTemplate = (q: Record<string, string | undefined>) => {
  const spaName = param(q, 'spaName', 'Luxe Aesthetics Med Spa')
  const treatment = param(q, 'treatment', 'laser skin rejuvenation')
  const city = param(q, 'city', 'Albuquerque')
  const clientCount = param(q, 'clientCount', '9,200+')
  const offerPrice = param(q, 'offerPrice', '$99')
  const offerValue = param(q, 'offerValue', '$350')
  const provider = param(q, 'provider', 'Dr. Elena Vasquez, MD')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${spaName} — New Client Offer`)}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="bg-gradient-to-br from-gray-950 via-gray-900 to-rose-950 text-white">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center">
    <p class="inline-block bg-rose-500/20 text-rose-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-spa mr-2"></i>${city} · Physician-directed med spa · New client offer</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">Your First ${treatment.charAt(0).toUpperCase() + treatment.slice(1)} Session — ${offerPrice} <span class="text-rose-300 text-3xl md:text-4xl">(${offerValue} value)</span></h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Includes a full skin consultation with our clinical team. Physician-directed. ${clientCount} treatments performed. Zero pressure to buy anything else.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8">
      <p class="text-sm text-gray-400 mb-1">New client offer expires in:</p>
      <p class="text-3xl font-bold text-rose-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div>
      <a href="#book" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Claim My ${offerPrice} Session →</a>
    </div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-user-doctor text-rose-400 mr-1"></i>Medical director: ${provider} · <i class="fas fa-star text-orange-400 ml-2 mr-1"></i>4.9★ average rating*</p>
  </div>
</header>

<!-- [2] PAIN -->
<section id="pain" class="py-16 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-10">You\'ve Thought About It for Months. Here\'s What\'s Been Stopping You.</h2>
    <div class="grid md:grid-cols-2 gap-4 mb-10">
      ${[
        'You don\'t know which treatment actually fits YOUR skin — and Googling made it worse',
        'You\'re worried about walking out looking "done" instead of refreshed',
        'Discount spa deals feel sketchy — who\'s actually holding the device?',
        'The consultation-that\'s-really-a-sales-pitch experience burned you before',
        'Every month you wait, the mirror keeps score',
      ].map(p => `<article class="bg-white rounded-xl p-5 border border-gray-200 flex gap-3"><i class="fas fa-xmark text-red-500 mt-1"></i><p class="text-gray-700">${p}</p></article>`).join('')}
    </div>
    <p class="text-center text-lg text-gray-600">The answer isn\'t a coupon site. It\'s a <strong>clinical consultation</strong> — your skin, mapped and assessed, with a treatment plan built for you (even if that plan is "start smaller than you think").</p>
  </div>
</section>

<!-- [3] WHAT'S INCLUDED -->
<section id="included" class="py-16">
  <div class="max-w-5xl mx-auto px-4">
    <p class="text-center text-rose-600 font-semibold uppercase tracking-wide mb-3">The ${offerPrice} New Client Experience</p>
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-12">Everything Included in Your First Visit</h2>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['Clinical Skin Consultation', 'fa-magnifying-glass', 'A licensed provider analyzes your skin, reviews your goals and medical history, and explains — in plain language — what will and won\'t work for you.'],
        [`Full ${treatment.charAt(0).toUpperCase() + treatment.slice(1)} Session`, 'fa-wand-magic-sparkles', `Not a "sample pass." A complete session performed by our certified clinical team using medical-grade equipment, under physician direction.`],
        ['Your Personal Treatment Map', 'fa-map', 'You leave with a written plan: what to do, what to skip, realistic timelines, and transparent pricing. Take it home — no same-day-decision pressure.'],
      ].map(([t, i, d]) => `
      <article class="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
        <i class="fas ${i} text-3xl text-rose-600 mb-4"></i>
        <h3 class="font-bold text-lg mb-2">${t}</h3>
        <p class="text-gray-600 text-sm">${d}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [4] PROVIDER AUTHORITY -->
<section id="provider" class="py-16 bg-gray-950 text-white">
  <div class="max-w-4xl mx-auto px-4 md:flex items-center gap-10">
    <div class="md:w-1/3 mb-8 md:mb-0">
      <div class="aspect-square bg-gradient-to-br from-rose-500 to-pink-400 rounded-3xl flex items-center justify-center text-6xl font-extrabold">${provider.replace(/^Dr\.\s*/, '').split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
    </div>
    <div class="md:w-2/3">
      <p class="text-rose-400 font-semibold uppercase tracking-wide mb-2">Medical Director</p>
      <h2 class="text-3xl font-extrabold mb-4">${provider}</h2>
      <p class="text-gray-300 mb-4">Every treatment protocol at ${spaName} is physician-directed. Our clinical team is licensed, certified on every device we operate, and re-trained quarterly. ${clientCount} treatments performed.</p>
      <p class="text-gray-400 text-sm">Our philosophy: subtle, natural results — you, on your best day. If a treatment isn\'t right for your skin, we\'ll tell you no. That\'s the job.</p>
    </div>
  </div>
</section>

<!-- [5] SOCIAL PROOF -->
<section id="proof" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">What New Clients Say After Visit One</h2>
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      ${[
        ['Rachel T. · New client', 'I braced myself for a hard sell. Instead the provider talked me OUT of two treatments I thought I needed and into a simpler plan. I\'ve already rebooked twice.'],
        ['Monique A. · New client', 'The consultation alone was worth the price. First time anyone actually explained my skin to me instead of just selling me a package.'],
        ['Jessica L. · New client', 'Clean, clinical, professional — and my results after the first session were visible enough that my sister booked the same week.'],
      ].map(([n, t]) => `
      <article class="bg-white rounded-2xl p-6 border border-gray-200">
        <div class="text-orange-400 mb-3">${'<i class="fas fa-star"></i>'.repeat(5)}</div>
        <p class="text-gray-700 text-sm mb-4">"${t}"</p>
        <p class="font-semibold text-sm">${n}</p>
      </article>`).join('')}
    </div>
    <p class="text-xs text-gray-500 text-center max-w-2xl mx-auto">*Individual results vary and are not guaranteed. Example reviews for template purposes — replace with your own verified, client-consented reviews before publishing.</p>
  </div>
</section>

<!-- [6] BOOKING FORM -->
<section id="book" class="py-16">
  <div class="max-w-3xl mx-auto px-4">
    <div class="rounded-3xl border-4 border-orange-500 p-8 md:p-10 shadow-xl">
      <h2 class="text-3xl font-extrabold text-center mb-2">Book Your ${offerPrice} New Client Session</h2>
      <p class="text-center text-gray-600 mb-8">${offerValue} value · consultation + full session + written treatment plan · limited new-client slots per week.</p>
      <form class="space-y-4" onsubmit="event.preventDefault();alert('Template demo — connect this form to your booking system/webhook before launch.')">
        <div class="grid md:grid-cols-2 gap-4">
          <input required placeholder="Full Name" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
          <input required type="tel" placeholder="Phone" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
        </div>
        <input required type="email" placeholder="Email" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
        <select class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-600">
          <option>Preferred time of day</option><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Weekend</option>
        </select>
        <label class="flex gap-3 text-xs text-gray-500 items-start">
          <input type="checkbox" required class="mt-0.5">
          <span>I agree to receive appointment calls/texts from ${spaName} at the number provided, including via automated technology. Consent is not a condition of purchase. Reply STOP to opt out.</span>
        </label>
        <button class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Reserve My Session →</button>
        <p class="text-xs text-gray-500 text-center">Our coordinator will call within one business day to confirm your appointment and complete a brief medical screening.</p>
      </form>
    </div>
  </div>
</section>

<!-- [7] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Asked Before Every First Appointment</h2>
    <div class="space-y-3">
      ${[
        ['Does it hurt?', 'Most clients describe it as mild warmth or light snapping — a 2–3 out of 10. We use cooling and numbing protocols where appropriate, and your comfort is checked throughout.'],
        ['How soon will I see results?', 'Some clients see improvement after one session; most treatments build over a series. Your consultation will set honest, specific expectations for YOUR skin — no miracle promises.'],
        ['Is there downtime?', 'Typically minimal — many clients return to work the same day with light redness that fades within hours. Your provider will give exact aftercare guidance for your treatment.'],
        ['Who performs the treatment?', `A licensed, device-certified clinical provider — never an unsupervised trainee. All protocols are directed by ${provider}.`],
        ['Is the new client offer a bait-and-switch?', `No. ${offerPrice} covers a complete session plus consultation, period. You\'ll get transparent package pricing in writing IF you want more — and zero attitude if you don\'t.`],
        ['What if a treatment isn\'t right for me?', 'Then we tell you at the consultation and recommend what is — even if that\'s skincare instead of a device, or nothing at all. Medical screening comes first, always.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [8] FINAL CTA -->
<section id="final-cta" class="py-20 bg-gradient-to-br from-gray-950 via-gray-900 to-rose-950 text-white text-center">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl md:text-5xl font-extrabold mb-6">Six Months From Now, You\'ll Wish You Started Today.</h2>
    <p class="text-gray-300 text-lg mb-4">${offerPrice} first session (${offerValue} value) — offer ends with the timer.</p>
    <p class="text-3xl font-bold text-rose-400 font-mono mb-8" data-countdown="${deadline}">--</p>
    <a href="#book" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl mb-6">Claim My ${offerPrice} Session →</a>
    <p class="text-sm text-gray-400"><i class="fas fa-user-doctor mr-1"></i>Physician-directed · Licensed providers · Medical-grade equipment</p>
  </div>
</section>

<footer class="bg-gray-950 text-gray-500 text-xs text-center py-8 px-4">
  <p class="mb-2">${spaName} · ${city} · Medical Director: ${provider}</p>
  <p class="max-w-2xl mx-auto">Individual results vary; no outcome is guaranteed. Treatments require medical screening and may not be suitable for everyone. Verify all provider licensing and advertising claims against your state medical board rules before publishing. Example reviews and stats are template placeholders.</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
</body>
</html>`
}
