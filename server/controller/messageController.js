const queries = require("../db/query");

exports.getAllMessages = async (req, res) => {
  const { userID, is_member } = req.query;
  const { rows } = await queries.getAllMessages(userID, is_member);
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
  res.json(rows[0]);
};
exports.deleteMessage = async (req, res) => {
  const messageID = req.params.messageID;
  await queries.deleteMessage(messageID);
  res.status(200).end();
};
