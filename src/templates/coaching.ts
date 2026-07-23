import { param, funnelHead, templateBadge } from './helpers'

export const coachingTemplate = (q: Record<string, string | undefined>) => {
  const programName = param(q, 'programName', 'The Scale Accelerator')
  const coachName = param(q, 'coachName', 'Jordan McKnight')
  const promise = param(q, 'promise', 'Install the Systems That Take You From Operator to Owner in 12 Months')
  const audience = param(q, 'audience', 'founders and consultants doing $10K–$50K/month who are the bottleneck in their own business')
  const revenue = param(q, 'revenue', '$40M+')
  const clientCount = param(q, 'clientCount', '215')
  const investment = param(q, 'investment', '$12,000')

  return `${funnelHead(`${programName} — Application`, q)}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-white">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center">
    <p class="inline-block bg-purple-500/20 text-purple-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-chess-king mr-2"></i>${programName} · By Application Only</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${promise}</h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">A 12-month private advisory program for ${audience}. Not a course. Not a mastermind pep rally. Direct implementation, with your numbers on the table.</p>
    <a href="#apply" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Apply for a Strategy Session →</a>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-filter text-purple-400 mr-1"></i>Applications reviewed personally. Not everyone is accepted — read the criteria below before applying.</p>
  </div>
</header>

<!-- [2] PAIN -->
<section id="pain" class="py-16 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-10">You Built a Business. Then the Business Built a Cage.</h2>
    <div class="grid md:grid-cols-2 gap-4 mb-10">
      ${[
        'Revenue is decent — but it dies the week you stop pushing',
        'Every "hire" so far has added work instead of removing it',
        'You know your pricing is too low, but raising it feels like Russian roulette',
        'Your calendar is a client-delivery hostage situation',
        'You\'ve consumed every podcast and course — you don\'t need more information, you need implementation',
      ].map(p => `<article class="bg-white rounded-xl p-5 border border-gray-200 flex gap-3"><i class="fas fa-xmark text-red-500 mt-1"></i><p class="text-gray-700">${p}</p></article>`).join('')}
    </div>
    <p class="text-center text-lg text-gray-600">The gap between $20K months and $100K months isn\'t hustle. It\'s <strong>architecture</strong> — offer, pricing, pipeline, and team, engineered to run without you at the center.</p>
  </div>
</section>

<!-- [3] MECHANISM -->
<section id="how" class="py-16">
  <div class="max-w-5xl mx-auto px-4">
    <p class="text-center text-purple-600 font-semibold uppercase tracking-wide mb-3">The 4-Quarter Roadmap</p>
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-12">12 Months. 4 Installations. One Outcome: A Business That Scales Without You.</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      ${[
        ['Q1 — Offer & Price', 'fa-gem', 'Rebuild your core offer around outcome, not hours. Reprice with a value framework. Most clients recover the program investment in this quarter alone.'],
        ['Q2 — Pipeline', 'fa-diagram-project', 'Install a predictable client acquisition system: one channel, one funnel, one metric dashboard. Kill the referral roulette.'],
        ['Q3 — Delivery & Team', 'fa-users-gear', 'Productize delivery so it runs on process, not heroics. Make your first (or next) leverage hire with role scorecards, not vibes.'],
        ['Q4 — Owner Mode', 'fa-crown', 'CEO operating rhythm: weekly scorecard, quarterly planning, and the decision frameworks that let you step out of daily ops.'],
      ].map(([t, i, d]) => `
      <article class="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <i class="fas ${i} text-2xl text-purple-600 mb-3"></i>
        <h3 class="font-bold text-lg mb-2">${t}</h3>
        <p class="text-gray-600 text-sm">${d}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [4] COACH AUTHORITY -->
<section id="coach" class="py-16 bg-gray-950 text-white">
  <div class="max-w-4xl mx-auto px-4 md:flex items-center gap-10">
    <div class="md:w-1/3 mb-8 md:mb-0">
      <div class="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center text-6xl font-extrabold">${coachName.split(' ').map(w=>w[0]).join('')}</div>
    </div>
    <div class="md:w-2/3">
      <p class="text-purple-400 font-semibold uppercase tracking-wide mb-2">Your Advisor</p>
      <h2 class="text-3xl font-extrabold mb-4">${coachName}</h2>
      <p class="text-gray-300 mb-4">${clientCount} founders advised. ${revenue} in combined client revenue influenced. Every framework in ${programName} was built in real businesses — not borrowed from a book.</p>
      <p class="text-gray-400 text-sm">Advisory style: direct. If your offer is weak, you\'ll hear it in week one — with the rebuild plan attached.</p>
    </div>
  </div>
</section>

<!-- [5] SOCIAL PROOF -->
<section id="proof" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Founders Who Made the Jump</h2>
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      ${[
        ['Danielle R. · Marketing Consultant', 'Q1 alone changed everything. Repriced from $3K projects to a $9K productized offer. Same clients, same delivery, 3x revenue per engagement.'],
        ['Marcus O. · Agency Owner', 'Went from me-doing-everything at $28K/mo to a 5-person team doing $85K/mo in 11 months. The Q3 hiring scorecards saved me from two bad hires.'],
        ['Priya S. · Fractional CFO', 'I applied skeptical. The weekly scorecard rhythm and the pipeline system gave me my first-ever 6-figure quarter — and my Fridays back.'],
      ].map(([n, t]) => `
      <article class="bg-white rounded-2xl p-6 border border-gray-200">
        <div class="text-orange-400 mb-3">${'<i class="fas fa-star"></i>'.repeat(5)}</div>
        <p class="text-gray-700 text-sm mb-4">"${t}"</p>
        <p class="font-semibold text-sm">${n}</p>
      </article>`).join('')}
    </div>
    <p class="text-xs text-gray-500 text-center max-w-2xl mx-auto">Results are individual and depend on your business, market, and execution. No revenue outcome is guaranteed. Replace example testimonials with your own verified client results before publishing.</p>
  </div>
</section>

<!-- [6] THE OFFER / WHO IT'S FOR -->
<section id="offer" class="py-16">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-10">What\'s Inside — and Who Gets In</h2>
    <div class="grid md:grid-cols-2 gap-6 mb-10">
      <article class="rounded-3xl border-4 border-orange-500 p-8 shadow-xl">
        <h3 class="font-bold text-xl mb-4"><i class="fas fa-box-open text-orange-500 mr-2"></i>The Program</h3>
        <ul class="text-sm text-gray-600 space-y-2 mb-6">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>2x monthly private 1:1 advisory calls (12 months)</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Direct async access for decisions between calls</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>The full ${programName} system: offer, pricing, pipeline, hiring, and CEO-rhythm frameworks</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Quarterly deep-dive planning sessions</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Private founder community + monthly group intensives</li>
        </ul>
        <p class="text-3xl font-extrabold">${investment}<span class="text-base text-gray-500 font-normal"> / year (payment plans available)</span></p>
      </article>
      <article class="rounded-3xl border border-gray-200 p-8">
        <h3 class="font-bold text-xl mb-4"><i class="fas fa-filter text-purple-600 mr-2"></i>Acceptance Criteria</h3>
        <ul class="text-sm text-gray-600 space-y-3">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i><strong>Revenue floor:</strong> consistently at $10K+/month — this program scales businesses, it doesn\'t start them</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i><strong>Proven offer:</strong> you have clients who get results</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i><strong>Coachable:</strong> you\'ll implement, not debate</li>
          <li><i class="fas fa-xmark text-red-500 mr-2"></i><strong>Not for:</strong> idea-stage founders, opportunity shoppers, or anyone looking for a silver bullet</li>
        </ul>
        <p class="text-xs text-gray-500 mt-6">If you\'re not there yet, join the free newsletter and come back when the floor is met — we\'ll be here.</p>
      </article>
    </div>
  </div>
</section>

<!-- [7] APPLICATION FORM -->
<section id="apply" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <div class="bg-white rounded-3xl border border-gray-200 p-8 md:p-10 shadow-xl">
      <h2 class="text-3xl font-extrabold text-center mb-2">Apply for Your Strategy Session</h2>
      <p class="text-center text-gray-600 mb-8">15 minutes. Your numbers on the table. You\'ll leave with clarity whether we work together or not.</p>
      <form class="space-y-4" data-lead-form>
        <div class="grid md:grid-cols-2 gap-4">
          <input required placeholder="Full Name" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
          <input required type="email" placeholder="Email" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
        </div>
        <input required placeholder="Business / What You Sell" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
        <select required class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-600">
          <option value="">Current Monthly Revenue</option><option>Under $10K (not a fit yet)</option><option>$10K–$25K</option><option>$25K–$50K</option><option>$50K–$100K</option><option>$100K+</option>
        </select>
        <textarea required placeholder="What is the #1 bottleneck keeping you from scaling right now?" rows="3" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm"></textarea>
        <button class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Submit My Application →</button>
        <p class="text-xs text-gray-500 text-center">Applications are reviewed within 48 business hours. Qualified applicants receive a scheduling link.</p>
      </form>
    </div>
  </div>
</section>

<!-- [8] FAQ + FINAL CTA -->
<section id="faq" class="py-16">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Asked Before Applying</h2>
    <div class="space-y-3 mb-16">
      ${[
        ['Why an application instead of a buy button?', 'Because fit determines results. A wrong-fit client wastes their money and our time. The 15-minute session exists to protect both.'],
        ['Is this a course?', 'No. There are frameworks and resources, but the product is advisory: your business, your numbers, your decisions — with an experienced operator in your corner twice a month, every month.'],
        ['What if I can\'t afford it right now?', `Then don\'t apply yet — seriously. ${investment} should be an easy yes against your current revenue, not a gamble. Payment plans exist for cash-flow smoothing, not affordability stretching.`],
        ['How fast will I see ROI?', 'Most clients recover the investment in Q1 through the offer/pricing rebuild. But "most" is not "all," and nothing here is a guarantee — execution is yours.'],
        ['What makes this different from a mastermind?', 'Masterminds give you peers. This gives you a dedicated advisor with direct accountability, plus a peer community as a bonus — not the main course.'],
      ].map(([question, a]) => `
      <details class="bg-gray-50 rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
    <div class="text-center bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-white rounded-3xl p-10">
      <h2 class="text-3xl font-extrabold mb-4">A Year From Now, You\'ll Either Have Systems — or the Same Cage.</h2>
      <a href="#apply" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold px-8 py-4 rounded-2xl mt-4">Apply for a Strategy Session →</a>
    </div>
  </div>
</section>

<footer class="bg-gray-950 text-gray-500 text-xs text-center py-8 px-4">
  <p class="mb-2">${programName} · ${coachName} · Powered by RJ Business Solutions · 1342 NM 333, Tijeras, NM 87059</p>
  <p class="max-w-2xl mx-auto">Business results depend on many factors including your market, offer, and execution. No income or revenue claims are guaranteed. Replace all example testimonials and figures with your own verified data before publishing.</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
</body>
</html>`
}
