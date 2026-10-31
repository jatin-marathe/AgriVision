const express = require('express');
const { getCrops, predict } = require('../controllers/yieldController');

const router = express.Router();

router.get('/crops', getCrops);
router.post('/predict', predict);

module.exports = router;
