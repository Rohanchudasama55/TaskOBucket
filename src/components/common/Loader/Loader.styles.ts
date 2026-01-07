import type { LoaderSize } from './Loader.types';

export const LOADER_CONTAINER_STYLES = 'flex flex-col items-center justify-center p-4 ';
export const LOADER_SPINNER_BASE_STYLES = 'border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin';
export const LOADER_TEXT_STYLES = 'mt-2 text-sm text-gray-600';

export const LOADER_SIZE_STYLES = {
  small: 'w-4 h-4',
  medium: 'w-8 h-8',
  large: 'w-12 h-12'
};

export const getLoaderContainerStyles = (className?: string): string => {
  return [LOADER_CONTAINER_STYLES, className].filter(Boolean).join(' ');
};

export const getLoaderSpinnerStyles = (size: LoaderSize): string => {
  return [LOADER_SPINNER_BASE_STYLES, LOADER_SIZE_STYLES[size]].join(' ');
};