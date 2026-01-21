import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../hooks/useAuth";
import { LOGIN_FORM_DEFAULTS } from "./Login.constants";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface UseLoginFormReturn {
  formData: LoginFormData;
  error: string;
  isLoading: boolean;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearError: () => void;
}

export function useLoginForm(): UseLoginFormReturn {
  const [formData, setFormData] = useState<LoginFormData>({
    email: LOGIN_FORM_DEFAULTS.email,
    password: LOGIN_FORM_DEFAULTS.password,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
    if (error) setError(""); // Clear error when user starts typing
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
    if (error) setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("Login form submitted with:", { email: formData.email });

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      console.log("Attempting login...");
      const response = await loginMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
      });
      console.log("Login successful:", response);
      console.log("setupStep value:", response.result?.setupStep);

      // Small delay to ensure auth state is updated
      setTimeout(() => {
        const step = response.result?.setupStep ?? 0;
        const targetPath =
          step === 1
            ? "/auth/create-organization"
            : step === 2
              ? "/auth/user"
              : "/dashboard";

        console.log("Redirecting after login:", { step, targetPath });
        navigate(targetPath, { replace: true });
      }, 100);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    }
  };

  const clearError = () => {
    setError("");
  };

  return {
    formData,
    error,
    isLoading: loginMutation.isPending,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    clearError,
  };
}
