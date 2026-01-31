const queries = require("../db/query");
const passport = require("passport");

exports.logInPost = passport.authenticate("local", {
  successRedirect: "/success",
  failureRedirect: "/failure",
});
