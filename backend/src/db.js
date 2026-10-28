/**
 * MukhBODHITA — SQLite Database Helpers
 */

const sqlite3 = require('sqlite3').verbose();
const path    = require('path');
const fs      = require('fs');

const DATA_DIR = path.join(__dirname, '../../data');
const DB_PATH  = path.join(DATA_DIR, 'mukhbodhita.db');

fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new sqlite3.Database(DB_PATH, err => {
  if (err) { console.error('DB open error:', err); process.exit(1); }
  console.log('SQLite connected:', DB_PATH);
});

/** Promisified db.run — returns `this` (lastID, changes) */
const run = (sql, p = []) =>
  new Promise((res, rej) => db.run(sql, p, function(e) { e ? rej(e) : res(this); }));

/** Promisified db.get — returns single row or undefined */
const get = (sql, p = []) =>
  new Promise((res, rej) => db.get(sql, p, (e, r) => e ? rej(e) : res(r)));

/** Promisified db.all — returns array of rows */
const all = (sql, p = []) =>
  new Promise((res, rej) => db.all(sql, p, (e, r) => e ? rej(e) : res(r)));

/**
 * Initialise the database schema.
 * Creates tables and seeds a demo user if none exist.
 */
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

  console.log('DB schema ready.');
}

module.exports = { db, run, get, all, initDB };
