import { useState, useEffect, useRef } from "react";

interface User {
  id: string;
  name: string;
  initials: string;
  tag?: string;
}

interface StateFormData {
  name: string;
  description: string;
  ownerId: string;
  key: string;
  leadId: string;
  teamMembers: string[];
}

export interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    description: string;
    ownerId: string;
    key: string;
    teamMembers: string[];
  }) => void;
  isLoading?: boolean;
}

export const availableUsers: User[] = [
  { id: "current-user", name: "Tom Cook", initials: "TC", tag: "(Me)" },
  { id: "user-2", name: "Sarah Johnson", initials: "SJ" },
  { id: "user-3", name: "Mike Chen", initials: "MC" },
];

export interface UseCreateProjectModalReturn {
  formData: StateFormData;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  updateTeamMembers: (teamMembers: string[]) => void;
  updateLeadId: (leadId: string) => void;
  handleClose: () => void;
}

const INITIAL_FORM_DATA: StateFormData = {
  name: "",
  description: "",
  ownerId: "",
  key: "",
  leadId: "current-user",
  teamMembers: ["current-user"],
};

export function useCreateProjectModal({
  onClose,
  onSave,
  isLoading = false,
}: CreateProjectModalProps): UseCreateProjectModalReturn {
  const [formData, setFormData] = useState<StateFormData>(INITIAL_FORM_DATA);

  // Add custom scrollbar styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #d1d5db;
        border-radius: 3px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #9ca3af;
      }
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #d1d5db transparent;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Auto-generate key from project name
  useEffect(() => {
    if (formData.name) {
      const generatedKey = formData.name
        .toUpperCase()
        .replace(/[^A-Z0-9\s]/g, "")
        .split(" ")
        .map((word) => word.slice(0, 3))
        .join("")
        .slice(0, 6);

      setFormData((prev) => ({
        ...prev,
        key: generatedKey || "PROJ",
      }));
    }
  }, [formData.name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { leadId, ...projectData } = formData;
    onSave({
      ...projectData,
      ownerId: leadId,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateTeamMembers = (teamMembers: string[]) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers,
    }));
  };

  const updateLeadId = (leadId: string) => {
    setFormData((prev) => ({
      ...prev,
      leadId,
    }));
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData(INITIAL_FORM_DATA);
      onClose();
    }
  };

  return {
    formData,
    handleSubmit,
    handleChange,
    updateTeamMembers,
    updateLeadId,
    handleClose,
  };
}
 