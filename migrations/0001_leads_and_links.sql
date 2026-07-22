-- v3.3.0 — Cloudflare D1: permanent lead storage + short funnel links

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  phone TEXT,
  funnel TEXT,                -- funnel slug, e.g. 'mortgage'
  source TEXT,                -- full _source path
  utm_campaign TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  ghl_contact_id TEXT,        -- GoHighLevel contact id if synced
  status TEXT DEFAULT 'new',  -- new | contacted | qualified | won | lost
  payload TEXT,               -- full JSON of every submitted field
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_funnel ON leads(funnel);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

CREATE TABLE IF NOT EXISTS funnel_links (
  code TEXT PRIMARY KEY,      -- short code, e.g. 'a7x2kq'
  template TEXT NOT NULL,     -- template slug
  params TEXT NOT NULL,       -- URL query string of the saved config
  label TEXT,                 -- optional client/campaign label
  clicks INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_links_created ON funnel_links(created_at);
