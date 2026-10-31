const { verifyAccessToken } = require('../utils/generateToken');
const { ApiError } = require('../utils/apiResponse');
const User = require('../models/User');

/**
 * Verifies the JWT access token from the Authorization header.
 * On success, attaches the authenticated user (minus sensitive fields)
 * to req.user for downstream handlers and role checks.
 */
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Not authorized, no token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.sub);
    if (!user || !user.isActive) {
      throw new ApiError(401, 'User no longer exists or is inactive');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = protect;
