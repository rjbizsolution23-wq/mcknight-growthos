import { param, funnelHead, templateBadge } from './helpers'

export const lawFirmTemplate = (q: Record<string, string | undefined>) => {
  const firmName = param(q, 'firmName', 'Jefferson & Associates Injury Law')
  const practiceArea = param(q, 'practiceArea', 'personal injury')
  const city = param(q, 'city', 'Albuquerque')
  const recovered = param(q, 'recovered', '$120M+')
  const casesWon = param(q, 'casesWon', '2,800+')
  const years = param(q, 'years', '22')
  const phone = param(q, 'phone', '(505) 555-0199')

  return `${funnelHead(`${firmName} — Free Case Review`, q)}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="bg-gradient-to-br from-gray-950 via-gray-900 to-amber-950 text-white">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center">
    <p class="inline-block bg-amber-500/20 text-amber-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-scale-balanced mr-2"></i>${city} ${practiceArea} attorneys · Available 24/7</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">Injured? The Insurance Company Already Has Lawyers. Now You Do Too.</h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Free case review. No fee unless we win. ${recovered} recovered for clients over ${years} years serving ${city}.*</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center mb-6">
      <a href="tel:${phone.replace(/[^0-9+]/g, '')}" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl"><i class="fas fa-phone mr-2"></i>Call Now — ${phone}</a>
      <a href="#case-review" class="inline-block border-2 border-gray-600 hover:border-white text-white text-xl font-bold px-10 py-5 rounded-2xl">Free Online Case Review →</a>
    </div>
    <div class="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center mt-8">
      <div><p class="text-3xl font-extrabold text-amber-300">${recovered}</p><p class="text-xs text-gray-400">Recovered for Clients*</p></div>
      <div><p class="text-3xl font-extrabold text-amber-300">${casesWon}</p><p class="text-xs text-gray-400">Cases Resolved*</p></div>
      <div><p class="text-3xl font-extrabold text-amber-300">$0</p><p class="text-xs text-gray-400">Fee Unless We Win</p></div>
    </div>
  </div>
</header>

<!-- [2] PAIN / URGENCY -->
<section id="pain" class="py-16 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-10">What the Insurance Company Hopes You Never Learn</h2>
    <div class="grid md:grid-cols-2 gap-4 mb-10">
      ${[
        'That "friendly" adjuster\'s job is to close your claim for as little as possible',
        'The first settlement offer is almost never the real number',
        'Anything you say in a recorded statement can shrink your claim',
        'Medical bills and lost wages pile up while they slow-walk you',
        'Evidence disappears fast — camera footage gets overwritten, witnesses forget',
      ].map(p => `<article class="bg-white rounded-xl p-5 border border-gray-200 flex gap-3"><i class="fas fa-xmark text-red-500 mt-1"></i><p class="text-gray-700">${p}</p></article>`).join('')}
    </div>
    <p class="text-center text-lg text-gray-600">Every day you wait, their position gets stronger. A free case review costs you nothing — and tells you exactly where you stand.</p>
  </div>
</section>

<!-- [3] HOW IT WORKS -->
<section id="how" class="py-16">
  <div class="max-w-5xl mx-auto px-4">
    <p class="text-center text-amber-600 font-semibold uppercase tracking-wide mb-3">How It Works</p>
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-12">Three Steps. Zero Upfront Cost.</h2>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['1. Free Case Review', 'fa-comments', 'Call or submit the form — day or night. An attorney (not a call-center script) evaluates your case and gives you a straight answer on its strength.'],
        ['2. We Build Your Case', 'fa-folder-open', 'We gather evidence, handle every insurance call, coordinate with your medical providers, and calculate the FULL value of your claim — not the quick number.'],
        ['3. You Get Paid — or You Pay Nothing', 'fa-hand-holding-dollar', 'We negotiate for the maximum, and go to trial if they won\'t pay it. Our fee comes out of the recovery. No recovery, no fee. Period.'],
      ].map(([t, i, d]) => `
      <article class="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
        <i class="fas ${i} text-3xl text-amber-600 mb-4"></i>
        <h3 class="font-bold text-lg mb-2">${t}</h3>
        <p class="text-gray-600 text-sm">${d}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [4] PRACTICE AREAS + AUTHORITY -->
<section id="authority" class="py-16 bg-gray-950 text-white">
  <div class="max-w-5xl mx-auto px-4">
    <div class="md:flex items-start gap-10 mb-12">
      <div class="md:w-2/3">
        <p class="text-amber-400 font-semibold uppercase tracking-wide mb-2">Your Legal Team</p>
        <h2 class="text-3xl font-extrabold mb-4">${firmName}</h2>
        <p class="text-gray-300 mb-4">${years} years fighting for injured people in ${city}. ${casesWon} cases resolved. ${recovered} recovered.* We don\'t represent insurance companies — ever. Only people.</p>
        <p class="text-gray-400 text-sm">When you call, you talk to our legal team — not an answering service reading a script. Se habla español.</p>
      </div>
      <div class="md:w-1/3 mt-8 md:mt-0">
        <div class="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h3 class="font-bold mb-3 text-amber-400">We Handle</h3>
          <ul class="text-sm text-gray-300 space-y-2">
            <li><i class="fas fa-car-burst mr-2 text-gray-500"></i>Car &amp; truck accidents</li>
            <li><i class="fas fa-motorcycle mr-2 text-gray-500"></i>Motorcycle accidents</li>
            <li><i class="fas fa-person-falling mr-2 text-gray-500"></i>Slip &amp; fall / premises</li>
            <li><i class="fas fa-briefcase-medical mr-2 text-gray-500"></i>Serious injury &amp; wrongful death</li>
            <li><i class="fas fa-dog mr-2 text-gray-500"></i>Dog bites</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['R.T. · Car accident client', 'The insurance company offered me $9,000. This firm settled my case for many times that — and handled every call so I could focus on physical therapy.'],
        ['Gloria S. · Slip and fall client', 'They treated me like family, explained everything in plain language, and never pressured me to take a low offer. I\'m so glad I called.'],
        ['D.M. · Truck accident client', 'From the hospital to the settlement check, they handled everything. I never spoke to the insurance company once. Not once.'],
      ].map(([n, t]) => `
      <article class="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <div class="text-orange-400 mb-3">${'<i class="fas fa-star"></i>'.repeat(5)}</div>
        <p class="text-gray-300 text-sm mb-4">"${t}"</p>
        <p class="font-semibold text-sm text-white">${n}</p>
      </article>`).join('')}
    </div>
    <p class="text-xs text-gray-500 text-center max-w-2xl mx-auto mt-6">*Past results do not guarantee, warrant, or predict future outcomes. Every case is different. Testimonials are examples for template purposes — replace with your own client-consented reviews per your state bar advertising rules.</p>
  </div>
</section>

<!-- [5] CASE REVIEW FORM -->
<section id="case-review" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <div class="bg-white rounded-3xl border-4 border-orange-500 p-8 md:p-10 shadow-xl">
      <h2 class="text-3xl font-extrabold text-center mb-2">Get Your Free Case Review</h2>
      <p class="text-center text-gray-600 mb-8">Confidential. No obligation. An attorney responds — usually within the hour during business hours.</p>
      <form class="space-y-4" data-lead-form>
        <div class="grid md:grid-cols-2 gap-4">
          <input required placeholder="Full Name" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
          <input required type="tel" placeholder="Phone" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm">
        </div>
        <select required class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-600">
          <option value="">Type of Accident</option><option>Car accident</option><option>Truck accident</option><option>Motorcycle accident</option><option>Slip &amp; fall</option><option>Dog bite</option><option>Other injury</option>
        </select>
        <textarea placeholder="Briefly describe what happened (optional)" rows="3" class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm"></textarea>
        <label class="flex gap-3 text-xs text-gray-500 items-start">
          <input type="checkbox" required class="mt-0.5">
          <span>I agree to be contacted about my case by ${firmName} at the number provided, including by call/text using automated technology. Consent is not required to obtain services. Submitting this form does not create an attorney-client relationship.</span>
        </label>
        <button class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Get My Free Case Review →</button>
      </form>
    </div>
  </div>
</section>

<!-- [6] FAQ -->
<section id="faq" class="py-16">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">What Injured People Ask Us First</h2>
    <div class="space-y-3">
      ${[
        ['How much does it cost to hire you?', 'Nothing upfront — ever. We work on contingency: our fee is a percentage of what we recover for you. If we recover nothing, you owe us nothing.'],
        ['How much is my case worth?', 'It depends on your injuries, medical costs, lost income, and how the accident happened. That\'s exactly what the free case review answers — honestly, including if the case is weak.'],
        ['The insurance company already made an offer. Should I take it?', 'Do not sign anything before a lawyer reviews it. First offers are routinely a fraction of full case value, and signing releases every future claim — including injuries that show up later.'],
        ['How long do I have to file?', 'Every state has a statute of limitations, and some deadlines (like claims against government entities) are much shorter than people expect. Call now even if you\'re unsure — the review is free.'],
        ['Will my case go to trial?', 'Most cases settle. But insurance companies pay more to firms that actually try cases — and they know which firms those are. We prepare every case as if it\'s going to a jury.'],
        ['What if I was partly at fault?', 'You may still have a claim — many states allow recovery even when you share some fault. Don\'t disqualify yourself; let an attorney evaluate it.'],
      ].map(([question, a]) => `
      <details class="bg-gray-50 rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [7] FINAL CTA -->
<section id="final-cta" class="py-20 bg-gradient-to-br from-gray-950 via-gray-900 to-amber-950 text-white text-center">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl md:text-5xl font-extrabold mb-6">Evidence Fades. Deadlines Run. The Call Is Free.</h2>
    <p class="text-gray-300 text-lg mb-8">No fee unless we win. Available 24/7.</p>
    <a href="tel:${phone.replace(/[^0-9+]/g, '')}" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl mb-6"><i class="fas fa-phone mr-2"></i>Call ${phone} Now</a>
    <p class="text-sm text-gray-400">Or <a href="#case-review" class="underline text-amber-300">submit your case online</a> — attorney response, not a bot.</p>
  </div>
</section>

<footer class="bg-gray-950 text-gray-500 text-xs text-center py-8 px-4">
  <p class="mb-2">${firmName} · Serving ${city} and surrounding areas · ${phone}</p>
  <p class="max-w-2xl mx-auto">ATTORNEY ADVERTISING. Past results do not guarantee future outcomes. Submitting a form or calling does not create an attorney-client relationship. This page is a template — have it reviewed against your state bar\'s attorney advertising rules (and add any required disclaimers) before publishing.</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
</body>
</html>`
}
