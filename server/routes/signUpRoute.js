const {Router} = require("express");
const controller = require("../controller/signUpController")

const signUpRoute = Router();

signUpRoute.post("/", controller.signUpPost);

module.exports = signUpRoute;