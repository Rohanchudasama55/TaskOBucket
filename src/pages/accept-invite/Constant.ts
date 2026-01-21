export const ACCEPT_INVITE_MESSAGES = {
  title: "Set your password",
  subtitle:
    "You’ve been invited to join the platform. Create your password to activate your account.",

  newPassword: "Password",
  confirmPassword: "Confirm Password",
  backToLogin: "Back to login",

  passwordRequirements:
    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",

  acceptInvite: "Accept Invitation",
  acceptingInvite: "Accepting Invitation...",

  invitationAccepted: "Invitation Accepted",
  invitationAcceptedSuccess:
    "Your account has been successfully activated. You can now sign in.",

  invalidInviteTitle: "Invalid Invitation",
  invalidInviteMessage:
    "This invitation link is invalid or has expired. Please contact the administrator.",
};

export const ACCEPT_INVITE_PLACEHOLDERS = {
  newPassword: "Enter password",
  confirmPassword: "Confirm password",
};

export const ACCEPT_INVITE_FORM_DEFAULTS = {
  newPassword: "",
  confirmPassword: "",
} as const;
