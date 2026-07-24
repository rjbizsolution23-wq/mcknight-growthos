// ── GrowthOS Motion Engine v1.0 — framer-style animation layer ──────
// Zero dependencies. Auto-tags every funnel with scroll reveals,
// staggered children, hover-lift cards, glass surfaces, ambient
// gradient blobs, animated stat counters, and the © footer line.
// Respects prefers-reduced-motion (CSS side disables transitions).
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // v6.4 — Style & Effects engine flags (set by funnelHead via URL params /
  // Builder / Change Agent). fx=off kills all JS-driven visual effects too.
  const FX = window.__RJF || {}
  const fxOff = FX.fx === 'off' || reduced
  const heroFxPref = FX.heroFx || '' // aurora | blobs | spotlight | grid | waves | none

  // ── 1 · Ambient gradient blobs in the hero ───────────────────
  const hero = document.querySelector('header') || document.querySelector('section')
  if (hero && !reduced && !fxOff && heroFxPref !== 'none' && heroFxPref !== 'grid' && heroFxPref !== 'spotlight' && heroFxPref !== 'waves' && heroFxPref !== 'aurora') {
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

  // ── 5 · Branded copyright block on every funnel footer (GrowthOS logo + tagline) ──
  const footer = document.querySelector('body > footer, footer:last-of-type')
  if (footer && !footer.querySelector('.mo-copyright')) {
    const wrap = document.createElement('div')
    wrap.className = 'mo-copyright'
    wrap.style.cssText = 'margin-top:18px;display:flex;flex-direction:column;align-items:center;gap:8px;font-size:11px;opacity:.8'
    wrap.innerHTML =
      `<img src="/static/logo.svg" alt="McKnight GrowthOS logo" loading="lazy" style="width:44px;height:44px;border-radius:10px;box-shadow:0 4px 14px rgba(10,22,40,.45)">` +
      `<p style="margin:0;letter-spacing:.14em;text-transform:uppercase;font-size:9px;opacity:.85">Empowering Generational Wealth</p>` +
      `<p style="margin:0">© ${new Date().getFullYear()} All rights reserved. · McKnight GrowthOS · Powered by <a href="https://rjbusinesssolutions.org" style="text-decoration:underline">RJ Business Solutions</a></p>`
    footer.appendChild(wrap)
  }

  // ── 6 · Aurora ambient layer in hero ────────────
  // v6.4: suppressed when heroFx picks a different effect or fx=off
  if (hero && !reduced && !fxOff && !hero.querySelector('.rj-aurora') && (heroFxPref === '' || heroFxPref === 'aurora')) {
    const au = document.createElement('div')
    au.className = 'rj-aurora'
    au.setAttribute('aria-hidden', 'true')
    hero.prepend(au)
  }
  // v6.4: heroFx=aurora on its own (blobs suppressed) still needs positioning
  if (hero && heroFxPref === 'aurora') {
    const cs = getComputedStyle(hero)
    if (cs.position === 'static') hero.style.position = 'relative'
    if (cs.overflow !== 'hidden') hero.style.overflow = 'hidden'
  }

  // ── 6b · v6.4: HERO FX — spotlight & waves (JS-driven variants) ──
  if (hero && !fxOff && (heroFxPref === 'spotlight' || heroFxPref === 'waves' || heroFxPref === 'grid')) {
    const cs = getComputedStyle(hero)
    if (cs.position === 'static') hero.style.position = 'relative'
    if (cs.overflow !== 'hidden') hero.style.overflow = 'hidden'
    if (heroFxPref === 'spotlight') {
      const sp = document.createElement('div')
      sp.setAttribute('aria-hidden', 'true')
      sp.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:0;background:radial-gradient(600px circle at 50% 35%,' + (FX.fxHex2 || '#0ea5e9') + '30,transparent 65%);transition:background .15s ease'
      hero.prepend(sp)
      if (window.matchMedia('(pointer: fine)').matches) {
        let sraf = null
        hero.addEventListener('mousemove', (e) => {
          if (sraf) return
          sraf = requestAnimationFrame(() => {
            const r = hero.getBoundingClientRect()
            sp.style.background = 'radial-gradient(600px circle at ' + (e.clientX - r.left) + 'px ' + (e.clientY - r.top) + 'px,' + (FX.fxHex2 || '#0ea5e9') + '38,transparent 65%)'
            sraf = null
          })
        })
      }
    }
    if (heroFxPref === 'waves') {
      const w = document.createElement('div')
      w.className = 'rj-waves'
      w.setAttribute('aria-hidden', 'true')
      const hx = FX.fxHex || '#0ea5e9'
      w.innerHTML = '<svg width="100%" height="100%" viewBox="0 0 1200 90" preserveAspectRatio="none"><path d="M0,45 C150,85 300,5 450,45 C600,85 750,5 900,45 C1050,85 1200,5 1350,45 L1350,90 L0,90 Z" fill="' + hx + '22"/><path d="M0,55 C180,15 360,90 540,55 C720,20 900,88 1080,55 C1200,35 1300,70 1350,55 L1350,90 L0,90 Z" fill="' + hx + '33"/></svg>'
      hero.appendChild(w)
    }
  }

  // ── 6c · v6.4: PARTICLES — stars/snow/bubbles/fireflies/confetti ──
  if (hero && !fxOff && FX.particles) {
    const kind = FX.particles
    const cs2 = getComputedStyle(hero)
    if (cs2.position === 'static') hero.style.position = 'relative'
    if (cs2.overflow !== 'hidden') hero.style.overflow = 'hidden'
    const cv = document.createElement('canvas')
    cv.setAttribute('aria-hidden', 'true')
    cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0'
    hero.prepend(cv)
    const ctx = cv.getContext('2d')
    const N = kind === 'confetti' ? 70 : kind === 'stars' ? 90 : 45
    const CONF_COLORS = [FX.fxHex || '#d4a72c', FX.fxHex2 || '#0ea5e9', '#f472b6', '#34d399', '#facc15', '#a78bfa']
    let ps = []
    const size = () => { cv.width = hero.offsetWidth; cv.height = hero.offsetHeight }
    const spawn = () => {
      ps = Array.from({ length: N }, () => {
        const r = Math.random()
        return {
          x: Math.random() * cv.width, y: Math.random() * cv.height,
          r: kind === 'bubbles' ? 3 + r * 9 : kind === 'confetti' ? 3 + r * 4 : 0.6 + r * 2.2,
          vx: kind === 'snow' ? (Math.random() - .5) * .5 : (Math.random() - .5) * .3,
          vy: kind === 'snow' ? .35 + r * .8 : kind === 'bubbles' ? -(.3 + r * .8) : kind === 'confetti' ? .5 + r * 1.2 : (Math.random() - .5) * .28,
          a: .25 + Math.random() * .6, tw: Math.random() * Math.PI * 2,
          c: kind === 'confetti' ? CONF_COLORS[Math.floor(Math.random() * CONF_COLORS.length)] : (kind === 'fireflies' ? (FX.fxHex || '#f4ce65') : '#ffffff'),
          rot: Math.random() * Math.PI, vr: (Math.random() - .5) * .1
        }
      })
    }
    size(); spawn()
    let last = 0
    const tick = (t) => {
      if (t - last > 33) { // ~30fps — cheap
        last = t
        ctx.clearRect(0, 0, cv.width, cv.height)
        for (const p of ps) {
          p.x += p.vx; p.y += p.vy; p.tw += .04; p.rot += p.vr
          if (p.y > cv.height + 12) { p.y = -10; p.x = Math.random() * cv.width }
          if (p.y < -12) { p.y = cv.height + 10; p.x = Math.random() * cv.width }
          if (p.x > cv.width + 12) p.x = -10
          if (p.x < -12) p.x = cv.width + 10
          const alpha = kind === 'stars' || kind === 'fireflies' ? p.a * (0.55 + 0.45 * Math.sin(p.tw)) : p.a
          ctx.globalAlpha = alpha
          if (kind === 'confetti') {
            ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c
            ctx.fillRect(-p.r, -p.r * .6, p.r * 2, p.r * 1.2); ctx.restore()
          } else if (kind === 'bubbles') {
            ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.stroke()
          } else {
            ctx.fillStyle = p.c
            if (kind === 'fireflies') { ctx.shadowBlur = 8; ctx.shadowColor = p.c } else ctx.shadowBlur = 0
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
            ctx.shadowBlur = 0
          }
        }
        ctx.globalAlpha = 1
      }
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
    window.addEventListener('resize', () => { size(); spawn() }, { passive: true })
  }

  // ── 6c2 · v6.4: CONFETTI BURST — fired on lead submit (confetti=1) ──
  window.rjfConfettiBurst = () => {
    if (fxOff) return
    const cv = document.createElement('canvas')
    cv.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:100000'
    document.body.appendChild(cv)
    cv.width = innerWidth; cv.height = innerHeight
    const ctx = cv.getContext('2d')
    const COLORS = [FX.fxHex || '#d4a72c', FX.fxHex2 || '#0ea5e9', '#f472b6', '#34d399', '#facc15', '#a78bfa', '#fb7185']
    const ps = Array.from({ length: 160 }, () => ({
      x: innerWidth / 2, y: innerHeight * .55,
      vx: (Math.random() - .5) * 16, vy: -6 - Math.random() * 12,
      r: 4 + Math.random() * 5, rot: Math.random() * Math.PI, vr: (Math.random() - .5) * .3,
      c: COLORS[Math.floor(Math.random() * COLORS.length)], life: 1
    }))
    let frames = 0
    const tick = () => {
      ctx.clearRect(0, 0, cv.width, cv.height)
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy; p.vy += .35; p.vx *= .99; p.rot += p.vr; p.life -= .008
        if (p.life <= 0) continue
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c
        ctx.fillRect(-p.r, -p.r * .55, p.r * 2, p.r * 1.1); ctx.restore()
      }
      ctx.globalAlpha = 1
      if (++frames < 150) requestAnimationFrame(tick); else cv.remove()
    }
    requestAnimationFrame(tick)
  }

  // ── 6d · v6.4: CURSOR FX — glow trail or outline ring ──────────
  if (!fxOff && FX.cursorFx && window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div')
    dot.setAttribute('aria-hidden', 'true')
    const hx = FX.fxHex2 || FX.fxHex || '#0ea5e9'
    dot.style.cssText = FX.cursorFx === 'ring'
      ? 'position:fixed;width:34px;height:34px;border:2px solid ' + hx + ';border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:width .2s,height .2s,opacity .3s;opacity:0;mix-blend-mode:difference'
      : 'position:fixed;width:26px;height:26px;background:radial-gradient(circle,' + hx + '80,transparent 70%);border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);filter:blur(2px);transition:opacity .3s;opacity:0'
    document.body.appendChild(dot)
    let cx = 0, cy = 0, dx = 0, dy = 0, craf = null
    const follow = () => {
      dx += (cx - dx) * .22; dy += (cy - dy) * .22
      dot.style.left = dx + 'px'; dot.style.top = dy + 'px'
      craf = Math.abs(cx - dx) + Math.abs(cy - dy) > .3 ? requestAnimationFrame(follow) : null
    }
    document.addEventListener('mousemove', (e) => {
      cx = e.clientX; cy = e.clientY; dot.style.opacity = '1'
      if (!craf) craf = requestAnimationFrame(follow)
    }, { passive: true })
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0' })
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', () => { if (FX.cursorFx === 'ring') { dot.style.width = '52px'; dot.style.height = '52px' } })
      el.addEventListener('mouseleave', () => { if (FX.cursorFx === 'ring') { dot.style.width = '34px'; dot.style.height = '34px' } })
    })
  }

  // ── 7 · Kinetic hero typography — char-by-char reveal on the H1 ──
  const h1 = hero ? hero.querySelector('h1') : document.querySelector('h1')
  if (h1 && !reduced && h1.textContent.trim().length > 0 && h1.textContent.trim().length <= 120 && !h1.querySelector('img,svg')) {
    const walk = (node, state) => {
      Array.from(node.childNodes).forEach(child => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment()
          child.textContent.split('').forEach(ch => {
            if (ch === ' ') { frag.appendChild(document.createTextNode(' ')); return }
            const s = document.createElement('span')
            s.className = 'rj-ch'
            s.style.setProperty('--ch-d', Math.min(state.i * 22, 1200) + 'ms')
            s.textContent = ch
            frag.appendChild(s)
            state.i++
          })
          node.replaceChild(frag, child)
        } else if (child.nodeType === 1 && !child.classList.contains('rj-ch')) walk(child, state)
      })
    }
    walk(h1, { i: 0 })
    h1.classList.add('rj-kinetic')
  }

  // ── 8 · Magnetic buttons — primary CTAs follow the cursor ──
  if (!reduced && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.pulse-glow, a[class*="grad-bg"], button[type="submit"]').forEach(btn => {
      btn.classList.add('rj-magnetic')
      let raf = null
      btn.addEventListener('mousemove', (e) => {
        if (raf) return
        raf = requestAnimationFrame(() => {
          const r = btn.getBoundingClientRect()
          const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2)
          const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2)
          btn.style.transform = `translate(${dx * 5}px, ${dy * 4}px) scale(1.02)`
          raf = null
        })
      })
      btn.addEventListener('mouseleave', () => { if (raf) { cancelAnimationFrame(raf); raf = null } btn.style.transform = '' })
    })
  }

  // ── 9 · v2.5: 3D tilt on lifted cards (premium depth) ─────────
  if (!reduced && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.mo-lift').forEach(card => {
      card.classList.add('rj-tilt')
      let raf = null
      card.addEventListener('mousemove', (e) => {
        if (raf) return
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect()
          const rx = ((e.clientY - r.top) / r.height - 0.5) * -6
          const ry = ((e.clientX - r.left) / r.width - 0.5) * 8
          card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`
          raf = null
        })
      })
      card.addEventListener('mouseleave', () => { if (raf) { cancelAnimationFrame(raf); raf = null } card.style.transform = '' })
    })
  }

  // ── 10 · v2.5: conic glow border on hero glass cards ──────────
  if (hero) {
    let glowed = 0
    hero.querySelectorAll('.glass-dark, .glass').forEach(el => {
      if (glowed < 2 && el.getBoundingClientRect().width > 180) { el.classList.add('rj-glow-border'); glowed++ }
    })
  }

  // ── 11 · v2.5: animated gradient text on hero stat numbers ────
  if (hero) {
    hero.querySelectorAll('[data-counted], strong, b').forEach(el => {
      const t = (el.textContent || '').trim()
      if (/^[$]?[\d,.]+[%+xXMKmk+]*$/.test(t) && t.length <= 10) el.classList.add('rj-grad-text')
    })
  }

  // ── 12 · v2.5: scroll parallax on hero blobs ──────────────────
  if (!reduced && hero) {
    const blobs = hero.querySelectorAll('.mo-blob')
    if (blobs.length) {
      let praf = null
      window.addEventListener('scroll', () => {
        if (praf) return
        praf = requestAnimationFrame(() => {
          const y = window.scrollY
          blobs.forEach((b, i) => { b.style.marginTop = (y * (i ? 0.12 : -0.08)) + 'px' })
          praf = null
        })
      }, { passive: true })
    }
  }

  // ── 13 · v2.5: blur-in reveal on every 3rd revealed block ─────
  document.querySelectorAll('.mo-reveal').forEach((el, i) => { if (i % 3 === 1) el.classList.add('rj-blur') })


  // ── 14 · v3.0: WHITE-LABEL — client logo injection ────────────
  const wl = window.__RJF || {}
  if (wl.bizLogo && hero) {
    // Hero: client logo badge above the headline
    const h1el = hero.querySelector('h1')
    if (h1el && !hero.querySelector('.rj-client-logo')) {
      const img = document.createElement('img')
      img.src = wl.bizLogo
      img.alt = 'Business logo'
      img.className = 'rj-client-logo'
      img.style.cssText = 'display:block;margin:0 auto 22px;max-height:72px;max-width:220px;object-fit:contain;border-radius:12px;position:relative;z-index:1'
      h1el.parentNode.insertBefore(img, h1el)
    }
    // Footer: client logo replaces the GrowthOS logo (attribution stays as text credit line)
    const wm = document.querySelector('.mo-copyright img')
    if (wm) { wm.src = wl.bizLogo; wm.alt = 'Business logo' }
    const tag = document.querySelector('.mo-copyright p')
    if (tag) tag.style.display = 'none'
  }

})()
