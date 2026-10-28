/**
 * MukhBODHITA — Frontend Auth State Management
 * Manages login state, token persistence, and user session.
 */

const MB_Auth = (() => {
  const TOKEN_KEY = 'mukhbodhita_token';
  const USER_KEY  = 'mukhbodhita_user';

  /** Store auth data after successful login/register */
  function saveSession(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /** Clear all auth data (logout) */
  function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  /** Get the stored JWT token */
  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  /** Get the stored user object */
  function getUser() {
    const raw = localStorage.getItem(USER_KEY);
    try { return raw ? JSON.parse(raw) : null; }
    catch { return null; }
  }

  /** Check if user is authenticated */
  function isLoggedIn() {
    return !!getToken();
  }

  /**
   * Redirect to auth page if not logged in.
   * Call this at the top of protected pages.
   */
  function requireAuth(redirectTo = 'auth.html') {
    if (!isLoggedIn()) {
      window.location.href = redirectTo;
    }
  }

  /**
   * Redirect to dashboard if already logged in.
   * Call this on the login/register page.
   */
  function redirectIfLoggedIn(redirectTo = 'dashboard.html') {
    if (isLoggedIn()) {
      window.location.href = redirectTo;
    }
  }

  return { saveSession, clearSession, getToken, getUser, isLoggedIn, requireAuth, redirectIfLoggedIn };
})();
