import { useState } from 'react';
import { useForgotPassword } from '../../../hooks/useAuth';
import { FORGOT_PASSWORD_FORM_DEFAULTS } from './ForgotPassword.constants';

export interface ForgotPasswordFormData {
  email: string;
}

export interface UseForgotPasswordFormReturn {
  formData: ForgotPasswordFormData;
  error: string;
  isLoading: boolean;
  isSuccess: boolean;
  successMessage: string;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearError: () => void;
  resetForm: () => void;
}

export function useForgotPasswordForm(): UseForgotPasswordFormReturn {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: FORGOT_PASSWORD_FORM_DEFAULTS.email
  });
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const forgotPasswordMutation = useForgotPassword();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, email: e.target.value }));
    if (error) setError(''); // Clear error when user starts typing
    if (isSuccess) setIsSuccess(false); // Clear success state when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSuccess(false);
    
    console.log('Forgot password form submitted with:', { email: formData.email });
    
    // Basic validation
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      console.log('Attempting to send reset link...');
      const result = await forgotPasswordMutation.mutateAsync({
        email: formData.email
      });
      console.log('Reset link sent successfully:', result);
      
      setIsSuccess(true);
      setSuccessMessage(result.message || 'Password reset link sent successfully!');
    } catch (err: any) {
      console.error('Forgot password error:', err);
      setError(err.message || 'Failed to send reset link. Please try again.');
    }
  };

  const clearError = () => {
    setError('');
  };

  const resetForm = () => {
    setFormData({ email: FORGOT_PASSWORD_FORM_DEFAULTS.email });
    setError('');
    setIsSuccess(false);
    setSuccessMessage('');
  };

  return {
    formData,
    error,
    isLoading: forgotPasswordMutation.isPending,
    isSuccess,
    successMessage,
    handleEmailChange,
    handleSubmit,
    clearError,
    resetForm
  };
}