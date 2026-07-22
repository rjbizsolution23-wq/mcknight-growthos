import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const tutoringTemplate = (q: Record<string, string | undefined>) => {
  const bizName = param(q, 'bizName', 'Peak Performance Tutoring')
  const city = param(q, 'city', 'Albuquerque')
  const subject = param(q, 'subject', 'math, reading & test prep')
  const offer = param(q, 'offer', 'Free Skills Assessment + First Session Free')
  const offerValue = param(q, 'offerValue', '$190')
  const studentCount = param(q, 'studentCount', '3,400+')
  const gradeGain = param(q, 'gradeGain', '1.5 letter grades')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${bizName} — Free Skills Assessment in ${city}`, q, { desc: `${bizName}: 1-on-1 ${subject} tutoring in ${city}. ${offer} (${offerValue} value). ${studentCount} students, average gain ${gradeGain} in one semester.`, type: 'EducationalOrganization' })}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="relative bg-gradient-to-br from-gray-950 via-blue-950 to-orange-950 text-white overflow-hidden">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center relative z-10">
    <p class="inline-block bg-orange-500/20 text-orange-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-graduation-cap mr-2"></i>${city} \u00b7 1-on-1 ${subject} \u00b7 ${studentCount} students helped</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${offer} <span class="text-orange-300 text-3xl md:text-4xl">(${offerValue} value)</span></h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Watching your kid struggle \u2014 and fight you over homework \u2014 is exhausting. Our students gain an average of ${gradeGain} in one semester, and the homework battles stop first.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8 glass-dark">
      <p class="text-sm text-gray-400 mb-1">Free assessment slots close in:</p>
      <p class="text-3xl font-bold text-orange-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div><a href="#assess" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Get the Free Assessment \u2192</a></div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-chart-line text-orange-400 mr-1"></i>Average gain: ${gradeGain} \u00b7 In-person & online</p>
  </div>
</header>

<!-- [2] MECHANISM -->
<section id="mechanism" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-3">Why Tutoring Usually Fails \u2014 and Why Ours Doesn\u2019t</h2>
    <p class="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Most tutoring is homework help with a nicer name. It patches tonight\u2019s assignment and ignores the real gap.</p>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['fa-magnifying-glass', '1 \u00b7 Find the Real Gap', 'Our diagnostic assessment pinpoints the exact missing skills \u2014 often 2\u20133 grade levels behind the current struggle. You get the full map.'],
        ['fa-user-graduate', '2 \u00b7 Match the Right Tutor', 'One dedicated tutor, matched to your child\u2019s personality and gap profile \u2014 not a rotating cast of college students reading from a script.'],
        ['fa-trophy', '3 \u00b7 Close It & Prove It', 'Skills re-tested every 8 sessions. You see measurable progress in black and white \u2014 or we change the plan, free.'],
      ].map(([icon, title, body]) => `
      <article class="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl mb-4"><i class="fas ${icon}"></i></div>
        <h3 class="font-bold text-lg mb-2">${title}</h3>
        <p class="text-gray-600 text-sm">${body}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [3] SUBJECTS -->
<section id="subjects" class="py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-extrabold mb-6">What We Tutor</h2>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">K\u201312 core subjects plus the tests that open doors.</p>
    <div class="grid md:grid-cols-4 gap-4 text-sm">
      ${['Math (K\u201312 + calculus)', 'Reading & writing', 'SAT / ACT prep', 'Study skills & ADHD support'].map(x => `<div class="bg-orange-50 border border-orange-200 rounded-xl p-4 font-semibold text-orange-900"><i class="fas fa-check text-orange-600 mr-1"></i>${x}</div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Parent Questions</h2>
    <div class="space-y-3">
      ${[
        ['What happens in the free assessment?', 'A 60-minute diagnostic covering skills 2 grade levels down from current placement, plus a parent debrief with the full skills map. It\u2019s yours to keep \u2014 even if you never book a session.'],
        ['How often should my child come?', 'Most students see strong results at 2 sessions per week. Your assessment includes a specific recommendation based on the size of the gap and your timeline.'],
        ['In-person or online \u2014 which works better?', 'Both work when the tutor is right. Younger students usually do better in person; middle school and up do great either way. You can mix and match.'],
        ['What does it cost?', 'Programs are priced per month, not per session, and depend on frequency. You\u2019ll get exact pricing at your assessment debrief \u2014 most families are surprised it\u2019s comparable to a sports club fee.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [5] ASSESS FORM -->
<section id="assess" class="py-20 bg-gradient-to-br from-gray-950 via-blue-950 to-orange-950 text-white">
  <div class="max-w-xl mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Book the Free Skills Assessment</h2>
    <p class="text-gray-300 mb-8">Know exactly where your child stands \u2014 and exactly how to fix it. We\u2019ll text you to schedule.</p>
    <form data-lead-form class="bg-white/10 glass-dark rounded-2xl p-6 space-y-4 text-left">
      <input name="name" required placeholder="Parent / guardian name" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="phone" type="tel" required placeholder="Mobile phone" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="email" type="email" placeholder="Email address" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <div class="grid grid-cols-2 gap-3">
        <select name="grade" class="bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
          <option value="">Student\u2019s grade</option>
          <option>K\u20132</option>
          <option>3\u20135</option>
          <option>6\u20138</option>
          <option>9\u201312</option>
        </select>
        <select name="focus" class="bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
          <option value="">Biggest concern</option>
          <option>Math</option>
          <option>Reading / writing</option>
          <option>SAT / ACT</option>
          <option>Grades overall / motivation</option>
        </select>
      </div>
      <label class="flex items-start gap-2 text-xs text-gray-300"><input type="checkbox" name="smsConsent" class="mt-0.5">I agree to receive automated texts about scheduling and my student\u2019s program. Msg rates may apply. Reply STOP to opt out.</label>
      <button type="submit" class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Book the Assessment \u2192</button>
    </form>
    <p class="mt-6 text-gray-500 text-xs">Results vary by student and program adherence. Average gain based on internal outcomes of students completing one full semester.</p>
  </div>
</section>

<footer class="bg-gray-950 text-gray-400 text-center py-10 text-sm">
  <p class="font-bold text-white mb-1">${bizName}</p>
  <p>${city} \u00b7 1-on-1 ${subject} \u00b7 Free assessment for new families.</p>
</footer>
${templateBadge}
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
<script src="/static/app.js"></script>
</body></html>`
}
