import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

// ── WEBINAR REGISTRATION FUNNEL ────────────────────────────────
// Linked to Zoom via ?webinar=<zoom_id> (or auto-linked when a webinar
// row in D1 has funnel='webinar-live'). On submit, /api/lead auto-registers
// the lead with Zoom and returns their unique join_url.
export const webinarLiveTemplate = (q: Record<string, string | undefined>) => {
  const headline = param(q, 'headline', 'The Client-Getting System Nobody Is Teaching (Live Training)')
  const subhead = param(q, 'subhead', 'A free live masterclass showing you the exact funnel + follow-up machine that turns cold traffic into booked calls — without ads guesswork or tech overwhelm.')
  const host = param(q, 'host', 'Jordan McKnight')
  const hostCred = param(q, 'hostCred', 'Founder, McKnight Opportunity Group — builder of GrowthOS, the conversion platform behind tax, credit, and event businesses nationwide')
  const date = param(q, 'date', 'This Thursday')
  const time = param(q, 'time', '7:00 PM Central')
  const durationTxt = param(q, 'durationTxt', '60 minutes + live Q&A')
  const seats = param(q, 'seats', '200')
  const bullet1 = param(q, 'bullet1', 'The 5-stage pipeline that converts strangers into booked appointments on autopilot')
  const bullet2 = param(q, 'bullet2', 'Why 90% of funnels leak money at the follow-up stage — and the 6-touch fix')
  const bullet3 = param(q, 'bullet3', 'The exact tech stack (all edge-native, all affordable) we deploy for every client')
  const cta = param(q, 'cta', 'Save My Free Seat')
  const webinarId = q.webinar && q.webinar.trim() ? q.webinar.trim().replace(/[^A-Za-z0-9_-]/g, '') : ''
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(headline, q, { desc: subhead, faq: [
    { q: 'Is this webinar really free?', a: 'Yes — 100% free live training. Register and you\'ll receive your unique join link instantly.' },
    { q: 'Will there be a replay?', a: 'Live attendees get priority. A limited-time replay may be sent to registrants, but the live Q&A is live-only.' },
    { q: 'Who is this training for?', a: 'Business owners, agencies, coaches, and service providers who want a predictable client acquisition system.' },
  ]})}
<body class="bg-white text-gray-900">

<!-- [1] HERO + REGISTRATION -->
<header id="hero" class="bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white">
  <div class="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-center">
    <div>
      <p class="inline-block bg-red-500/20 text-red-400 text-sm font-bold px-4 py-1.5 rounded-full mb-5 animate-pulse"><i class="fas fa-circle text-[8px] mr-2 align-middle"></i>FREE LIVE TRAINING · ${date} @ ${time}</p>
      <h1 class="text-3xl md:text-5xl font-extrabold leading-tight mb-5">${headline}</h1>
      <p class="text-lg text-gray-300 mb-6">${subhead}</p>
      <ul class="space-y-3 mb-6 text-gray-200 text-sm">
        <li class="flex gap-3"><i class="fas fa-check-circle text-amber-400 mt-0.5"></i><span><strong>Secret #1:</strong> ${bullet1}</span></li>
        <li class="flex gap-3"><i class="fas fa-check-circle text-amber-400 mt-0.5"></i><span><strong>Secret #2:</strong> ${bullet2}</span></li>
        <li class="flex gap-3"><i class="fas fa-check-circle text-amber-400 mt-0.5"></i><span><strong>Secret #3:</strong> ${bullet3}</span></li>
      </ul>
      <div class="bg-white/5 border border-white/10 rounded-2xl p-4 inline-block">
        <p class="text-xs text-gray-400 mb-1">Registration closes in:</p>
        <p class="text-2xl font-bold text-amber-400 font-mono" data-countdown="${deadline}">--</p>
      </div>
    </div>

    <form id="webinar-form" class="bg-white text-gray-900 rounded-3xl p-8 shadow-2xl" data-lead-form>
      <p class="text-center text-xs font-bold text-blue-700 uppercase tracking-wider mb-2"><i class="fas fa-video mr-1"></i>Reserve Your Seat — 100% Free</p>
      <h2 class="font-extrabold text-2xl text-center mb-5">Register For The Live Training</h2>
      <input type="hidden" name="funnel" value="webinar-live">
      ${webinarId ? `<input type="hidden" name="_webinar" value="${webinarId}">` : ''}
      <div class="grid grid-cols-2 gap-3 mb-3">
        <input required name="firstName" placeholder="First Name" class="border border-gray-300 rounded-lg px-3 py-3 text-sm w-full">
        <input name="lastName" placeholder="Last Name" class="border border-gray-300 rounded-lg px-3 py-3 text-sm w-full">
      </div>
      <input required type="email" name="email" placeholder="Best Email (join link sent here)" class="border border-gray-300 rounded-lg px-3 py-3 text-sm w-full mb-3">
      <input type="tel" name="phone" placeholder="Mobile (optional — SMS reminder)" class="border border-gray-300 rounded-lg px-3 py-3 text-sm w-full mb-4">
      <button class="pulse-glow w-full bg-amber-500 hover:bg-amber-600 text-gray-950 font-extrabold py-4 rounded-xl text-lg">${cta} →</button>
      <div id="join-link-box" class="hidden mt-4 bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-center">
        <p class="font-bold text-emerald-800 mb-1"><i class="fas fa-check-circle mr-1"></i>You're registered!</p>
        <p class="text-sm text-emerald-700 mb-2">Your unique join link:</p>
        <a id="join-link" href="#" target="_blank" rel="noopener" class="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm break-all">Join The Webinar →</a>
      </div>
      <p class="text-center text-[11px] text-gray-400 mt-4"><i class="fas fa-lock mr-1"></i>Your info is safe. ${seats} seats — first come, first served. By registering you agree to receive event reminders.</p>
    </form>
  </div>
</header>

<!-- [2] WHAT YOU'LL LEARN -->
<section id="learn" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-3">In ${durationTxt}, You'll Walk Away With</h2>
    <p class="text-center text-gray-500 mb-10">No fluff. No 45-minute life story. Systems you can deploy the same week.</p>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['fa-diagram-project', 'A Complete Funnel Map', bullet1],
        ['fa-envelopes-bulk', 'The Follow-Up Machine', bullet2],
        ['fa-layer-group', 'The Exact Tech Stack', bullet3],
      ].map(([icon, t, d]) => `
      <article class="bg-white rounded-2xl border border-gray-200 p-6 text-center">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-blue-600/10 text-blue-700 flex items-center justify-center text-xl mb-4"><i class="fas ${icon}"></i></div>
        <h3 class="font-bold text-lg mb-2">${t}</h3>
        <p class="text-gray-600 text-sm">${d}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [3] HOST -->
<section id="host" class="py-16">
  <div class="max-w-4xl mx-auto px-4 grid md:grid-cols-3 gap-8 items-center">
    <div class="md:col-span-1 text-center">
      <div class="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-5xl font-extrabold shadow-xl">${host.split(' ').map(w => w[0] || '').join('').slice(0, 2)}</div>
    </div>
    <div class="md:col-span-2">
      <p class="text-blue-600 font-semibold uppercase tracking-wide text-sm mb-2">Your Host</p>
      <h2 class="text-3xl font-extrabold mb-3">${host}</h2>
      <p class="text-gray-600 mb-4">${hostCred}</p>
      <p class="text-gray-700">This is the same live training format we run for private clients — opened to the public for one session. Bring questions: the last segment is open Q&A, and nothing is off-limits.</p>
    </div>
  </div>
</section>

<!-- [4] FINAL CTA -->
<section id="final-cta" class="py-20 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white text-center">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl md:text-5xl font-extrabold mb-4">${date} @ ${time} — Don't Watch The Replay Economy Pass You By</h2>
    <p class="text-gray-300 text-lg mb-6">${seats} seats. Live Q&A. Deployable systems. Zero cost.</p>
    <p class="text-2xl font-bold text-amber-400 font-mono mb-8" data-countdown="${deadline}">--</p>
    <a href="#webinar-form" class="pulse-glow inline-block bg-amber-500 hover:bg-amber-600 text-gray-950 text-xl font-extrabold px-10 py-5 rounded-2xl">${cta} →</a>
  </div>
</section>

<footer class="bg-gray-950 text-gray-500 text-xs text-center py-8 px-4">
  <p class="mb-2">Hosted with McKnight GrowthOS · Powered by RJ Business Solutions · 1342 NM 333, Tijeras, New Mexico 87059</p>
  <p class="max-w-2xl mx-auto">This page is a template — replace example claims and host details with your own verified information before publishing. Zoom is a trademark of Zoom Video Communications, Inc.</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
<script>
// Webinar-specific: surface the unique Zoom join link returned by /api/lead
(function () {
  var form = document.getElementById('webinar-form')
  if (!form || !window.fetch) return
  var origFetch = window.fetch
  window.fetch = function (url, opts) {
    var p = origFetch.apply(this, arguments)
    if (typeof url === 'string' && url.indexOf('/api/lead') !== -1 && opts && opts.method === 'POST') {
      p.then(function (r) { return r.clone().json().catch(function () { return null }) }).then(function (d) {
        if (d && d.joinUrl) {
          var box = document.getElementById('join-link-box')
          var a = document.getElementById('join-link')
          if (box && a) { a.href = d.joinUrl; box.classList.remove('hidden'); box.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
        }
      }).catch(function () {})
    }
    return p
  }
})()
</script>
</body>
</html>`
}
