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
// const mysql = require('mysql2/promise');

// const host = process.env.DB_HOST || 'localhost';
// const user = process.env.DB_USER || 'root';
// const password = process.env.DB_PASSWORD || 'root';
// const database = process.env.DB_NAME || 'food_delivery';

// let pool;

// async function getPool() {
//   if (pool) return pool;

//   const conn = await mysql.createConnection({
//     host,
//     user,
//     password
//   });

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
// const mysql = require('mysql2/promise');

// const databaseUrl = process.env.DATABASE_URL;

// let pool;

// async function getPool() {
//   if (pool) return pool;

//   const poolConfig = databaseUrl
//     ? { uri: databaseUrl } // URL parser use
//     : {
//         host: process.env.DB_HOST || 'localhost',
//         user: process.env.DB_USER || 'root',
//         password: process.env.DB_PASSWORD || 'root',
//         database: process.env.DB_NAME || 'food_delivery'
//       };

//   pool = mysql.createPool({
//     ...poolConfig,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
//   });

//   return pool;
// }

// module.exports = { getPool };
const mysql = require('mysql2/promise');

const databaseUrl = process.env.DATABASE_URL;

let pool;

async function getPool() {
  if (pool) return pool;

  if (databaseUrl) {   // ✅ correct condition
    pool = mysql.createPool(databaseUrl);
  } else {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'food_delivery',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  return pool;
}

module.exports = { getPool };