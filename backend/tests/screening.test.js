/**
 * MukhBODHITA — Screening CRUD Tests
 * Run with: node backend/tests/screening.test.js
 */

const assert = require('assert');

const BASE = 'http://localhost:3001/api';
let token = '';
let screeningId = null;

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
  console.log('\n== MukhBODHITA Screening Tests ==\n');

  // Login first
  const { data: loginData } = await req('POST', '/login', {
    identifier: 'ASHA-DEMO-001',
    password: 'demo123'
  });
  token = loginData.token;
  console.log('[SETUP] Logged in as demo user');

  // Save a new screening
  {
    const { status, data } = await req('POST', '/screening', {
      sample_type: 'breath_voc',
      voc_ppm: 3.28,
      bio_kohm: 14.2,
      temp_c: 32.8,
      wellness_score: 23,
      verdict: 'MALIGNANT_INDICATORS',
      ai_notes: 'Test screening — automated test suite',
      location: 'Test Lab, Delhi'
    }, token);
    assert.strictEqual(status, 201);
    assert.ok(data.screening_id);
    screeningId = data.screening_id;
    console.log('[PASS] POST /screening →', screeningId);
  }

  // Missing required fields → 400
  {
    const { status } = await req('POST', '/screening', {
      sample_type: 'breath_voc'
    }, token);
    assert.strictEqual(status, 400);
    console.log('[PASS] POST /screening (missing fields → 400)');
  }

  // Fetch screening history
  {
    const { status, data } = await req('GET', '/screenings', null, token);
    assert.strictEqual(status, 200);
    assert.ok(Array.isArray(data.screenings));
    const found = data.screenings.find(s => s.id === screeningId);
    assert.ok(found, 'Should find the saved screening');
    console.log('[PASS] GET /screenings — found', data.screenings.length, 'record(s)');
  }

  // Delete the test screening
  {
    const { status } = await req('DELETE', `/screening/${screeningId}`, null, token);
    assert.strictEqual(status, 200);
    console.log('[PASS] DELETE /screening/:id');
  }

  // Verify it is gone
  {
    const { data } = await req('GET', '/screenings', null, token);
    const still = data.screenings.find(s => s.id === screeningId);
    assert.strictEqual(still, undefined, 'Should be deleted');
    console.log('[PASS] Record confirmed deleted');
  }

  console.log('\nAll screening tests passed!\n');
}

run().catch(err => { console.error('Test failed:', err.message); process.exit(1); });
