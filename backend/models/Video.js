const mongoose = require('mongoose');
const VideoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Video', VideoSchema);
