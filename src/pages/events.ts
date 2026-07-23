import { shell, copyBlock } from './layout'

export const eventsPage = () => shell('McKnight Event Growth', 'events', `
<section id="events-hero" class="mb-10">
  <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-3"><i class="fas fa-ticket grad-text mr-2"></i>Events · Tickets · Sponsors · High-Ticket</h1>
  <p class="text-gray-400 max-w-3xl">The 5-Stage Event Monetization Funnel + Sponsor Acquisition Machine. Brunson's Hook-Story-Offer, Hormozi's value equation, Cialdini's 7 principles — all wired into live templates below.</p>
</section>

<section id="events-templates" class="grid md:grid-cols-2 gap-4 mb-12">
  <a href="/t/event-landing" target="_blank" class="card p-6 block group">
    <h2 class="font-bold text-white mb-1 group-hover:text-brand-cyan"><i class="fas fa-window-maximize text-brand-cyan mr-2"></i>Event Registration Funnel <i class="fas fa-arrow-up-right-from-square text-xs text-gray-600"></i></h2>
    <p class="text-gray-400 text-sm">All 8 sections in exact order: hero + countdown, pain agitation, big domino, speaker stack, social proof avalanche, 3-tier pricing, 10-question FAQ, final CTA. Customize it in the <a href="/builder" class="text-brand-cyan underline">Builder</a>.</p>
  </a>
  <a href="/t/sponsor-deck" target="_blank" class="card p-6 block group">
    <h2 class="font-bold text-white mb-1 group-hover:text-brand-cyan"><i class="fas fa-handshake text-brand-cyan mr-2"></i>Sponsor Prospectus (Web Deck) <i class="fas fa-arrow-up-right-from-square text-xs text-gray-600"></i></h2>
    <p class="text-gray-400 text-sm">Event overview, audience data, tier tables (Title/Gold/Silver/Partner), ROI calculator, past sponsor proof, booking CTA — the full 8-part prospectus structure.</p>
  </a>
</section>

<section id="funnel-stages" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6">The 5-Stage Event Monetization Funnel</h2>
  <div class="grid md:grid-cols-5 gap-3 text-sm">
    ${[
      ['1', 'Traffic Ignition', 'Meta warm-first, Dream 100 affiliates, TikTok hooks daily. KPI: CPM<$15, CTR>2.5%, LP CVR>35%'],
      ['2', 'Registration Funnel', '8-section landing page in exact order. Countdown = real deadline only. Live seat counter.'],
      ['3', 'Upsell Sequence', 'OTO 1 VIP upgrade (20–35% take), OTO 2 downsell (10–20%), order bump $27–$97 (20–40%)'],
      ['4', 'Pre-Event Nurture', '8 emails Day 0 → event day + 4-touch SMS. Hype, story, proof, logistics, FOMO.'],
      ['5', 'Post-Event Offers', 'Sell-from-stage structure, table rush, 72-hour replay window, evergreen webinar conversion.'],
    ].map(([n, title, desc]) => `
    <article class="card p-4">
      <span class="grad-bg text-white font-bold w-7 h-7 rounded-full flex items-center justify-center text-xs mb-2">${n}</span>
      <h3 class="font-bold text-white text-sm mb-1">${title}</h3>
      <p class="text-gray-500 text-xs">${desc}</p>
    </article>`).join('')}
  </div>
</section>

<section id="sponsor-tiers" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6">Sponsor Tier Structure (standard deliverables)</h2>
  <div class="overflow-x-auto card p-4">
    <table class="w-full text-sm text-left">
      <thead><tr class="text-gray-400 border-b border-gray-800">
        <th class="py-2 pr-4">Deliverable</th><th class="py-2 pr-4 text-brand-pink">Title $5K–$50K+</th><th class="py-2 pr-4 text-brand-warn">Gold $2.5K–$15K</th><th class="py-2 pr-4 text-gray-300">Silver $1K–$5K</th><th class="py-2">Media Partner</th>
      </tr></thead>
      <tbody class="text-gray-300">
        ${[
          ['Speaking slot', '20–30 min', '10–15 min demo', 'Stage mention', '—'],
          ['"Presented by" branding', '✅ All materials', '—', '—', '—'],
          ['Email blast to attendees', 'Solo blast', 'Nurture mention', '—', 'Cross-promo'],
          ['Logo placement', 'Everywhere + exclusivity', 'Second tier', 'Standard', 'Mutual'],
          ['Comp tickets', '10+', '5', '2', 'Agreed swap'],
          ['Social posts', '5+', '3', '1–2', 'Mutual'],
          ['Exhibit table', '✅ + banner', '✅', '—', '—'],
          ['Attendee list (w/ consent)', '✅', '—', '—', '—'],
        ].map(r => `<tr class="border-b border-gray-800/50">${r.map((c,i)=>`<td class="py-2 pr-4 ${i===0?'text-gray-400':''}">${c}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table>
  </div>
</section>

<section id="sponsor-outreach" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-2">Sponsor Cold Outreach — 6-Touch Sequence</h2>
  <p class="text-gray-400 text-sm mb-6">Full sequence lives in the <a href="/emails" class="text-brand-cyan underline">Campaign Vault</a>. Touch 1 below for quick grab:</p>
  ${copyBlock('sponsor-touch1', 'Touch 1 — Day 0 Cold Email', `Subject: [First Name] — [Event Name] + [Their Brand] = 💰?

Hey [First Name],

I run [Event Name] — [one line description of event and audience].

We've got [X attendees / X registrations] of [specific audience description — e.g. "credit repair business owners doing $10K-$100K/mo"].

[Their Brand] keeps coming up in our community as a tool our audience is actively looking for / already using.

I think there's a real fit here for a sponsorship package — and I've got [Title / Gold] sponsor spots available for [Event Date].

Worth 15 minutes to see if it makes sense?

— [Your Name]`)}
</section>

<section id="close-call" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6">Sponsor Close Call Framework (30–45 min)</h2>
  <div class="grid md:grid-cols-5 gap-3 text-xs">
    ${[
      ['0:00–5:00', 'Rapport', 'Ask about their Q3/Q4 goals'],
      ['5:00–15:00', 'Discovery', '"What\'s your biggest challenge getting in front of [audience] right now?"'],
      ['15:00–25:00', 'Present', 'Show deck — tie every feature to THEIR stated goal'],
      ['25:00–35:00', 'Objections', 'Budget / ROI / legal / past bad experience / audience size'],
      ['35:00–45:00', 'Close', '"[Tier] makes the most sense. I can hold the spot until [date]. Send the agreement now?"'],
    ].map(([time, title, desc]) => `
    <article class="card p-3">
      <p class="font-mono text-brand-cyan mb-1">${time}</p>
      <h3 class="font-bold text-white mb-1">${title}</h3>
      <p class="text-gray-500">${desc}</p>
    </article>`).join('')}
  </div>
</section>

<section id="objections" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6">Sponsor Objection Scripts</h2>
  <div class="grid md:grid-cols-2 gap-4">
    ${[
      ['"We don\'t have budget right now."', '"What does your Q3 look like? I have a Gold package that could work within a smaller budget. Or I can hold a Title spot with a 50% deposit and net-30 on the balance."'],
      ['"We need to see ROI data first."', '"Totally fair. Here\'s what [Past Sponsor] generated: [specific data]. What would a successful outcome look like for you?"'],
      ['"We need to run it by legal / finance."', '"Absolutely. Want me to send the agreement and prospectus directly to them so they have what they need? What\'s the timeline?"'],
      ['"We had a bad experience with sponsorships."', '"Tell me about it. [Listen.] Here\'s how we handle that differently: [differentiator]. We also have a performance guarantee: if we don\'t hit [metric], we\'ll [remedy]."'],
      ['"Your audience is too small."', '"Size is one metric. Our audience\'s BUYING BEHAVIOR is another. Our attendees average [income / company size / budget]. A room of 500 buyers outperforms a room of 5,000 browsers every time."'],
    ].map(([q, a]) => `
    <article class="card p-4">
      <h3 class="font-bold text-brand-warn text-sm mb-2"><i class="fas fa-comment-dots mr-1"></i>${q}</h3>
      <p class="text-gray-400 text-sm">${a}</p>
    </article>`).join('')}
  </div>
</section>

<section id="stage-close" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-2">Sell-From-Stage Structure (Brunson / Fladlien)</h2>
  ${copyBlock('stage-script', 'Stage Close Script Outline', `[1] Build to the close for entire event — don't pitch early
[2] Teach the WHAT and WHY — never the complete HOW
    (The HOW is in the program being sold)
[3] Future pace: "Imagine 90 days from now if you..."
[4] Stack the offer live on stage/screen
[5] Create a "first X seats" or "table rush" moment
[6] Show the order form — walk through it step by step
[7] Live testimonials during offer period
[8] Address objections BEFORE the room has them
[9] Urgency: event-only pricing expires when room closes

POST-EVENT REPLAY FUNNEL:
→ 72-hour replay access window with upgrade offer
→ "Last chance" email at 48h and 2h before link expires
→ Evergreen version: auto-webinar funnel from live recording`)}
</section>

<section id="highticket" class="mb-4">
  <h2 class="text-2xl font-bold text-white mb-2">High-Ticket Application Funnel ($3K–$25K+)</h2>
  ${copyBlock('nepq-script', 'Strategy Call Script — NEPQ Framework', `DISCOVERY QUESTIONS (in order):
→ "What made you apply today vs. 6 months ago?"
→ "What would it mean for your business if [desired outcome]?"
→ "What have you tried before? Why didn't it work?"
→ "What does staying stuck cost you every month?"
→ "On a scale of 1-10, how committed are you to changing this?"

IF 8+: present the offer
IF <8: find the gap, address it, re-score

CLOSE:
"Based on everything you've shared, [Program] is the right fit.
The investment is [price]. Want to get started today?"

POST-CALL FOLLOW-UP (if not closed):
Day 0: Recap email — "Here's what we discussed..."
Day 1: Case study — "Here's someone just like you..."
Day 2: Objection preempt — "The #1 thing people ask before..."
Day 4: Urgency — "I'm holding your spot until [date]"
Day 6: Final decision — "[Name], need to know by [date]"
Day 7: Breakup email — transparent and professional`)}
</section>
`)
