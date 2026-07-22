import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const dentalTemplate = (q: Record<string, string | undefined>) => {
  const practice = param(q, 'practice', 'Summit Smiles Dental')
  const dentist = param(q, 'dentist', 'Dr. Maria Torres, DDS')
  const city = param(q, 'city', 'Albuquerque')
  const offer = param(q, 'offer', 'New Patient Exam + X-Rays + Cleaning')
  const offerPrice = param(q, 'offerPrice', '$99')
  const offerValue = param(q, 'offerValue', '$385')
  const patientCount = param(q, 'patientCount', '12,000+')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${practice} — ${offerPrice} New Patient Special`, q, { desc: `${practice} in ${city}: ${offer} for ${offerPrice} (${offerValue} value). Gentle, judgment-free dentistry from ${dentist}. ${patientCount} smiles treated.`, type: 'Dentist' })}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="relative bg-gradient-to-br from-gray-950 via-slate-900 to-cyan-950 text-white overflow-hidden">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center relative z-10">
    <p class="inline-block bg-cyan-500/20 text-cyan-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-tooth mr-2"></i>${city} \u00b7 Judgment-free dentistry \u00b7 New patient special</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${offer} — ${offerPrice} <span class="text-cyan-300 text-3xl md:text-4xl">(${offerValue} value)</span></h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Been putting it off? No lectures here. ${dentist} and the team have treated ${patientCount} patients — including plenty who hadn\u2019t seen a dentist in years.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8 glass-dark">
      <p class="text-sm text-gray-400 mb-1">New patient special ends in:</p>
      <p class="text-3xl font-bold text-cyan-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div><a href="#book" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Book My ${offerPrice} Visit \u2192</a></div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-user-doctor text-cyan-400 mr-1"></i>${dentist} \u00b7 <i class="fas fa-shield-heart text-emerald-400 ml-2 mr-1"></i>Most PPO insurance accepted</p>
  </div>
</header>

<!-- [2] EMPATHY -->
<section id="pain" class="py-16 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-10">If Any of This Sounds Familiar, You\u2019re Our Kind of Patient</h2>
    <div class="grid md:grid-cols-2 gap-4 mb-10">
      ${[
        'It\u2019s been years and you\u2019re bracing for a lecture (you won\u2019t get one here)',
        'Dental anxiety is real for you \u2014 the sounds, the chair, all of it',
        'You\u2019re worried about surprise bills more than the drill',
        'A tooth has been "fine" for months and you know it\u2019s not fine',
        'You want straight answers and real prices before anything happens',
      ].map(p => `<article class="bg-white rounded-xl p-5 border border-gray-200 flex gap-3"><i class="fas fa-heart text-cyan-500 mt-1"></i><p class="text-gray-700">${p}</p></article>`).join('')}
    </div>
    <p class="text-center text-lg text-gray-600">Our promise: <strong>exam first, honest conversation second, zero pressure always.</strong> You get a written plan with real prices \u2014 what\u2019s urgent, what can wait, and what\u2019s optional.</p>
  </div>
</section>

<!-- [3] INCLUDED -->
<section id="included" class="py-16">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Everything in Your ${offerPrice} Visit</h2>
    <div class="grid md:grid-cols-2 gap-5">
      ${[
        ['fa-magnifying-glass', 'Comprehensive exam', `${dentist} personally examines every new patient \u2014 teeth, gums, bite, and oral cancer screening.`],
        ['fa-x-ray', 'Digital X-rays', 'Low-radiation digital imaging \u2014 you see what we see, on the big screen, explained in plain English.'],
        ['fa-sparkles', 'Professional cleaning', 'Gentle hygienist cleaning (unless gum condition requires a deeper clean \u2014 we\u2019ll tell you first, with pricing).'],
        ['fa-file-invoice-dollar', 'Written treatment plan', 'Prioritized plan with real prices. Take it home. Compare us. No same-day pressure, ever.'],
      ].map(([icon, title, body]) => `
      <article class="bg-cyan-50 border border-cyan-100 rounded-2xl p-6">
        <h3 class="font-bold text-lg mb-2"><i class="fas ${icon} text-cyan-600 mr-2"></i>${title}</h3>
        <p class="text-gray-600 text-sm">${body}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [4] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Honest Answers</h2>
    <div class="space-y-3">
      ${[
        ['Is the price really ' + offerPrice + '?', 'Yes \u2014 for new patients without insurance. If you have PPO insurance, your visit may cost even less; we verify benefits before your appointment so there are no surprises.'],
        ['What if I need more work?', 'You get a written, prioritized plan with prices. What\u2019s urgent, what can wait, what\u2019s cosmetic. You decide the pace \u2014 financing options available for bigger plans.'],
        ['I have dental anxiety. Seriously.', 'You\u2019re in the majority. Noise-canceling headphones, weighted blankets, breaks whenever you raise a hand, and sedation options for treatment visits.'],
        ['How soon can I get in?', 'Most new patients are seen within one week. Book below and we\u2019ll text you our first openings \u2014 including early morning and lunch slots.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [5] BOOK -->
<section id="book" class="py-20 bg-gradient-to-br from-gray-950 via-slate-900 to-cyan-950 text-white">
  <div class="max-w-xl mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Book Your ${offerPrice} New Patient Visit</h2>
    <p class="text-gray-300 mb-8">Takes 30 seconds. We\u2019ll text you available times \u2014 no phone tag.</p>
    <form data-lead-form class="bg-white/10 glass-dark rounded-2xl p-6 space-y-4 text-left">
      <input name="name" required placeholder="Full name" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="phone" type="tel" required placeholder="Mobile number" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="email" type="email" placeholder="Email (for confirmation)" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <select name="urgency" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
        <option value="">When would you like to come in?</option>
        <option>ASAP \u2014 something hurts</option>
        <option>Within 2 weeks</option>
        <option>Just a checkup \u2014 flexible</option>
      </select>
      <label class="flex items-start gap-2 text-xs text-gray-300"><input type="checkbox" name="smsConsent" class="mt-0.5">I agree to receive automated texts about scheduling. Msg rates may apply. Reply STOP to opt out.</label>
      <button type="submit" class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Request My Appointment \u2192</button>
    </form>
    <p class="mt-4 text-xs text-gray-500">Submitting does not create a doctor-patient relationship. Offer for new patients without insurance; cannot be combined with other offers. If periodontal disease is present, a different cleaning may be clinically required (priced before treatment).</p>
  </div>
</section>

<footer class="bg-gray-950 text-gray-400 text-center py-10 text-sm">
  <p class="font-bold text-white mb-1">${practice}</p>
  <p>${city} \u00b7 ${dentist} \u00b7 General & cosmetic dentistry</p>
</footer>
${templateBadge}
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
<script src="/static/app.js"></script>
</body></html>`
}
