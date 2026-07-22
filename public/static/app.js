// RJ Funnel Command Center — client JS
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-copy-target]')
  if (!btn) return
  const el = document.getElementById(btn.dataset.copyTarget)
  if (!el) return
  navigator.clipboard.writeText(el.innerText).then(() => {
    const orig = btn.innerHTML
    btn.innerHTML = '<i class="fas fa-check mr-1"></i>Copied!'
    btn.classList.add('bg-emerald-600', 'text-white')
    setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('bg-emerald-600', 'text-white') }, 1500)
  })
})

// Brand kit color swatches — copy hex directly from data-copy-text
document.addEventListener('click', (e) => {
  const sw = e.target.closest('[data-copy-text]')
  if (!sw) return
  navigator.clipboard.writeText(sw.dataset.copyText).then(() => {
    const label = sw.parentElement && sw.parentElement.querySelector('.font-mono')
    if (label) {
      const orig = label.textContent
      label.textContent = 'Copied!'
      label.classList.add('text-emerald-400')
      setTimeout(() => { label.textContent = orig; label.classList.remove('text-emerald-400') }, 1200)
    }
  })
})

// Tabs
document.addEventListener('click', (e) => {
  const tab = e.target.closest('[data-tab]')
  if (!tab) return
  const group = tab.closest('[data-tab-group]')
  if (!group) return
  group.querySelectorAll('[data-tab]').forEach(t => {
    t.classList.remove('grad-bg', 'text-white', 'font-semibold')
    t.classList.add('text-gray-300')
  })
  tab.classList.add('grad-bg', 'text-white', 'font-semibold')
  const groupName = group.dataset.tabGroup
  document.querySelectorAll(`[data-tab-panel-group="${groupName}"]`).forEach(p => {
    p.classList.toggle('hidden', p.dataset.tabPanel !== tab.dataset.tab)
  })
})

// Builder — generate template URL from form fields
const builderForm = document.getElementById('builder-form')
if (builderForm) {
  const templateSelect = document.getElementById('builder-template')

  const showFields = () => {
    const t = templateSelect.value
    document.querySelectorAll('[data-fields-for]').forEach(f => {
      f.classList.toggle('hidden', f.dataset.fieldsFor !== t)
    })
  }
  templateSelect.addEventListener('change', showFields)
  showFields()

  builderForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const t = templateSelect.value
    const params = new URLSearchParams()
    const fieldset = document.querySelector(`[data-fields-for="${t}"]`)
    fieldset.querySelectorAll('input, textarea, select').forEach(inp => {
      if (inp.value.trim()) params.set(inp.name, inp.value.trim())
    })
    // Universal options (SEO + dark theme) — apply to every template
    const universal = document.getElementById('builder-universal')
    if (universal) universal.querySelectorAll('input, textarea, select').forEach(inp => {
      if (inp.type === 'checkbox') { if (inp.checked) params.set(inp.name, inp.value) }
      else if (inp.value.trim()) params.set(inp.name, inp.value.trim())
    })
    const url = `/t/${t}?${params.toString()}`
    const frame = document.getElementById('builder-preview')
    const link = document.getElementById('builder-link')
    frame.src = url
    link.href = url
    link.textContent = window.location.origin + url
    document.getElementById('builder-result').classList.remove('hidden')
    document.getElementById('builder-result').scrollIntoView({ behavior: 'smooth' })
  })

  // ── v3.3: AI Copy Fill (Cloudflare Workers AI) ──────────────
  const aiBtn = document.getElementById('btn-ai-fill')
  if (aiBtn) aiBtn.addEventListener('click', async () => {
    const t = templateSelect.value
    const brief = (document.getElementById('ai-brief').value || '').trim()
    const status = document.getElementById('ai-fill-status')
    const fieldset = document.querySelector(`[data-fields-for="${t}"]`)
    const inputs = fieldset ? [...fieldset.querySelectorAll('input[name]')] : []
    const fields = inputs.map(i => i.name)
    if (!brief) { status.className = 'text-[11px] mt-2 text-amber-400'; status.textContent = 'Describe the client first — one line is enough.'; status.classList.remove('hidden'); return }
    aiBtn.disabled = true
    aiBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i>Writing…'
    status.className = 'text-[11px] mt-2 text-blue-300'; status.textContent = 'AI is writing your funnel copy…'; status.classList.remove('hidden')
    try {
      const res = await fetch('/api/ai/copy', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ template: t, fields, brief }) })
      const d = await res.json()
      if (d.ok && d.fields) {
        let filled = 0
        inputs.forEach(inp => { if (d.fields[inp.name]) { inp.value = d.fields[inp.name]; filled++ } })
        status.className = 'text-[11px] mt-2 text-emerald-400'
        status.textContent = '✓ AI filled ' + filled + ' fields — review, tweak, then Generate. (Replace proof numbers with the client\u2019s real verified data before launch.)'
      } else {
        status.className = 'text-[11px] mt-2 text-amber-400'
        status.textContent = '⚠ ' + (d.error || 'AI unavailable — works in production on Cloudflare.')
      }
    } catch (e) {
      status.className = 'text-[11px] mt-2 text-amber-400'
      status.textContent = '⚠ AI unavailable in this environment — works in production on Cloudflare.'
    }
    aiBtn.disabled = false
    aiBtn.innerHTML = '<i class="fas fa-wand-magic-sparkles mr-1"></i>AI Fill'
  })

  // ── v3.3: Save Short Link (Cloudflare D1) ───────────────────
  const slBtn = document.getElementById('btn-shortlink')
  if (slBtn) slBtn.addEventListener('click', async () => {
    const out = document.getElementById('shortlink-out')
    const link = document.getElementById('builder-link')
    const url = link.getAttribute('href') || ''
    const m = url.match(/^\/t\/([a-z0-9-]+)\??(.*)$/)
    if (!m) { out.className = 'text-xs mt-2 text-amber-400'; out.textContent = 'Generate a funnel first.'; out.classList.remove('hidden'); return }
    slBtn.disabled = true
    slBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i>Saving…'
    try {
      const res = await fetch('/api/links', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ template: m[1], params: m[2] || '', label: (document.getElementById('shortlink-label').value || '').trim() }) })
      const d = await res.json()
      if (d.ok) {
        out.className = 'text-xs mt-2 text-emerald-400'
        out.innerHTML = '✓ Short link saved: <a href="' + d.url + '" target="_blank" class="underline text-brand-cyan">' + d.url + '</a> <button type="button" class="ml-1 text-gray-400 underline" onclick="navigator.clipboard.writeText(\'' + d.url + '\')">copy</button> — clicks are tracked in D1.'
      } else {
        out.className = 'text-xs mt-2 text-amber-400'
        out.textContent = '⚠ ' + (d.error || 'Could not save link')
      }
    } catch (e) {
      out.className = 'text-xs mt-2 text-amber-400'
      out.textContent = '⚠ Short links need the D1 database — works in production on Cloudflare.'
    }
    out.classList.remove('hidden')
    slBtn.disabled = false
    slBtn.innerHTML = '<i class="fas fa-link mr-1"></i>Save Short Link'
  })

  // ── v3.5: AI Social Posts (FB/IG/LinkedIn/X/TikTok w/ UTM-tracked link) ──
  const socBtn = document.getElementById('btn-ai-social')
  if (socBtn) socBtn.addEventListener('click', async () => {
    const out = document.getElementById('social-posts-out')
    const link = document.getElementById('builder-link')
    const url = link.getAttribute('href') || ''
    const m = url.match(/^\/t\/([a-z0-9-]+)\??(.*)$/)
    const escHtml = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
    if (!m) { out.className = 'mt-3 text-xs text-amber-400'; out.textContent = 'Generate a funnel first — then AI writes posts promoting it.'; out.classList.remove('hidden'); return }
    const brief = (document.getElementById('ai-brief') ? document.getElementById('ai-brief').value : '').trim()
    socBtn.disabled = true
    socBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i>Writing 5 posts…'
    out.className = 'mt-3 text-xs text-blue-300'; out.textContent = 'AI is writing platform-specific promo posts…'; out.classList.remove('hidden')
    try {
      const res = await fetch('/api/ai/social', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ template: m[1], params: m[2] || '', brief }) })
      const d = await res.json()
      if (d.ok && d.posts) {
        const META = { facebook: ['fab fa-facebook', 'Facebook', 'text-blue-400'], instagram: ['fab fa-instagram', 'Instagram', 'text-pink-400'], linkedin: ['fab fa-linkedin', 'LinkedIn', 'text-sky-400'], x: ['fab fa-x-twitter', 'X (Twitter)', 'text-gray-300'], tiktok: ['fab fa-tiktok', 'TikTok Script', 'text-teal-300'] }
        out.className = 'mt-3 space-y-3'
        out.innerHTML = Object.keys(META).filter(p => d.posts[p]).map(p =>
          '<div class="bg-[#060a14] border border-blue-900/40 rounded-lg p-3">'
          + '<div class="flex items-center justify-between mb-2"><span class="text-xs font-bold ' + META[p][2] + '"><i class="' + META[p][0] + ' mr-1.5"></i>' + META[p][1] + '</span>'
          + '<button type="button" data-copy-post="' + p + '" class="text-[10px] text-gray-400 border border-gray-700 px-2 py-1 rounded hover:bg-gray-800"><i class="fas fa-copy mr-1"></i>Copy</button></div>'
          + '<pre class="text-[11px] text-gray-300 whitespace-pre-wrap font-sans" data-post="' + p + '">' + escHtml(d.posts[p]) + '</pre></div>'
        ).join('') + '<p class="text-[10px] text-gray-500">Links carry utm_source=social — every click and lead is attributed in your Lead Inbox.</p>'
        out.querySelectorAll('[data-copy-post]').forEach(btn => btn.addEventListener('click', () => {
          const pre = out.querySelector('[data-post="' + btn.dataset.copyPost + '"]')
          navigator.clipboard.writeText(pre.textContent).then(() => { btn.innerHTML = '<i class="fas fa-check mr-1"></i>Copied!'; setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy mr-1"></i>Copy' }, 1500) })
        }))
      } else {
        out.className = 'mt-3 text-xs text-amber-400'
        out.textContent = '⚠ ' + (d.error || 'AI unavailable — works in production on Cloudflare.')
      }
    } catch (e) {
      out.className = 'mt-3 text-xs text-amber-400'
      out.textContent = '⚠ AI unavailable in this environment — works in production on Cloudflare.'
    }
    socBtn.disabled = false
    socBtn.innerHTML = '<i class="fas fa-wand-magic-sparkles mr-1"></i>AI Social Posts'
  })
}

// Countdown timers on templates (data-deadline attr = ISO date)
document.querySelectorAll('[data-countdown]').forEach(el => {
  const deadline = new Date(el.dataset.countdown).getTime()
  const tick = () => {
    const diff = deadline - Date.now()
    if (diff <= 0) { el.textContent = 'OFFER EXPIRED'; return }
    const d = Math.floor(diff / 86400000), h = Math.floor(diff % 86400000 / 3600000),
          m = Math.floor(diff % 3600000 / 60000), s = Math.floor(diff % 60000 / 1000)
    el.textContent = `${d}d ${h}h ${m}m ${s}s`
  }
  tick(); setInterval(tick, 1000)
})

// ── v2.0: Lead capture forms → POST /api/lead ─────────────────
document.querySelectorAll('[data-lead-form]').forEach(form => {
  // v3.5: spam honeypot — invisible field humans never fill, bots auto-fill
  if (!form.querySelector('input[name="_website"]')) {
    const hp = document.createElement('input')
    hp.type = 'text'; hp.name = '_website'; hp.value = ''
    hp.tabIndex = -1; hp.autocomplete = 'off'; hp.setAttribute('aria-hidden', 'true')
    hp.style.cssText = 'position:absolute;left:-9999px;top:-9999px;height:1px;width:1px;opacity:0;pointer-events:none'
    form.appendChild(hp)
  }
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const btn = form.querySelector('[type="submit"], button:not([type])')
    const orig = btn ? btn.innerHTML : ''
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending…' }
    const data = { _source: location.pathname + location.search }
    // v2.2: merge UTM / click-id attribution captured by funnel-extras.js
    try { Object.assign(data, JSON.parse(sessionStorage.getItem('rjf_attrs') || '{}')) } catch (e) {}
    // v3.1: GoHighLevel custom tags from ?ghlTag= funnel param
    if ((window.__RJF || {}).ghlTag) data._ghlTag = window.__RJF.ghlTag
    form.querySelectorAll('input, textarea, select').forEach(inp => {
      if (inp.type === 'checkbox') { data[inp.name || 'consent'] = inp.checked ? 'yes' : 'no' }
      else if (inp.name && inp.value.trim()) data[inp.name] = inp.value.trim()
    })
    const endpoint = form.dataset.leadForm && form.dataset.leadForm.startsWith('http') ? form.dataset.leadForm : '/api/lead'
    try {
      const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!r.ok) throw new Error('HTTP ' + r.status)
      if (btn) { btn.innerHTML = '<i class="fas fa-check mr-2"></i>Submitted! We\'ll be in touch.'; btn.classList.add('!bg-emerald-600') }
      form.querySelectorAll('input:not([type=checkbox]), textarea').forEach(i => i.value = '')
      // v2.2: conversion event to any loaded pixel + optional thank-you redirect (?redirect=)
      if (window.rjfTrack) window.rjfTrack('generate_lead', { source: data._source })
      const redirect = (window.__RJF || {}).redirect
      if (redirect) setTimeout(() => { location.href = redirect }, 900)
    } catch (err) {
      if (btn) { btn.disabled = false; btn.innerHTML = orig }
      alert('Something went wrong sending your info — please try again or call us directly.')
    }
  })
})

// ── v2.0: SEO Pack Generator (/seo page) ──────────────────────
const seoForm = document.getElementById('seo-form')
if (seoForm) {
  seoForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    seoForm.querySelectorAll('input, textarea, select').forEach(i => { if (i.name && i.value.trim()) params.set(i.name, i.value.trim()) })
    const r = await fetch('/api/seo-pack?' + params.toString())
    const d = await r.json()
    if (!d.ok) return alert('Generation failed')

    const metaLines = Object.entries(d.meta).filter(([k]) => k !== 'title').map(([k, v]) =>
      k === 'canonical' ? `<link rel="canonical" href="${v}">` : (v ? `<meta name="${k}" content="${v}">` : '')
    ).filter(Boolean)
    const ogLines = Object.entries(d.openGraph).map(([k, v]) => `<meta property="${k}" content="${v}">`)
    const twLines = Object.entries(d.twitter).map(([k, v]) => `<meta name="${k}" content="${v}">`)
    const schema = JSON.parse(JSON.stringify(d.jsonLd)); schema['@type'] = params.get('niche') || schema['@type']

    document.getElementById('seo-out-head').textContent =
      `<title>${d.meta.title}</title>\n` + metaLines.join('\n') + '\n' + ogLines.join('\n') + '\n' + twLines.join('\n') +
      `\n<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n<\/script>`
    document.getElementById('seo-out-schema').textContent = JSON.stringify(schema, null, 2)
    document.getElementById('seo-out-sitemap').textContent = d.sitemapXml
    document.getElementById('seo-out-robots').textContent = d.robotsTxt

    const name = params.get('name'), city = params.get('city') || '', desc = params.get('desc')
    document.getElementById('seo-out-aeo').textContent =
`<!-- AEO Answer Block — place high on the page, wrap FAQ in FAQPage schema -->
<section id="quick-answer">
  <h2>What is ${name}?</h2>
  <p>${desc} ${city ? 'Serving ' + city + ' and surrounding areas.' : ''}</p>

  <h2>How much does ${name} cost?</h2>
  <p>[Direct 40–60 word answer with a real price range — AI engines quote this verbatim.]</p>

  <h2>Why choose ${name}${city ? ' in ' + city : ''}?</h2>
  <p>[3 concrete differentiators with numbers — stats get cited by AI Overviews.]</p>
</section>`
    document.getElementById('seo-output').classList.remove('hidden')
    document.getElementById('seo-output').scrollIntoView({ behavior: 'smooth' })
  })
}

// ── v2.2: Universal Stripe checkout buttons ────────────────────
// Usage: <button data-checkout='{"priceId":"price_xxx"}'>Buy</button>
//    or: <button data-checkout='{"name":"Setup","amount":199700,"interval":"month"}'>Subscribe</button>
document.querySelectorAll('[data-checkout]').forEach(btn => {
  btn.addEventListener('click', async () => {
    let payload
    try { payload = JSON.parse(btn.dataset.checkout) } catch (e) { return alert('Invalid checkout config on this button.') }
    const orig = btn.innerHTML
    btn.disabled = true
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Opening secure checkout…'
    try {
      const r = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const d = await r.json()
      if (d.url) {
        if (window.rjfTrack) window.rjfTrack('begin_checkout', { name: payload.name || payload.priceId })
        location.href = d.url
      } else {
        alert(d.error || 'Checkout is not configured yet — add your STRIPE_SECRET_KEY (see /integrations).')
        btn.disabled = false; btn.innerHTML = orig
      }
    } catch (e) {
      alert('Could not reach checkout — please try again.')
      btn.disabled = false; btn.innerHTML = orig
    }
  })
})

// ── v2.2: /integrations live status badges ─────────────────────
const intStripe = document.getElementById('int-status-stripe')
if (intStripe) {
  fetch('/api/health').then(r => r.json()).then(d => {
    const set = (el, ok, label) => {
      el.className = ok
        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-full'
        : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-full'
      el.innerHTML = el.innerHTML.split('</i>')[0] + '</i>' + label + (ok ? ': connected ✓' : ': key not set')
    }
    set(intStripe, d.stripe, 'Stripe')
    set(document.getElementById('int-status-email'), d.email, 'Email')
    // v3.4: fan-out channel badges
    if (d.hooks) {
      const labels = { webhook: 'Zapier/Make', slack: 'Slack', discord: 'Discord', telegram: 'Telegram', twilio: 'Twilio SMS', airtable: 'Airtable' }
      Object.keys(labels).forEach(k => {
        const el = document.getElementById('int-status-' + k)
        if (el) set(el, d.hooks[k], labels[k])
      })
    }
  }).catch(() => {})

  // v3.4: test-all-channels button
  const hooksBtn = document.getElementById('btn-hooks-test')
  if (hooksBtn) hooksBtn.addEventListener('click', async () => {
    const out = document.getElementById('hooks-test-out')
    hooksBtn.disabled = true
    hooksBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i>Sending…'
    out.classList.remove('hidden')
    out.textContent = 'Firing test alert to every configured channel…'
    try {
      const r = await fetch('/api/hooks/test', { method: 'POST' })
      const d = await r.json()
      if (d.results && d.results.length) {
        out.textContent = d.results.map(x => (x.ok ? '✓ ' + x.channel + ': delivered' : '✗ ' + x.channel + ': ' + (x.error || 'failed'))).join('\n')
      } else {
        out.textContent = '⚠ ' + (d.error || 'No channels configured yet — set at least one secret above.')
      }
    } catch (e) {
      out.textContent = '⚠ Could not reach the test endpoint.'
    }
    hooksBtn.disabled = false
    hooksBtn.innerHTML = '<i class="fas fa-paper-plane mr-1"></i>Send Test Alert'
  })
  // v3.1: GoHighLevel deep status (live API connection check, not just key presence)
  const intGhl = document.getElementById('int-status-ghl')
  if (intGhl) {
    fetch('/api/ghl/status').then(r => r.json()).then(d => {
      const ok = d.connected
      intGhl.className = ok
        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-full'
        : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-full'
      intGhl.innerHTML = intGhl.innerHTML.split('</i>')[0] + '</i>GoHighLevel: ' + (ok
        ? 'connected ✓' + (d.location && d.location.name ? ' (' + d.location.name + ')' : '') + (d.pipeline ? ' · pipeline on' : '') + (d.workflow ? ' · workflow on' : '')
        : d.configured ? 'auth failed — check token/location' : 'keys not set')
    }).catch(() => {})
  }
}
