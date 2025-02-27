const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middlewares/auth');

router.get('/', verifyToken, cartController.getCart);

router.post('/add', verifyToken, [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
], cartController.addItem);

router.put('/item/:itemId', verifyToken, [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
], cartController.updateItem);

router.delete('/item/:itemId', verifyToken, cartController.removeItem);

router.delete('/', verifyToken, cartController.clearCart);

module.exports = router;
