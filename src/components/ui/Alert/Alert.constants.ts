import type { AlertVariant } from './Alert.types';

export const DEFAULT_VARIANT: AlertVariant = 'info';
export const DEFAULT_CLASS_NAME = '';

export const ALERT_VARIANTS = {
  error: 'error',
  success: 'success',
  warning: 'warning',
  info: 'info'
} as const;