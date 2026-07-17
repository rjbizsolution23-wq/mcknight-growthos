import { shell, copyBlock } from './layout'

const tabBtn = (id: string, label: string, active = false) =>
  `<button data-tab="${id}" class="px-4 py-2 rounded-lg text-sm ${active ? 'grad-bg text-white font-semibold' : 'text-gray-300 hover:bg-gray-800'}">${label}</button>`

export const compliancePage = () => shell('Compliance Vault', 'compliance', `
<section id="compliance-hero" class="mb-8">
  <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-3"><i class="fas fa-shield-halved grad-text mr-2"></i>Compliance Vault</h1>
  <p class="text-gray-400 max-w-3xl">Verbatim disclaimers, consent language, and legal checklists — the armor for every launch. <span class="text-brand-warn">Everything here requires review by a licensed attorney in your state before use. Not legal advice.</span></p>
</section>

<nav data-tab-group="compliance" class="flex flex-wrap gap-2 mb-8 card p-3">
  ${tabBtn('universal', 'Universal (TCPA · CAN-SPAM · FTC)', true)}
  ${tabBtn('taxdisc', 'Tax Disclaimers', false)}
  ${tabBtn('creditdisc', 'Credit Repair (CROA)', false)}
  ${tabBtn('eventsdisc', 'Events & Earnings', false)}
  ${tabBtn('checklists', 'Launch Checklists', false)}
</nav>

<!-- UNIVERSAL -->
<div data-tab-panel-group="compliance" data-tab-panel="universal">
  <h2 class="text-xl font-bold text-white mb-4">Universal Marketing Compliance</h2>
  ${copyBlock('tcpa', 'TCPA Consent Language (all opt-in forms — separate UNCHECKED checkbox)', `By checking this box, I consent to receive marketing calls and text messages from [Company Name] at the phone number provided, including messages sent via automated dialing systems. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out. Reply HELP for assistance. View our Privacy Policy and Terms of Service.

IMPLEMENTATION RULES:
→ Never pre-check the box
→ Store consent timestamp, IP address, and form version
→ Use a consent verification platform (TrustedForm, ActiveProspect)
→ Honor opt-outs within 10 business days
→ No texts before 8 AM or after 9 PM recipient's local time
→ Violations: $500–$1,500 per text, no class action cap`)}
  ${copyBlock('canspam', 'CAN-SPAM Email Footer (every marketing email)', `[Company Name] | [Physical Street Address] | [City, State, ZIP]
You're receiving this email because you opted in at [source].
To unsubscribe, click here: [unsubscribe link]

REQUIREMENTS PER EMAIL:
→ Accurate FROM name and email address
→ Honest subject line — no deception
→ Physical mailing address visible
→ Working unsubscribe honored within 10 business days
→ No harvested addresses`)}
  ${copyBlock('testimonial', 'FTC Testimonial Disclaimer (below every testimonial/case study)', `Results may vary. This client's results depended on their specific situation. Your results will vary based on your individual circumstances. [If compensated/affiliated: This testimonial was provided by a compensated client/partner.]

FTC ENDORSEMENT RULES (updated 2024):
→ Non-typical results MUST be disclosed as non-typical
→ Paid/incentivized reviews MUST disclose compensation
→ Employee/partner testimonials MUST disclose the relationship
→ AI-generated testimonials/faces: NEVER acceptable
→ Systematic suppression of negative reviews violates CRFA
→ FTC Review Rule (effective Oct 21, 2024): fake reviews = civil penalties per violation`)}
  ${copyBlock('affiliate', 'FTC Affiliate Disclosures (3 formats)', `PAGE (above the fold):
Disclosure: [Your Name/Company] earns a commission if you purchase through links on this page. This doesn't affect our analysis. We only recommend services we believe are legitimate and compliant.

SOCIAL POST:
#ad — I partnered with [Company] to share their [service]. As always, all opinions are my own. [Link to disclosure policy]

EMAIL:
Note: This email contains affiliate links. I may earn a commission if you sign up through my link.`)}
  ${copyBlock('privacy', 'Data Privacy Notice (GLBA businesses — tax & credit)', `Your information is protected under the Gramm-Leach-Bliley Act and our Written Information Security Program (WISP). We do not sell your personal information. See our Privacy Policy for complete details.

GLBA SAFEGUARDS RULE REQUIREMENTS (documented, not just implemented):
→ Written Information Security Program (WISP)
→ Designated security coordinator
→ Annual risk assessment
→ Breach notification procedures
→ Encryption in transit and at rest
→ MFA on all systems with client data
→ Vendor agreements with security requirements`)}
</div>

<!-- TAX -->
<div data-tab-panel-group="compliance" data-tab-panel="taxdisc" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">Tax Marketing Disclaimers (Circular 230 · FTC · TSR)</h2>
  ${copyBlock('taxresults', 'Results Disclaimer (any result/case study)', `Results may vary. Individual results depend on the specific facts and circumstances of each taxpayer's situation. Prior results do not guarantee similar outcomes. Settlements, installment agreements, and other IRS resolution programs are subject to IRS approval and individual eligibility requirements.`)}
  ${copyBlock('oic2', 'OIC Disclaimer (any Offer in Compromise claim)', `An Offer in Compromise (OIC) is an IRS program that allows eligible taxpayers to settle their tax debt for less than the full amount owed. OIC acceptance is determined solely by the IRS based on your ability to pay, income, expenses, and asset equity. Not all taxpayers qualify. The IRS accepted approximately [X]% of OIC applications in [year]. We do not guarantee OIC acceptance or any specific settlement amount without first evaluating your complete tax situation.`)}
  ${copyBlock('taxrep', 'Representation Disclaimer', `Tax resolution services are provided by [licensed credential holders: EA/CPA/JD]. IRS representation requires a signed Power of Attorney (Form 2848). Services are not a guarantee of any specific outcome before the IRS.`)}
  ${copyBlock('taxgeneral', 'General Tax Service Disclaimer (site footer)', `This content is for informational purposes only and does not constitute legal or tax advice. Tax laws change frequently. Consult a licensed tax professional regarding your specific situation. [Firm Name] is not affiliated with or endorsed by the IRS or any government agency.`)}
  ${copyBlock('tsrrules', 'TSR Pre-Enrollment Disclosures (debt relief — mandatory before signup)', `Before enrolling any consumer, you MUST disclose:
[1] How long the program will take to show results
[2] How much the program will cost (TOTAL, not monthly only)
[3] Potential NEGATIVE consequences of using the service
    (credit impact, liens continuing, potential collection activity
    during negotiation period)
[4] Key terms of any dedicated/escrow account

TSR CARDINAL RULES (tax/debt relief):
→ NO fee collection before settling/resolving the debt
→ TSR covers INBOUND calls from your ads (post-Dec 2024 amendment)
→ Honor National DNC Registry + internal DNC list
→ Call window: 8 AM – 9 PM recipient local time
→ Retain ads 36 months (Circular 230), scripts/recordings/consents 24 months (TSR)`)}
</div>

<!-- CREDIT -->
<div data-tab-panel-group="compliance" data-tab-panel="creditdisc" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">Credit Repair Disclosures (CROA · FCRA · FTC)</h2>
  ${copyBlock('croafooter', 'CROA Identity Footer (site + emails)', `[Company Name] is a credit repair organization as defined by the Credit Repair Organizations Act (15 U.S.C. §1679). You have the right to dispute inaccurate information in your credit report by contacting the credit bureaus directly, at no cost, via annualcreditreport.com. Results may vary and are not guaranteed.`)}
  ${copyBlock('croabilling', 'Post-Service Billing Statement (pricing pages)', `Under the Credit Repair Organizations Act (CROA), we are legally required to complete services before billing for them. We do not charge upfront fees for credit repair services. You have the right to cancel within 3 business days of signing your service agreement, no questions asked. For our complete contract terms and your consumer rights disclosure, see [link].`)}
  ${copyBlock('creditresults', 'Credit Results Disclaimer (every testimonial)', `Results may vary. Individual outcomes depend on the specific items on your credit report, whether those items can be successfully disputed under the FCRA, and the credit bureaus' investigation findings.`)}
  ${copyBlock('croacontract', 'CROA Written Contract — Required Elements (§1679d)', `EVERY credit repair contract MUST contain:
a) Full description of services to be performed
b) Total amount of ALL payments (itemized, complete)
c) Specific date or time period for performance
d) Company name and business address
e) Consumer's three-day right to cancel
f) Notice of Cancellation form (attached)

SEQUENCE REQUIREMENT:
1. Consumer Rights Statement (§1679c) — SEPARATE document,
   provided and acknowledged FIRST
2. Then the contract is presented for signature
3. Then the 3-day cancellation window runs (cannot be waived —
   waiver clauses are VOID)
4. Services may not begin until the window expires

Note: The §1679c Consumer Rights Statement must use the verbatim
statutory text — pull it from 15 U.S.C. §1679c and have your
attorney confirm the current version.`)}
  ${copyBlock('earnings', 'Earnings Disclaimer (credit repair biz-opp marketing)', `Earnings and income representations made by [Company] are aspirational statements only. Individual results will vary based on many factors including work ethic, experience, compliance, and market conditions. [Company] makes no guarantee of income or business success.`)}
</div>

<!-- EVENTS -->
<div data-tab-panel-group="compliance" data-tab-panel="eventsdisc" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">Events & General Offer Disclaimers</h2>
  ${copyBlock('eventresults', 'Event Testimonial Disclaimer', `Results shown are from real attendee reports and are not typical. Individual results depend on your audience, offer, effort, and execution. No specific outcome is guaranteed.`)}
  ${copyBlock('urgency', 'Urgency & Scarcity Rules (FTC deception standard)', `REAL ONLY, ALWAYS:
✅ Real seat limits (venue capacity, cohort caps)
✅ Real deadlines that ACTUALLY expire (no rolling resets)
✅ Real sponsor spot counts (don't invent infinite tiers)
✅ Countdown timers tied to fixed dates

NEVER:
❌ Fake countdown timers that reset per visitor
❌ "Only 3 left!" when inventory is unlimited
❌ Fake "price goes up tonight" that never goes up
❌ Manufactured "sold out" claims

Fake urgency = deceptive practice under FTC Act §5. It's also
the fastest way to torch audience trust permanently.`)}
  ${copyBlock('sponsorroi', 'Sponsor ROI Illustration Disclaimer', `Illustrative math only — actual results depend on your offer, follow-up, and conversion rates. Past sponsor results are self-reported and are not a guarantee of your outcome.`)}
  ${copyBlock('guarantee', 'Event Guarantee Language (clean risk reversal)', `100% Money-Back Guarantee: attend Day 1 — if you don't believe it was worth every penny, email us before Day 2 begins for a full refund. No forms, no friction.

GUARANTEE RULES:
→ State the exact condition and exact deadline
→ Honor it without friction (refund friction = FTC complaints)
→ Never offer a guarantee you can't operationally deliver`)}
</div>

<!-- CHECKLISTS -->
<div data-tab-panel-group="compliance" data-tab-panel="checklists" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">Pre-Launch Checklists</h2>
  <div class="grid md:grid-cols-3 gap-6">
    <article class="card p-5">
      <h3 class="font-bold text-brand-cyan mb-3"><i class="fas fa-ticket mr-2"></i>Events Funnel</h3>
      <ul class="text-sm text-gray-300 space-y-2">
        ${[
          'All testimonials real + permissioned + disclaimered',
          'Countdown tied to a real, fixed deadline',
          'Seat/spot counts reflect actual inventory',
          'Guarantee terms exact and operationally deliverable',
          'TCPA checkbox on any SMS opt-in (unchecked)',
          'CAN-SPAM footer on every email',
          'Refund policy published and linked',
          'Tracking events wired (GA4 + Meta Pixel)',
        ].map(i => `<li><i class="far fa-square-check text-brand-success mr-2"></i>${i}</li>`).join('')}
      </ul>
    </article>
    <article class="card p-5">
      <h3 class="font-bold text-emerald-400 mb-3"><i class="fas fa-scale-balanced mr-2"></i>Tax Funnel</h3>
      <ul class="text-sm text-gray-300 space-y-2">
        ${[
          'Attorney reviewed all copy + disclaimers',
          'State CPA/EA advertising rules confirmed',
          'No result guarantees anywhere in copy',
          'No IRS affiliation implied (logos, language)',
          '"Not affiliated with IRS" statement present',
          'PTIN + EFIN current; credentials verifiable',
          'WISP documented (GLBA)',
          '§7216 consent forms for any data sharing',
          'TSR analysis if phone/inbound-call sales',
          'Marketing materials retained 36 months',
        ].map(i => `<li><i class="far fa-square-check text-brand-success mr-2"></i>${i}</li>`).join('')}
      </ul>
    </article>
    <article class="card p-5">
      <h3 class="font-bold text-blue-400 mb-3"><i class="fas fa-chart-line mr-2"></i>Credit Repair Funnel</h3>
      <ul class="text-sm text-gray-300 space-y-2">
        ${[
          'Attorney reviewed all copy + contracts',
          'State CSO registration + bonds in every operating state',
          'CROA contract has ALL §1679d elements',
          'Consumer Rights Statement is a SEPARATE doc, provided FIRST',
          'Notice of Cancellation form in every contract',
          'Billing fires AFTER completed work only',
          'No score guarantees anywhere',
          'All testimonials consented + disclaimered',
          'TSR analysis if any phone contact with prospects',
          'WISP documented; marketing retained 24+ months',
        ].map(i => `<li><i class="far fa-square-check text-brand-success mr-2"></i>${i}</li>`).join('')}
      </ul>
    </article>
  </div>
  <div class="card p-5 mt-6 border-red-900">
    <h3 class="font-bold text-brand-danger mb-2"><i class="fas fa-triangle-exclamation mr-2"></i>Hard Stops — Do Not Launch If:</h3>
    <ul class="text-sm text-gray-300 space-y-1.5">
      <li>🔴 Any copy guarantees specific results (scores, settlements, refunds)</li>
      <li>🔴 Any billing collects before services are performed (tax resolution / credit repair)</li>
      <li>🔴 Any implied government affiliation exists anywhere</li>
      <li>🔴 Testimonials are fabricated, AI-generated, or lack consent</li>
      <li>🔴 Required state registrations/bonds are missing</li>
      <li>🔴 No attorney has reviewed the final assets</li>
    </ul>
  </div>
</div>
`)
