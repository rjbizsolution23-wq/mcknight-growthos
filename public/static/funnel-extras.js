/* McKnight GrowthOS Funnel Extras v1.0 — conversion layer: exit-intent, sticky CTA, progress bar,
   back-to-top, auto FAQ schema, UTM capture. Config via window.__RJF (set by funnelHead). */
;(function () {
  var CFG = window.__RJF || {}
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* ── 1 · UTM + referrer capture (persist for the session, merged into leads by app.js) ── */
  try {
    var p = new URLSearchParams(location.search)
    var attrs = {}
    ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'ttclid'].forEach(function (k) {
      if (p.get(k)) attrs[k] = p.get(k)
    })
    if (document.referrer && !document.referrer.includes(location.hostname)) attrs._referrer = document.referrer
    if (Object.keys(attrs).length) {
      var prev = JSON.parse(sessionStorage.getItem('rjf_attrs') || '{}')
      sessionStorage.setItem('rjf_attrs', JSON.stringify(Object.assign(prev, attrs)))
    }
  } catch (e) {}

  /* ── 2 · Auto FAQPage JSON-LD from <details> FAQs (rich snippets, free) ── */
  try {
    if (!document.querySelector('script[type="application/ld+json"][data-faq]')) {
      var faqs = []
      document.querySelectorAll('details').forEach(function (d) {
        var s = d.querySelector('summary')
        var a = d.querySelector('p, div')
        if (s && a && s.textContent.trim().length > 8) {
          faqs.push({
            '@type': 'Question',
            name: s.textContent.trim(),
            acceptedAnswer: { '@type': 'Answer', text: a.textContent.trim() }
          })
        }
      })
      if (faqs.length >= 2) {
        var el = document.createElement('script')
        el.type = 'application/ld+json'
        el.setAttribute('data-faq', '1')
        el.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs })
        document.head.appendChild(el)
      }
    }
  } catch (e) {}

  /* helpers: find the primary conversion target (first lead form, else first CTA anchor) */
  function target() {
    return document.querySelector('[data-lead-form]') || document.querySelector('a[href^="#"][class*="pulse-glow"], .pulse-glow')
  }
  function scrollToTarget() {
    var t = target()
    if (t) t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' })
    var first = t && t.querySelector && t.querySelector('input:not([type=hidden]):not([type=checkbox])')
    if (first) setTimeout(function () { first.focus({ preventScroll: true }) }, reduced ? 0 : 650)
  }

  /* ── 3 · Scroll progress bar ── */
  if (CFG.progress !== '0') {
    var bar = document.createElement('div')
    bar.id = 'rjf-progress'
    bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0;z-index:9999;background:linear-gradient(90deg,#2563eb,#0ea5e9,#f97316);transition:width .1s linear;pointer-events:none'
    document.body.appendChild(bar)
    var ticking = false
    window.addEventListener('scroll', function () {
      if (ticking) return
      ticking = true
      requestAnimationFrame(function () {
        var h = document.documentElement
        var max = h.scrollHeight - h.clientHeight
        bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%'
        ticking = false
      })
    }, { passive: true })
  }

  /* ── 4 · Back-to-top button ── */
  if (CFG.toTop !== '0') {
    var top = document.createElement('button')
    top.setAttribute('aria-label', 'Back to top')
    top.innerHTML = '<i class="fas fa-arrow-up"></i>'
    top.style.cssText = 'position:fixed;bottom:88px;right:16px;z-index:60;width:44px;height:44px;border-radius:9999px;border:1px solid rgba(255,255,255,.15);background:rgba(8,14,30,.72);backdrop-filter:blur(10px);color:#fff;cursor:pointer;opacity:0;pointer-events:none;transition:opacity .3s ease,transform .3s ease;transform:translateY(8px)'
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }) })
    document.body.appendChild(top)
    window.addEventListener('scroll', function () {
      var on = window.scrollY > 900
      top.style.opacity = on ? '1' : '0'
      top.style.pointerEvents = on ? 'auto' : 'none'
      top.style.transform = on ? 'none' : 'translateY(8px)'
    }, { passive: true })
  }

  /* ── 5 · Sticky mobile CTA bar (appears after hero scroll) ── */
  if (CFG.sticky !== '0' && target()) {
    var stick = document.createElement('div')
    stick.id = 'rjf-sticky'
    stick.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:70;padding:10px 14px calc(10px + env(safe-area-inset-bottom));background:rgba(8,14,30,.85);backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,.12);transform:translateY(110%);transition:transform .4s cubic-bezier(.22,1,.36,1);display:none'
    stick.innerHTML = '<button style="width:100%;background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;font-weight:800;font-size:16px;padding:13px;border-radius:12px;border:none;cursor:pointer;box-shadow:0 8px 24px rgba(249,115,22,.35)">' +
      (CFG.ctaText || 'Get Started Free →') + '</button>'
    stick.querySelector('button').addEventListener('click', scrollToTarget)
    document.body.appendChild(stick)
    var mq = window.matchMedia('(max-width: 768px)')
    function stickTick() {
      if (!mq.matches) { stick.style.display = 'none'; return }
      stick.style.display = 'block'
      var t = target()
      var rect = t ? t.getBoundingClientRect() : null
      var formVisible = rect && rect.top < window.innerHeight && rect.bottom > 0
      stick.style.transform = (window.scrollY > 550 && !formVisible) ? 'translateY(0)' : 'translateY(110%)'
    }
    window.addEventListener('scroll', stickTick, { passive: true })
    window.addEventListener('resize', stickTick)
    stickTick()
  }

  /* ── 6 · Exit-intent popup (desktop mouse-out; once per session) ── */
  if (CFG.exit !== '0' && target() && !sessionStorage.getItem('rjf_exit_shown')) {
    var shown = false
    function showExit() {
      if (shown || sessionStorage.getItem('rjf_exit_shown')) return
      shown = true
      sessionStorage.setItem('rjf_exit_shown', '1')
      var ov = document.createElement('div')
      ov.id = 'rjf-exit'
      ov.style.cssText = 'position:fixed;inset:0;z-index:100;background:rgba(2,6,18,.72);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .3s ease'
      ov.innerHTML =
        '<div role="dialog" aria-modal="true" style="max-width:440px;width:100%;background:linear-gradient(160deg,#0f172a,#1e293b);border:1px solid rgba(255,255,255,.14);border-radius:20px;padding:34px 30px;text-align:center;color:#fff;box-shadow:0 40px 90px rgba(0,0,0,.6);transform:scale(.94);transition:transform .35s cubic-bezier(.22,1,.36,1)">' +
        '<div style="font-size:38px;margin-bottom:10px">👋</div>' +
        '<h3 style="font-family:Poppins,sans-serif;font-size:24px;font-weight:800;margin:0 0 10px">' + (CFG.exitTitle || 'Wait — before you go…') + '</h3>' +
        '<p style="color:#cbd5e1;font-size:14px;line-height:1.6;margin:0 0 20px">' + (CFG.exitDesc || 'It takes under 60 seconds and costs nothing. Grab your spot before you leave — no obligation, ever.') + '</p>' +
        '<button id="rjf-exit-cta" style="width:100%;background:linear-gradient(135deg,#2563eb,#0ea5e9);color:#fff;font-weight:800;font-size:16px;padding:14px;border-radius:12px;border:none;cursor:pointer;margin-bottom:10px">' + (CFG.ctaText || 'Yes — Claim My Spot →') + '</button>' +
        '<button id="rjf-exit-no" style="background:none;border:none;color:#64748b;font-size:12px;cursor:pointer;text-decoration:underline">No thanks, I\u2019ll pass on this</button>' +
        '</div>'
      document.body.appendChild(ov)
      requestAnimationFrame(function () {
        ov.style.opacity = '1'
        ov.firstChild.style.transform = 'scale(1)'
      })
      function close() { ov.style.opacity = '0'; setTimeout(function () { ov.remove() }, 320) }
      ov.addEventListener('click', function (e) { if (e.target === ov) close() })
      document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc) } })
      ov.querySelector('#rjf-exit-no').addEventListener('click', close)
      ov.querySelector('#rjf-exit-cta').addEventListener('click', function () { close(); scrollToTarget() })
      if (window.rjfTrack) window.rjfTrack('exit_intent_shown')
    }
    document.addEventListener('mouseout', function (e) {
      if (!e.relatedTarget && e.clientY <= 8) showExit()
    })
    /* mobile fallback: fast scroll-up near top after engaging */
    var lastY = 0, engaged = false
    window.addEventListener('scroll', function () {
      var y = window.scrollY
      if (y > 1200) engaged = true
      if (engaged && y < 300 && lastY - y > 120) showExit()
      lastY = y
    }, { passive: true })
  }

  /* ── 7 · Universal conversion event helper (GA4 + Meta + TikTok, if pixels loaded) ── */
  window.rjfTrack = function (event, data) {
    data = data || {}
    try { if (window.gtag) window.gtag('event', event, data) } catch (e) {}
    try { if (window.fbq) window.fbq('trackCustom', event, data) } catch (e) {}
    try { if (window.ttq) window.ttq.track(event, data) } catch (e) {}
    try { if (window.dataLayer && !window.gtag) window.dataLayer.push(Object.assign({ event: event }, data)) } catch (e) {}
  }
})()

/* ── 8 · Dead-CTA rescue: any href="#" CTA opens a glass lead-capture modal ──
   Fixes placeholder buy/apply buttons across all funnels — every click now converts. */
;(function () {
  var deadLinks = document.querySelectorAll('a[href="#"]')
  if (!deadLinks.length) return

  function openLeadModal(offer) {
    var existing = document.getElementById('rjf-lead-modal')
    if (existing) existing.remove()
    var ov = document.createElement('div')
    ov.id = 'rjf-lead-modal'
    ov.style.cssText = 'position:fixed;inset:0;z-index:110;background:rgba(2,6,18,.74);backdrop-filter:blur(7px);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .28s ease'
    ov.innerHTML =
      '<div role="dialog" aria-modal="true" style="max-width:430px;width:100%;background:linear-gradient(160deg,#0f172a,#1e293b);border:1px solid rgba(255,255,255,.14);border-radius:20px;padding:30px 28px;color:#fff;box-shadow:0 40px 90px rgba(0,0,0,.6);transform:scale(.94);transition:transform .32s cubic-bezier(.22,1,.36,1);position:relative">' +
      '<button id="rjf-lm-x" aria-label="Close" style="position:absolute;top:12px;right:14px;background:none;border:none;color:#64748b;font-size:20px;cursor:pointer">&times;</button>' +
      '<h3 style="font-family:Poppins,sans-serif;font-size:21px;font-weight:800;margin:0 0 4px">' + (offer ? offer.replace(/\s*(→|›|>)\s*$/, '') : 'Claim Your Spot') + '</h3>' +
      '<p style="color:#94a3b8;font-size:13px;margin:0 0 18px">Drop your details — we\u2019ll reach out within one business day. No spam, ever.</p>' +
      '<form id="rjf-lm-form">' +
      '<input name="name" required placeholder="Full name" style="width:100%;box-sizing:border-box;background:#0b1226;border:1px solid #1e3a8a;border-radius:10px;padding:12px 14px;color:#e2e8f0;font-size:14px;margin-bottom:10px">' +
      '<input name="email" type="email" required placeholder="Email address" style="width:100%;box-sizing:border-box;background:#0b1226;border:1px solid #1e3a8a;border-radius:10px;padding:12px 14px;color:#e2e8f0;font-size:14px;margin-bottom:10px">' +
      '<input name="phone" type="tel" placeholder="Phone (optional)" style="width:100%;box-sizing:border-box;background:#0b1226;border:1px solid #1e3a8a;border-radius:10px;padding:12px 14px;color:#e2e8f0;font-size:14px;margin-bottom:14px">' +
      '<input name="_website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;top:-9999px;height:1px;width:1px;opacity:0;pointer-events:none">' +
      '<button type="submit" style="width:100%;background:linear-gradient(135deg,#2563eb,#0ea5e9);color:#fff;font-weight:800;font-size:15px;padding:13px;border-radius:12px;border:none;cursor:pointer">' + ((window.__RJF || {}).ctaText || 'Send It \u2192') + '</button>' +
      '<p style="color:#475569;font-size:10px;text-align:center;margin:10px 0 0">Protected by our privacy policy. Unsubscribe anytime.</p>' +
      '</form></div>'
    document.body.appendChild(ov)
    requestAnimationFrame(function () { ov.style.opacity = '1'; ov.firstChild.style.transform = 'scale(1)' })
    function close() { ov.style.opacity = '0'; setTimeout(function () { ov.remove() }, 300) }
    ov.addEventListener('click', function (e) { if (e.target === ov) close() })
    ov.querySelector('#rjf-lm-x').addEventListener('click', close)
    document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc) } })
    setTimeout(function () { var f = ov.querySelector('input'); if (f) f.focus() }, 350)

    ov.querySelector('#rjf-lm-form').addEventListener('submit', async function (e) {
      e.preventDefault()
      var form = e.target
      var btn = form.querySelector('button[type=submit]')
      btn.disabled = true
      btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:8px"></i>Sending\u2026'
      var data = { _source: location.pathname + location.search, _offer: offer || '' }
      try { Object.assign(data, JSON.parse(sessionStorage.getItem('rjf_attrs') || '{}')) } catch (err) {}
      if ((window.__RJF || {}).ghlTag) data._ghlTag = window.__RJF.ghlTag
      form.querySelectorAll('input').forEach(function (i) { if (i.name && i.value.trim()) data[i.name] = i.value.trim() })
      try {
        var r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        if (!r.ok) throw new Error('HTTP ' + r.status)
        if (window.rjfTrack) window.rjfTrack('generate_lead', { source: data._source, offer: offer })
        if ((window.__RJF || {}).confetti === '1' && window.rjfConfettiBurst) window.rjfConfettiBurst()
        btn.style.background = 'linear-gradient(135deg,#059669,#10b981)'
        btn.innerHTML = '<i class="fas fa-check" style="margin-right:8px"></i>Got it \u2014 we\u2019ll be in touch!'
        var redirect = (window.__RJF || {}).redirect
        setTimeout(function () { if (redirect) location.href = redirect; else close() }, 1400)
      } catch (err) {
        btn.disabled = false
        btn.innerHTML = 'Try Again \u2192'
      }
    })
  }

  deadLinks.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault()
      if (window.rjfTrack) window.rjfTrack('cta_click', { text: a.textContent.trim().slice(0, 60) })
      openLeadModal(a.textContent.trim())
    })
  })
})()

/* ── 9 · v5.1 BRAND IDENTITY LAYER — every funnel wears its brand ──
   Config injected by funnelHead via window.__RJF: brandKey/brandName/
   brandIcon/brandTagline/brandHex. Adds a top brand ribbon + footer strip,
   and recolors the dead-CTA lead modal to the brand palette. A client
   white-label (bizLogo/brandColor) suppresses the ribbon — client wins. */
;(function () {
  var CFG = window.__RJF || {}
  if (!CFG.brandName || CFG.bizLogo || CFG.brandColor) return
  var hex = CFG.brandHex || '#d4a72c'
  var icon = CFG.brandIcon || 'fa-rocket'

  /* top ribbon */
  try {
    var bar = document.createElement('div')
    bar.id = 'rjf-brand-bar'
    bar.style.cssText = 'position:relative;z-index:60;background:linear-gradient(90deg,#050b16,#0a1628 40%,#0a1628 60%,#050b16);border-bottom:1px solid ' + hex + '44;color:#e2e8f0;font:600 12px Inter,sans-serif;padding:8px 16px;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;text-align:center'
    bar.innerHTML =
      '<span style="display:inline-flex;align-items:center;gap:7px"><i class="fas ' + icon + '" style="color:' + hex + '"></i><strong style="color:' + hex + '">' + CFG.brandName + '</strong></span>' +
      '<span style="color:#475569">·</span>' +
      '<span style="color:#94a3b8">' + (CFG.brandTagline || '') + '</span>' +
      '<span style="color:#475569">·</span>' +
      '<span style="color:#64748b;font-weight:500">A McKnight Opportunity Group company</span>'
    document.body.insertBefore(bar, document.body.firstChild)
  } catch (e) {}

  /* footer strip */
  try {
    var foot = document.createElement('div')
    foot.style.cssText = 'background:#050b16;border-top:1px solid ' + hex + '33;color:#64748b;font:500 11px Inter,sans-serif;padding:14px 16px;text-align:center'
    foot.innerHTML = '<i class="fas ' + icon + '" style="color:' + hex + ';margin-right:6px"></i><span style="color:#94a3b8;font-weight:700">' + CFG.brandName + '</span> — ' + (CFG.brandTagline || '') + '<br><span style="font-size:10px">Part of the McKnight Opportunity Group ecosystem · Powered by McKnight GrowthOS · Technology by RJ Business Solutions</span>'
    document.body.appendChild(foot)
  } catch (e) {}

  /* recolor lead-modal CTA when it opens (dead-CTA rescue modal) */
  try {
    var mo = new MutationObserver(function () {
      var m = document.getElementById('rjf-lead-modal')
      if (m) {
        var b = m.querySelector('button[type=submit]')
        if (b && !b.dataset.branded) { b.dataset.branded = '1'; b.style.background = 'linear-gradient(135deg,' + hex + ',' + hex + 'cc)' }
      }
    })
    mo.observe(document.body, { childList: true })
  } catch (e) {}
})()
