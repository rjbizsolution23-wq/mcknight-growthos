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
        <option value="restaurant">🍽️ Restaurant VIP Table Funnel</option>
        <option value="dental">🦷 Dental New Patient Funnel</option>
        <option value="auto-services">🚗 Auto Repair Inspection Funnel</option>
        <option value="salon">✂️ Salon New Guest Funnel</option>
        <option value="mortgage">🏦 Mortgage Pre-Approval Funnel</option>
        <option value="chiropractic">🦴 Chiropractic New Patient Funnel</option>
        <option value="pet-care">🐾 Pet Care / Vet Funnel</option>
        <option value="landscaping">🌿 Landscaping Design Funnel</option>
        <option value="cleaning">🧹 Cleaning Service Funnel</option>
        <option value="childcare">🧸 Childcare Enrollment Funnel</option>
        <option value="tutoring">🎓 Tutoring Assessment Funnel</option>
        <option value="accounting">🧮 CPA Tax Savings Funnel</option>
        <option value="photography">📸 Photography Mini-Session Funnel</option>
        <option value="wedding-venue">🥂 Wedding Venue Tour Funnel</option>
        <option value="moving">🚚 Moving Company Quote Funnel</option>
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

    <fieldset data-fields-for="restaurant" class="space-y-3 hidden">
      ${field('bizName', 'Restaurant Name', 'Casa Bella Trattoria')}
      ${field('cuisine', 'Cuisine', 'wood-fired Italian')}
      ${field('city', 'City', 'Albuquerque')}
      ${field('offer', 'VIP Offer', 'Free appetizer + dessert for two')}
      <div class="grid grid-cols-3 gap-3">
        ${field('offerValue', 'Offer Value', '$34')}
        ${field('rating', 'Star Rating', '4.8')}
        ${field('reviewCount', 'Review Count', '1,240+')}
      </div>
      ${field('deadline', 'Offer Deadline (YYYY-MM-DD)', '2026-08-15')}
    </fieldset>

    <fieldset data-fields-for="dental" class="space-y-3 hidden">
      ${field('practice', 'Practice Name', 'Bright Smile Dental')}
      ${field('dentist', 'Dentist Name', 'Dr. Sarah Chen, DDS')}
      ${field('city', 'City', 'Albuquerque')}
      ${field('offer', 'New Patient Offer', 'Exam + X-Rays + Cleaning')}
      <div class="grid grid-cols-3 gap-3">
        ${field('offerPrice', 'Offer Price', '$99')}
        ${field('offerValue', 'Regular Value', '$395')}
        ${field('patientCount', 'Patients Served', '12,000+')}
      </div>
      ${field('deadline', 'Offer Deadline (YYYY-MM-DD)', '2026-08-15')}
    </fieldset>

    <fieldset data-fields-for="auto-services" class="space-y-3 hidden">
      ${field('shopName', 'Shop Name', 'Precision Auto Care')}
      ${field('city', 'City', 'Albuquerque')}
      ${field('service', 'Service Type', 'full-service auto repair')}
      ${field('offer', 'Intro Offer', '$29 Full-Vehicle Inspection + Oil Change')}
      <div class="grid grid-cols-3 gap-3">
        ${field('offerValue', 'Offer Value', '$129')}
        ${field('rating', 'Star Rating', '4.9')}
        ${field('reviewCount', 'Review Count', '870+')}
      </div>
      ${field('warranty', 'Warranty', '24-month / 24,000-mile')}
      ${field('deadline', 'Offer Deadline (YYYY-MM-DD)', '2026-08-15')}
    </fieldset>

    <fieldset data-fields-for="salon" class="space-y-3 hidden">
      ${field('salonName', 'Salon Name', 'Luxe Studio Salon')}
      ${field('city', 'City', 'Albuquerque')}
      ${field('specialty', 'Specialty', 'balayage & precision color')}
      ${field('offer', 'New Guest Offer', '30% Off Your First Color + Free Deep-Conditioning Treatment')}
      <div class="grid grid-cols-4 gap-3">
        ${field('offerValue', 'Offer Value', '$85')}
        ${field('stylistCount', 'Stylists', '9')}
        ${field('rating', 'Star Rating', '4.9')}
        ${field('reviewCount', 'Reviews', '640+')}
      </div>
      ${field('deadline', 'Offer Deadline (YYYY-MM-DD)', '2026-08-15')}
    </fieldset>

    <fieldset data-fields-for="mortgage" class="space-y-3 hidden">
      ${field('loName', 'Loan Officer Name', 'Marcus Reed')}
      ${field('company', 'Company Name', 'Summit Home Lending')}
      <div class="grid grid-cols-2 gap-3">
        ${field('nmls', 'NMLS Number', 'NMLS #123456')}
        ${field('city', 'City', 'Albuquerque')}
      </div>
      <div class="grid grid-cols-2 gap-3">
        ${field('rate', 'Sample Rate (APR)', '5.99%')}
        ${field('program', 'Program Focus', 'first-time buyer')}
      </div>
      <div class="grid grid-cols-2 gap-3">
        ${field('closedCount', 'Families Funded', '1,400+')}
        ${field('avgDays', 'Avg Days to Close', '18')}
      </div>
      ${field('deadline', 'Rate Lock Deadline (YYYY-MM-DD)', '2026-08-15')}
    </fieldset>

    <fieldset data-fields-for="chiropractic" class="space-y-3 hidden">
      ${field('clinic', 'Clinic Name', 'Align Spine & Wellness')}
      ${field('doctor', 'Doctor Name', 'Dr. Maya Torres, DC')}
      ${field('city', 'City', 'Albuquerque')}
      ${field('offer', 'New Patient Offer', 'Exam + Consultation + First Adjustment')}
      <div class="grid grid-cols-3 gap-3">
        ${field('offerPrice', 'Offer Price', '$49')}
        ${field('offerValue', 'Offer Value', '$265')}
        ${field('patientCount', 'Patients Helped', '8,500+')}
      </div>
      ${field('deadline', 'Offer Deadline (YYYY-MM-DD)', '2026-08-15')}
    </fieldset>

    <fieldset data-fields-for="pet-care" class="space-y-3 hidden">
      ${field('bizName', 'Business Name', 'Happy Tails Veterinary & Grooming')}
      ${field('city', 'City', 'Albuquerque')}
      ${field('service', 'Services', 'veterinary care & grooming')}
      ${field('offer', 'New Client Offer', 'Free First Wellness Exam + 20% Off First Groom')}
      <div class="grid grid-cols-3 gap-3">
        ${field('offerValue', 'Offer Value', '$95')}
        ${field('petCount', 'Pets Cared For', '15,000+')}
        ${field('rating', 'Star Rating', '4.9')}
      </div>
      ${field('deadline', 'Offer Deadline (YYYY-MM-DD)', '2026-08-15')}
    </fieldset>

    <fieldset data-fields-for="landscaping" class="space-y-3 hidden">
      ${field('company', 'Company Name', 'Desert Bloom Landscaping')}
      ${field('city', 'City', 'Albuquerque')}
      ${field('service', 'Services', 'landscape design & maintenance')}
      ${field('offer', 'Lead Offer', 'Free Design Consultation + 3D Rendering')}
      <div class="grid grid-cols-3 gap-3">
        ${field('offerValue', 'Offer Value', '$450')}
        ${field('projectCount', 'Projects Completed', '1,200+')}
        ${field('years', 'Years in Business', '15')}
      </div>
      ${field('deadline', 'Offer Deadline (YYYY-MM-DD)', '2026-08-15')}
    </fieldset>

    <fieldset data-fields-for="cleaning" class="space-y-3 hidden">
      ${field('company', 'Company Name', 'Spotless Pro Cleaning')}
      ${field('city', 'City', 'Albuquerque')}
      ${field('service', 'Services', 'home & office cleaning')}
      ${field('offer', 'First-Clean Offer', '$50 Off Your First Deep Clean')}
      <div class="grid grid-cols-3 gap-3">
        ${field('cleansDone', 'Cleans Completed', '22,000+')}
        ${field('rating', 'Star Rating', '4.9')}
        ${field('guarantee', 'Guarantee', '24-hour re-clean guarantee')}
      </div>
      ${field('deadline', 'Offer Deadline (YYYY-MM-DD)', '2026-08-15')}
    </fieldset>

    <fieldset data-fields-for="childcare" class="space-y-3 hidden">
      ${field('center', 'Center Name', 'Little Explorers Learning Center')}
      ${field('city', 'City', 'Albuquerque')}
      ${field('ages', 'Ages Served', '6 weeks \u2013 5 years')}
      ${field('offer', 'Enrollment Offer', 'Free Registration + First Week 50% Off')}
      <div class="grid grid-cols-3 gap-3">
        ${field('offerValue', 'Offer Value', '$275')}
        ${field('familyCount', 'Families Served', '900+')}
        ${field('ratio', 'Best Ratio', '1:4 infant ratio')}
      </div>
      ${field('deadline', 'Offer Deadline (YYYY-MM-DD)', '2026-08-15')}
    </fieldset>

    <fieldset data-fields-for="tutoring" class="space-y-3 hidden">
      ${field('bizName', 'Business Name', 'Peak Performance Tutoring')}
      ${field('city', 'City', 'Albuquerque')}
      ${field('subject', 'Subjects', 'math, reading & test prep')}
      ${field('offer', 'Lead Offer', 'Free Skills Assessment + First Session Free')}
      <div class="grid grid-cols-3 gap-3">
        ${field('offerValue', 'Offer Value', '$190')}
        ${field('studentCount', 'Students Helped', '3,400+')}
        ${field('gradeGain', 'Avg Grade Gain', '1.5 letter grades')}
      </div>
      ${field('deadline', 'Offer Deadline (YYYY-MM-DD)', '2026-08-15')}
    </fieldset>

    <fieldset data-fields-for="accounting" class="space-y-3 hidden">
      ${field('firm', 'Firm Name', 'Summit CPA Advisors')}
      ${field('cpa', 'CPA Name', 'Daniel Ortiz, CPA')}
      ${field('city', 'City', 'Albuquerque')}
      ${field('niche', 'Client Niche', 'small business owners & contractors')}
      ${field('offer', 'Lead Offer', 'Free Tax Savings Review')}
      <div class="grid grid-cols-2 gap-3">
        ${field('avgSavings', 'Avg First-Year Savings', '$11,400')}
        ${field('clientCount', 'Clients Served', '650+')}
      </div>
      ${field('deadline', 'Offer Deadline (YYYY-MM-DD)', '2026-08-15')}
    </fieldset>

    <fieldset data-fields-for="photography" class="space-y-3 hidden">
      ${field('studio', 'Studio Name', 'Golden Hour Studios')}
      ${field('photographer', 'Photographer Name', 'Elena Vasquez')}
      ${field('city', 'City', 'Albuquerque')}
      ${field('specialty', 'Specialty', 'family, branding & wedding photography')}
      ${field('offer', 'Session Offer', 'Mini Session + 5 Edited Images')}
      <div class="grid grid-cols-3 gap-3">
        ${field('offerPrice', 'Offer Price', '$149')}
        ${field('offerValue', 'Offer Value', '$425')}
        ${field('sessionCount', 'Sessions Shot', '2,100+')}
      </div>
      ${field('deadline', 'Booking Deadline (YYYY-MM-DD)', '2026-08-15')}
    </fieldset>

    <fieldset data-fields-for="wedding-venue" class="space-y-3 hidden">
      ${field('venue', 'Venue Name', 'The Cottonwood Estate')}
      ${field('city', 'City', 'Albuquerque')}
      ${field('style', 'Venue Style', 'garden & rustic-elegant')}
      ${field('offer', 'Tour Offer', 'Complimentary Champagne Tour + Date-Hold')}
      <div class="grid grid-cols-3 gap-3">
        ${field('capacity', 'Guest Capacity', '250')}
        ${field('weddingCount', 'Weddings Hosted', '480+')}
        ${field('startingPrice', 'Starting Price', '$4,900')}
      </div>
      ${field('deadline', 'Tour Deadline (YYYY-MM-DD)', '2026-08-15')}
    </fieldset>

    <fieldset data-fields-for="moving" class="space-y-3 hidden">
      ${field('company', 'Company Name', 'Rock Steady Moving Co.')}
      ${field('city', 'City', 'Albuquerque')}
      ${field('service', 'Services', 'local & long-distance moving')}
      ${field('offer', 'Quote Offer', 'Free In-Home Estimate + $100 Off Booking')}
      <div class="grid grid-cols-3 gap-3">
        ${field('movesDone', 'Moves Completed', '9,800+')}
        ${field('rating', 'Star Rating', '4.9')}
        ${field('claimRate', 'Damage Claim Rate', '0.4%')}
      </div>
      ${field('deadline', 'Offer Deadline (YYYY-MM-DD)', '2026-08-15')}
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

      <p class="text-sm text-white font-semibold pt-3"><i class="fas fa-paintbrush text-brand-cyan mr-2"></i>White-Label Client Branding <span class="text-[10px] text-amber-400 font-mono ml-1">SELL-READY</span></p>
      ${field('bizLogo', 'Client Logo URL (https… — injected into hero + footer)', 'https://client-site.com/logo.png')}
      <div class="grid grid-cols-2 gap-3">
        ${field('brandColor', 'Client Brand Color (6-digit hex)', '#16a34a')}
        ${field('accentColor', 'Accent Color (optional, defaults to brand)', '#0ea5e9')}
      </div>
      <p class="text-[11px] text-gray-500">White-label mode re-skins every CTA, glow, focus ring & gradient to the client\u2019s colors and swaps in their logo — sell any funnel as their own branded system.</p>

      <p class="text-sm text-white font-semibold pt-3"><i class="fas fa-arrows-rotate text-brand-cyan mr-2"></i>GoHighLevel</p>
      ${field('ghlTag', 'GHL Tags for leads from this funnel (comma-separated)', 'client-acme, spring-promo')}
      <p class="text-[11px] text-gray-500">Every lead auto-syncs to your GHL sub-account (contact upsert + <code class="text-blue-300">funnel-{slug}</code> tags + attribution note + optional pipeline/workflow \u2014 configure once in <a href="/integrations" class="text-blue-300 underline">Integrations</a>). Tags here ride along per-funnel-link \u2014 perfect for white-label client attribution.</p>

      <p class="text-sm text-white font-semibold pt-3"><i class="fas fa-chart-line text-brand-cyan mr-2"></i>Tracking Pixels (all optional — paste IDs, done)</p>
      <div class="grid grid-cols-2 gap-3">
        ${field('ga4', 'Google Analytics 4 ID', 'G-XXXXXXXXXX')}
        ${field('gtm', 'Google Tag Manager ID', 'GTM-XXXXXXX')}
        ${field('metaPixel', 'Meta (Facebook) Pixel ID', '1234567890')}
        ${field('ttPixel', 'TikTok Pixel ID', 'CXXXXXXXXXX')}
      </div>
      <p class="text-[11px] text-gray-500">Leads auto-fire <code class="text-blue-300">generate_lead</code>; checkout buttons fire <code class="text-blue-300">begin_checkout</code> to every loaded pixel. UTM params + gclid/fbclid/ttclid are captured and attached to each lead automatically.</p>

      <p class="text-sm text-white font-semibold pt-3"><i class="fas fa-bullseye text-brand-cyan mr-2"></i>Conversion Layer</p>
      ${field('redirect', 'Thank-You Redirect URL (after lead submit)', 'https://yoursite.com/thank-you')}
      ${field('cta', 'Sticky-bar / exit-popup CTA text', 'Get My Free Report \u2192')}
      <div class="grid grid-cols-2 gap-3">
        ${field('exitTitle', 'Exit popup headline', 'Wait \u2014 your free report\u2026')}
        ${field('exitDesc', 'Exit popup message', 'Takes 60 seconds. Zero obligation.')}
      </div>
      <div class="grid grid-cols-3 gap-3">
        <label class="flex items-center gap-2 bg-[#060a14] border border-gray-700 rounded-lg px-3 py-2.5 cursor-pointer text-xs text-gray-300"><input type="checkbox" name="exit" value="0" class="w-4 h-4 accent-blue-500">Disable exit popup</label>
        <label class="flex items-center gap-2 bg-[#060a14] border border-gray-700 rounded-lg px-3 py-2.5 cursor-pointer text-xs text-gray-300"><input type="checkbox" name="sticky" value="0" class="w-4 h-4 accent-blue-500">Disable sticky CTA</label>
        <label class="flex items-center gap-2 bg-[#060a14] border border-gray-700 rounded-lg px-3 py-2.5 cursor-pointer text-xs text-gray-300"><input type="checkbox" name="progress" value="0" class="w-4 h-4 accent-blue-500">Disable progress bar</label>
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
