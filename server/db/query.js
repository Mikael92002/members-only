const pool = require("./pool");

exports.addMember = async (username, password) => {
  const query = await pool.query(
    `INSERT INTO members(username, password) VALUES($1, $2) RETURNING *`,
    [username, password],
  );
  return query;
};

exports.getAllMessages = async () => {
  const rows = await pool.query(
    "SELECT username, is_member, messages.message, messages.id, messages.message_date FROM users INNER JOIN messages ON users.id = messages.user_id",
  );
  return rows;
};
