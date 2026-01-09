import axios from 'axios';
import type { LoginRequest, LoginResponse, ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse, UserUpdateRequest, UserUpdateResponse, RegisterRequest, RegisterResponse } from '../types/auth';

const API_BASE_URL = 'https://40854664e1e2.ngrok-free.app/api';

// Create axios instance with default config
const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
});

export const authService = {
 

  userUpdate: async (userId: string, userData: UserUpdateRequest): Promise<UserUpdateResponse> => {
    try {
      const response = await authApi.put<UserUpdateResponse>(`/user/user-update/${userId}`, userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'User update failed';
        throw new Error(errorMessage);
      }
      throw new Error('An unexpected error occurred');
    }
  },

  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await authApi.post<LoginResponse>('/auth/login', credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Login failed';
        throw new Error(errorMessage);
      }
      throw new Error('An unexpected error occurred');
    }
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    try {
      const response = await authApi.post<ForgotPasswordResponse>('/auth/forgot-password', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to send reset link';
        throw new Error(errorMessage);
      }
      throw new Error('An unexpected error occurred');
    }
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    try {
      const response = await authApi.put<ResetPasswordResponse>('/auth/reset-password', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to reset password';
        throw new Error(errorMessage);
      }
      throw new Error('An unexpected error occurred');
    }
  },
  acceptInvite: async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    try {
      const response = await authApi.put<ResetPasswordResponse>('/user/accept-invite?token=${data.token}', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to accept invite';
        throw new Error(errorMessage);
      }
      throw new Error('An unexpected error occurred');
    }
  },
  
  // Store token in localStorage
  setToken: (token: string) => {
    localStorage.setItem('auth_token', token);
  },

  // Get token from localStorage
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  // Store user data in localStorage
  setUser: (user: { name: string; email?: string; id?: string }) => {
    localStorage.setItem('auth_user', JSON.stringify(user));
  },

  // Get user data from localStorage
  getUser: () => {
    const userData = localStorage.getItem('auth_user');
    return userData ? JSON.parse(userData) : null;
  },

  // Remove token and user data from localStorage
  removeToken: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },

  // Decode user info from token (basic implementation)
  getUserFromToken: (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload._id || payload.id,
        email: payload.email,
        name: payload.name
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
};