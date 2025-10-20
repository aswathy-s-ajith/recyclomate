const Notification = require('../models/notificationModel');

// Create a new notification
const createNotification = async ({
  recipient,
  recipientModel,
  title,
  message,
  type,
  pickupId
}) => {
  try {
    const notification = new Notification({
      recipient,
      recipientModel,
      title,
      message,
      type,
      pickupId
    });
    await notification.save();
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

// Get notifications for a user/driver
const getNotifications = async (req, res) => {
  try {
    const { id, role } = req.user;
    const recipientModel = role === 'user' ? 'User' : 'Driver';

    const notifications = await Notification.find({
      recipient: id,
      recipientModel
    })
    .sort({ createdAt: -1 })
    .limit(50);

    res.status(200).json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

// Mark notification as read
const markNotificationRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ notification });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Error updating notification' });
  }
};

// Mark all notifications as read
const markAllNotificationsRead = async (req, res) => {
  try {
    const { id, role } = req.user;
    const recipientModel = role === 'user' ? 'User' : 'Driver';

    await Notification.updateMany(
      { recipient: id, recipientModel },
      { read: true }
    );

    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ message: 'Error updating notifications' });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead
};