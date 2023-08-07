const router = require('express').Router();
const chatController = require('./chatGpt.controller');
const checkAuth = require('../../middleware/checkAuth');
const upload = require('../../helpers/multer');
const { hasRole, hasMultipleRole } = require('../../middleware/checkRole');

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // 20 requests per minute
});

router.post('/create', checkAuth, hasMultipleRole('USER', 'ADMIN'), limiter, chatController.getGPT3Completion);
router.post('/fetch-models', checkAuth, hasMultipleRole('USER', 'ADMIN'), limiter, chatController.fetchModels);
router.post('/create-image', limiter, chatController.createImage);

module.exports = router;