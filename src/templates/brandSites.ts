// ── v6.0 BRAND FLAGSHIP SITES — McKnight Opportunity Group full fleet ──
// One premium, conversion-focused site engine; ten brand configs from the
// fleet blueprint. Every site: sticky glass nav, kinetic hero, stats band,
// services grid, platform/portal showcase, workflow strip, compliance-gated
// copy, FAQ schema, lead form wired to /api/lead (→ correct ClientOS
// pipeline), and the mandated attribution footer:
// "A McKnight Opportunity Group platform. Technology powered by RJ Business Solutions."
import { funnelHead, esc, param, BRAND_THEMES, type BrandTheme } from './helpers'

export type BrandSiteConfig = {
  slug: string
  brandKey: string            // key into BRAND_THEMES
  product: string             // platform/product name (blueprint "Final fleet lock")
  function: string            // primary function
  positioning: string         // hero sub-headline
  heroKicker: string
  heroCta: string
  nav: string[]               // public website nav (blueprint-verbatim)
  stats: Array<[string, string]>          // [value, label]
  services: Array<[string, string, string]> // [icon, title, desc]
  portalName: string
  portalDesc: string
  portalFeatures: Array<[string, string]>  // [icon, label]
  workflow: string[]          // signature workflow strip
  workflowTitle: string
  compliance: string[]        // launch gates / required positioning lines
  complianceTitle: string
  faq: Array<{ q: string; a: string }>
  formTitle: string
  formNote: string
  interestOptions: string[]
}

const check = (t: string, hex: string) => `<li class="flex items-start gap-3 py-1.5"><i class="fas fa-circle-check mt-1" style="color:${hex}"></i><span>${t}</span></li>`

export const renderBrandSite = (cfg: BrandSiteConfig, q: Record<string, string | undefined>) => {
  const t: BrandTheme = BRAND_THEMES[cfg.brandKey] || BRAND_THEMES.growthos
  const hex = t.color, hex2 = t.color2
  const btnText = t.darkText ? '#0a1628' : '#ffffff'
  const orgName = param(q, 'orgName', t.name)
  const phone = param(q, 'phone', '')
  const email = param(q, 'email', 'hello@mcknightgroup.org')

  return `${funnelHead(`${t.name} — ${t.tagline}`, q, { desc: cfg.positioning, type: 'Organization', faq: cfg.faq })}
<body class="text-gray-100" style="background:#050b16">

<!-- STICKY GLASS NAV -->
<nav id="site-nav" class="sticky top-0 z-50 glass-dark border-b" style="border-color:${hex}33">
  <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
    <a href="#hero" class="flex items-center gap-2.5 shrink-0">
      <span class="w-9 h-9 rounded-xl flex items-center justify-center" style="background:linear-gradient(135deg,${hex},${hex2})"><i class="fas ${t.icon}" style="color:${btnText}"></i></span>
      <span class="font-extrabold text-white text-sm md:text-base leading-tight">${esc(orgName)}</span>
    </a>
    <div class="hidden lg:flex items-center gap-5 text-[13px] font-semibold text-gray-300">
      ${cfg.nav.slice(0, 7).map((n, i) => `<a href="#${['services', 'platform', 'workflow', 'compliance', 'faq', 'stats', 'contact'][i % 7]}" class="hover:text-white transition">${n}</a>`).join('')}
    </div>
    <a href="#contact" class="pulse-glow shrink-0 text-sm font-bold px-5 py-2.5 rounded-xl" style="background:${hex};color:${btnText}">${esc(cfg.heroCta)}</a>
  </div>
</nav>

<!-- HERO -->
<header id="hero" class="relative overflow-hidden" style="background:linear-gradient(160deg,#050b16 0%,#0a1628 55%,${hex}22 130%)">
  <div class="rj-aurora"></div>
  <div class="max-w-6xl mx-auto px-4 pt-20 pb-24 text-center relative z-10">
    <p class="inline-flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-full mb-8 border" style="color:${hex2};border-color:${hex}55;background:${hex}14"><i class="fas ${t.icon}"></i>${esc(cfg.heroKicker)}</p>
    <h1 class="rj-kinetic text-4xl md:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] mb-6">${esc(t.tagline)}</h1>
    <p class="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">${esc(cfg.positioning)}</p>
    <div class="flex flex-wrap items-center justify-center gap-4">
      <a href="#contact" class="pulse-glow text-lg font-extrabold px-10 py-5 rounded-2xl" style="background:${hex};color:${btnText}">${esc(cfg.heroCta)} →</a>
      <a href="#platform" class="text-lg font-bold px-8 py-5 rounded-2xl border text-white hover:bg-white/5 transition" style="border-color:${hex}66">Explore ${esc(cfg.product)}</a>
    </div>
    <p class="mt-10 text-xs text-gray-500 font-semibold tracking-wide uppercase">A McKnight Opportunity Group platform · Technology powered by RJ Business Solutions</p>
  </div>
</header>

<!-- STATS BAND -->
<section id="stats" class="border-y" style="background:#0a1628;border-color:${hex}26">
  <div class="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
    ${cfg.stats.map(([v, l]) => `<div class="mo-lift rounded-2xl py-4"><p class="rj-grad-text text-3xl md:text-4xl font-extrabold">${v}</p><p class="text-gray-400 text-xs md:text-sm font-semibold mt-1">${l}</p></div>`).join('')}
  </div>
</section>

<!-- SERVICES -->
<section id="services" class="py-20" style="background:#050b16">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-3xl md:text-5xl font-extrabold text-white text-center mb-4">What We Do</h2>
    <p class="text-gray-400 text-center max-w-2xl mx-auto mb-12">${esc(cfg.function)} — delivered with systems, discipline and clear boundaries.</p>
    <div class="grid md:grid-cols-3 gap-6">
      ${cfg.services.map(([icon, title, desc]) => `
      <article class="mo-lift rj-tilt rounded-2xl p-7 border" style="background:#0d1b30;border-color:${hex}2e">
        <span class="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style="background:${hex}1f"><i class="fas ${icon} text-xl" style="color:${hex2}"></i></span>
        <h3 class="font-bold text-white text-lg mb-2">${title}</h3>
        <p class="text-gray-400 text-sm leading-relaxed">${desc}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- PLATFORM / PORTAL SHOWCASE -->
<section id="platform" class="py-20" style="background:linear-gradient(180deg,#0a1628,#050b16)">
  <div class="max-w-6xl mx-auto px-4">
    <div class="text-center mb-12">
      <p class="text-sm font-bold uppercase tracking-widest mb-3" style="color:${hex2}">${esc(cfg.product)}</p>
      <h2 class="text-3xl md:text-5xl font-extrabold text-white mb-4">${esc(cfg.portalName)}</h2>
      <p class="text-gray-400 max-w-2xl mx-auto">${esc(cfg.portalDesc)}</p>
    </div>
    <div class="rj-glow-border rounded-3xl p-8 md:p-12 border" style="background:#0d1b30;border-color:${hex}33">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
        ${cfg.portalFeatures.map(([icon, label]) => `
        <div class="mo-lift flex items-center gap-3 rounded-xl px-4 py-3.5 border" style="background:#0a1628;border-color:${hex}22">
          <i class="fas ${icon}" style="color:${hex2}"></i><span class="text-sm font-semibold text-gray-200">${label}</span>
        </div>`).join('')}
      </div>
      <p class="text-center text-xs text-gray-500 mt-8"><i class="fas fa-shield-halved mr-1" style="color:${hex2}"></i>Separate tenant boundary · separate access roles · separate storage namespace · separate retention policy. Shared code ≠ shared unrestricted data.</p>
    </div>
  </div>
</section>

<!-- WORKFLOW STRIP -->
<section id="workflow" class="py-20" style="background:#050b16">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-white text-center mb-12">${esc(cfg.workflowTitle)}</h2>
    <div class="flex flex-wrap items-center justify-center gap-y-4">
      ${cfg.workflow.map((s, i) => `
      <span class="mo-lift inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-gray-200 m-1" style="background:#0d1b30;border-color:${hex}33"><span class="w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold" style="background:${hex};color:${btnText}">${i + 1}</span>${s}</span>${i < cfg.workflow.length - 1 ? `<i class="fas fa-arrow-right mx-1 text-xs" style="color:${hex}"></i>` : ''}`).join('')}
    </div>
  </div>
</section>

<!-- COMPLIANCE / TRUST -->
<section id="compliance" class="py-20" style="background:#0a1628">
  <div class="max-w-4xl mx-auto px-4">
    <div class="rounded-3xl border p-8 md:p-10" style="background:#0d1b30;border-color:${hex}33">
      <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2"><i class="fas fa-scale-balanced mr-3" style="color:${hex2}"></i>${esc(cfg.complianceTitle)}</h2>
      <p class="text-gray-400 text-sm mb-6">We operate with clear legal boundaries. What we are — and what we are not — is stated plainly.</p>
      <ul class="text-gray-300 text-sm">${cfg.compliance.map((c) => check(c, hex)).join('')}</ul>
    </div>
  </div>
</section>

<!-- FAQ -->
<section id="faq" class="py-20" style="background:#050b16">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-extrabold text-white text-center mb-10">Questions, Answered</h2>
    ${cfg.faq.map((f) => `
    <details class="group rounded-2xl border mb-3 overflow-hidden" style="background:#0d1b30;border-color:${hex}26">
      <summary class="cursor-pointer list-none flex items-center justify-between px-6 py-4 font-bold text-white text-sm md:text-base">${esc(f.q)}<i class="fas fa-chevron-down text-xs transition group-open:rotate-180" style="color:${hex2}"></i></summary>
      <p class="px-6 pb-5 text-gray-400 text-sm leading-relaxed">${esc(f.a)}</p>
    </details>`).join('')}
  </div>
</section>

<!-- LEAD FORM -->
<section id="contact" class="py-20 relative overflow-hidden" style="background:linear-gradient(160deg,#0a1628,${hex}1f)">
  <div class="max-w-2xl mx-auto px-4 relative z-10">
    <div class="text-center mb-8">
      <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-3">${esc(cfg.formTitle)}</h2>
      <p class="text-gray-400">${esc(cfg.formNote)}</p>
    </div>
    <form data-lead-form class="rounded-3xl p-8 border shadow-2xl" style="background:#0d1b30;border-color:${hex}40">
      <div class="grid md:grid-cols-2 gap-4 mb-4">
        <input name="name" required placeholder="Full name" class="w-full rounded-xl px-4 py-3.5 text-sm text-gray-100 border" style="background:#0a1628;border-color:${hex}33">
        <input name="email" type="email" required placeholder="Email address" class="w-full rounded-xl px-4 py-3.5 text-sm text-gray-100 border" style="background:#0a1628;border-color:${hex}33">
      </div>
      <div class="grid md:grid-cols-2 gap-4 mb-4">
        <input name="phone" type="tel" placeholder="Phone (optional)" class="w-full rounded-xl px-4 py-3.5 text-sm text-gray-100 border" style="background:#0a1628;border-color:${hex}33">
        <select name="interest" class="w-full rounded-xl px-4 py-3.5 text-sm text-gray-100 border" style="background:#0a1628;border-color:${hex}33">
          ${cfg.interestOptions.map((o) => `<option>${o}</option>`).join('')}
        </select>
      </div>
      <textarea name="message" rows="3" placeholder="Tell us about your situation…" class="w-full rounded-xl px-4 py-3.5 text-sm text-gray-100 border mb-4" style="background:#0a1628;border-color:${hex}33"></textarea>
      <label class="flex items-start gap-2.5 text-xs text-gray-400 mb-5"><input type="checkbox" name="consent" value="yes" required class="mt-0.5">I consent to be contacted about my inquiry. No spam — unsubscribe anytime.</label>
      <button type="submit" class="pulse-glow w-full text-lg font-extrabold py-4 rounded-2xl" style="background:${hex};color:${btnText}">${esc(cfg.heroCta)} →</button>
      <p class="text-center text-[10px] text-gray-500 mt-4">Protected by our privacy policy. Your information is never sold.</p>
    </form>
    ${phone ? `<p class="text-center text-gray-400 text-sm mt-6"><i class="fas fa-phone mr-2" style="color:${hex2}"></i>Prefer to talk? <a href="tel:${phone}" class="font-bold text-white">${phone}</a></p>` : ''}
  </div>
</section>

<!-- ATTRIBUTION FOOTER (mandated on every platform) -->
<footer class="py-12 border-t text-center" style="background:#050b16;border-color:${hex}26">
  <div class="max-w-4xl mx-auto px-4">
    <p class="flex items-center justify-center gap-2.5 mb-3">
      <span class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,${hex},${hex2})"><i class="fas ${t.icon} text-sm" style="color:${btnText}"></i></span>
      <span class="font-extrabold text-white">${esc(orgName)}</span>
    </p>
    <p class="text-gray-400 text-sm mb-4">${esc(t.tagline)}</p>
    <p class="text-gray-300 text-sm font-semibold mb-2">A McKnight Opportunity Group platform. Technology powered by RJ Business Solutions.</p>
    <p class="text-gray-600 text-xs">Contact: <a href="mailto:${email}" class="underline" style="color:${hex2}">${email}</a> · © ${new Date().getFullYear()} McKnight Opportunity Group. All rights reserved.</p>
    <nav class="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-gray-500">${cfg.nav.map((n, i) => `<a href="#${['services', 'platform', 'workflow', 'compliance', 'faq', 'stats', 'contact'][i % 7]}" class="hover:text-gray-300">${n}</a>`).join('')}</nav>
  </div>
</footer>
</body></html>`
}
