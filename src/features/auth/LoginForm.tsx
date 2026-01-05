import React, { useState } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { loginStart, loginSuccess, loginFailure } from './authSlice'
import { authApi } from './authApi'
import type { LoginCredentials } from './authApi'

export function LoginForm() {
  const dispatch = useAppDispatch()
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(loginStart())
    
    try {
      const response = await authApi.login(credentials)
      dispatch(loginSuccess({
        user: {
          id: response.id,
          name: response.name,
          email: response.email
        },
        token: response.token
      }))
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Sign In
      </button>
    </form>
  )
}
