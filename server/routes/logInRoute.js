const Router = require("express");
const controller = require("../controller/logInController");

const logInRoute = Router();

logInRoute.post("/", controller.logInPost);

module.exports = logInRoute;