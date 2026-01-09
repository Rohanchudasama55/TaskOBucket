import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import { useAuthContext } from '../../../contexts/AuthContext';
import { toast } from '../../../utils/toast';
import { NavigationManager } from '../../../utils/navigation';
import { REGISTER_FORM_DEFAULTS, REGISTER_MESSAGES } from './Register.constants';

export interface RegisterFormData {
  fullName: string;
  companyName: string;
  email: string;
  jobTitle: string;
  avatarUrl: string;
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
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: REGISTER_FORM_DEFAULTS.fullName,
    companyName: REGISTER_FORM_DEFAULTS.companyName,
    email: REGISTER_FORM_DEFAULTS.email,
    jobTitle: '',
    avatarUrl: '',
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
    
    try {
      // Get user ID from localStorage using NavigationManager utility
      const userId = NavigationManager.getUserId();
      
      if (!userId) {
        setError('User not authenticated. Please log in first.');
        return;
      }
      
      const updateData = {
        name: formData.fullName,
        jobTitle: formData.jobTitle || '',
        avatarUrl: formData.avatarUrl || '',
        isActive: true
      };

      const response = await authService.userUpdate(userId, updateData);
      
      if (response.success && response.result) {
        // Store user data in context and localStorage
        const userData = {
          id: response.result.id,
          email: formData.email,
          name: response.result.name
        };
        setUser(userData);
        authService.setUser(userData);
        
        // Show success message
        toast.success('Profile updated successfully!');
        
        // Use NavigationManager to handle navigation based on requiresSetup
        NavigationManager.handlePostUserUpdateNavigation(response, navigate);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Profile update failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
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