import { store } from '../redux/store';
import { addNotification } from '../redux/notificationSlice';
import type { ToastType } from '../components/common/Toast/Toast.types';

/**
 * Toast utility functions for displaying notifications
 */
export const toast = {
  success: (message: string, title?: string) => {
    store.dispatch(addNotification({
      id: Date.now().toString(),
      type: 'success' as ToastType,
      title: title || 'Success',
      message,
      duration: 5000
    }));
  },

  error: (message: string, title?: string) => {
    store.dispatch(addNotification({
      id: Date.now().toString(),
      type: 'error' as ToastType,
      title: title || 'Error',
      message,
      duration: 5000
    }));
  },

  warning: (message: string, title?: string) => {
    store.dispatch(addNotification({
      id: Date.now().toString(),
      type: 'warning' as ToastType,
      title: title || 'Warning',
      message,
      duration: 5000
    }));
  },

  info: (message: string, title?: string) => {
    store.dispatch(addNotification({
      id: Date.now().toString(),
      type: 'info' as ToastType,
      title: title || 'Info',
      message,
      duration: 5000
    }));
  }
};

export default toast;