const Router = require("express");
const controller = require("../controller/formController");

const authRoute = Router();

authRoute.post("/logIn", controller.logInPost);
authRoute.post("/signUp", controller.signUpPost);
authRoute.get("/signOut", controller.signOutGet);

module.exports = authRoute;
