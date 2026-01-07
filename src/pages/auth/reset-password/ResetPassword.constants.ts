export const RESET_PASSWORD_MESSAGES = {
  title: 'Reset Your Password',
  subtitle: 'Enter your new password below to complete the reset process.',
  resetPassword: 'Reset Password',
  resettingPassword: 'Resetting...',
  backToLogin: 'Back to Login',
  passwordReset: 'Password Reset Successfully',
  passwordResetSuccess: 'Your password has been reset successfully. You can now sign in with your new password.',
  invalidToken: 'Invalid or expired reset token.',
  passwordMismatch: 'Passwords do not match.',
  signInNow: 'Sign In Now',
  newPassword: 'New Password',
  confirmPassword: 'Confirm Password',
  passwordRequirements: 'Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.'
} as const;

export const RESET_PASSWORD_PLACEHOLDERS = {
  newPassword: 'Enter your new password',
  confirmPassword: 'Confirm your new password'
} as const;

export const RESET_PASSWORD_FORM_DEFAULTS = {
  newPassword: '',
  confirmPassword: ''
} as const;