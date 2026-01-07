import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useResetPassword } from '../../../hooks/useAuth';
import { RESET_PASSWORD_FORM_DEFAULTS } from './ResetPassword.constants';

export interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export interface UseResetPasswordFormReturn {
  formData: ResetPasswordFormData;
  error: string;
  isLoading: boolean;
  isSuccess: boolean;
  successMessage: string;
  token: string | null;
  isValidToken: boolean;
  handleNewPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearError: () => void;
  navigateToLogin: () => void;
}

// Password validation regex
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export function useResetPasswordForm(): UseResetPasswordFormReturn {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    newPassword: RESET_PASSWORD_FORM_DEFAULTS.newPassword,
    confirmPassword: RESET_PASSWORD_FORM_DEFAULTS.confirmPassword
  });
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState(true);

  const resetPasswordMutation = useResetPassword();

  // Extract token from URL parameters
  useEffect(() => {
    const tokenParam = searchParams.get('token');
    console.log('Token from URL:', tokenParam);
    
    if (tokenParam) {
      setToken(tokenParam);
      setIsValidToken(true);
    } else {
      setIsValidToken(false);
      setError('Invalid or missing reset token. Please request a new password reset link.');
    }
  }, [searchParams]);

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, newPassword: e.target.value }));
    if (error) setError(''); // Clear error when user starts typing
    if (isSuccess) setIsSuccess(false); // Clear success state when user starts typing
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, confirmPassword: e.target.value }));
    if (error) setError(''); // Clear error when user starts typing
    if (isSuccess) setIsSuccess(false); // Clear success state when user starts typing
  };

  const validatePassword = (password: string): string | null => {
    if (!password) {
      return 'Please enter a new password';
    }
    
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    
    if (!PASSWORD_REGEX.test(password)) {
      return 'Password must contain uppercase, lowercase, number, and special character';
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSuccess(false);
    
    console.log('Reset password form submitted');
    
    // Check if token is valid
    if (!token || !isValidToken) {
      setError('Invalid or expired reset token. Please request a new password reset link.');
      return;
    }

    // Validate new password
    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Check if passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      console.log('Attempting to reset password...');
      const result = await resetPasswordMutation.mutateAsync({
        token,
        newPassword: formData.newPassword
      });
      console.log('Password reset successful:', result);
      
      setIsSuccess(true);
      setSuccessMessage(result.message || 'Password reset successfully!');
    } catch (err: any) {
      console.error('Reset password error:', err);
      
      // Handle specific error cases
      if (err.message.includes('token') || err.message.includes('expired')) {
        setError('Invalid or expired reset token. Please request a new password reset link.');
        setIsValidToken(false);
      } else {
        setError(err.message || 'Failed to reset password. Please try again.');
      }
    }
  };

  const clearError = () => {
    setError('');
  };

  const navigateToLogin = () => {
    navigate('/auth/login', { replace: true });
  };

  return {
    formData,
    error,
    isLoading: resetPasswordMutation.isPending,
    isSuccess,
    successMessage,
    token,
    isValidToken,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
    clearError,
    navigateToLogin
  };
}