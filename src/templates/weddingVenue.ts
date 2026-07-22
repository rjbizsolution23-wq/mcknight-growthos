import { param, funnelHead, templateBadge, defaultDeadline } from './helpers'

export const weddingVenueTemplate = (q: Record<string, string | undefined>) => {
  const venue = param(q, 'venue', 'The Cottonwood Estate')
  const city = param(q, 'city', 'Albuquerque')
  // Accepts venueStyle (builder) or legacy style param — 'style' as an input
  // name shadows form.style in the DOM, so the builder sends venueStyle.
  const style = param({ ...q, style: q.venueStyle || q.style }, 'style', 'garden & rustic-elegant')
  const offer = param(q, 'offer', 'Complimentary Champagne Tour + Date-Hold')
  const capacity = param(q, 'capacity', '250')
  const weddingCount = param(q, 'weddingCount', '480+')
  const startingPrice = param(q, 'startingPrice', '$4,900')
  const deadline = q.deadline && q.deadline.trim() ? q.deadline.trim() : defaultDeadline()

  return `${funnelHead(`${venue} — Wedding Venue in ${city} | Book a Private Tour`, q, { desc: `${venue}: ${style} wedding venue in ${city} for up to ${capacity} guests. ${offer} — packages from ${startingPrice}. ${weddingCount} weddings hosted.`, type: 'EventVenue' })}
<body class="bg-white text-gray-900">

<!-- [1] HERO -->
<header id="hero" class="relative bg-gradient-to-br from-gray-950 via-rose-950 to-stone-900 text-white overflow-hidden">
  <div class="max-w-5xl mx-auto px-4 py-16 text-center relative z-10">
    <p class="inline-block bg-rose-500/20 text-rose-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"><i class="fas fa-rings-wedding mr-2"></i>${city} \u00b7 ${style} \u00b7 Up to ${capacity} guests</p>
    <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">Say Yes to the Place Before the Dress <span class="text-rose-300 text-3xl md:text-4xl">\u2014 ${offer}</span></h1>
    <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">${weddingCount} couples have said "I do" under our cottonwoods. Tour the grounds at sunset, champagne in hand \u2014 and if it feels like yours, we\u2019ll hold your date for 14 days, free.</p>
    <div class="bg-gray-800/60 rounded-2xl p-4 inline-block mb-8 glass-dark">
      <p class="text-sm text-gray-400 mb-1">Peak-season dates are booking now \u2014 tour offer ends in:</p>
      <p class="text-3xl font-bold text-rose-400 font-mono" data-countdown="${deadline}">--</p>
    </div>
    <div><a href="#tour" class="pulse-glow inline-block bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-10 py-5 rounded-2xl">Book My Private Tour \u2192</a></div>
    <p class="mt-6 text-gray-400 text-sm"><i class="fas fa-champagne-glasses text-rose-400 mr-1"></i>Packages from ${startingPrice} \u00b7 14-day free date-hold</p>
  </div>
</header>

<!-- [2] WHY -->
<section id="why" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-3">Why Couples Choose ${venue}</h2>
    <p class="text-center text-gray-600 mb-10 max-w-2xl mx-auto">You\u2019ve seen the venues with hidden fees, rushed timelines, and "preferred vendor" markups. We built the opposite.</p>
    <div class="grid md:grid-cols-3 gap-6">
      ${[
        ['fa-clock', 'The Whole Day Is Yours', 'One wedding per day, always. Get ready on-site from 10am, dance until 11 \u2014 no afternoon wedding being swept out as yours begins.'],
        ['fa-file-invoice-dollar', 'Transparent, All-In Pricing', 'Published packages with everything itemized \u2014 tables, chairs, linens, setup, teardown, day-of coordinator. The quote you get is the price you pay.'],
        ['fa-heart', 'Your Vendors, Welcome', 'Bring any licensed caterer, florist, or DJ you love \u2014 no forced lists, no "outside vendor fees." It\u2019s your day, not our commission.'],
      ].map(([icon, title, body]) => `
      <article class="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl mb-4"><i class="fas ${icon}"></i></div>
        <h3 class="font-bold text-lg mb-2">${title}</h3>
        <p class="text-gray-600 text-sm">${body}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- [3] SPACES -->
<section id="spaces" class="py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-extrabold mb-6">Ceremony to Last Dance \u2014 All On-Site</h2>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">Rain plan included: every outdoor space has a stunning indoor twin.</p>
    <div class="grid md:grid-cols-4 gap-4 text-sm">
      ${['Garden ceremony lawn', 'Grand reception hall', 'Bridal suite + groom\u2019s den', 'Sunset cocktail terrace'].map(x => `<div class="bg-rose-50 border border-rose-200 rounded-xl p-4 font-semibold text-rose-900"><i class="fas fa-check text-rose-600 mr-1"></i>${x}</div>`).join('')}
    </div>
  </div>
</section>

<!-- [4] FAQ -->
<section id="faq" class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold text-center mb-10">Couple Questions</h2>
    <div class="space-y-3">
      ${[
        ['How does the 14-day date-hold work?', 'After your tour, we\u2019ll pencil your date with zero deposit for 14 days while you decide. Nobody else can book it. If you pass, it simply releases \u2014 no charge, no awkward calls.'],
        ['What\u2019s actually included in the packages?', `Venue access all day, ceremony + reception spaces, tables, chairs, linens, setup and teardown, parking, and a day-of coordinator. Packages start at ${startingPrice} \u2014 full pricing sheet is handed to you at the tour, not hidden behind a sales call.`],
        ['What about rain or extreme heat?', 'Every outdoor space has an equally beautiful indoor backup, and the flip decision is yours until noon on wedding day \u2014 not ours.'],
        ['Do you host anything besides weddings?', 'Yes \u2014 quincea\u00f1eras, anniversaries, corporate retreats, and celebrations of life. Mention your event type in the form and we\u2019ll tailor the tour.'],
      ].map(([question, a]) => `
      <details class="bg-white rounded-xl border border-gray-200 p-5 group">
        <summary class="font-semibold cursor-pointer list-none flex justify-between items-center">${question}<i class="fas fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i></summary>
        <p class="text-gray-600 text-sm mt-3">${a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- [5] TOUR FORM -->
<section id="tour" class="py-20 bg-gradient-to-br from-gray-950 via-rose-950 to-stone-900 text-white">
  <div class="max-w-xl mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Book Your Champagne Tour</h2>
    <p class="text-gray-300 mb-8">Sunset slots go first. We\u2019ll text you available times \u2014 and yes, bring your people.</p>
    <form data-lead-form class="bg-white/10 glass-dark rounded-2xl p-6 space-y-4 text-left">
      <input name="name" required placeholder="Your name(s)" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="phone" type="tel" required placeholder="Mobile phone" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <input name="email" type="email" placeholder="Email address" class="w-full bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
      <div class="grid grid-cols-2 gap-3">
        <select name="season" class="bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
          <option value="">Target season</option>
          <option>Spring</option>
          <option>Summer</option>
          <option>Fall</option>
          <option>Winter / flexible</option>
        </select>
        <select name="guests" class="bg-white/90 text-gray-900 rounded-lg px-4 py-3.5">
          <option value="">Guest count</option>
          <option>Under 75</option>
          <option>75\u2013150</option>
          <option>150\u2013250</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <label class="flex items-start gap-2 text-xs text-gray-300"><input type="checkbox" name="smsConsent" class="mt-0.5">I agree to receive automated texts about my tour and date availability. Msg rates may apply. Reply STOP to opt out.</label>
      <button type="submit" class="pulse-glow w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 rounded-xl">Book the Tour \u2192</button>
    </form>
  </div>
</section>

<footer class="bg-gray-950 text-gray-400 text-center py-10 text-sm">
  <p class="font-bold text-white mb-1">${venue}</p>
  <p>${city} \u00b7 ${style} venue \u00b7 Up to ${capacity} guests \u00b7 Date-hold subject to availability.</p>
</footer>
${templateBadge}
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
<script src="/static/app.js"></script>
</body></html>`
}
