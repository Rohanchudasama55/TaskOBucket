export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  id: string
  name: string
  email: string
  token: string
}

// Auth API functions
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // TODO: Replace with actual API call
    console.log('Login attempt for:', credentials.email)
    return Promise.resolve({ 
      id: 'user-1', 
      name: 'Demo User',
      email: credentials.email,
      token: 'demo-token'
    })
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    // TODO: Replace with actual API call
    console.log('Register attempt for:', credentials.email)
    return Promise.resolve({ 
      id: 'user-2', 
      name: credentials.name,
      email: credentials.email,
      token: 'demo-token'
    })
  },

  logout: async (): Promise<void> => {
    // TODO: Replace with actual API call
    console.log('Logout')
    return Promise.resolve()
  },

  refreshToken: async (): Promise<AuthResponse> => {
    // TODO: Replace with actual API call
    return Promise.resolve({ 
      id: 'user-1', 
      name: 'Demo User',
      email: 'demo@example.com',
      token: 'refreshed-token'
    })
  }
}

// Legacy exports for backward compatibility
export const login = authApi.login
