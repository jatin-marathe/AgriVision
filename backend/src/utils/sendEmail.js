const nodemailer = require('nodemailer');
const env = require('../config/env');

let transporter;

const getTransporter = () => {
  if (!env.email.host || !env.email.user || !env.email.pass) {
    throw new Error(
      'Email service is not configured. Set EMAIL_HOST, EMAIL_USER, and EMAIL_PASS in backend/.env'
    );
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.email.host,
      port: env.email.port,
      secure: env.email.port === 465,
      auth: {
        user: env.email.user,
        pass: env.email.pass,
      },
    });
  }
  return transporter;
};

/**
 * Sends the password-reset OTP email.
 * HTML is inlined here (no external template engine) to keep the
 * dependency footprint small for a service that only sends a handful
 * of transactional email types.
 */
const sendOtpEmail = async (toEmail, otp) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e2e5e4; border-radius: 12px;">
      <h2 style="color: #2f9e44; margin-bottom: 8px;">AgriVision Password Reset</h2>
      <p style="color: #333;">Use the code below to reset your password. This code expires in 10 minutes.</p>
      <div style="font-size: 32px; font-weight: 700; letter-spacing: 6px; text-align: center; padding: 16px; background: #f4f6f5; border-radius: 8px; margin: 20px 0;">
        ${otp}
      </div>
      <p style="color: #6b6b6b; font-size: 13px;">
        If you did not request this, you can safely ignore this email — your password will not be changed.
      </p>
    </div>
  `;

  await getTransporter().sendMail({
    from: env.email.from,
    to: toEmail,
    subject: 'Your AgriVision password reset code',
    html,
  });
};

module.exports = { sendOtpEmail };