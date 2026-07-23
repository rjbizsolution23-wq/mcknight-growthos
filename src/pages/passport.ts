// ── McKnight Business Readiness Passport + Evidence Vault + Governance ──
import { shell, copyBlock } from './layout'

const PASSPORT_FIELDS: [string, string][] = [
  ['fa-id-card', 'Legal name and DBA'],
  ['fa-hashtag', 'EIN, UEI and CAGE'],
  ['fa-flag-usa', 'SAM.gov status and renewal date'],
  ['fa-award', 'Grants.gov roles'],
  ['fa-landmark', 'SC vendor registration'],
  ['fa-barcode', 'NAICS, PSC, NIGP and UNSPSC codes'],
  ['fa-certificate', 'Ownership and certification eligibility'],
  ['fa-file-shield', 'Licenses, insurance and bonding'],
  ['fa-map-location-dot', 'Services, prices, capacity and geography'],
  ['fa-chart-line', 'Revenue and financial statements'],
  ['fa-clock-rotate-left', 'Past-performance projects'],
  ['fa-comments', 'References and testimonials'],
  ['fa-user-tie', 'Resumes and key personnel'],
  ['fa-sack-dollar', 'Funding request and use of funds'],
  ['fa-calendar-xmark', 'Documents with expiration dates'],
]

const VAULT_DOCS = ['Formation documents', 'W-9', 'IRS letters', 'Licenses', 'Insurance certificates', 'Bank letters', 'Tax returns', 'Financial statements', 'Contracts and purchase orders', 'Invoices and completion records', 'Client references', 'Staff resumes', 'Certifications', 'Policies and procedures', 'Photos and project evidence', 'Grant and proposal history', 'Signed attestations']

const VAULT_META: [string, string][] = [
  ['fa-user', 'Owner'],
  ['fa-code-branch', 'Version'],
  ['fa-calendar-check', 'Effective date'],
  ['fa-calendar-xmark', 'Expiration date'],
  ['fa-lock', 'Confidentiality level'],
  ['fa-badge-check', 'Verification status'],
  ['fa-robot', 'Where AI may use it'],
]

const AI_CAN = ['Find opportunities', 'Extract requirements', 'Score eligibility', 'Draft narratives', 'Populate approved information', 'Build compliance matrices', 'Produce checklists', 'Send deadline reminders']
const AI_CANNOT = ['Certify eligibility', 'Sign legal representations', 'Submit banking information', 'Accept contract terms', 'Set final pricing', 'Guarantee results', 'Sign grant assurances', 'Agree to personal guarantees', 'Submit sensitive filings without authorization']
const ROLES: [string, string][] = [
  ['fa-binoculars', 'Opportunity reviewer'],
  ['fa-diagram-project', 'Proposal manager'],
  ['fa-calculator', 'Financial reviewer'],
  ['fa-scale-balanced', 'Legal/compliance reviewer'],
  ['fa-pen-fancy', 'Authorized signer'],
  ['fa-paper-plane', 'Final submission owner'],
]

const INTAKE = ['Full legal name and approved public biography', 'Exact legal entities currently active', 'EINs and formation documents', 'Existing domains and social accounts', 'Existing logos, photos and videos', 'Current licenses and certifications', 'SAM, UEI, CAGE and SC vendor status', 'Housing nonprofit/IRS status', 'Trucking authority and fleet status', 'Daycare license, capacity and ABC Quality status', 'Credit-services contracts and disclosures', 'Current software and payment systems', 'Staff and partner list', 'Existing customers and past performance', 'Revenue, budget and launch priorities', 'Documents that may be publicly displayed', 'Authorized signer for each entity', 'Desired launch date for the first platform']

export const passportPage = () => shell('Business Readiness Passport + Evidence Vault', 'passport', `
<section id="pp-hero" class="mb-10">
  <p class="inline-block gold-bg text-black text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider"><i class="fas fa-passport mr-1"></i> The First Real Build</p>
  <h1 class="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">Business Readiness Passport<br><span class="grad-text">+ Evidence Vault</span></h1>
  <p class="text-gray-400 max-w-3xl text-lg">Not another landing page. The trusted data engine powering every contract, grant, funding application, website and operating company in the <a href="/ecosystem" class="text-mk-cyan underline">McKnight ecosystem</a>. Collect once — verify — reuse everywhere.</p>
  <div class="mt-6 grid md:grid-cols-3 gap-4 max-w-3xl">
    <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4 text-center"><p class="text-2xl font-extrabold text-mk-gold">15</p><p class="text-xs text-gray-400">Passport data groups</p></div>
    <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4 text-center"><p class="text-2xl font-extrabold text-mk-gold">17</p><p class="text-xs text-gray-400">Vault document types</p></div>
    <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4 text-center"><p class="text-2xl font-extrabold text-mk-gold">6</p><p class="text-xs text-gray-400">Human approval roles</p></div>
  </div>
</section>

<section id="pp-passport" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-1"><i class="fas fa-id-card text-mk-gold mr-2"></i>Master Verified-Business Intake</h2>
  <p class="text-gray-500 text-sm mb-5">One Business Readiness Passport per entity — the single source of truth behind every registration and application.</p>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">${PASSPORT_FIELDS.map(([ic, f]) => `<div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4 flex items-center gap-3"><i class="fas ${ic} text-mk-cyan w-5 text-center"></i><p class="text-sm text-gray-200">${f}</p></div>`).join('')}</div>
  <div class="mt-4 bg-blue-900/15 border border-blue-700/30 rounded-xl p-4 text-sm text-blue-200/90">
    <p class="mb-1"><i class="fas fa-flag-usa mr-2"></i><strong>Why verified matters:</strong> SAM.gov's official checklist requires verified identity, taxpayer, banking, ownership and entity information for an All Awards registration. <a href="https://sam.gov/sites/default/files/2024-11/entity-checklist.pdf" target="_blank" rel="noopener" class="text-mk-cyan underline">SAM.gov checklist</a></p>
    <p><i class="fas fa-award mr-2"></i>Grants.gov organizational applicants must first complete SAM registration and assign authorized organizational roles. <a href="https://www.grants.gov/applicants/applicant-registration" target="_blank" rel="noopener" class="text-mk-cyan underline">Grants.gov registration</a></p>
  </div>
</section>

<section id="pp-vault" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-1"><i class="fas fa-vault text-mk-gold mr-2"></i>Evidence Vault</h2>
  <p class="text-gray-500 text-sm mb-5"><strong class="text-white">Every claim needs a receipt.</strong> A controlled document room — this is what prevents AI from inventing credentials or recycling expired information.</p>
  <div class="grid lg:grid-cols-3 gap-5">
    <div class="lg:col-span-2 bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-6">
      <p class="text-sm font-semibold text-white mb-3"><i class="fas fa-folder-open text-mk-cyan mr-2"></i>Document types</p>
      <div class="grid md:grid-cols-2 gap-x-6 gap-y-1.5">${VAULT_DOCS.map((d) => `<p class="text-sm text-gray-300"><i class="far fa-file-lines text-gray-600 mr-2"></i>${d}</p>`).join('')}</div>
    </div>
    <div class="bg-[#0d1b30] border border-mk-gold/30 rounded-2xl p-6">
      <p class="text-sm font-semibold text-white mb-3"><i class="fas fa-tags text-mk-gold mr-2"></i>Required metadata per item</p>
      <ul class="space-y-2.5">${VAULT_META.map(([ic, m]) => `<li class="text-sm text-gray-300 flex items-center gap-2.5"><i class="fas ${ic} text-mk-gold w-4 text-center text-xs"></i>${m}</li>`).join('')}</ul>
    </div>
  </div>
</section>

<section id="pp-governance" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-1"><i class="fas fa-user-check text-mk-gold mr-2"></i>Human Approval & Signature System</h2>
  <p class="text-gray-500 text-sm mb-5">AI accelerates the work. Humans own the signatures, the pricing and the submissions.</p>
  <div class="grid md:grid-cols-2 gap-5 mb-5">
    <div class="bg-[#0d1b30] border border-green-700/30 rounded-2xl p-6">
      <p class="text-sm font-bold text-green-400 mb-3"><i class="fas fa-check-circle mr-2"></i>THE AI CAN</p>
      <ul class="space-y-2">${AI_CAN.map((i) => `<li class="text-sm text-gray-300"><i class="fas fa-check text-green-500 mr-2"></i>${i}</li>`).join('')}</ul>
    </div>
    <div class="bg-[#0d1b30] border border-red-700/30 rounded-2xl p-6">
      <p class="text-sm font-bold text-red-400 mb-3"><i class="fas fa-ban mr-2"></i>THE AI SHOULD NOT INDEPENDENTLY</p>
      <ul class="space-y-2">${AI_CANNOT.map((i) => `<li class="text-sm text-gray-300"><i class="fas fa-xmark text-red-500 mr-2"></i>${i}</li>`).join('')}</ul>
    </div>
  </div>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-6">
    <p class="text-sm font-semibold text-white mb-3"><i class="fas fa-users text-mk-cyan mr-2"></i>Required roles (assign per entity)</p>
    <div class="grid md:grid-cols-3 gap-3">${ROLES.map(([ic, r]) => `<div class="flex items-center gap-3 bg-[#101f38] rounded-xl p-3"><span class="w-9 h-9 rounded-lg gold-bg text-black flex items-center justify-center"><i class="fas ${ic} text-sm"></i></span><p class="text-sm text-white font-medium">${r}</p></div>`).join('')}</div>
  </div>
</section>

<section id="pp-intake" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-1"><i class="fas fa-clipboard-list text-mk-gold mr-2"></i>What We Need From Dr. McKnight Now</h2>
  <p class="text-gray-500 text-sm mb-5">The master intake package — 18 items that unlock the entire build sequence.</p>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-6">
    <ol class="grid md:grid-cols-2 gap-x-8 gap-y-2.5">${INTAKE.map((i, n) => `<li class="flex items-start gap-3 text-sm text-gray-300"><span class="w-6 h-6 rounded-full bg-gray-800 text-mk-goldLight flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">${n + 1}</span>${i}</li>`).join('')}</ol>
  </div>
  ${copyBlock('pp-intake-request', 'Intake request email (send to Dr. McKnight)', `Subject: McKnight ecosystem — master intake package (18 items)

Dr. McKnight,

To power every registration, grant, proposal and funding application across the portfolio, we build ONE verified data engine first: the Business Readiness Passport + Evidence Vault. To start it, we need the master intake package:

${INTAKE.map((i, n) => `${n + 1}. ${i}`).join('\n')}

Every document goes into a controlled Evidence Vault with owner, version, effective/expiration dates, confidentiality level, verification status and AI-usage permission. Nothing is published or submitted without your designated authorized signer's approval.

Once received, execution follows the recommended order: governance → brand system → shared CRM/identity/evidence vault → The Contracting Preacher rebuild → the rest of the fleet.

— McKnight GrowthOS team`)}
</section>

<section id="pp-capture" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-inbox text-mk-gold mr-2"></i>Start Your Passport</h2>
  <div class="grid lg:grid-cols-2 gap-6">
    <div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-6">
      <p class="text-gray-400 text-sm mb-5">Request the guided intake. We'll send the Passport worksheet and Evidence Vault checklist, and schedule the verification session.</p>
      <form id="passport-form" onsubmit="return submitPassport(event)" class="space-y-3">
        <input type="text" name="website" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">
        <input name="name" required placeholder="Full name" class="w-full bg-[#060a14] border border-blue-900/60 rounded-lg px-4 py-3 text-sm text-white">
        <input name="email" type="email" required placeholder="Email" class="w-full bg-[#060a14] border border-blue-900/60 rounded-lg px-4 py-3 text-sm text-white">
        <input name="phone" placeholder="Phone" class="w-full bg-[#060a14] border border-blue-900/60 rounded-lg px-4 py-3 text-sm text-white">
        <select name="entity" class="w-full bg-[#060a14] border border-blue-900/60 rounded-lg px-4 py-3 text-sm text-white">
          <option value="">Which brand is this for?</option>
          <option>McKnight Opportunity Group (parent)</option><option>The Contracting Preacher</option><option>Contracting Preacher OS</option><option>McKnight Housing Initiative</option><option>McKnight Capital Ready</option><option>Capital Ready Legal Network</option><option>McKnight Freight Systems</option><option>McKnight FleetWorks</option><option>McKnight Early Learning Academy</option><option>McKnight LearningOS</option><option>Multiple / all</option>
        </select>
        <button class="w-full gold-bg text-black font-bold py-3.5 rounded-xl hover:opacity-90 transition"><i class="fas fa-passport mr-2"></i>Request Passport Intake</button>
        <p id="passport-msg" class="text-sm text-center"></p>
      </form>
    </div>
    <div class="bg-gradient-to-br from-[#0d1b30] to-[#101f38] border border-mk-gold/30 rounded-2xl p-6">
      <p class="text-sm font-bold text-mk-gold mb-3"><i class="fas fa-route mr-2"></i>WHAT HAPPENS NEXT</p>
      <ol class="space-y-3 text-sm text-gray-300">
        <li class="flex gap-3"><span class="w-6 h-6 rounded-full gold-bg text-black flex items-center justify-center text-[11px] font-bold shrink-0">1</span>Passport worksheet + Evidence Vault checklist delivered</li>
        <li class="flex gap-3"><span class="w-6 h-6 rounded-full gold-bg text-black flex items-center justify-center text-[11px] font-bold shrink-0">2</span>Document collection with metadata (owner, version, expirations)</li>
        <li class="flex gap-3"><span class="w-6 h-6 rounded-full gold-bg text-black flex items-center justify-center text-[11px] font-bold shrink-0">3</span>Verification pass — every claim gets a receipt</li>
        <li class="flex gap-3"><span class="w-6 h-6 rounded-full gold-bg text-black flex items-center justify-center text-[11px] font-bold shrink-0">4</span>Approval roles assigned (reviewer → signer → submission owner)</li>
        <li class="flex gap-3"><span class="w-6 h-6 rounded-full gold-bg text-black flex items-center justify-center text-[11px] font-bold shrink-0">5</span>Passport powers registrations, grants, proposals and funding apps across the fleet</li>
      </ol>
      <p class="mt-5 text-xs text-gray-500 border-t border-blue-900/40 pt-4">🚦 <span class="text-green-400 font-semibold">RISK TIER: 🟢 Planning and architecture.</span> Legal filings, entity formation and tax structure require licensed professional review.</p>
    </div>
  </div>
</section>

<script>
async function submitPassport(e){e.preventDefault();const f=e.target,m=document.getElementById('passport-msg');const d=Object.fromEntries(new FormData(f));d._source='passport-intake';m.textContent='Sending…';m.className='text-sm text-center text-gray-400';try{const r=await fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});const j=await r.json();if(j.ok){m.textContent='✅ Intake request received. Watch your inbox for the Passport worksheet.';m.className='text-sm text-center text-green-400';f.reset()}else{m.textContent=j.error||'Something went wrong.';m.className='text-sm text-center text-red-400'}}catch(err){m.textContent='Network error — try again.';m.className='text-sm text-center text-red-400'}return false}
</script>
`)
