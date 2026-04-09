// const mysql = require('mysql2/promise');

// const host = process.env.DB_HOST || 'localhost';
// const user = process.env.DB_USER || 'root';
// const password = process.env.DB_PASSWORD || 'root';
// const database = process.env.DB_NAME || 'food_delivery';

// let pool;

// async function getPool() {
//   if (pool) return pool;

//   const conn = await mysql.createConnection(process.env.DATABASE_URL);

//   await conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
//   await conn.end();

//   pool = mysql.createPool({
//     host,
//     user,
//     password,
//     database,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
//   });

//   return pool;
// }

// module.exports = { getPool };
const mysql = require('mysql2/promise');

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || 'root';
const database = process.env.DB_NAME || 'food_delivery';

let pool;

async function getPool() {
  if (pool) return pool;

  const conn = await mysql.createConnection({
    host,
    user,
    password
  });

  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
  await conn.end();

  pool = mysql.createPool({
    host,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  return pool;
}

module.exports = { getPool };