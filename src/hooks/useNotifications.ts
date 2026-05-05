import { useCallback } from 'react';
import { useNotificationStore } from '@/store/notificationStore';

export const useNotifications = () => {
  const { permission, setPermission, addNotification } = useNotificationStore();

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return;
    }
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === 'granted') {
      addNotification({
        title: 'Notifications Enabled',
        message: 'You will now receive push notifications',
        type: 'success',
      });
    }
  }, [setPermission, addNotification]);

  const sendLocalNotification = useCallback((title: string, body: string) => {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/favicon.svg' });
    }
    addNotification({
      title,
      message: body,
      type: 'info',
    });
  }, [addNotification]);

  return { permission, requestPermission, sendLocalNotification };
};
