const express = require('express');
const { getCrops, recommend } = require('../controllers/fertilizerController');

const router = express.Router();

router.get('/crops', getCrops);
router.post('/recommend', recommend);

module.exports = router;
