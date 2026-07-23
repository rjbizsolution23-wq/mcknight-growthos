import { shell, copyBlock } from './layout'

const LOGO = '/static/logo.svg'

const swatch = (name: string, hex: string) => `
<div class="rounded-xl overflow-hidden border border-blue-900/50">
  <button class="w-full h-16 block" style="background:${hex}" data-copy-text="${hex}" title="Click to copy ${hex}"></button>
  <div class="p-2 bg-[#0d1b30]">
    <p class="text-xs font-semibold text-white">${name}</p>
    <p class="text-[11px] font-mono text-gray-400">${hex}</p>
  </div>
</div>`

export const brandPage = () => shell('Brand Control Center', 'brand', `
<section id="brand-hero" class="mb-10">
  <div class="flex flex-wrap items-center gap-6 mb-4">
    <img src="${LOGO}" alt="McKnight GrowthOS logo" class="w-24 h-24 rounded-2xl border-2 border-blue-700 shadow-xl">
    <div>
      <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-2"><i class="fas fa-gem gold-text mr-2"></i>McKnight GrowthOS — Brand Control Center</h1>
      <p class="text-gray-400 max-w-3xl">Every brand asset, one-click copyable: the McKnight navy + gold + growth cyan color system, logo lockup, fonts, positioning, voice examples, taglines, hero copy and the platform disclaimer. The single source of truth for every funnel, site and deliverable shipped from GrowthOS.</p>
    </div>
  </div>
  <div class="flex flex-wrap gap-2 text-xs">
    ${['Authoritative','Strategic','Faith-grounded','Compliance-aware','Business-focused','Premium','Direct','Operational','Results-driven','Honest'].map(k => `<span class="bg-blue-950 border border-blue-800 text-blue-300 px-3 py-1 rounded-full">${k}</span>`).join('')}
  </div>
</section>

<!-- ══ IDENTITY ══ -->
<section id="brand-identity" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-id-card text-mk-cyan mr-2"></i>Core Identity & Positioning</h2>
  <div class="grid md:grid-cols-2 gap-x-6">
    <div>
      ${copyBlock('bk-name', 'Platform Name', 'McKnight GrowthOS')}
      ${copyBlock('bk-category', 'Category', 'AI-Powered Conversion and Revenue Operations Platform')}
      ${copyBlock('bk-tagline', 'Primary Tagline', 'Turn attention into pipeline—and pipeline into growth.')}
      ${copyBlock('bk-parent', 'Brand Architecture', 'Parent organization: McKnight Opportunity Group\\nPlatform: McKnight GrowthOS\\nTechnology attribution: Powered by RJ Business Solutions')}
    </div>
    <div>
      ${copyBlock('bk-oneline', 'One-Line Positioning', 'McKnight GrowthOS is an AI-powered conversion platform connecting funnels, CRM, follow-up, SEO, social content, compliance controls and growth analytics.')}
      ${copyBlock('bk-sales', 'Sales Positioning', 'Stop stitching together landing pages, spreadsheets, inboxes and disconnected automations. McKnight GrowthOS gives your business one connected system for capturing demand, qualifying leads, automating follow-up and improving conversion performance.')}
      ${copyBlock('bk-agency', 'Agency Positioning', 'Launch, brand and manage conversion systems for multiple clients from one white-label growth platform.')}
    </div>
  </div>
</section>

<!-- ══ PLATFORM SECTIONS ══ -->
<section id="brand-architecture" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-sitemap text-mk-cyan mr-2"></i>Platform Architecture</h2>
  ${copyBlock('bk-arch', 'Product Architecture', 'McKnight Opportunity Group\\n\\u2514\\u2500\\u2500 McKnight GrowthOS\\n    \\u251C\\u2500\\u2500 Funnel Studio\\n    \\u251C\\u2500\\u2500 LeadFlow CRM\\n    \\u251C\\u2500\\u2500 Campaign Vault\\n    \\u251C\\u2500\\u2500 Sponsor Engine\\n    \\u251C\\u2500\\u2500 Conversion Intelligence\\n    \\u251C\\u2500\\u2500 Compliance Guard\\n    \\u251C\\u2500\\u2500 SEO Intelligence\\n    \\u251C\\u2500\\u2500 Social AI\\n    \\u251C\\u2500\\u2500 Integration Hub\\n    \\u2514\\u2500\\u2500 Growth Analytics')}
  ${copyBlock('bk-journey', 'Customer Journey (the operating layer)', 'Traffic \\u2192 Landing Pages \\u2192 Lead Capture \\u2192 Lead Scoring \\u2192 Email and SMS \\u2192 Appointments and Sales \\u2192 Payments \\u2192 Follow-Up \\u2192 Retention \\u2192 Revenue Intelligence')}
  ${copyBlock('bk-suites', 'Vertical Suites', 'McKnight Event Growth \\u2014 Fill the room. Fund the experience. Grow the impact.\\nMcKnight Tax Growth \\u2014 Turn tax-season attention into year-round client growth.\\nMcKnight Credit Growth \\u2014 Build trust. Capture demand. Move qualified clients forward.\\nMcKnight Local Growth \\u2014 Proven growth systems for businesses that run locally and think bigger.')}
</section>

<!-- ══ LOGO ══ -->
<section id="brand-logo" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-shapes text-mk-cyan mr-2"></i>Logo & Lockup</h2>
  <div class="grid md:grid-cols-3 gap-4 mb-6">
    <div class="card p-6 text-center"><p class="text-xs text-gray-500 mb-3">On navy</p><div class="bg-[#0a1628] rounded-xl p-6 inline-block"><img src="${LOGO}" alt="McKnight GrowthOS logo" class="w-24 h-24 mx-auto"></div></div>
    <div class="card p-6 text-center"><p class="text-xs text-gray-500 mb-3">On white</p><div class="bg-white rounded-xl p-6 inline-block"><img src="${LOGO}" alt="McKnight GrowthOS logo" class="w-24 h-24 mx-auto"></div></div>
    <div class="card p-6 text-center"><p class="text-xs text-gray-500 mb-3">On gradient</p><div class="grad-bg rounded-xl p-6 inline-block"><img src="${LOGO}" alt="McKnight GrowthOS logo" class="w-24 h-24 mx-auto"></div></div>
  </div>
  <div class="grid md:grid-cols-2 gap-x-6">
    <div>
      ${copyBlock('bk-lockup', 'Primary Lockup', 'McKNIGHT\\nGrowthOS\\n\\n\\u2022 \\u201CMcKNIGHT\\u201D in navy or white\\n\\u2022 \\u201CGrowth\\u201D in white or navy\\n\\u2022 \\u201COS\\u201D in gold\\n\\u2022 Cyan data-flow / upward-path icon\\n\\u2022 Optional interconnected-node symbol')}
      ${copyBlock('bk-logohtml', 'HTML Logo', '<img\\n  src="/static/logo.svg"\\n  alt="McKnight GrowthOS logo"\\n/>')}
    </div>
    <div>
      ${copyBlock('bk-logoconcept', 'Logo Concept', 'A stylized M built from:\\n\\u2022 Three connected pipeline nodes\\n\\u2022 An upward conversion path\\n\\u2022 A subtle doorway or gateway\\n\\u2022 One gold endpoint representing revenue or completed conversion\\n\\nAvoid generic rockets, dollar signs and stock-chart arrows. The brand should feel like infrastructure\\u2014not hype.')}
      ${copyBlock('bk-logoalt', 'Alt Text (standard + OG)', 'McKnight GrowthOS logo\\n\\nOG: McKnight GrowthOS \\u2014 AI-Powered Conversion and Revenue Operations Platform')}
    </div>
  </div>
</section>

<!-- ══ COLORS ══ -->
<section id="brand-colors" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-palette text-mk-cyan mr-2"></i>Color System — McKnight Navy + Gold, Growth Cyan Accent</h2>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
    ${swatch('McKnight Navy', '#0a1628')}
    ${swatch('Deep Navy', '#050b16')}
    ${swatch('McKnight Gold', '#d4a72c')}
    ${swatch('Gold Light', '#f4ce65')}
    ${swatch('Growth Blue', '#2563eb')}
    ${swatch('Growth Cyan', '#0ea5e9')}
    ${swatch('Growth Indigo', '#4f46e5')}
    ${swatch('Soft White', '#f8fafc')}
    ${swatch('Muted Blue', '#dbeafe')}
    ${swatch('Success', '#10b981')}
    ${swatch('Warning', '#f59e0b')}
    ${swatch('Danger', '#ef4444')}
  </div>
  <div class="grid md:grid-cols-2 gap-x-6">
    <div>
      ${copyBlock('bk-cssvars', 'CSS Variables', ':root {\\n  --mcknight-navy: #0a1628;\\n  --mcknight-deep-navy: #050b16;\\n  --mcknight-gold: #d4a72c;\\n  --mcknight-gold-light: #f4ce65;\\n\\n  --growth-blue: #2563eb;\\n  --growth-cyan: #0ea5e9;\\n  --growth-indigo: #4f46e5;\\n\\n  --soft-white: #f8fafc;\\n  --muted-blue: #dbeafe;\\n  --dark-text: #0f172a;\\n  --muted-text: #64748b;\\n\\n  --success: #10b981;\\n  --warning: #f59e0b;\\n  --danger: #ef4444;\\n}')}
      ${copyBlock('bk-gradients', 'Gradient CSS', '/* Primary */\\nbackground: linear-gradient(\\n  135deg,\\n  #0a1628 0%,\\n  #1e3a8a 48%,\\n  #0ea5e9 100%\\n);\\n\\n/* Premium gold accent */\\nbackground: linear-gradient(\\n  135deg,\\n  #d4a72c 0%,\\n  #f4ce65 100%\\n);')}
    </div>
    <div>
      ${copyBlock('bk-twpalette', 'Tailwind Palette', 'colors: {\\n  mk: {\\n    navy: "#0a1628",\\n    deep: "#050b16",\\n    gold: "#d4a72c",\\n    goldLight: "#f4ce65",\\n    blue: "#2563eb",\\n    cyan: "#0ea5e9",\\n    indigo: "#4f46e5",\\n    soft: "#f8fafc",\\n    muted: "#dbeafe",\\n    success: "#10b981",\\n    warning: "#f59e0b",\\n    danger: "#ef4444",\\n    text: "#0f172a",\\n    mutedText: "#64748b",\\n  }\\n}')}
      ${copyBlock('bk-fonts', 'Font System', 'Headings: Space Grotesk or Poppins\\nBody: Inter\\nMono/Tech: Space Grotesk\\n\\n:root {\\n  --font-heading: "Space Grotesk", "Poppins", system-ui, sans-serif;\\n  --font-body: "Inter", system-ui, sans-serif;\\n  --font-mono: "Space Grotesk", ui-monospace, monospace;\\n}')}
    </div>
  </div>
</section>

<!-- ══ VOICE ══ -->
<section id="brand-voice" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-comment-dots text-mk-cyan mr-2"></i>Brand Voice</h2>
  <div class="grid md:grid-cols-2 gap-x-6">
    <div>
      ${copyBlock('bk-voicestyle', 'Voice Attributes', 'Authoritative \\u00B7 Strategic \\u00B7 Faith-grounded without becoming overly religious \\u00B7 Compliance-aware \\u00B7 Business-focused \\u00B7 Premium \\u00B7 Direct \\u00B7 Operational \\u00B7 Results-driven \\u00B7 Honest about what it can and cannot guarantee')}
      ${copyBlock('bk-voiceex', 'Voice Examples', 'A landing page is not a growth system.\\n\\nYour leads should not disappear between forms, inboxes and spreadsheets.\\n\\nBetter follow-up starts with better infrastructure.\\n\\nGrowth is not more noise. Growth is a connected conversion system.\\n\\nCapture the opportunity. Follow up with discipline. Measure what moves revenue.')}
    </div>
    <div>
      ${copyBlock('bk-hero1', 'Hero — Primary', 'Announcement bar:\\nMcKnight GrowthOS \\u2014 AI funnels, CRM, follow-up, compliance controls and conversion intelligence in one platform.\\n\\nHeadline:\\nTurn Attention Into Automated Growth\\n\\nSubheadline:\\nMcKnight GrowthOS connects conversion-focused funnels, lead management, email and SMS follow-up, SEO intelligence, social content and performance analytics\\u2014so businesses can capture more opportunities and move the right leads forward.\\n\\nPrimary CTA: Launch My Growth System\\nSecondary CTA: Explore the Platform\\n\\nTrust line: Built for agencies, consultants, professional services, events and local businesses.')}
      ${copyBlock('bk-hero2', 'Hero — Alternative', 'Headline:\\nOne Growth System. Every Lead Connected.\\n\\nSubheadline:\\nFrom the first click to the booked call, McKnight GrowthOS helps businesses launch campaigns, capture leads, automate follow-up and measure what creates revenue.')}
    </div>
  </div>
</section>

<!-- ══ PRICING NAMES ══ -->
<section id="brand-pricing" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-tags text-mk-cyan mr-2"></i>Pricing Tier Names</h2>
  ${copyBlock('bk-tiers', 'Tier Architecture', 'Sandbox \\u2014 A controlled environment for testing templates, forms and integrations (optional free tier)\\nLaunch \\u2014 Solo operators and first campaigns\\nGrowth \\u2014 Established businesses\\nScale \\u2014 Agencies and multi-location operators\\nEnterprise \\u2014 White-label and custom deployment')}
</section>

<!-- ══ COMPLIANCE ══ -->
<section id="brand-compliance" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-shield-halved text-mk-cyan mr-2"></i>Compliance Language Standards</h2>
  <div class="grid md:grid-cols-2 gap-x-6">
    <div>
      ${copyBlock('bk-complang', 'Approved Compliance Phrasing', 'Use:\\n\\u2022 Compliance-aware\\n\\u2022 Built with compliance controls\\n\\u2022 Includes configurable disclosure language\\n\\u2022 Designed to support compliant implementation\\n\\u2022 Requires professional review before deployment\\n\\u2022 Templates do not constitute legal advice\\n\\nAvoid:\\n\\u2022 \\u201CCompliant\\u201D as a blanket claim\\n\\u2022 \\u201CCompliance-engineered\\u201D\\n\\u2022 Any implication of guaranteed regulatory safety')}
    </div>
    <div>
      ${copyBlock('bk-disclaimer', 'Platform Disclaimer', 'McKnight GrowthOS provides marketing, workflow and decision-support technology. Templates, disclosures and compliance tools are provided for operational support and do not constitute legal, tax, financial or regulatory advice. Customers remain responsible for professional review, licensing, consent management, advertising approval and compliance with applicable laws.')}
    </div>
  </div>
</section>

<!-- ══ INFO ══ -->
<section id="brand-info" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-building text-mk-cyan mr-2"></i>Organization Info</h2>
  <div class="grid md:grid-cols-2 gap-x-6">
    <div>
      ${copyBlock('bk-bizinfo', 'Official Info', 'Platform: McKnight GrowthOS\\nParent: McKnight Opportunity Group\\nTechnology: Powered by RJ Business Solutions\\nSupport Email: support@rjbusinesssolutions.org\\nBusiness Address: 1342 NM 333, Tijeras, New Mexico 87059\\nLogo: /static/logo.svg\\nPrimary Colors: McKnight Navy + Gold, Growth Cyan accent')}
    </div>
    <div>
      ${copyBlock('bk-fleet', 'McKnight Ecosystem', 'McKnight Opportunity Group\\n\\u251C\\u2500\\u2500 The Contracting Preacher \\u2192 Contracting Preacher OS\\n\\u251C\\u2500\\u2500 McKnight Housing Initiative\\n\\u251C\\u2500\\u2500 McKnight Capital Ready \\u2192 Capital Ready OS\\n\\u251C\\u2500\\u2500 McKnight MortgageOS\\n\\u251C\\u2500\\u2500 McKnight GrowthOS  \\u2190 front-end acquisition engine\\n\\u251C\\u2500\\u2500 McKnight Freight Systems \\u2192 McKnight DriverHub\\n\\u251C\\u2500\\u2500 McKnight FleetWorks \\u2192 FleetWorks ServiceHub\\n\\u251C\\u2500\\u2500 McKnight Early Learning Academy\\n\\u2514\\u2500\\u2500 McKnight LearningOS\\n\\nGrowthOS owns: marketing, funnels, lead capture, follow-up, campaigns, conversion tracking, SEO, social content, white-label growth infrastructure.\\nOther platforms own service delivery.')}
    </div>
  </div>
</section>
`)
