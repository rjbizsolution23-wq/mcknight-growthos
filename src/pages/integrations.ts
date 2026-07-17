import { shell, copyBlock } from './layout'

export const integrationsPage = () => shell('Integrations', 'integrations', `
<section id="int-hero" class="mb-10">
  <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-2"><i class="fas fa-plug grad-text mr-2"></i>Integrations — <span class="grad-text">Stripe & Email</span></h1>
  <p class="text-gray-400 max-w-3xl">Payments and lead delivery are wired into every funnel out of the box. Add two secrets and you're live — no code changes.</p>
  <div id="int-status" class="mt-4 flex gap-3 text-xs">
    <span id="int-status-stripe" class="bg-gray-800 text-gray-400 px-3 py-1.5 rounded-full"><i class="fab fa-stripe mr-1"></i>Stripe: checking…</span>
    <span id="int-status-email" class="bg-gray-800 text-gray-400 px-3 py-1.5 rounded-full"><i class="fas fa-envelope mr-1"></i>Email: checking…</span>
  </div>
</section>

<!-- STRIPE -->
<section id="int-stripe" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fab fa-stripe text-brand-cyan mr-2"></i>Stripe Payments</h2>
  <div class="grid lg:grid-cols-2 gap-6 mb-4">
    <div class="card p-6">
      <h3 class="font-bold text-white mb-3">1 · Setup (2 minutes)</h3>
      <ol class="text-sm text-gray-300 space-y-2 list-decimal list-inside">
        <li>Grab your secret key from <span class="text-blue-300">dashboard.stripe.com → Developers → API keys</span></li>
        <li>Local: copy <code class="text-blue-300">.dev.vars.example</code> → <code class="text-blue-300">.dev.vars</code>, paste key</li>
        <li>Production: <code class="text-blue-300">npx wrangler pages secret put STRIPE_SECRET_KEY</code></li>
        <li>Done. <code class="text-blue-300">POST /api/checkout</code> is live.</li>
      </ol>
      <div class="mt-4 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-xs text-amber-200">
        <i class="fas fa-shield-halved mr-1"></i><strong>Security:</strong> the secret key lives server-side only — never in frontend code, never in git. Test with <code>sk_test_</code> keys first.
      </div>
    </div>
    <div class="card p-6">
      <h3 class="font-bold text-white mb-3">2 · Use it — two modes</h3>
      <p class="text-xs text-gray-400 mb-2 font-semibold uppercase">A — Existing Stripe Price ID (recommended)</p>
      <pre class="text-xs text-gray-300 bg-[#060a14] rounded-lg p-3 mb-3">fetch('/api/checkout', { method:'POST',
  headers:{'Content-Type':'application/json'},
  body: JSON.stringify({ priceId:'price_xxx' })
}).then(r=>r.json()).then(d=>location.href=d.url)</pre>
      <p class="text-xs text-gray-400 mb-2 font-semibold uppercase">B — Ad-hoc price (one-time or subscription)</p>
      <pre class="text-xs text-gray-300 bg-[#060a14] rounded-lg p-3">// One-time $1,997 setup
{ name:'DFY Social Growth — Setup', amount:199700 }
// $997/mo subscription
{ name:'DFY Social Growth — Monthly', amount:99700, interval:'month' }</pre>
    </div>
  </div>
  ${copyBlock('int-stripe-button', 'Drop-in checkout button (paste into any funnel/page)', `<button onclick="fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'DFY Social Growth — Setup',amount:199700})}).then(r=>r.json()).then(d=>{if(d.url)location.href=d.url;else alert(d.error)})" style="background:linear-gradient(135deg,#2563eb,#0ea5e9);color:#fff;font-weight:700;padding:16px 40px;border-radius:16px;border:none;font-size:18px;cursor:pointer">Get Started — $1,997 →</button>`)}
  ${copyBlock('int-stripe-tiers', 'RJ 3-tier pricing wiring (Free / Pro / Enterprise pattern)', `// Tier buttons — swap in your real Stripe Price IDs
const TIERS = {
  starter:    { priceId: 'price_STARTER_ID' },     // e.g. $497/mo
  pro:        { priceId: 'price_PRO_ID' },         // e.g. $997/mo  ← "Most Popular"
  enterprise: { priceId: 'price_ENTERPRISE_ID' }   // e.g. $2,497/mo
}
document.querySelectorAll('[data-tier]').forEach(btn => btn.addEventListener('click', async () => {
  const r = await fetch('/api/checkout', { method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify(TIERS[btn.dataset.tier]) })
  const d = await r.json()
  if (d.url) location.href = d.url; else alert(d.error)
}))`)}
</section>

<!-- EMAIL -->
<section id="int-email" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-envelope-open-text text-brand-cyan mr-2"></i>Email / Lead Delivery (Resend)</h2>
  <div class="grid lg:grid-cols-2 gap-6 mb-4">
    <div class="card p-6">
      <h3 class="font-bold text-white mb-3">1 · Setup (3 minutes)</h3>
      <ol class="text-sm text-gray-300 space-y-2 list-decimal list-inside">
        <li>Free account at <span class="text-blue-300">resend.com</span> (3,000 emails/mo free)</li>
        <li>Verify your sending domain (or use onboarding@resend.dev to test)</li>
        <li>Local: add <code class="text-blue-300">RESEND_API_KEY</code> + <code class="text-blue-300">LEAD_NOTIFY_EMAIL</code> to <code class="text-blue-300">.dev.vars</code></li>
        <li>Production: <code class="text-blue-300">npx wrangler pages secret put RESEND_API_KEY</code></li>
      </ol>
      <div class="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-xs text-blue-200">
        <i class="fas fa-wand-magic-sparkles mr-1"></i><strong>Already wired:</strong> all 8 lead-capture funnels (real estate, coaching, law, home services, med spa, insurance, agency, tax) POST to <code>/api/lead</code> automatically. You get a branded RJ Blue lead email for every submission.
      </div>
    </div>
    <div class="card p-6">
      <h3 class="font-bold text-white mb-3">2 · How the funnel forms behave</h3>
      <ul class="text-sm text-gray-300 space-y-2">
        <li><i class="fas fa-check text-emerald-400 mr-2"></i>Form fields auto-serialize to JSON + <code class="text-blue-300">_source</code> (page URL)</li>
        <li><i class="fas fa-check text-emerald-400 mr-2"></i>Button shows spinner → "✓ Submitted!" state</li>
        <li><i class="fas fa-check text-emerald-400 mr-2"></i>No API key yet? Lead still accepted (never breaks the funnel) — you just don't get the email until configured</li>
        <li><i class="fas fa-check text-emerald-400 mr-2"></i>TCPA consent checkboxes remain required on regulated verticals</li>
      </ul>
      <p class="text-xs text-gray-500 mt-3">Want leads in a CRM/GoHighLevel instead? Point the form at your webhook: change <code>data-lead-form</code> to <code>data-lead-form="https://your-webhook-url"</code>.</p>
    </div>
  </div>
  ${copyBlock('int-lead-test', 'Test the lead API from terminal', `curl -X POST https://YOUR-DOMAIN/api/lead \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Test Lead","email":"test@example.com","phone":"(505) 555-0100","_source":"manual-test"}'`)}
  ${copyBlock('int-lead-form', 'Add lead capture to ANY custom page', `<form data-lead-form>
  <input name="name" placeholder="Full name" required>
  <input name="email" type="email" placeholder="Email" required>
  <input name="phone" type="tel" placeholder="Phone">
  <label><input type="checkbox" required> I agree to be contacted by phone/text/email. Consent not required to purchase.</label>
  <button type="submit">Send My Info →</button>
</form>
<script src="/static/app.js"><\/script>`)}
</section>

<!-- SECRETS REFERENCE -->
<section id="int-secrets" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-key text-brand-cyan mr-2"></i>Secrets Reference</h2>
  <div class="card p-6 overflow-x-auto">
    <table class="w-full text-xs text-left">
      <thead><tr class="text-blue-300 border-b border-blue-900/50"><th class="py-2 pr-4">Secret</th><th class="py-2 pr-4">Used by</th><th class="py-2 pr-4">Required for</th><th class="py-2">Set with</th></tr></thead>
      <tbody class="text-gray-300 divide-y divide-blue-900/30">
        <tr><td class="py-2 pr-4 font-mono text-blue-300">STRIPE_SECRET_KEY</td><td class="py-2 pr-4">/api/checkout</td><td class="py-2 pr-4">Payments</td><td class="py-2 font-mono">wrangler pages secret put STRIPE_SECRET_KEY</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">RESEND_API_KEY</td><td class="py-2 pr-4">/api/lead</td><td class="py-2 pr-4">Lead emails</td><td class="py-2 font-mono">wrangler pages secret put RESEND_API_KEY</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">LEAD_NOTIFY_EMAIL</td><td class="py-2 pr-4">/api/lead</td><td class="py-2 pr-4">Where leads land (default: support@rjbusinesssolutions.org)</td><td class="py-2 font-mono">wrangler pages secret put LEAD_NOTIFY_EMAIL</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">LEAD_FROM_EMAIL</td><td class="py-2 pr-4">/api/lead</td><td class="py-2 pr-4">Sender identity (verified domain)</td><td class="py-2 font-mono">wrangler pages secret put LEAD_FROM_EMAIL</td></tr>
      </tbody>
    </table>
  </div>
</section>
`)
