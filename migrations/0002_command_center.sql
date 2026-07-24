-- v2.0.0 — Ultimate Funnel Command: Key Vault, AI copy agents, per-funnel analytics, mailer

-- Key Vault: integration keys uploaded from the UI (merged over env secrets)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- AI agent copy overrides: per-funnel optimized copy applied as default params
CREATE TABLE IF NOT EXISTS copy_overrides (
  funnel TEXT PRIMARY KEY,
  overrides TEXT NOT NULL,           -- JSON of param overrides (seoTitle, seoDesc, ...)
  agent TEXT DEFAULT 'seo-agent',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Per-funnel daily view counts (conversion analytics)
CREATE TABLE IF NOT EXISTS funnel_views (
  funnel TEXT NOT NULL,
  day TEXT NOT NULL,                 -- YYYY-MM-DD
  views INTEGER DEFAULT 0,
  PRIMARY KEY (funnel, day)
);

-- Agent activity log
CREATE TABLE IF NOT EXISTS agent_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent TEXT NOT NULL,
  funnel TEXT,
  action TEXT NOT NULL,
  detail TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_agent_log_created ON agent_log(created_at);

-- Mailer send log
CREATE TABLE IF NOT EXISTS mail_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT,
  to_count INTEGER DEFAULT 0,
  subject TEXT,
  funnel TEXT,                       -- segment sent to ('' = all)
  ok INTEGER DEFAULT 0,
  error TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
