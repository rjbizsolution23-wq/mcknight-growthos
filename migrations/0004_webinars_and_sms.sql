-- v4.0 Business Command Center: Zoom webinars + SMS blast engine

CREATE TABLE IF NOT EXISTS webinars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  zoom_id TEXT UNIQUE NOT NULL,
  kind TEXT NOT NULL DEFAULT 'webinar',          -- 'webinar' | 'meeting' (license fallback)
  topic TEXT NOT NULL,
  start_time TEXT,
  duration INTEGER DEFAULT 60,
  timezone TEXT DEFAULT 'America/Chicago',
  agenda TEXT,
  funnel TEXT,                                    -- linked funnel slug (e.g. webinar-live)
  join_url TEXT,
  start_url TEXT,
  registration_url TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled',       -- scheduled | deleted
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_webinars_funnel ON webinars(funnel);
CREATE INDEX IF NOT EXISTS idx_webinars_status ON webinars(status);

CREATE TABLE IF NOT EXISTS webinar_registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  zoom_id TEXT NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  registrant_id TEXT,
  join_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_webreg_zoom ON webinar_registrations(zoom_id);
CREATE INDEX IF NOT EXISTS idx_webreg_email ON webinar_registrations(email);

CREATE TABLE IF NOT EXISTS sms_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  to_count INTEGER NOT NULL DEFAULT 0,
  sent_count INTEGER NOT NULL DEFAULT 0,
  body TEXT NOT NULL,
  funnel TEXT,
  ok INTEGER NOT NULL DEFAULT 0,
  error TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_sms_created ON sms_log(created_at);
