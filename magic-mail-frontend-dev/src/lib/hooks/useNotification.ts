import { useContext } from 'react';
import { NotificationContext } from '../context/notificationContext';

export const useNotification = () => {
  const notificationContext = useContext(NotificationContext);

  if (!notificationContext)
    throw new Error('useNotification must be used within a NotificationContextProvider');

  return notificationContext;
};
