import axios from "axios";
import type {
  LoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../types/auth";

const API_BASE_URL = "https://5699ff30f1a5.ngrok-free.app/api";
// Create axios instance with default config
const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await authApi.post<LoginResponse>(
        "/auth/login",
        credentials
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Login failed";
        throw new Error(errorMessage);
      }
      throw new Error("An unexpected error occurred");
    }
  },

  forgotPassword: async (
    data: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> => {
    try {
      const response = await authApi.post<ForgotPasswordResponse>(
        "/auth/forgot-password",
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Failed to send reset link";
        throw new Error(errorMessage);
      }
      throw new Error("An unexpected error occurred");
    }
  },

  resetPassword: async (
    data: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> => {
    try {
      const response = await authApi.put<ResetPasswordResponse>(
        "/auth/reset-password",
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Failed to reset password";
        throw new Error(errorMessage);
      }
      throw new Error("An unexpected error occurred");
    }
  },

  // Store token in localStorage
  setToken: (token: string) => {
    localStorage.setItem("auth_token", token);
  },

  // Get token from localStorage
  getToken: (): string | null => {
    return localStorage.getItem("auth_token");
  },

  // Remove token from localStorage
  removeToken: () => {
    localStorage.removeItem("auth_token");
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("auth_token");
  },

  // Decode user info from token (basic implementation)
  getUserFromToken: (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return {
        id: payload._id || payload.id,
        email: payload.email,
        name: payload.name,
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  },
};
