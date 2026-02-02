const queries = require("../db/query");

exports.updateMemberToTrue = async (req, res) => {
  const userID = req.params.userID;
  const query = await queries.updateMemberToTrue(userID);
  res.json(query[0]);
};

exports.getCurrentUserFromCookie = async (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({});
  }
};