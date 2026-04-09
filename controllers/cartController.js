const { ok, fail } = require('../utils/response');
const {
  addOrIncrementCartItem,
  getCartItems,
  clearCart
} = require('../models/cartModel');

async function addToCart(req, res) {
  try {
    const { user_id, item_name, unit_price, qty } = req.body || {};
    if (!user_id || !item_name || unit_price == null) {
      return fail(res, 'user_id, item_name and unit_price are required');
    }

    const quantity = Number(qty || 1);
    const price = Number(unit_price);
    if (Number.isNaN(quantity) || quantity < 1) {
      return fail(res, 'Invalid qty');
    }
    if (Number.isNaN(price) || price < 0) {
      return fail(res, 'Invalid unit_price');
    }

    await addOrIncrementCartItem({
      userId: Number(user_id),
      itemName: String(item_name),
      unitPrice: price,
      qty: quantity
    });

    return ok(res, 'Item added to cart');
  } catch (error) {
    console.error('Add cart error:', error);
    return fail(res, 'Failed to add item to cart');
  }
}

async function getCart(req, res) {
  try {
    const userId = Number(req.params.userId);
    if (!userId) return fail(res, 'Valid user id is required');

    const items = await getCartItems(userId);
    const subTotal = items.reduce(
      (sum, item) => sum + Number(item.unit_price) * Number(item.qty),
      0
    );
    const deliveryCost = items.length > 0 ? 2 : 0;
    const discount = items.length > 0 ? 4 : 0;
    const total = subTotal + deliveryCost - discount;

    return ok(res, 'Cart fetched', {
      items: items.map((item) => ({
        id: item.id,
        name: item.item_name,
        price: Number(item.unit_price),
        qty: Number(item.qty)
      })),
      sub_total: subTotal,
      delivery_cost: deliveryCost,
      discount,
      total
    });
  } catch (error) {
    console.error('Get cart error:', error);
    return fail(res, 'Failed to fetch cart');
  }
}

async function clearUserCart(req, res) {
  try {
    const { user_id } = req.body || {};
    if (!user_id) return fail(res, 'user_id is required');

    await clearCart(Number(user_id));
    return ok(res, 'Cart cleared');
  } catch (error) {
    console.error('Clear cart error:', error);
    return fail(res, 'Failed to clear cart');
  }
}

module.exports = { addToCart, getCart, clearUserCart };
