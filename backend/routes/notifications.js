const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

router.post('/', async (req, res) => {
    const { userId, message } = req.body;

    const notification = new Notification({ userId, message });
    await notification.save();

    res.send(notification);
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    const notifications = await Notification.find({ userId });
    res.send(notifications);
});

module.exports = router;
