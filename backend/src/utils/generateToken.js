const jwt = require('jsonwebtoken');
const env = require('../config/env');

/**
 * Generates a short-lived access token carrying identity + role.
 * Role is embedded so RBAC middleware can authorize without a DB hit.
 */
const generateAccessToken = (user) =>
  jwt.sign(
    { sub: user._id.toString(), role: user.role },
    env.jwt.accessSecret,
    { expiresIn: env.jwt.accessExpiresIn }
  );

/**
 * Generates a long-lived refresh token used only to mint new access tokens.
 */
const generateRefreshToken = (user) =>
  jwt.sign(
    { sub: user._id.toString(), tokenType: 'refresh' },
    env.jwt.refreshSecret,
    { expiresIn: env.jwt.refreshExpiresIn }
  );

const verifyAccessToken = (token) => jwt.verify(token, env.jwt.accessSecret);
const verifyRefreshToken = (token) => jwt.verify(token, env.jwt.refreshSecret);

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
