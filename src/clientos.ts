// ── McKnight ClientOS — CRM + client-operations engine ─────────
// GrowthOS captures the lead. ClientOS manages everything after:
// Client 360, per-brand pipelines, unified timeline, tasks, tickets,
// referrals and transparent health scoring.
//
// "Every client. Every conversation. Every next step. Connected."

export type ClientOsEnv = { DB?: any }

// ── Controlled lifecycle (one vocabulary platform-wide) ────────
export const LIFECYCLE_STAGES = [
  'visitor', 'lead', 'mql', 'sql', 'consultation_scheduled', 'consultation_completed',
  'proposal_sent', 'negotiation', 'contract_sent', 'payment_pending', 'onboarding',
  'active', 'service_delivery', 'review_required', 'completed', 'renewal',
  'retained', 'referral_partner', 'inactive', 'lost', 'do_not_contact',
] as const

// ── Brand registry (portal branding + data separation labels) ──
export const BRANDS: Record<string, { name: string; icon: string; color: string }> = {
  growthos:      { name: 'McKnight GrowthOS',            icon: 'fa-rocket',        color: '#0ea5e9' },
  contracting:   { name: 'The Contracting Preacher',     icon: 'fa-file-contract', color: '#d4a72c' },
  capital:       { name: 'McKnight Capital Ready',       icon: 'fa-coins',         color: '#059669' },
  mortgage:      { name: 'McKnight MortgageOS',          icon: 'fa-house-chimney', color: '#2563eb' },
  housing:       { name: 'McKnight Housing Initiative',  icon: 'fa-building',      color: '#16a34a' },
  freight:       { name: 'McKnight Freight Systems',     icon: 'fa-truck',         color: '#4682b4' },
  fleetworks:    { name: 'McKnight FleetWorks',          icon: 'fa-wrench',        color: '#f97316' },
  learning:      { name: 'McKnight LearningOS',          icon: 'fa-graduation-cap',color: '#7c3aed' },
}

// ── Per-brand pipelines (blueprint section 5, verbatim stages) ─
export const PIPELINES: Record<string, { name: string; brand: string; stages: string[] }> = {
  consulting: {
    name: 'General Consulting', brand: 'growthos',
    stages: ['New Lead', 'Contacted', 'Qualified', 'Strategy Call', 'Proposal', 'Contract', 'Deposit', 'Onboarding', 'Active', 'Completed', 'Renewal'],
  },
  govcon: {
    name: 'Government Contracting', brand: 'contracting',
    stages: ['Business Intake', 'Readiness Review', 'Registration', 'Certification', 'Opportunity Match', 'Bid/No-Bid', 'Proposal Development', 'Submitted', 'Awarded/Lost', 'Contract Performance'],
  },
  capital: {
    name: 'Capital Readiness', brand: 'capital',
    stages: ['Intake', 'Identity Verification', 'Credit Education', 'Business Readiness', 'Documentation Gaps', 'Funding Match', 'Application Review', 'Authorized Submission', 'Approved/Declined', 'Follow-Up'],
  },
  housing: {
    name: 'Housing', brand: 'housing',
    stages: ['Inquiry', 'Prescreen', 'Application', 'Documents Pending', 'Eligibility Review', 'Waitlist', 'Interview', 'Approved/Declined', 'Placement', 'Resident Services'],
  },
  mortgage: {
    name: 'Mortgage Technology', brand: 'mortgage',
    stages: ['Developer Lead', 'Sandbox', 'API Evaluation', 'Technical Review', 'Security Review', 'Proposal', 'Subscription', 'Integration', 'Production', 'Expansion'],
  },
  trucking: {
    name: 'Trucking', brand: 'freight',
    stages: ['Driver/Customer Lead', 'Qualification', 'Documents', 'Orientation', 'Agreement', 'Activation', 'Dispatch/Service', 'Performance Review'],
  },
  fleetrepair: {
    name: 'Fleet Repair', brand: 'fleetworks',
    stages: ['Service Request', 'Inspection', 'Estimate', 'Authorization', 'Parts', 'Repair', 'Quality Check', 'Invoice', 'Pickup', 'Maintenance Reminder'],
  },
  childcare: {
    name: 'Childcare', brand: 'learning',
    stages: ['Family Inquiry', 'Tour', 'Application', 'Waitlist', 'Enrollment Offer', 'Documents', 'Tuition Setup', 'Classroom Placement', 'Active Enrollment', 'Renewal/Withdrawal'],
  },
}

// ── Funnel slug → pipeline routing (lead auto-conversion) ──────
// Every GrowthOS funnel maps to the right brand pipeline so a captured
// lead lands as a client + opportunity in the correct vertical CRM.
export const FUNNEL_PIPELINE: Record<string, string> = {
  'tax-lead': 'capital', 'credit-service': 'capital', 'credit-saas': 'capital',
  'mortgage': 'mortgage',
  'real-estate': 'housing', 'wedding-venue': 'consulting',
  'moving': 'trucking',
  'auto-services': 'fleetrepair',
  'childcare': 'childcare', 'tutoring': 'childcare',
  'agency': 'consulting', 'coaching': 'consulting', 'saas-trial': 'consulting',
  'event-landing': 'consulting', 'sponsor-deck': 'govcon',
  'law-firm': 'consulting', 'accounting': 'capital', 'insurance': 'consulting',
  'webinar-live': 'consulting', 'vsl': 'consulting', 'get-growthos': 'consulting',
  // v6.0 brand flagship sites — each feeds its own brand pipeline
  'opportunity-group': 'consulting',
  'contracting-preacher': 'govcon',
  'housing-initiative': 'housing',
  'capital-ready': 'capital',
  'mortgageos': 'mortgage',
  'growth-command': 'consulting',
  'freight-systems': 'trucking',
  'fleetworks': 'fleetrepair',
  'early-learning': 'childcare',
  'learningos': 'childcare',
  // everything else falls through to 'consulting'
}
export const pipelineForFunnel = (funnel: string | undefined): string =>
  (funnel && FUNNEL_PIPELINE[funnel]) || 'consulting'

// ── Transparent client health score (blueprint section 23) ─────
// Operational factors only — NEVER protected demographics.
export const HEALTH_FACTORS = [
  { key: 'onboarding',   label: 'Onboarding completion',      weight: 15 },
  { key: 'documents',    label: 'Document readiness',          weight: 15 },
  { key: 'engagement',   label: 'Communication engagement',    weight: 10 },
  { key: 'attendance',   label: 'Appointment attendance',      weight: 10 },
  { key: 'payment',      label: 'Payment standing',            weight: 15 },
  { key: 'progress',     label: 'Project progress',            weight: 15 },
  { key: 'sentiment',    label: 'Support sentiment',           weight: 10 },
  { key: 'renewal',      label: 'Renewal likelihood',          weight: 10 },
] as const

export const healthBand = (score: number): { band: string; color: string } => {
  if (score >= 90) return { band: 'Thriving', color: '#059669' }
  if (score >= 75) return { band: 'Healthy', color: '#10b981' }
  if (score >= 60) return { band: 'Needs attention', color: '#f59e0b' }
  if (score >= 40) return { band: 'At risk', color: '#f97316' }
  return { band: 'Immediate intervention', color: '#dc2626' }
}

// Compute health from live operational data — every factor explained.
export const computeHealth = async (env: ClientOsEnv, clientId: number): Promise<{ score: number; factors: Array<{ label: string; weight: number; earned: number; why: string }> }> => {
  const f: Array<{ label: string; weight: number; earned: number; why: string }> = []
  const db = env.DB
  const client = await db?.prepare('SELECT * FROM clients WHERE id = ?').bind(clientId).first()
  if (!client) return { score: 0, factors: [] }

  // Onboarding completion (15) — lifecycle progressed past onboarding
  const STAGE_IDX: Record<string, number> = {}; LIFECYCLE_STAGES.forEach((s, i) => STAGE_IDX[s] = i)
  const idx = STAGE_IDX[client.lifecycle_stage] ?? 1
  const onb = idx >= STAGE_IDX['active'] ? 15 : idx >= STAGE_IDX['onboarding'] ? 10 : idx >= STAGE_IDX['contract_sent'] ? 6 : 3
  f.push({ label: 'Onboarding completion', weight: 15, earned: onb, why: `Lifecycle stage: ${client.lifecycle_stage}` })

  // Document readiness (15)
  const docs = await db?.prepare("SELECT COUNT(*) as total, SUM(CASE WHEN verification_status='verified' THEN 1 ELSE 0 END) as ok, SUM(CASE WHEN expiration_date IS NOT NULL AND expiration_date < date('now') THEN 1 ELSE 0 END) as expired FROM client_documents WHERE client_id = ?").bind(clientId).first()
  const dr = !docs?.total ? 8 : docs.expired > 0 ? 4 : Math.round(15 * (docs.ok / docs.total))
  f.push({ label: 'Document readiness', weight: 15, earned: dr, why: docs?.total ? `${docs.ok}/${docs.total} verified, ${docs.expired} expired` : 'No documents requested yet (neutral)' })

  // Communication engagement (10) — activity in last 30 days
  const acts = await db?.prepare("SELECT COUNT(*) as n FROM activities WHERE client_id = ? AND created_at >= datetime('now','-30 day')").bind(clientId).first()
  const eng = Math.min(10, (acts?.n || 0) * 2)
  f.push({ label: 'Communication engagement', weight: 10, earned: eng, why: `${acts?.n || 0} timeline events in last 30 days` })

  // Appointment attendance (10) — webinar/meeting activity kinds
  const meet = await db?.prepare("SELECT COUNT(*) as n FROM activities WHERE client_id = ? AND kind IN ('meeting','webinar')").bind(clientId).first()
  const att = meet?.n ? 10 : 5
  f.push({ label: 'Appointment attendance', weight: 10, earned: att, why: meet?.n ? `${meet.n} meetings/webinars attended` : 'No meetings yet (neutral)' })

  // Payment standing (15) — payment activities present, no negative flags
  const pay = await db?.prepare("SELECT COUNT(*) as n FROM activities WHERE client_id = ? AND kind = 'payment'").bind(clientId).first()
  const flags = String(client.risk_flags || '')
  const ps = /payment|overdue|failed/i.test(flags) ? 3 : pay?.n ? 15 : 10
  f.push({ label: 'Payment standing', weight: 15, earned: ps, why: /payment|overdue|failed/i.test(flags) ? `Risk flag: ${flags}` : pay?.n ? `${pay.n} payments recorded` : 'No payment history yet (neutral)' })

  // Project progress (15) — task completion rate
  const tasks = await db?.prepare("SELECT COUNT(*) as total, SUM(CASE WHEN status='done' THEN 1 ELSE 0 END) as done, SUM(CASE WHEN status NOT IN ('done','cancelled') AND due_date IS NOT NULL AND due_date < date('now') THEN 1 ELSE 0 END) as overdue FROM client_tasks WHERE client_id = ?").bind(clientId).first()
  const pp = !tasks?.total ? 10 : tasks.overdue > 0 ? 5 : Math.round(15 * (tasks.done / tasks.total))
  f.push({ label: 'Project progress', weight: 15, earned: pp, why: tasks?.total ? `${tasks.done}/${tasks.total} tasks done, ${tasks.overdue} overdue` : 'No tasks yet (neutral)' })

  // Support sentiment (10) — open/escalated tickets hurt; high CSAT helps
  const tix = await db?.prepare("SELECT COUNT(*) as open, AVG(satisfaction) as csat FROM tickets WHERE client_id = ? AND status NOT IN ('resolved','closed')").bind(clientId).first()
  const ss = tix?.open > 1 ? 3 : tix?.open === 1 ? 6 : 10
  f.push({ label: 'Support sentiment', weight: 10, earned: ss, why: `${tix?.open || 0} open tickets` })

  // Renewal likelihood (10) — recency of contact
  const days = client.last_contact ? Math.floor((Date.now() - new Date(client.last_contact).getTime()) / 86400000) : 999
  const rl = days <= 14 ? 10 : days <= 45 ? 7 : days <= 90 ? 4 : 2
  f.push({ label: 'Renewal likelihood', weight: 10, earned: rl, why: client.last_contact ? `Last contact ${days} days ago` : 'Never contacted' })

  const score = f.reduce((s, x) => s + x.earned, 0)
  try { await db?.prepare('UPDATE clients SET health_score = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(score, clientId).run() } catch { /* best effort */ }
  return { score, factors: f }
}

// ── Timeline helper ────────────────────────────────────────────
export const logActivity = async (env: ClientOsEnv, clientId: number, kind: string, subject: string, body = '', opts: { opportunityId?: number; direction?: string; actor?: string } = {}) => {
  try {
    await env.DB?.prepare('INSERT INTO activities (client_id, opportunity_id, kind, direction, subject, body, actor) VALUES (?,?,?,?,?,?,?)')
      .bind(clientId, opts.opportunityId || null, kind, opts.direction || null, subject.slice(0, 300), body.slice(0, 4000), opts.actor || 'system').run()
    await env.DB?.prepare('UPDATE clients SET last_contact = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(clientId).run()
  } catch { /* timeline is best-effort */ }
}

// ── Lead → Client auto-conversion (the GrowthOS→ClientOS bridge) ──
// Called from /api/lead after D1 save. Upserts by email (fallback phone),
// routes to the right brand pipeline, opens an opportunity, logs timeline.
export const convertLeadToClient = async (
  env: ClientOsEnv,
  lead: Record<string, string>,
  leadId?: number
): Promise<{ ok: boolean; clientId?: number; opportunityId?: number; created?: boolean; error?: string }> => {
  if (!env.DB) return { ok: false, error: 'D1 not bound' }
  try {
    const email = (lead.email || '').toLowerCase().trim()
    const phone = (lead.phone || '').trim()
    if (!email && !phone) return { ok: false, error: 'no identity' }

    const first = (lead.firstName || (lead.name || '').split(/\s+/)[0] || '').slice(0, 80)
    const last = (lead.lastName || (lead.name || '').split(/\s+/).slice(1).join(' ') || '').slice(0, 80)
    const funnel = (lead.funnel || funnelOfSource(lead._source) || '').slice(0, 60)
    const pipeline = pipelineForFunnel(funnel)
    const brand = PIPELINES[pipeline]?.brand || 'growthos'

    // Duplicate match: email first, then phone
    let existing: any = null
    if (email) existing = await env.DB.prepare('SELECT id, lifecycle_stage FROM clients WHERE email = ? LIMIT 1').bind(email).first()
    if (!existing && phone) existing = await env.DB.prepare('SELECT id, lifecycle_stage FROM clients WHERE phone = ? LIMIT 1').bind(phone).first()

    let clientId: number
    let created = false
    if (existing) {
      clientId = existing.id
      await env.DB.prepare('UPDATE clients SET last_contact = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP, funnel = COALESCE(NULLIF(?,\'\'), funnel), campaign = COALESCE(NULLIF(?,\'\'), campaign) WHERE id = ?')
        .bind(funnel, (lead._utm_campaign || lead.utm_campaign || '').slice(0, 120), clientId).run()
    } else {
      created = true
      const r = await env.DB.prepare(`INSERT INTO clients
        (client_type, first_name, last_name, email, phone, business_name, lead_source, campaign, funnel, brand, lifecycle_stage, lead_id,
         consent_email, consent_sms, consent_call, consent_ts, last_contact, next_action)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,?)`)
        .bind(
          lead.business || lead.company ? 'business' : 'person',
          first, last, email || null, phone || null,
          (lead.business || lead.company || '').slice(0, 160) || null,
          (lead._utm_source || lead.utm_source || 'funnel').slice(0, 80),
          (lead._utm_campaign || lead.utm_campaign || '').slice(0, 120) || null,
          funnel || null, brand, 'lead', leadId || null,
          email ? 1 : 0, (lead.consent === 'yes' && phone) ? 1 : 0, (lead.consent === 'yes' && phone) ? 1 : 0,
          'Follow up on new lead'
        ).run()
      clientId = r.meta.last_row_id as number
    }

    // Open (or reuse) an active opportunity in the routed pipeline
    let oppId: number | undefined
    const openOpp = await env.DB.prepare("SELECT id FROM opportunities WHERE client_id = ? AND pipeline = ? AND status = 'open' LIMIT 1").bind(clientId, pipeline).first<any>()
    if (openOpp) {
      oppId = openOpp.id
    } else {
      const firstStage = PIPELINES[pipeline].stages[0]
      const title = `${PIPELINES[pipeline].name} — ${first || email || phone}`.slice(0, 160)
      const o = await env.DB.prepare('INSERT INTO opportunities (client_id, pipeline, stage, title, value) VALUES (?,?,?,?,?)')
        .bind(clientId, pipeline, firstStage, title, parseFloat(lead.estimatedValue || '0') || 0).run()
      oppId = o.meta.last_row_id as number
    }

    await logActivity(env, clientId, created ? 'system' : 'note',
      created ? `Client created from funnel lead${funnel ? ` (${funnel})` : ''}` : `Repeat lead captured${funnel ? ` from ${funnel}` : ''}`,
      `Source: ${lead._source || 'unknown'}${leadId ? ` · GrowthOS lead #${leadId}` : ''} · Routed to ${PIPELINES[pipeline].name} pipeline`,
      { opportunityId: oppId })

    return { ok: true, clientId, opportunityId: oppId, created }
  } catch (e: any) { return { ok: false, error: String(e?.message || e).slice(0, 200) } }
}

const funnelOfSource = (src: string | undefined): string => {
  const m = (src || '').match(/\/t\/([a-z0-9-]+)/)
  return m ? m[1] : ''
}
