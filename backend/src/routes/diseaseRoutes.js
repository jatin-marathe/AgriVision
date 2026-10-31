const express = require('express');
const { getCrops, assess } = require('../controllers/diseaseController');

const router = express.Router();

router.get('/crops', getCrops);
router.post('/assess', assess);

module.exports = router;
