import { shell, copyBlock } from './layout'

export const taxPage = () => shell('Tax Funnels', 'tax', `
<section id="tax-hero" class="mb-10">
  <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-3"><i class="fas fa-scale-balanced text-emerald-400 mr-2"></i>Tax Service Funnels</h1>
  <p class="text-gray-400 max-w-3xl">Circular 230 · FTC Act · TSR · GLBA · TCPA · CAN-SPAM · IRC §7216 — all encoded. Built on the exact lessons of <span class="text-brand-warn">FTC v. American Tax Service (June 2026, $77.7M judgment, lifetime bans)</span>. Compliant first, converted second.</p>
</section>

<section id="tax-templates" class="grid md:grid-cols-2 gap-4 mb-12">
  <a href="/t/tax-lead" target="_blank" class="card p-6 block group">
    <h2 class="font-bold text-white mb-1 group-hover:text-brand-cyan"><i class="fas fa-window-maximize text-emerald-400 mr-2"></i>Tax Resolution Lead Funnel <i class="fas fa-arrow-up-right-from-square text-xs text-gray-600"></i></h2>
    <p class="text-gray-400 text-sm">Free case evaluation funnel — all 8 sections: compliant hero, credibility bar, IRS notice pain block, education on real IRS programs, disclaimered proof, authority stack, compliance-first FAQ, final CTA. Customize in the <a href="/builder" class="text-brand-cyan underline">Builder</a>.</p>
  </a>
  <div class="card p-6">
    <h2 class="font-bold text-white mb-3"><i class="fas fa-sitemap text-emerald-400 mr-2"></i>5 Tax Funnel Types</h2>
    <ul class="text-sm text-gray-400 space-y-2">
      <li><span class="text-white font-semibold">1. Free Consultation Lead Funnel</span> — resolution, high volume (live template ←)</li>
      <li><span class="text-white font-semibold">2. Tax Prep Acquisition</span> — $197–$10K+ tiers, seasonal + year-round</li>
      <li><span class="text-white font-semibold">3. Tax Strategy High-Ticket</span> — $3K–$25K application funnel</li>
      <li><span class="text-white font-semibold">4. Webinar Funnel</span> — education → offer (no stage guarantees)</li>
      <li><span class="text-white font-semibold">5. Referral Partner B2B</span> — §7216 consent required for data sharing</li>
    </ul>
  </div>
</section>

<section id="prohibited" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-ban text-brand-danger mr-2"></i>The 12 Things That Get You Sued / Banned</h2>
  <div class="grid md:grid-cols-2 gap-2 text-sm">
    ${[
      '"Pennies on the dollar" claims before reviewing the case',
      'IRS impersonation (logos, language, implied affiliation)',
      '"Government certified" / "IRS approved" / "IRS partner"',
      'Upfront fees for debt relief / tax resolution (TSR)',
      'Guaranteeing specific settlement amounts or refund sizes',
      'Threats about IRS action to pressure prospects',
      'Fabricating testimonials or results',
      'Using client tax data for marketing without §7216 consent',
      'Marketing texts without express written consent (TCPA)',
      'Ignoring the Do Not Call registry',
      'Failing to disclose negative consequences of resolution',
      '"IRS Certified Tax Professional" (this title does not exist)',
    ].map((item, i) => `<p class="card p-3 text-gray-300"><span class="text-brand-danger font-mono font-bold mr-2">[${i+1}]</span>${item}</p>`).join('')}
  </div>
  <p class="text-xs text-gray-500 mt-3">Sourced from FTC enforcement actions 2023–2026, incl. FTC v. American Tax Service (June 2, 2026): $77.7M judgment, operators banned for life. Core violations: IRS impersonation, pennies-on-dollar claims, fictitious add-on upsells, upfront fee collection.</p>
</section>

<section id="compliant-copy" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-check-double text-brand-success mr-2"></i>Compliant Copy Formulas</h2>
  <div class="grid md:grid-cols-2 gap-4">
  ${copyBlock('tax-headlines', 'Compliant Headlines (all 4 categories)', `PAIN-BASED (always compliant):
"Owe Back Taxes? Here's What Your Options Actually Are."
"IRS Letters Showing Up? Here's What to Do First."
"Behind on Filing? Here's How to Get Current Without the Stress."
"Facing an IRS Audit? Here's What Every [State] Business Owner Needs to Know."

OUTCOME-BASED (with disclaimer):
"[Client Name] Reduced Their Tax Debt — Here's What Made Them Eligible" [Results vary.]
"How We Helped [X] Taxpayers Get Into Good Standing With the IRS — and What Made Them Qualify"

EDUCATION-BASED (safest — highest trust):
"The 4 IRS Programs That Help Taxpayers Who Can't Pay in Full (And Who Qualifies for Each)"
"Fresh Start Initiative: What It Is, Who Qualifies, and How to Apply Without Getting Scammed"
"Before You Ignore That IRS Notice: The 30-Day Window That Changes Everything"

AUTHORITY-BASED:
"Work with an IRS Enrolled Agent — Not a Call Center"
"Licensed CPA + IRS Representation: [Firm Name] Has Handled [X] IRS Cases in [City/State]"
"[X] Years Representing Taxpayers Before the IRS — No Upfront Fees Until We Evaluate Your Case"`)}
  ${copyBlock('tax-ctas', 'Compliant CTAs (+ never-use list)', `✅ USE THESE:
"Get Your Free Case Evaluation →"
"See What IRS Relief Programs You Qualify For →"
"Talk to a Licensed Tax Professional — No Obligation →"
"Request Your Free IRS Transcript Review →"
"Find Out If You Qualify for an Offer in Compromise →"
"Schedule Your Free 30-Minute Tax Relief Consultation →"

❌ NEVER:
"Stop IRS Harassment Now!"
"Get Your Debt Wiped Out!"
"Claim Your Tax Refund!"
"The IRS Owes You Money!"`)}
  </div>
</section>

<section id="irs-programs" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4">IRS Programs Education Block (funnel section 4)</h2>
  <div class="grid md:grid-cols-3 gap-4 text-sm">
    ${[
      ['Installment Agreement (IA)', 'Pay over time — up to 72 months. Streamlined IA under $50,000 (Fresh Start). For taxpayers who can pay over time.'],
      ['Offer in Compromise (OIC)', 'Settle for less IF you qualify. IRS evaluates ability to pay, income, expenses, assets. NOT for everyone — ~40–45% historical acceptance.'],
      ['Currently Not Collectible', 'IRS pauses collection on demonstrated hardship. Does NOT eliminate debt — interest continues accruing.'],
      ['Penalty Abatement', 'First-Time Abatement with clean compliance history. 2025 returns filed in 2026: IRS applies FTA automatically for qualifying filers.'],
      ['Innocent Spouse Relief', 'When one spouse is responsible for the tax error. Strict eligibility requirements apply.'],
      ['Bankruptcy (Ch. 7/13)', 'Some tax debts dischargeable under specific rules. Requires bankruptcy attorney coordination.'],
    ].map(([t, d]) => `
    <article class="card p-4">
      <h3 class="font-bold text-emerald-400 text-sm mb-1">${t}</h3>
      <p class="text-gray-400 text-xs">${d}</p>
    </article>`).join('')}
  </div>
</section>

<section id="tax-pricing" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4">Tax Prep Offer Stack (2026 benchmarks)</h2>
  <div class="grid md:grid-cols-4 gap-4 text-sm">
    ${[
      ['Starter', '$197–$350', '1040 simple, no schedules'],
      ['Standard', '$350–$537', '1040 + Schedule A/B/C'],
      ['Business Owner', '$750–$2,500', 'S-Corp, LLC, partnerships'],
      ['Premium', '$2,500–$10,000+', 'Complex, multi-state, high-net-worth'],
    ].map(([t, p, d]) => `
    <article class="card p-4 text-center">
      <h3 class="font-bold text-white">${t}</h3>
      <p class="grad-text font-heading font-bold text-lg my-1">${p}</p>
      <p class="text-gray-500 text-xs">${d}</p>
    </article>`).join('')}
  </div>
</section>

<section id="tax-disclaimers" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-shield-halved text-emerald-400 mr-2"></i>Key Disclaimers (full library in <a href="/compliance" class="text-brand-cyan underline">Compliance Vault</a>)</h2>
  ${copyBlock('oic-disclaimer', 'OIC-Specific Disclaimer (use verbatim)', `An Offer in Compromise (OIC) is an IRS program that allows eligible taxpayers to settle their tax debt for less than the full amount owed. OIC acceptance is determined solely by the IRS based on your ability to pay, income, expenses, and asset equity. Not all taxpayers qualify. The IRS accepted approximately [X]% of OIC applications in [year]. We do not guarantee OIC acceptance or any specific settlement amount without first evaluating your complete tax situation.`)}
</section>

<section id="tax-checklist" class="card p-6">
  <h2 class="text-xl font-bold text-white mb-4"><i class="fas fa-clipboard-check text-emerald-400 mr-2"></i>Pre-Launch Compliance Checklist</h2>
  <ul class="grid md:grid-cols-2 gap-2 text-sm text-gray-300">
    ${[
      'Licensed attorney reviews all ad copy + disclaimers',
      'State CPA/EA advertising rules confirmed for your state',
      'WISP documented and current (GLBA Safeguards Rule)',
      'PTIN + EFIN active and current for 2026',
      '§7216 consent forms in place for any data sharing',
      'TCPA consent mechanism tested with compliance consultant',
      'All marketing materials retained 36 months (Circular 230 §10.30(d))',
      'TSR compliance confirmed if phone/inbound calls from ads',
    ].map(i => `<li><i class="fas fa-square-check text-brand-success mr-2"></i>${i}</li>`).join('')}
  </ul>
</section>
`)
