import axios from 'axios'
import { toast } from '../utils/toast'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://70175e4a16c6.ngrok-free.app/api'

export const api = axios.create({ 
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Show success toast only for non-GET requests (POST, PUT, DELETE, etc.)
    if (response.config.method && !['get', 'head', 'options'].includes(response.config.method.toLowerCase())) {
      const method = response.config.method.toUpperCase()
      const actionMap: Record<string, string> = {
        'POST': 'created',
        'PUT': 'updated', 
        'PATCH': 'updated',
        'DELETE': 'deleted'
      }
      const action = actionMap[method] || 'completed'
      toast.success(`Operation ${action} successfully`)
    }
    return response
  },
  (error) => {
    // Handle different error scenarios
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      toast.error('Session expired. Please login again.', 'Authentication Error')
      window.location.href = '/login'
    } else if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action.', 'Access Denied')
    } else if (error.response?.status === 404) {
      toast.error('The requested resource was not found.', 'Not Found')
    } else if (error.response?.status >= 500) {
      toast.error('Server error occurred. Please try again later.', 'Server Error')
    } else if (error.code === 'NETWORK_ERROR' || !error.response) {
      toast.error('Network error. Please check your connection.', 'Connection Error')
    } else {
      // Generic error message
      const message = error.response?.data?.message || error.message || 'An unexpected error occurred'
      toast.error(message, 'Error')
    }
    return Promise.reject(error)
  }
)
