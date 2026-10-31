const User = require('../models/User');
const { ApiError } = require('../utils/apiResponse');

// Fields a user is allowed to self-update. Role and email are deliberately
// excluded — role changes go through admin-only endpoints (Phase 11),
// and email changes would need re-verification, out of scope here.
const UPDATABLE_FIELDS = ['name', 'phone', 'location'];

const updateProfile = async (userId, payload) => {
  const updates = {};
  UPDATABLE_FIELDS.forEach((field) => {
    if (payload[field] !== undefined) updates[field] = payload[field];
  });

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, 'No valid fields provided to update');
  }

  const user = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

module.exports = { updateProfile };
