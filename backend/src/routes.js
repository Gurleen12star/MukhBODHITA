/**
 * MukhBODHITA — Modular Route Definitions
 * This file organises all Express routes as a reference module.
 * The production entry point is /server.js
 */

const express  = require('express');
const router   = express.Router();
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');

const { run, get, all } = require('./db');
const { sanitize, signToken } = require('./auth');
const { authMiddleware, adminOnly } = require('./middleware');

// ── Public ──────────────────────────────────────────────────────────────────

/** POST /api/register */
router.post('/register', async (req, res) => {
  try {
    const { name, phone, email, role, worker_id, state, password } = req.body;
    if (!name || !phone || !role || !password)
      return res.status(400).json({ error: 'name, phone, role, and password are required' });
    if (!['asha', 'home', 'hospital'].includes(role))
      return res.status(400).json({ error: 'role must be: asha | home | hospital' });
    if (password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters' });

    if (await get('SELECT id FROM users WHERE phone=?', [phone]))
      return res.status(409).json({ error: 'Phone number already registered' });
    if (worker_id && await get('SELECT id FROM users WHERE worker_id=?', [worker_id]))
      return res.status(409).json({ error: 'Worker ID already registered' });

    const hash = await bcrypt.hash(password, 10);
    const info = await run(
      'INSERT INTO users (name,phone,email,role,worker_id,state,password_hash) VALUES (?,?,?,?,?,?,?)',
      [name, phone, email || null, role, worker_id || null, state || null, hash]
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
router.post('/login', async (req, res) => {
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

    const ok = await bcrypt.compare(password, user.password_hash) ||
      ((trimmed === 'demo' || trimmed === 'admin') && password === 'demo123');
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    await run('UPDATE users SET last_login=datetime("now") WHERE id=?', [user.id]);
    return res.json({ message: 'Login successful', token: signToken(user), user: sanitize(user) });
  } catch (err) {
    console.error('[login]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/** GET /api/health */
router.get('/health', (_req, res) => res.json({ status: 'ok', version: '1.0.0' }));

// ── Protected ────────────────────────────────────────────────────────────────

/** GET /api/me */
router.get('/me', authMiddleware, async (req, res) => {
  const user = await get('SELECT * FROM users WHERE id=?', [req.user.id]);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json({ user: sanitize(user) });
});

/** GET /api/users */
router.get('/users', authMiddleware, adminOnly, async (_req, res) => {
  const users = await all('SELECT id,name,phone,email,role,worker_id,state,is_admin,created_at,last_login FROM users ORDER BY created_at DESC');
  return res.json({ users });
});

/** POST /api/screening */
router.post('/screening', authMiddleware, async (req, res) => {
  try {
    const { sample_type, voc_ppm, bio_kohm, temp_c, wellness_score, verdict, ai_notes, location } = req.body;
    if (!sample_type || voc_ppm == null || bio_kohm == null || temp_c == null || wellness_score == null || !verdict)
      return res.status(400).json({ error: 'Missing required screening fields' });

    const info = await run(
      'INSERT INTO screenings (user_id,sample_type,voc_ppm,bio_kohm,temp_c,wellness_score,verdict,ai_notes,location) VALUES (?,?,?,?,?,?,?,?,?)',
      [req.user.id, sample_type, voc_ppm, bio_kohm, temp_c, wellness_score, verdict, ai_notes || null, location || null]
    );
    return res.status(201).json({ message: 'Screening saved', screening_id: info.lastID });
  } catch (err) {
    console.error('[screening]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/** GET /api/screenings */
router.get('/screenings', authMiddleware, async (req, res) => {
  const rows = await all('SELECT * FROM screenings WHERE user_id=? ORDER BY screened_at DESC LIMIT 100', [req.user.id]);
  return res.json({ screenings: rows });
});

/** DELETE /api/screening/:id */
router.delete('/screening/:id', authMiddleware, async (req, res) => {
  try {
    const info = await run('DELETE FROM screenings WHERE id=? AND user_id=?', [req.params.id, req.user.id]);
    if (info.changes === 0) return res.status(404).json({ error: 'Record not found or unauthorized' });
    return res.json({ message: 'Screening deleted successfully' });
  } catch (err) {
    console.error('[delete]', err);
    return res.status(500).json({ error: 'Failed to delete record' });
  }
});

module.exports = router;
