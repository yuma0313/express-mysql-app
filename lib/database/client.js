const pool = require("./pool");

const MySQLClient = {
  executeQuery: async (query, values) => {
    let results = await pool.query(query, values);
    return results;
  },
  end: async () => {
    await pool.end();
  }
};

module.exports = MySQLClient;