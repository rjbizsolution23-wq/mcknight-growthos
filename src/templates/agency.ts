import { param, funnelHead, templateBadge } from './helpers'

export const agencyTemplate = (q: Record<string, string | undefined>) => {
  const agencyName = param(q, 'agencyName', 'McKnight Growth Partners')
  const niche = param(q, 'niche', 'home service businesses')
  const service = param(q, 'service', 'done-for-you lead generation')
  const clientCount = param(q, 'clientCount', '140+')
  const leadsGenerated = param(q, 'leadsGenerated', '312,000+')
  const avgRoas = param(q, 'avgRoas', '5.4x')
  const retainer = param(q, 'retainer', '$2,500/mo')

  return `${funnelHead(`${agencyName} — Book a Growth Audit`, q)}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="bg-gradient-to-br from-gray-950 via-gray-900 to-fuchsia-950 text-white">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center">
    <p class="inline-block bg-fuchsia-500/20 text-fuchsia-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-rocket mr-2"></i>${service.charAt(0).toUpperCase() + service.slice(1)} for ${niche}</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">We Fill Your Calendar With Qualified Leads — or You Don\'t Pay for the Month</h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">${agencyName} runs ${service} exclusively for ${niche}. ${leadsGenerated} leads generated. ${avgRoas} average return on ad spend across active clients.*</p>
    <a href="#audit" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Book My Free Growth Audit →</a>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-handshake text-fuchsia-400 mr-1"></i>${clientCount} active clients · One client per service area — we never work for your competitor</p>
  </div>
</header>

<!-- [2] PAIN -->
<section id="pain" class="py-16 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-10">You\'ve Been Burned by Marketing Agencies Before. We Know.</h2>
    <div class="grid md:grid-cols-2 gap-4 mb-10">
      ${[
        'You paid a retainer for months and got a report full of "impressions" instead of customers',
        'The agency that "specializes in everyone" understood nothing about your industry',
        'Leads came in — unqualified, out-of-area, or shared with three of your competitors',
        'You can\'t tell what\'s working because the reporting is designed to confuse you',
        'Meanwhile, referrals and repeat business carry the whole company on their back',
      ].map(p => `<article class="bg-white rounded-xl p-5 border border-gray-200 flex gap-3"><i class="fas fa-xmark text-red-500 mt-1"></i><p class="text-gray-700">${p}</p></article>`).join('')}
    </div>
    <div class="grid md:grid-cols-2 gap-6">
      <article class="bg-red-50 border border-red-200 rounded-2xl p-6">
        <h3 class="font-bold text-red-700 mb-3"><i class="fas fa-arrow-down mr-2"></i>TYPICAL AGENCY</h3>
        <ul class="text-gray-700 space-y-2 text-sm">
          <li>• Bills for activity: posts, impressions, "brand awareness"</li>
          <li>• 12-month contracts that protect them, not you</li>
          <li>• Works for you AND your competitor across town</li>
        </ul>
      </article>
      <article class="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
        <h3 class="font-bold text-emerald-700 mb-3"><i class="fas fa-arrow-up mr-2"></i>${agencyName.toUpperCase()}</h3>
        <ul class="text-gray-700 space-y-2 text-sm">
          <li>• Bills against one metric: qualified leads on your calendar</li>
          <li>• Month-to-month after 90 days — performance is the contract</li>
          <li>• Area exclusivity: one client per market, period</li>
        </ul>
      </article>
    </div>
  </div>
</section>

<!-- [3] MECHANISM -->
<section id="how" class="py-16">
  <div class="max-w-5xl mx-auto px-4">
    <p class="text-center text-fuchsia-600 font-semibold uppercase tracking-wide mb-3">The Growth System</p>
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-12">One System. Three Engines. Built Only for ${niche.charAt(0).toUpperCase() + niche.slice(1)}.</h2>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['Engine 1 — Demand Capture', 'fa-magnet', 'Search + maps domination for the moments people are actively looking. Landing pages engineered from hundreds of campaigns in your exact industry — not recycled generic templates.'],
        ['Engine 2 — Demand Creation', 'fa-bullhorn', 'Paid social campaigns with industry-proven hooks and offers that pull future buyers into your pipeline before they ever search. Creative refreshed monthly, tested weekly.'],
        ['Engine 3 — Follow-Up Automation', 'fa-bolt', 'Speed-to-lead texting within 60 seconds, missed-call textback, nurture sequences, and review generation. Leads stop leaking — the system follows up so your team doesn\'t have to remember.'],
      ].map(([t, i, d]) => `
      <article class="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <i class="fas ${i} text-2xl text-fuchsia-600 mb-3"></i>
        <h3 class="font-bold text-lg mb-2">${t}</h3>
        <p class="text-gray-600 text-sm">${d}</p>
      </article>`).join('')}
    </div>
    <div class="mt-10 grid md:grid-cols-4 gap-4 text-center">
      ${[
        [leadsGenerated, 'leads generated*'],
        [avgRoas, 'avg. return on ad spend*'],
        [clientCount, 'active clients'],
        ['60 sec', 'speed-to-lead response'],
      ].map(([n, l]) => `<div class="bg-fuchsia-50 rounded-2xl p-5 border border-fuchsia-100"><p class="text-3xl font-extrabold text-fuchsia-700">${n}</p><p class="text-xs text-gray-500 mt-1">${l}</p></div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] SOCIAL PROOF -->
<section id="proof" class="py-16 bg-gray-950 text-white">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Client Numbers, Not Agency Adjectives</h2>
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      ${[
        ['HVAC company · Texas', 'From 22 to 96 qualified leads/month in 90 days. Booked out three weeks deep for the first time in company history. We hired two techs to keep up.'],
        ['Roofing contractor · Arizona', 'The missed-call textback alone recovered 31 jobs last year we would have lost. The whole system pays for itself before the ads even count.'],
        ['Plumbing company · New Mexico', 'Third agency we tried. First one where I can open a dashboard and see cost per booked job — not impressions. Spend went DOWN, jobs went up.'],
      ].map(([n, t]) => `
      <article class="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <div class="text-orange-400 mb-3">${'<i class="fas fa-star"></i>'.repeat(5)}</div>
        <p class="text-gray-300 text-sm mb-4">"${t}"</p>
        <p class="font-semibold text-sm">${n}</p>
      </article>`).join('')}
    </div>
    <p class="text-xs text-gray-500 text-center max-w-2xl mx-auto">*Results vary by market, budget, and sales process; no lead volume or ROAS is guaranteed. Example case studies are template placeholders — replace with your own verified client results before publishing.</p>
  </div>
</section>

<!-- [5] OFFER -->
<section id="offer" class="py-16">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-10">Simple Engagement. Real Skin in the Game.</h2>
    <div class="grid md:grid-cols-2 gap-6 items-start max-w-3xl mx-auto">
      <article class="rounded-3xl border-4 border-orange-500 p-8 relative shadow-xl">
        <span class="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full">THE GROWTH SYSTEM</span>
        <p class="text-4xl font-extrabold mb-1">${retainer}</p>
        <p class="text-sm text-gray-500 mb-6">+ your ad budget (paid direct to the platforms — we never touch it)</p>
        <ul class="text-sm text-gray-600 space-y-2 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>All three engines: capture, creation, follow-up</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Industry-tested landing pages + creative</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Live dashboard: cost per lead, cost per booked job</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Area exclusivity — your market is yours</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Month-to-month after the first 90 days</li>
        </ul>
        <a href="#audit" class="pulse-glow block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl">Book My Growth Audit →</a>
      </article>
      <article class="rounded-3xl border border-gray-200 p-8">
        <h3 class="font-bold text-xl mb-4"><i class="fas fa-shield-halved text-emerald-500 mr-2"></i>The Performance Guarantee</h3>
        <p class="text-sm text-gray-600 mb-4">If we miss the qualified-lead target we set together in month one, <strong>month two\'s management fee is free</strong>. We keep working, you keep the leads, we eat the fee.</p>
        <p class="text-sm text-gray-600 mb-6">Targets are set from YOUR market data during the audit — in writing, before you sign anything.</p>
        <h3 class="font-bold text-base mb-3"><i class="fas fa-filter text-fuchsia-600 mr-2"></i>We only take clients who:</h3>
        <ul class="text-sm text-gray-600 space-y-2">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Can handle 30+ new leads/month operationally</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Answer their phone (or let us automate it)</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Have an ad budget of $1,500+/mo to deploy</li>
        </ul>
      </article>
    </div>
  </div>
</section>

<!-- [6] AUDIT FORM -->
<section id="audit" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <div class="bg-white rounded-3xl border border-gray-200 p-8 md:p-10 shadow-xl">
      <h2 class="text-3xl font-extrabold text-center mb-2">Book Your Free Growth Audit</h2>
      <p class="text-center text-gray-600 mb-8">30 minutes. We analyze your market, your current funnel, and your competitors\' ad spend — you keep the findings either way.</p>
      <form class="space-y-4" data-lead-form>
        <div class="grid md:grid-cols-2 gap-4">
          <input required placeholder="Full Name" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
          <input required type="tel" placeholder="Phone" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <input required type="email" placeholder="Email" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
          <input required placeholder="Company Name" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
        </div>
        <select required class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-600">
          <option value="">Current Monthly Marketing Spend</option><option>$0 — starting from scratch</option><option>Under $1,500</option><option>$1,500–$5,000</option><option>$5,000–$15,000</option><option>$15,000+</option>
        </select>
        <button class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Claim My Free Audit →</button>
        <p class="text-xs text-gray-500 text-center">If your service area is already taken by an existing client, we\'ll tell you immediately and add you to the exclusivity waitlist.</p>
      </form>
    </div>
  </div>
</section>

<!-- [7] FAQ + FINAL CTA -->
<section id="faq" class="py-16">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Asked on Almost Every Audit Call</h2>
    <div class="space-y-3 mb-16">
      ${[
        ['How fast will I see leads?', 'Demand-capture campaigns typically produce leads within the first 2–3 weeks. The full system compounds over 90 days as creative testing and follow-up automation mature. We set specific expectations for YOUR market during the audit.'],
        ['What makes you different from the last agency that burned me?', 'Three things: we only serve your industry, we bill against booked-lead metrics you can verify in your own dashboard, and after 90 days we\'re month-to-month — meaning we re-earn the retainer every 30 days.'],
        ['Do you lock me into a long contract?', 'First 90 days is the minimum (systems need time to calibrate honestly). After that: month-to-month, 30-day notice, and you keep your ad accounts, landing pages, and data if you leave. You own everything.'],
        ['Who controls the ad budget?', 'You do. Ad spend is billed directly to your card by Google/Meta. We never mark up media or hide spend inside a bundle — the retainer is the retainer.'],
        ['What if my market is small?', 'Then we\'ll tell you the honest budget floor for your area during the audit — and if the numbers don\'t work, we\'ll say so and point you to what to do instead. A bad-fit client costs us more than a "no."'],
      ].map(([question, a]) => `
      <details class="bg-gray-50 rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
    <div class="text-center bg-gradient-to-br from-gray-950 via-gray-900 to-fuchsia-950 text-white rounded-3xl p-10">
      <h2 class="text-3xl font-extrabold mb-4">Your Competitor\'s Ads Are Running Right Now. The Audit Is Free.</h2>
      <a href="#audit" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold px-8 py-4 rounded-2xl mt-4">Book My Free Growth Audit →</a>
    </div>
  </div>
</section>

<footer class="bg-gray-950 text-gray-500 text-xs text-center py-8 px-4">
  <p class="mb-2">${agencyName} · Powered by RJ Business Solutions · 1342 NM 333, Tijeras, NM 87059</p>
  <p class="max-w-2xl mx-auto">Marketing results vary by market, budget, offer, and sales process. No specific lead volume or ROI is guaranteed. Example case studies and metrics are template placeholders — replace with your own verified client data before publishing.</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
</body>
</html>`
}
