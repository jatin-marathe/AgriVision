const { ApiError } = require('../utils/apiResponse');

/**
 * Catches any request that doesn't match a defined route
 * and forwards a 404 ApiError into the centralized error handler.
 */
const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

module.exports = notFound;
