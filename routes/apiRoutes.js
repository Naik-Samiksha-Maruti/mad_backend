const express = require('express');
const { signUp, login } = require('../controllers/authController');
const { getProfile, updateProfile } = require('../controllers/userController');
const {
  addToCart,
  getCart,
  clearUserCart
} = require('../controllers/cartController');
const { createOrderHandler } = require('../controllers/orderController');

const router = express.Router();

router.post('/sign_up', signUp);
router.post('/login', login);
router.get('/profile/:id', getProfile);
router.post('/profile/update', updateProfile);
router.post('/cart/add', addToCart);
router.get('/cart/:userId', getCart);
router.post('/cart/clear', clearUserCart);
router.post('/orders', createOrderHandler);

module.exports = router;
