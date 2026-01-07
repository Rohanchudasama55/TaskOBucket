export const AVATAR_BASE_STYLES = 'rounded-full object-cover';

export const getAvatarStyles = (className?: string): string => {
  return [AVATAR_BASE_STYLES, className].filter(Boolean).join(' ');
};