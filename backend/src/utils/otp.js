const crypto = require('crypto');
const bcrypt = require('bcryptjs');

/**
 * Generates a 6-digit numeric OTP as a string (e.g. "042917").
 * Uses crypto.randomInt for cryptographically secure randomness.
 */
const generateOtp = () => crypto.randomInt(100000, 999999).toString();

/**
 * Hashes an OTP the same way passwords are hashed, so raw OTPs
 * are never stored in the database.
 */
const hashOtp = async (otp) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(otp, salt);
};

const compareOtp = async (candidate, hash) => bcrypt.compare(candidate, hash);

const OTP_EXPIRY_MINUTES = 10;

const getOtpExpiry = () => new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

module.exports = { generateOtp, hashOtp, compareOtp, getOtpExpiry, OTP_EXPIRY_MINUTES };
