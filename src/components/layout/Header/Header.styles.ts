export const HEADER_STYLES = 'h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6';
export const MOBILE_MENU_BUTTON_STYLES = 'md:hidden p-2 text-gray-500';
export const SEARCH_CONTAINER_STYLES = 'flex-1 max-w-md mx-4';
export const SEARCH_INPUT_STYLES = 'w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500';
export const RIGHT_SECTION_STYLES = 'flex items-center gap-4';
export const USER_INFO_STYLES = 'flex items-center gap-2';
export const USER_DETAILS_STYLES = 'hidden sm:block';
export const USER_NAME_STYLES = 'text-sm font-medium';
export const USER_EMAIL_STYLES = 'text-xs text-gray-500';

export const getHeaderStyles = (className?: string): string => {
  return [HEADER_STYLES, className].filter(Boolean).join(' ');
};