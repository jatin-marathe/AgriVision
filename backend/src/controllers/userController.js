const { success } = require('../utils/apiResponse');
const userService = require('../services/userService');

const getProfile = async (req, res, next) => {
  try {
    return success(res, 200, 'Profile fetched', { user: req.user });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user._id, req.body);
    return success(res, 200, 'Profile updated successfully', { user });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile };
