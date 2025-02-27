const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const rateLimiter = require('../middlewares/rateLimiter');

router.post('/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  userController.registerUser
);

router.post('/login',
  rateLimiter,
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  userController.loginUser
);

router.post('/forgot-password', rateLimiter, userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

module.exports = router;
