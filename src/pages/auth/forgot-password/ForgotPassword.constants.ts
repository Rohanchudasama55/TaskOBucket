export const FORGOT_PASSWORD_MESSAGES = {
  title: 'Forgot Password?',
  subtitle: 'Enter your email address and we\'ll send you a link to reset your password.',
  sendResetLink: 'Send Reset Link',
  sendingResetLink: 'Sending...',
  backToLogin: 'Back to Login',
  checkEmail: 'Check your email',
  resetLinkSent: 'We\'ve sent a password reset link to your email address.',
  emailNotFound: 'No account found with this email address.',
  tryAgain: 'Try again',
  resendLink: 'Resend link'
} as const;

export const FORGOT_PASSWORD_PLACEHOLDERS = {
  email: 'Enter your email address'
} as const;

export const FORGOT_PASSWORD_FORM_DEFAULTS = {
  email: ''
} as const;