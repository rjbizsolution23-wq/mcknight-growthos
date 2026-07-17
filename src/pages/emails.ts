import { shell, copyBlock } from './layout'
import { nicheTabs, nichePanels } from './emailsNiche'

const tabBtn = (id: string, label: string, active = false) =>
  `<button data-tab="${id}" class="px-4 py-2 rounded-lg text-sm ${active ? 'grad-bg text-white font-semibold' : 'text-gray-300 hover:bg-gray-800'}">${label}</button>`

export const emailsPage = () => shell('Email Vault', 'emails', `
<section id="emails-hero" class="mb-8">
  <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-3"><i class="fas fa-envelope-open-text grad-text mr-2"></i>Email Vault</h1>
  <p class="text-gray-400 max-w-3xl">Every sequence, fully written. One-click copy. Replace bracketed fields with your data, keep the disclaimers, and ship. All marketing emails require: physical address + unsubscribe link (CAN-SPAM).</p>
</section>

<nav data-tab-group="emails" class="flex flex-wrap gap-2 mb-8 card p-3">
  ${tabBtn('sponsor', 'Sponsor Outreach (6)', true)}
  ${tabBtn('event', 'Pre-Event Nurture (8) + SMS', false)}
  ${tabBtn('highticket', 'High-Ticket Follow-Up (7)', false)}
  ${tabBtn('tax', 'Tax Lead Nurture (7)', false)}
  ${tabBtn('creditb2c', 'Credit B2C Nurture (8)', false)}
  ${tabBtn('creditb2b', 'Credit SaaS Nurture (6)', false)}
  ${nicheTabs.map(([id, label]) => tabBtn(id, label, false)).join('')}
</nav>

<!-- SPONSOR OUTREACH -->
<div data-tab-panel-group="emails" data-tab-panel="sponsor">
  <h2 class="text-xl font-bold text-white mb-4">Sponsor Cold Outreach — 6-Touch Sequence</h2>
  ${copyBlock('sp1', 'Touch 1 — Day 0 · Personalized Cold Email', `Subject: [First Name] — [Event Name] + [Their Brand] = 💰?

Hey [First Name],

I run [Event Name] — [one line description of event and audience].

We've got [X attendees / X registrations] of [specific audience description — e.g. "credit repair business owners doing $10K-$100K/mo"].

[Their Brand] keeps coming up in our community as a tool our audience is actively looking for / already using.

I think there's a real fit here for a sponsorship package — and I've got [Title / Gold] sponsor spots available for [Event Date].

Worth 15 minutes to see if it makes sense?

— [Your Name]`)}
  ${copyBlock('sp2', 'Touch 2 — Day 3 · Value Add', `Subject: Re: [Event Name] + [Their Brand] — the numbers

[First Name] — following up with something more useful than a "just bumping this" email.

Attached: our attendee demographic one-pager. The short version:
→ [X] registered attendees
→ [X]% are [decision-maker type] with budget authority
→ Average [revenue / income / company size]: [X]

One quote from a past attendee about tools like yours:
"[Real testimonial about needing/using tools in sponsor's category]"

If getting in front of this room is interesting, I'll hold 15 minutes this week.

— [Your Name]`)}
  ${copyBlock('sp3', 'Touch 3 — Day 7 · Case Study', `Subject: What [Past Sponsor] got from our stage

[First Name],

Last year, [Past Sponsor] used their speaking slot at [Event Name] to generate [X leads / $Y in revenue] from our audience.

Their words: "[permissioned quote from past sponsor]"

Your category is still open for [Event Date]. Once it's claimed, it comes with exclusivity — so competitors are locked out.

15 minutes this week?

— [Your Name]`)}
  ${copyBlock('sp4', 'Touch 4 — Day 12 · Video Message Script (60s Loom)', `[RECORD A 60-SECOND LOOM — SCRIPT:]

"Hey [First Name], [Your Name] here — I run [Event Name].

I've emailed a couple times but wanted to put a face to the name for 60 seconds.

Here's why I keep reaching out: our room is literally [their ideal customer profile]. Last year [Past Sponsor] turned one 15-minute slot into [specific result].

I've got [X] spots left for [Event Date], and I genuinely think [Their Brand] would crush it with our audience.

If I'm wrong, tell me and I'll stop. If I'm right, it's 15 minutes to find out. Link's below. Either way — appreciate you watching."

[EMAIL BODY]: Subject: 60 seconds — recorded this for you, [First Name]
Body: Recorded you a quick video instead of another text email: [Loom link]`)}
  ${copyBlock('sp5', 'Touch 5 — Day 17 · Last Call / First Right of Refusal', `Subject: One [Title] spot left — giving you first right of refusal

[First Name],

Honest update: I've got one [Title] sponsor spot and two [Gold] spots remaining before I go with other brands in adjacent categories.

Wanted to give you first right of refusal before I move on.

If it's a no — totally fine, just let me know and I'll close the loop.
If it's a maybe — 15 minutes will settle it either way.

— [Your Name]`)}
  ${copyBlock('sp6', 'Touch 6 — Day 21 · Breakup Email', `Subject: Closing the loop

[First Name],

I'll stop reaching out — I know you're busy.

If timing is ever right for a future event, I'd love to connect then. And if there's someone else on your team who handles partnerships, a warm intro would be gold.

Either way — keep building. [Their Brand] is doing great work.

— [Your Name]

P.S. Breakup emails like this one generate 30-40% of all replies in cold sequences. If you're reading this line, that stat just got a little more true. 😉`)}
</div>

<!-- PRE-EVENT NURTURE -->
<div data-tab-panel-group="emails" data-tab-panel="event" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">Pre-Event Nurture — 8 Emails + 4 SMS</h2>
  ${copyBlock('ev1', 'Email 1 — Day 0 · Confirmation + Hype', `Subject: You're IN. Here's what happens next 🎟️

[First Name] — your seat at [Event Name] is locked. Smart move.

Three things to do right now:
1. Add [Event Dates] to your calendar (seriously, do it now): [calendar link]
2. Join the private attendee community: [community link]
3. Download your pre-event prep worksheet: [link]

Between now and [Event Date], I'll send you a few things worth opening — including some behind-the-scenes stuff nobody else sees.

See you in the room.
[Your Name]

[Company] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('ev2', 'Email 2 — Day 3 · Founder Story (Why This Exists)', `Subject: Why I almost cancelled the first [Event Name]

[First Name],

True story: [2-3 sentence vulnerable founder story — the wall you hit, the moment of doubt before your first event].

Then [the epiphany — what you discovered that changed everything].

That discovery is the backbone of everything we're teaching at [Event Name]. Not theory — the actual system that came out of [your result].

That's why this event exists. See you [Event Date].

[Your Name]`)}
  ${copyBlock('ev3', 'Email 3 — Day 7 · Social Proof', `Subject: [Past Attendee Name] came skeptical. Then this happened.

[First Name],

[Past Attendee] almost didn't come last year. Their words:

"[Full permissioned testimonial — specific outcome with numbers]"

The part that matters: they implemented [specific tactic] from Day [X] and saw [specific result] within [timeframe].

Results vary — but the pattern doesn't: people who show up and implement, win.

Your prep worksheet (if you haven't grabbed it): [link]

[Your Name]`)}
  ${copyBlock('ev4', 'Email 4 — Day 14 · Anticipation / Insider Reveal', `Subject: Nobody knows this about [Event Name] yet

[First Name] — you're hearing this before anyone outside the team:

[Reveal something exciting: surprise speaker, new session, bonus workshop, special experience]

Why am I telling YOU? Because registered attendees get first access to [related benefit/upgrade] before we announce publicly.

[CTA if relevant: upgrade link / RSVP link]

More soon.
[Your Name]`)}
  ${copyBlock('ev5', 'Email 5 — Day -7 · Logistics + Upgrade Urgency', `Subject: 7 days out — logistics + one heads-up

[First Name], one week until [Event Name]. Quick logistics:

📍 Location/access: [venue address or virtual login instructions]
🕘 Doors/stream open: [time + timezone]
📱 Event app/community: [link]
🎒 Bring: [laptop, worksheet, business cards, etc.]

One heads-up: VIP upgrades close [date] at midnight. If you've been on the fence about [VIP benefit #1] and [VIP benefit #2] — this is the last window: [upgrade link]

See you in 7.
[Your Name]`)}
  ${copyBlock('ev6', 'Email 6 — Day -3 · Conviction Builder', `Subject: You made the right call, [First Name]

Three days out. Quick reality check:

Most people watch other people build. You bought a ticket to learn how to build. That already puts you in a different category.

Here's my one ask: come with ONE specific goal. Not "learn a lot" — something like "leave with my event registration page outlined" or "book 3 sponsor calls within 2 weeks."

Attendees who set one specific goal implement at 3x the rate. Decide yours before [Event Date].

Reply and tell me what it is — I read every one.

[Your Name]`)}
  ${copyBlock('ev7', 'Email 7 — Day -1 · Tomorrow + Mindset', `Subject: Tomorrow. Here's your final checklist.

[First Name] — we're live tomorrow.

Final checklist:
✅ [Login link / directions + parking]
✅ Doors/stream: [time + timezone] — early arrivals get [perk]
✅ Worksheet printed or downloaded: [link]
✅ Your ONE goal written down

Sleep well tonight. Tomorrow we build.

[Your Name]`)}
  ${copyBlock('ev8', 'Email 8 — Day 0 · Doors Open (FOMO)', `Subject: 🔴 DOORS ARE OPEN — [Event Name] starts in 2 hours

[First Name] — it's happening.

[X] people are already checked in / logged in. The energy is real.

Your access: [link/directions]
We start at [time] SHARP with [opening session teaser — "the session everyone will be talking about at lunch"].

Don't be the person catching the replay. Be in the room.

[Your Name]`)}
  ${copyBlock('evsms', 'SMS Sequence — 4 Touches (requires TCPA opt-in)', `[Day -3]: [Event Name] is 3 days out! 🔥 Your one job today: set your ONE goal for the event. Reply with it — we're reading. [Opt-out: Reply STOP]

[Day -1]: Tomorrow's the day, [First Name]. Doors/stream at [time]. Access: [short link]. Sleep good — tomorrow we build. [STOP to opt out]

[Day 0 — 2hrs before]: We start in 2 HOURS. [X] people already in. Access: [short link]. See you inside. [STOP to opt out]

[During event]: [Session name] starts in 15 min — the one everyone asked about. Room/link: [short link] [STOP to opt out]`)}
</div>

<!-- HIGH TICKET FOLLOW-UP -->
<div data-tab-panel-group="emails" data-tab-panel="highticket" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">High-Ticket Post-Call Follow-Up — 7 Emails</h2>
  ${copyBlock('ht1', 'Day 0 · Recap Email', `Subject: [First Name] — recap + what we agreed on

Great talking today, [First Name].

What I heard from you:
→ Your goal: [their stated 90-day outcome]
→ What's blocked you: [their stated obstacle]
→ What it's costing you: [their stated monthly cost of staying stuck]

What we discussed: [Program Name] — [1-line description], investment of [price / payment plan].

You said you'd decide by [date]. I'm holding your spot until then.

Questions before that? Reply directly — I answer these personally.

[Your Name]`)}
  ${copyBlock('ht2', 'Day 1 · Case Study', `Subject: Someone who was exactly where you are

[First Name],

[Client Name] came to us with the same situation: [mirror their circumstance].

90 days later: [specific result with numbers].

The difference wasn't talent. It was [the mechanism your program provides].

Full story here if you want it: [case study link]

Results vary by individual — but the system is the same one we mapped for you on the call.

[Your Name]`)}
  ${copyBlock('ht3', 'Day 2 · Objection Preempt', `Subject: The #1 thing people ask before saying yes

[First Name] — the most common question at this stage:

"What if it doesn't work for MY [business/situation]?"

Fair. Here's the honest answer: [your guarantee / your qualification process / why you accepted their application specifically].

We don't take everyone. We took your application because [specific reason tied to their situation].

Your spot's still held until [date].

[Your Name]`)}
  ${copyBlock('ht4', 'Day 4 · Urgency (Real)', `Subject: Holding your spot until [date]

[First Name],

Quick and honest: we cap enrollment at [X] per [cohort/quarter] because [real reason — delivery quality, 1:1 capacity].

Your spot is held until [date]. After that it goes to the next application in queue.

If you're in: [enrollment link]
If you're out: no hard feelings — just tell me so I can release it.

If you're stuck in between: reply with the ONE thing holding you back. Let's solve it for real.

[Your Name]`)}
  ${copyBlock('ht5', 'Day 6 · Final Decision', `Subject: [First Name] — need to know by [date]

[First Name],

Decision time is [date] — that's real, not manufactured.

One question to sit with tonight:

If nothing changes — where is [their business/situation] in 12 months?

You told me staying stuck costs you [their number] every month. Twelve months of that is [12x their number]. The investment in [Program] is [price].

That's the actual math on the table.

In or out — I'll respect either. But decide.

[Your Name]`)}
  ${copyBlock('ht6', 'Day 7 · Breakup', `Subject: Releasing your spot

[First Name],

Haven't heard back, so I'm releasing your spot to the next application today.

No guilt trip — timing matters, and if now isn't right, forcing it helps nobody.

Two things before I go:
1. The door isn't locked forever. Next enrollment: [date/quarter].
2. [One genuinely useful free resource] — no strings: [link]

Rooting for you either way.

[Your Name]`)}
  ${copyBlock('ht7', 'Bonus · Re-Engagement (30 days later)', `Subject: How's [their goal] coming?

[First Name] — been about a month since we talked.

Genuinely curious: any movement on [their stated goal]?

No pitch here. If things are working — amazing, tell me what's working. If you're still stuck on [their stated obstacle], next enrollment opens [date] and your application still stands.

Either way, good to hear from you.

[Your Name]`)}
</div>

<!-- TAX NURTURE -->
<div data-tab-panel-group="emails" data-tab-panel="tax" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">Tax Resolution Lead Nurture — 7 Emails (compliance-wired)</h2>
  ${copyBlock('tx1', 'Day 0 · Confirmation', `Subject: Your free case evaluation is confirmed — here's what's next

[First Name],

Your free case evaluation request is confirmed. Here's what happens next:

Within [X business hours], a licensed [EA/CPA] from our team will reach out at [their phone] to schedule your evaluation. No scripts, no pressure — just a real professional reviewing your real situation.

What to have handy (nothing formal needed):
→ A general sense of what you owe and for which years
→ Any IRS notices you've received recently

We are licensed professionals — you can verify our credentials anytime: [verification links]

Talk soon,
[Name], [Credential]
[Firm Name]

—
This email is from [Firm Name], a licensed tax professional firm. This is not an official IRS communication.
[Firm Name] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('tx2', 'Day 2 · The Dangerous Notice', `Subject: The IRS notice most people ignore (it's the most dangerous)

[First Name],

Quick education, no pitch:

If you ever receive "Letter 11" or "Letter 1058" — Final Notice of Intent to Levy — you have 30 DAYS to respond before the IRS can begin seizing wages or bank funds.

Most people freeze and do nothing. The 30 days pass. Their options shrink dramatically.

The counterintuitive truth: the IRS has multiple programs for people who engage. It's the people who go silent who get levied.

Have a notice sitting on your counter right now? Reply to this email or call [number] — we'll tell you what it means, free.

[Name], [Credential]

[Firm Name] · [Physical Address] · Unsubscribe: [link]
This is not an official IRS communication.`)}
  ${copyBlock('tx3', 'Day 4 · Pennies-on-the-Dollar Truth', `Subject: Real talk: what "pennies on the dollar" actually means

[First Name],

You've heard the radio ads: "Settle your tax debt for pennies on the dollar!"

Here's the truth those ads skip:

That's the Offer in Compromise (OIC) program — real, but it has strict eligibility. The IRS evaluates your ability to pay, income, expenses, and asset equity. Historically, the IRS accepts roughly 40-45% of OIC applications — and the accepted ones are prepared correctly for people who genuinely qualify.

Any company promising a settlement BEFORE reviewing your finances is lying to you. (The FTC shut down a major tax relief operation in June 2026 for exactly this — $77.7M judgment.)

What we do instead: evaluate first, then tell you honestly which programs you qualify for. Sometimes it's an OIC. Often it's an installment agreement, penalty abatement, or hardship status — which may serve you better anyway.

Find out what YOU actually qualify for: [evaluation link]

[Name], [Credential]

OIC results vary. IRS acceptance depends on your specific financial situation as reviewed by the IRS.
[Firm Name] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('tx4', 'Day 6 · Case Study', `Subject: What happened when one client ignored their IRS notice for 90 days

[First Name],

A client (shared with permission, details anonymized):

They received a CP504, then a Final Notice. Fear took over — they ignored both for 90 days. Wage garnishment started. Their employer found out. That's when they called us.

What we did: filed Form 2848 (Power of Attorney), contacted the IRS directly, demonstrated hardship, got the levy released, and negotiated an installment agreement they could actually afford.

The lesson isn't "we're heroes." It's this: every one of those outcomes was MORE available 90 days earlier. Waiting is the most expensive decision in tax resolution.

If there's a notice you've been avoiding: [evaluation link]

[Name], [Credential]

Results may vary. Individual circumstances differ. This case is presented with client permission.
[Firm Name] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('tx5', 'Day 8 · The One Question', `Subject: The one question that tells us which IRS program you qualify for

[First Name],

Want to know how the IRS actually decides your options? One core question:

"What can this taxpayer afford to pay after allowable living expenses?"

That's it. Income minus IRS-allowed expenses = your "reasonable collection potential." That number determines whether you're looking at an installment agreement, an OIC, or Currently Not Collectible status.

Your evaluation runs exactly this analysis — the same one the IRS runs — so you walk in knowing your position instead of guessing.

Ready to run your numbers? [evaluation link]

[Name], [Credential]

[Firm Name] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('tx6', 'Day 11 · Human Check-In', `Subject: Quick question about your tax situation, [First Name]

[First Name],

I noticed you haven't scheduled your evaluation yet. No judgment — tax stuff is stressful and easy to postpone.

Is something specific holding you back? Cost worries? Skepticism (earned — this industry has bad actors)? Fear of what you'll find out?

Reply and tell me. I read every response, and I'll give you a straight answer — including "you can probably handle this yourself" if that's the truth.

[Name], [Credential]

[Firm Name] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('tx7', 'Day 14 · Honest Final Touch', `Subject: Last touch from me — your options won't wait forever

[First Name],

This is my last scheduled email. Before I go, the honest picture:

→ IRS interest and penalties compound while you wait
→ Federal tax liens get harder to address over time
→ Some collection statutes work in your favor — but only if your case is positioned correctly
→ Every resolution program is MORE available earlier than later

If timing is right: [evaluation link] — free, no obligation.
If not — I genuinely hope you get it handled, with us or without us.

[Name], [Credential]
[Firm Name]

Results vary based on individual circumstances. Tax resolution services provided by licensed professionals; IRS representation requires Form 2848.
[Firm Name] · [Physical Address] · Unsubscribe: [link]`)}
</div>

<!-- CREDIT B2C -->
<div data-tab-panel-group="emails" data-tab-panel="creditb2c" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">Credit Repair B2C Nurture — 8 Emails (CROA-wired)</h2>
  ${copyBlock('cb1', 'Day 0 · Confirmation', `Subject: Your free credit analysis request is confirmed

[First Name],

You're confirmed. Here's what happens next:

Within [X business hours], a credit specialist will reach out to schedule your free analysis. We'll review your tri-bureau report together and show you exactly what may be disputable — and what isn't. Honest answers both ways.

While you wait, here's your FCRA Rights Checklist: [lead magnet link]

No pressure. No upfront fees — ever. That's federal law, and we follow it.

[Name]
[Company Name]

—
[Company Name] is a credit repair organization as defined by the Credit Repair Organizations Act (15 U.S.C. §1679). You have the right to dispute inaccurate information on your credit report yourself, for free, by contacting the credit bureaus directly.
[Company] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('cb2', 'Day 2 · FCRA Rights Education', `Subject: The FCRA right most people with bad credit don't know

[First Name],

Federal law fact most people never learn:

Under FCRA §611, when you dispute an item on your credit report, the bureau MUST investigate within 30 days. If the creditor can't verify the information — it must be deleted. Not "might be." Must be.

That's not a loophole. That's the law working as designed.

The catch: disputes have to be constructed properly. Vague "this is wrong" letters get rubber-stamped as "verified." Specific, documented disputes get results.

That's the entire foundation of legitimate credit repair. More this week.

[Name]

[Company] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('cb3', 'Day 4 · The Cost of Bad Credit', `Subject: The difference between 620 and 760 credit — in dollars

[First Name],

Let's talk actual numbers (sources: FICO, Experian, Federal Reserve data):

🏠 Mortgage ($300K, 30-yr): a 620 vs 760+ score can mean a 1.0–1.75% rate difference — roughly $72,500–$99,750 more interest over the life of the loan
🚗 Auto loan ($35K, 60-mo): subprime vs super-prime APR ≈ $6,000+ difference
💳 Credit cards: subprime APRs run 27–29.99% vs prime 18–22% — on a $5,000 balance, that's ~$550/year

Bad credit isn't just a number. It's a monthly tax on everything you finance.

If inaccurate items are part of what's dragging your score, that part is fixable: [free analysis link]

[Name]

Savings depend on individual circumstances, rates at time of loan, and score improvements achieved. Score improvement is not guaranteed.
[Company] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('cb4', 'Day 7 · Case Study', `Subject: [Name] had 5 inaccurate items — here's what happened

[First Name],

Real client story (shared with written permission):

[Client first name] came to us after a mortgage denial. Their tri-bureau audit found 5 items with problems: two collections with wrong balances, a duplicate listing, a "late payment" during a month the account was closed, and an account that wasn't theirs.

We disputed all five under FCRA §611 and §623. Result: 4 deleted, 1 corrected. They requalified 5 months later.

Important honesty: their outcome came from having genuinely inaccurate items. If everything on your report is accurate, dispute-based repair can't remove it — and we'll tell you that upfront.

Find out what's actually on yours: [free analysis link]

[Name]

Results may vary. Individual outcomes depend on what's on your specific credit report.
[Company] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('cb5', 'Day 10 · Scam Exposure (Trust Builder)', `Subject: What actually doesn't work in credit repair (so you don't waste money)

[First Name],

The stuff that gets people scammed — avoid ALL of it:

❌ "New credit identity" / CPN numbers — that's synthetic identity fraud. Felony territory.
❌ "Guaranteed 100-point increase" — score guarantees are illegal under CROA. Full stop.
❌ "Pay us upfront and we'll handle it" — advance fees for credit repair are federally prohibited.
❌ "The 609 loophole removes anything" — §609 is a disclosure right, not an eraser.
❌ "Dispute everything, even accurate items" — advising false disputes is a federal crime.

What legitimate credit repair looks like: honest audit → dispute genuinely inaccurate/unverifiable/outdated items → bill AFTER work is done → transparent reporting.

That's what we do. Nothing else: [free analysis link]

[Name]

[Company] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('cb6', 'Day 14 · Human Check-In', `Subject: Quick check-in — have you reviewed your credit situation?

[First Name],

No pitch today, just a question:

What's the thing you're actually trying to unlock? A mortgage? A car? A business loan? Or just being done with the collection calls?

Reply and tell me. Knowing your goal changes what we'd look for in your analysis — and if your situation is one where DIY makes more sense, I'll tell you that straight.

[Name]

[Company] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('cb7', 'Day 18 · Honest Qualification', `Subject: The 3 signs it's worth getting professional help (and when DIY makes more sense)

[First Name],

Straight talk about when to hire help vs. DIY:

PROFESSIONAL HELP MAKES SENSE if:
1. Your report has 3+ potentially disputable items (volume = process management)
2. You have a financial milestone coming (mortgage, refi) with a real deadline
3. You've tried DIY and got "verified" rubber-stamps back

DIY MAKES SENSE if:
→ You have 1-2 simple errors and time to manage the process
→ Start here, free: annualcreditreport.com + CFPB dispute letter templates

We'd rather you self-select correctly than sign up wrong-fit. If you're in the first group: [free analysis link]

[Name]

[Company] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('cb8', 'Day 21 · Breakup', `Subject: Last check-in from [Name]

[First Name],

I'll stop reaching out after this — inboxes are sacred.

If you ever want to see what's actually disputable on your report, the free analysis stands: [link]

And whatever you decide — pull your free reports at annualcreditreport.com at least once a year. It's your data. Check it.

Rooting for you,
[Name]

[Company] · [Physical Address] · Unsubscribe: [link]`)}
</div>

<!-- CREDIT B2B -->
<div data-tab-panel-group="emails" data-tab-panel="creditb2b" class="hidden">
  <h2 class="text-xl font-bold text-white mb-4">Credit Repair SaaS Trial Nurture — 6 Emails</h2>
  ${copyBlock('cs1', 'Day 0 · Welcome + Compliance Kit', `Subject: Welcome to [Product] — your login + CROA compliance starter kit

[First Name],

You're in. Two links that matter:

1. Your dashboard: [login link]
2. Your CROA Compliance Starter Kit: [kit link] — the Consumer Rights Statement template, contract framework, cancellation forms, and the state CSO requirements map.

Start with the 15-minute compliance module (required before billing features unlock). It's not bureaucracy — it's the moat that keeps your business alive while competitors get banned.

Then build your first client workflow. Most operators have their first dispute round configured within an hour.

[Name] @ [Product]

[Company] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('cs2', 'Day 2 · Billing Feature Spotlight', `Subject: The billing feature that keeps you on the right side of the law

[First Name],

Real talk about why our billing works the way it does:

In August 2024, the CFPB settled with the industry's largest software platform for $2M — for enabling users to collect illegal upfront fees. The PLATFORM was liable. The CEO paid personally.

That's why [Product]'s billing engine only fires AFTER a work cycle is logged complete. It's not a limitation — it's armor. Your invoices are CROA-safe by construction, and you have the audit trail to prove it.

See how operators set up their billing flows: [tutorial link]

[Name] @ [Product]

[Company] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('cs3', 'Day 5 · Operator Proof', `Subject: How [Operator] manages 140 clients without drowning

[First Name],

[Operator first name] runs a [state] credit repair agency on [Product]:

"[Permissioned quote about workflow, time saved, compliance confidence]"

Their setup: [brief workflow description — portal automation, dispute batching, state alerts].

Steal the whole workflow — we documented it: [link]

[Name] @ [Product]

Results from operating a credit repair business depend on individual factors including compliance, marketing, and client outcomes.
[Company] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('cs4', 'Day 8 · State CSO Education', `Subject: Are you covered in every state your clients come from?

[First Name],

Question that trips up most operators: a client signs up from a state you've never worked in. Are you legal?

~26 states have Credit Services Organization laws — many require registration, surety bonds ($10K–$100K+), and state-specific disclosures beyond CROA. Operating unregistered in some states carries criminal penalties.

[Product]'s state alert system flags requirements for every state where your clients reside — automatically.

Check your current exposure: [state map link]

[Name] @ [Product]

Not legal advice — verify requirements with a consumer financial law attorney.
[Company] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('cs5', 'Day 12 · Objection Handling', `Subject: The most common question from trial users (+ our honest answer)

[First Name],

The #1 trial question: "Why can't I just bill clients monthly from day one like [competitor] lets me?"

Honest answer: because that's how operators end up in FTC/CFPB enforcement actions. CROA requires services performed BEFORE payment. The TSR is even stricter for phone-sourced clients.

Platforms that make illegal billing easy are selling you speed today and liability forever. We made a different bet: the operators who survive are the compliant ones — and they need software built for how this business legally works.

If long-term is your game, you're in the right place: [upgrade link]

[Name] @ [Product]

[Company] · [Physical Address] · Unsubscribe: [link]`)}
  ${copyBlock('cs6', 'Day 16 · Trial Conversion', `Subject: Your trial ends in 3 days — here's what you keep when you upgrade

[First Name],

Trial ends [date]. What upgrading keeps live:

→ Your configured client workflows and dispute rounds (nothing rebuilds)
→ CROA doc generation + audit trail
→ Post-service billing automation
→ State CSO alerts for every client state
→ [Tier-specific: white label / API / team seats]

Plans start at [price]/mo: [upgrade link]

Questions? Reply — a human answers.

[Name] @ [Product]

[Company] · [Physical Address] · Unsubscribe: [link]`)}
</div>

${nichePanels}
`)
