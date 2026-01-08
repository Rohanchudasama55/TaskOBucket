import { api } from './axios';
import type { CreateOrganizationRequest, CreateOrganizationResponse } from '../types/organization';

export const organizationService = {
  create: async (data: CreateOrganizationRequest): Promise<CreateOrganizationResponse> => {
    try {
      const response = await api.post<CreateOrganizationResponse>('/organization/create', data);
      return response.data;
    } catch (error: any) {
      // The axios interceptor will handle error display, but we still need to throw for the hook
      const errorMessage = error.response?.data?.message || 'Failed to create organization';
      throw new Error(errorMessage);
    }
  },
};