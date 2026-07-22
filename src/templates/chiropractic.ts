import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const chiropracticTemplate = (q: Record<string, string | undefined>) => {
  const clinic = param(q, 'clinic', 'Align Spine & Wellness')
  const doctor = param(q, 'doctor', 'Dr. Maya Torres, DC')
  const city = param(q, 'city', 'Albuquerque')
  const offer = param(q, 'offer', 'Exam + Consultation + First Adjustment')
  const offerPrice = param(q, 'offerPrice', '$49')
  const offerValue = param(q, 'offerValue', '$265')
  const patientCount = param(q, 'patientCount', '8,500+')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${clinic} — ${offerPrice} New Patient Special in ${city}`, q, { desc: `${clinic}: ${offer} for just ${offerPrice} (${offerValue} value). ${doctor} has helped ${patientCount} ${city} patients get out of pain without drugs or surgery.`, type: 'Chiropractic' })}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="relative bg-gradient-to-br from-gray-950 via-teal-950 to-emerald-950 text-white overflow-hidden">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center relative z-10">
    <p class="inline-block bg-teal-500/20 text-teal-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-user-doctor mr-2"></i>${city} \u00b7 New patient special \u00b7 ${patientCount} patients helped</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${offer} \u2014 Just ${offerPrice} <span class="text-teal-300 text-3xl md:text-4xl">(${offerValue} value)</span></h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Stop letting back pain, neck pain, or headaches run your life. ${doctor} finds the root cause \u2014 and builds a plan to fix it, not mask it.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8 glass-dark">
      <p class="text-sm text-gray-400 mb-1">New patient pricing ends in:</p>
      <p class="text-3xl font-bold text-teal-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div><a href="#book" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Claim My ${offerPrice} Visit \u2192</a></div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-hand-holding-medical text-teal-400 mr-1"></i>Drug-free \u00b7 Non-surgical \u00b7 Most insurance accepted</p>
  </div>
</header>

<!-- [2] PAIN -->
<section id="pain" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-3">How Long Have You Been "Just Living With It"?</h2>
    <p class="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Pain that\u2019s lasted more than two weeks isn\u2019t going away on its own \u2014 it\u2019s compensating, and compensation spreads.</p>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['fa-magnifying-glass-chart', 'Find the Root Cause', `Your first visit includes a full spinal exam and posture analysis \u2014 ${doctor} shows you exactly what\u2019s wrong and why, in plain English.`],
        ['fa-bone', 'Fix It, Don\u2019t Mask It', 'Precise, gentle adjustments restore movement where your body lost it \u2014 no cracking-mill volume care, no drugs, no surgery.'],
        ['fa-chart-line', 'A Plan With an End Date', 'You get a written care plan with clear milestones \u2014 not an open-ended "come back forever" subscription.'],
      ].map(([icon, title, body]) => `
      <article class="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-2xl mb-4"><i class="fas ${icon}"></i></div>
        <h3 class="font-bold text-lg mb-2">${title}</h3>
        <p class="text-gray-600 text-sm">${body}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [3] CONDITIONS -->
<section id="conditions" class="py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-extrabold mb-6">What We Help With Every Day</h2>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">If it involves your spine, posture, or nervous system \u2014 it\u2019s our specialty.</p>
    <div class="grid md:grid-cols-4 gap-4 text-sm">
      ${['Low back pain & sciatica', 'Neck pain & tech-neck', 'Headaches & migraines', 'Auto injury & whiplash'].map(x => `<div class="bg-teal-50 border border-teal-200 rounded-xl p-4 font-semibold text-teal-900"><i class="fas fa-check text-teal-600 mr-1"></i>${x}</div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Honest Answers First</h2>
    <div class="space-y-3">
      ${[
        ['Does an adjustment hurt?', 'No \u2014 most patients describe relief and looseness, not pain. Gentle low-force techniques are available if you\u2019re nervous or have osteoporosis concerns.'],
        ['Will I have to come forever?', `No. ${doctor} builds care plans with clear end points and re-exams to prove progress. When you\u2019re done, you\u2019re done \u2014 maintenance is always your choice.`],
        ['Do you take insurance?', 'Most major plans are accepted and we verify your benefits before your first adjustment, so there are zero billing surprises.'],
        ['What happens at the first visit?', `Health history, spinal exam, posture analysis, and \u2014 if you\u2019re a candidate for care \u2014 your first adjustment the same day. About 45 minutes total.`],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [5] BOOK FORM -->
<section id="book" class="py-20 bg-gradient-to-br from-gray-950 via-teal-950 to-emerald-950 text-white">
  <div class="max-w-xl mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Book Your ${offerPrice} New Patient Visit</h2>
    <p class="text-gray-300 mb-8">Limited new-patient slots each week. Our team texts you to lock in your time.</p>
    <form data-lead-form class="bg-white/10 glass-dark rounded-2xl p-6 space-y-4 text-left">
      <input name="name" required placeholder="Full name" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="phone" type="tel" required placeholder="Mobile phone" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="email" type="email" placeholder="Email address" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <select name="concern" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
        <option value="">What\u2019s bothering you most?</option>
        <option>Low back pain / sciatica</option>
        <option>Neck pain / headaches</option>
        <option>Auto accident injury</option>
        <option>Posture / general wellness</option>
        <option>Something else</option>
      </select>
      <label class="flex items-start gap-2 text-xs text-gray-300"><input type="checkbox" name="smsConsent" class="mt-0.5">I agree to receive automated texts to schedule and manage my appointment. Msg rates may apply. Reply STOP to opt out.</label>
      <button type="submit" class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Book My Visit \u2192</button>
    </form>
    <p class="mt-6 text-gray-500 text-xs">New patients only. Federal and state insurance program participants: offer subject to applicable regulations \u2014 our team will confirm eligibility.</p>
  </div>
</section>

<footer class="bg-gray-950 text-gray-400 text-center py-10 text-sm">
  <p class="font-bold text-white mb-1">${clinic} \u00b7 ${doctor}</p>
  <p>${city} \u00b7 Chiropractic care \u00b7 This offer is for new patients and may not be combined with insurance where prohibited.</p>
</footer>
${templateBadge}
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
<script src="/static/app.js"></script>
</body></html>`
}
