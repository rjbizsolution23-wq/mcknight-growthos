import { shell } from './layout'

const field = (name: string, label: string, placeholder: string, type = 'text') => `
<label class="block">
  <span class="text-xs text-gray-400 font-medium">${label}</span>
  <input type="${type}" name="${name}" placeholder="${placeholder}" class="mt-1 w-full bg-[#060a14] border border-gray-700 focus:border-brand-cyan rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none">
</label>`

export const builderPage = () => shell('Funnel Builder', 'builder', `
<section id="builder-hero" class="mb-8">
  <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-3"><i class="fas fa-wand-magic-sparkles grad-text mr-2"></i>Funnel Builder</h1>
  <p class="text-gray-400 max-w-3xl">Pick a template, drop in your details, generate a fully customized live funnel page with a shareable URL. Leave any field blank to keep the polished default. Zero placeholders in the output.</p>
</section>

<div class="grid lg:grid-cols-2 gap-8">
  <form id="builder-form" class="card p-6">
    <label class="block mb-6">
      <span class="text-sm text-white font-semibold">Template</span>
      <select id="builder-template" class="mt-2 w-full bg-[#060a14] border border-gray-700 rounded-lg px-3 py-3 text-sm text-gray-200">
        <option value="event-landing">🎟️ Event Registration Funnel</option>
        <option value="sponsor-deck">🤝 Sponsor Prospectus</option>
        <option value="tax-lead">⚖️ Tax Resolution Lead Funnel</option>
        <option value="credit-service">📈 Credit Repair Service Funnel</option>
        <option value="credit-saas">💻 Credit Repair SaaS Funnel</option>
      </select>
    </label>

    <fieldset data-fields-for="event-landing" class="space-y-3">
      ${field('eventName', 'Event Name', 'The Funnel Growth Summit 2026')}
      ${field('date', 'Date', 'October 15–17, 2026')}
      ${field('location', 'Location', 'Live Virtual + Albuquerque, NM')}
      ${field('promise', 'Big Promise Headline (≤12 words ideal)', 'Walk Away Knowing Exactly How to Fill Your Next Event...')}
      ${field('audience', 'Who It\'s For', 'coaches, consultants, and agency owners...')}
      ${field('host', 'Host Name', 'Rick Jefferson')}
      ${field('hostCred', 'Host Credibility Line', 'Founder of RJ Business Solutions — has built...')}
      <div class="grid grid-cols-3 gap-3">
        ${field('gaPrice', 'GA Price', '$97')}
        ${field('vipPrice', 'VIP Price', '$297')}
        ${field('elitePrice', 'Elite Price', '$997')}
      </div>
      <div class="grid grid-cols-2 gap-3">
        ${field('registered', 'Registered Count', '1,247')}
        ${field('seats', 'Seats Remaining', '53')}
      </div>
      ${field('deadline', 'Early Bird Deadline (ISO date)', '2026-08-01T23:59:59', 'text')}
    </fieldset>

    <fieldset data-fields-for="sponsor-deck" class="space-y-3 hidden">
      ${field('eventName', 'Event Name', 'The Funnel Growth Summit 2026')}
      ${field('date', 'Date', 'October 15–17, 2026')}
      ${field('location', 'Location', 'Live Virtual + Albuquerque, NM')}
      ${field('attendees', 'Attendee Count', '1,300+')}
      ${field('audience', 'Audience Description', 'coaches, consultants, and agency owners — 68% doing $10K–$100K/mo')}
      ${field('contact', 'Sponsor Contact Email', 'sponsors@yourevent.com', 'email')}
      <div class="grid grid-cols-3 gap-3">
        ${field('titlePrice', 'Title Price', '$15,000')}
        ${field('goldPrice', 'Gold Price', '$7,500')}
        ${field('silverPrice', 'Silver Price', '$2,500')}
      </div>
      <div class="grid grid-cols-2 gap-3">
        ${field('titleSpots', 'Title Spots Left', '1')}
        ${field('goldSpots', 'Gold Spots Left', '2')}
      </div>
    </fieldset>

    <fieldset data-fields-for="tax-lead" class="space-y-3 hidden">
      ${field('firmName', 'Firm Name', 'Jefferson Tax Resolution Group')}
      ${field('credential', 'Credentials', 'Enrolled Agents (EA) & CPAs')}
      ${field('state', 'State Served', 'New Mexico')}
      <div class="grid grid-cols-2 gap-3">
        ${field('years', 'Years in Practice', '12')}
        ${field('casesHandled', 'Cases Handled', '2,400+')}
      </div>
      ${field('phone', 'Phone Number', '(505) 555-0134', 'tel')}
    </fieldset>

    <fieldset data-fields-for="credit-service" class="space-y-3 hidden">
      ${field('companyName', 'Company Name', 'TrueNorth Credit Solutions')}
      ${field('state', 'State Served', 'New Mexico')}
      ${field('clientsHelped', 'Clients Helped', '3,100+')}
      <div class="grid grid-cols-2 gap-3">
        ${field('essentialPrice', 'Essential $/mo', '$99')}
        ${field('essentialSetup', 'Essential Setup', '$150')}
      </div>
      <div class="grid grid-cols-2 gap-3">
        ${field('acceleratedPrice', 'Accelerated $/mo', '$179')}
        ${field('acceleratedSetup', 'Accelerated Setup', '$249')}
      </div>
      ${field('flatPrice', 'Flat Fee Price', '$1,095')}
    </fieldset>

    <fieldset data-fields-for="credit-saas" class="space-y-3 hidden">
      ${field('productName', 'Product Name', 'DisputeForge')}
      ${field('tagline', 'Hero Tagline', 'The Credit Repair Software Built to Keep Your Business Compliant — and Growing')}
      <div class="grid grid-cols-3 gap-3">
        ${field('starterPrice', 'Starter $/mo', '$97')}
        ${field('growthPrice', 'Growth $/mo', '$197')}
        ${field('scalePrice', 'Scale $/mo', '$397')}
      </div>
    </fieldset>

    <button type="submit" class="mt-6 w-full grad-bg text-white font-bold py-4 rounded-xl text-lg hover:opacity-90"><i class="fas fa-bolt mr-2"></i>Generate My Funnel →</button>
    <p class="text-xs text-gray-500 mt-3 text-center">The generated URL carries your inputs as parameters — bookmark or share it. Templates ship with example proof data; replace with your verified numbers before real launch.</p>
  </form>

  <div>
    <div id="builder-result" class="hidden">
      <div class="card p-4 mb-4">
        <p class="text-xs text-gray-400 mb-1">Your funnel URL (open / share):</p>
        <a id="builder-link" href="#" target="_blank" class="text-brand-cyan text-sm break-all underline"></a>
      </div>
      <div class="card overflow-hidden" style="height:70vh">
        <iframe id="builder-preview" class="w-full h-full bg-white" title="Funnel preview"></iframe>
      </div>
    </div>
    <div id="builder-placeholder" class="card p-10 text-center text-gray-500">
      <i class="fas fa-arrow-left text-3xl mb-4 hidden lg:block"></i>
      <i class="fas fa-arrow-up text-3xl mb-4 lg:hidden"></i>
      <p>Fill the form and hit <span class="text-white font-semibold">Generate</span> — your live funnel preview renders here.</p>
    </div>
  </div>
</div>
<script>
  document.getElementById('builder-form').addEventListener('submit', () => {
    document.getElementById('builder-placeholder').classList.add('hidden')
  })
</script>
`)
