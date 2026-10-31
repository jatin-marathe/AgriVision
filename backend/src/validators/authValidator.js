const { ApiError } = require('../utils/apiResponse');

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

/**
 * Validates registration payload before it reaches the service layer.
 * Keeps controllers thin and guarantees the DB never sees malformed input.
 */
const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    errors.push('A valid email is required');
  }
  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (errors.length > 0) {
    return next(new ApiError(400, 'Validation failed', errors));
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.push('A valid email is required');
  }
  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return next(new ApiError(400, 'Validation failed', errors));
  }

  next();
};

const validateForgotPassword = (req, res, next) => {
  const { email } = req.body;

  if (!email || !EMAIL_REGEX.test(email)) {
    return next(new ApiError(400, 'Validation failed', ['A valid email is required']));
  }

  next();
};

const validateResetPassword = (req, res, next) => {
  const { email, otp, newPassword } = req.body;
  const errors = [];

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.push('A valid email is required');
  }
  if (!otp || !/^\d{6}$/.test(otp)) {
    errors.push('OTP must be a 6-digit code');
  }
  if (!newPassword || newPassword.length < 8) {
    errors.push('New password must be at least 8 characters');
  }

  if (errors.length > 0) {
    return next(new ApiError(400, 'Validation failed', errors));
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
};
