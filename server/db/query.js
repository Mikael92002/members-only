exports.addMember = async (username, password) => {
  const query = await pool.query(
    `INSERT INTO members(username, password) VALUES($1, $2) RETURNING *`,
    [username, password],
  );
  return query;
};
