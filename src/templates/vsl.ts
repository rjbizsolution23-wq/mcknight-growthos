import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

// ── VSL (VIDEO SALES LETTER) FUNNEL ────────────────────────────
// videoUrl param accepts YouTube, Vimeo, Loom, Wistia, or direct mp4.
// Optional lead-gate (?gate=1) hides the CTA until the form is submitted.
const videoEmbed = (raw: string): string => {
  const url = raw.trim()
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,20})/)
  if (yt) return `<iframe class="w-full aspect-video rounded-2xl shadow-2xl" src="https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1" title="Video" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>`
  const vm = url.match(/vimeo\.com\/(\d{6,12})/)
  if (vm) return `<iframe class="w-full aspect-video rounded-2xl shadow-2xl" src="https://player.vimeo.com/video/${vm[1]}" title="Video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`
  const loom = url.match(/loom\.com\/(?:share|embed)\/([a-f0-9]{16,40})/)
  if (loom) return `<iframe class="w-full aspect-video rounded-2xl shadow-2xl" src="https://www.loom.com/embed/${loom[1]}" title="Video" allowfullscreen loading="lazy"></iframe>`
  const wistia = url.match(/wistia\.com\/(?:medias|embed\/iframe)\/([\w]{8,14})/)
  if (wistia) return `<iframe class="w-full aspect-video rounded-2xl shadow-2xl" src="https://fast.wistia.net/embed/iframe/${wistia[1]}" title="Video" allowfullscreen loading="lazy"></iframe>`
  if (/\.(mp4|webm|mov)(\?|$)/i.test(url)) return `<video class="w-full aspect-video rounded-2xl shadow-2xl bg-black" controls playsinline preload="metadata"><source src="${url}"></video>`
  // Placeholder when no valid video yet
  return `<div class="w-full aspect-video rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900 to-blue-950 flex flex-col items-center justify-center text-white">
    <i class="fas fa-circle-play text-6xl text-amber-400 mb-4"></i>
    <p class="font-bold">Your VSL Goes Here</p>
    <p class="text-xs text-gray-400 mt-1">Set ?videoUrl= (YouTube · Vimeo · Loom · Wistia · direct .mp4)</p>
  </div>`
}

export const vslTemplate = (q: Record<string, string | undefined>) => {
  const headline = param(q, 'headline', 'Watch: How We Add $30K+/Month To Service Businesses With One Automated System')
  const subhead = param(q, 'subhead', 'This short video breaks down the entire system — watch it before we take it down.')
  const videoUrl = q.videoUrl && q.videoUrl.trim() ? q.videoUrl.trim() : ''
  const cta = param(q, 'cta', 'Book My Free Strategy Call')
  const ctaUrl = param(q, 'ctaUrl', '#vsl-form')
  const offer = param(q, 'offer', 'a free 30-minute strategy session where we map this exact system onto YOUR business')
  const proof1 = param(q, 'proof1', 'Tax firm: 214 qualified leads in 60 days')
  const proof2 = param(q, 'proof2', 'Credit repair: $18K/mo recurring within one quarter')
  const proof3 = param(q, 'proof3', 'Event brand: sold out 400 seats + 5-figure sponsors')
  const host = param(q, 'host', 'Jordan McKnight')
  const gate = q.gate === '1'
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()
  const webinarId = q.webinar && q.webinar.trim() ? q.webinar.trim().replace(/[^A-Za-z0-9_-]/g, '') : ''

  return `${funnelHead(headline, q, { desc: subhead })}
<body class="bg-gray-950 text-white">

<!-- [1] VSL HERO -->
<header id="hero" class="pt-12 pb-8 px-4 text-center">
  <div class="max-w-4xl mx-auto">
    <p class="inline-block bg-amber-500/15 text-amber-400 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider"><i class="fas fa-video mr-2"></i>Free Training Video · Limited Availability</p>
    <h1 class="text-3xl md:text-5xl font-extrabold leading-tight mb-4">${headline}</h1>
    <p class="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">${subhead}</p>
  </div>
  <div class="max-w-4xl mx-auto">
    ${videoEmbed(videoUrl)}
  </div>
  <div class="max-w-4xl mx-auto mt-8">
    ${gate ? `
    <p class="text-gray-400 text-sm mb-3"><i class="fas fa-arrow-down mr-1 text-amber-400"></i>Enter your details below to unlock the next step</p>` : `
    <a href="${ctaUrl}" class="pulse-glow inline-block bg-amber-500 hover:bg-amber-600 text-gray-950 text-xl font-extrabold px-10 py-5 rounded-2xl">${cta} →</a>
    <p class="mt-4 text-xs text-gray-500"><i class="fas fa-clock mr-1"></i>Availability closes in <span class="font-mono text-amber-400" data-countdown="${deadline}">--</span></p>`}
  </div>
</header>

<!-- [2] PROOF STRIP -->
<section id="proof" class="py-12 bg-white/5 border-y border-white/10">
  <div class="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-center">
    ${[proof1, proof2, proof3].map(p => `
    <article class="bg-white/5 rounded-2xl p-6 border border-white/10">
      <i class="fas fa-chart-line text-emerald-400 text-2xl mb-3"></i>
      <p class="text-gray-200 font-semibold">${p}</p>
    </article>`).join('')}
  </div>
  <p class="text-center text-[11px] text-gray-500 mt-6 px-4">Results shown are examples, not guarantees. Replace with your own verified case studies before publishing.</p>
</section>

<!-- [3] THE OFFER + FORM -->
<section id="offer" class="py-16">
  <div class="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
    <div>
      <p class="text-amber-400 font-semibold uppercase tracking-wide text-sm mb-3">Here's What Happens Next</p>
      <h2 class="text-3xl md:text-4xl font-extrabold mb-5">When you're ready, the next step is ${offer}.</h2>
      <ul class="space-y-3 text-gray-300 text-sm mb-6">
        <li class="flex gap-3"><i class="fas fa-check text-emerald-400 mt-1"></i>We audit your current funnel (or lack of one) — no judgment</li>
        <li class="flex gap-3"><i class="fas fa-check text-emerald-400 mt-1"></i>We map the exact system from the video onto your business</li>
        <li class="flex gap-3"><i class="fas fa-check text-emerald-400 mt-1"></i>You leave with the blueprint whether we work together or not</li>
      </ul>
      <p class="text-gray-400 text-sm"><i class="fas fa-user-tie mr-2 text-amber-400"></i>Hosted personally by ${host} — not a sales rep.</p>
    </div>

    <form id="vsl-form" class="bg-white text-gray-900 rounded-3xl p-8 shadow-2xl" data-lead-form>
      <h3 class="font-extrabold text-2xl text-center mb-5">${cta}</h3>
      <input type="hidden" name="funnel" value="vsl">
      ${webinarId ? `<input type="hidden" name="_webinar" value="${webinarId}">` : ''}
      <div class="grid grid-cols-2 gap-3 mb-3">
        <input required name="firstName" placeholder="First Name" class="border border-gray-300 rounded-lg px-3 py-3 text-sm w-full">
        <input name="lastName" placeholder="Last Name" class="border border-gray-300 rounded-lg px-3 py-3 text-sm w-full">
      </div>
      <input required type="email" name="email" placeholder="Best Email" class="border border-gray-300 rounded-lg px-3 py-3 text-sm w-full mb-3">
      <input required type="tel" name="phone" placeholder="Phone" class="border border-gray-300 rounded-lg px-3 py-3 text-sm w-full mb-3">
      <textarea name="goal" placeholder="What's the #1 thing you want this system to do for your business?" rows="2" class="border border-gray-300 rounded-lg px-3 py-3 text-sm w-full mb-4"></textarea>
      <button class="pulse-glow w-full bg-amber-500 hover:bg-amber-600 text-gray-950 font-extrabold py-4 rounded-xl text-lg">${cta} →</button>
      <p class="text-center text-[11px] text-gray-400 mt-4"><i class="fas fa-lock mr-1"></i>Your info stays private. By submitting you consent to be contacted about your request.</p>
    </form>
  </div>
</section>

<!-- [4] FINAL CTA -->
<section id="final-cta" class="py-16 text-center bg-gradient-to-br from-blue-950 via-gray-950 to-gray-950 border-t border-white/10">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">The Video Comes Down Soon. The System Doesn't Wait.</h2>
    <p class="text-gray-400 mb-6">Every week without a working funnel is pipeline you never get back.</p>
    <p class="text-2xl font-bold text-amber-400 font-mono mb-8" data-countdown="${deadline}">--</p>
    <a href="#vsl-form" class="pulse-glow inline-block bg-amber-500 hover:bg-amber-600 text-gray-950 text-xl font-extrabold px-10 py-5 rounded-2xl">${cta} →</a>
  </div>
</section>

<footer class="bg-black text-gray-600 text-xs text-center py-8 px-4">
  <p class="mb-2">Built with McKnight GrowthOS · Powered by RJ Business Solutions · 1342 NM 333, Tijeras, New Mexico 87059</p>
  <p class="max-w-2xl mx-auto">This page is a template — replace all example claims, case studies, and numbers with your own verified data before publishing.</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
</body>
</html>`
}
