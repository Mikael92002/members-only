const Router = require("express");
const controller = require("../controller/messageController")

const messageRouter = Router();

messageRouter.get("/", controller.getAllMessages);
messageRouter.get("/anonymous", controller.getAllMessagesAnonymous);
messageRouter.post("/:userID", controller.postMessage);

module.exports = messageRouter