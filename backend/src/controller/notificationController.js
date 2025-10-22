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
    console.log('Notification created:', notification);
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

const getNotifications = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Check if token exists
    
    const response = await fetch('http://localhost:5000/api/notifications', {
      headers: {
        Authorization: Bearer ${token},
      },
    });
    
    console.log('Response status:', response.status); // Check status code
    const data = await response.json();
    console.log('Notifications data:', data); // See what's returned
    
    setNotifications(data.notifications || []); // Add fallback
  } catch (error) {
    console.error('Error fetching notifications:', error);
  } finally {
    setLoading(false);
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