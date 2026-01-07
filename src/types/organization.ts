export interface CreateOrganizationRequest {
  name: string;
  organization_key: string;
}

export interface CreateOrganizationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result?: {
    id: string;
    name: string;
    organization_key: string;
    created_at: string;
  };
}

export interface OrganizationError {
  message: string;
  status?: number;
}