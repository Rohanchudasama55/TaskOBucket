export const LOGIN_FORM_DEFAULTS = {
  email: '',
  password: '',
  rememberMe: false
} as const;

export const DEMO_CREDENTIALS = {
  email: 'demo@example.com',
  password: 'password'
} as const;

export const LOGIN_MESSAGES = {
  welcome: 'Welcome back',
  subtitle: 'Sign in to your account',
  invalidCredentials: 'Invalid email or password',
  signingIn: 'Signing in...',
  signIn: 'Log In',
  forgotPassword: 'Forgot password?',
  rememberMe: 'Remember me',
  noAccount: "Don't have an account?",
  signUp: 'Sign up',
  orContinueWith: 'or continue with',
  signInWithGoogle: 'Sign in with Google'
} as const;

export const LOGIN_PLACEHOLDERS = {
  email: 'Enter your email',
  password: 'Enter your password'
} as const;

export const LOGIN_SIMULATION_DELAY = 1000;