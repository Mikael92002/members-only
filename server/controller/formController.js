const queries = require("../db/query");
const passport = require("passport");
const bcrypt = require("bcryptjs");

// validate:
exports.logInPost = passport.authenticate("local", {
  successRedirect: "/success",
  failureRedirect: "/failure",
});

// must validate:
exports.signUpPost = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hash(password, 10);
    const query = await queries.addMember(username, hashedPassword);
    res.send(query);
  } catch (err) {
    return next(err);
  }
};
