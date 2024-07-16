const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
    // Logic to get notifications
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        res.json(notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Server error' });
      }
    };

exports.createNotification = async (req, res) => {
    // Logic to create notification
    try {
        const newNotification = new Notification({
          title,
          message,
          user
        });
    
        const savedNotification = await newNotification.save();
        res.status(201).json(savedNotification);
      } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ message: 'Server error' });
      }
};
