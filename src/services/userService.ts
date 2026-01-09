import { api } from "./axios";

export interface InviteUserRequest {
  name: string;
  email: string;
}

export interface InviteUserResponse {
  success: boolean;
  message: string;
}

export const userService = {
  invite: async (data: InviteUserRequest): Promise<InviteUserResponse> => {
    const response = await api.post<InviteUserResponse>("/user/invite", data);
    return response.data;
  },
};
