const { Pool } = require("pg");

const pool = new Pool({
  connectionString: `postgresql://${process.env.USER}:${process.env.PW}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`,
});

module.exports = pool;
