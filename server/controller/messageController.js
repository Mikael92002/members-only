const queries = require("../db/query");

exports.getAllUsers = async (req, res) => {
  const {rows} = await queries.getAllMessages();
  res.json({messages: rows});
};
