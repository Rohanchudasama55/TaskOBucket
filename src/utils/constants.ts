export const APP_NAME = import.meta.env.VITE_APP_NAME || 'TaskoBucket'
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0'
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
export const ENABLE_DEV_TOOLS = import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true'

// UI Constants
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

// API Constants
export const API_TIMEOUT = 10000
export const DEFAULT_PAGE_SIZE = 20
