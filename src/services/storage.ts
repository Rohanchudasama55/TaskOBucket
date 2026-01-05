interface StorageService {
  get: (key: string) => string | null
  set: (key: string, value: string) => boolean
  remove: (key: string) => boolean
  getJSON: <T>(key: string) => T | null
  setJSON: <T>(key: string, value: T) => boolean
}

export const storage: StorageService = {
  get: (key: string) => {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  },
  
  set: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.error('Error writing to localStorage:', error)
      return false
    }
  },
  
  remove: (key: string) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error removing from localStorage:', error)
      return false
    }
  },
  
  getJSON: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error)
      return null
    }
  },
  
  setJSON: <T>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Error storing JSON to localStorage:', error)
      return false
    }
  },
}
