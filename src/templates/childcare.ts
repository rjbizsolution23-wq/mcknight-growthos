import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const childcareTemplate = (q: Record<string, string | undefined>) => {
  const center = param(q, 'center', 'Little Explorers Learning Center')
  const city = param(q, 'city', 'Albuquerque')
  const ages = param(q, 'ages', '6 weeks \u2013 5 years')
  const offer = param(q, 'offer', 'Free Registration + First Week 50% Off')
  const offerValue = param(q, 'offerValue', '$275')
  const familyCount = param(q, 'familyCount', '900+')
  const ratio = param(q, 'ratio', '1:4 infant ratio')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${center} — Enrollment Open in ${city} | Tour This Week`, q, { desc: `${center}: licensed early learning for ages ${ages} in ${city}. ${offer} (${offerValue} value). ${familyCount} families served, ${ratio}.`, type: 'ChildCare' })}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="relative bg-gradient-to-br from-gray-950 via-violet-950 to-rose-950 text-white overflow-hidden">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center relative z-10">
    <p class="inline-block bg-rose-500/20 text-rose-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-child-reaching mr-2"></i>${city} \u00b7 Ages ${ages} \u00b7 Licensed & accredited</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${offer} <span class="text-rose-300 text-3xl md:text-4xl">(${offerValue} value)</span></h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">The hardest drop-off is the first one. Tour our classrooms, meet the teachers who\u2019ll know your child by name, and see why ${familyCount} ${city} families trust us every morning.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8 glass-dark">
      <p class="text-sm text-gray-400 mb-1">Enrollment offer ends in:</p>
      <p class="text-3xl font-bold text-rose-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div><a href="#tour" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Schedule My Tour \u2192</a></div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-camera text-rose-400 mr-1"></i>Live classroom cameras \u00b7 <i class="fas fa-users text-violet-400 ml-2 mr-1"></i>${ratio}</p>
  </div>
</header>

<!-- [2] TRUST -->
<section id="trust" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-3">Built for Parents Who Check Everything</h2>
    <p class="text-center text-gray-600 mb-10 max-w-2xl mx-auto">You should be picky about who cares for your child. Here\u2019s what picky parents find when they look closely at us.</p>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['fa-video', 'See Your Child All Day', 'Secure live-stream cameras in every classroom \u2014 peek in from work anytime. Daily photo updates and nap/meal logs in the parent app.'],
        ['fa-graduation-cap', 'Teachers Who Stay', 'Our lead teachers average 6+ years with us \u2014 because we pay above market and train constantly. Low turnover means your child bonds once, not repeatedly.'],
        ['fa-book-open', 'Real Curriculum, Real Play', 'Play-based early learning mapped to kindergarten-readiness standards \u2014 literacy, STEM discovery, and social skills, disguised as the best day ever.'],
      ].map(([icon, title, body]) => `
      <article class="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl mb-4"><i class="fas ${icon}"></i></div>
        <h3 class="font-bold text-lg mb-2">${title}</h3>
        <p class="text-gray-600 text-sm">${body}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [3] PROGRAMS -->
<section id="programs" class="py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-extrabold mb-6">Programs by Age</h2>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">Every age band has its own classroom, rhythm, and milestones \u2014 no one-room chaos.</p>
    <div class="grid md:grid-cols-4 gap-4 text-sm">
      ${['Infants (6 wks\u201312 mo)', 'Toddlers (1\u20132 yrs)', 'Preschool (3\u20134 yrs)', 'Pre-K kindergarten prep'].map(x => `<div class="bg-rose-50 border border-rose-200 rounded-xl p-4 font-semibold text-rose-900"><i class="fas fa-check text-rose-600 mr-1"></i>${x}</div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">What Parents Ask on Tours</h2>
    <div class="space-y-3">
      ${[
        ['What are your ratios and group sizes?', `Better than state minimums in every room \u2014 including our ${ratio}. Small groups mean your child is seen, heard, and held when they need it.`],
        ['How do you handle security?', 'Keypad + photo-verified pickup list, locked vestibule entry, camera coverage everywhere, and staff background checks re-run annually.'],
        ['What about meals and allergies?', 'Fresh breakfast, lunch, and two snacks included \u2014 allergy plans posted in every classroom and strict no-cross-contact protocols.'],
        ['Is there a waitlist?', 'Some rooms fill fast \u2014 infants especially. Tour now, and if your room is full we\u2019ll hold your spot with priority placement, no deposit required.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [5] TOUR FORM -->
<section id="tour" class="py-20 bg-gradient-to-br from-gray-950 via-violet-950 to-rose-950 text-white">
  <div class="max-w-xl mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Schedule Your Tour \u2014 Lock In ${offer}</h2>
    <p class="text-gray-300 mb-8">Tours take 20 minutes. Bring your little one \u2014 the classrooms do the convincing.</p>
    <form data-lead-form class="bg-white/10 glass-dark rounded-2xl p-6 space-y-4 text-left">
      <input name="name" required placeholder="Parent / guardian name" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="phone" type="tel" required placeholder="Mobile phone" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="email" type="email" placeholder="Email address" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <div class="grid grid-cols-2 gap-3">
        <select name="childAge" class="bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
          <option value="">Child\u2019s age</option>
          <option>Infant (6 wks\u201312 mo)</option>
          <option>Toddler (1\u20132 yrs)</option>
          <option>Preschool (3\u20134 yrs)</option>
          <option>Pre-K (4\u20135 yrs)</option>
        </select>
        <select name="startDate" class="bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
          <option value="">Desired start</option>
          <option>ASAP</option>
          <option>Within a month</option>
          <option>1\u20133 months</option>
          <option>Just exploring</option>
        </select>
      </div>
      <label class="flex items-start gap-2 text-xs text-gray-300"><input type="checkbox" name="smsConsent" class="mt-0.5">I agree to receive automated texts about my tour and enrollment. Msg rates may apply. Reply STOP to opt out.</label>
      <button type="submit" class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Book My Tour \u2192</button>
    </form>
  </div>
</section>

<footer class="bg-gray-950 text-gray-400 text-center py-10 text-sm">
  <p class="font-bold text-white mb-1">${center}</p>
  <p>${city} \u00b7 Ages ${ages} \u00b7 State licensed \u00b7 Enrollment offer for new families.</p>
</footer>
${templateBadge}
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
<script src="/static/app.js"></script>
</body></html>`
}
