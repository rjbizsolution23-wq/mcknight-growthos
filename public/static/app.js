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
