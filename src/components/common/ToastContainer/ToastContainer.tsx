import { useAppSelector } from '../../../redux/hooks';
import { Toast } from '../Toast';
import type { ToastContainerProps } from './ToastContainer.types';
import { DEFAULT_CLASS_NAME } from './ToastContainer.constants';
import { getToastContainerStyles } from './ToastContainer.styles';

export function ToastContainer({ className = DEFAULT_CLASS_NAME }: ToastContainerProps) {
  const notifications = useAppSelector(state => state.notifications.notifications);

  if (notifications.length === 0) return null;

  const containerStyles = getToastContainerStyles(className);

  return (
    <div className={containerStyles}>
      {notifications.map(notification => (
        <Toast key={notification.id} notification={notification} />
      ))}
    </div>
  );
}