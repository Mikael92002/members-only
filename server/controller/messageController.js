const queries = require("../db/query");

exports.getAllUsers = async (req, res) => {
  const {rows} = await queries.getAllMessages();
  console.log(rows);
  res.json({messages: rows});
};
