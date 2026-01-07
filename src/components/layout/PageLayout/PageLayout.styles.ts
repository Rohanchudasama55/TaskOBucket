// Main Layout Styles
export const MAIN_LAYOUT_CONTAINER_STYLES = 'flex min-h-screen bg-gray-50';
export const MAIN_CONTENT_AREA_STYLES = 'flex flex-1 flex-col';
export const MAIN_CONTENT_STYLES = 'flex-1 p-6';

// Auth Layout Styles  
export const AUTH_LAYOUT_STYLES = 'min-h-screen bg-gray-50';

// Minimal Layout Styles
export const MINIMAL_LAYOUT_STYLES = 'min-h-screen';

export const getMainLayoutStyles = (className?: string): string => {
  return [MAIN_LAYOUT_CONTAINER_STYLES, className].filter(Boolean).join(' ');
};

export const getAuthLayoutStyles = (className?: string): string => {
  return [AUTH_LAYOUT_STYLES, className].filter(Boolean).join(' ');
};

export const getMinimalLayoutStyles = (className?: string): string => {
  return [MINIMAL_LAYOUT_STYLES, className].filter(Boolean).join(' ');
};