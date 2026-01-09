export const TOAST_CONTAINER_STYLES = 'fixed top-4 right-4 z-50 space-y-2 max-w-sm';

export const getToastContainerStyles = (className?: string): string => {
  return [TOAST_CONTAINER_STYLES, className].filter(Boolean).join(' ');
};