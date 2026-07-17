// ── RJ Motion Engine v2.1 — framer-style animation layer ──────
// Zero dependencies. Auto-tags every funnel with scroll reveals,
// staggered children, hover-lift cards, glass surfaces, ambient
// gradient blobs, animated stat counters, and the © footer line.
// Respects prefers-reduced-motion (CSS side disables transitions).
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // ── 1 · Ambient gradient blobs in the hero ───────────────────
  const hero = document.querySelector('header') || document.querySelector('section')
  if (hero && !reduced) {
    const cs = getComputedStyle(hero)
    if (cs.position === 'static') hero.style.position = 'relative'
    if (cs.overflow !== 'hidden') hero.style.overflow = 'hidden'
    const blob = (size, top, left, right, bottom, grad, delay) => {
      const b = document.createElement('div')
      b.className = 'mo-blob'
      b.setAttribute('aria-hidden', 'true')
      b.style.cssText = `width:${size}px;height:${size}px;background:${grad};animation-delay:${delay};` +
        (top ? `top:${top};` : '') + (left ? `left:${left};` : '') +
        (right ? `right:${right};` : '') + (bottom ? `bottom:${bottom};` : '')
      hero.prepend(b)
    }
    blob(420, '-120px', '-100px', null, null, 'radial-gradient(circle,#2563eb,transparent 70%)', '0s')
    blob(360, null, null, '-90px', '-110px', 'radial-gradient(circle,#0ea5e9,transparent 70%)', '-8s')
    // keep hero content above the blobs
    Array.from(hero.children).forEach(ch => {
      if (ch.classList.contains('mo-blob')) return
      const p = getComputedStyle(ch)
      if (p.position === 'static') ch.style.position = 'relative'
      if (!ch.style.zIndex) ch.style.zIndex = '1'
    })
  }

  // ── 2 · Card detection: hover-lift + glass surfaces ──────────
  const isCard = (el) => {
    const c = el.className || ''
    return typeof c === 'string' && /rounded-(xl|2xl|3xl)/.test(c) && /(shadow|border|bg-)/.test(c)
  }
  document.querySelectorAll('section [class], header [class]').forEach(el => {
    if (el.tagName === 'A' || el.tagName === 'BUTTON' || el.tagName === 'INPUT') return
    if (isCard(el) && el.querySelector('h2,h3,h4,p') && !el.closest('form')) el.classList.add('mo-lift')
  })

  // Glassmorphism: cards + badge pills living on the dark hero go frosted
  if (hero) {
    hero.querySelectorAll('[class]').forEach(el => {
      const c = el.className
      if (typeof c !== 'string' || el.classList.contains('mo-blob')) return
      // stat cards / boxes inside hero → frosted glass
      if (/rounded-(xl|2xl|3xl)/.test(c) && /bg-(white|gray|slate|blue|cyan|purple|fuchsia|sky|emerald|orange|indigo)-?\d*\/(5|10|15|20|25|30)/.test(c)) {
        el.classList.add('glass-dark')
      }
      // pill badges → subtle glass
      if (/rounded-full/.test(c) && /\/(10|15|20|25)\b/.test(c) && el.tagName === 'P' || (el.tagName === 'SPAN' && /rounded-full/.test(c) && /\/(10|15|20|25)\b/.test(c))) {
        el.style.backdropFilter = 'blur(10px)'
        el.style.webkitBackdropFilter = 'blur(10px)'
        el.style.border = '1px solid rgba(255,255,255,.14)'
      }
    })
  }

  // ── 3 · Scroll reveal with stagger (framer-style) ────────────
  const revealTargets = []
  document.querySelectorAll('section, header, footer').forEach(sec => {
    // pick the section's meaningful direct blocks
    const blocks = []
    const walk = (root, depth) => {
      Array.from(root.children).forEach(ch => {
        if (ch.classList && ch.classList.contains('mo-blob')) return
        const tag = ch.tagName
        if (/^(H1|H2|H3|P|UL|OL|TABLE|BLOCKQUOTE|FORM|IMG)$/.test(tag) || isCard(ch)) blocks.push(ch)
        else if (depth < 3 && /^(DIV|ARTICLE)$/.test(tag)) walk(ch, depth + 1)
      })
    }
    walk(sec, 0)
    blocks.slice(0, 24).forEach((el, i) => {
      el.classList.add('mo-reveal')
      el.style.setProperty('--mo-delay', Math.min(i * 70, 490) + 'ms')
      revealTargets.push(el)
    })
  })
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('mo-in'); io.unobserve(e.target) } })
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    revealTargets.forEach(el => io.observe(el))
    // anything already in view on load pops in immediately
    requestAnimationFrame(() => {
      revealTargets.forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('mo-in') })
    })
  } else {
    revealTargets.forEach(el => el.classList.add('mo-in'))
  }

  // ── 4 · Animated stat counters ("340+", "4.2%", "$12M", "1,200") ─
  const NUM_RE = /^([$]?)([\d,]+(?:\.\d+)?)([%+xX]?|[MKmk]\+?)$/
  const counters = []
  document.querySelectorAll('p, span, div').forEach(el => {
    if (el.children.length || el.hasAttribute('data-countdown') || el.closest('[data-countdown]')) return
    const txt = (el.textContent || '').trim()
    const m = txt.match(NUM_RE)
    if (!m) return
    const num = parseFloat(m[2].replace(/,/g, ''))
    if (!isFinite(num) || num === 0 || num > 10000000) return
    // only animate stat-sized text (big, bold numbers)
    const fs = parseFloat(getComputedStyle(el).fontSize)
    if (fs < 20) return
    counters.push({ el, prefix: m[1], num, suffix: m[3], decimals: (m[2].split('.')[1] || '').length, hasComma: m[2].includes(',') })
  })
  if (counters.length && 'IntersectionObserver' in window && !reduced) {
    const fmt = (c, v) => {
      let s = v.toFixed(c.decimals)
      if (c.hasComma) s = Number(s).toLocaleString('en-US', { minimumFractionDigits: c.decimals, maximumFractionDigits: c.decimals })
      return c.prefix + s + c.suffix
    }
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        cio.unobserve(e.target)
        const c = counters.find(x => x.el === e.target)
        if (!c) return
        const t0 = performance.now(), dur = 1400
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1)
          const ease = 1 - Math.pow(1 - p, 4) // expo-out
          c.el.textContent = fmt(c, c.num * ease)
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      })
    }, { threshold: 0.5 })
    counters.forEach(c => { c.el.style.fontVariantNumeric = 'tabular-nums'; cio.observe(c.el) })
  }

  // ── 5 · Copyright line on every funnel footer ────────────────
  const footer = document.querySelector('body > footer, footer:last-of-type')
  if (footer && !footer.querySelector('.mo-copyright')) {
    const p = document.createElement('p')
    p.className = 'mo-copyright'
    p.style.cssText = 'margin-top:14px;font-size:11px;opacity:.75'
    p.innerHTML = `© ${new Date().getFullYear()} All rights reserved. · Funnel system by <a href="https://rjbusinesssolutions.org" style="text-decoration:underline">RJ Business Solutions</a>`
    footer.appendChild(p)
  }
})()
