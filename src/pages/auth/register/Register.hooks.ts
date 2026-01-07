import { useState } from 'react';
import { REGISTER_FORM_DEFAULTS, REGISTER_MESSAGES, REGISTER_SIMULATION_DELAY } from './Register.constants';

export interface RegisterFormData {
  fullName: string;
  companyName: string;
  email: string;
  password: string;
}

export interface UseRegisterFormReturn {
  formData: RegisterFormData;
  acceptTerms: boolean;
  error: string;
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTermsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearError: () => void;
}

export function useRegisterForm(): UseRegisterFormReturn {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: REGISTER_FORM_DEFAULTS.fullName,
    companyName: REGISTER_FORM_DEFAULTS.companyName,
    email: REGISTER_FORM_DEFAULTS.email,
    password: REGISTER_FORM_DEFAULTS.password
  });
  const [acceptTerms, setAcceptTerms] = useState<boolean>(REGISTER_FORM_DEFAULTS.acceptTerms);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptTerms(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      setError(REGISTER_MESSAGES.termsRequired);
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('Signup successful', formData);
        setIsLoading(false);
        resolve();
      }, REGISTER_SIMULATION_DELAY);
    });
  };

  const clearError = () => {
    setError('');
  };

  return {
    formData,
    acceptTerms,
    error,
    isLoading,
    handleChange,
    handleTermsChange,
    handleSubmit,
    clearError
  };
}