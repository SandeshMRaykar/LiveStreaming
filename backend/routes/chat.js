const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');

router.post('/', async (req, res) => {
    const { userId, message } = req.body;

    const chatMessage = new ChatMessage({ userId, message });
    await chatMessage.save();

    res.send(chatMessage);
});

router.get('/', async (req, res) => {
    const messages = await ChatMessage.find();
    res.send(messages);
});

module.exports = router;
