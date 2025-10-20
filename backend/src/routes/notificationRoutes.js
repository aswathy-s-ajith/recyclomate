const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead
} = require('../controller/notificationController');

router.get('/', authenticateToken, getNotifications);
router.put('/:notificationId/read', authenticateToken, markNotificationRead);
router.put('/mark-all-read', authenticateToken, markAllNotificationsRead);

module.exports = router;