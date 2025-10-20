import React, { useState, useEffect } from 'react';

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '10vh',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '80vh',
    overflow: 'auto',
    padding: '20px',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingRight: '20px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  },
  markAllRead: {
    background: 'none',
    border: 'none',
    color: '#4CAF50',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  notificationList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  notification: {
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    borderLeft: '4px solid #4CAF50',
    cursor: 'pointer',
  },
  notificationUnread: {
    backgroundColor: '#e8f5e9',
  },
  notificationTitle: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  notificationMessage: {
    fontSize: '0.9rem',
    color: '#666',
  },
  notificationTime: {
    fontSize: '0.8rem',
    color: '#888',
    marginTop: '5px',
  },
  noNotifications: {
    textAlign: 'center',
    color: '#666',
    padding: '20px',
  },
};

const NotificationsModal = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setNotifications(data.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Update the local state
      setNotifications(notifications.map(notif => 
        notif._id === notificationId ? { ...notif, read: true } : notif
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/api/notifications/mark-all-read', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Update all notifications in local state
      setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  if (!isOpen) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>×</button>
        
        <div style={styles.header}>
          <h2 style={styles.title}>Notifications</h2>
          <button style={styles.markAllRead} onClick={markAllAsRead}>
            Mark all as read
          </button>
        </div>

        {loading ? (
          <div style={styles.noNotifications}>Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div style={styles.noNotifications}>No notifications</div>
        ) : (
          <div style={styles.notificationList}>
            {notifications.map((notification) => (
              <div
                key={notification._id}
                style={{
                  ...styles.notification,
                  ...(notification.read ? {} : styles.notificationUnread),
                }}
                onClick={() => markAsRead(notification._id)}
              >
                <div style={styles.notificationTitle}>{notification.title}</div>
                <div style={styles.notificationMessage}>{notification.message}</div>
                <div style={styles.notificationTime}>
                  {formatDate(notification.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsModal;