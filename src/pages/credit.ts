import { shell, copyBlock } from './layout'

export const creditPage = () => shell('Credit Repair Funnels', 'credit', `
<section id="credit-hero" class="mb-10">
  <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-3"><i class="fas fa-chart-line text-blue-400 mr-2"></i>Credit Repair Funnels</h1>
  <p class="text-gray-400 max-w-3xl">CROA (15 U.S.C. §1679) · FCRA · TSR · FTC Act §5 · CFPB · TCPA · GLBA · ~26 state CSO laws — encoded. Engineered post <span class="text-brand-warn">CFPB v. Credit Repair Cloud ($2M, Aug 2024)</span> and <span class="text-brand-warn">FTC $10.9M pyramid scheme distribution (Mar 2026)</span>.</p>
</section>

<section id="credit-templates" class="grid md:grid-cols-2 gap-4 mb-12">
  <a href="/t/credit-service" target="_blank" class="card p-6 block group">
    <h2 class="font-bold text-white mb-1 group-hover:text-brand-cyan"><i class="fas fa-user-check text-blue-400 mr-2"></i>B2C Credit Repair Service Funnel <i class="fas fa-arrow-up-right-from-square text-xs text-gray-600"></i></h2>
    <p class="text-gray-400 text-sm">CROA-compliant consumer funnel: education-first hero, FCRA rights block, 5-step process with post-service billing, disclaimered proof, 3-tier + flat-fee pricing, 12-question honest FAQ. Customize in <a href="/builder" class="text-brand-cyan underline">Builder</a>.</p>
  </a>
  <a href="/t/credit-saas" target="_blank" class="card p-6 block group">
    <h2 class="font-bold text-white mb-1 group-hover:text-brand-cyan"><i class="fas fa-laptop-code text-blue-400 mr-2"></i>B2B Credit Repair SaaS Funnel <i class="fas fa-arrow-up-right-from-square text-xs text-gray-600"></i></h2>
    <p class="text-gray-400 text-sm">Compliance-first software positioning — the post-Credit-Repair-Cloud playbook. Feature marketing tied to CROA/TSR safety, 4-tier SaaS pricing, onboarding compliance requirements.</p>
  </a>
</section>

<section id="croa-six" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4">CROA's Six Non-Negotiable Requirements</h2>
  <div class="grid md:grid-cols-3 gap-4 text-sm">
    ${[
      ['No Advance Fees §1679b(b)', 'No money before services are FULLY performed. Work first, bill after. Violation = criminal penalties + private right of action.'],
      ['Written Contract §1679d', 'Signed before services begin. Must contain: services description, total payments, performance timeline, address, 3-day cancel right, cancellation form.'],
      ['Consumer Rights Statement §1679c', 'SEPARATE standalone document, provided and acknowledged BEFORE the contract is presented. Verbatim statutory text required.'],
      ['3-Day Right to Cancel §1679e', 'Unconditional. Cannot be waived — waiver clauses are VOID. Services cannot begin until the 3-day window expires.'],
      ['No False Representations §1679b(a)', 'No untrue/misleading claims in ANY medium about services, results, or creditworthiness. This is where most companies get destroyed.'],
      ['Civil + Criminal Liability', 'Private right of action (every client can sue). Actual + punitive damages + attorney fees. Class action exposure. Up to 5 years imprisonment for willful violations.'],
    ].map(([t, d], i) => `
    <article class="card p-4">
      <span class="bg-blue-600 text-white font-bold w-7 h-7 rounded-full flex items-center justify-center text-xs mb-2">${i+1}</span>
      <h3 class="font-bold text-white text-sm mb-1">${t}</h3>
      <p class="text-gray-500 text-xs">${d}</p>
    </article>`).join('')}
  </div>
</section>

<section id="disputable" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4">FCRA: Disputable vs. Not Removable (critical for marketing accuracy)</h2>
  <div class="grid md:grid-cols-2 gap-4">
    <article class="card p-5 border-emerald-800">
      <h3 class="font-bold text-brand-success mb-3"><i class="fas fa-check-circle mr-2"></i>Legally Disputable</h3>
      <ul class="text-sm text-gray-300 space-y-1.5">
        <li>✅ Inaccurate information (wrong balances, dates, status)</li>
        <li>✅ Unverifiable information (can't verify = must delete)</li>
        <li>✅ Outdated (most negatives: 7yr; Ch.7 bankruptcy: 10yr)</li>
        <li>✅ Duplicate listings of the same debt</li>
        <li>✅ Identity theft entries (§605B block)</li>
        <li>✅ Mixed files (someone else's data on your report)</li>
      </ul>
    </article>
    <article class="card p-5 border-red-900">
      <h3 class="font-bold text-brand-danger mb-3"><i class="fas fa-times-circle mr-2"></i>NOT Legally Removable</h3>
      <ul class="text-sm text-gray-300 space-y-1.5">
        <li>❌ Accurate, verifiable, timely negative information</li>
        <li>❌ Bankruptcy filed correctly within the 10-year window</li>
        <li>❌ A collection that IS yours, accurate, within 7 years</li>
        <li>❌ Any accurate info — regardless of how negative</li>
      </ul>
      <p class="text-xs text-gray-500 mt-3">Marketing "609 letters" as a guaranteed-removal loophole = CROA §1679b(a) + FTC Act §5 violation. §609 is a disclosure right, not a magic eraser.</p>
    </article>
  </div>
</section>

<section id="banned-claims" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-ban text-brand-danger mr-2"></i>The 15 Claims That Get You Sued or Banned</h2>
  <div class="grid md:grid-cols-2 gap-2 text-sm">
    ${[
      '"We can remove ANY negative item from your credit report"',
      '"We guarantee a [X] point score increase"',
      '"Erase your bad credit — start fresh"',
      '"Secret loophole the credit bureaus don\'t want you to know"',
      '"609 letter removes all negative items guaranteed"',
      '"New credit identity / CPN / credit privacy number"',
      '"We work with the credit bureaus" (implying official relationship)',
      '"Pay nothing until results" (while billing upfront anyway)',
      'Any claim guaranteeing specific credit score outcomes',
      '"Get approved for [mortgage/loan] after using our service"',
      '"Remove bankruptcies, foreclosures, judgments — guaranteed"',
      'Biz-opp income claims without FTC earnings disclaimer',
      '"As seen on [network]" without verified media placement',
      'Charging fees before services are fully performed',
      'No CROA Consumer Rights Statement before contract signing',
    ].map((item, i) => `<p class="card p-3 text-gray-300"><span class="text-brand-danger font-mono font-bold mr-2">[${i+1}]</span>${item}</p>`).join('')}
  </div>
</section>

<section id="credit-pricing" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4">2026 Pricing Benchmarks</h2>
  <div class="grid md:grid-cols-5 gap-4 text-sm">
    ${[
      ['Budget', '$79–$99/mo', '+ $0–$99 setup'],
      ['Standard', '$99–$149/mo', '+ $99–$249 setup'],
      ['Premium', '$179–$250/mo', '+ $199–$400 setup'],
      ['Couples', '$300–$400/mo', 'combined'],
      ['Flat-Fee', '$1,000–$1,500', 'one-time, defined scope'],
    ].map(([t, p, d]) => `
    <article class="card p-4 text-center">
      <h3 class="font-bold text-white text-sm">${t}</h3>
      <p class="text-blue-400 font-heading font-bold my-1">${p}</p>
      <p class="text-gray-500 text-xs">${d}</p>
    </article>`).join('')}
  </div>
  <p class="text-xs text-gray-500 mt-3">Engagement windows (CFPB data): simple 2–4 mo · moderate 3–6 mo · complex 6–12 mo. All billing must trigger AFTER completed work cycles.</p>
</section>

<section id="saas-lesson" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-triangle-exclamation text-brand-warn mr-2"></i>The Credit Repair Cloud Lesson (SaaS Liability)</h2>
  <div class="grid md:grid-cols-2 gap-4">
    <article class="card p-5">
      <h3 class="font-bold text-brand-danger mb-2">Dangerous SaaS Positioning</h3>
      <ul class="text-sm text-gray-400 space-y-1.5">
        <li>❌ "Get paid fast" (without specifying post-service)</li>
        <li>❌ "Set up recurring payments on day one"</li>
        <li>❌ "Charge your clients upfront with our billing tool"</li>
        <li>❌ "Scale your revenue immediately from signup"</li>
        <li>❌ Training content showing TSR-violating billing</li>
      </ul>
    </article>
    <article class="card p-5">
      <h3 class="font-bold text-brand-success mb-2">Safe SaaS Positioning</h3>
      <ul class="text-sm text-gray-400 space-y-1.5">
        <li>✅ "Help your clients, get paid after results"</li>
        <li>✅ "CROA-compliant billing workflows built in"</li>
        <li>✅ "Manage disputes, track results, automate compliance"</li>
        <li>✅ "Built for TSR-compliant credit repair businesses"</li>
        <li>✅ Compliance training required before billing features unlock</li>
      </ul>
    </article>
  </div>
  <p class="text-xs text-gray-500 mt-3">CFPB v. Credit Repair Cloud (Aug 2024): $2M settlement — the platform was held liable for ENABLING downstream companies to collect illegal upfront fees. The CEO paid personally. Platforms have liability. Build compliance in from day one.</p>
</section>

<section id="croa-docs" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-folder-open text-blue-400 mr-2"></i>15 Required Legal Documents</h2>
  <div class="grid md:grid-cols-3 gap-2 text-sm">
    ${[
      'CROA Consumer Rights Statement (verbatim §1679c)',
      'Written Service Agreement (all §1679d elements)',
      'Notice of Cancellation Form (every contract)',
      'Privacy Policy (GLBA + state-specific)',
      'Terms of Service (CROA + TSR acknowledgment)',
      'TCPA Consent Language (all opt-in forms)',
      'CAN-SPAM email footer (all emails)',
      'FTC Endorsement Disclosures (affiliates)',
      'Results Disclaimer Template (all testimonials)',
      'State CSO Registration Docs (by state)',
      'Surety Bond Documentation (by state)',
      'Written Information Security Program (WISP)',
      'FCRA Permissible Purpose Documentation',
      'Vendor/Partner Data Processing Agreements',
      'Earnings Disclaimer (biz-opp marketing)',
    ].map((d, i) => `<p class="card p-3 text-gray-300 text-xs"><span class="text-blue-400 font-mono font-bold mr-2">${i+1}.</span>${d}</p>`).join('')}
  </div>
</section>

<section id="state-cso" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4">State CSO Laws (~26 states — verify current)</h2>
  <div class="card p-5">
    <p class="text-sm text-gray-300 mb-3">States with registration / licensing / bonding requirements (bonds range $10,000–$100,000+):</p>
    <div class="flex flex-wrap gap-2 text-xs">
      ${['California','Texas','Georgia','Virginia','Maryland','Louisiana','Florida','Arizona','Colorado','Illinois','Indiana','Kansas','Michigan','Missouri','Nevada','North Carolina','Ohio','Oklahoma','Oregon','Pennsylvania','South Carolina','Tennessee','Utah','Washington','Wisconsin','Wyoming'].map(s => `<span class="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full">${s}</span>`).join('')}
    </div>
    <p class="text-xs text-gray-500 mt-3">National operations require compliance in every state where clients reside. Affiliates and lead generators may ALSO be subject to CSO laws. Hire a consumer financial law attorney for multi-state analysis.</p>
  </div>
</section>

<section id="credit-copy" class="mb-4">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-check-double text-brand-success mr-2"></i>Compliant Copy Grab</h2>
  ${copyBlock('credit-headlines', 'Compliant Headlines + CTAs', `EDUCATION-FIRST (safest — highest trust):
"Did You Know You Have the Legal Right to Dispute Inaccurate Items on Your Credit Report — For Free?"
"3 Things on Your Credit Report That May Be Wrong Right Now (And How to Fix Them)"
"What a 620 vs. 760 Credit Score Actually Costs You on a $300,000 Mortgage ($72,500+ Over 30 Years)"

PAIN-BASED (compliant when honest):
"Bad Credit Costing You Thousands? Here's What You Can Actually Do About It."
"Getting Denied? Here's How to Find Out What's Hurting Your Credit — and What's Actually Fixable."

PROOF-BASED (with mandatory disclaimer):
"[Client Name] Had 8 Negative Items Disputed and 5 Were Removed — Here's What Made Them Disputable"
[REQUIRED: "Results may vary. Individual outcomes depend on the specific items on your credit report and whether they can be successfully disputed under the FCRA."]

SOFTWARE/B2B:
"Run a CROA-Compliant Credit Repair Business from Day One"
"The Software Built for Credit Repair Professionals Who Actually Want to Stay in Business"

✅ CTAs: "Get Your Free Credit Consultation →" · "See What's Disputable on Your Report — Free Analysis →" · "Start My Free Case Review →" · "Book a Demo →"
❌ NEVER: "Fix My Credit Now!" · "Remove All Negatives →" · "Get My 100-Point Boost →" · "Erase My Bad Credit →"`)}
</section>
`)
