/**
 * Standard success response envelope.
 * Keeps frontend consumption predictable across all endpoints.
 */
const success = (res, statusCode, message, data = null) =>
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });

/**
 * Custom application error class.
 * Thrown anywhere in the app; caught by the centralized error handler.
 */
class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { success, ApiError };
