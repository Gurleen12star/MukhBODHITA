/**
 * MukhBODHITA — JWT + bcrypt Auth Helpers
 */

const jwt    = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'mukhbodhita_dev_secret_2026';
const SALT_ROUNDS = 10;

/**
 * Remove password_hash from user object before sending to client.
 * @param {object} user - Raw DB user row
 * @returns {object} Safe user object
 */
function sanitize(user) {
  if (!user) return null;
  const { password_hash, ...safe } = user;
  return safe;
}

/**
 * Sign a JWT for the given user.
 * @param {object} user - User row (must have id, role, is_admin)
 * @returns {string} Signed JWT (expires in 7 days)
 */
function signToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role, is_admin: user.is_admin },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

/**
 * Hash a plaintext password.
 * @param {string} password
 * @returns {Promise<string>} bcrypt hash
 */
async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare a plaintext password against a stored hash.
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = { sanitize, signToken, hashPassword, comparePassword, JWT_SECRET };
