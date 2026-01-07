export const DEFAULT_SIZE = 32;
export const DEFAULT_ALT = 'User avatar';
export const DEFAULT_CLASS_NAME = '';

export const AVATAR_SIZES = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64
} as const;

export type AvatarSize = keyof typeof AVATAR_SIZES;