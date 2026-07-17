import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const fitnessTemplate = (q: Record<string, string | undefined>) => {
  const programName = param(q, 'programName', 'The 90-Day Reset')
  const coachName = param(q, 'coachName', 'Coach Rick')
  const promise = param(q, 'promise', 'Drop the Weight, Keep the Muscle, and Never "Start Over" Again')
  const audience = param(q, 'audience', 'busy professionals over 30 who are done with crash diets')
  const clientCount = param(q, 'clientCount', '1,200+')
  const price = param(q, 'price', '$197/mo')
  const vipPrice = param(q, 'vipPrice', '$497/mo')
  const spots = param(q, 'spots', '15')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${programName} — ${coachName}`)}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950 text-white">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center">
    <p class="inline-block bg-emerald-500/20 text-emerald-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-dumbbell mr-2"></i>${programName} · Next Cohort Enrolling Now</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${promise}</h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">A coach-led transformation program built for ${audience}. No 2-hour workouts. No starvation. A system that fits your actual life.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8">
      <p class="text-sm text-gray-400 mb-1">Cohort enrollment closes in:</p>
      <p class="text-3xl font-bold text-emerald-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div>
      <a href="#pricing" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Start My Transformation →</a>
    </div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-users text-emerald-400 mr-1"></i><strong class="text-white">${clientCount}</strong> clients coached · only <strong class="text-orange-400">${spots}</strong> spots this cohort</p>
  </div>
</header>

<!-- [2] PAIN -->
<section id="pain" class="py-16 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-10">You Don\'t Have a Willpower Problem. You Have a System Problem.</h2>
    <div class="grid md:grid-cols-2 gap-4 mb-10">
      ${[
        'You\'ve lost the same 15 pounds three times — and gained it back four',
        'Every plan works... until week 3, when life happens and it all collapses',
        'You\'re busy — 6 gym days a week and meal-prepping 21 meals is a fantasy',
        'The scale rules your mood, and "cheat days" turn into cheat weeks',
        'You\'re tired of starting over every Monday',
      ].map(p => `<article class="bg-white rounded-xl p-5 border border-gray-200 flex gap-3"><i class="fas fa-xmark text-red-500 mt-1"></i><p class="text-gray-700">${p}</p></article>`).join('')}
    </div>
    <div class="grid md:grid-cols-2 gap-6">
      <article class="bg-red-50 border border-red-200 rounded-2xl p-6">
        <h3 class="font-bold text-red-700 mb-3"><i class="fas fa-arrow-down mr-2"></i>THE OLD WAY</h3>
        <ul class="text-gray-700 space-y-2 text-sm">
          <li>• Extreme restriction → rebound → guilt → repeat</li>
          <li>• Generic PDF plans with zero accountability</li>
          <li>• Cardio-only routines that burn muscle with the fat</li>
        </ul>
      </article>
      <article class="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
        <h3 class="font-bold text-emerald-700 mb-3"><i class="fas fa-arrow-up mr-2"></i>THE ${programName.toUpperCase()} WAY</h3>
        <ul class="text-gray-700 space-y-2 text-sm">
          <li>• 3–4 strength sessions/week, 45 minutes, gym or home</li>
          <li>• Flexible nutrition — real food, restaurants included</li>
          <li>• Weekly coach check-ins so week 3 never derails you</li>
        </ul>
      </article>
    </div>
  </div>
</section>

<!-- [3] MECHANISM -->
<section id="how" class="py-16">
  <div class="max-w-5xl mx-auto px-4">
    <p class="text-center text-emerald-600 font-semibold uppercase tracking-wide mb-3">The 3-Pillar System</p>
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-12">Why This Works When Everything Else Didn\'t</h2>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['Pillar 1 — Train Smart', 'fa-dumbbell', 'Progressive strength training designed around YOUR schedule and equipment. 45 minutes, 3–4x/week. Muscle is the metabolism engine — we build it, not burn it.'],
        ['Pillar 2 — Eat Real', 'fa-utensils', 'No banned foods. A flexible macro framework with restaurant guides, family-dinner strategies, and travel protocols. Sustainable beats perfect, every time.'],
        ['Pillar 3 — Stay Accountable', 'fa-user-check', 'Weekly 1:1 check-ins with your coach, daily community access, and data-driven adjustments. When motivation dips (it will), the system catches you.'],
      ].map(([t, i, d]) => `
      <article class="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <i class="fas ${i} text-2xl text-emerald-600 mb-3"></i>
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
      <div class="aspect-square bg-gradient-to-br from-emerald-500 to-cyan-400 rounded-3xl flex items-center justify-center text-6xl font-extrabold">${coachName.split(' ').map(w=>w[0]).join('')}</div>
    </div>
    <div class="md:w-2/3">
      <p class="text-emerald-400 font-semibold uppercase tracking-wide mb-2">Your Coach</p>
      <h2 class="text-3xl font-extrabold mb-4">${coachName}</h2>
      <p class="text-gray-300 mb-4">Certified coach with ${clientCount} client transformations. Built ${programName} after watching client after client fail on cookie-cutter plans that ignored real life — jobs, kids, travel, stress.</p>
      <p class="text-gray-400 text-sm">The program is engineered around one principle: the best plan is the one you can still follow in month 6.</p>
    </div>
  </div>
</section>

<!-- [5] SOCIAL PROOF -->
<section id="proof" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Real Clients. Real Timelines. Real Life.</h2>
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      ${[
        ['Melissa D., 38 · Nurse', 'Down 27 lbs in 90 days working 12-hour shifts. The check-ins were everything — my coach adjusted the plan every time my schedule blew up.'],
        ['Anthony B., 45 · Sales Director', 'I travel 3 weeks a month. The restaurant and hotel-gym protocols meant zero excuses. 19 lbs down, strongest I\'ve been since college.'],
        ['Karen W., 52 · Teacher', 'I thought my metabolism was "broken." Turns out I just needed strength training and enough protein. 22 lbs down and I eat MORE than before.'],
      ].map(([n, t]) => `
      <article class="bg-white rounded-2xl p-6 border border-gray-200">
        <div class="text-orange-400 mb-3">${'<i class="fas fa-star"></i>'.repeat(5)}</div>
        <p class="text-gray-700 text-sm mb-4">"${t}"</p>
        <p class="font-semibold text-sm">${n}</p>
      </article>`).join('')}
    </div>
    <p class="text-xs text-gray-500 text-center max-w-2xl mx-auto">Results are individual and not typical or guaranteed. Weight loss depends on adherence, starting point, and health status. Consult your physician before beginning any fitness or nutrition program. Replace example testimonials with your own verified client results before publishing.</p>
  </div>
</section>

<!-- [6] PRICING -->
<section id="pricing" class="py-16">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-3">Choose Your Level of Support</h2>
    <p class="text-center text-gray-600 mb-10">Both include the full ${programName} system. The difference is access.</p>
    <div class="grid md:grid-cols-2 gap-6 items-start max-w-3xl mx-auto">
      <article class="rounded-3xl border-4 border-orange-500 p-8 relative shadow-xl">
        <span class="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full">MOST POPULAR</span>
        <h3 class="font-bold text-xl mb-1">Group Coaching</h3>
        <p class="text-4xl font-extrabold mb-4">${price}</p>
        <ul class="text-sm text-gray-600 space-y-2 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Custom training program (updated monthly)</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Flexible nutrition framework + macro targets</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Weekly group coaching calls</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Private community + daily support</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>App-based tracking + form review</li>
        </ul>
        <a href="#" class="pulse-glow block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl">Join Group Coaching →</a>
      </article>
      <article class="rounded-3xl border border-gray-200 p-8">
        <h3 class="font-bold text-xl mb-1">1:1 VIP Coaching</h3>
        <p class="text-4xl font-extrabold mb-4">${vipPrice}</p>
        <ul class="text-sm text-gray-600 space-y-2 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Everything in Group, plus:</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Weekly private 1:1 check-in calls</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Direct message access to ${coachName}</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Fully custom meal planning</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Priority form-check turnaround</li>
        </ul>
        <a href="#" class="block text-center border-2 border-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-900 hover:text-white">Apply for VIP →</a>
      </article>
    </div>
    <p class="text-center text-sm text-gray-500 mt-8"><i class="fas fa-shield-halved text-emerald-500 mr-1"></i>14-Day Action Guarantee: complete the first 2 weeks — workouts logged, check-ins done — and if you don\'t feel the difference, full refund.</p>
  </div>
</section>

<!-- [7] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Everything You\'re Wondering</h2>
    <div class="space-y-3">
      ${[
        ['How much time do I actually need?', '3–4 workouts of about 45 minutes per week, plus 10 minutes for your weekly check-in. Nutrition adds zero extra time — you\'re already eating.'],
        ['I\'ve failed every program before. Why is this different?', 'Because those programs gave you a plan and disappeared. This one gives you a plan AND a coach who adjusts it every single week as your life happens. The accountability IS the product.'],
        ['Do I need a gym?', 'No. Every program has a full home-equipment version (dumbbells + bands) and a gym version. You pick, we program.'],
        ['What about my diet — do I have to give up [insert food]?', 'Nothing is banned. You\'ll learn to fit the foods you love into a framework that still gets results. Restriction is why your last diet failed.'],
        ['I\'m over 50 / have injuries — will this work for me?', 'The program is customized to you, including exercise substitutions for injuries. That said: always clear any new exercise program with your physician first.'],
        ['What happens after 90 days?', 'Most clients stay for maintenance-phase coaching at the same rate, month to month, cancel anytime. The 90 days builds the system; staying keeps it locked in.'],
        ['Is there a contract?', 'Group coaching is month-to-month after the initial 90-day commitment. Cancel anytime after that with one email. No hostage clauses.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [8] FINAL CTA -->
<section id="final-cta" class="py-20 bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950 text-white text-center">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl md:text-5xl font-extrabold mb-6">The Next 90 Days Are Passing Either Way. Choose What They Build.</h2>
    <p class="text-gray-300 text-lg mb-8">${spots} spots this cohort. Enrollment closes when the timer hits zero.</p>
    <p class="text-3xl font-bold text-emerald-400 font-mono mb-8" data-countdown="${deadline}">--</p>
    <a href="#pricing" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl mb-6">Start My Transformation →</a>
    <p class="text-sm text-gray-400"><i class="fas fa-shield-halved text-emerald-400 mr-1"></i>14-day action guarantee · <i class="fas fa-lock ml-2 mr-1"></i>Secure checkout</p>
  </div>
</section>

<footer class="bg-gray-950 text-gray-500 text-xs text-center py-8 px-4">
  <p class="mb-2">${programName} · Coached by ${coachName} · Powered by RJ Business Solutions</p>
  <p class="max-w-2xl mx-auto">This program is not medical advice. Consult your physician before beginning any exercise or nutrition program. Results vary and are not guaranteed. Replace all example testimonials and claims with your own verified data before publishing.</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
</body>
</html>`
}
