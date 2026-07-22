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
  }).catch(() => {})
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
