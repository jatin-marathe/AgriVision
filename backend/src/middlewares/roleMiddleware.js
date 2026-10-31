const { ApiError } = require('../utils/apiResponse');

/**
 * Role guard factory. Usage: authorize('admin') or authorize('admin', 'farmer').
 * Must run after `protect`, which populates req.user.
 */
const authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Not authorized'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(403, `Role '${req.user.role}' is not permitted to access this resource`)
      );
    }

    next();
  };

module.exports = authorize;
