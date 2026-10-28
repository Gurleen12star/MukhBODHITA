/**
 * MukhBODHITA — Centralised API Client (Frontend)
 * Handles all fetch calls to the backend REST API.
 * Import this in your page scripts or use via the global MB_API object.
 */

const MB_API = (() => {
  const BASE = '/api';

  function getToken() {
    return localStorage.getItem('mukhbodhita_token') || '';
  }

  async function request(method, path, body = null, requiresAuth = true) {
    const headers = { 'Content-Type': 'application/json' };
    if (requiresAuth) {
      const token = getToken();
      if (!token) throw new Error('Not authenticated — please log in');
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    return data;
  }

  return {
    /** Authenticate user and store token */
    login: (identifier, password) =>
      request('POST', '/login', { identifier, password }, false),

    /** Register a new user account */
    register: (payload) =>
      request('POST', '/register', payload, false),

    /** Get the authenticated user's profile */
    me: () => request('GET', '/me'),

    /** Save a new screening record */
    saveScreening: (payload) => request('POST', '/screening', payload),

    /** Fetch screening history (last 100) */
    getScreenings: () => request('GET', '/screenings'),

    /** Delete a screening record by ID */
    deleteScreening: (id) => request('DELETE', `/screening/${id}`),

    /** Server health check */
    health: () => request('GET', '/health', null, false),
  };
})();
