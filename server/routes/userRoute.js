const Router = require("express");
const controller = require("../controller/userController")

const userRoute = Router();

userRoute.get("/", controller.getCurrentUserFromCookie);

userRoute.put("/:userID", controller.updateMemberToTrue);

module.exports = userRoute;
