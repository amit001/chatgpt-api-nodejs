const express = require("express");
const chatRouter = require('../controller/chat/chatGpt.routes');
const app = express();

app.use("/chat", chatRouter);

module.exports = app;