import { describe, it, expect, vi, beforeEach } from "vitest";
import { organizationService } from "../organizationService";
import type {
  CreateOrganizationRequest,
  CreateOrganizationResponse,
} from "../../types/organization";

// Mock axios module
const mockPost = vi.fn();
const mockIsAxiosError = vi.fn();
const mockAxiosInstance = {
  post: mockPost,
};

vi.mock("axios", () => ({
  default: {
    create: vi.fn(() => mockAxiosInstance),
    isAxiosError: mockIsAxiosError,
  },
}));

// Import axios after mocking
import axios from "axios";

describe("organizationService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("create", () => {
    it("should successfully create an organization", async () => {
      const mockRequest: CreateOrganizationRequest = {
        name: "Test Organization",
        organization_key: "test-organization",
      };

      const mockResponse: CreateOrganizationResponse = {
        success: true,
        statusCode: 201,
        message: "Organization created successfully",
        result: {
          id: "123",
          name: "Test Organization",
          organization_key: "test-organization",
          created_at: "2024-01-01T00:00:00Z",
        },
      };

      mockPost.mockResolvedValue({ data: mockResponse });

      const result = await organizationService.create(mockRequest);

      expect(result).toEqual(mockResponse);
      expect(mockPost).toHaveBeenCalledWith(
        "/organization/create",
        mockRequest,
      );
    });

    it("should handle API errors correctly", async () => {
      const mockRequest: CreateOrganizationRequest = {
        name: "Test Organization",
        organization_key: "test-organization",
      };

      const mockError = {
        response: {
          data: {
            message: "Organization key already exists",
          },
        },
      };

      mockPost.mockRejectedValue(mockError);
      mockIsAxiosError.mockReturnValue(true);

      await expect(organizationService.create(mockRequest)).rejects.toThrow(
        "Organization key already exists",
      );
    });

    it("should handle unexpected errors", async () => {
      const mockRequest: CreateOrganizationRequest = {
        name: "Test Organization",
        organization_key: "test-organization",
      };

      mockPost.mockRejectedValue(new Error("Network error"));
      mockIsAxiosError.mockReturnValue(false);

      await expect(organizationService.create(mockRequest)).rejects.toThrow(
        "An unexpected error occurred",
      );
    });

    it("should use correct API configuration", async () => {
      const mockRequest: CreateOrganizationRequest = {
        name: "Test Organization",
        organization_key: "test-organization",
      };

      mockPost.mockResolvedValue({ data: {} });

      await organizationService.create(mockRequest);

      expect(axios.create).toHaveBeenCalledWith({
        baseURL: "https://f71101ccbb70.ngrok-free.app/api",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
    });
  });
});
