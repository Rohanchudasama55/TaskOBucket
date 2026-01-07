export const REGISTER_FORM_DEFAULTS = {
  fullName: '',
  companyName: '',
  email: '',
  password: '',
  acceptTerms: false
} as const;

export const REGISTER_MESSAGES = {
  title: 'Create your account',
  subtitle: 'Get started with your free trial',
  termsRequired: 'Please accept the terms and conditions',
  creatingAccount: 'Creating Account...',
  createAccount: 'Create Account',
  alreadyHaveAccount: 'Already have an account?',
  logIn: 'Log in',
  orContinueWith: 'or continue with',
  agreeToTerms: 'I agree to the',
  termsOfService: 'Terms of Service',
  and: 'and',
  privacyPolicy: 'Privacy Policy'
} as const;

export const REGISTER_PLACEHOLDERS = {
  fullName: 'Enter your full name',
  companyName: 'Enter your company name',
  email: 'Enter your work email',
  password: 'Create a strong password'
} as const;

export const REGISTER_LABELS = {
  fullName: 'Full Name',
  companyName: 'Company Name',
  email: 'Work Email',
  password: 'Password'
} as const;

export const TESTIMONIAL = {
  rating: 5,
  text: "TaskoBucket transformed how our team collaborates. We've increased our productivity by 40% since switching.",
  author: {
    name: 'Sarah Chen',
    title: 'Product Manager at TechCorp',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
} as const;

export const HERO_CONTENT = {
  title: 'Start managing your projects today',
  subtitle: 'Join thousands of teams who trust TaskoBucket to streamline their workflow and deliver projects on time.'
} as const;

export const REGISTER_SIMULATION_DELAY = 1000;

export const PREVIEW_USERS = [
    { name: "Sarah", img: "https://i.pravatar.cc/40?img=1" },
    { name: "Mike", img: "https://i.pravatar.cc/40?img=2" },
    { name: "Emma", img: "https://i.pravatar.cc/40?img=3" },
    { name: "Lisa", img: "https://i.pravatar.cc/40?img=4" },
    { name: "Tom", img: "https://i.pravatar.cc/40?img=5" },
  ];

export  const TASKS = [
    { label: "Design system review", color: "bg-green-500", user: 0 },
    { label: "Sprint planning", color: "bg-yellow-500", user: 1 },
    { label: "User research", color: "bg-gray-300", user: 2 },
  ];
 