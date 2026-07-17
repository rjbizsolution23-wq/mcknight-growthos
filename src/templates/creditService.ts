import { param, funnelHead, templateBadge } from './helpers'

export const creditServiceTemplate = (q: Record<string, string | undefined>) => {
  const companyName = param(q, 'companyName', 'TrueNorth Credit Solutions')
  const state = param(q, 'state', 'New Mexico')
  const clientsHelped = param(q, 'clientsHelped', '3,100+')
  const essentialPrice = param(q, 'essentialPrice', '$99')
  const essentialSetup = param(q, 'essentialSetup', '$150')
  const acceleratedPrice = param(q, 'acceleratedPrice', '$179')
  const acceleratedSetup = param(q, 'acceleratedSetup', '$249')
  const flatPrice = param(q, 'flatPrice', '$1,095')

  return `${funnelHead(`${companyName} — Free Credit Analysis`, q)}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="bg-gradient-to-br from-[#1e3a5f] to-[#0f2440] text-white">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center">
    <h1 class="text-3xl md:text-5xl font-extrabold leading-tight mb-5 max-w-3xl mx-auto">Find Out What's Inaccurate on Your Credit Report — and What You Can Actually Do About It</h1>
    <p class="text-xl text-blue-200 mb-8">Get a free credit analysis from our specialists. No obligation. No upfront fees. Ever.</p>
    <a href="#pricing" class="inline-block bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold px-10 py-5 rounded-2xl mb-6">Get My Free Credit Analysis →</a>
    <div class="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-blue-200">
      <span><i class="fas fa-scale-balanced text-emerald-400 mr-1"></i>CROA-Compliant</span>
      <span><i class="fas fa-hand-holding-dollar text-emerald-400 mr-1"></i>No Upfront Fees</span>
      <span><i class="fas fa-door-open text-emerald-400 mr-1"></i>Cancel Anytime</span>
      <span><i class="fas fa-users text-emerald-400 mr-1"></i>${clientsHelped} clients helped</span>
    </div>
  </div>
</header>

<!-- [2] EDUCATION — WHAT'S DISPUTABLE -->
<section id="education" class="py-16">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-3">Here's What the Law Says You're Entitled To</h2>
    <p class="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Under the Fair Credit Reporting Act, these items can be legally disputed. This is what we help you do — legally and transparently.</p>
    <div class="grid md:grid-cols-3 gap-4">
      ${[
        ['fa-circle-exclamation', 'Inaccurate Information', 'Wrong balances, wrong dates, wrong account status — if it\'s reported incorrectly, it can be disputed.'],
        ['fa-file-circle-question', 'Unverifiable Information', 'If the creditor can\'t verify it during the bureau\'s investigation, it must be deleted.'],
        ['fa-calendar-xmark', 'Outdated Information', 'Most negatives: 7 years. Chapter 7 bankruptcy: 10 years. Past the window? It must come off.'],
        ['fa-copy', 'Duplicate Listings', 'The same debt reported twice (common after collection transfers) can be challenged.'],
        ['fa-user-secret', 'Identity Theft Entries', 'Accounts you never opened can be blocked under FCRA §605B with proper documentation.'],
        ['fa-shuffle', 'Mixed Files', 'Someone else\'s data on your report — more common than you\'d think, and fully disputable.'],
      ].map(([i, t, d]) => `
      <article class="border border-gray-200 rounded-2xl p-5">
        <i class="fas ${i} text-2xl text-blue-600 mb-3"></i>
        <h3 class="font-bold mb-1">${t}</h3>
        <p class="text-gray-600 text-sm">${d}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [3] HOW IT WORKS -->
<section id="process" class="py-16 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">How It Actually Works</h2>
    <ol class="space-y-4">
      ${[
        ['Free Analysis', 'We pull your tri-bureau report and identify every item that may be disputable — and tell you exactly why.'],
        ['You Review', 'We show you what we found and what we believe we can challenge. Full transparency before you commit to anything.'],
        ['We Begin Work', 'Disputes sent to bureaus and furnishers using FCRA §611 and §623 legal channels. Every action documented.'],
        ['You\'re Updated', 'Your client portal shows every dispute sent, every response received, in real time.'],
        ['You Pay — After the Work', 'You are billed ONLY after each cycle of work is completed. Never before.'],
      ].map(([t, d], i) => `
      <li class="bg-white rounded-2xl border border-gray-200 p-5 flex gap-4">
        <span class="bg-blue-600 text-white font-bold w-9 h-9 rounded-full flex items-center justify-center shrink-0">${i+1}</span>
        <div><h3 class="font-bold">${t}</h3><p class="text-gray-600 text-sm">${d}</p></div>
      </li>`).join('')}
    </ol>
    <div class="bg-blue-50 border border-blue-200 rounded-2xl p-5 mt-6 text-sm text-blue-900">
      <i class="fas fa-gavel mr-2"></i><strong>We never charge before we work.</strong> That's not just our policy — it's the law under the Credit Repair Organizations Act (CROA). We comply. Period.
    </div>
  </div>
</section>

<!-- [4] SOCIAL PROOF -->
<section id="proof" class="py-16">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Real Clients. Documented Outcomes.</h2>
    <div class="grid md:grid-cols-2 gap-6 mb-4">
      <article class="border border-gray-200 rounded-2xl p-6">
        <p class="text-gray-700 mb-4">"Had 4 of 7 items removed — enough to qualify for the home loan we'd been denied for twice. They told me upfront which 3 items were accurate and would stay. That honesty is why I trusted them."</p>
        <p class="font-semibold text-sm">Jasmine W., ${state}</p>
        <p class="text-[11px] text-gray-500 mt-2">Results may vary. Individual outcomes depend on the specific items on your credit report, whether those items can be successfully disputed under the FCRA, and the credit bureaus' investigation findings.</p>
      </article>
      <article class="border border-gray-200 rounded-2xl p-6">
        <p class="text-gray-700 mb-4">"After identity theft, my report was a mess. They used the FCRA identity theft block process and got the fraudulent accounts removed. The portal kept me updated every step."</p>
        <p class="font-semibold text-sm">Carlos M., ${state}</p>
        <p class="text-[11px] text-gray-500 mt-2">Results may vary. Individual outcomes depend on the specific items on your report and bureau investigation findings.</p>
      </article>
    </div>
    <p class="text-xs text-gray-500 text-center">Template testimonials — replace with real, permissioned client statements + signed consent before publishing.</p>
  </div>
</section>

<!-- [5] PRICING -->
<section id="pricing" class="py-16 bg-gray-50">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-3">Transparent Pricing. Post-Service Billing.</h2>
    <p class="text-center text-gray-600 mb-10">Every plan bills AFTER each completed cycle of work — as required by federal law.</p>
    <div class="grid md:grid-cols-3 gap-6 items-start mb-8">
      <article class="bg-white rounded-3xl border border-gray-200 p-8">
        <h3 class="font-bold text-xl mb-1">Essential</h3>
        <p class="text-4xl font-extrabold mb-1">${essentialPrice}<span class="text-base text-gray-500 font-normal">/mo</span></p>
        <p class="text-sm text-gray-500 mb-4">+ ${essentialSetup} setup (billed after first audit)</p>
        <p class="text-sm text-gray-600 mb-4">For reports with 1–4 targeted items to dispute</p>
        <ul class="text-sm text-gray-600 space-y-2 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Tri-bureau audit</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Dispute letters + tracking</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Client portal + monthly updates</li>
        </ul>
        <a href="#" class="block text-center border-2 border-[#1e3a5f] font-bold py-3.5 rounded-xl hover:bg-[#1e3a5f] hover:text-white">Start Free Analysis →</a>
      </article>
      <article class="bg-white rounded-3xl border-4 border-blue-600 p-8 relative shadow-xl">
        <span class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full">MOST POPULAR</span>
        <h3 class="font-bold text-xl mb-1">Accelerated</h3>
        <p class="text-4xl font-extrabold mb-1">${acceleratedPrice}<span class="text-base text-gray-500 font-normal">/mo</span></p>
        <p class="text-sm text-gray-500 mb-4">+ ${acceleratedSetup} setup (billed after first audit)</p>
        <p class="text-sm text-gray-600 mb-4">For reports with 5+ items incl. collections &amp; charge-offs</p>
        <ul class="text-sm text-gray-600 space-y-2 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Everything in Essential</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Higher dispute volume + furnisher escalations</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Dedicated case manager + priority support</li>
        </ul>
        <a href="#" class="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl">Start Free Analysis →</a>
      </article>
      <article class="bg-white rounded-3xl border border-gray-200 p-8">
        <h3 class="font-bold text-xl mb-1">Momentum (Flat Fee)</h3>
        <p class="text-4xl font-extrabold mb-1">${flatPrice}</p>
        <p class="text-sm text-gray-500 mb-4">one-time · billed after initial audit + first dispute round</p>
        <p class="text-sm text-gray-600 mb-4">Defined scope, capped cost. Best for 3–8 items with a clear strategy.</p>
        <ul class="text-sm text-gray-600 space-y-2 mb-8">
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>One payment, one scope of work</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>No monthly billing</li>
          <li><i class="fas fa-check text-emerald-500 mr-2"></i>Full portal access</li>
        </ul>
        <a href="#" class="block text-center border-2 border-[#1e3a5f] font-bold py-3.5 rounded-xl hover:bg-[#1e3a5f] hover:text-white">Start Free Analysis →</a>
      </article>
    </div>
    <div class="bg-white border border-gray-200 rounded-2xl p-5 text-xs text-gray-600 max-w-3xl mx-auto">
      <i class="fas fa-gavel text-blue-600 mr-2"></i>Under the Credit Repair Organizations Act (CROA), we are legally required to complete services before billing for them. We do not charge upfront fees for credit repair services. You have the right to cancel within 3 business days of signing your service agreement, no questions asked. For our complete contract terms and your consumer rights disclosure, contact us.
    </div>
  </div>
</section>

<!-- [6] FAQ -->
<section id="faq" class="py-16">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">The Honest FAQ</h2>
    <div class="space-y-3">
      ${[
        ['Can you guarantee my credit score will improve?', 'No — and any company that does is breaking federal law (CROA §1679b). What we CAN do: identify every item on your report that may be inaccurate, unverifiable, or outdated — and dispute those items using your FCRA rights. Whether bureaus delete, correct, or verify them depends on their investigation findings.'],
        ['Can you remove a bankruptcy or foreclosure?', 'If it\'s accurately reported and within the FCRA reporting window (10 years for Ch.7, 7 years for Ch.13 and foreclosures), it cannot be legally removed. If it\'s reported INCORRECTLY — wrong dates, expired, or not yours — we can dispute that. We\'ll tell you honestly what\'s disputable after your free audit.'],
        ['Do you charge upfront?', 'Never. Under the Credit Repair Organizations Act, it\'s illegal to charge before services are performed. You only pay after each cycle of work is done.'],
        ['What\'s the "609 letter" I keep hearing about?', 'Section 609 of the FCRA gives you the right to request disclosure of your credit file. It\'s not a magic loophole that removes any item. What actually works is a properly constructed dispute under §611 (bureau investigation) and §623 (furnisher liability) — which is what we do.'],
        ['How long does credit repair take?', 'The CFPB estimates meaningful changes take 3-6 months of active work. Complex reports with heavy collections, identity theft, or bankruptcies can take 6-12 months. We\'ll give you an honest estimate after your audit.'],
        ['Can I do this myself?', 'Yes — the FTC and CFPB are clear: you can dispute inaccurate information yourself for free at annualcreditreport.com. We\'re here if you\'d rather have a team handle it, or if you\'ve tried DIY and need a different approach.'],
        ['What\'s your cancellation policy?', 'Cancel anytime. Under CROA, you have an unconditional right to cancel within 3 business days of signing with no penalty. After that, cancel anytime — you only owe for work already completed.'],
        ['Is credit repair even legal?', 'Absolutely — when done properly. It\'s the legal process of disputing inaccurate, unverifiable, or outdated information under the FCRA. What\'s NOT legal: charging upfront, making guarantees, or promising to remove accurate info. We don\'t do any of that.'],
        ['How is this different from credit counseling?', 'Credit counseling agencies help you manage debt and payments. Credit repair specifically addresses inaccuracies on your report through the dispute process. Different services, different goals — sometimes people need both.'],
        ['What information do I need to start?', 'Name, address, date of birth, and SSN for identity verification when we pull your tri-bureau reports. Your data is protected under GLBA and our Written Information Security Program.'],
        ['Do you share my information?', 'Never — without your explicit consent. Federal law (FCRA §604, GLBA) restricts how we can use your data. See our Privacy Policy for details.'],
        ['Are you licensed and bonded?', 'Yes — [state your CSO registrations and bond amounts by state, with links to verification]. Ask us and we\'ll show you.'],
      ].map(([question, a]) => `
      <details class="bg-gray-50 rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center text-sm">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform ml-3"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [7] FINAL CTA -->
<section id="final-cta" class="py-16 bg-gradient-to-br from-[#1e3a5f] to-[#0f2440] text-white text-center">
  <div class="max-w-2xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Your Free Analysis Is Exactly That — Free</h2>
    <p class="text-blue-200 mb-8">We'll show you what's on your report, what's disputable, and what your realistic options are. Then YOU decide.</p>
    <a href="#pricing" class="inline-block bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold px-10 py-5 rounded-2xl">Get My Free Credit Analysis →</a>
  </div>
</section>

<footer class="bg-[#0a1828] text-blue-300/50 text-xs text-center py-8 px-4">
  <p class="mb-2">${companyName} · Serving ${state}</p>
  <p class="max-w-2xl mx-auto mb-2">${companyName} is a credit repair organization as defined by the Credit Repair Organizations Act (15 U.S.C. §1679). You have the right to dispute inaccurate information in your credit report by contacting the credit bureaus directly, at no cost. Results may vary and are not guaranteed.</p>
  <p class="max-w-2xl mx-auto">This page is a template — verify state CSO registration, bonding, and attorney review before publishing.</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
</body>
</html>`
}
