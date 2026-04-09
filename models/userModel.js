const { getPool } = require('../config/db');

async function createUser({ name, email, mobile, address, passwordHash }) {
  const pool = await getPool();
  const [result] = await pool.query(
    `INSERT INTO users (name, email, mobile, address, password_hash)
     VALUES (?, ?, ?, ?, ?)`,
    [name, email, mobile, address, passwordHash]
  );
  return result.insertId;
}

async function findUserByEmail(email) {
  const pool = await getPool();
  const [rows] = await pool.query(
    `SELECT id, name, email, mobile, address, password_hash
     FROM users WHERE email = ? LIMIT 1`,
    [email]
  );
  return rows[0] || null;
}

async function findUserById(id) {
  const pool = await getPool();
  const [rows] = await pool.query(
    `SELECT id, name, email, mobile, address
     FROM users WHERE id = ? LIMIT 1`,
    [id]
  );
  return rows[0] || null;
}

async function updateUserById(id, { name, mobile, address }) {
  const pool = await getPool();
  await pool.query(
    `UPDATE users SET name = ?, mobile = ?, address = ? WHERE id = ?`,
    [name, mobile, address, id]
  );
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserById
};
