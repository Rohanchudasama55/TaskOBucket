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
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  result: {
    token: string;
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

export interface AuthError {
  message: string;
  status?: number;
}