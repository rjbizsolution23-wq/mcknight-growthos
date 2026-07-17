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
        <option value="real-estate">🏡 Real Estate Seller Lead Funnel</option>
        <option value="fitness">💪 Fitness Coaching Funnel</option>
        <option value="coaching">👑 High-Ticket Coaching / Consulting Funnel</option>
        <option value="ecommerce">🛒 E-commerce Product Funnel</option>
        <option value="saas-trial">⚡ SaaS Free Trial Funnel</option>
        <option value="law-firm">⚖️ Law Firm Case Review Funnel</option>
        <option value="home-services">🏠 Home Services Estimate Funnel</option>
        <option value="med-spa">✨ Med Spa New Client Funnel</option>
        <option value="insurance">🛡️ Insurance Quote Funnel</option>
        <option value="agency">🚀 Marketing Agency Growth Audit Funnel</option>
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

    <fieldset data-fields-for="real-estate" class="space-y-3 hidden">
      ${field('agentName', 'Agent Name', 'Rick Jefferson')}
      ${field('brokerage', 'Brokerage', 'Summit Realty Group')}
      ${field('city', 'City / Market', 'Albuquerque')}
      <div class="grid grid-cols-3 gap-3">
        ${field('homesSold', 'Homes Sold', '340+')}
        ${field('avgDays', 'Avg Days on Mkt', '11')}
        ${field('avgOver', 'Avg % Over List', '4.2%')}
      </div>
      ${field('phone', 'Phone Number', '(505) 555-0177', 'tel')}
    </fieldset>

    <fieldset data-fields-for="fitness" class="space-y-3 hidden">
      ${field('programName', 'Program Name', 'The 90-Day Reset')}
      ${field('coachName', 'Coach Name', 'Coach Rick')}
      ${field('promise', 'Big Promise Headline', 'Drop the Weight, Keep the Muscle...')}
      ${field('audience', 'Who It\'s For', 'busy professionals over 30...')}
      <div class="grid grid-cols-2 gap-3">
        ${field('price', 'Group Price', '$197/mo')}
        ${field('vipPrice', 'VIP Price', '$497/mo')}
      </div>
      <div class="grid grid-cols-2 gap-3">
        ${field('clientCount', 'Clients Coached', '1,200+')}
        ${field('spots', 'Spots This Cohort', '15')}
      </div>
      ${field('deadline', 'Enrollment Deadline (ISO date)', '2026-08-01T23:59:59')}
    </fieldset>

    <fieldset data-fields-for="coaching" class="space-y-3 hidden">
      ${field('programName', 'Program Name', 'The Scale Accelerator')}
      ${field('coachName', 'Advisor Name', 'Rick Jefferson')}
      ${field('promise', 'Big Promise Headline', 'Install the Systems That Take You From Operator to Owner...')}
      ${field('audience', 'Who It\'s For', 'founders doing $10K–$50K/month...')}
      <div class="grid grid-cols-3 gap-3">
        ${field('clientCount', 'Clients Advised', '215')}
        ${field('revenue', 'Client Revenue', '$40M+')}
        ${field('investment', 'Investment', '$12,000')}
      </div>
    </fieldset>

    <fieldset data-fields-for="ecommerce" class="space-y-3 hidden">
      ${field('productName', 'Product Name', 'HydraCore Pro')}
      ${field('brandName', 'Brand Name', 'HydraCore')}
      ${field('promise', 'Hero Headline', 'The Insulated Bottle That Keeps Ice Frozen for 48 Hours...')}
      ${field('category', 'Product Category', 'premium insulated water bottle')}
      <div class="grid grid-cols-3 gap-3">
        ${field('price', 'Sale Price', '$49')}
        ${field('compareAt', 'Compare-At Price', '$79')}
        ${field('bundlePrice', 'Bundle Price', '$89')}
      </div>
      <div class="grid grid-cols-2 gap-3">
        ${field('reviews', 'Review Count', '12,400+')}
        ${field('rating', 'Avg Rating', '4.8')}
      </div>
      ${field('deadline', 'Sale Deadline (ISO date)', '2026-08-01T23:59:59')}
    </fieldset>

    <fieldset data-fields-for="saas-trial" class="space-y-3 hidden">
      ${field('productName', 'Product Name', 'PipelinePilot')}
      ${field('tagline', 'Hero Headline', 'Stop Losing Deals in Spreadsheet Hell...')}
      ${field('audience', 'Who It\'s For', 'sales teams of 2–50...')}
      <div class="grid grid-cols-2 gap-3">
        ${field('userCount', 'Teams / Users Count', '8,400+')}
        ${field('trialDays', 'Trial Length (days)', '14')}
      </div>
      <div class="grid grid-cols-3 gap-3">
        ${field('starterPrice', 'Starter $/user/mo', '$29')}
        ${field('proPrice', 'Pro $/user/mo', '$79')}
        ${field('teamPrice', 'Team $/user/mo', '$149')}
      </div>
    </fieldset>

    <fieldset data-fields-for="law-firm" class="space-y-3 hidden">
      ${field('firmName', 'Firm Name', 'Jefferson & Associates Injury Law')}
      ${field('practiceArea', 'Practice Area', 'personal injury')}
      ${field('city', 'City', 'Albuquerque')}
      <div class="grid grid-cols-3 gap-3">
        ${field('recovered', 'Total Recovered', '$120M+')}
        ${field('casesWon', 'Cases Resolved', '2,800+')}
        ${field('years', 'Years in Practice', '22')}
      </div>
      ${field('phone', 'Phone Number', '(505) 555-0199', 'tel')}
    </fieldset>

    <fieldset data-fields-for="home-services" class="space-y-3 hidden">
      ${field('companyName', 'Company Name', 'Summit Roofing & Exteriors')}
      ${field('service', 'Service (lowercase)', 'roof replacement')}
      ${field('city', 'City', 'Albuquerque')}
      <div class="grid grid-cols-3 gap-3">
        ${field('jobsDone', 'Jobs Completed', '4,600+')}
        ${field('years', 'Years in Business', '18')}
        ${field('warranty', 'Warranty', '25-year')}
      </div>
      <div class="grid grid-cols-2 gap-3">
        ${field('discount', 'Offer / Discount', '$750 OFF')}
        ${field('phone', 'Phone', '(505) 555-0142', 'tel')}
      </div>
      ${field('deadline', 'Offer Deadline (ISO date)', '2026-08-01T23:59:59')}
    </fieldset>

    <fieldset data-fields-for="med-spa" class="space-y-3 hidden">
      ${field('spaName', 'Med Spa Name', 'Luxe Aesthetics Med Spa')}
      ${field('treatment', 'Treatment (lowercase)', 'laser skin rejuvenation')}
      ${field('city', 'City', 'Albuquerque')}
      ${field('provider', 'Medical Director', 'Dr. Elena Vasquez, MD')}
      <div class="grid grid-cols-3 gap-3">
        ${field('offerPrice', 'Offer Price', '$99')}
        ${field('offerValue', 'Offer Value', '$350')}
        ${field('clientCount', 'Treatments Done', '9,200+')}
      </div>
      ${field('deadline', 'Offer Deadline (ISO date)', '2026-08-01T23:59:59')}
    </fieldset>

    <fieldset data-fields-for="insurance" class="space-y-3 hidden">
      ${field('agencyName', 'Agency Name', 'Jefferson Financial Group')}
      ${field('productLine', 'Product Line (lowercase)', 'life insurance')}
      ${field('state', 'State', 'New Mexico')}
      <div class="grid grid-cols-3 gap-3">
        ${field('familiesServed', 'Families Served', '5,300+')}
        ${field('carrierCount', 'Carriers Compared', '40+')}
        ${field('startingPrice', 'Starting Price', '$23/mo')}
      </div>
      ${field('phone', 'Phone Number', '(505) 555-0166', 'tel')}
    </fieldset>

    <fieldset data-fields-for="agency" class="space-y-3 hidden">
      ${field('agencyName', 'Agency Name', 'RJ Growth Partners')}
      ${field('niche', 'Client Niche (lowercase)', 'home service businesses')}
      ${field('service', 'Core Service (lowercase)', 'done-for-you lead generation')}
      <div class="grid grid-cols-3 gap-3">
        ${field('clientCount', 'Active Clients', '140+')}
        ${field('leadsGenerated', 'Leads Generated', '312,000+')}
        ${field('avgRoas', 'Avg ROAS', '5.4x')}
      </div>
      ${field('retainer', 'Monthly Retainer', '$2,500/mo')}
    </fieldset>

    <fieldset id="builder-universal" class="mt-6 pt-5 border-t border-blue-900/50 space-y-3">
      <p class="text-sm text-white font-semibold"><i class="fas fa-sliders text-brand-cyan mr-2"></i>Universal Options — SEO / Theme (all templates)</p>
      <label class="flex items-center gap-3 bg-[#060a14] border border-gray-700 rounded-lg px-3 py-3 cursor-pointer">
        <input type="checkbox" name="theme" value="dark" class="w-4 h-4 accent-blue-500">
        <span class="text-sm text-gray-200"><i class="fas fa-moon text-blue-400 mr-2"></i><strong>Dark background mode</strong> — render the funnel on the RJ Navy dark theme</span>
      </label>
      ${field('seoTitle', 'SEO Title (≤60 chars — overrides page title, OG & Twitter)', 'Sell Your ABQ Home in 11 Days — Summit Realty')}
      ${field('seoDesc', 'SEO Meta Description (140–160 chars)', 'Free 24-hour home value report from Albuquerque\u2019s data-driven listing team...')}
      ${field('seoKeywords', 'SEO Keywords (comma-separated)', 'sell my house albuquerque, home value report')}
      <div class="grid grid-cols-2 gap-3">
        ${field('canonical', 'Canonical URL', 'https://yoursite.com/sell')}
        ${field('ogImage', 'OG Share Image URL (1200×630)', 'https://yoursite.com/og.jpg')}
      </div>
      <p class="text-[11px] text-gray-500">Every generated funnel auto-includes full meta tags, OG graph, Twitter cards & JSON-LD schema. Need a standalone pack (sitemap, robots.txt, AEO blocks)? Use the <a href="/seo" class="text-blue-300 underline">SEO Engine</a>.</p>
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
