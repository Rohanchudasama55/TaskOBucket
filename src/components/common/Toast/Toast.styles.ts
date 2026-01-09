import type { ToastType } from './Toast.types';

export const TOAST_BASE_STYLES = 'rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out animate-slide-in-right';
export const TOAST_CONTENT_STYLES = 'flex items-start';
export const TOAST_ICON_STYLES = 'flex-shrink-0';
export const TOAST_TEXT_CONTAINER_STYLES = 'ml-3 flex-1';
export const TOAST_TITLE_STYLES = 'text-sm font-medium mb-1';
export const TOAST_MESSAGE_STYLES = 'text-sm';
export const TOAST_CLOSE_CONTAINER_STYLES = 'ml-4 flex-shrink-0';
export const TOAST_CLOSE_BUTTON_STYLES = 'inline-flex text-gray-400 hover:text-gray-600 focus:outline-none';

export const TOAST_VARIANTS = {
  error: 'bg-red-50 border-red-200 text-red-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
};

export const getToastStyles = (type: ToastType): string => {
  return [TOAST_BASE_STYLES, TOAST_VARIANTS[type]].join(' ');
};