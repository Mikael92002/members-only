const Router = require("express");
const controller = require("../controller/formController");

const authRoute = Router();

authRoute.post("/logIn", controller.logInPost);
authRoute.post("/signUp", controller.signUpPost);

module.exports = authRoute;