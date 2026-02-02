const queries = require("../db/query");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult, matchedData } = require("express-validator");

// validate:
exports.logInPost = passport.authenticate("local", {
  successRedirect: "/success",
  failureRedirect: "/failure",
});

const validateUser = [
  body("username")
    .matches(/^[^\s]{1,20}$/)
    .withMessage(
      "Username can only contain alphabets, numbers, or special symbols and must be less than 20 characters",
    )
    .custom(async (value) => {
      const user = await queries.getUser(value);
      if (user) {
        throw new Error("Username already in use!");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must contain 8 letters")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character")
    .matches(/[a-zA-Z]/)
    .withMessage("Password must contain at least one letter"),
];

// must validate:
exports.signUpPost = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      const { username, password } = matchedData(req);
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = await queries.addMember(username, hashedPassword);
      res.json({ success: true, errorMessages: [] });
    } catch (err) {
      return next(err);
    }
  },
];

exports.signOutGet = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.end();
  });
};
