import type { EmptyStateProps } from './EmptyState.types';
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_CLASS_NAME } from './EmptyState.constants';
import {
  getEmptyStateStyles,
  EMPTY_STATE_ICON_STYLES,
  EMPTY_STATE_TITLE_STYLES,
  EMPTY_STATE_DESCRIPTION_STYLES,
  EMPTY_STATE_ACTION_STYLES
} from './EmptyState.styles';

export function EmptyState({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  icon,
  action,
  className = DEFAULT_CLASS_NAME
}: EmptyStateProps) {
  const containerStyles = getEmptyStateStyles(className);

  const defaultIcon = (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  return (
    <div className={containerStyles}>
      <div className={EMPTY_STATE_ICON_STYLES}>
        {icon || defaultIcon}
      </div>
      <h3 className={EMPTY_STATE_TITLE_STYLES}>
        {title}
      </h3>
      <p className={EMPTY_STATE_DESCRIPTION_STYLES}>
        {description}
      </p>
      {action && (
        <div className={EMPTY_STATE_ACTION_STYLES}>
          {action}
        </div>
      )}
    </div>
  );
}