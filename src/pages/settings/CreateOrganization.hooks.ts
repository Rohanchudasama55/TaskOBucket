import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { organizationService } from '../../services/organizationService';
import type { CreateOrganizationRequest } from '../../types/organization';

export interface CreateOrganizationFormData {
  name: string;
  organization_key: string;
}

export interface UseCreateOrganizationReturn {
  formData: CreateOrganizationFormData;
  error: string;
  success: string;
  isLoading: boolean;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearMessages: () => void;
  resetForm: () => void;
  previewUrl: string;
}

export function useCreateOrganization(): UseCreateOrganizationReturn {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateOrganizationFormData>({
    name: '',
    organization_key: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-generate organization key from name
  useEffect(() => {
    const generateKey = (name: string) => {
      return name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 20);
    };
    
    if (formData.name) {
      setFormData(prev => ({ ...prev, organization_key: generateKey(formData.name) }));
    } else {
      setFormData(prev => ({ ...prev, organization_key: '' }));
    }
  }, [formData.name]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, name: e.target.value }));
    if (error) setError(''); // Clear error when user starts typing
    if (success) setSuccess(''); // Clear success when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    console.log('Create organization form submitted with:', formData);
    
    // Basic validation
    if (!formData.name.trim()) {
      setError('Organization name is required');
      setIsLoading(false);
      return;
    }

    if (!formData.organization_key.trim()) {
      setError('Organization key could not be generated');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Creating organization...');
      const requestData: CreateOrganizationRequest = {
        name: formData.name.trim(),
        organization_key: formData.organization_key.trim()
      };
      
      const result = await organizationService.create(requestData);
      console.log('Organization created successfully:', result);
      
      setSuccess(`Organization "${formData.name}" created successfully!`);
      
      // Navigate to projects page after successful creation
      setTimeout(() => {
        navigate('/projects');
      }, 1500); // Shorter delay to show success message briefly before redirect
      
    } catch (err: any) {
      console.error('Create organization error:', err);
      setError(err.message || 'Failed to create organization. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const resetForm = () => {
    setFormData({ name: '', organization_key: '' });
    clearMessages();
  };

  const previewUrl = formData.organization_key 
    ? `taskobucket.com/${formData.organization_key}` 
    : 'taskobucket.com/your-org';

  return {
    formData,
    error,
    success,
    isLoading,
    handleNameChange,
    handleSubmit,
    clearMessages,
    resetForm,
    previewUrl
  };
}