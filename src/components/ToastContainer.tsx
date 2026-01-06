import { useAppSelector } from '../redux/hooks'
import { Toast } from './Toast'

export function ToastContainer() {
  const notifications = useAppSelector(state => state.notifications.notifications)

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map(notification => (
        <Toast key={notification.id} notification={notification} />
      ))}
    </div>
  )
}