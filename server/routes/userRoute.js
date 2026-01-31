const Router = require("express");

const userRoute = Router();

userRoute.get("/", (req, res) => {
    console.log("fetch for user")
  if (req.user) {
    console.log("user exists");
    res.json({ user: req.user });
  }
});

module.exports = userRoute;
