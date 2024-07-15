const ChatMessage = require('../models/ChatMessage');

exports.getChatMessages = async (req, res) => {
    // Logic to get chat messages
    try {
        const messages = await ChatMessage.find().sort({ createdAt: -1 }).limit(50); // Adjust limit as needed
        res.json(messages.reverse()); // Reverse to send in chronological order
      } catch (error) {
        res.status(500).json({ message: 'Error fetching messages' });
      }
    };

exports.createChatMessage = async (req, res) => {
    // Logic to create chat message
    try {
        const { message } = req.body;
        const newMessage = new ChatMessage({ message });
        await newMessage.save();
        res.status(201).json(newMessage);
      } catch (error) {
        res.status(500).json({ message: 'Error creating message' });
      }
};
