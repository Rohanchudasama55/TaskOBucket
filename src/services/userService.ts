import { api } from "./axios";

export interface InviteUserRequest {
  name: string;
  email: string;
}

export interface InviteUserResponse {
  success: boolean;
  message: string;
}

export interface ApiUser {
  id?: string | number;
  _id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  profileImage?: string;
  role?: string;
  status?: string;
  lastActive?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface UserListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface UserListResponse {
  success?: boolean;
  statusCode?: number;
  message?: string;
  error?: string;
  data?: unknown;
  users?: ApiUser[];
  result?: unknown;
  total?: number;
  page?: number;
  limit?: number;
}

export interface DeleteUserResponse {
  success?: boolean;
  statusCode?: number;
  message?: string;
  error?: string;
}

export const userService = {
  invite: async (data: InviteUserRequest): Promise<InviteUserResponse> => {
    const response = await api.post<InviteUserResponse>("/user/invite", data);
    return response.data;
  },

  list: async (params: UserListParams): Promise<UserListResponse> => {
    try {
      const response = await api.get<UserListResponse>("/user/list", {
        params,
      });
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to fetch users";
      throw new Error(message);
    }
  },

  delete: async (id: string): Promise<DeleteUserResponse> => {
    try {
      const response = await api.delete<DeleteUserResponse>(
        `/user/user-delete/${id}`
      );
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to delete user";
      throw new Error(message);
    }
  },
};
