import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAcceptInvite } from '../../hooks/useAuth';
import { ACCEPT_INVITE_FORM_DEFAULTS } from './Constant';

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
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export function useAcceptInviteForm(): UseResetPasswordFormReturn {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ResetPasswordFormData>({
    newPassword: ACCEPT_INVITE_FORM_DEFAULTS.newPassword,
    confirmPassword: ACCEPT_INVITE_FORM_DEFAULTS.confirmPassword
  });

  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState(true);

  const acceptInviteMutation = useAcceptInvite();

  // Extract invite token from URL
  useEffect(() => {
    const tokenParam = searchParams.get('token');

    if (tokenParam) {
      setToken(tokenParam);
      setIsValidToken(true);
    } else {
      setIsValidToken(false);
      setError(
        'Invalid or missing invitation link. Please contact the administrator.'
      );
    }
  }, [searchParams]);

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, newPassword: e.target.value }));
    if (error) setError('');
    if (isSuccess) setIsSuccess(false);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, confirmPassword: e.target.value }));
    if (error) setError('');
    if (isSuccess) setIsSuccess(false);
  };

  const validatePassword = (password: string): string | null => {
    if (!password) {
      return 'Please create a password to activate your account';
    }

    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }

    if (!PASSWORD_REGEX.test(password)) {
      return 'Password must include uppercase, lowercase, number, and special character';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSuccess(false);

    // Token validation
    if (!token || !isValidToken) {
      setError(
        'This invitation link is invalid or has expired. Please contact the administrator.'
      );
      return;
    }

    // Password validation
    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Match passwords
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const result = await acceptInviteMutation.mutateAsync({
        token,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      });

      setIsSuccess(true);
      setSuccessMessage(
        result.message || 'Invitation accepted successfully. Your account is now active.'
      );
    } catch (err: any) {
      if (err.message?.includes('token') || err.message?.includes('expired')) {
        setError(
          'This invitation link is invalid or has expired. Please contact the administrator.'
        );
        setIsValidToken(false);
      } else {
        setError(
          err.message || 'Failed to accept invitation. Please try again.'
        );
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
    isLoading: acceptInviteMutation.isPending,
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
