const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth');
const paypalController = require('../controllers/paypalController');

router.post('/create-order', verifyToken, paypalController.createOrder);
router.post('/capture-order', verifyToken, paypalController.captureOrder);

module.exports = router;
