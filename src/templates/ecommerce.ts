import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const ecommerceTemplate = (q: Record<string, string | undefined>) => {
  const productName = param(q, 'productName', 'HydraCore Pro')
  const brandName = param(q, 'brandName', 'HydraCore')
  const promise = param(q, 'promise', 'The Insulated Bottle That Keeps Ice Frozen for 48 Hours — Guaranteed')
  const category = param(q, 'category', 'premium insulated water bottle')
  const price = param(q, 'price', '$49')
  const compareAt = param(q, 'compareAt', '$79')
  const bundlePrice = param(q, 'bundlePrice', '$89')
  const reviews = param(q, 'reviews', '12,400+')
  const rating = param(q, 'rating', '4.8')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${productName} — ${brandName}`)}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="bg-gradient-to-br from-gray-950 via-gray-900 to-sky-950 text-white">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center">
    <p class="inline-block bg-sky-500/20 text-sky-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-fire mr-2"></i>Flash Sale — ${compareAt} → ${price}</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">${promise}</h1>
    <p class="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">${productName}: the ${category} with <strong class="text-white">${reviews} verified reviews</strong> and a ${rating}★ average.</p>
    <div class="flex justify-center items-center gap-2 mb-8">
      <span class="text-orange-400 text-xl">${'<i class="fas fa-star"></i>'.repeat(5)}</span>
      <span class="text-gray-300 text-sm">${rating}/5 from ${reviews} reviews</span>
    </div>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8">
      <p class="text-sm text-gray-400 mb-1">Sale pricing ends in:</p>
      <p class="text-3xl font-bold text-sky-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div>
      <a href="#offer" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Get ${productName} — ${price} →</a>
    </div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-truck-fast text-sky-400 mr-1"></i>Free shipping · <i class="fas fa-rotate-left ml-2 mr-1"></i>60-day returns · <i class="fas fa-shield-halved ml-2 mr-1"></i>Lifetime warranty</p>
  </div>
</header>

<!-- [2] PROBLEM -->
<section id="pain" class="py-16 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-10">Your Current Bottle Is Lying to You</h2>
    <div class="grid md:grid-cols-2 gap-4 mb-10">
      ${[
        '"24-hour cold" that turns lukewarm by lunch',
        'Paint that chips into your gym bag after a month',
        'Lids that leak in your backpack — once, and it\'s the laptop',
        'Condensation rings on every desk and dashboard',
        '"Lifetime warranty" from brands that vanish when you file a claim',
      ].map(p => `<article class="bg-white rounded-xl p-5 border border-gray-200 flex gap-3"><i class="fas fa-xmark text-red-500 mt-1"></i><p class="text-gray-700">${p}</p></article>`).join('')}
    </div>
    <p class="text-center text-lg text-gray-600">We tore down 14 best-selling bottles, found where every one of them cheats — and engineered ${productName} to fix all of it.</p>
  </div>
</section>

<!-- [3] MECHANISM / FEATURES -->
<section id="features" class="py-16">
  <div class="max-w-5xl mx-auto px-4">
    <p class="text-center text-sky-600 font-semibold uppercase tracking-wide mb-3">Why It Wins</p>
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-12">Engineered Different. Provably Better.</h2>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['TriLayer™ Vacuum Core', 'fa-snowflake', 'Triple-wall vacuum insulation with a copper radiant barrier. Independent lab-tested: ice still solid at hour 48. Your coffee? Hot at hour 12.'],
        ['ArmorShell™ Finish', 'fa-shield', 'Ceramic-bonded powder coat rated for 1,000+ drop-and-scrape cycles. No chips, no peeling, no naked steel after month one.'],
        ['ZeroLeak™ Lid System', 'fa-droplet-slash', 'Dual-gasket magnetic-lock lid, tested to 30 PSI. Throw it in the bag upside down. On purpose. We do.'],
      ].map(([t, i, d]) => `
      <article class="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
        <i class="fas ${i} text-3xl text-sky-600 mb-4"></i>
        <h3 class="font-bold text-lg mb-2">${t}</h3>
        <p class="text-gray-600 text-sm">${d}</p>
      </article>`).join('')}
    </div>
    <div class="mt-10 overflow-x-auto">
      <table class="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
        <thead class="bg-gray-950 text-white"><tr><th class="p-3 text-left">Feature</th><th class="p-3 text-center">${productName}</th><th class="p-3 text-center text-gray-400">Big-Brand Bottle</th></tr></thead>
        <tbody>
          ${[
            ['Ice retention (lab-tested)', '48 hours', '18–24 hours'],
            ['Finish durability', 'Ceramic-bonded, 1,000+ cycles', 'Standard powder coat'],
            ['Leak-proof rating', '30 PSI dual gasket', 'Single gasket'],
            ['Warranty', 'Lifetime, no-receipt claims', 'Limited / receipt required'],
            ['Price', `${price} (sale)`, '$45–$60'],
          ].map(([f, us, them], idx) => `<tr class="${idx % 2 ? 'bg-gray-50' : 'bg-white'}"><td class="p-3 font-medium">${f}</td><td class="p-3 text-center text-emerald-600 font-semibold">${us}</td><td class="p-3 text-center text-gray-500">${them}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- [4] SOCIAL PROOF -->
<section id="proof" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">${reviews} Reviews. Here\'s a Sample.</h2>
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      ${[
        ['Tyler J. · Verified Buyer', 'Left it in a 95° car all day in Phoenix. Opened it at 6pm — still had ice. I genuinely didn\'t believe the claim until I saw it.'],
        ['Maria G. · Verified Buyer', 'Third one I\'ve bought — one for me, two as gifts. The lid has survived my toddler throwing it down the stairs. Twice.'],
        ['Chris P. · Verified Buyer', 'Filed a warranty claim after my dog chewed the lid (my fault, not theirs). Replacement shipped in 2 days, zero interrogation. That\'s how you keep a customer for life.'],
      ].map(([n, t]) => `
      <article class="bg-white rounded-2xl p-6 border border-gray-200">
        <div class="text-orange-400 mb-3">${'<i class="fas fa-star"></i>'.repeat(5)}</div>
        <p class="text-gray-700 text-sm mb-4">"${t}"</p>
        <p class="font-semibold text-sm">${n} <i class="fas fa-circle-check text-sky-500 ml-1"></i></p>
      </article>`).join('')}
    </div>
    <p class="text-xs text-gray-500 text-center max-w-2xl mx-auto">Example reviews shown for template purposes — replace with your own verified customer reviews before publishing. Performance claims must be substantiated by your own testing data (FTC).</p>
  </div>
</section>

<!-- [5] OFFER STACK -->
<section id="offer" class="py-16">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-3">Pick Your Deal</h2>
    <p class="text-center text-gray-600 mb-10">Sale pricing locked until the timer hits zero. Free shipping on everything.</p>
    <div class="grid md:grid-cols-2 gap-6 items-start max-w-3xl mx-auto">
      <article class="rounded-3xl border border-gray-200 p-8">
        <h3 class="font-bold text-xl mb-1">Single ${productName}</h3>
        <p class="mb-4"><span class="text-4xl font-extrabold">${price}</span> <span class="text-gray-400 line-through ml-2">${compareAt}</span></p>
        <ul class="text-sm text-gray-600 space-y-2 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>1x ${productName} (choose your color)</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Free shipping + lifetime warranty</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>60-day no-questions returns</li>
        </ul>
        <a href="#" class="block text-center border-2 border-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-900 hover:text-white">Add to Cart →</a>
      </article>
      <article class="rounded-3xl border-4 border-orange-500 p-8 relative shadow-xl">
        <span class="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full">BEST VALUE — SAVE 40%</span>
        <h3 class="font-bold text-xl mb-1">2-Pack Bundle</h3>
        <p class="mb-4"><span class="text-4xl font-extrabold">${bundlePrice}</span> <span class="text-gray-400 line-through ml-2">$158</span></p>
        <ul class="text-sm text-gray-600 space-y-2 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>2x ${productName} (mix colors)</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>FREE bottle brush kit ($15 value)</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Free shipping + lifetime warranty on both</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>60-day no-questions returns</li>
        </ul>
        <a href="#" class="pulse-glow block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl">Get the Bundle →</a>
      </article>
    </div>
    <p class="text-center text-sm text-gray-500 mt-8"><i class="fas fa-shield-halved text-emerald-500 mr-1"></i>60-Day "Ice Test" Guarantee: run your own 48-hour ice test. If it fails, return it used — full refund, we pay return shipping.</p>
  </div>
</section>

<!-- [6] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Before You Order</h2>
    <div class="space-y-3">
      ${[
        ['How fast is shipping?', 'Orders placed before 2pm ET ship same day from our US warehouse. Most orders arrive in 3–5 business days, with tracking sent instantly.'],
        ['Does the 48-hour ice claim really hold up?', 'Yes — under our published lab test conditions (72°F ambient, full ice fill, lid sealed). Hot cars and half-fills will vary. That\'s why we invite you to run the test yourself with the 60-day guarantee.'],
        ['What if I don\'t like it?', 'Return it within 60 days — used, scratched, whatever — for a full refund. We even pay the return label.'],
        ['How does the lifetime warranty work?', 'If it ever fails from a manufacturing defect, we replace it. File a claim from your order email in about 2 minutes. No receipts, no interrogations.'],
        ['Is it dishwasher safe?', 'The body is hand-wash (protects the vacuum seal); the lid is top-rack dishwasher safe. A 30-second rinse is honestly all it needs.'],
        ['Do you ship internationally?', 'Currently US + Canada. International waitlist is open — join the email list at the bottom of the page.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [7] FINAL CTA -->
<section id="final-cta" class="py-20 bg-gradient-to-br from-gray-950 via-gray-900 to-sky-950 text-white text-center">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl md:text-5xl font-extrabold mb-6">48-Hour Ice. Lifetime Warranty. 60 Days to Prove Us Wrong.</h2>
    <p class="text-3xl font-bold text-sky-400 font-mono mb-8" data-countdown="${deadline}">--</p>
    <a href="#offer" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl mb-6">Get ${productName} — ${price} →</a>
    <p class="text-sm text-gray-400"><i class="fas fa-truck-fast mr-1"></i>Free shipping · <i class="fas fa-rotate-left ml-2 mr-1"></i>60-day returns · <i class="fas fa-lock ml-2 mr-1"></i>Secure checkout</p>
  </div>
</section>

<footer class="bg-gray-950 text-gray-500 text-xs text-center py-8 px-4">
  <p class="mb-2">${brandName} · Powered by RJ Business Solutions</p>
  <p class="max-w-2xl mx-auto">All product performance claims on a live page must be substantiated with your own testing data per FTC requirements. Example reviews and statistics shown are template placeholders — replace before publishing.</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
</body>
</html>`
}
