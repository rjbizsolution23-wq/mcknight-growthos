import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const homeServicesTemplate = (q: Record<string, string | undefined>) => {
  const companyName = param(q, 'companyName', 'Summit Roofing & Exteriors')
  const service = param(q, 'service', 'roof replacement')
  const city = param(q, 'city', 'Albuquerque')
  const jobsDone = param(q, 'jobsDone', '4,600+')
  const years = param(q, 'years', '18')
  const warranty = param(q, 'warranty', '25-year')
  const discount = param(q, 'discount', '$750 OFF')
  const phone = param(q, 'phone', '(505) 555-0142')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${companyName} — Free ${service} Estimate`, q)}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 text-white">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center">
    <p class="inline-block bg-red-500/20 text-red-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-house-chimney mr-2"></i>${city}\'s trusted ${service} pros · Licensed &amp; insured</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">Get a Free, No-Pressure ${service.charAt(0).toUpperCase() + service.slice(1)} Estimate — and ${discount} This Month</h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">${companyName}: ${jobsDone} jobs completed across ${city} in ${years} years. Real inspections, honest quotes, ${warranty} workmanship warranty.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8">
      <p class="text-sm text-gray-400 mb-1">${discount} offer expires in:</p>
      <p class="text-3xl font-bold text-red-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="#estimate" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Get My Free Estimate →</a>
      <a href="tel:${phone.replace(/[^0-9+]/g, '')}" class="inline-block border-2 border-gray-600 hover:border-white text-white text-xl font-bold px-10 py-5 rounded-2xl"><i class="fas fa-phone mr-2"></i>${phone}</a>
    </div>
  </div>
</header>

<!-- [2] PAIN -->
<section id="pain" class="py-16 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-10">Why Homeowners Put This Off (Until It Costs Them Thousands)</h2>
    <div class="grid md:grid-cols-2 gap-4 mb-10">
      ${[
        'You\'re dreading the pushy salesman who camps in your living room for 3 hours',
        'You\'ve heard the horror stories: deposits taken, crews that vanish',
        'Quotes that mysteriously grow 40% once the job starts',
        'That small leak or worn spot you\'re ignoring is compounding damage daily',
        'Insurance might cover it — but you have no idea how to navigate the claim',
      ].map(p => `<article class="bg-white rounded-xl p-5 border border-gray-200 flex gap-3"><i class="fas fa-xmark text-red-500 mt-1"></i><p class="text-gray-700">${p}</p></article>`).join('')}
    </div>
    <p class="text-center text-lg text-gray-600">Small ${service} problems become structural problems. The inspection is free — the water damage isn\'t.</p>
  </div>
</section>

<!-- [3] HOW IT WORKS -->
<section id="how" class="py-16">
  <div class="max-w-5xl mx-auto px-4">
    <p class="text-center text-red-600 font-semibold uppercase tracking-wide mb-3">The No-Pressure Process</p>
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-12">From Inspection to Done — Without the Games</h2>
    <div class="grid md:grid-cols-4 gap-6">
      ${[
        ['1. Free Inspection', 'fa-magnifying-glass', 'A certified inspector (not a salesman) documents everything with photos — usually 30–45 minutes.'],
        ['2. Honest Quote', 'fa-file-invoice', 'Line-item pricing in writing, valid 30 days. If a repair beats a replacement, we\'ll tell you.'],
        ['3. Insurance Help', 'fa-umbrella', 'Storm damage? We document the claim properly and meet your adjuster on site.'],
        ['4. Done Right', 'fa-circle-check', `Certified crew, job-site protection, magnetic nail sweep, final walkthrough — backed by our ${warranty} workmanship warranty.`],
      ].map(([t, i, d]) => `
      <article class="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
        <i class="fas ${i} text-3xl text-red-600 mb-4"></i>
        <h3 class="font-bold text-base mb-2">${t}</h3>
        <p class="text-gray-600 text-sm">${d}</p>
      </article>`).join('')}
    </div>
    <div class="mt-10 grid md:grid-cols-4 gap-4 text-center">
      ${[
        [jobsDone, 'jobs completed'],
        [`${years} yrs`, `serving ${city}`],
        [warranty, 'workmanship warranty'],
        ['A+', 'BBB rating*'],
      ].map(([n, l]) => `<div class="bg-red-50 rounded-2xl p-5 border border-red-100"><p class="text-3xl font-extrabold text-red-700">${n}</p><p class="text-xs text-gray-500 mt-1">${l}</p></div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] SOCIAL PROOF -->
<section id="proof" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Your Neighbors Already Called Us</h2>
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      ${[
        ['Diane H. · Four Hills', 'The inspector showed me photos of exactly what was wrong — and told me half of what another company quoted me didn\'t actually need replacing. Hired on the spot.'],
        ['Frank & Lupe M. · Westside', 'Storm claim handled start to finish. They met our adjuster, the claim covered nearly everything, and the crew finished in two days. Spotless cleanup.'],
        ['Kevin O. · North Valley', 'Quoted price was the final price. Crew showed up when they said, finished when they said. Do you know how rare that is with contractors?'],
      ].map(([n, t]) => `
      <article class="bg-white rounded-2xl p-6 border border-gray-200">
        <div class="text-orange-400 mb-3">${'<i class="fas fa-star"></i>'.repeat(5)}</div>
        <p class="text-gray-700 text-sm mb-4">"${t}"</p>
        <p class="font-semibold text-sm">${n}</p>
      </article>`).join('')}
    </div>
    <p class="text-xs text-gray-500 text-center max-w-2xl mx-auto">*Example reviews and ratings for template purposes — replace with your own verified reviews, license numbers, and ratings before publishing.</p>
  </div>
</section>

<!-- [5] ESTIMATE FORM -->
<section id="estimate" class="py-16">
  <div class="max-w-3xl mx-auto px-4">
    <div class="rounded-3xl border-4 border-orange-500 p-8 md:p-10 shadow-xl">
      <h2 class="text-3xl font-extrabold text-center mb-2">Claim Your Free Estimate + ${discount}</h2>
      <p class="text-center text-gray-600 mb-8">30–45 minute inspection · written line-item quote · zero pressure, zero obligation.</p>
      <form class="space-y-4" data-lead-form>
        <div class="grid md:grid-cols-2 gap-4">
          <input required placeholder="Full Name" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
          <input required type="tel" placeholder="Phone" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
        </div>
        <input required placeholder="Property Address" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
        <select required class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-600">
          <option value="">What do you need?</option><option>Full replacement estimate</option><option>Repair estimate</option><option>Storm damage inspection / insurance claim</option><option>Not sure — need an inspection</option>
        </select>
        <label class="flex gap-3 text-xs text-gray-500 items-start">
          <input type="checkbox" required class="mt-0.5">
          <span>I agree to receive calls/texts about my estimate request from ${companyName} at the number provided, including via automated technology. Consent is not a condition of purchase. Reply STOP to opt out.</span>
        </label>
        <button class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Book My Free Inspection →</button>
        <p class="text-xs text-gray-500 text-center">Most inspections scheduled within 48 hours. ${discount} applied to qualifying projects booked this month.</p>
      </form>
    </div>
  </div>
</section>

<!-- [6] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">What ${city} Homeowners Ask Us</h2>
    <div class="space-y-3">
      ${[
        ['Is the estimate really free — and really no-pressure?', 'Yes and yes. You get a written, line-item quote valid for 30 days. Take it, compare it, sleep on it. Our inspectors are paid to inspect, not to close you in your kitchen.'],
        ['How do I know I need a replacement and not a repair?', 'You don\'t — that\'s the inspection\'s job. Roughly a third of the inspections we run end in a repair recommendation, not a replacement. We\'ll show you photos either way.'],
        ['Will insurance cover my project?', 'If the damage is storm-related, often yes. We document everything the way adjusters need to see it and will meet your adjuster on site. No guarantees — but proper documentation dramatically improves claims.'],
        ['How long does the work take?', 'Most residential projects: 1–3 days once materials arrive. You get a schedule in writing before we start, and a daily point of contact during the job.'],
        [`What does the ${warranty} warranty cover?`, 'Our workmanship — meaning if it fails because of how we installed it, we fix it, free, for the full term. Manufacturer material warranties apply on top of that. Both in writing.'],
        ['Do you require a big deposit?', 'No large upfront deposits. Payment is tied to project milestones, in writing, and we\'re fully licensed, bonded, and insured — verify us before you sign anything (we\'ll hand you the license numbers).'],
        ['Do you offer financing?', 'Yes — multiple financing options, including deferred-interest plans for qualifying homeowners. Ask during your estimate; approval takes minutes.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [7] FINAL CTA -->
<section id="final-cta" class="py-20 bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 text-white text-center">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl md:text-5xl font-extrabold mb-6">The Damage Compounds Daily. The Inspection Is Free.</h2>
    <p class="text-gray-300 text-lg mb-4">${discount} on qualifying projects — expires with the timer.</p>
    <p class="text-3xl font-bold text-red-400 font-mono mb-8" data-countdown="${deadline}">--</p>
    <a href="#estimate" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl mb-6">Book My Free Inspection →</a>
    <p class="text-sm text-gray-400"><i class="fas fa-phone mr-1"></i>Or call now: ${phone}</p>
  </div>
</section>

<footer class="bg-gray-950 text-gray-500 text-xs text-center py-8 px-4">
  <p class="mb-2">${companyName} · Serving ${city} and surrounding areas · ${phone} · Licensed, Bonded &amp; Insured</p>
  <p class="max-w-2xl mx-auto">Add your state contractor license number(s) here before publishing. Offer valid for qualifying projects only; cannot be combined with other offers. Example reviews and stats are template placeholders — replace with verified data.</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
</body>
</html>`
}
