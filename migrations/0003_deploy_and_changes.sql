-- v3.0 Ultimate Funnel Command: Cloudflare Deploy + Change Agent
-- cf_deployments: every funnel deployed to a user's own Cloudflare account
CREATE TABLE IF NOT EXISTS cf_deployments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  funnel TEXT NOT NULL,
  worker_name TEXT NOT NULL,
  url TEXT NOT NULL,
  account_id TEXT NOT NULL,
  params TEXT,                          -- JSON of baked-in customization params
  status TEXT DEFAULT 'active',         -- active | deleted | failed
  error TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_cf_deployments_funnel ON cf_deployments(funnel);
CREATE INDEX IF NOT EXISTS idx_cf_deployments_status ON cf_deployments(status);

-- change_requests: every plain-English change the Change Agent processes
CREATE TABLE IF NOT EXISTS change_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  funnel TEXT NOT NULL,
  request TEXT NOT NULL,                -- the user's plain-English ask
  changes TEXT,                         -- JSON of {param: value} the agent decided
  summary TEXT,                         -- agent's human-readable explanation
  status TEXT DEFAULT 'applied',        -- applied | rejected | reverted
  error TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_change_requests_funnel ON change_requests(funnel);
