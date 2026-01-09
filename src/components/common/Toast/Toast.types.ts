export interface ToastProps {
  notification: Notification;
}

export interface Notification {
  id: string;
  type: 'error' | 'success' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
}

export type ToastType = 'error' | 'success' | 'warning' | 'info';