import axios from 'axios';
import type { CreateOrganizationRequest, CreateOrganizationResponse } from '../types/organization';

const API_BASE_URL = 'https://f71101ccbb70.ngrok-free.app/api';

// Create axios instance with default config
const organizationApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
});

export const organizationService = {
  create: async (data: CreateOrganizationRequest): Promise<CreateOrganizationResponse> => {
    try {
      const response = await organizationApi.post<CreateOrganizationResponse>('/organization/create', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to create organization';
        throw new Error(errorMessage);
      }
      throw new Error('An unexpected error occurred');
    }
  },
};