-- MukhBODHITA — Full Database Schema
-- SQLite 3 with WAL mode and foreign keys

PRAGMA journal_mode=WAL;
PRAGMA foreign_keys=ON;

-- ── Users ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT    NOT NULL,
  phone         TEXT    NOT NULL UNIQUE,
  email         TEXT,
  role          TEXT    NOT NULL DEFAULT 'home'
                CHECK (role IN ('asha','home','hospital')),
  worker_id     TEXT    UNIQUE,
  state         TEXT,
  password_hash TEXT    NOT NULL,
  is_admin      INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  last_login    TEXT
);

-- ── Screenings ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS screenings (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sample_type    TEXT    NOT NULL,
  voc_ppm        REAL    NOT NULL,
  bio_kohm       REAL    NOT NULL,
  temp_c         REAL    NOT NULL,
  wellness_score INTEGER NOT NULL,
  verdict        TEXT    NOT NULL
                 CHECK (verdict IN ('BENIGN','MALIGNANT_INDICATORS','INCONCLUSIVE')),
  ai_notes       TEXT,
  location       TEXT,
  screened_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- ── Indexes ────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_screenings_user_id ON screenings(user_id);
CREATE INDEX IF NOT EXISTS idx_screenings_screened_at ON screenings(screened_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_worker_id ON users(worker_id);
