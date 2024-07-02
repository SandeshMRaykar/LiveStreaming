const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
