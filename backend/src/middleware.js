/**
 * MukhBODHITA — Express Middleware
 */

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./auth');

/**
 * Validates Bearer JWT token from Authorization header.
 * Sets req.user = decoded payload on success.
 */
function authMiddleware(req, res, next) {
  const hdr = req.headers.authorization;
  if (!hdr?.startsWith('Bearer '))
    return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(hdr.slice(7), JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Restricts access to admin users only.
 * Must be used after authMiddleware.
 */
function adminOnly(req, res, next) {
  if (!req.user?.is_admin)
    return res.status(403).json({ error: 'Admin access required' });
  next();
}

/**
 * Global error handler — catches unhandled errors in async routes.
 */
function errorHandler(err, _req, res, _next) {
  console.error('[unhandled error]', err);
  res.status(500).json({ error: 'Internal server error', detail: err.message });
}

/**
 * 404 handler — catches unmatched routes.
 */
function notFound(_req, res) {
  res.status(404).json({ error: 'Endpoint not found' });
}

module.exports = { authMiddleware, adminOnly, errorHandler, notFound };
