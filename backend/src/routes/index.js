const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const protect = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');
const { success } = require('../utils/apiResponse');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

// Example of a role-protected route, demonstrating the RBAC pattern
// that all future feature routes (farms, weather, AI, etc.) will follow.
router.get('/admin/ping', protect, authorize('admin'), (req, res) =>
  success(res, 200, 'Admin route reachable', { userId: req.user._id })
);

router.get('/health', (req, res) => success(res, 200, 'API is healthy'));

module.exports = router;
