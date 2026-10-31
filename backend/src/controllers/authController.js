const { success } = require('../utils/apiResponse');
const authService = require('../services/authService');

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const register = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.registerUser(req.body);
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);
    return success(res, 201, 'Registration successful', { user, accessToken });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.loginUser(req.body);
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);
    return success(res, 200, 'Login successful', { user, accessToken });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    const { accessToken } = await authService.refreshAccessToken(token);
    return success(res, 200, 'Token refreshed', { accessToken });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    if (req.user) {
      await authService.logoutUser(req.user._id);
    }
    res.clearCookie('refreshToken', { ...REFRESH_COOKIE_OPTIONS, maxAge: undefined });
    return success(res, 200, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    return success(res, 200, 'Current user fetched', { user: req.user });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    await authService.forgotPassword(req.body.email);
    // Generic message regardless of outcome — prevents account enumeration
    return success(res, 200, 'If that email is registered, a reset code has been sent');
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    await authService.resetPassword(email, otp, newPassword);
    return success(res, 200, 'Password reset successful. Please log in with your new password');
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, refresh, logout, getMe, forgotPassword, resetPassword };
