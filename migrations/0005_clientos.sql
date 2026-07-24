-- v5.0 McKnight ClientOS: CRM + client operations layer
-- GrowthOS captures the lead. ClientOS manages everything after.

-- ── Client 360 record (person OR business) ─────────────────────
CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_type TEXT NOT NULL DEFAULT 'person',      -- person | business
  -- personal
  first_name TEXT, last_name TEXT, preferred_name TEXT,
  email TEXT, secondary_email TEXT,
  phone TEXT, alt_phone TEXT,
  preferred_channel TEXT DEFAULT 'email',           -- email | sms | call | portal
  language TEXT DEFAULT 'en', timezone TEXT DEFAULT 'America/Chicago',
  address TEXT, city TEXT, state TEXT, zip TEXT, county TEXT,
  -- business
  business_name TEXT, dba TEXT, entity_type TEXT,
  website TEXT, industry TEXT, naics TEXT,
  employees TEXT, revenue_range TEXT,
  uei TEXT, cage TEXT, sam_expiration TEXT,
  certifications TEXT, licenses TEXT,
  business_goals TEXT, funding_needs TEXT,
  -- relationship
  lead_source TEXT, campaign TEXT, funnel TEXT,
  referral_partner TEXT, referral_code TEXT,
  assigned_to TEXT, brand TEXT DEFAULT 'growthos',
  lifecycle_stage TEXT NOT NULL DEFAULT 'lead',
  lead_score INTEGER DEFAULT 0, health_score INTEGER DEFAULT 50,
  account_value REAL DEFAULT 0,
  last_contact DATETIME, next_action TEXT, next_action_due DATETIME,
  tags TEXT, risk_flags TEXT,
  -- consent (TCPA / CAN-SPAM posture)
  consent_email INTEGER DEFAULT 0, consent_sms INTEGER DEFAULT 0, consent_call INTEGER DEFAULT 0,
  consent_ts DATETIME, do_not_contact INTEGER DEFAULT 0,
  lead_id INTEGER,                                   -- link back to GrowthOS lead
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_brand ON clients(brand);
CREATE INDEX IF NOT EXISTS idx_clients_stage ON clients(lifecycle_stage);
CREATE INDEX IF NOT EXISTS idx_clients_assigned ON clients(assigned_to);

-- ── Opportunities: one card per pipeline journey ───────────────
CREATE TABLE IF NOT EXISTS opportunities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  pipeline TEXT NOT NULL DEFAULT 'consulting',
  stage TEXT NOT NULL,
  title TEXT NOT NULL,
  value REAL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'open',              -- open | won | lost
  owner TEXT,
  expected_close TEXT,
  lost_reason TEXT,
  stage_entered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id)
);
CREATE INDEX IF NOT EXISTS idx_opps_client ON opportunities(client_id);
CREATE INDEX IF NOT EXISTS idx_opps_pipeline ON opportunities(pipeline, stage);
CREATE INDEX IF NOT EXISTS idx_opps_status ON opportunities(status);

-- ── Unified timeline: every touch on one client feed ───────────
CREATE TABLE IF NOT EXISTS activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  opportunity_id INTEGER,
  kind TEXT NOT NULL DEFAULT 'note',                -- note | email | sms | call | meeting | stage | task | document | payment | ticket | webinar | system
  direction TEXT,                                    -- in | out
  subject TEXT,
  body TEXT,
  actor TEXT DEFAULT 'system',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id)
);
CREATE INDEX IF NOT EXISTS idx_act_client ON activities(client_id, created_at);

-- ── Tasks (service delivery) ───────────────────────────────────
CREATE TABLE IF NOT EXISTS client_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  opportunity_id INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  assigned_to TEXT,
  priority TEXT DEFAULT 'normal',                   -- low | normal | high | urgent
  status TEXT NOT NULL DEFAULT 'open',              -- open | in_progress | waiting_client | waiting_internal | done | cancelled
  due_date TEXT,
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id)
);
CREATE INDEX IF NOT EXISTS idx_ctasks_client ON client_tasks(client_id);
CREATE INDEX IF NOT EXISTS idx_ctasks_status ON client_tasks(status, due_date);

-- ── Support tickets ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER,
  brand TEXT DEFAULT 'growthos',
  category TEXT DEFAULT 'general',
  priority TEXT DEFAULT 'normal',
  status TEXT NOT NULL DEFAULT 'new',               -- new | assigned | investigating | waiting_client | waiting_internal | escalated | resolved | closed | reopened
  subject TEXT NOT NULL,
  description TEXT,
  assigned_to TEXT,
  resolution TEXT,
  satisfaction INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id)
);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_client ON tickets(client_id);

-- ── Referrals & partners ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS referrals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  referrer_client_id INTEGER,
  referrer_name TEXT,
  referred_client_id INTEGER,
  referred_name TEXT,
  service TEXT,
  brand TEXT DEFAULT 'growthos',
  disclosure_provided INTEGER DEFAULT 0,
  client_consent INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'new',               -- new | contacted | converted | paid | declined
  compensation REAL DEFAULT 0,
  compensation_status TEXT DEFAULT 'n/a',           -- n/a | pending | paid
  conflict_flag INTEGER DEFAULT 0,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_ref_status ON referrals(status);

-- ── Document vault (metadata; files live in R2/external links) ─
CREATE TABLE IF NOT EXISTS client_documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  category TEXT DEFAULT 'general',                  -- identity | formation | tax | banking | contracts | certifications | licenses | insurance | proposals | credit | mortgage | housing | driver | vehicle | repair | childcare | legal | general
  name TEXT NOT NULL,
  url TEXT,
  version INTEGER DEFAULT 1,
  effective_date TEXT, expiration_date TEXT,
  verification_status TEXT DEFAULT 'unverified',    -- unverified | verified | rejected | expired
  verified_by TEXT,
  confidentiality TEXT DEFAULT 'internal',          -- public | internal | restricted
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id)
);
CREATE INDEX IF NOT EXISTS idx_cdocs_client ON client_documents(client_id);
CREATE INDEX IF NOT EXISTS idx_cdocs_expiry ON client_documents(expiration_date);
