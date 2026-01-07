export const EMPTY_STATE_CONTAINER_STYLES = 'flex flex-col items-center justify-center p-8 text-center';
export const EMPTY_STATE_ICON_STYLES = 'mb-4 text-gray-400';
export const EMPTY_STATE_TITLE_STYLES = 'text-lg font-medium text-gray-900 mb-2';
export const EMPTY_STATE_DESCRIPTION_STYLES = 'text-sm text-gray-500 mb-4';
export const EMPTY_STATE_ACTION_STYLES = 'mt-2';

export const getEmptyStateStyles = (className?: string): string => {
  return [EMPTY_STATE_CONTAINER_STYLES, className].filter(Boolean).join(' ');
};