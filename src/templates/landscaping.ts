import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const landscapingTemplate = (q: Record<string, string | undefined>) => {
  const company = param(q, 'company', 'Desert Bloom Landscaping')
  const city = param(q, 'city', 'Albuquerque')
  const service = param(q, 'service', 'landscape design & maintenance')
  const offer = param(q, 'offer', 'Free Design Consultation + 3D Rendering')
  const offerValue = param(q, 'offerValue', '$450')
  const projectCount = param(q, 'projectCount', '1,200+')
  const years = param(q, 'years', '15')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${company} — Free Landscape Design Consultation in ${city}`, q, { desc: `${company}: ${service} in ${city}. ${offer} (${offerValue} value) — see your dream yard before you spend a dime. ${projectCount} projects, ${years} years.`, type: 'LandscapingBusiness' })}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="relative bg-gradient-to-br from-gray-950 via-green-950 to-lime-950 text-white overflow-hidden">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center relative z-10">
    <p class="inline-block bg-lime-500/20 text-lime-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-leaf mr-2"></i>${city} \u00b7 ${projectCount} yards transformed \u00b7 ${years} years</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${offer} <span class="text-lime-300 text-3xl md:text-4xl">(${offerValue} value)</span></h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">See your finished yard in a photo-real 3D rendering <em>before</em> you commit a dollar. If you don\u2019t love the design, you owe nothing \u2014 and you keep the rendering.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8 glass-dark">
      <p class="text-sm text-gray-400 mb-1">Free design slots this month close in:</p>
      <p class="text-3xl font-bold text-lime-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div><a href="#quote" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Get My Free Design \u2192</a></div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-shield-halved text-lime-400 mr-1"></i>Licensed & insured \u00b7 2-year workmanship warranty</p>
  </div>
</header>

<!-- [2] WHY -->
<section id="why" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-3">Most Landscapers Guess. We Show You First.</h2>
    <p class="text-center text-gray-600 mb-10 max-w-2xl mx-auto">The #1 fear in landscaping: spending $20K and hating the result. Our design-first process makes that impossible.</p>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['fa-cube', 'See It Before You Buy It', 'Photo-real 3D rendering of YOUR yard with your actual house \u2014 walk through it, change it, approve it before a single shovel hits dirt.'],
        ['fa-droplet', 'Water-Smart by Design', 'Xeriscape-first designs cut water bills 40\u201360% while staying lush \u2014 native plants that thrive here, not struggle here.'],
        ['fa-calendar-check', 'On Time, On Budget \u2014 in Writing', 'Fixed-price contracts with a start date and completion date. Late without cause? We discount 5% per week. That\u2019s in the contract.'],
      ].map(([icon, title, body]) => `
      <article class="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-lime-100 text-lime-700 flex items-center justify-center text-2xl mb-4"><i class="fas ${icon}"></i></div>
        <h3 class="font-bold text-lg mb-2">${title}</h3>
        <p class="text-gray-600 text-sm">${body}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [3] SERVICES -->
<section id="services" class="py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-extrabold mb-6">Full-Service, Start to Stunning</h2>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">Design, build, and keep-it-beautiful maintenance \u2014 one crew accountable for all of it.</p>
    <div class="grid md:grid-cols-4 gap-4 text-sm">
      ${['Landscape design + 3D', 'Pavers, patios & pergolas', 'Irrigation & drainage', 'Artificial turf & xeriscape'].map(x => `<div class="bg-lime-50 border border-lime-200 rounded-xl p-4 font-semibold text-lime-900"><i class="fas fa-check text-lime-600 mr-1"></i>${x}</div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Before We Break Ground</h2>
    <div class="space-y-3">
      ${[
        ['Is the design consultation really free?', `Yes \u2014 including the 3D rendering (${offerValue} value). We only earn when you love the design enough to build it. No pressure, no obligation, and the rendering is yours either way.`],
        ['What does a typical project cost?', 'Front-yard refreshes typically start around $5K; full outdoor-living transformations run $15K\u201360K+. Your rendering comes with a fixed line-item quote \u2014 no allowances, no surprises.'],
        ['Do you offer financing?', 'Yes \u2014 12-month same-as-cash and longer-term options through our lending partners, with approval in minutes.'],
        ['How long does a project take?', 'Most builds finish in 1\u20133 weeks once materials arrive. Your contract includes the exact schedule \u2014 with the late-penalty clause in your favor.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [5] QUOTE FORM -->
<section id="quote" class="py-20 bg-gradient-to-br from-gray-950 via-green-950 to-lime-950 text-white">
  <div class="max-w-xl mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Get Your Free Design + 3D Rendering</h2>
    <p class="text-gray-300 mb-8">Tell us about your yard \u2014 we\u2019ll text you to schedule your on-site consultation.</p>
    <form data-lead-form class="bg-white/10 glass-dark rounded-2xl p-6 space-y-4 text-left">
      <input name="name" required placeholder="Full name" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="phone" type="tel" required placeholder="Mobile phone" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="address" placeholder="Property address or neighborhood" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <select name="project" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
        <option value="">What are you dreaming of?</option>
        <option>Full yard transformation</option>
        <option>Patio / outdoor living space</option>
        <option>Xeriscape / water-smart conversion</option>
        <option>Artificial turf</option>
        <option>Ongoing maintenance</option>
      </select>
      <label class="flex items-start gap-2 text-xs text-gray-300"><input type="checkbox" name="smsConsent" class="mt-0.5">I agree to receive automated texts to schedule my consultation. Msg rates may apply. Reply STOP to opt out.</label>
      <button type="submit" class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Claim My Free Design \u2192</button>
    </form>
  </div>
</section>

<footer class="bg-gray-950 text-gray-400 text-center py-10 text-sm">
  <p class="font-bold text-white mb-1">${company}</p>
  <p>${city} \u00b7 ${service} \u00b7 Licensed & insured \u00b7 Free design offer for homeowners, one per property.</p>
</footer>
${templateBadge}
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
<script src="/static/app.js"></script>
</body></html>`
}
