import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuthContext } from '../contexts/AuthContext';
import type { LoginRequest, LoginResponse, ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse, AuthError } from '../types/auth';

export const useLogin = () => {
  const navigate = useNavigate();
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
      
      // Decode user info from token
      const userInfo = authService.getUserFromToken(token);
      if (userInfo) {
        setUser(userInfo);
      }
      
      // Invalidate and refetch any auth-related queries
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      
      console.log('Navigating to dashboard...');
      // Navigate to dashboard or intended page
      navigate('/dashboard', { replace: true });
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