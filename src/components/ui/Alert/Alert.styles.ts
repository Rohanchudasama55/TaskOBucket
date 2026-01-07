import type { AlertVariant } from './Alert.types';

export const ALERT_BASE_STYLES = 'rounded-xl border p-4';
export const ALERT_CONTENT_STYLES = 'flex';
export const ALERT_ICON_STYLES = 'flex-shrink-0';
export const ALERT_TEXT_CONTAINER_STYLES = 'ml-3';
export const ALERT_TITLE_STYLES = 'text-sm font-medium mb-1';
export const ALERT_MESSAGE_STYLES = 'text-sm';

export const ALERT_VARIANT_STYLES = {
  error: 'bg-red-50 border-red-200 text-red-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
};

export const getAlertStyles = (variant: AlertVariant, className?: string): string => {
  return [ALERT_BASE_STYLES, ALERT_VARIANT_STYLES[variant], className].filter(Boolean).join(' ');
};