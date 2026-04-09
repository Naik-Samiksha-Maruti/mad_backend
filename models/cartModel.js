const { getPool } = require('../config/db');

async function addOrIncrementCartItem({ userId, itemName, unitPrice, qty }) {
  const pool = await getPool();
  const [rows] = await pool.query(
    `SELECT id, qty FROM cart_items
     WHERE user_id = ? AND item_name = ? AND unit_price = ? LIMIT 1`,
    [userId, itemName, unitPrice]
  );

  if (rows.length > 0) {
    const existing = rows[0];
    await pool.query(`UPDATE cart_items SET qty = ? WHERE id = ?`, [
      Number(existing.qty) + Number(qty),
      existing.id
    ]);
    return;
  }

  await pool.query(
    `INSERT INTO cart_items (user_id, item_name, unit_price, qty)
     VALUES (?, ?, ?, ?)`,
    [userId, itemName, unitPrice, qty]
  );
}

async function getCartItems(userId) {
  const pool = await getPool();
  const [rows] = await pool.query(
    `SELECT id, item_name, unit_price, qty
     FROM cart_items WHERE user_id = ? ORDER BY id DESC`,
    [userId]
  );
  return rows;
}

async function clearCart(userId) {
  const pool = await getPool();
  await pool.query(`DELETE FROM cart_items WHERE user_id = ?`, [userId]);
}

module.exports = {
  addOrIncrementCartItem,
  getCartItems,
  clearCart
};
