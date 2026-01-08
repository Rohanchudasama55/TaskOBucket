import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuthContext } from '../contexts/AuthContext';
import type { LoginRequest, LoginResponse, ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse, AuthError } from '../types/auth';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setUser, setToken } = useAuthContext();

  return useMutation<LoginResponse, AuthError, LoginRequest>({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.log('Login response:', data);
      
      // Extract token from the nested response structure
      const token = data.result.token;
      
      // Store token in context and localStorage
      setToken(token);
      
      // Create user data from response and store it
      const userData = {
        id: '', // Will be decoded from token if needed
        email: '', // Could be passed from login form if needed
        name: data.result.name
      };
      
      // Store user data in context and localStorage
      setUser(userData);
      authService.setUser(userData);
      
      // Invalidate and refetch any auth-related queries
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      
      // Don't navigate here - let the calling component handle navigation
      console.log('Login successful, letting component handle navigation...');
    },
    onError: (error) => {
      console.error('Login failed:', error.message);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, AuthError, ForgotPasswordRequest>({
    mutationFn: authService.forgotPassword,
    onSuccess: (data) => {
      console.log('Forgot password response:', data);
    },
    onError: (error) => {
      console.error('Forgot password failed:', error.message);
    },
  });
};

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, AuthError, ResetPasswordRequest>({
    mutationFn: authService.resetPassword,
    onSuccess: (data) => {
      console.log('Reset password response:', data);
    },
    onError: (error) => {
      console.error('Reset password failed:', error.message);
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout } = useAuthContext();

  return useMutation({
    mutationFn: async () => {
      // Clear auth state
      logout();
      
      // Clear all cached data
      queryClient.clear();
      
      // Navigate to login
      navigate('/auth/login', { replace: true });
    },
  });
};

// Hook to get current auth state
export const useAuthState = () => {
  const { user, token, isAuthenticated, isLoading } = useAuthContext();

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
  };
};