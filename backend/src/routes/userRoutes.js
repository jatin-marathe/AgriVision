const express = require('express');
const userController = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

// Both farmers and admins hit the same profile endpoints — the response
// shape is identical; the frontend decides what extra sections to render
// based on req.user.role. Admin-only user *management* (listing/deactivating
// other users) is a separate route group added in Phase 11.
router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateProfile);

module.exports = router;
