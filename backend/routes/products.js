const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const productController = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middlewares/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/:id', productController.getProductById);

router.post('/', verifyToken, isAdmin,
  upload.single('image'),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isDecimal().withMessage('Valid price is required'),
    body('stock').isInt().withMessage('Stock must be an integer')
  ],
  productController.createProduct
);

router.put('/:id', verifyToken, isAdmin, upload.single('image'), productController.updateProduct);
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;
