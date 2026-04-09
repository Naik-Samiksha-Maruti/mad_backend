const { ok, fail } = require('../utils/response');
const { createOrder } = require('../models/orderModel');
const { clearCart } = require('../models/cartModel');

async function createOrderHandler(req, res) {
  try {
    const { user_id, payment_method, transaction_id, amount } = req.body || {};

    if (!payment_method) return fail(res, 'Payment method is required');

    const method = String(payment_method).toLowerCase();
    if (!['cod', 'upi'].includes(method)) {
      return fail(res, 'Invalid payment method');
    }

    if (method === 'upi' && (!transaction_id || String(transaction_id).trim().length < 6)) {
      return fail(res, 'Valid UPI transaction ID is required');
    }

    const numericAmount = Number(amount || 0);
    if (Number.isNaN(numericAmount) || numericAmount < 0) {
      return fail(res, 'Invalid amount');
    }

    const orderId = await createOrder({
      userId: user_id ? Number(user_id) : null,
      paymentMethod: method,
      transactionId: method === 'upi' ? String(transaction_id).trim() : null,
      amount: numericAmount
    });

    if (user_id) {
      await clearCart(Number(user_id));
    }

    return ok(res, 'Order placed successfully', {
      order_id: orderId,
      payment_method: method
    });
  } catch (error) {
    console.error('Create order error:', error);
    return fail(res, 'Failed to place order');
  }
}

module.exports = { createOrderHandler };
