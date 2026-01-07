export const DEFAULT_TITLE = 'No data available';
export const DEFAULT_DESCRIPTION = 'There is nothing to display at the moment.';
export const DEFAULT_CLASS_NAME = '';

export const EMPTY_STATE_VARIANTS = {
  default: 'default',
  search: 'search',
  error: 'error'
} as const;

export type EmptyStateVariant = keyof typeof EMPTY_STATE_VARIANTS;