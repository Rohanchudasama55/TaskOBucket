import { useState } from "react";
import { userService } from "../../services/userService";
import { toast } from "../../utils/toast";
import { INVITE_MODAL_CONSTANTS } from "./InviteModal.constants";
import type { InviteModalProps } from "./InviteModal.types";

export interface UseInviteModalReturn {
  formData: { name: string; email: string };
  isLoading: boolean;
  error: string | null;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
}

export function useInviteModal({
  onClose,
  onSendInvite,
}: Pick<InviteModalProps, "onClose" | "onSendInvite">): UseInviteModalReturn {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Call the API
      const response = await userService.invite({
        name: formData.name.trim(),
        email: formData.email.trim(),
      });

      // Show success message
      toast.success(
        response.message || INVITE_MODAL_CONSTANTS.MESSAGES.SUCCESS_DEFAULT,
        "Success"
      );

      // Call optional callback if provided
      if (onSendInvite) {
        await onSendInvite(formData);
      }

      // Reset form and close modal
      setFormData({ name: "", email: "" });
      onClose();
    } catch (err) {
      // Error handling is done by axios interceptor, but we can set local error state
      // for additional UI feedback if needed
      const errorMessage =
        err instanceof Error
          ? err.message
          : INVITE_MODAL_CONSTANTS.MESSAGES.ERROR_DEFAULT;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({ name: "", email: "" });
      onClose();
    }
  };

  return {
    formData,
    isLoading,
    error,
    handleSubmit,
    handleChange,
    handleClose,
  };
}
