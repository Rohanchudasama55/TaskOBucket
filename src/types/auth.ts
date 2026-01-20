export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result: {
    token: string;
    name: string;
    setupStep?: number;
  };
}

export interface ForgotPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface UserUpdateRequest {
  name: string;
  jobTitle?: string;
  avatarUrl?: string;
  isActive: boolean;
}

export interface UserUpdateResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result?: {
    id: string;
    name: string;
    jobTitle?: string;
    avatarUrl?: string;
    isActive: boolean;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  companyName: string;
}

export interface RegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result: {
    token: string;
    name: string;
    requiresSetup: boolean;
  };
}

export interface AuthError {
  message: string;
  status?: number;
}
