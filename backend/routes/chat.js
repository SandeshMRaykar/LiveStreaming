const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/', chatController.getChatMessages);
router.post('/', chatController.createChatMessage);

module.exports = router;
