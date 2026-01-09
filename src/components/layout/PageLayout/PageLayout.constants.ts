export const DEFAULT_CLASS_NAME = '';
export const DEFAULT_SHOW_HEADER = true;
export const DEFAULT_SHOW_SIDEBAR = true;

export const LAYOUT_VARIANTS = {
  main: 'main',
  auth: 'auth',
  minimal: 'minimal'
} as const;

export type LayoutVariant = keyof typeof LAYOUT_VARIANTS;