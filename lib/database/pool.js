const config = require("../../config/mysql.config.js");
const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: config.HOST,
  port: config.PORT,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
  connectionLimit: config.CONNECTION_LIMIT,
  queueLimit: config.QUEUE_LIMIT
});

module.exports = pool;