const router = require('express').Router();
const chatGptController = require('./chatGpt.controller');
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // 20 requests per minute
});

router.post('/create', limiter, chatGptController.getGPT3Completion);

module.exports = router;