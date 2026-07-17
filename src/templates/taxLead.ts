import { param, funnelHead, templateBadge } from './helpers'

export const taxLeadTemplate = (q: Record<string, string | undefined>) => {
  const firmName = param(q, 'firmName', 'Jefferson Tax Resolution Group')
  const credential = param(q, 'credential', 'Enrolled Agents (EA) & CPAs')
  const state = param(q, 'state', 'New Mexico')
  const years = param(q, 'years', '12')
  const casesHandled = param(q, 'casesHandled', '2,400+')
  const phone = param(q, 'phone', '(505) 555-0134')

  return `${funnelHead(`${firmName} — Free Tax Case Evaluation`)}
<body class="bg-white text-gray-900">

<!-- [1] HERO + FORM -->
<header id="hero" class="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
  <div class="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-center">
    <div>
      <h1 class="text-3xl md:text-5xl font-extrabold leading-tight mb-4">Owe Back Taxes to the IRS? Get a Free Case Evaluation from a Licensed ${credential.includes('EA') ? 'EA' : 'Professional'}</h1>
      <p class="text-lg text-slate-300 mb-6">Find out exactly which IRS relief programs you qualify for — at no cost or obligation.</p>
      <ul class="space-y-2 text-sm text-slate-300">
        <li><i class="fas fa-check text-emerald-400 mr-2"></i>No upfront fees — we evaluate first</li>
        <li><i class="fas fa-check text-emerald-400 mr-2"></i>Licensed professionals — verify our credentials anytime</li>
        <li><i class="fas fa-check text-emerald-400 mr-2"></i>Confidential · No-obligation · No IRS-style pressure</li>
      </ul>
    </div>
    <form id="lead-form" class="bg-white text-gray-900 rounded-3xl p-8 shadow-2xl" onsubmit="event.preventDefault(); alert('Template form — wire to your CRM/API before launch.')">
      <h2 class="font-bold text-xl mb-4">Get My Free Case Evaluation</h2>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <input required name="firstName" placeholder="First Name" class="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full">
        <input required name="lastName" placeholder="Last Name" class="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full">
      </div>
      <input required type="tel" name="phone" placeholder="Phone" class="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full mb-3">
      <input required type="email" name="email" placeholder="Email" class="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full mb-3">
      <select name="amountOwed" class="border border-gray-300 rounded-lg px-3 py-2.5 text-sm w-full mb-4 text-gray-600">
        <option value="">Estimated amount owed...</option>
        <option>Under $10,000</option><option>$10,000 – $25,000</option>
        <option>$25,000 – $50,000</option><option>$50,000 – $100,000</option><option>Over $100,000</option>
      </select>
      <button class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-lg">Get My Free Case Evaluation →</button>
      <label class="flex items-start gap-2 text-[11px] text-gray-500 mt-4">
        <input type="checkbox" required class="mt-0.5">
        <span>By submitting this form, I consent to receive marketing calls and text messages from ${firmName} at the phone number provided, including messages sent via automated dialing systems. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out. View our Privacy Policy and Terms of Service.</span>
      </label>
    </form>
  </div>
</header>

<!-- [2] CREDIBILITY BAR -->
<section id="credibility" class="bg-slate-100 py-6">
  <div class="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-slate-700 font-medium text-center">
    <span><i class="fas fa-user-shield text-emerald-600 mr-2"></i>${casesHandled} Taxpayers Helped</span>
    <span><i class="fas fa-certificate text-emerald-600 mr-2"></i>Licensed ${credential} on Staff</span>
    <span><i class="fas fa-clock text-emerald-600 mr-2"></i>${years} Years Serving ${state} Taxpayers</span>
    <span><i class="fas fa-lock text-emerald-600 mr-2"></i>Confidential &amp; No-Obligation</span>
  </div>
</section>

<!-- [3] PAIN — IRS NOTICES -->
<section id="notices" class="py-16">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-3">If You've Received Any of These — You Need to Act Now</h2>
    <p class="text-center text-gray-600 mb-10">These aren't scare tactics — these are real deadlines. Missing them reduces your options. Acting now preserves them.</p>
    <div class="grid md:grid-cols-2 gap-3">
      ${[
        ['CP2000 Notice', 'Income mismatch — the IRS thinks you underreported'],
        ['CP503 / CP504', 'Balance due notices — escalating collection sequence'],
        ['Letter 11 / 1058', 'FINAL NOTICE — Intent to Levy. 30-day window to respond'],
        ['Form 668-Y', 'Federal Tax Lien filed — now public record'],
        ['Wage Garnishment Notice', 'The IRS is about to take part of every paycheck'],
        ['Bank Levy Notice', 'Your accounts can be frozen and seized'],
        ['Audit Notification', 'Examination opened — representation matters here'],
      ].map(([n, d]) => `
      <article class="border border-gray-200 rounded-xl p-4 flex gap-3">
        <i class="fas fa-envelope-open-text text-red-500 mt-1"></i>
        <div><p class="font-bold text-sm">${n}</p><p class="text-gray-600 text-xs">${d}</p></div>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [4] EDUCATION — IRS PROGRAMS -->
<section id="programs" class="py-16 bg-slate-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-3">The Legitimate IRS Programs That May Apply to You</h2>
    <p class="text-center text-gray-600 mb-10 max-w-2xl mx-auto">What each one is and who actually qualifies — no hype, just the law.</p>
    <div class="grid md:grid-cols-3 gap-5">
      ${[
        ['Installment Agreement', 'Pay over time — up to 72 months for individuals. Streamlined agreements available if you owe under $50,000 (Fresh Start).', 'Good for: taxpayers who can pay over time'],
        ['Offer in Compromise (OIC)', 'Settle for less than the full amount IF you qualify. The IRS evaluates ability to pay, income, expenses, and asset equity. Not available to everyone.', 'OIC acceptance depends on your specific circumstances as evaluated by the IRS. Not all applicants qualify. Results vary.'],
        ['Currently Not Collectible', 'IRS pauses collection if you demonstrate hardship. Does NOT eliminate the debt — interest continues to accrue during CNC status.', 'Good for: genuine financial hardship'],
        ['Penalty Abatement', 'First-Time Abatement may waive penalties with a clean compliance history. Reasonable Cause abatement also available.', 'Good for: first-time issues, documented hardship'],
        ['Innocent Spouse Relief', 'Available when one spouse is responsible for the tax error. Strict eligibility requirements apply.', 'Good for: joint filers with a spouse-created liability'],
        ['Levy & Garnishment Release', 'In many cases, active levies can be released while your resolution is negotiated — but timing is critical.', 'Good for: active garnishment or levy situations'],
      ].map(([t, d, note]) => `
      <article class="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 class="font-bold text-emerald-700 mb-2">${t}</h3>
        <p class="text-gray-600 text-sm mb-3">${d}</p>
        <p class="text-xs text-gray-500 italic">${note}</p>
      </article>`).join('')}
    </div>
    <p class="text-center font-semibold mt-10">Which program fits your situation? That's exactly what your free case evaluation will determine.</p>
  </div>
</section>

<!-- [5] SOCIAL PROOF -->
<section id="proof" class="py-16">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Real Cases. Real Outcomes.</h2>
    <div class="grid md:grid-cols-2 gap-6 mb-4">
      <article class="border border-gray-200 rounded-2xl p-6">
        <p class="text-gray-700 mb-4">"I ignored IRS notices for two years out of fear. ${firmName} pulled my transcripts, walked me through my actual options, and set up an installment agreement I could live with. The garnishment threat is gone."</p>
        <p class="font-semibold text-sm">Robert M., ${state}</p>
        <p class="text-[11px] text-gray-500 mt-2">Results may vary. This client's outcome depended on their specific tax situation and IRS eligibility determination.</p>
      </article>
      <article class="border border-gray-200 rounded-2xl p-6">
        <p class="text-gray-700 mb-4">"As a small business owner, I owed more than I could ever pay at once. They evaluated my case honestly — told me what I qualified for and what I didn't — and handled everything with the IRS directly."</p>
        <p class="font-semibold text-sm">Denise A., ${state}</p>
        <p class="text-[11px] text-gray-500 mt-2">Results may vary. Individual outcomes depend on your specific facts, circumstances, and IRS determinations.</p>
      </article>
    </div>
    <p class="text-xs text-gray-500 text-center">Template testimonials — replace with your real, permissioned client statements before publishing.</p>
  </div>
</section>

<!-- [6] WHO WE ARE -->
<section id="about" class="py-16 bg-slate-900 text-white">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Who You'll Be Working With</h2>
    <div class="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <ul class="space-y-3 text-sm text-slate-300">
          <li><i class="fas fa-id-badge text-emerald-400 mr-2"></i>Licensed ${credential} — credentials verifiable via IRS &amp; state boards</li>
          <li><i class="fas fa-file-signature text-emerald-400 mr-2"></i>IRS representation via Form 2848 (Power of Attorney)</li>
          <li><i class="fas fa-briefcase text-emerald-400 mr-2"></i>${years} years in practice · ${casesHandled} cases handled</li>
          <li><i class="fas fa-shield-halved text-emerald-400 mr-2"></i>Your data protected under GLBA + our Written Information Security Program</li>
        </ul>
      </div>
      <div class="bg-slate-800 rounded-2xl p-6">
        <p class="text-slate-300 text-sm mb-4"><i class="fas fa-circle-info text-emerald-400 mr-2"></i><strong class="text-white">Straight talk:</strong> we are NOT affiliated with the IRS or any government agency. We're licensed professionals who represent YOU before the IRS. Anyone implying otherwise is breaking federal law — and that's exactly who you should avoid.</p>
        <p class="text-slate-400 text-xs">Verify any tax professional: IRS Directory of Federal Tax Return Preparers · State CPA board lookup · BBB profile</p>
      </div>
    </div>
  </div>
</section>

<!-- [7] FAQ -->
<section id="faq" class="py-16 bg-slate-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Honest Answers to Real Questions</h2>
    <div class="space-y-3">
      ${[
        ['Can you really settle my taxes for less?', 'It depends entirely on your specific situation. The IRS offers an Offer in Compromise program for taxpayers who genuinely cannot pay their full debt. Acceptance is based on your ability to pay, income, expenses, and asset equity — not on what any company claims. We evaluate your case first, then tell you honestly which programs you qualify for.'],
        ['Will I owe you money before you help me?', 'No. We do not collect fees before delivering services. Your free consultation is genuinely free.'],
        ['How do I know this isn\'t a scam?', 'Fair question — the tax relief industry has real bad actors. Verify us: IRS preparer directory, state license lookup, BBB profile, Google reviews. We\'re happy to provide references.'],
        ['What if the IRS is already garnishing my wages?', 'We may be able to help get a levy released while we evaluate your options. Act quickly — time matters here.'],
        ['Do you work with the IRS directly?', 'Yes — our licensed professionals are federally authorized to represent taxpayers before the IRS in audits, collections, and appeals. We use Form 2848 (Power of Attorney) so we can speak to the IRS on your behalf.'],
        ['What if I haven\'t filed in years?', 'Non-filers are one of our specialties. The IRS prioritizes compliance over punishment for taxpayers who come forward voluntarily. Getting current is always better than waiting.'],
        ['Will this hurt my credit?', 'Tax debt and federal tax liens can have financial implications. Your case evaluation includes walking through all implications of each resolution option.'],
        ['What do I need for the consultation?', 'Nothing formal — just a general sense of what you owe, which years, and what notices you\'ve received. With your consent, we\'ll pull your IRS transcripts for the full picture.'],
        ['What if I can\'t afford your fees?', 'We offer payment plans. And we\'ll tell you honestly if your situation is something you can handle yourself — we won\'t oversell a service you don\'t need.'],
        ['How long does resolution take?', 'It varies by program and case complexity — from a few weeks (simple agreements) to 6-12+ months (OIC). We\'ll give you an honest timeline after evaluating your case.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center text-sm">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform ml-3"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [8] FINAL CTA -->
<section id="final-cta" class="py-16 bg-gradient-to-br from-slate-900 to-emerald-950 text-white text-center">
  <div class="max-w-2xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Every Day You Wait, Interest and Penalties Grow</h2>
    <p class="text-slate-300 mb-8">Your free consultation costs you nothing. It could save you thousands. No pressure, no obligation, no catch.</p>
    <a href="#lead-form" class="inline-block bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-bold px-10 py-5 rounded-2xl mb-4">Schedule My Free Evaluation →</a>
    <p class="text-sm text-slate-400">Or call us directly: <a href="tel:${phone.replace(/[^0-9+]/g,'')}" class="text-emerald-400 font-semibold">${phone}</a></p>
    <p class="text-xs text-slate-500 mt-6 max-w-xl mx-auto">Scheduling a consultation does not establish a professional-client relationship. ${firmName} will review your situation and advise you of your options.</p>
  </div>
</section>

<footer class="bg-slate-950 text-slate-500 text-xs text-center py-8 px-4">
  <p class="mb-2">${firmName} · Serving ${state} Taxpayers</p>
  <p class="max-w-2xl mx-auto mb-2">This content is for informational purposes only and does not constitute legal or tax advice. Tax laws change frequently. Consult a licensed tax professional regarding your specific situation. ${firmName} is not affiliated with or endorsed by the IRS or any government agency.</p>
  <p class="max-w-2xl mx-auto">Your information is protected under the Gramm-Leach-Bliley Act and our Written Information Security Program (WISP). We do not sell your personal or tax information.</p>
</footer>

${templateBadge}
<script src="/static/app.js"></script>
</body>
</html>`
}
