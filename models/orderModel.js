const { getPool } = require('../config/db');

async function createOrder({ userId, paymentMethod, transactionId, amount }) {
  const pool = await getPool();
  const [result] = await pool.query(
    `INSERT INTO orders (user_id, payment_method, transaction_id, amount)
     VALUES (?, ?, ?, ?)`,
    [userId || null, paymentMethod, transactionId || null, amount]
  );
  return result.insertId;
}

module.exports = { createOrder };
