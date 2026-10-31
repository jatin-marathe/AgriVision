const express = require('express');
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');
const {
    validateRegister,
    validateLogin,
    validateForgotPassword,
    validateResetPassword,
} = require('../validators/authValidator');

const router = express.Router();

// Tighter limiter specifically for OTP requests — prevents email-bombing
// a victim's inbox and slows down brute-force OTP guessing.
const otpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many attempts. Please try again later.' },
});

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);

router.post('/forgot-password', otpLimiter, validateForgotPassword, authController.forgotPassword);
router.post('/reset-password', otpLimiter, validateResetPassword, authController.resetPassword);

module.exports = router;
