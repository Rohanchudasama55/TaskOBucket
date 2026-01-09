import type { LoaderSize } from './Loader.types';

export const DEFAULT_SIZE: LoaderSize = 'medium';
export const DEFAULT_TEXT = 'Loading...';
export const DEFAULT_CLASS_NAME = '';

export const LOADER_SIZES = {
  small: 'small',
  medium: 'medium',
  large: 'large'
} as const;