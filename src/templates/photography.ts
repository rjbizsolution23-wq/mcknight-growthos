import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const photographyTemplate = (q: Record<string, string | undefined>) => {
  const studio = param(q, 'studio', 'Golden Hour Studios')
  const photographer = param(q, 'photographer', 'Elena Vasquez')
  const city = param(q, 'city', 'Albuquerque')
  const specialty = param(q, 'specialty', 'family, branding & wedding photography')
  const offer = param(q, 'offer', 'Mini Session + 5 Edited Images')
  const offerPrice = param(q, 'offerPrice', '$149')
  const offerValue = param(q, 'offerValue', '$425')
  const sessionCount = param(q, 'sessionCount', '2,100+')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${studio} — ${offerPrice} Mini Session in ${city}`, q, { desc: `${studio}: ${specialty} in ${city}. Limited ${offer} for ${offerPrice} (${offerValue} value) by ${photographer}. ${sessionCount} sessions shot.`, type: 'ProfessionalService' })}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="relative bg-gradient-to-br from-gray-950 via-zinc-900 to-yellow-950 text-white overflow-hidden">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center relative z-10">
    <p class="inline-block bg-yellow-500/20 text-yellow-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-camera-retro mr-2"></i>${city} \u00b7 ${specialty} \u00b7 ${sessionCount} sessions</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${offer} \u2014 ${offerPrice} <span class="text-yellow-300 text-3xl md:text-4xl">(${offerValue} value)</span></h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">The photos on your phone are fine. But "fine" isn\u2019t what you\u2019ll frame, print, or remember them by. Limited mini sessions with ${photographer} \u2014 real editing, real prints, real keepsakes.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8 glass-dark">
      <p class="text-sm text-gray-400 mb-1">Mini session booking closes in:</p>
      <p class="text-3xl font-bold text-yellow-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div><a href="#book" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Reserve My Session \u2192</a></div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-images text-yellow-400 mr-1"></i>Gallery delivered in 7 days \u00b7 Print rights included</p>
  </div>
</header>

<!-- [2] WHY -->
<section id="why" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-3">Why These Sessions Book Out Every Time</h2>
    <p class="text-center text-gray-600 mb-10 max-w-2xl mx-auto">A full custom shoot is an investment. Mini sessions are the smart way in \u2014 same photographer, same editing, smaller bite.</p>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['fa-wand-magic-sparkles', 'Directed, Not Awkward', `Never know what to do with your hands? ${photographer} directs every pose and candid moment \u2014 you just show up. Kids and camera-shy partners welcome.`],
        ['fa-palette', 'Signature Editing Included', 'Every delivered image is hand-edited \u2014 skin, light, color \u2014 the same treatment as full-price sessions. No raw dumps, no filters.'],
        ['fa-print', 'Yours to Print, Forever', 'Full print rights on every delivered image, plus a private online gallery to share with family. Heirloom albums and wall art available after.'],
      ].map(([icon, title, body]) => `
      <article class="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center text-2xl mb-4"><i class="fas ${icon}"></i></div>
        <h3 class="font-bold text-lg mb-2">${title}</h3>
        <p class="text-gray-600 text-sm">${body}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [3] SESSIONS -->
<section id="sessions" class="py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-extrabold mb-6">Pick Your Session Style</h2>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">20 minutes, one location, five hand-edited images \u2014 upgrade to more anytime after you see the gallery.</p>
    <div class="grid md:grid-cols-4 gap-4 text-sm">
      ${['Family & kids', 'Personal branding / headshots', 'Couples & engagement', 'Seniors & milestones'].map(x => `<div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 font-semibold text-yellow-900"><i class="fas fa-check text-yellow-600 mr-1"></i>${x}</div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Before You Book</h2>
    <div class="space-y-3">
      ${[
        ['Where do the sessions happen?', 'Choose from our curated outdoor locations at golden hour, or the studio if you prefer controlled light. You\u2019ll pick your slot and location after booking.'],
        ['What should we wear?', 'You\u2019ll get our style guide immediately after booking \u2014 color palettes that photograph beautifully, what to avoid, and outfit combos that work for groups.'],
        ['What if my kids melt down?', 'Then they\u2019re normal kids. We build buffer time, shoot candids through the chaos, and those "in-between" frames are usually the ones parents cry over. Promise.'],
        ['Can I buy more than 5 images?', 'Yes \u2014 after your gallery reveal you can upgrade to the full gallery or add prints and albums. No pressure; the 5 included images are fully yours regardless.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [5] BOOK FORM -->
<section id="book" class="py-20 bg-gradient-to-br from-gray-950 via-zinc-900 to-yellow-950 text-white">
  <div class="max-w-xl mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Reserve Your ${offerPrice} Mini Session</h2>
    <p class="text-gray-300 mb-8">Limited slots per season \u2014 first come, first photographed. We\u2019ll text you the calendar link.</p>
    <form data-lead-form class="bg-white/10 glass-dark rounded-2xl p-6 space-y-4 text-left">
      <input name="name" required placeholder="Full name" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="phone" type="tel" required placeholder="Mobile phone" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="email" type="email" placeholder="Email address" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <select name="sessionType" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
        <option value="">Session type</option>
        <option>Family & kids</option>
        <option>Branding / headshots</option>
        <option>Couples / engagement</option>
        <option>Senior / milestone</option>
      </select>
      <label class="flex items-start gap-2 text-xs text-gray-300"><input type="checkbox" name="smsConsent" class="mt-0.5">I agree to receive automated texts about my session booking and gallery delivery. Msg rates may apply. Reply STOP to opt out.</label>
      <button type="submit" class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Reserve My Spot \u2192</button>
    </form>
  </div>
</section>

<footer class="bg-gray-950 text-gray-400 text-center py-10 text-sm">
  <p class="font-bold text-white mb-1">${studio} \u00b7 ${photographer}</p>
  <p>${city} \u00b7 ${specialty} \u00b7 Mini session offer subject to slot availability.</p>
</footer>
${templateBadge}
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
<script src="/static/app.js"></script>
</body></html>`
}
