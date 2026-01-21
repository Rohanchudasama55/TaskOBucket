// InviteModal.hooks.ts
import { useState } from "react";
import { userService } from "../../services/userService";
import { toast } from "../../utils/toast";
import { INVITE_MODAL_CONSTANTS } from "./InviteModal.constants";
import type { InviteModalProps } from "./InviteModal.types";

export interface UseInviteModalReturn {
  formData: { name: string; email: string; role: string };
  isLoading: boolean;
  error: string | null;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoleChange: (role: string) => void;
  handleClose: () => void;
}

export function useInviteModal({
  onClose,
  onSendInvite,
}: Pick<InviteModalProps, "onClose" | "onSendInvite">): UseInviteModalReturn {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role, // ✅ include role
      };

      const response = await userService.invite(payload);

      toast.success(
        response.message || INVITE_MODAL_CONSTANTS.MESSAGES.SUCCESS_DEFAULT,
        "Success",
      );

      if (onSendInvite) {
        await onSendInvite(formData);
      }

      setFormData({ name: "", email: "", role: "" });
      onClose();
    } catch (err) {
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role: string) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({ name: "", email: "", role: "" });
      onClose();
    }
  };

  return {
    formData,
    isLoading,
    error,
    handleSubmit,
    handleChange,
    handleRoleChange,
    handleClose,
  };
}
