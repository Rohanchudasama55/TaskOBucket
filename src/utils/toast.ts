import { store } from '../redux/store'
import { addNotification } from '../redux/notificationSlice'

export const toast = {
  success: (message: string, title?: string, duration?: number) => {
    store.dispatch(addNotification({
      type: 'success',
      message,
      title,
      duration
    }))
  },
  
  error: (message: string, title?: string, duration?: number) => {
    store.dispatch(addNotification({
      type: 'error',
      message,
      title,
      duration
    }))
  },
  
  warning: (message: string, title?: string, duration?: number) => {
    store.dispatch(addNotification({
      type: 'warning',
      message,
      title,
      duration
    }))
  },
  
  info: (message: string, title?: string, duration?: number) => {
    store.dispatch(addNotification({
      type: 'info',
      message,
      title,
      duration
    }))
  }
}