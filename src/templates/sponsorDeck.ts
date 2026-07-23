import { param, funnelHead, templateBadge } from './helpers'

export const sponsorDeckTemplate = (q: Record<string, string | undefined>) => {
  const eventName = param(q, 'eventName', 'The Funnel Growth Summit 2026')
  const date = param(q, 'date', 'October 15–17, 2026')
  const location = param(q, 'location', 'Live Virtual + Albuquerque, NM')
  const attendees = param(q, 'attendees', '1,300+')
  const audience = param(q, 'audience', 'coaches, consultants, and agency owners — 68% doing $10K–$100K/mo in revenue')
  const contact = param(q, 'contact', 'sponsors@rjbusinesssolutions.org')
  const titlePrice = param(q, 'titlePrice', '$15,000')
  const goldPrice = param(q, 'goldPrice', '$7,500')
  const silverPrice = param(q, 'silverPrice', '$2,500')
  const titleSpots = param(q, 'titleSpots', '1')
  const goldSpots = param(q, 'goldSpots', '2')

  return `${funnelHead(`Sponsor ${eventName}`, q)}
<body class="bg-white text-gray-900">

<!-- [1] EVENT OVERVIEW -->
<header id="overview" class="bg-gray-950 text-white">
  <div class="max-w-5xl mx-auto px-4 py-16">
    <p class="text-cyan-400 font-semibold uppercase tracking-wide mb-3">Sponsorship Prospectus</p>
    <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Put Your Brand in Front of ${attendees} Qualified Buyers at ${eventName}</h1>
    <p class="text-xl text-gray-300 mb-6">${date} · ${location}</p>
    <p class="text-gray-400 max-w-2xl mb-8">Our audience: ${audience}. They're not browsers — they're operators actively investing in tools and services that grow their businesses.</p>
    <a href="#book" class="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 py-4 rounded-xl">Book a Sponsor Call →</a>
  </div>
</header>

<!-- [2] AUDIENCE DATA -->
<section id="audience-data" class="py-16">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold mb-10 text-center">Who's In the Room</h2>
    <div class="grid md:grid-cols-4 gap-6 text-center mb-8">
      ${[
        [attendees, 'Registered attendees'],
        ['68%', 'Business owners $10K–$100K/mo'],
        ['84%', 'Decision-makers with budget authority'],
        ['92%', 'Attended to find tools & partners'],
      ].map(([n, l]) => `
      <article class="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <p class="text-4xl font-extrabold text-cyan-600 mb-2">${n}</p>
        <p class="text-gray-600 text-sm">${l}</p>
      </article>`).join('')}
    </div>
    <p class="text-xs text-gray-500 text-center">Template data shown — replace with your verified registration analytics before sending. Sponsors will ask for sources; have them ready.</p>
  </div>
</section>

<!-- [3] PAST METRICS -->
<section id="metrics" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold mb-10 text-center">Past Event Performance</h2>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['fa-users', '96% show-up rate', 'across in-person + virtual (industry avg: 40-60% virtual)'],
        ['fa-star', 'NPS 74', 'attendees actively recommend the event'],
        ['fa-hand-holding-dollar', '$38K generated', 'by last year\'s title sponsor from their speaking slot (self-reported)'],
      ].map(([i, n, l]) => `
      <article class="bg-white rounded-2xl p-6 border border-gray-200 text-center">
        <i class="fas ${i} text-3xl text-cyan-600 mb-3"></i>
        <p class="text-2xl font-extrabold mb-1">${n}</p>
        <p class="text-gray-600 text-sm">${l}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [4] TIERS -->
<section id="tiers" class="py-16">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold mb-3 text-center">Sponsorship Tiers</h2>
    <p class="text-center text-gray-600 mb-10">Category exclusivity available at Title level. <strong class="text-orange-600">${titleSpots} Title spot and ${goldSpots} Gold spots remaining.</strong></p>
    <div class="overflow-x-auto">
      <table class="w-full text-sm border border-gray-200 rounded-2xl overflow-hidden">
        <thead>
          <tr class="bg-gray-950 text-white">
            <th class="text-left p-4">Deliverable</th>
            <th class="p-4">Title / Presenting<br><span class="text-orange-400 text-lg font-extrabold">${titlePrice}</span></th>
            <th class="p-4">Gold<br><span class="text-yellow-400 text-lg font-extrabold">${goldPrice}</span></th>
            <th class="p-4">Silver<br><span class="text-gray-300 text-lg font-extrabold">${silverPrice}</span></th>
          </tr>
        </thead>
        <tbody>
          ${[
            ['"Presented by [Your Brand]" in all marketing', '✅', '—', '—'],
            ['Speaking / presentation slot', '20–30 min', '10–15 min demo', 'Stage mention'],
            ['Email blast to full attendee list', 'Solo blast', 'Nurture mention', '—'],
            ['Logo placement', 'All materials + stage', 'Second tier', 'Website + signage'],
            ['Category exclusivity', '✅', '—', '—'],
            ['Complimentary tickets', '10', '5', '2'],
            ['Social media features', '5+ posts', '3 posts', '1–2 posts'],
            ['Exhibit table + banner', '✅ Premium placement', '✅', '—'],
            ['Attendee list access (with consent)', '✅', '—', '—'],
          ].map((r, idx) => `
          <tr class="${idx % 2 ? 'bg-gray-50' : 'bg-white'} border-t border-gray-200">
            <td class="p-4 font-medium">${r[0]}</td>
            <td class="p-4 text-center">${r[1]}</td>
            <td class="p-4 text-center">${r[2]}</td>
            <td class="p-4 text-center">${r[3]}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <p class="text-sm text-gray-600 mt-4 text-center">Media / Community Partner packages (cross-promotion, no cash) also available — ask on the call.</p>
  </div>
</section>

<!-- [5] PAST SPONSOR PROOF -->
<section id="sponsor-proof" class="py-16 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold mb-10 text-center">What Past Sponsors Say</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <article class="bg-white rounded-2xl p-6 border border-gray-200">
        <p class="text-gray-700 mb-4">"We used our speaking slot to demo the platform live. 212 demo signups from one 15-minute session — our best cost-per-lead of the entire year."</p>
        <p class="font-semibold text-sm">VP Marketing, SaaS Sponsor (Gold, 2025)</p>
      </article>
      <article class="bg-white rounded-2xl p-6 border border-gray-200">
        <p class="text-gray-700 mb-4">"The attendee quality is what sold us. These aren't badge-scanners — they're owners with budget who came to buy solutions."</p>
        <p class="font-semibold text-sm">Founder, FinTech Sponsor (Title, 2025)</p>
      </article>
    </div>
    <p class="text-xs text-gray-500 text-center mt-4">Template testimonials — replace with your real, permissioned sponsor quotes before sending.</p>
  </div>
</section>

<!-- [6] ROI CALCULATOR -->
<section id="roi" class="py-16">
  <div class="max-w-3xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-extrabold mb-6">The Math Sponsors Actually Care About</h2>
    <div class="bg-gray-950 text-white rounded-3xl p-8">
      <p class="text-gray-300 mb-6">If just <strong class="text-cyan-400">1%</strong> of ${attendees} attendees become your customer at a <strong class="text-cyan-400">$2,000</strong> average customer value:</p>
      <p class="text-5xl font-extrabold text-emerald-400 mb-2">$26,000+</p>
      <p class="text-gray-400 text-sm mb-6">in new revenue — against a ${goldPrice} Gold investment. And that's before brand visibility, list growth, and pipeline built for future quarters.</p>
      <p class="text-xs text-gray-500">Illustrative math only — actual results depend on your offer, follow-up, and conversion rates.</p>
    </div>
  </div>
</section>

<!-- [7+8] URGENCY + CTA -->
<section id="book" class="py-16 bg-gradient-to-br from-gray-950 to-cyan-950 text-white text-center">
  <div class="max-w-2xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">${titleSpots} Title Spot · ${goldSpots} Gold Spots Remaining</h2>
    <p class="text-gray-300 mb-8">Once category exclusivity is claimed, competitors in your space are locked out of ${eventName}. First right of refusal goes to whoever books first.</p>
    <a href="mailto:${contact}" class="inline-block bg-cyan-500 hover:bg-cyan-600 text-white text-lg font-bold px-10 py-5 rounded-2xl mb-4">Book a 15-Minute Sponsor Call →</a>
    <p class="text-sm text-gray-400">Or email directly: <a href="mailto:${contact}" class="text-cyan-400 underline">${contact}</a></p>
  </div>
</section>

<footer class="bg-gray-950 text-gray-500 text-xs text-center py-8 px-4 border-t border-gray-800">
  <p>${eventName} · McKnight GrowthOS · Powered by RJ Business Solutions · 1342 NM 333, Tijeras, New Mexico 87059</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
</body>
</html>`
}
