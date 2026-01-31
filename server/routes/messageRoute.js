const Router = require("express");
const controller = require("../controller/messageController")

const messageRouter = Router();

messageRouter.get("/", controller.getAllUsers);

module.exports = messageRouter