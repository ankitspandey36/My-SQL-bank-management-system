const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config()

const mySqlPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  port: process.env.DB_PORT, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
module.exports = mySqlPool;


