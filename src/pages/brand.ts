import { shell, copyBlock } from './layout'

const LOGO = 'https://storage.googleapis.com/msgsndr/qQnxRHDtyx0uydPd5sRl/media/67eb83c5e519ed689430646b.jpeg'

const swatch = (name: string, hex: string, dark = false) => `
<div class="rounded-xl overflow-hidden border border-blue-900/50">
  <button class="w-full h-16 block" style="background:${hex}" data-copy-text="${hex}" title="Click to copy ${hex}"></button>
  <div class="p-2 bg-[#0b1226]">
    <p class="text-xs font-semibold text-white">${name}</p>
    <p class="text-[11px] font-mono text-gray-400">${hex}</p>
  </div>
</div>`

export const brandPage = () => shell('Brand Kit', 'brand', `
<section id="brand-hero" class="mb-10">
  <div class="flex flex-wrap items-center gap-6 mb-4">
    <img src="${LOGO}" alt="RJ Business Solutions logo" class="w-24 h-24 rounded-2xl object-cover border-2 border-blue-700 shadow-xl">
    <div>
      <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-2"><i class="fas fa-gem grad-text mr-2"></i>RJ Business Solutions — Master Brand Kit</h1>
      <p class="text-gray-400 max-w-3xl">Every brand asset, one-click copyable: logo embeds, the RJ Blue + White color system, fonts, bios, taglines, hero copy, SEO meta, OG tags, JSON-LD schema, footer, and email signatures. The single source of truth for every funnel, site, and deliverable.</p>
    </div>
  </div>
  <div class="flex flex-wrap gap-2 text-xs">
    ${['Direct','Premium','Technical','Trustworthy','Founder-led','Conversion-focused','AI-native','Compliance-aware','No-fluff','Confident'].map(k => `<span class="bg-blue-950 border border-blue-800 text-blue-300 px-3 py-1 rounded-full">${k}</span>`).join('')}
  </div>
</section>

<!-- ══ IDENTITY ══ -->
<section id="brand-identity" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-id-card text-rj-sky mr-2"></i>Core Identity & Positioning</h2>
  <div class="grid lg:grid-cols-2 gap-x-6">
    <div>
      ${copyBlock('bk-company', 'Company Name', 'RJ Business Solutions')}
      ${copyBlock('bk-founder', 'Founder / Operator', 'Rick Jefferson')}
      ${copyBlock('bk-tagline', 'Primary Tagline', 'AI-powered systems for businesses ready to scale.')}
      ${copyBlock('bk-shortpos', 'Short Positioning Line', 'AI-powered systems, automation, and growth infrastructure for businesses ready to scale.')}
    </div>
    <div>
      ${copyBlock('bk-corepos', 'Core Brand Positioning', 'RJ Business Solutions builds AI-powered business systems, automation infrastructure, credit technology, social media workflows, DM automation, lead follow-up systems, and conversion-focused digital platforms for service businesses, credit companies, fintech brands, and growth-focused operators.')}
      ${copyBlock('bk-salespos', 'Stronger Sales Positioning', 'RJ Business Solutions turns scattered operations into automated growth systems — from content and DMs to credit technology, client portals, payments, follow-up, and AI-powered business infrastructure.')}
    </div>
  </div>
</section>

<!-- ══ LOGO ══ -->
<section id="brand-logo" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-image text-rj-sky mr-2"></i>Logo Assets</h2>
  <div class="grid lg:grid-cols-3 gap-6 mb-6">
    <div class="card p-6 text-center">
      <p class="text-xs text-gray-500 mb-3">On dark</p>
      <div class="bg-[#0f172a] rounded-xl p-6 inline-block"><img src="${LOGO}" alt="RJ Business Solutions logo" class="w-24 h-24 rounded-xl object-cover mx-auto"></div>
    </div>
    <div class="card p-6 text-center">
      <p class="text-xs text-gray-500 mb-3">On white</p>
      <div class="bg-white rounded-xl p-6 inline-block"><img src="${LOGO}" alt="RJ Business Solutions logo" class="w-24 h-24 rounded-xl object-cover mx-auto"></div>
    </div>
    <div class="card p-6 text-center">
      <p class="text-xs text-gray-500 mb-3">On RJ gradient</p>
      <div class="grad-bg rounded-xl p-6 inline-block"><img src="${LOGO}" alt="RJ Business Solutions logo" class="w-24 h-24 rounded-xl object-cover mx-auto"></div>
    </div>
  </div>
  <div class="grid lg:grid-cols-2 gap-x-6">
    <div>
      ${copyBlock('bk-logourl', 'Primary Logo URL', LOGO)}
      ${copyBlock('bk-logomd', 'Markdown Logo', `![RJ Business Solutions](${LOGO})`)}
    </div>
    <div>
      ${copyBlock('bk-logohtml', 'HTML Logo', `<img\n  src="${LOGO}"\n  alt="RJ Business Solutions logo"\n/>`)}
      ${copyBlock('bk-logoalt', 'Alt Text (standard + OG)', 'RJ Business Solutions logo\n\nOG: RJ Business Solutions — AI-powered business automation and growth systems')}
    </div>
  </div>
</section>

<!-- ══ COLORS ══ -->
<section id="brand-colors" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-palette text-rj-sky mr-2"></i>RJ Blue + White Color System <span class="text-xs text-gray-500 font-normal ml-2">(click any swatch to copy hex)</span></h2>
  <div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 mb-6">
    ${swatch('RJ Blue', '#2563eb')}
    ${swatch('Sky Blue', '#0ea5e9')}
    ${swatch('Deep Blue', '#1e3a8a')}
    ${swatch('Navy', '#0f172a')}
    ${swatch('White', '#ffffff')}
    ${swatch('Soft White', '#f8fafc')}
    ${swatch('Light Blue', '#eff6ff')}
    ${swatch('Border Blue', '#bfdbfe')}
    ${swatch('Muted Blue', '#dbeafe')}
    ${swatch('Success', '#10b981')}
    ${swatch('Warning', '#f59e0b')}
    ${swatch('Danger', '#ef4444')}
    ${swatch('Dark Text', '#0f172a')}
    ${swatch('Muted Text', '#475569')}
  </div>
  <div class="grid md:grid-cols-3 gap-4 mb-6">
    <div class="rounded-2xl h-20 flex items-center justify-center text-white font-bold text-sm" style="background:linear-gradient(135deg,#2563eb 0%,#0ea5e9 100%)">Primary Gradient</div>
    <div class="rounded-2xl h-20 flex items-center justify-center text-white font-bold text-sm" style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 55%,#2563eb 100%)">Premium Dark Gradient</div>
    <div class="rounded-2xl h-20 flex items-center justify-center text-slate-800 font-bold text-sm border border-blue-200" style="background:linear-gradient(180deg,#ffffff 0%,#eff6ff 100%)">Light Section Background</div>
  </div>
  <div class="grid lg:grid-cols-2 gap-x-6">
    <div>
      ${copyBlock('bk-cssvars', 'CSS Variables', `:root {\n  --rj-blue: #2563eb;\n  --rj-sky-blue: #0ea5e9;\n  --rj-deep-blue: #1e3a8a;\n  --rj-navy: #0f172a;\n  --rj-white: #ffffff;\n  --rj-soft-white: #f8fafc;\n  --rj-light-blue: #eff6ff;\n  --rj-border-blue: #bfdbfe;\n  --rj-muted-blue: #dbeafe;\n  --rj-success: #10b981;\n  --rj-warning: #f59e0b;\n  --rj-danger: #ef4444;\n  --rj-dark-text: #0f172a;\n  --rj-muted-text: #475569;\n}`)}
      ${copyBlock('bk-gradients', 'Gradient CSS', `/* Primary */\nbackground: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);\n\n/* Premium Dark */\nbackground: linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #2563eb 100%);\n\n/* Light Section */\nbackground: linear-gradient(180deg, #ffffff 0%, #eff6ff 100%);`)}
    </div>
    <div>
      ${copyBlock('bk-twpalette', 'Tailwind Palette', `colors: {\n  rj: {\n    blue: "#2563eb",\n    sky: "#0ea5e9",\n    deep: "#1e3a8a",\n    navy: "#0f172a",\n    white: "#ffffff",\n    soft: "#f8fafc",\n    light: "#eff6ff",\n    border: "#bfdbfe",\n    muted: "#dbeafe",\n    success: "#10b981",\n    warning: "#f59e0b",\n    danger: "#ef4444",\n    text: "#0f172a",\n    mutedText: "#475569",\n  }\n}`)}
      ${copyBlock('bk-fonts', 'Font System', `Headings: Space Grotesk or Poppins\nBody: Inter\nMono/Tech: Space Grotesk\n\n:root {\n  --font-heading: "Space Grotesk", "Poppins", system-ui, sans-serif;\n  --font-body: "Inter", system-ui, sans-serif;\n  --font-mono: "Space Grotesk", ui-monospace, monospace;\n}`)}
    </div>
  </div>
</section>

<!-- ══ BUSINESS INFO ══ -->
<section id="brand-info" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-building text-rj-sky mr-2"></i>Official Business Info & Social Links</h2>
  <div class="grid lg:grid-cols-2 gap-x-6">
    <div>
      ${copyBlock('bk-bizinfo', 'Official Business Info', 'Company: RJ Business Solutions\nFounder: Rick Jefferson\nWebsite: https://rjbusinesssolutions.org\nSupport Email: support@rjbusinesssolutions.org\nBusiness Address: 1342 NM 333, Tijeras, New Mexico 87059\nLogo: ' + LOGO + '\nPrimary Colors: Blue + White')}
    </div>
    <div>
      ${copyBlock('bk-social', 'Social / Public Links', 'LinkedIn: https://www.linkedin.com/in/rick-jefferson-314998235\nTikTok: https://www.tiktok.com/@rick_jeff_solution\nTwitter/X: https://twitter.com/ricksolutions1\nRick Jefferson Solutions: https://rickjeffersonsolutions.com\nRJ Business Solutions: https://rjbusinesssolutions.org')}
    </div>
  </div>
</section>

<!-- ══ RICK PROFILE ══ -->
<section id="brand-rick" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-user-tie text-rj-sky mr-2"></i>Rick Jefferson — Master Profile</h2>
  <div class="grid lg:grid-cols-2 gap-x-6">
    <div>
      ${copyBlock('bk-headline', 'LinkedIn Headline', 'Credit Technology Architect | Building AI-Powered Credit Repair Systems, APIs & Automation for FinTech | CEO @ RJ Business Solutions')}
      ${copyBlock('bk-roles', 'Current Public Roles', 'CEO — Rick Jefferson Solutions\nCTO / Credit Technology Architect — RJ Business Solutions\nPartner & Credit Systems Architect — MyFreeScoreNow.com')}
      ${copyBlock('bk-bioshort', 'Short Bio', 'Rick Jefferson is a credit technology architect, AI systems builder, and business automation strategist. As the founder of Rick Jefferson Solutions and operator behind RJ Business Solutions, he builds AI-powered platforms, credit repair systems, automation workflows, client portals, payment infrastructure, and growth engines for credit, fintech, and service-based businesses.')}
    </div>
    <div>
      ${copyBlock('bk-biomed', 'Medium Bio', 'Rick Jefferson is a credit technology architect, AI and fintech systems builder, and business automation strategist. He operates at the intersection of credit expertise, enterprise software, and practical growth execution.\n\nThrough RJ Business Solutions, Rick builds AI-powered business systems, automation infrastructure, credit repair platforms, APIs, client portals, payment workflows, and conversion-focused digital systems for companies that need to scale securely and efficiently.\n\nHis public LinkedIn profile positions him as a builder of AI-powered credit repair systems, credit monitoring APIs, conversational AI credit agents, payment infrastructure, white-label fintech platforms, and compliance-focused automation systems.')}
      ${copyBlock('bk-biolong', 'Long Bio', 'Rick Jefferson is a credit technology architect, AI systems builder, and business automation strategist focused on helping credit, fintech, and service-based businesses scale with secure, automated infrastructure.\n\nAs the founder of Rick Jefferson Solutions and a lead operator at RJ Business Solutions, Rick builds the systems behind modern growth: AI-powered credit repair platforms, credit monitoring APIs, automated client communication, payment and subscription infrastructure, client portals, social media automation, DM follow-up systems, CRM workflows, and white-label fintech platforms.\n\nRick\u2019s public profile highlights deep experience across credit repair, financial literacy, FCRA/FDCPA-informed workflows, fintech automation, AI agent systems, and enterprise software development. His work centers on replacing manual bottlenecks with scalable systems that help businesses capture leads, serve clients, process data, track performance, and grow with stronger operational control.\n\nRJ Business Solutions represents that execution layer — where strategy becomes systems, systems become revenue, and businesses gain the automation backbone needed to operate at scale.')}
    </div>
  </div>
</section>

<!-- ══ VOICE & TAGLINES ══ -->
<section id="brand-voice" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-microphone-lines text-rj-sky mr-2"></i>Brand Voice, Taglines & One-Liners</h2>
  <div class="grid lg:grid-cols-2 gap-x-6">
    <div>
      ${copyBlock('bk-voicestyle', 'Voice Style', 'Straight-shooting, builder-brained, premium but practical. Clear enough for business owners, technical enough for serious operators. No hype without infrastructure. No vague promises. Every offer should feel like a system, not a slogan.')}
      ${copyBlock('bk-toneex', 'Tone Examples', 'We do not sell templates. We build systems.\n\nYour leads should not disappear in DMs.\n\nAutomation only works when the strategy is clean.\n\nGrowth is not more noise. Growth is better infrastructure.\n\nIf your business depends on follow-up, your follow-up cannot depend on memory.')}
    </div>
    <div>
      ${copyBlock('bk-taglines', 'Funnel Taglines', 'We turn business chaos into automated growth systems.\n\nBuilt systems. Better follow-up. More booked calls.\n\nAutomation, credit technology, and growth infrastructure — built to convert.\n\nFrom scattered leads to scalable systems.\n\nWhere AI automation meets real business execution.\n\nCredit/FinTech: AI-powered credit and fintech infrastructure built for scale, security, and compliance.\n\nSocial Growth: We turn your social media, DMs, and follow-up into a booked-call engine.')}
      ${copyBlock('bk-oneliners', 'Brand One-Liners', 'RJ Business Solutions builds the systems behind scalable businesses.\n\nRick Jefferson builds AI-powered infrastructure for credit, fintech, and service businesses.\n\nWe turn manual follow-up into automated revenue systems.\n\nWe build the backend of growth — funnels, automation, AI, payments, portals, and pipelines.\n\nYour business does not need more tools. It needs a connected system.')}
    </div>
  </div>
</section>

<!-- ══ SERVICES ══ -->
<section id="brand-services" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-layer-group text-rj-sky mr-2"></i>Core Services & Descriptions</h2>
  <div class="grid lg:grid-cols-2 gap-x-6">
    <div>
      ${copyBlock('bk-svclist', '15 Service Categories', '1. AI Business Automation\n2. Done-For-You Social Media + DM Management\n3. Lead Follow-Up Systems\n4. CRM + Pipeline Automation\n5. Credit Repair Technology Platforms\n6. Credit Monitoring / Scoring API Infrastructure\n7. Conversational AI Agents\n8. Client Portals + Dashboards\n9. Payment + Subscription Systems\n10. White-Label SaaS / FinTech Platforms\n11. Compliance-Aware Workflow Design\n12. Funnel + Landing Page Systems\n13. Business Process Automation\n14. Agency Infrastructure\n15. Reporting + Analytics Dashboards')}
      ${copyBlock('bk-svcai', 'AI Business Automation', 'We build AI-powered workflows that reduce manual work, route leads, automate communication, organize operations, and give business owners more control over the systems that drive revenue.')}
      ${copyBlock('bk-svcsocial', 'Done-For-You Social Growth', 'We manage content, comments, DMs, lead qualification, follow-up, booking reminders, and CRM sync with human-backed AI systems trained around your brand voice and offers.')}
    </div>
    <div>
      ${copyBlock('bk-svccredit', 'Credit Technology Systems', 'We build credit-focused platforms, dashboards, automation workflows, dispute support systems, client communication flows, payment infrastructure, and secure data pipelines for credit and fintech operators.')}
      ${copyBlock('bk-svcagents', 'Conversational AI Agents', 'We design AI agents that can educate, qualify, route, follow up, and support customers while following brand rules, escalation logic, and compliance guardrails.')}
      ${copyBlock('bk-svcfunnels', 'Funnel + Conversion Systems', 'We build conversion-focused landing pages, checkout flows, lead magnets, booking funnels, analytics tracking, and automated follow-up systems that turn attention into pipeline.')}
    </div>
  </div>
</section>

<!-- ══ CONVERSION COPY ══ -->
<section id="brand-copy" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-magnet text-rj-sky mr-2"></i>Conversion Copy Blocks & Offers</h2>
  <div class="grid lg:grid-cols-2 gap-x-6">
    <div>
      ${copyBlock('bk-hero1', 'Main Hero Option 1', 'Headline:\nWe Turn Business Chaos Into Automated Growth Systems\n\nSubheadline:\nRJ Business Solutions builds AI-powered workflows, funnels, client portals, CRM automations, and follow-up systems that help businesses capture leads, book calls, serve clients, and scale with control.\n\nCTA:\nBuild My Growth System\n\nSecondary CTA:\nBook a Strategy Call')}
      ${copyBlock('bk-hero2', 'Main Hero Option 2', 'Headline:\nAI Systems That Turn Leads Into Revenue\n\nSubheadline:\nFrom DMs and follow-up to credit technology and client portals, RJ Business Solutions builds the automation backbone your business needs to grow faster and operate cleaner.\n\nCTA:\nStart My System\n\nSecondary CTA:\nSee What We Build')}
      ${copyBlock('bk-hero3', 'Main Hero Option 3 — Social/Agency', 'Headline:\nWe Turn Your Social Media Into Booked Calls\n\nSubheadline:\nRJ Business Solutions manages your content, comments, DMs, lead follow-up, and booking pipeline with human-backed AI systems built to sound like your brand.\n\nCTA:\nStart My 7-Day Launch\n\nSecondary CTA:\nBook a Free Growth Call')}
    </div>
    <div>
      ${copyBlock('bk-offer', 'Offer Block — DFY Social Growth', 'Done-For-You Social Growth System\n\nLaunch Setup:\n$1,997 one-time\n\nMonthly Management:\n$997/mo\n\nIncludes:\n- Social media content system\n- Caption and post planning\n- AI-powered DM replies\n- Comment response rules\n- Lead qualification\n- Booking link integration\n- CRM pipeline sync\n- Follow-up messages\n- No-show recovery\n- Human escalation rules\n- Monthly reporting\n- Compliance guardrails')}
      ${copyBlock('bk-ctas', 'CTA Copy Bank', 'Start My 7-Day Launch\n\nBook a Free Growth Call\n\nGet My Growth System Built\n\nTurn My DMs Into Booked Calls')}
      ${copyBlock('bk-trust', 'Trust / Compliance Copy', 'RJ Business Solutions builds systems with security, privacy, and operational control in mind. We do not ask clients to submit passwords, 2FA codes, recovery phrases, or private credentials through public forms. Access should be granted through delegated user roles, official platform permissions, or secure password-manager sharing where appropriate.\n\nSecure Access: Your accounts stay yours. RJ Business Solutions uses delegated access, role-based permissions, and secure onboarding practices so your business can scale without handing over unnecessary control.')}
    </div>
  </div>
</section>

<!-- ══ ABOUT SECTIONS ══ -->
<section id="brand-about" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-circle-info text-rj-sky mr-2"></i>About Sections</h2>
  <div class="grid lg:grid-cols-2 gap-x-6">
    <div>
      ${copyBlock('bk-aboutco', 'About RJ Business Solutions', 'RJ Business Solutions builds AI-powered systems, automation workflows, and growth infrastructure for businesses ready to scale.\n\nFounded by Rick Jefferson, RJ Business Solutions helps companies replace scattered manual work with clean, conversion-focused systems — from social media and DM automation to credit technology platforms, client portals, CRM workflows, payment infrastructure, and AI-powered business operations.\n\nWe do not just create pages or tools. We build connected systems designed to capture leads, automate follow-up, organize pipelines, support clients, and create measurable business growth.')}
    </div>
    <div>
      ${copyBlock('bk-aboutrick', 'About Rick Jefferson', 'Rick Jefferson is a credit technology architect, AI systems builder, and business automation strategist. His work sits at the intersection of credit expertise, fintech infrastructure, enterprise software, and real-world business growth.\n\nThrough RJ Business Solutions, Rick builds AI-powered platforms, automation workflows, credit repair systems, CRM pipelines, client portals, payment infrastructure, and digital growth systems for companies that need more than templates — they need execution-ready infrastructure.\n\nRick\u2019s public profile highlights experience building AI-powered credit repair platforms, credit monitoring systems, conversational AI agents, white-label fintech products, and compliance-aware business systems.')}
    </div>
  </div>
</section>

<!-- ══ SOCIAL BIOS ══ -->
<section id="brand-bios" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-hashtag text-rj-sky mr-2"></i>Social Bios & Email Signatures</h2>
  <div class="grid lg:grid-cols-2 gap-x-6">
    <div>
      ${copyBlock('bk-liabout', 'LinkedIn About (Short)', 'Founder and credit technology architect at RJ Business Solutions. I build AI-powered systems, automation infrastructure, credit technology platforms, funnels, client portals, CRM workflows, and growth engines for businesses ready to scale.')}
      ${copyBlock('bk-lihead', 'LinkedIn Headline Option', 'Credit Technology Architect | AI Automation & FinTech Systems | Founder @ RJ Business Solutions')}
      ${copyBlock('bk-tiktok', 'TikTok Bio', 'AI systems + automation for business growth.\nCredit tech. Funnels. DMs. Follow-up.\nFounder: RJ Business Solutions')}
      ${copyBlock('bk-twitter', 'Twitter/X Bio', 'Building AI-powered business systems, credit tech, automation, funnels, and growth infrastructure. Founder @ RJ Business Solutions.')}
      ${copyBlock('bk-ig', 'Instagram Bio', 'RJ Business Solutions\nAI Systems • Automation • Growth Infrastructure\nDMs → Follow-Up → Booked Calls\nFounder: Rick Jefferson')}
    </div>
    <div>
      ${copyBlock('bk-sigfull', 'Full Email Signature', 'Rick Jefferson\nFounder / Credit Technology Architect\nRJ Business Solutions\n\nAI-powered systems, automation, and growth infrastructure.\n\nWebsite: https://rjbusinesssolutions.org\nEmail: support@rjbusinesssolutions.org\nLinkedIn: https://www.linkedin.com/in/rick-jefferson-314998235\n\nRJ Business Solutions\n1342 NM 333\nTijeras, New Mexico 87059')}
      ${copyBlock('bk-sigshort', 'Short Email Signature', 'Rick Jefferson\nRJ Business Solutions\nAI Systems • Automation • Credit Technology • Growth Infrastructure\nhttps://rjbusinesssolutions.org')}
      ${copyBlock('bk-footer', 'Website Footer Block', 'RJ Business Solutions\nAI-powered systems, automation, and growth infrastructure for businesses ready to scale.\n\n1342 NM 333\nTijeras, New Mexico 87059\n\nWebsite: https://rjbusinesssolutions.org\nEmail: support@rjbusinesssolutions.org\n\n© 2026 RJ Business Solutions. All rights reserved.\n\nPrivacy Policy | Terms of Service | Refund Policy | Accessibility')}
    </div>
  </div>
</section>

<!-- ══ SEO / SCHEMA ══ -->
<section id="brand-seo" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-magnifying-glass-chart text-rj-sky mr-2"></i>SEO Meta, Open Graph & JSON-LD Schema</h2>
  <div class="grid lg:grid-cols-2 gap-x-6">
    <div>
      ${copyBlock('bk-seometa', 'SEO Meta Pack', 'Homepage Title:\nRJ Business Solutions | AI Automation, Credit Tech & Growth Systems\n\nHomepage Meta Description:\nRJ Business Solutions builds AI-powered automation, credit technology, funnels, client portals, CRM workflows, and growth systems for businesses ready to scale.\n\nSocial Growth Page Title:\nDone-For-You Social Media, DMs & Follow-Up | RJ Business Solutions\n\nSocial Growth Meta Description:\nRJ Business Solutions manages your social media, DMs, lead follow-up, and booking pipeline with human-backed AI systems built to convert conversations into calls.\n\nCredit Technology Page Title:\nAI-Powered Credit Technology Systems | RJ Business Solutions\n\nCredit Technology Meta Description:\nBuild credit repair platforms, monitoring APIs, client portals, automation workflows, and compliant fintech infrastructure with RJ Business Solutions.')}
      ${copyBlock('bk-og', 'Open Graph / Twitter Tags', '<meta property="og:type" content="website" />\n<meta property="og:site_name" content="RJ Business Solutions" />\n<meta property="og:title" content="RJ Business Solutions | AI Automation, Credit Tech & Growth Systems" />\n<meta property="og:description" content="AI-powered automation, credit technology, funnels, client portals, CRM workflows, and growth systems for businesses ready to scale." />\n<meta property="og:url" content="https://rjbusinesssolutions.org" />\n<meta property="og:image" content="' + LOGO + '" />\n\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:title" content="RJ Business Solutions | AI Automation, Credit Tech & Growth Systems" />\n<meta name="twitter:description" content="AI-powered automation, credit technology, funnels, client portals, CRM workflows, and growth systems for businesses ready to scale." />\n<meta name="twitter:image" content="' + LOGO + '" />')}
    </div>
    <div>
      ${copyBlock('bk-orgschema', 'JSON-LD Organization Schema', '{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "RJ Business Solutions",\n  "legalName": "RJ Business Solutions",\n  "url": "https://rjbusinesssolutions.org",\n  "logo": "' + LOGO + '",\n  "email": "support@rjbusinesssolutions.org",\n  "founder": {\n    "@type": "Person",\n    "name": "Rick Jefferson",\n    "url": "https://www.linkedin.com/in/rick-jefferson-314998235"\n  },\n  "address": {\n    "@type": "PostalAddress",\n    "streetAddress": "1342 NM 333",\n    "addressLocality": "Tijeras",\n    "addressRegion": "NM",\n    "postalCode": "87059",\n    "addressCountry": "US"\n  },\n  "sameAs": [\n    "https://www.linkedin.com/in/rick-jefferson-314998235",\n    "https://www.tiktok.com/@rick_jeff_solution",\n    "https://twitter.com/ricksolutions1"\n  ],\n  "contactPoint": {\n    "@type": "ContactPoint",\n    "contactType": "Customer Support",\n    "email": "support@rjbusinesssolutions.org"\n  }\n}')}
      ${copyBlock('bk-personschema', 'JSON-LD Person Schema — Rick Jefferson', '{\n  "@context": "https://schema.org",\n  "@type": "Person",\n  "name": "Rick Jefferson",\n  "jobTitle": "Credit Technology Architect and AI Systems Builder",\n  "worksFor": {\n    "@type": "Organization",\n    "name": "RJ Business Solutions",\n    "url": "https://rjbusinesssolutions.org"\n  },\n  "url": "https://www.linkedin.com/in/rick-jefferson-314998235",\n  "sameAs": [\n    "https://www.linkedin.com/in/rick-jefferson-314998235",\n    "https://twitter.com/ricksolutions1",\n    "https://www.tiktok.com/@rick_jeff_solution"\n  ],\n  "knowsAbout": [\n    "AI automation",\n    "credit technology",\n    "fintech systems",\n    "credit repair platforms",\n    "CRM automation",\n    "client portals",\n    "business process automation",\n    "lead follow-up systems",\n    "payment infrastructure",\n    "white-label SaaS"\n  ]\n}')}
      ${copyBlock('bk-nav', 'Website Navigation Structure', 'Home\nServices\n  AI Automation\n  Credit Technology\n  Done-For-You Social Growth\n  Funnels & CRM\nAbout Rick\nCase Studies\nPricing\nBook Call\nLogin\n\nFooter Pages:\nPrivacy Policy\nTerms of Service\nRefund Policy\nAccessibility\nContact\nSupport')}
    </div>
  </div>
</section>

<!-- ══ MASTER BLOCK ══ -->
<section id="brand-master" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-6"><i class="fas fa-box text-rj-sky mr-2"></i>Copy-Paste Master Block</h2>
  ${copyBlock('bk-master', 'Everything In One Block', 'RJ Business Solutions\n\nFounder:\nRick Jefferson\n\nWebsite:\nhttps://rjbusinesssolutions.org\n\nEmail:\nsupport@rjbusinesssolutions.org\n\nAddress:\n1342 NM 333, Tijeras, New Mexico 87059\n\nLogo:\n' + LOGO + '\n\nLinkedIn:\nhttps://www.linkedin.com/in/rick-jefferson-314998235\n\nTikTok:\nhttps://www.tiktok.com/@rick_jeff_solution\n\nTwitter/X:\nhttps://twitter.com/ricksolutions1\n\nBrand Colors:\nRJ Blue: #2563eb\nSky Blue: #0ea5e9\nDeep Blue: #1e3a8a\nWhite: #ffffff\nSoft White: #f8fafc\nLight Blue: #eff6ff\nDark Text: #0f172a\n\nPrimary Tagline:\nAI-powered systems for businesses ready to scale.\n\nPositioning:\nRJ Business Solutions builds AI-powered automation, credit technology, funnels, CRM workflows, client portals, payment systems, and growth infrastructure for businesses ready to scale.\n\nFounder Bio:\nRick Jefferson is a credit technology architect, AI systems builder, and business automation strategist focused on helping credit, fintech, and service-based businesses scale through secure, automated infrastructure.\n\nCore Services:\nAI business automation\nCredit technology systems\nDone-for-you social media and DM management\nCRM and lead follow-up automation\nClient portals and dashboards\nPayment and subscription infrastructure\nWhite-label SaaS and fintech platforms\nFunnel and conversion systems\nCompliance-aware workflow design')}
</section>
`)
