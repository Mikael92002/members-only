const queries = require("../db/query");

exports.getAllMessages = async (req, res) => {
  const { userID, is_member } = req.query;
  // console.log(userID);
  // console.log(is_member);
  const { rows } = await queries.getAllMessages(userID, is_member);
  console.log(rows);
  res.json({ messages: rows });
};
exports.getAllMessagesAnonymous = async (req, res) => {
  const { rows } = await queries.getAllMessagesAnonymous();
  res.json({ messages: rows });
};
exports.postMessage = async (req, res) => {
  const userID = req.params.userID;
  const { message, messageDate } = req.body;
  const { rows } = await queries.insertMessage(userID, message, messageDate);
  console.log(rows[0]);
  res.json(rows[0]);
};
