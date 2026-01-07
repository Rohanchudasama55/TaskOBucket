export const DEFAULT_CLASS_NAME = '';

export const TABLE_VARIANTS = {
  default: 'default',
  striped: 'striped',
  bordered: 'bordered'
} as const;

export type TableVariant = keyof typeof TABLE_VARIANTS;