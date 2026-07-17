// Industry compliance packs — 10 niches (v2.0). Not legal advice; attorney review required.
import { copyBlock } from './layout'

export const complianceNicheTabs = [
  ['c-realestate', 'Real Estate'],
  ['c-fitness', 'Fitness / Health'],
  ['c-coaching', 'Coaching / Biz Opp'],
  ['c-ecom', 'E-commerce'],
  ['c-saas', 'SaaS / Data'],
  ['c-law', 'Legal / Attorney Ads'],
  ['c-home', 'Home Services'],
  ['c-medspa', 'Med Spa / Aesthetic'],
  ['c-insurance', 'Insurance'],
  ['c-agency', 'Agency / Results Claims'],
]

export const complianceNichePanels = `
<!-- REAL ESTATE -->
<div data-tab-panel-group="compliance" data-tab-panel="c-realestate" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">Real Estate — Fair Housing · RESPA · License Rules</h2>
  ${copyBlock('crre1', 'Equal Housing / Fair Housing footer (every marketing asset)', `[Agent Name] · [Brokerage Name] · License #[XXXXX] · [State]
Equal Housing Opportunity. 🏠⚖️

All information deemed reliable but not guaranteed. Market statistics sourced from [MLS name] as of [date] and subject to change. Past sales performance does not guarantee future results.

HARD RULES (Fair Housing Act, 42 U.S.C. §3601):
→ NEVER describe the desired buyer/renter ("perfect for young families" = violation; describe the PROPERTY, not people)
→ No steering language about neighborhoods ("safe area," "good schools" used as demographic code = risk)
→ Ad targeting: no exclusion by race, color, religion, sex, disability, familial status, national origin — and platform special-category rules apply (Meta/Google housing ad categories are mandatory)
→ Display brokerage name as required by your state license law
→ Team names and DBAs must comply with state advertising rules`)}
  ${copyBlock('crre2', 'RESPA + testimonial rules', `RESPA (12 U.S.C. §2607) — REFERRAL RULES:
→ NO kickbacks or things of value for mortgage/title/escrow referrals
→ Affiliated business arrangements require written AfBA disclosure
→ "Preferred lender" arrangements need attorney review

TESTIMONIALS & STATS:
→ Client reviews must be genuine, with consent to publish
→ "#1 agent" claims need a verifiable basis + source cited ("#1 in [MLS] units sold, [year], [source]")
→ Days-on-market / %-over-list stats: cite MLS + date range
→ Guaranteed-sale programs ("We'll buy your home if...") = full written terms + attorney review + state-specific rules`)}
</div>

<!-- FITNESS -->
<div data-tab-panel-group="compliance" data-tab-panel="c-fitness" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">Fitness — Health Claims · Results · Liability</h2>
  ${copyBlock('crfit1', 'Results disclaimer (every results mention, near the claim)', `*Results vary. [Client name]'s results reflect [his/her] individual effort, consistency, nutrition, and starting point, and are not typical. You should not expect the same or similar results. Consult your physician before beginning this or any exercise or nutrition program, especially if you have any medical condition or take medication.

FTC RULES (Health Products & Services + Endorsement Guides, 16 C.F.R. Part 255):
→ Testimonials claiming specific results REQUIRE a clear "not typical" disclosure NEAR the claim (footer-only = insufficient)
→ Before/after photos: same lighting/pose/timeframe honesty; disclose timeframe
→ NO disease claims ("reverses diabetes," "cures back pain") — that's drug/medical-device territory (FDA)
→ Weight-loss red flags per FTC "Gut Check": >2 lbs/week without diet+exercise, "no diet needed," "permanent loss" = presumptively false
→ Influencer/affiliate posts need #ad disclosure`)}
  ${copyBlock('crfit2', 'Liability waiver pointer + supplement rules', `LIABILITY:
→ Written informed-consent + assumption-of-risk waiver signed BEFORE any programming (attorney-drafted, state-specific)
→ PAR-Q or equivalent health screening for new clients
→ Scope of practice: trainers may not prescribe diets/meal plans in some states (dietetics licensure laws) — check your state

SUPPLEMENTS (if you sell/recommend):
→ DSHEA disclaimer required: "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."
→ Affiliate income from supplement links must be disclosed`)}
</div>

<!-- COACHING -->
<div data-tab-panel-group="compliance" data-tab-panel="c-coaching" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">Coaching — FTC Earnings Claims · Refunds</h2>
  ${copyBlock('crco1', 'Earnings disclaimer (mandatory near ANY income mention)', `EARNINGS DISCLAIMER: We make no guarantee or representation that you will earn any money using the techniques, strategies, or programs offered. Any income or earnings statements are estimates or examples of what certain individuals have achieved and are not typical. Your results will differ and depend on many factors including but not limited to your background, experience, effort, market conditions, and business skills. All business entails risk, including the risk of losing your investment entirely.

FTC RULES (post-2021 enforcement era):
→ ANY earnings claim ("clients make $10K/mo," screenshots of Stripe dashboards, "6-figure launch") requires substantiation you possess BEFORE making the claim
→ "Not typical" disclosure must be CLEAR AND CONSPICUOUS near the claim — not buried in a footer link
→ Lifestyle imagery implying income (rented Lambos, cash fans) = implied earnings claim, same rules
→ Fake urgency/scarcity ("3 spots left" when untrue) = deceptive practice
→ Testimonials: written consent, unedited substance, disclose any compensation ("received free access")`)}
  ${copyBlock('crco2', 'Refund policy + auto-renewal rules', `REFUND POLICY (post in checkout, enforce as written):
[Program Name] Refund Policy: [X]-day money-back guarantee. To request a refund, email [email] within [X] days of purchase [+ any completion conditions — action-based conditions must be reasonable and clearly disclosed BEFORE purchase].

AUTO-RENEWAL / NEGATIVE OPTION (FTC Click-to-Cancel rules + state ARL laws):
→ Clear disclosure of renewal terms BEFORE checkout
→ Express informed consent to the subscription
→ Cancellation must be AS EASY as signup (online cancel if online signup)
→ CA/NY/etc. require renewal reminder notices — check state list
→ Chargebacks from hidden renewals = processor account termination risk`)}
</div>

<!-- ECOMMERCE -->
<div data-tab-panel-group="compliance" data-tab-panel="c-ecom" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">E-commerce — Reviews · Shipping · Pricing</h2>
  ${copyBlock('crec1', 'FTC review & endorsement rules (Consumer Review Rule 2024)', `REVIEWS — 16 C.F.R. Part 465 (effective Oct 2024, penalties up to $53K+ per violation):
→ NO fake or AI-generated reviews, ever
→ NO buying positive reviews (incentives contingent on sentiment = illegal)
→ NO review suppression (hiding negatives while showing positives on your site)
→ NO undisclosed insider reviews (employees/family must disclose relationship)
→ Review counts and ratings shown in ads must match reality at time of display
→ Influencer posts: #ad or "paid partnership" — visible, not buried in hashtags

PRICING:
→ "Was $X, now $Y" — the $X must be a genuine former price (state strike-through pricing laws)
→ Countdown timers must reflect real deadlines
→ "Free" + forced shipping markup = deceptive`)}
  ${copyBlock('crec2', 'Shipping, returns & product claims', `SHIPPING — FTC Mail Order Rule (16 C.F.R. Part 435):
→ Ship within advertised timeframe (or 30 days if none stated)
→ Delay = notify + offer cancel/refund option
→ Refund within 7 days of a cancelled order (or 1 billing cycle for card)

RETURNS:
→ Post the policy conspicuously BEFORE purchase; state laws (e.g. CA, NY) set default rights if you don't
→ Honor as written — deviations = deceptive practice + chargeback fuel

PRODUCT CLAIMS:
→ "Made in USA" = "all or virtually all" made domestically (FTC enforces hard)
→ Health/beauty benefit claims need competent scientific substantiation
→ Eco claims ("biodegradable," "recyclable") must meet FTC Green Guides`)}
</div>

<!-- SAAS -->
<div data-tab-panel-group="compliance" data-tab-panel="c-saas" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">SaaS — Privacy · Data · Subscription Law</h2>
  ${copyBlock('crsa1', 'Required legal pages + privacy laws', `MINIMUM LEGAL STACK (before launch):
→ Privacy Policy — what you collect, why, who you share with, retention, user rights
→ Terms of Service — license, acceptable use, liability caps, arbitration, termination
→ Cookie notice/consent if using analytics/ads pixels (GDPR/ePrivacy for EU visitors)
→ DPA (Data Processing Agreement) available if customers are businesses
→ Subprocessor list if you're B2B

PRIVACY LAWS THAT PROBABLY APPLY:
→ GDPR (any EU users): lawful basis, DSR handling (30 days), breach notice (72 hrs)
→ CCPA/CPRA (CA revenue/data thresholds): "Do Not Sell/Share" link, deletion rights
→ State patchwork (VA, CO, CT, TX, ...): honor universal opt-outs (GPC signal)
→ COPPA: if under-13 users possible — parental consent regime, penalties per child`)}
  ${copyBlock('crsa2', 'Trial, billing & uptime claims', `TRIALS & BILLING (FTC negative-option rules):
→ Card-required trials: disclose exact charge date + amount BEFORE collecting card
→ Renewal reminders where state law requires (and as best practice)
→ Cancel flow ≤ signup friction ("Click-to-Cancel")
→ Proration/refund terms in ToS, honored as written

MARKETING CLAIMS:
→ "99.9% uptime" needs measurement basis + SLA definition
→ "Bank-level security" / "military-grade encryption" = substantiate or delete
→ SOC 2 / HIPAA / GDPR "compliant" badges: only if audited/true — false certification claims = FTC + private suits
→ Competitor comparisons must be accurate and current`)}
</div>

<!-- LAW FIRM -->
<div data-tab-panel-group="compliance" data-tab-panel="c-law" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">Law Firm — Bar Advertising Rules (Model Rules 7.1–7.3)</h2>
  ${copyBlock('crlaw1', 'Attorney advertising disclaimer block (adapt to your state)', `ATTORNEY ADVERTISING. [Firm Name], [Address]. Responsible attorney: [Name], licensed in [State(s)].

Prior results do not guarantee a similar outcome. Every case is different and must be evaluated on its own facts. This website provides general information only and does not constitute legal advice. Viewing this site or contacting the firm does not create an attorney-client relationship. Do not send confidential information until an attorney-client relationship is established in writing.

[Contingency practices:] "No fee unless we win" refers to attorney's fees only; client may remain responsible for case costs and expenses. [Some states REQUIRE this clarification.]

STATE-SPECIFIC LANDMINES (verify yours):
→ NY: "ATTORNEY ADVERTISING" label on emails/site required
→ FL: pre-filing review of some TV/radio ads by the Bar
→ TX: filing requirements with Advertising Review Committee
→ Testimonials banned or restricted in several states
→ "Specialist"/"expert" claims only if state-certified in that specialty`)}
  ${copyBlock('crlaw2', 'Solicitation + intake compliance', `SOLICITATION (Rule 7.3):
→ NO live/telephone/real-time electronic solicitation of non-lawyers with whom you have no prior relationship (limited exceptions)
→ Targeted mail to accident victims: many states impose 30-day blackout periods
→ Lead generation services: cannot be fee-splitting or improper recommendation — structure review required

INTAKE:
→ TCPA still applies to law firm texting — consent checkbox on all forms
→ Conflicts check before substantive discussions
→ Non-engagement letters for declined matters (malpractice protection)
→ Advertising in states where you're not licensed = UPL risk`)}
</div>

<!-- HOME SERVICES -->
<div data-tab-panel-group="compliance" data-tab-panel="c-home" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">Home Services — Licensing · Contracts · Door-to-Door</h2>
  ${copyBlock('crhs1', 'License display + estimate rules', `EVERY AD / PAGE / TRUCK / CARD:
[Company Name] · [State] License #[XXXXX] · Licensed, Bonded & Insured

RULES:
→ Most states REQUIRE license number in all advertising (CA CSLB, FL DBPR, AZ ROC, etc.) — fines per ad without it
→ "Bonded & insured" only if currently true — carry certificates
→ Unlicensed contracting over state dollar thresholds = criminal in many states; advertising without license also violates
→ Written estimates: itemized, signed, with change-order process — several states mandate written contracts over $ thresholds ($500 CA)
→ Warranty claims ("lifetime warranty") = written warranty terms required (Magnuson-Moss)`)}
  ${copyBlock('crhs2', 'Home solicitation + financing rules', `3-DAY RIGHT TO CANCEL (FTC Cooling-Off Rule + state versions):
→ Sales made at the customer's home over $25: written notice of 3-business-day cancellation right, in duplicate
→ Applies to most in-home contract signings — build the form into your paperwork

FINANCING OFFERS:
→ "0% financing" / "$99/month" triggers Truth in Lending (Reg Z) disclosure requirements
→ Third-party financing (GreenSky etc.): use lender-approved language only

STORM CHASER LAWS:
→ Post-disaster states regulate roofing solicitation heavily (deductible-waiving offers are ILLEGAL in many states)
→ Insurance-claim assistance language: don't act as a public adjuster without a license`)}
</div>

<!-- MED SPA -->
<div data-tab-panel-group="compliance" data-tab-panel="c-medspa" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">Med Spa — Medical Practice · HIPAA · Before/After</h2>
  ${copyBlock('crms1', 'Medical disclaimer + supervision rules', `TREATMENT DISCLAIMER (site-wide + per treatment page):
Individual results vary. All medical aesthetic treatments are performed by or under the supervision of licensed medical professionals. A consultation and medical evaluation are required before any treatment to determine candidacy. Information on this site is educational only and is not medical advice. [Treatment]-specific risks will be reviewed during your consultation.

STRUCTURE RULES (state medical board):
→ Corporate Practice of Medicine states: med spa must be physician-owned or MSO-structured — marketing cannot imply otherwise
→ Medical Director name/credentials displayed where state requires
→ Who may inject varies by state (RN/NP/PA/MD scopes) — never advertise services your staffing can't legally deliver
→ Prescription devices/drugs (Botox®, lasers): trademark correctly, no OTC-style claims`)}
  ${copyBlock('crms2', 'HIPAA marketing + before/after photo rules', `HIPAA MARKETING:
→ Client photos/testimonials = PHI: written HIPAA authorization (not just a model release) BEFORE posting
→ Never confirm someone is a patient in review responses ("We're glad YOU loved YOUR Botox results" = violation) — respond generically
→ Email lists: appointment reminders OK; marketing new services may require authorization — segment carefully
→ Meta/Google pixels on booking pages = potential PHI disclosure (OCR bulletin) — audit your tracking

BEFORE/AFTER PHOTOS:
→ Real clients of YOUR practice, with signed authorization
→ Same lighting/angle/expression; no retouching of treatment areas
→ Timeframe + number of sessions disclosed
→ Stock photos presented as results = deceptive advertising`)}
</div>

<!-- INSURANCE -->
<div data-tab-panel-group="compliance" data-tab-panel="c-insurance" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">Insurance — Producer Licensing · Ad Rules</h2>
  ${copyBlock('crins1', 'Agent identity + advertising rules', `EVERY MARKETING ASSET:
[Agent Name], Licensed Insurance Producer · [State] License #[XXXXX]
[Agency Name] · [Address] · [Phone]

RULES (state DOI + NAIC model rules):
→ License number + true producer name in advertising (most states)
→ Carrier names/logos only per carrier co-op advertising guidelines
→ "Savings up to $X" claims: substantiation + "savings vary" disclosure
→ NO misrepresenting policy terms, benefits, or dividends (unfair trade practices acts)
→ Quote forms: disclose you're an agent (not the insurer) and that quotes are estimates subject to underwriting
→ Rebating (giving part of commission/gifts to induce purchase) is ILLEGAL in most states — gift caps vary ($25–$100)`)}
  ${copyBlock('crins2', 'Medicare + lead-gen specific rules', `MEDICARE (if applicable — CMS Marketing Guidelines, 42 C.F.R. §422/423):
→ Mandatory disclaimer: "We do not offer every plan available in your area. Currently we represent [X] organizations which offer [Y] products in your area. Please contact Medicare.gov, 1-800-MEDICARE, or your local State Health Insurance Program to get information on all of your options."
→ ALL marketing materials require CMS filing/approval via carriers
→ 48-hour Scope of Appointment before sales meetings
→ Call recording required for marketing/sales/enrollment calls (retain 10 years)

LEAD GENERATION:
→ TCPA consent specific to insurance calls; one-to-one consent rules post-2025 FCC changes
→ Buying leads: verify the consent chain names YOUR agency
→ "Final expense" / "burial insurance" ads face heightened state scrutiny — no fake government affiliation ("2024 State Benefit Update" mailers = enforcement magnet)`)}
</div>

<!-- AGENCY -->
<div data-tab-panel-group="compliance" data-tab-panel="c-agency" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">Agency — Results Claims · Contracts · Platform Rules</h2>
  ${copyBlock('crag1', 'Results/ROI claim rules', `CASE STUDY DISCLAIMER (near every result claim):
*Results shown are from a specific client engagement and depend on that client's market, offer, budget, and execution. They are not typical and are not a guarantee or prediction of your results.

RULES:
→ "We'll 3x your revenue" / "guaranteed #1 rankings" = deceptive (nobody controls Google) — FTC + platform policy violation
→ Client results in ads: written permission + accurate numbers you can substantiate (screenshots retained)
→ "As seen in Forbes" only for real editorial coverage — paid placements must say so
→ White-label work: don't claim another agency's portfolio as your own
→ AI-generated "client testimonials" = illegal under FTC Consumer Review Rule`)}
  ${copyBlock('crag2', 'Client contract must-haves + platform compliance', `CONTRACT ESSENTIALS (attorney-drafted):
→ Scope of work + explicit exclusions (scope creep kills agencies)
→ Performance language: effort/deliverable-based, NOT outcome-guaranteed
→ Who owns ad accounts, creatives, and data at termination (client should own accounts)
→ Payment terms + late-payment work-stoppage clause
→ Limitation of liability + indemnification for client-supplied claims/content
→ Term, termination notice, and offboarding process

YOU'RE LIABLE FOR CLIENT ADS TOO:
→ FTC holds ad agencies responsible for deceptive claims they create or should have known were false
→ Regulated verticals (supplements, finance, legal, health) — apply THAT industry's rules to client work
→ Platform policies (Meta/Google restricted verticals): agency account bans propagate across clients — vet client claims before launching`)}
</div>
`
