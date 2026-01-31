const Router = require("express");

const userRoute = Router();

userRoute.get("/", (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  }
});

module.exports = userRoute;
