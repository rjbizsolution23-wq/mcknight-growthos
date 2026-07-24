// ── v6.8: "Get GrowthOS" — the funnel that sells the model itself ──
// The destination for every GTM channel (see /docs?doc=GTM-SALES-PLAN.md §8).
// 3 pricing tiers (Launch / Growth Command / Empire), demo-request lead form,
// 48-hour guarantee, stack-replacement math, agency license CTA.
import { param, funnelHead, templateBadge } from './helpers'

export const getGrowthosTemplate = (q: Record<string, string | undefined>) => {
  const headline = param(q, 'headline', 'Your Entire Marketing System. Live in 48 Hours.')
  const subhead = param(q, 'subhead', '42 industry-proven funnels. A full CRM. An AI agent that changes anything you ask in plain English. One dashboard — no developers, no $2,000/mo tool stack.')
  const cta = param(q, 'cta', 'Get My Free Personalized Demo')
  const launchSetup = param(q, 'launchSetup', '$497')
  const launchMo = param(q, 'launchMo', '$97')
  const growthSetup = param(q, 'growthSetup', '$1,497')
  const growthMo = param(q, 'growthMo', '$297')
  const empireSetup = param(q, 'empireSetup', '$4,997')
  const empireMo = param(q, 'empireMo', '$797')
  const guaranteeHours = param(q, 'guaranteeHours', '48')

  return `${funnelHead('GrowthOS — Your Marketing Operating System', q, {
    desc: 'Done-for-you marketing operating system: 42 conversion funnels, built-in CRM, and an AI agent that edits your entire site in plain English. Live in 48 hours.',
    faq: [
      { q: 'How fast will I be live?', a: 'Your funnel is deployed, branded and capturing leads within 48 hours of signup — guaranteed, or your setup fee is refunded.' },
      { q: 'Do I need to know how to build websites?', a: 'No. Everything is done for you. To change anything afterward, you just type what you want in plain English and the AI agent applies it.' },
      { q: 'What does GrowthOS replace?', a: 'Typically a funnel builder ($97–297/mo), a CRM ($50–800/mo), an email tool, scheduling software, and hosting — all in one system.' },
      { q: 'Is my industry covered?', a: '42 funnels are pre-built across 32 industries: tax, credit, mortgage, real estate, law, dental, med-spa, fitness, restaurants, home services, trucking and more.' },
    ],
  })}
<body class="bg-white text-gray-900">

<!-- [1] HERO + DEMO FORM -->
<header id="hero" class="bg-gradient-to-br from-gray-950 via-[#0a1628] to-indigo-950 text-white">
  <div class="max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10 items-center">
    <div>
      <p class="inline-block bg-sky-500/20 text-sky-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-rocket mr-2"></i>McKnight GrowthOS · Marketing Operating System</p>
      <h1 class="text-4xl md:text-5xl font-extrabold leading-tight mb-6">${headline}</h1>
      <p class="text-xl text-gray-300 mb-6">${subhead}</p>
      <ul class="space-y-2.5 text-gray-200 mb-8">
        <li><i class="fas fa-check-circle text-emerald-400 mr-2"></i><strong>Your industry's funnel already exists</strong> — 42 pre-built across 32 industries</li>
        <li><i class="fas fa-check-circle text-emerald-400 mr-2"></i><strong>Type it, watch it change</strong> — the AI Change Agent edits copy, colors &amp; effects on command</li>
        <li><i class="fas fa-check-circle text-emerald-400 mr-2"></i><strong>CRM, pipelines &amp; analytics built in</strong> — cancel the tool stack</li>
        <li><i class="fas fa-check-circle text-emerald-400 mr-2"></i><strong>~50ms page loads</strong> on Cloudflare's global edge — faster than your competitors</li>
      </ul>
      <p class="text-sm text-gray-400"><i class="fas fa-shield-halved text-amber-400 mr-1"></i>Live in ${guaranteeHours} hours or your setup fee back — guaranteed.</p>
    </div>
    <form id="demo-form" class="bg-white text-gray-900 rounded-3xl p-8 shadow-2xl" data-lead-form>
      <h2 class="font-bold text-2xl mb-1">See YOUR business on GrowthOS</h2>
      <p class="text-sm text-gray-500 mb-5">We'll build a live demo funnel with your name, brand and colors on it — free, before you pay anything.</p>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <input required name="firstName" placeholder="First Name" class="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full">
        <input required name="lastName" placeholder="Last Name" class="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full">
      </div>
      <input required name="company" placeholder="Business Name" class="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full mb-3">
      <input required type="email" name="email" placeholder="Email" class="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full mb-3">
      <input required type="tel" name="phone" placeholder="Phone" class="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full mb-3">
      <select name="industry" required class="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full mb-4 text-gray-600">
        <option value="">Your industry…</option>
        <option>Tax / Accounting</option><option>Credit Repair</option><option>Mortgage / Lending</option>
        <option>Real Estate</option><option>Legal</option><option>Dental / Medical / Med-Spa</option>
        <option>Fitness / Wellness</option><option>Restaurant / Hospitality</option>
        <option>Home Services / Contracting</option><option>Trucking / Logistics</option>
        <option>Coaching / Consulting</option><option>Agency (white-label)</option><option>Other</option>
      </select>
      <button class="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-black font-bold py-4 rounded-xl text-lg">${cta} →</button>
      <p class="text-[11px] text-gray-500 mt-4 text-center"><i class="fas fa-lock mr-1"></i>No payment. No obligation. Your demo link arrives within one business day.</p>
    </form>
  </div>
</header>

<!-- [2] STACK MATH -->
<section id="stack-math" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-3">You're Already Paying For This — In Pieces</h2>
    <p class="text-center text-gray-600 mb-10">Add up your current stack. Then look at what one system replaces.</p>
    <div class="grid md:grid-cols-2 gap-8 items-center">
      <div class="space-y-3">
        ${[
          ['Funnel / page builder', '$97–297/mo'],
          ['CRM + pipelines', '$50–800/mo'],
          ['Email marketing tool', '$30–150/mo'],
          ['Scheduling / webinar tool', '$15–79/mo'],
          ['Hosting + maintenance', '$25–100/mo'],
          ['Developer for every change', '$75–150/hr'],
        ].map(([t, p]) => `<div class="flex items-center justify-between bg-white rounded-xl px-5 py-3.5 border border-gray-200"><span class="text-gray-700"><i class="fas fa-xmark text-red-500 mr-3"></i>${t}</span><span class="font-bold text-gray-400 line-through">${p}</span></div>`).join('')}
      </div>
      <div class="bg-[#0a1628] text-white rounded-3xl p-8 text-center">
        <p class="text-amber-400 font-semibold uppercase tracking-wider text-sm mb-2">One System</p>
        <p class="text-5xl font-extrabold mb-2">${growthMo}<span class="text-xl text-gray-400 font-normal">/mo</span></p>
        <p class="text-gray-300 mb-6">Funnels + CRM + email + analytics + AI editing — done for you.</p>
        <a href="#pricing" class="inline-block bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold px-8 py-4 rounded-xl">See Plans →</a>
      </div>
    </div>
  </div>
</section>

<!-- [3] HOW IT WORKS -->
<section id="how" class="py-16">
  <div class="max-w-5xl mx-auto px-4">
    <p class="text-center text-sky-600 font-semibold uppercase tracking-wide mb-3">Live in ${guaranteeHours} Hours</p>
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-12">From "We Should Fix Our Marketing" to Leads — in 3 Steps</h2>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['1. Pick Your Funnel', 'fa-hand-pointer', 'Your industry\'s funnel is already built and proven. We brand it — your logo, colors, offer, copy — while you watch.'],
        ['2. We Wire Everything', 'fa-plug', 'CRM pipeline, lead notifications, follow-up, booking, analytics. Your leads flow into one dashboard from day one.'],
        ['3. Command It in English', 'fa-wand-magic-sparkles', '"Make the headline about our spring special." "Add falling snow." "Feel more luxurious." Type it — the AI applies it. Every change revertible.'],
      ].map(([t, i, d]) => `
      <article class="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
        <i class="fas ${i} text-3xl text-sky-600 mb-4"></i>
        <h3 class="font-bold text-lg mb-2">${t}</h3>
        <p class="text-gray-600 text-sm">${d}</p>
      </article>`).join('')}
    </div>
    <div class="mt-10 grid md:grid-cols-4 gap-4 text-center">
      ${[
        ['42', 'funnels pre-built'],
        ['32', 'industries covered'],
        ['~50ms', 'edge page loads'],
        ['48h', 'to live — guaranteed'],
      ].map(([n, l]) => `<div class="bg-sky-50 rounded-2xl p-5 border border-sky-100"><p class="text-3xl font-extrabold text-sky-700">${n}</p><p class="text-xs text-gray-500 mt-1">${l}</p></div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] THE DIFFERENCE -->
<section id="difference" class="py-16 bg-[#0a1628] text-white">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-3">This Is Not a Website. It's Not a "Funnel Builder."</h2>
    <p class="text-center text-gray-400 mb-12">It's a Marketing Operating System — and the difference shows up in your calendar.</p>
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse min-w-[600px]">
        <thead><tr class="text-left">
          <th class="p-3.5 border border-gray-700 bg-gray-900/60"></th>
          <th class="p-3.5 border border-amber-400 bg-yellow-500/10 text-amber-400 font-extrabold">GrowthOS</th>
          <th class="p-3.5 border border-gray-700 bg-gray-900/60 text-gray-300">DIY Funnel Software</th>
          <th class="p-3.5 border border-gray-700 bg-gray-900/60 text-gray-300">Local Agency</th>
        </tr></thead>
        <tbody class="text-gray-300">
          ${[
            ['Time to live', '48 hours', 'Weeks of DIY', '4–12 weeks'],
            ['Who does the work', 'Done for you', 'You do', 'Agency (slowly)'],
            ['Making changes', 'Type plain English', 'Drag-drop yourself', 'Email &amp; wait days'],
            ['CRM included', 'Built in', 'Extra cost / weak', 'Not included'],
            ['Monthly cost', growthMo + '/mo', '$97–497/mo + tools', '$500–3,000 retainer'],
          ].map(([r, a, b, c2]) => `<tr>
            <td class="p-3.5 border border-gray-700 font-semibold text-white">${r}</td>
            <td class="p-3.5 border border-amber-500/50 bg-yellow-500/5 text-amber-400 font-bold">${a}</td>
            <td class="p-3.5 border border-gray-700">${b}</td>
            <td class="p-3.5 border border-gray-700">${c2}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- [5] PRICING -->
<section id="pricing" class="py-16">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-3">Pick Your Command Level</h2>
    <p class="text-center text-gray-600 mb-10">Every plan is done-for-you and covered by the ${guaranteeHours}-hour guarantee.</p>
    <div class="grid md:grid-cols-3 gap-6 items-start">

      <article id="plan-launch" class="rounded-3xl border border-gray-200 p-8">
        <h3 class="font-bold text-xl mb-1">Launch</h3>
        <p class="text-sm text-gray-500 mb-4">Get in the game this week</p>
        <p class="text-4xl font-extrabold">${launchSetup}<span class="text-base text-gray-500 font-normal"> setup</span></p>
        <p class="text-lg font-bold text-gray-700 mb-5">+ ${launchMo}<span class="text-sm text-gray-500 font-normal">/mo</span></p>
        <ul class="text-sm text-gray-600 space-y-2.5 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>1 industry funnel, fully branded</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Lead capture + instant email alerts</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Custom domain + SSL</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Edge hosting included</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Live in ${guaranteeHours} hours</li>
        </ul>
        <a href="#hero" class="block text-center border-2 border-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-900 hover:text-white">Start With Launch →</a>
      </article>

      <article id="plan-growth" class="rounded-3xl border-4 border-amber-500 p-8 relative shadow-xl">
        <span class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-sm font-bold px-4 py-1 rounded-full">MOST POPULAR</span>
        <h3 class="font-bold text-xl mb-1">Growth Command</h3>
        <p class="text-sm text-gray-500 mb-4">The full operating system</p>
        <p class="text-4xl font-extrabold">${growthSetup}<span class="text-base text-gray-500 font-normal"> setup</span></p>
        <p class="text-lg font-bold text-gray-700 mb-5">+ ${growthMo}<span class="text-sm text-gray-500 font-normal">/mo</span></p>
        <ul class="text-sm text-gray-600 space-y-2.5 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i><strong>Everything in Launch</strong>, plus:</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>3 funnels (main + webinar + event)</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Full CRM: pipelines, tasks, lead scoring</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Email/SMS &amp; CRM integrations wired</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Analytics dashboard + CSV export</li>
          <li><i class="fas fa-star text-amber-500 mr-2"></i>Monthly AI tune-up (Change Agent pass)</li>
        </ul>
        <a href="#hero" class="block text-center bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-black font-bold py-3.5 rounded-xl">Take Command →</a>
      </article>

      <article id="plan-empire" class="rounded-3xl border border-gray-200 p-8 bg-gray-950 text-white">
        <h3 class="font-bold text-xl mb-1 text-amber-400">Empire</h3>
        <p class="text-sm text-gray-400 mb-4">Multi-brand domination</p>
        <p class="text-4xl font-extrabold">${empireSetup}<span class="text-base text-gray-400 font-normal"> setup</span></p>
        <p class="text-lg font-bold text-gray-300 mb-5">+ ${empireMo}<span class="text-sm text-gray-400 font-normal">/mo</span></p>
        <ul class="text-sm text-gray-300 space-y-2.5 mb-8">
          <li><i class="fas fa-check text-emerald-400 mr-2"></i><strong>Everything in Growth Command</strong>, plus:</li>
          <li><i class="fas fa-check text-emerald-400 mr-2"></i>Up to 10 funnels / multi-brand fleet</li>
          <li><i class="fas fa-check text-emerald-400 mr-2"></i>Webinar engine configured (Zoom)</li>
          <li><i class="fas fa-check text-emerald-400 mr-2"></i>Traffic campaigns + UTM attribution</li>
          <li><i class="fas fa-check text-emerald-400 mr-2"></i>Quarterly strategy call</li>
          <li><i class="fas fa-check text-emerald-400 mr-2"></i>Priority AI change requests</li>
        </ul>
        <a href="#hero" class="block text-center border-2 border-amber-400 text-amber-400 font-bold py-3.5 rounded-xl hover:bg-yellow-500/10">Build My Empire →</a>
      </article>
    </div>

    <div id="agency-license" class="mt-10 bg-indigo-50 border border-indigo-200 rounded-2xl p-6 md:flex items-center justify-between gap-6">
      <div>
        <p class="font-bold text-indigo-900 text-lg"><i class="fas fa-briefcase mr-2"></i>Run an agency? White-label GrowthOS.</p>
        <p class="text-sm text-indigo-800/80 mt-1">Deliver $5K funnel builds in 48 hours at 90% margin — your brand, our engine. Includes API + MCP access for your own AI tooling.</p>
      </div>
      <a href="#hero" class="inline-block mt-4 md:mt-0 shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl text-sm">Ask About Agency Licensing →</a>
    </div>
  </div>
</section>

<!-- [6] GUARANTEE -->
<section id="guarantee" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4 text-center">
    <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-yellow-400 mb-6"><i class="fas fa-shield-halved text-3xl text-black"></i></div>
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">The Double Guarantee</h2>
    <p class="text-lg text-gray-700 mb-2"><strong>1. Live in ${guaranteeHours} hours</strong> — or your setup fee comes back. Every dollar.</p>
    <p class="text-lg text-gray-700 mb-6"><strong>2. Outperform your current site in 90 days</strong> — or we work free until it does.</p>
    <p class="text-sm text-gray-500">You risk nothing. Your data exports anytime with one click — you're never locked in, never hostage.</p>
  </div>
</section>

<!-- [7] FAQ -->
<section id="faq" class="py-16">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Straight Answers</h2>
    <div class="space-y-4">
      ${[
        ['I already have a website — do I need this?', 'Keep it. GrowthOS is the lead machine your website never was — we can even link them together. Ask yourself: how many booked calls did your site produce last month?'],
        ['How is this different from ClickFunnels or GoHighLevel?', 'Those are toolboxes — powerful if you (or someone you hire) swing the hammers. GrowthOS is done-for-you: your industry\'s funnel pre-built, deployed in 48 hours, and edited afterward by typing plain English. We integrate WITH GoHighLevel if you already use it.'],
        ['Can I make changes myself?', 'Better — you command them. Type "make the headline about our spring special" and it\'s done in seconds. Every change is versioned and revertible with one click.'],
        ['What if you disappear?', 'It runs on Cloudflare\'s global network — the same infrastructure Fortune 500s use. Your leads export to CSV anytime, and the entire platform is documented publicly.'],
        ['What do I need to provide?', 'Your logo, your offer, and 20 minutes for the kickoff call. We handle everything else.'],
      ].map(([qq, a]) => `
      <details class="bg-gray-50 border border-gray-200 rounded-xl p-5 group">
        <summary class="font-bold cursor-pointer list-none flex justify-between items-center">${qq}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [8] FINAL CTA -->
<section id="final-cta" class="py-20 bg-gradient-to-br from-gray-950 via-[#0a1628] to-indigo-950 text-white text-center">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl md:text-5xl font-extrabold mb-6">Your Competitors' Websites Are Asleep.<br>Yours Is About to Go Hunting.</h2>
    <p class="text-gray-300 text-lg mb-8">Request your free personalized demo — see your business live on GrowthOS before you spend a dollar.</p>
    <a href="#hero" class="pulse-glow inline-block bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xl font-bold px-10 py-5 rounded-2xl mb-6">${cta} →</a>
    <p class="text-sm text-gray-400"><i class="fas fa-check mr-1"></i>Free demo · <i class="fas fa-check mx-1"></i>Live in ${guaranteeHours}h · <i class="fas fa-check mx-1"></i>Setup fee guaranteed</p>
  </div>
</section>

<footer class="bg-gray-950 text-gray-500 text-xs text-center py-8 px-4">
  <p class="mb-2">McKnight GrowthOS · A McKnight Opportunity Group Company</p>
  <p>Pricing shown is standard rate; guarantee terms provided in your service agreement.</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
</body>
</html>`
}
