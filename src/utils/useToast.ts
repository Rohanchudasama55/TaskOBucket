import { useAppDispatch } from '../redux/hooks'
import { addNotification } from '../redux/notificationSlice'

export function useToast() {
  const dispatch = useAppDispatch()

  const showToast = (
    type: 'success' | 'error' | 'warning' | 'info',
    message: string,
    title?: string,
    duration?: number
  ) => {
    dispatch(addNotification({
      type,
      message,
      title,
      duration
    }))
  }

  return {
    success: (message: string, title?: string, duration?: number) => 
      showToast('success', message, title, duration),
    error: (message: string, title?: string, duration?: number) => 
      showToast('error', message, title, duration),
    warning: (message: string, title?: string, duration?: number) => 
      showToast('warning', message, title, duration),
    info: (message: string, title?: string, duration?: number) => 
      showToast('info', message, title, duration),
  }
}