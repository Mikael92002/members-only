const pool = require("./pool");

exports.addMember = async (username, password) => {
  const query = await pool.query(
    `INSERT INTO users(username, is_member, password) VALUES($1, FALSE, $2) RETURNING *`,
    [username, password],
  );
  return query;
};

exports.getAllMessages = async (userID, is_member) => {
  const rows = await pool.query(
    `SELECT is_member, messages.message, messages.id, messages.message_date,
    CASE
     WHEN $2 = true THEN users.username
     WHEN $1 = users.id THEN users.username
     ELSE 'ANONYMOUS'
     END AS username
    FROM users INNER JOIN messages ON users.id = messages.user_id`,
    [userID, is_member],
  );
  return rows;
};

exports.getAllMessagesAnonymous = async () => {
  const rows = await pool.query(
    "SELECT messages.message, messages.id, messages.message_date FROM users INNER JOIN messages ON users.id = messages.user_id",
  );
  return rows;
};

exports.updateMemberToTrue = async (userID) => {
  const rows = await pool.query(
    "UPDATE users SET is_member = TRUE WHERE users.id = $1 RETURNING *",
    [userID],
  );
  return rows;
};

exports.insertMessage = async (userID, message, messageDate) => {
  const query = await pool.query(
    "INSERT INTO messages(user_id, message, message_date) VALUES($1, $2, $3) RETURNING *",
    [userID, message, messageDate],
  );
  return query;
};

exports.getUser = async (username) => {
  const query = await pool.query(
    "SELECT username FROM users WHERE username = $1",
    [username],
  );
  return query.rows[0];
};

exports.deleteMessage = async (messageID) =>{
  const query = await pool.query("DELETE FROM messages WHERE messages.id = $1", [messageID]);
}
