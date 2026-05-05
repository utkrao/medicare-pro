import { useNotificationStore } from '@/store/notificationStore';
import { useNotifications } from '@/hooks/useNotifications';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import './NotificationsPage.css';

export const NotificationsPage = () => {
  const { notifications, markAsRead, removeNotification, clearAll } = useNotificationStore();
  const { requestPermission, sendLocalNotification } = useNotifications();
  const unreadCount = notifications.filter((notification) => !notification.read).length;
  const criticalCount = notifications.filter((notification) => notification.type === 'error').length;

  const handleTestNotification = () => {
    sendLocalNotification('Test Notification', 'This is a local push notification demo');
  };

  const typeColors: Record<string, string> = {
    info: '#2563eb',
    success: '#15803d',
    warning: '#d97706',
    error: '#dc2626',
  };

  return (
    <div className="notifications">
      <div className="page-header">
        <span className="page-header__eyebrow">Alerts Console</span>
        <h1>Keep teams aligned on every escalation.</h1>
        <p>
          Review unread alerts, test notification delivery, and keep care coordination
          visible across the platform.
        </p>
      </div>

      <div className="notifications__summary">
        <Card className="notifications__summary-card">
          <span className="notifications__summary-label">Total alerts</span>
          <strong>{notifications.length}</strong>
        </Card>
        <Card className="notifications__summary-card">
          <span className="notifications__summary-label">Unread</span>
          <strong>{unreadCount}</strong>
        </Card>
        <Card className="notifications__summary-card">
          <span className="notifications__summary-label">Critical</span>
          <strong>{criticalCount}</strong>
        </Card>
      </div>

      <div className="notifications__actions">
        <Button variant="secondary" onClick={requestPermission}>
          Enable Push Notifications
        </Button>
        <Button variant="primary" onClick={handleTestNotification}>
          Send Test Notification
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear All
        </Button>
      </div>

      <div className="notifications__list">
        {notifications.length === 0 && (
          <Card className="notifications__empty">
            <p>No notifications yet</p>
          </Card>
        )}

        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`notifications__item ${notification.read ? 'notifications__item--read' : ''}`}
          >
            <div
              className="notifications__dot"
              style={{ background: typeColors[notification.type] || '#6b7280' }}
            />
            <div className="notifications__content">
              <h4 className="notifications__title">{notification.title}</h4>
              <p className="notifications__message">{notification.message}</p>
              <span className="notifications__time">
                {new Date(notification.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="notifications__actions-row">
              {!notification.read && (
                <button
                  className="notifications__action"
                  type="button"
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark read
                </button>
              )}
              <button
                className="notifications__action notifications__action--danger"
                type="button"
                onClick={() => removeNotification(notification.id)}
              >
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
