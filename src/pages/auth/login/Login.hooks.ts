import { useState } from 'react';
import { LOGIN_FORM_DEFAULTS, DEMO_CREDENTIALS, LOGIN_MESSAGES, LOGIN_SIMULATION_DELAY } from './Login.constants';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface UseLoginFormReturn {
  formData: LoginFormData;
  error: string;
  isLoading: boolean;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearError: () => void;
}

export function useLoginForm(): UseLoginFormReturn {
  const [formData, setFormData] = useState<LoginFormData>({
    email: LOGIN_FORM_DEFAULTS.email,
    password: LOGIN_FORM_DEFAULTS.password
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, email: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, password: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (formData.email === DEMO_CREDENTIALS.email && formData.password === DEMO_CREDENTIALS.password) {
          // Success - redirect would happen here
          console.log('Login successful');
        } else {
          setError(LOGIN_MESSAGES.invalidCredentials);
        }
        setIsLoading(false);
        resolve();
      }, LOGIN_SIMULATION_DELAY);
    });
  };

  const clearError = () => {
    setError('');
  };

  return {
    formData,
    error,
    isLoading,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    clearError
  };
}