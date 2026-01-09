import type { ButtonVariant, ButtonSize } from './Button.types';

export const DEFAULT_VARIANT: ButtonVariant = "primary";
export const DEFAULT_SIZE: ButtonSize = "md";
export const DEFAULT_FULL_WIDTH = false;

export const BUTTON_VARIANTS = {
  primary: "primary",
  secondary: "secondary", 
  ghost: "ghost",
  danger: "danger"
} as const;

export const BUTTON_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg"
} as const;