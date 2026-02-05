const { Pool } = require("pg");

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.USER}:${process.env.PW}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`;

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    })
  : new Pool({ connectionString });

module.exports = pool;
