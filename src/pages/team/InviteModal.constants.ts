import type { Role } from "./InviteModal.types";

export const INVITE_MODAL_CONSTANTS = {
  TITLE: "Invite Team Member",
  DESCRIPTION: "Send an invitation to join your team",
  BUTTONS: {
    CANCEL: "Cancel",
    SEND_INVITE: "Send Invite",
    SENDING: "Sending...",
  },
  PLACEHOLDERS: {
    NAME: "e.g. John Doe",
    EMAIL: "e.g. john.doe@example.com",
  },
  MESSAGES: {
    SUCCESS_DEFAULT: "Invitation sent successfully",
    ERROR_DEFAULT: "Failed to send invitation. Please try again.",
  },
  LABELS: {
    NAME: "Name",
    EMAIL: "Email",
    ROLE: "Role",
  },
} as const;
export const UsersRole: Role[] = [
  { id: "PM", name: "Project Manager"},
  { id: "DEV", name: "Developer"},
];