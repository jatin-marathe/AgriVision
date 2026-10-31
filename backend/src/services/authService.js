const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { ApiError } = require('../utils/apiResponse');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require('../utils/generateToken');
const { generateOtp, hashOtp, compareOtp, getOtpExpiry } = require('../utils/otp');
const { sendOtpEmail } = require('../utils/sendEmail');

/**
 * Registers a new user. Role always defaults to 'farmer' here —
 * admin accounts are provisioned separately, never through public signup.
 */
const registerUser = async ({ name, email, password, phone, location }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, 'An account with this email already exists');
  }

  const user = await User.create({ name, email, password, phone, location, role: 'farmer' });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  await user.save();

  return { user, accessToken, refreshToken };
};

/**
 * Authenticates a user by email/password and issues a fresh token pair.
 */
const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password +refreshTokenHash');
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  if (!user.isActive) {
    throw new ApiError(403, 'This account has been deactivated');
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  await user.save();

  return { user, accessToken, refreshToken };
};

/**
 * Issues a new access token from a valid, unexpired refresh token.
 * Confirms the refresh token matches the hash stored at last login,
 * so a logged-out/rotated token can never be reused.
 */
const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token missing');
  }

  const decoded = verifyRefreshToken(refreshToken);
  const user = await User.findById(decoded.sub).select('+refreshTokenHash');

  if (!user || !user.refreshTokenHash) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  const isValid = await bcrypt.compare(refreshToken, user.refreshTokenHash);
  if (!isValid) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  const accessToken = generateAccessToken(user);
  return { accessToken };
};

/**
 * Clears the stored refresh token hash, invalidating future refresh attempts.
 */
const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { $unset: { refreshTokenHash: 1 } });
};

/**
 * Generates and emails a one-time password for resetting the account's
 * password. Always resolves successfully regardless of whether the email
 * exists, so the endpoint can't be used to enumerate registered accounts.
 */
const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    const otp = generateOtp();
    user.passwordResetOtpHash = await hashOtp(otp);
    user.passwordResetOtpExpires = getOtpExpiry();
    await user.save();

    await sendOtpEmail(user.email, otp);
  }
  // Intentionally no branch for "user not found" — same response either way.
};

/**
 * Verifies the OTP and sets a new password. On success, invalidates the
 * existing refresh token so all other active sessions are logged out —
 * a compromised account shouldn't stay logged in elsewhere after a reset.
 */
const resetPassword = async (email, otp, newPassword) => {
  const user = await User.findOne({ email }).select(
    '+passwordResetOtpHash +passwordResetOtpExpires'
  );

  if (!user || !user.passwordResetOtpHash || !user.passwordResetOtpExpires) {
    throw new ApiError(400, 'Invalid or expired OTP');
  }

  if (user.passwordResetOtpExpires.getTime() < Date.now()) {
    throw new ApiError(400, 'OTP has expired. Please request a new one');
  }

  const isValidOtp = await compareOtp(otp, user.passwordResetOtpHash);
  if (!isValidOtp) {
    throw new ApiError(400, 'Invalid or expired OTP');
  }

  user.password = newPassword;
  user.passwordResetOtpHash = undefined;
  user.passwordResetOtpExpires = undefined;
  user.refreshTokenHash = undefined; // force re-login everywhere
  await user.save();
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  forgotPassword,
  resetPassword,
};
