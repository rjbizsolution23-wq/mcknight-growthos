import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const eventLandingTemplate = (q: Record<string, string | undefined>) => {
  const eventName = param(q, 'eventName', 'The Funnel Growth Summit 2026')
  const date = param(q, 'date', 'October 15–17, 2026')
  const location = param(q, 'location', 'Live Virtual + Albuquerque, NM')
  const promise = param(q, 'promise', 'Walk Away Knowing Exactly How to Fill Your Next Event and Close $10K+ Sponsors')
  const audience = param(q, 'audience', 'coaches, consultants, and agency owners running (or planning) their first paid event')
  const host = param(q, 'host', 'Rick Jefferson')
  const hostCred = param(q, 'hostCred', 'Founder of RJ Business Solutions — has built monetization systems for events, tax firms, and credit repair companies nationwide')
  const seats = param(q, 'seats', '53')
  const registered = param(q, 'registered', '1,247')
  const gaPrice = param(q, 'gaPrice', '$97')
  const vipPrice = param(q, 'vipPrice', '$297')
  const elitePrice = param(q, 'elitePrice', '$997')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(eventName)}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="bg-gradient-to-br from-gray-950 via-gray-900 to-cyan-950 text-white">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center">
    <p class="inline-block bg-orange-500/20 text-orange-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-calendar mr-2"></i>${date} · ${location}</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${promise}</h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">${eventName} is built for ${audience} — 3 days, zero fluff, everything implementable.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8">
      <p class="text-sm text-gray-400 mb-1">Early bird pricing ends in:</p>
      <p class="text-3xl font-bold text-orange-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div>
      <a href="#pricing" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">YES! Claim My Seat →</a>
    </div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-users text-cyan-400 mr-1"></i>Join <strong class="text-white">${registered}</strong> people already registered — only <strong class="text-orange-400">${seats}</strong> seats remaining</p>
  </div>
</header>

<!-- [2] PAIN AGITATION -->
<section id="pain" class="py-16 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-10">If Any of This Sounds Familiar — This Event Was Designed Specifically For You</h2>
    <div class="grid md:grid-cols-2 gap-4 mb-10">
      ${[
        'You\'ve announced an event before... and heard crickets at registration',
        'You\'re leaving five figures on the table because you don\'t know how to approach sponsors',
        'Your "funnel" is a link in bio and a prayer',
        'You watch others fill rooms and close high-ticket from stage — and wonder what they know that you don\'t',
        'You have the audience, the offer, the expertise — but no SYSTEM connecting them',
      ].map(p => `<article class="bg-white rounded-xl p-5 border border-gray-200 flex gap-3"><i class="fas fa-xmark text-red-500 mt-1"></i><p class="text-gray-700">${p}</p></article>`).join('')}
    </div>
    <div class="grid md:grid-cols-2 gap-6">
      <article class="bg-red-50 border border-red-200 rounded-2xl p-6">
        <h3 class="font-bold text-red-700 mb-3"><i class="fas fa-arrow-down mr-2"></i>BEFORE</h3>
        <ul class="text-gray-700 space-y-2 text-sm">
          <li>• Guessing at ticket pricing and watching sales stall</li>
          <li>• Cold-emailing sponsors with no framework — no replies</li>
          <li>• Events that cost money instead of making it</li>
        </ul>
      </article>
      <article class="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
        <h3 class="font-bold text-emerald-700 mb-3"><i class="fas fa-arrow-up mr-2"></i>AFTER</h3>
        <ul class="text-gray-700 space-y-2 text-sm">
          <li>• A registration funnel engineered on proven conversion structure</li>
          <li>• A 6-touch sponsor sequence that books calls with real budget holders</li>
          <li>• An offer stack + stage close that turns attendees into clients</li>
        </ul>
      </article>
    </div>
  </div>
</section>

<!-- [3] BIG DOMINO / EVENT PROMISE -->
<section id="promise" class="py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <p class="text-cyan-600 font-semibold uppercase tracking-wide mb-3">The One Belief That Changes Everything</p>
    <h2 class="text-3xl md:text-4xl font-extrabold mb-6">If we can show you the exact funnel system behind sold-out events and 5-figure sponsor deals — then filling YOUR event stops being a mystery and becomes a checklist.</h2>
    <p class="text-gray-600 text-lg mb-10">That's the entire point of these 3 days. Not motivation. Not theory. The checklist.</p>
    <div class="grid md:grid-cols-3 gap-6 text-left">
      ${[
        ['Day 1 — Fill It', 'fa-users', 'The 5-stage event monetization funnel: traffic ignition, the 8-section registration page, and the upsell sequence that adds 30%+ to every order'],
        ['Day 2 — Fund It', 'fa-handshake', 'Sponsor acquisition end-to-end: the Dream 100 sponsor list, the 6-touch outreach sequence, the prospectus, and the close call framework'],
        ['Day 3 — Scale It', 'fa-rocket', 'High-ticket offers, sell-from-stage structure, the 72-hour replay funnel, and turning one live event into an evergreen machine'],
      ].map(([t, i, d]) => `
      <article class="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <i class="fas ${i} text-2xl text-cyan-600 mb-3"></i>
        <h3 class="font-bold text-lg mb-2">${t}</h3>
        <p class="text-gray-600 text-sm">${d}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [4] HOST AUTHORITY -->
<section id="host" class="py-16 bg-gray-950 text-white">
  <div class="max-w-4xl mx-auto px-4 md:flex items-center gap-10">
    <div class="md:w-1/3 mb-8 md:mb-0">
      <div class="aspect-square bg-gradient-to-br from-cyan-500 to-pink-500 rounded-3xl flex items-center justify-center text-6xl font-extrabold">${host.split(' ').map(w=>w[0]).join('')}</div>
    </div>
    <div class="md:w-2/3">
      <p class="text-cyan-400 font-semibold uppercase tracking-wide mb-2">Your Host</p>
      <h2 class="text-3xl font-extrabold mb-4">${host}</h2>
      <p class="text-gray-300 mb-4">${hostCred}.</p>
      <p class="text-gray-400 text-sm">This isn't a resume flex — it's a transformation story. Every framework taught at ${eventName} has been built, tested, and deployed in the real world. You're getting the systems, not the highlight reel.</p>
    </div>
  </div>
</section>

<!-- [5] SOCIAL PROOF -->
<section id="proof" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">What Past Attendees Actually Did With This</h2>
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      ${[
        ['Marcus T., Dallas TX', 'I implemented the sponsor outreach sequence from Day 2 and closed a $7,500 title sponsor within 3 weeks of the event.'],
        ['Alicia R., Phoenix AZ', 'My last event lost money. Using the registration funnel structure, my next one did $42K in ticket sales with a 28% VIP upgrade rate.'],
        ['Devon K., Atlanta GA', 'The stage-close framework alone paid for my ticket 40x over. I closed 9 clients into my $3K program from a 60-person room.'],
      ].map(([n, t]) => `
      <article class="bg-white rounded-2xl p-6 border border-gray-200">
        <div class="text-orange-400 mb-3">${'<i class="fas fa-star"></i>'.repeat(5)}</div>
        <p class="text-gray-700 text-sm mb-4">"${t}"</p>
        <p class="font-semibold text-sm">${n}</p>
      </article>`).join('')}
    </div>
    <p class="text-xs text-gray-500 text-center max-w-2xl mx-auto">Results shown are from real attendee reports and are not typical. Individual results depend on your audience, offer, effort, and execution. No specific outcome is guaranteed.</p>
  </div>
</section>

<!-- [6] PRICING -->
<section id="pricing" class="py-16">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-3">Choose Your Experience</h2>
    <p class="text-center text-gray-600 mb-10">Early bird pricing ends when the timer hits zero. Real deadline — no resets.</p>
    <div class="grid md:grid-cols-3 gap-6 items-start">
      <article class="rounded-3xl border border-gray-200 p-8">
        <h3 class="font-bold text-xl mb-1">General Admission</h3>
        <p class="text-4xl font-extrabold mb-4">${gaPrice}<span class="text-base text-gray-500 font-normal"> / seat</span></p>
        <ul class="text-sm text-gray-600 space-y-2 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>All 3 days, all main-stage sessions</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Digital workbook + funnel checklists</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Community access (90 days)</li>
        </ul>
        <a href="#" class="block text-center border-2 border-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-900 hover:text-white">Get GA Access →</a>
      </article>
      <article class="rounded-3xl border-4 border-orange-500 p-8 relative shadow-xl">
        <span class="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full">MOST POPULAR</span>
        <h3 class="font-bold text-xl mb-1">VIP</h3>
        <p class="text-4xl font-extrabold mb-4">${vipPrice}<span class="text-base text-gray-500 font-normal"> / seat</span></p>
        <ul class="text-sm text-gray-600 space-y-2 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Everything in GA, plus:</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Lifetime session recordings</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>VIP-only implementation workshops</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Front-section seating + VIP lounge</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>The complete swipe file vault</li>
        </ul>
        <a href="#" class="pulse-glow block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl">Claim My VIP Seat →</a>
      </article>
      <article class="rounded-3xl border border-gray-200 p-8">
        <h3 class="font-bold text-xl mb-1">VIP Elite</h3>
        <p class="text-4xl font-extrabold mb-4">${elitePrice}<span class="text-base text-gray-500 font-normal"> / seat</span></p>
        <ul class="text-sm text-gray-600 space-y-2 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Everything in VIP, plus:</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Private mastermind dinner with ${host}</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>1:1 funnel audit session (30 min)</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Hot seat coaching slot</li>
        </ul>
        <a href="#" class="block text-center border-2 border-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-900 hover:text-white">Go Elite →</a>
      </article>
    </div>
    <p class="text-center text-sm text-gray-500 mt-8"><i class="fas fa-shield-halved text-emerald-500 mr-1"></i>100% Money-Back Guarantee: attend Day 1 — if you don't believe it was worth every penny, email us before Day 2 starts for a full refund.</p>
  </div>
</section>

<!-- [7] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Every Question You're Asking (Answered Straight)</h2>
    <div class="space-y-3">
      ${[
        ['Is this virtual or in-person?', `Both. ${location}. Virtual attendees get the full livestream, live Q&A access, and the same workbooks. In-person gets the room energy, networking, and VIP experiences.`],
        ['What if I can\'t attend live?', 'VIP and Elite tiers include lifetime recordings. GA includes 72-hour replay access. But the implementation workshops are live-only — that\'s where the magic happens.'],
        ['I\'ve been to events before and nothing changed...', 'Most events sell inspiration. This one hands you systems: the exact page structures, email sequences, outreach scripts, and pricing frameworks. You leave with assets, not just notes.'],
        ['Is the price worth it?', `Run the math: one sponsor closed with the Day 2 framework at even $2,500 pays for an Elite ticket 2.5x over. One event filled with the Day 1 funnel structure changes your year.`],
        ['Who is this for?', `Specifically: ${audience}. If that's not you, honestly — skip it.`],
        ['What makes this different?', 'No theory-only speakers. Every framework taught is one we actually run. And you build DURING the event — you leave with your funnel outlined, not a to-do list.'],
        ['Can I get a refund?', 'Yes — attend Day 1, and if it wasn\'t worth it, email before Day 2 starts for 100% back. No forms, no friction.'],
        ['I\'m a beginner — is this for me?', 'If you have an audience or an offer: yes. If you have neither yet, start with our free content first — this event assumes you have something to sell.'],
        ['Will there be pitching from stage?', 'Transparency: yes, one offer will be presented on Day 3 — and we\'ll teach you the exact structure we use to do it as part of the curriculum. You\'ll learn from the pitch itself.'],
        ['How do I know this will work for MY niche?', 'The frameworks are niche-agnostic — attendees have applied them to coaching, agencies, credit repair, real estate, faith-based events, and B2B conferences. See the testimonials above.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [8] FINAL CTA -->
<section id="final-cta" class="py-20 bg-gradient-to-br from-gray-950 via-gray-900 to-cyan-950 text-white text-center">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl md:text-5xl font-extrabold mb-6">${promise}</h2>
    <p class="text-gray-300 text-lg mb-8">${registered} registered. ${seats} seats left. The timer is real.</p>
    <p class="text-3xl font-bold text-orange-400 font-mono mb-8" data-countdown="${deadline}">--</p>
    <a href="#pricing" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl mb-6">Secure My Seat Now →</a>
    <p class="text-sm text-gray-400"><i class="fas fa-shield-halved text-emerald-400 mr-1"></i>Day-1 money-back guarantee · <i class="fas fa-lock ml-2 mr-1"></i>Secure checkout</p>
  </div>
</section>

<footer class="bg-gray-950 text-gray-500 text-xs text-center py-8 px-4">
  <p class="mb-2">${eventName} · Produced by RJ Business Solutions · 1342 NM 333, Tijeras, New Mexico 87059</p>
  <p class="max-w-2xl mx-auto">Testimonial results are not typical and are not a guarantee of your results. This page is a template — replace all example testimonials, numbers, and claims with your own verified data before publishing.</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
</body>
</html>`
}
