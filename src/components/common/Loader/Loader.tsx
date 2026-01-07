import type { LoaderProps } from './Loader.types';
import { DEFAULT_SIZE, DEFAULT_TEXT, DEFAULT_CLASS_NAME } from './Loader.constants';
import { 
  getLoaderContainerStyles, 
  getLoaderSpinnerStyles, 
  LOADER_TEXT_STYLES 
} from './Loader.styles';

export function Loader({ 
  size = DEFAULT_SIZE, 
  text = DEFAULT_TEXT,
  className = DEFAULT_CLASS_NAME
}: LoaderProps) {
  const containerStyles = getLoaderContainerStyles(className);
  const spinnerStyles = getLoaderSpinnerStyles(size);

  return (
    <div className={containerStyles}>
      <div 
        className={spinnerStyles}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <span className={LOADER_TEXT_STYLES} aria-live="polite">
          {text}
        </span>
      )}
    </div>
  );
}