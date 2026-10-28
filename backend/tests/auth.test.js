/**
 * MukhBODHITA — Auth Endpoint Tests
 * Run with: node backend/tests/auth.test.js
 */

const assert = require('assert');

const BASE = 'http://localhost:3001/api';
let token = '';

async function req(method, path, body, auth) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) headers['Authorization'] = `Bearer ${auth}`;
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  return { status: res.status, data: await res.json() };
}

async function run() {
  console.log('\n== MukhBODHITA Auth Tests ==\n');

  // Health check
  {
    const { status, data } = await req('GET', '/health');
    assert.strictEqual(status, 200);
    assert.strictEqual(data.status, 'ok');
    console.log('[PASS] GET /health');
  }

  // Login with demo credentials
  {
    const { status, data } = await req('POST', '/login', {
      identifier: 'ASHA-DEMO-001',
      password: 'demo123'
    });
    assert.strictEqual(status, 200);
    assert.ok(data.token, 'Should return a JWT');
    assert.strictEqual(data.user.role, 'asha');
    token = data.token;
    console.log('[PASS] POST /login (demo)');
  }

  // Login with wrong password
  {
    const { status } = await req('POST', '/login', {
      identifier: 'ASHA-DEMO-001',
      password: 'wrong_password'
    });
    assert.strictEqual(status, 401);
    console.log('[PASS] POST /login (wrong password → 401)');
  }

  // Get own profile
  {
    const { status, data } = await req('GET', '/me', null, token);
    assert.strictEqual(status, 200);
    assert.ok(data.user.name);
    assert.strictEqual(data.user.password_hash, undefined, 'Should not expose password_hash');
    console.log('[PASS] GET /me');
  }

  // Missing token → 401
  {
    const { status } = await req('GET', '/me');
    assert.strictEqual(status, 401);
    console.log('[PASS] GET /me (no token → 401)');
  }

  // Register — missing fields → 400
  {
    const { status } = await req('POST', '/register', { name: 'Test' });
    assert.strictEqual(status, 400);
    console.log('[PASS] POST /register (missing fields → 400)');
  }

  console.log('\nAll auth tests passed!\n');
}

run().catch(err => { console.error('Test failed:', err.message); process.exit(1); });
