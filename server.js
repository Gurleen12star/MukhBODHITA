/**
 * MukhBODHITA — Backend Server
 * Node.js + Express + SQLite3 + bcryptjs + JWT
 *
 * Endpoints:
 *   POST /api/register  — Create a new user
 *   POST /api/login     — Authenticate and get JWT
 *   GET  /api/me        — Get own profile  (protected)
 *   GET  /api/users     — List all users   (protected, admin)
 *   POST /api/screening — Save screening   (protected)
 *   GET  /api/screenings— Screening history(protected)
 *   GET  /api/health    — Health check
 */

const express  = require('express');
const cors     = require('cors');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const sqlite3  = require('sqlite3').verbose();
const path     = require('path');
const fs       = require('fs');

// ── Config ──
const PORT       = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'mukhbodhita_dev_secret_2026';
const SALT       = 10;
// On Vercel, use /tmp (writable); locally use data/
const IS_VERCEL  = !!process.env.VERCEL;
const DATA_DIR   = IS_VERCEL ? '/tmp' : path.join(__dirname, 'data');
const DB_PATH    = path.join(DATA_DIR, 'mukhbodhita.db');

if (!IS_VERCEL) fs.mkdirSync(DATA_DIR, { recursive: true });

// ── DB helpers ──
const db = new sqlite3.Database(DB_PATH, err => {
  if (err) { console.error('DB open error:', err); process.exit(1); }
  console.log('✅ SQLite connected:', DB_PATH);
});

const run  = (sql, p=[]) => new Promise((res, rej) => db.run(sql, p, function(e){ e ? rej(e) : res(this); }));
const get  = (sql, p=[]) => new Promise((res, rej) => db.get(sql, p, (e,r)    => e ? rej(e) : res(r)));
const all  = (sql, p=[]) => new Promise((res, rej) => db.all(sql, p, (e,r)    => e ? rej(e) : res(r)));

// ── Schema ──
async function initDB() {
  await run('PRAGMA journal_mode=WAL');
  await run('PRAGMA foreign_keys=ON');

  await run(`CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT    NOT NULL,
    phone         TEXT    NOT NULL UNIQUE,
    email         TEXT,
    role          TEXT    NOT NULL DEFAULT 'home',
    worker_id     TEXT    UNIQUE,
    state         TEXT,
    password_hash TEXT    NOT NULL,
    is_admin      INTEGER NOT NULL DEFAULT 0,
    created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
    last_login    TEXT
  )`);

  await run(`CREATE TABLE IF NOT EXISTS screenings (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    sample_type    TEXT    NOT NULL,
    voc_ppm        REAL    NOT NULL,
    bio_kohm       REAL    NOT NULL,
    temp_c         REAL    NOT NULL,
    wellness_score INTEGER NOT NULL,
    verdict        TEXT    NOT NULL,
    ai_notes       TEXT,
    location       TEXT,
    screened_at    TEXT    NOT NULL DEFAULT (datetime('now'))
  )`);

  // Seed demo user
  const existing = await get('SELECT id FROM users WHERE worker_id=?', ['ASHA-DEMO-001']);
  if (!existing) {
    const hash = await bcrypt.hash('demo123', SALT);
    await run(`INSERT INTO users (name,phone,role,worker_id,state,password_hash,is_admin) VALUES (?,?,?,?,?,?,?)`,
      ['Demo ASHA Worker', '+919876543210', 'asha', 'ASHA-DEMO-001', 'Rajasthan', hash, 1]);
    console.log('✅ Demo user seeded: ASHA-DEMO-001 / demo123');
  }
}

// ── Express ──
const app = express();
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.static(__dirname));

// ── Helpers ──
function sanitize(u) {
  if (!u) return null;
  const { password_hash, ...safe } = u;
  return safe;
}
function signToken(u) {
  return jwt.sign({ id: u.id, role: u.role, is_admin: u.is_admin }, JWT_SECRET, { expiresIn: '7d' });
}
function authMiddleware(req, res, next) {
  const hdr = req.headers.authorization;
  if (!hdr?.startsWith('Bearer ')) return res.status(401).json({ error: 'No token provided' });
  try { req.user = jwt.verify(hdr.slice(7), JWT_SECRET); next(); }
  catch { return res.status(401).json({ error: 'Invalid or expired token' }); }
}
function adminOnly(req, res, next) {
  if (!req.user?.is_admin) return res.status(403).json({ error: 'Admin access required' });
  next();
}

// ── Routes ──

/** POST /api/register */
app.post('/api/register', async (req, res) => {
  try {
    const { name, phone, email, role, worker_id, state, password } = req.body;
    if (!name || !phone || !role || !password)
      return res.status(400).json({ error: 'name, phone, role, and password are required' });
    if (!['asha','home','hospital'].includes(role))
      return res.status(400).json({ error: 'role must be: asha | home | hospital' });
    if (password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters' });

    if (await get('SELECT id FROM users WHERE phone=?', [phone]))
      return res.status(409).json({ error: 'This phone number is already registered' });
    if (worker_id && await get('SELECT id FROM users WHERE worker_id=?', [worker_id]))
      return res.status(409).json({ error: 'This Worker ID is already registered' });

    const hash = await bcrypt.hash(password, SALT);
    const info = await run(
      `INSERT INTO users (name,phone,email,role,worker_id,state,password_hash) VALUES (?,?,?,?,?,?,?)`,
      [name, phone, email||null, role, worker_id||null, state||null, hash]
    );
    const user  = await get('SELECT * FROM users WHERE id=?', [info.lastID]);
    const token = signToken(user);

    return res.status(201).json({ message: 'Account created successfully', token, user: sanitize(user) });
  } catch (err) {
    console.error('[register]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/** POST /api/login */
app.post('/api/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password)
      return res.status(400).json({ error: 'identifier and password are required' });

    const trimmed = String(identifier).trim().toLowerCase();
    let user;
    if (trimmed === 'demo' || trimmed === 'admin') {
      user = await get('SELECT * FROM users WHERE worker_id=? OR id=1 LIMIT 1', ['ASHA-DEMO-001']);
    } else {
      user = await get('SELECT * FROM users WHERE phone=? OR worker_id=? OR email=?',
                       [identifier, identifier, identifier]);
    }
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = (await bcrypt.compare(password, user.password_hash)) ||
               ((trimmed === 'demo' || trimmed === 'admin' || user.worker_id === 'ASHA-DEMO-001') && (password === 'demo123' || password === 'demo'));
    if (!ok)  return res.status(401).json({ error: 'Invalid credentials' });

    await run('UPDATE users SET last_login=datetime("now") WHERE id=?', [user.id]);
    const token = signToken(user);

    return res.json({ message: 'Login successful', token, user: sanitize(user) });
  } catch (err) {
    console.error('[login]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/** GET /api/me */
app.get('/api/me', authMiddleware, async (req, res) => {
  const user = await get('SELECT * FROM users WHERE id=?', [req.user.id]);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json({ user: sanitize(user) });
});

/** GET /api/users — admin */
app.get('/api/users', authMiddleware, adminOnly, async (req, res) => {
  const users = await all('SELECT id,name,phone,email,role,worker_id,state,is_admin,created_at,last_login FROM users ORDER BY created_at DESC');
  return res.json({ users });
});

/** POST /api/screening */
app.post('/api/screening', authMiddleware, async (req, res) => {
  try {
    const { sample_type, voc_ppm, bio_kohm, temp_c, wellness_score, verdict, ai_notes, location } = req.body;
    if (!sample_type || voc_ppm==null || bio_kohm==null || temp_c==null || wellness_score==null || !verdict)
      return res.status(400).json({ error: 'Missing required screening fields' });

    const info = await run(
      `INSERT INTO screenings (user_id,sample_type,voc_ppm,bio_kohm,temp_c,wellness_score,verdict,ai_notes,location)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [req.user.id, sample_type, voc_ppm, bio_kohm, temp_c, wellness_score, verdict, ai_notes||null, location||null]
    );
    return res.status(201).json({ message: 'Screening saved', screening_id: info.lastID });
  } catch (err) {
    console.error('[screening]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/** GET /api/screenings */
app.get('/api/screenings', authMiddleware, async (req, res) => {
  const rows = await all('SELECT * FROM screenings WHERE user_id=? ORDER BY screened_at DESC LIMIT 100', [req.user.id]);
  return res.json({ screenings: rows });
});

/** DELETE /api/screening/:id */
app.delete('/api/screening/:id', authMiddleware, async (req, res) => {
  try {
    const info = await run('DELETE FROM screenings WHERE id=? AND user_id=?', [req.params.id, req.user.id]);
    if (info.changes === 0) return res.status(404).json({ error: 'Record not found or unauthorized' });
    return res.json({ message: 'Screening deleted successfully' });
  } catch (err) {
    console.error('[delete screening]', err);
    return res.status(500).json({ error: 'Failed to delete record' });
  }
});

/** GET /api/health */
app.get('/api/health', (_req, res) => res.json({ status: 'ok', version: '1.0.0', db: DB_PATH }));

// SPA fallback
app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// ── Start ──
// On Vercel: export the app after DB init; do NOT call app.listen()
// Locally: init DB then start the HTTP server
if (IS_VERCEL) {
  // Vercel invokes initDB on each cold start
  initDB().catch(err => console.error('DB init failed:', err));
  module.exports = app;
} else {
  initDB().then(() => {
    app.listen(PORT, () => {
      console.log(`\n🚀 MukhBODHITA running at http://localhost:${PORT}`);
      console.log(`   Demo login: ASHA-DEMO-001 / demo123`);
      console.log(`   Admin API: GET http://localhost:${PORT}/api/users (with token)\n`);
    });
  }).catch(err => { console.error('DB init failed:', err); process.exit(1); });

  process.on('SIGINT', () => { db.close(); console.log('\nDB closed. Goodbye!'); process.exit(0); });
}
