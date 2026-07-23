// Niche email workflows — 10 industries, 5-touch sequences each (v2.0)
import { copyBlock } from './layout'

const FOOT = '\n\n[Company] · [Physical Address] · Unsubscribe: [link]'

export const nicheTabs = [
  ['n-realestate', 'Real Estate (5)'],
  ['n-fitness', 'Fitness (5)'],
  ['n-coaching', 'Coaching (5)'],
  ['n-ecom', 'E-commerce (5)'],
  ['n-saas', 'SaaS Trial (5)'],
  ['n-law', 'Law Firm (5)'],
  ['n-home', 'Home Services (5)'],
  ['n-medspa', 'Med Spa (5)'],
  ['n-insurance', 'Insurance (5)'],
  ['n-agency', 'Agency (5)'],
]

export const nichePanels = `
<!-- REAL ESTATE -->
<div data-tab-panel-group="emails" data-tab-panel="n-realestate" class="hidden">
  <h2 class="text-xl font-bold text-white mb-1">Real Estate — Seller Lead Nurture (5-Touch)</h2>
  <p class="text-xs text-gray-500 mb-4">Compliance: Equal Housing statement in footer. No guaranteed sale prices. Verify all stats.</p>
  ${copyBlock('nre1', 'Email 1 — Instant · Home Value Report Delivery', `Subject: Your [City] home value report is ready 🏡

[First Name],

Your report is attached — built from live [City] MLS data, not a computer estimate.

The headline: homes like yours in [Neighborhood] are selling for [$X–$Y range] right now, and the average is [X] days on market.

Three things in your report worth a close look:
1. Page 2 — the 3 comparable sales that set your price ceiling
2. Page 4 — what buyers in your price band are actually paying over list
3. Page 5 — the 2 upgrades that return more than they cost in this market

Want me to walk you through it? 15 minutes, zero pressure: [calendar link]

[Agent Name] · [Brokerage] · [License #]
Equal Housing Opportunity${FOOT}`)}
  ${copyBlock('nre2', 'Email 2 — Day 2 · The Timing Question', `Subject: Is now actually a good time to sell in [City]?

[First Name],

The #1 question I get: "Should I wait?"

Here's the honest data for [City] right now:
→ Inventory: [X] months (under 4 = seller's market)
→ Median days on market: [X]
→ % of homes selling over list: [X]%

What that means for YOUR home: [1-2 sentence honest interpretation].

Waiting works when inventory is rising and rates are falling. Right now [honest one-liner about conditions].

If you want, I'll run a "sell now vs. sell in 6 months" comparison specific to your address — free, takes me an hour: [reply or calendar link]

[Agent Name]${FOOT}`)}
  ${copyBlock('nre3', 'Email 3 — Day 5 · Case Study', `Subject: How [Street Name] sold for [X]% over list

[First Name],

Quick story about a home 4 minutes from yours.

The sellers on [Street Name] almost listed with a "we'll figure it out" agent at [$X]. We ran the full pricing strategy — pre-market prep list, 3-day exposure window, offer deadline — and it closed at [$Y]. That's [X]% over their original number.

The difference wasn't luck. It was sequence:
1. [Prep step] before photos
2. Priced to create competition, not to "leave room"
3. Offer review deadline that forced buyers to bring their best

Your home has [honest specific advantage]. The same play could work.

Want the exact plan for your address? [calendar link]

[Agent Name]${FOOT}`)}
  ${copyBlock('nre4', "Email 4 — Day 9 · Objection: 'I\u2019ll try FSBO first'", `Subject: The FSBO math nobody shows you

[First Name],

Thinking about selling it yourself first? Totally fair — let's do the real math.

FSBO homes sell for a median of [X]% less than agented sales (NAR data). On your home that's roughly [$X].
My fee on your home: roughly [$Y].

Even after commission, the typical spread is [$Z] in your pocket — plus I carry the negotiation, disclosures, inspection fight, and the 40 hours of showings.

And if you try FSBO and it works — genuinely, congrats. But 30 days of sitting on the market costs you leverage. Buyers smell it.

Happy to be your Plan B on standby, or your Plan A now: [calendar link]

[Agent Name]${FOOT}`)}
  ${copyBlock('nre5', 'Email 5 — Day 14 · Soft Close / Long-Term Follow-Up', `Subject: I'll stop emailing (but read this first)

[First Name],

Last note from me for a while — no hard feelings if the timing isn't right.

Three ways I can keep being useful with zero commitment:
1. Monthly [Neighborhood] market snapshot — one email, real numbers → [link]
2. Free annual home value re-check (values move; your equity is a number worth knowing)
3. My vendor list — the inspector, roofer, and handyman I trust with my own clients → just reply "list"

When you ARE ready — this month or in 2 years — you know where I am.

[Agent Name] · [Phone]
Equal Housing Opportunity${FOOT}`)}
</div>

<!-- FITNESS -->
<div data-tab-panel-group="emails" data-tab-panel="n-fitness" class="hidden">
  <h2 class="text-xl font-bold text-white mb-1">Fitness — Challenge/Program Nurture (5-Touch)</h2>
  <p class="text-xs text-gray-500 mb-4">Compliance: "results vary" on every results claim. No medical claims. Testimonials need typicality disclaimers (FTC).</p>
  ${copyBlock('nfit1', 'Email 1 — Instant · Welcome + Quick Win', `Subject: You're in. Do this ONE thing today 💪

[First Name] — welcome to [Program Name].

Before anything else, one 10-minute action that puts you ahead of 90% of people who "start Monday":

→ [Specific quick win: e.g. "Fill your water bottle now and drink it before noon. Hydration is the cheapest performance enhancer that exists."]

What happens next:
• Tomorrow: your starting-point form (2 min)
• Day 2: your first workout drops
• Day 3: the nutrition framework (no macros-counting torture, promise)

One rule in [Program Name]: done beats perfect. Every time.

Coach [Name]

*Results vary based on individual effort, consistency, and starting point. Consult your physician before beginning any exercise program.*${FOOT}`)}
  ${copyBlock('nfit2', 'Email 2 — Day 2 · The Anti-Motivation Email', `Subject: Motivation is a scam (here's what works)

[First Name],

Hard truth from [X] years of coaching: motivated people quit too.

The clients who transform aren't more motivated — they have smaller systems:
→ Workout clothes laid out the night before
→ A 10-minute minimum rule ("I only have to do 10 minutes")
→ One accountability check-in per week

That's it. That's the secret.

Your move today: pick ONE of those three and set it up right now. Reply and tell me which one — I read every reply.

Coach [Name]

*Results vary. Consult your physician before beginning any exercise program.*${FOOT}`)}
  ${copyBlock('nfit3', 'Email 3 — Day 4 · Transformation Story', `Subject: [Client Name] wanted to quit on Day 9

[First Name],

[Client Name] joined [Program Name] after [relatable situation: e.g. "her third gym membership she never used"].

Day 9, she messaged me: "This isn't working. I don't feel different."

I told her what I'll tell you: the first 2 weeks are neurological, not visual. Your body is rewiring before it's reshaping.

She stayed. Week 6: [specific non-scale victory]. Week 12: [verified result].*

Her words: "[Real client quote]"

If Day 9 doubt hits you — and it will — this email is your reminder.

Coach [Name]

*[Client Name]'s results are her own and are not typical. Results vary based on effort, consistency, nutrition, and individual factors.*${FOOT}`)}
  ${copyBlock('nfit4', 'Email 4 — Day 7 · Offer (Program/Coaching Upgrade)', `Subject: Ready for the full system?

[First Name],

You've been in the free challenge for a week. Quick question:

What would change if you had [X] more weeks of this — with a real plan, real programming, and me checking your progress?

That's [Program Name] [Tier]:
→ [Deliverable 1: e.g. progressive 12-week program]
→ [Deliverable 2: e.g. nutrition framework + templates]
→ [Deliverable 3: e.g. weekly form-check + coach access]

Investment: [$X] ([or $Y/mo]). Founding-member rate ends [real date].

→ [Enroll link]

Not ready? All good — keep crushing the free work. It's yours forever.

Coach [Name]

*Results vary. 14-day money-back guarantee — details at checkout.*${FOOT}`)}
  ${copyBlock('nfit5', 'Email 5 — Day 10 · Last Call + Identity Close', `Subject: Last call ([real deadline] tonight)

[First Name],

Founding rate for [Program Name] closes tonight at [time].

No fake countdown drama — the price goes to [$X] tomorrow because the next cohort includes [added deliverable].

One reframe before you decide:

You're not buying workouts. You're buying the version of you that [specific outcome: e.g. "takes the stairs without thinking about it"]. Workouts are just the delivery mechanism.

If that version of you is worth [$X], the door's here: [Enroll link]

Either way — proud of the week you just put in.

Coach [Name]

*Results vary based on individual effort and consistency.*${FOOT}`)}
</div>

<!-- COACHING -->
<div data-tab-panel-group="emails" data-tab-panel="n-coaching" class="hidden">
  <h2 class="text-xl font-bold text-white mb-1">High-Ticket Coaching — Application Nurture (5-Touch)</h2>
  <p class="text-xs text-gray-500 mb-4">Compliance: FTC earnings-claim rules — no income promises, all case studies need "not typical" disclaimers.</p>
  ${copyBlock('nco1', 'Email 1 — Instant · Application Received', `Subject: Application received — here's what happens next

[First Name],

Got your application for [Program Name]. Here's the honest process:

1. I personally review it within 24 hours (not a VA, not AI — me)
2. If it's a fit, you'll get a calendar link for a [X]-minute call
3. If it's not a fit right now, I'll tell you straight and point you at what to do first

While you wait — this 12-minute training answers the 3 questions every applicant asks: [link]

One thing I want you to know: the call is a mutual evaluation, not a pressure chamber. If I don't genuinely believe we can get you [outcome category — no income promise], I'll say so.

[Coach Name]${FOOT}`)}
  ${copyBlock('nco2', 'Email 2 — Day 1 · Frame the Call', `Subject: Before our call — read this (3 min)

[First Name],

Your call is booked for [date/time]. To make it worth both our time:

Come with these 3 numbers:
1. Where you are now: [relevant metric]
2. Where you want to be in 12 months
3. What you've already tried (and what happened)

What the call is NOT:
✗ A webinar pitch in disguise
✗ A "what's your credit limit" ambush

What it IS: a working session where we map your gap and decide — together — if [Program Name] is the right vehicle.

Talk soon,
[Coach Name]

*Individual results vary. No specific financial outcome is promised or guaranteed.*${FOOT}`)}
  ${copyBlock('nco3', 'Email 3 — Day 3 · Case Study (Compliance-Aware)', `Subject: [Client First Name]'s first 90 days (real numbers)

[First Name],

You asked what results look like. Fair question. Here's one client's actual arc:

[Client Name], [niche/situation] — came in with [starting point].

Days 1–30: [what they actually did — the work, not magic]
Days 31–60: [milestone]
Days 61–90: [verified result]*

The part nobody puts in ads: [honest hard part — e.g. "week 3 she wanted to quit because the offer rebuild felt like going backward"].

That's the real texture of this work. If you want the same conversation about YOUR 90 days, my calendar's here: [link]

[Coach Name]

*This client's results are not typical and reflect her specific effort, market, and circumstances. Most participants' results differ. No earnings are guaranteed.*${FOOT}`)}
  ${copyBlock('nco4', 'Email 4 — Day 5 · Objection Preempt', `Subject: "I need to think about it" — let's think together

[First Name],

The three real reasons people hesitate on [Program Name], and my honest answers:

1. "Money's tight." — If [$X] would genuinely destabilize you, don't join. I mean that. This works when you can invest from strategy, not desperation.

2. "I've been burned by coaches." — Ask any coach for 3 client references you pick from a list. I offer that. Most won't.

3. "I can figure it out myself." — Probably true. The question is the timeline. You're buying speed and skipped mistakes, not secrets.

Still on the fence? Reply with your actual hesitation. I'll give you a straight answer, even if it's "don't join."

[Coach Name]${FOOT}`)}
  ${copyBlock('nco5', 'Email 5 — Day 7 · Enrollment Close', `Subject: Enrollment closes [date] — decision time

[First Name],

[Program Name] enrollment closes [real date] at [time]. After that, next cohort is [timeframe] out.

The deadline is real for one reason: everyone starts [shared milestone] together on [date].

Where you stand: your application is approved. Your spot is held until the deadline.

→ Enroll: [link]
→ Questions first: reply, or grab 15 minutes: [link]

Whatever you decide — decide. The most expensive place to live is "maybe."

[Coach Name]

*Individual results vary. No specific outcome or income is guaranteed. See full terms at checkout.*${FOOT}`)}
</div>

<!-- ECOMMERCE -->
<div data-tab-panel-group="emails" data-tab-panel="n-ecom" class="hidden">
  <h2 class="text-xl font-bold text-white mb-1">E-commerce — Cart + Post-Purchase (5-Touch)</h2>
  <p class="text-xs text-gray-500 mb-4">Compliance: honest scarcity only. Real review counts. Physical address + unsubscribe (CAN-SPAM).</p>
  ${copyBlock('nec1', 'Email 1 — 1 Hour · Abandoned Cart', `Subject: You left something behind 👀

[First Name],

Your [Product Name] is still in your cart — held for the next 24 hours.

Quick reminder of what you were getting:
→ [Benefit 1]
→ [Benefit 2]
→ [X]-day money-back guarantee, free returns

[⭐ 4.8/5 from X,XXX verified reviews]

→ Finish checkout: [cart link]

Questions before you commit? Just reply — real humans here.

[Brand] Team${FOOT}`)}
  ${copyBlock('nec2', 'Email 2 — Day 1 · Objection + Social Proof', `Subject: The review that convinces most people

[First Name],

Still deciding on [Product Name]? This review says it better than we can:

"[Real verified review — the specific, slightly imperfect kind that reads true. e.g. 'Took a week to arrive and I was skeptical about the price, but after a month of daily use...']"
— [Reviewer name], verified buyer

The three things buyers tell us tipped them:
1. [Differentiator 1]
2. [Guarantee/returns]
3. [Differentiator 2]

Your cart's still live: [cart link]

[Brand] Team${FOOT}`)}
  ${copyBlock('nec3', 'Email 3 — Day 2 · Incentive Close', `Subject: 10% off your cart — expires tonight

[First Name],

We'll cut to it: here's 10% off [Product Name], good until midnight tonight.

Code: [CODE10]
→ [cart link]

Why the discount? Carts held longer than 48 hours get released — we'd rather you have the discount than lose your size/variant to someone else.

After tonight the code dies and the cart clears. No games.

[Brand] Team${FOOT}`)}
  ${copyBlock('nec4', 'Email 4 — Post-Purchase Day 0 · Order Confirmation+', `Subject: Order confirmed! Here's how to get the most from it

[First Name] — order [#XXXX] is confirmed. 🎉

Shipping: [timeframe]. Tracking hits your inbox the second it moves.

While you wait, three things owners wish they knew on day one:
1. [Usage tip 1]
2. [Usage tip 2]
3. [Care/storage tip]

Need anything? Reply to this email — support is humans, not bots.

[Brand] Team${FOOT}`)}
  ${copyBlock('nec5', 'Email 5 — Post-Purchase Day 14 · Review + Cross-Sell', `Subject: Quick favor? (30 seconds)

[First Name],

You've had [Product Name] for two weeks. Two things:

1. How is it? A 30-second review helps other buyers decide (and keeps us honest): [review link]

2. Owners of [Product Name] most often add [Complementary Product] next — they pair because [honest reason]. As a customer you've got 15% off it forever: [CODE]

Thanks for being here.

[Brand] Team${FOOT}`)}
</div>

<!-- SAAS -->
<div data-tab-panel-group="emails" data-tab-panel="n-saas" class="hidden">
  <h2 class="text-xl font-bold text-white mb-1">SaaS — Trial-to-Paid (5-Touch)</h2>
  <p class="text-xs text-gray-500 mb-4">Behavior-triggered where possible. The only goal: activation → first value moment → upgrade.</p>
  ${copyBlock('nsa1', 'Email 1 — Instant · Welcome + One Action', `Subject: Welcome to [Product] — do this first (2 min)

[First Name], you're in.

Skip the tour. Do this ONE thing instead:

→ [Single activation action: e.g. "Connect your first data source"] — takes 2 minutes: [deep link]

Users who do this in their first session are [X]× more likely to hit their goal in week one. Everything else can wait.

Stuck anywhere? Reply — founders read these.

[Founder Name] @ [Product]${FOOT}`)}
  ${copyBlock('nsa2', 'Email 2 — Day 2 · Value Moment Push', `Subject: You're 1 step from your first [key outcome]

[First Name],

You've [done step 1 ✓]. One more move and [Product] starts paying for itself:

→ [Second activation step]: [deep link] (3 min)

What that unlocks: [specific value — e.g. "your first automated report lands tomorrow morning at 8am"].

Prefer to watch? 90-second walkthrough: [video link]

[Name] @ [Product]${FOOT}`)}
  ${copyBlock('nsa3', 'Email 3 — Day 5 · Case Study / Use Case', `Subject: How [Customer] saves [X hrs/week] with [Product]

[First Name],

Real workflow from a customer your size:

[Customer/Company] was [pain — e.g. "manually building client reports every Friday"]. Now:
1. [How they use feature 1]
2. [How they use feature 2]
3. Result: [specific verified metric — e.g. "9 hours back per week"]

The template they use is public — clone it into your account in one click: [link]

[Name] @ [Product]${FOOT}`)}
  ${copyBlock('nsa4', 'Email 4 — Day 10 · Trial Ending Warning', `Subject: Your trial ends in 4 days (here's what you keep)

[First Name],

Trial ends [date]. Where you stand:

Your usage so far:
→ [Usage stat 1 — e.g. "3 workflows built"]
→ [Usage stat 2 — e.g. "142 tasks automated"]

If you upgrade: everything stays live, plus [paid-only features].
If you don't: your account pauses (we keep your data [X] days — no deletion ambush).

Plans from [$X]/mo → [upgrade link]
Annual = [X] months free.

Question about which plan? Reply with your use case, I'll answer honestly — including "the cheap plan is enough for you."

[Name] @ [Product]${FOOT}`)}
  ${copyBlock('nsa5', 'Email 5 — Day 14 · Trial Ended + Win-Back Offer', `Subject: Trial ended — want 20% off to keep going?

[First Name],

Your [Product] trial just ended. Your [workflows/data/setup] are safe for [X] more days.

If pricing was the blocker: here's 20% off your first 3 months — code [CODE20]: [upgrade link]

If it wasn't pricing, tell me what it was. One reply. Brutal honesty welcome — it's how we build.

And if now's just not the time: no hard feelings. Your data export lives here: [link]

[Name] @ [Product]${FOOT}`)}
</div>

<!-- LAW FIRM -->
<div data-tab-panel-group="emails" data-tab-panel="n-law" class="hidden">
  <h2 class="text-xl font-bold text-white mb-1">Law Firm — Consultation Nurture (5-Touch)</h2>
  <p class="text-xs text-gray-500 mb-4">Compliance: "Attorney Advertising" label. No outcome guarantees. No attorney-client relationship formed by email. State bar rules vary — attorney review mandatory.</p>
  ${copyBlock('nlaw1', 'Email 1 — Instant · Case Review Request Received', `Subject: We received your case review request

ATTORNEY ADVERTISING

[First Name],

Your free case evaluation request is in our queue. What happens next:

1. A member of our intake team calls you within [X business hours] from [phone number] — save it so you don't miss us
2. The call takes about [X] minutes: facts, timeline, documents
3. An attorney reviews and we tell you honestly whether you have a case worth pursuing

Important: please don't discuss your situation on social media or with the other party's insurance company before we speak.

[Firm Name]
[Address] · [Phone]

*This email does not create an attorney-client relationship. Prior results do not guarantee a similar outcome.*${FOOT}`)}
  ${copyBlock('nlaw2', 'Email 2 — Day 1 · What to Gather', `Subject: 5 documents that strengthen your case review

ATTORNEY ADVERTISING

[First Name],

Before your consultation, gather what you can from this list (missing items are OK):

1. [Case-type doc 1 — e.g. accident/police report]
2. [Doc 2 — e.g. medical records or bills to date]
3. [Doc 3 — e.g. photos of scene/injuries/damage]
4. [Doc 4 — e.g. insurance correspondence]
5. A simple written timeline in your own words — dates matter

Also: note any deadlines you've been given by anyone. Statutes of limitation are unforgiving.

Reply to this email to attach anything, or bring it to your call.

[Firm Name] · [Phone]

*Not legal advice. No attorney-client relationship is formed by this communication.*${FOOT}`)}
  ${copyBlock('nlaw3', 'Email 3 — Day 3 · Why Speed Matters (No Scare Tactics)', `Subject: The one legal deadline you can't negotiate

ATTORNEY ADVERTISING

[First Name],

We're not going to pressure you — but we do owe you one fact:

Every claim type in [State] has a statute of limitations. For [case type] it is generally [timeframe]*. Miss it and the strongest case in the world is worth nothing.

Evidence also decays: witnesses move, footage gets overwritten ([X] days at many businesses), records get harder to pull.

None of this means you must hire us. It means: get YOUR deadline confirmed by a lawyer — us or anyone — soon.

Your free evaluation is still open: [phone] / [scheduling link]

[Firm Name]

*General information, not legal advice; exceptions can shorten or extend deadlines. Consult an attorney about your specific facts.*${FOOT}`)}
  ${copyBlock('nlaw4', 'Email 4 — Day 6 · Fee Structure Transparency', `Subject: What it costs to hire us (straight answer)

ATTORNEY ADVERTISING

[First Name],

The question everyone wants answered before calling:

[Contingency practice areas:]
You pay nothing up front and nothing unless we recover for you. Our fee is [X]% of the recovery, plus case costs, all in writing before we start.

[Hourly/flat practice areas:]
[Honest fee structure explanation.]

Either way: the consultation is free, and you leave it knowing (1) whether you have a case, (2) what it's plausibly worth, (3) exactly what hiring us costs. In writing. No surprises.

[Phone] / [scheduling link]

[Firm Name]

*Prior results do not guarantee a similar outcome. Fees and costs explained fully in a written agreement.*${FOOT}`)}
  ${copyBlock('nlaw5', 'Email 5 — Day 10 · Respectful Close', `Subject: Closing your file (unless...)

ATTORNEY ADVERTISING

[First Name],

We haven't been able to reach you, so we're closing your inquiry file — no further emails after this one.

Before we do:

→ If you hired another firm: genuinely, good luck with your case.
→ If life got busy: your free evaluation stays available. [Phone] / [link]
→ If you decided not to pursue it: please, at minimum, confirm your filing deadline with any attorney first. It costs nothing and protects you.

We're here if you need us.

[Firm Name] · [Address] · [Phone]

*This communication does not create an attorney-client relationship.*${FOOT}`)}
</div>

<!-- HOME SERVICES -->
<div data-tab-panel-group="emails" data-tab-panel="n-home" class="hidden">
  <h2 class="text-xl font-bold text-white mb-1">Home Services — Estimate Follow-Up (5-Touch)</h2>
  <p class="text-xs text-gray-500 mb-4">Compliance: license # in footer. Honest urgency only. Written estimates honored as stated.</p>
  ${copyBlock('nhs1', 'Email 1 — Instant · Estimate Request Confirmed', `Subject: Your free [service] estimate — confirmed ✅

[First Name],

Got your request. Here's exactly what happens:

1. [Name/team] calls you within [X hours] from [phone] to schedule
2. We come out, measure/inspect, and hand you a written, itemized estimate on the spot
3. The price we quote is the price you pay — no "surprise conditions" invoices

While you wait: here's what a fair [service] quote should always include (so you can pressure-test ANY contractor, including us): [link or 3 bullets]

[Company] · Licensed & Insured · Lic #[XXXXX]
[Phone]${FOOT}`)}
  ${copyBlock('nhs2', 'Email 2 — Day 1 · Trust Builder', `Subject: How to not get burned hiring a [trade]

[First Name],

Before you pick anyone (us included), verify these five things:

1. Active license — look it up free: [state licensing board link]
2. Liability insurance + workers comp (ask for the certificate; real pros carry it)
3. Written itemized estimates — "ballpark" verbal quotes become change-orders
4. Local reviews older than 6 months (fresh-only reviews = red flag)
5. A physical address, not just a cell number

We pass all five, and we'll show you the paperwork without being asked twice.

Your estimate visit: [scheduled time / scheduling link]

[Company] · Lic #[XXXXX]${FOOT}`)}
  ${copyBlock('nhs3', 'Email 3 — Day 3 · Estimate Delivered Follow-Up', `Subject: Your estimate — questions?

[First Name],

Your written estimate for [service] is in your hands: [$X], good for [X] days.

The three questions homeowners usually ask next:

"Can we phase it?" — [Honest answer about splitting the work]
"What if you find more damage?" — Any change gets a written change-order YOU approve before we proceed. No approval, no charge.
"How's payment work?" — [Deposit]% to schedule, balance on completed walkthrough. Never full payment up front.

Ready to get on the schedule? Reply or call [phone]. Current lead time: [honest timeframe].

[Company] · Lic #[XXXXX]${FOOT}`)}
  ${copyBlock('nhs4', 'Email 4 — Day 7 · Seasonal/Practical Urgency', `Subject: A heads-up about waiting on [service]

[First Name],

No pressure play here — just the practical reality:

1. [Honest seasonal factor — e.g. "Monsoon season starts in ~6 weeks; small roof issues become interior damage"]
2. Our schedule: booking [X] weeks out right now, and [busy season] pushes that to [Y]
3. Your quoted price is locked for [X] days — material costs move after that

If the project's on hold for budget reasons, ask about our phased option — many clients do [first phase] now and the rest [timeframe].

[Company] · [Phone] · Lic #[XXXXX]${FOOT}`)}
  ${copyBlock('nhs5', 'Email 5 — Day 14 · Close + Referral Ask', `Subject: Keeping your estimate on file

[First Name],

We'll stop filling your inbox — your estimate stays on file for [X] days, and re-quoting after that is quick.

If the timing didn't work: totally understand. Two small things:

1. If you hired someone else — no hard feelings, and if anything needs a second opinion down the road, we're here.
2. If you know a neighbor who needs [service]: we pay a [$X] referral thank-you for any job we complete. Just have them mention you.

[Company] · [Phone] · Lic #[XXXXX] · Licensed & Insured${FOOT}`)}
</div>

<!-- MED SPA -->
<div data-tab-panel-group="emails" data-tab-panel="n-medspa" class="hidden">
  <h2 class="text-xl font-bold text-white mb-1">Med Spa — New Client Nurture (5-Touch)</h2>
  <p class="text-xs text-gray-500 mb-4">Compliance: no medical outcome guarantees, "individual results vary" everywhere, consultation-first language, HIPAA — never reference specific treatments a client received without authorization.</p>
  ${copyBlock('nms1', 'Email 1 — Instant · Consultation Booked', `Subject: Your consultation is booked ✨

[First Name],

You're confirmed for [date/time] at [Spa Name].

What to expect (no surprises, no pressure):
→ [X] minutes with [provider credential — e.g. "our nurse practitioner"]
→ We listen first: your goals, your concerns, your budget
→ You get an honest treatment plan — including "you don't need that" if you don't
→ Zero obligation to book anything

Before your visit: avoid [prep item, e.g. "retinoids for 48 hours"] and bring a list of current medications.

Questions? Reply or call [phone].

[Spa Name] · [Address]

*Individual results vary. All treatments require consultation and medical screening.*${FOOT}`)}
  ${copyBlock('nms2', 'Email 2 — Day 1 · Education (Treatment 101)', `Subject: [Treatment] explained in plain English

[First Name],

Ahead of your consult, the no-hype version of [treatment]:

What it actually does: [plain-English mechanism]
What it feels like: [honest sensation description]
Downtime: [honest downtime]
When results appear: [honest timeline]
How long results last: [honest range]*
Who it's NOT for: [honest contraindication categories]

Anything you're nervous about? Reply and ask — our providers answer directly, and "is this safe for me?" is exactly what the consultation screens for.

[Spa Name]

*Individual results vary based on skin type, age, treatment area, and other factors. Consultation and medical screening required.*${FOOT}`)}
  ${copyBlock('nms3', 'Email 3 — Day 3 · Social Proof + Provider Credibility', `Subject: Why clients drive past 6 other med spas to get here

[First Name],

Fair question to ask any med spa: "Who is actually doing my treatment?"

At [Spa Name]:
→ All injections by [credential level — e.g. "RN/NP-level providers"], overseen by [Medical Director name, credential]
→ [X]+ treatments performed
→ We turn people away when a treatment isn't right for them — ask around, it's rare

What clients say:
"[Real review — experience/service focused, not outcome-promising]" — [Name], Google review ⭐⭐⭐⭐⭐

Your consult: [date/time]. Need to reschedule? [link]

[Spa Name]

*Individual results vary.*${FOOT}`)}
  ${copyBlock('nms4', 'Email 4 — Day 5 · New Client Offer', `Subject: Your new-client offer (valid through [date])

[First Name],

As a first-time client, your consultation unlocks:

→ [Offer — e.g. "$X off your first treatment" / "complimentary add-on"]
→ Valid through [real date]
→ Applied only if a provider confirms the treatment is right for you — we don't sell treatments people don't need

Book or reschedule: [link] · [phone]

[Spa Name] · [Address]

*Offer subject to medical suitability determined at consultation. Individual results vary. May not be combined with other offers.*${FOOT}`)}
  ${copyBlock('nms5', 'Email 5 — Day 10 · Gentle Close', `Subject: Should we keep your file open?

[First Name],

We noticed you haven't booked your consultation yet — completely fine. Timing matters with anything aesthetic.

Keeping it simple:
→ Ready now: [booking link]
→ Ready later: reply "later" and we'll check in [seasonally/quarterly] instead
→ Not for you: reply "unsubscribe" or use the link below — zero hard feelings

One honest note: [seasonal relevance if true — e.g. "laser treatments are best scheduled in lower-UV months, so fall bookings fill fastest"].

[Spa Name] · [phone]

*Individual results vary. Consultation required for all treatments.*${FOOT}`)}
</div>

<!-- INSURANCE -->
<div data-tab-panel-group="emails" data-tab-panel="n-insurance" class="hidden">
  <h2 class="text-xl font-bold text-white mb-1">Insurance — Quote Follow-Up (5-Touch)</h2>
  <p class="text-xs text-gray-500 mb-4">Compliance: licensed-agent identity + license # in every email, no misleading savings claims, state DOI rules apply.</p>
  ${copyBlock('nins1', 'Email 1 — Instant · Quote Request Received', `Subject: Your [product line] quote is being built

[First Name],

Your quote request is in — here's the process:

1. I compare rates across [X]+ carriers we represent (not just one company's rate card)
2. You get a side-by-side within [X hours] — coverage, deductibles, real premiums
3. We do a [X]-minute call so you understand exactly what you're buying — and what you're NOT

Fair warning I give everyone: the cheapest quote is usually cheap because it's missing something. I'll show you where.

[Agent Name], Licensed Agent — Lic #[XXXXX]
[Agency] · [Phone]${FOOT}`)}
  ${copyBlock('nins2', 'Email 2 — Day 1 · Quote Delivered + Explanation', `Subject: Your quotes are ready — the 2-minute version

[First Name],

Your side-by-side is attached. The 2-minute version:

Option A — [Carrier]: [$X]/mo — [what stands out]
Option B — [Carrier]: [$Y]/mo — [what stands out]
Option C — [Carrier]: [$Z]/mo — [what stands out]

My honest take: [1-2 sentence recommendation and WHY — coverage-based, not commission-based].

The one thing to check before price: [key coverage element for product line — e.g. "liability limits; state minimums leave most families dangerously exposed"].

15 minutes to walk through it? [calendar link] or just call: [phone]

[Agent Name], Lic #[XXXXX]${FOOT}`)}
  ${copyBlock('nins3', 'Email 3 — Day 3 · The Coverage Gap Education', `Subject: The gap in most [product line] policies

[First Name],

The claim scenario that hurts the most — because it's preventable:

[Realistic scenario — e.g. "A hail storm totals your roof. Your policy pays actual cash value, not replacement cost. Your 12-year-old roof's 'value' after depreciation: $4,200. Replacement cost: $18,000. You eat the $13,800 difference."]

That's the kind of line-item difference between quotes that look identical on price.

When we talk, I'll flag every spot in your current/quoted coverage where this kind of gap lives. That conversation is free whether you buy from me or not.

[calendar link] · [phone]

[Agent Name], Lic #[XXXXX]${FOOT}`)}
  ${copyBlock('nins4', 'Email 4 — Day 6 · Rate Validity + Honest Urgency', `Subject: Your quoted rates — how long they hold

[First Name],

Straight facts on timing:

→ Your quotes are valid until [real date] ([carrier rates refile after that])
→ [If true: "Two of your three carriers have rate increases filed for [month]"]
→ Locking a policy takes about [X] minutes by phone

If you're staying with your current insurer, one suggestion: pull your renewal notice and compare it line-by-line against what I sent. If yours is better, keep it — genuinely.

[Phone] · [calendar link]

[Agent Name], Lic #[XXXXX] · [Agency]${FOOT}`)}
  ${copyBlock('nins5', 'Email 5 — Day 12 · Close + Annual Review Offer', `Subject: Last note — and a standing offer

[First Name],

I'll stop here. Two things before I do:

1. Your quotes stay in my system. If rates move or your situation changes, re-quoting takes me minutes, not days. Just reply.

2. Standing offer: a free annual coverage review, even if you never buy from me. Most people are over-paying or under-covered somewhere. Thirty minutes, once a year: [calendar link]

Stay covered,

[Agent Name], Licensed Agent — Lic #[XXXXX]
[Agency] · [Phone]${FOOT}`)}
</div>

<!-- AGENCY -->
<div data-tab-panel-group="emails" data-tab-panel="n-agency" class="hidden">
  <h2 class="text-xl font-bold text-white mb-1">Marketing Agency — Audit Call Nurture (5-Touch)</h2>
  <p class="text-xs text-gray-500 mb-4">Compliance: FTC — case study results need context, no guaranteed ROI/rankings claims.</p>
  ${copyBlock('nag1', 'Email 1 — Instant · Audit Call Booked', `Subject: Your growth audit is booked — come armed

[First Name],

Audit call confirmed: [date/time].

To make it genuinely useful (not a pitch in a trench coat), have these ready:
1. Access or screenshots: last 90 days of [ad account / analytics / rankings]
2. Your current monthly spend and what it returns (best guess is fine)
3. The ONE number you'd change first if you could

What you leave with — whether or not we work together:
→ 3 specific things broken or underleveraged in your current setup
→ What we'd do about each, in order
→ Honest math on whether our retainer pays for itself in your case

[Your Name] · [Agency]${FOOT}`)}
  ${copyBlock('nag2', 'Email 2 — Day 1 · Authority + Proof', `Subject: The audit framework we'll run on your business

[First Name],

So you know this isn't a "vibes" call — here's the exact framework we'll run:

1. Traffic quality (not volume — quality; most accounts buy garbage clicks that look great in reports)
2. Conversion capture ([industry] sites typically leak [X]% of ready-to-buy visitors)
3. Follow-up velocity (leads contacted in 5 min convert dramatically better than 24-hr responses)
4. Unit economics (what a lead is actually worth end-to-end)

Recent example: [Client type] came in at [$X] cost-per-lead. Ninety days later: [$Y].* The fix was #3 — nobody was working their leads.

See you [date/time].

[Your Name] · [Agency]

*Client-specific result; outcomes depend on market, budget, offer, and execution. No specific results are guaranteed.*${FOOT}`)}
  ${copyBlock('nag3', 'Email 3 — Day 2 (Post-Call) · Proposal Delivery', `Subject: Your growth plan — as promised

[First Name],

Great call. As promised, your plan is attached. The skeleton:

Phase 1 (Days 1–30): [Foundation work — e.g. tracking, offer, landing pages]
Phase 2 (Days 31–60): [Traffic/channel work]
Phase 3 (Days 61–90): [Scale/optimization work]

Investment: [$X]/mo, [contract terms — e.g. "90-day initial term, month-to-month after"].
What we're accountable to: [specific KPIs from your call].

The plan is built from YOUR numbers — the projections use the CPL and close rates you gave me, not fantasy benchmarks.

Questions live better on a call: [15-min slot link]. Otherwise, reply with a green light and we start [date].

[Your Name] · [Agency]${FOOT}`)}
  ${copyBlock('nag4', "Email 4 — Day 5 · Objection: 'We\u2019ll do it in-house'", `Subject: The in-house vs. agency math (honest version)

[First Name],

"We're thinking of hiring in-house instead" — the math, played straight:

In-house [role]: [$X]K salary + benefits + tools ([$Y]/mo all-in), one skill set, [X]-week ramp.
Us: [$Z]/mo, [team roles included], systems already built, producing in week one.

When in-house genuinely wins: you're spending [$X]+/mo on ads and need daily dedicated attention. If that's you, I'll say so — and I'll even help you write the job description.

When agency wins: everything before that point.

Where do you actually sit? Happy to run your numbers: [link]

[Your Name] · [Agency]${FOOT}`)}
  ${copyBlock('nag5', 'Email 5 — Day 8 · Close With Deadline', `Subject: Your onboarding slot — decision by [date]?

[First Name],

Operational reality on my side: we onboard [X] clients per month so delivery doesn't slip for anyone. Your proposal is holding one of [month]'s slots.

I need a yes/no by [real date] — after that the slot goes to the waitlist and next availability is [timeframe].

→ Green light: reply "go" and onboarding starts [date]
→ Not now: tell me, and I'll check back in [timeframe] with fresh eyes on your market
→ Questions: [15-min link]

Either answer beats silence — for both of us.

[Your Name] · [Agency]${FOOT}`)}
</div>
`
