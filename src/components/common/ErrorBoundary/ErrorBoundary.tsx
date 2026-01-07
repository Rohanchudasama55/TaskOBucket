import React, { Component } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';
import { ERROR_MESSAGES } from './ErrorBoundary.constants';
import {
  ERROR_CONTAINER_STYLES,
  ERROR_CONTENT_STYLES,
  ERROR_TITLE_STYLES,
  ERROR_DESCRIPTION_STYLES,
  ERROR_BUTTON_STYLES
} from './ErrorBoundary.styles';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className={ERROR_CONTAINER_STYLES}>
            <div className={ERROR_CONTENT_STYLES}>
              <h2 className={ERROR_TITLE_STYLES}>
                {ERROR_MESSAGES.title}
              </h2>
              <p className={ERROR_DESCRIPTION_STYLES}>
                {ERROR_MESSAGES.description}
              </p>
              <button
                onClick={() => window.location.reload()}
                className={ERROR_BUTTON_STYLES}
              >
                {ERROR_MESSAGES.reloadButton}
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}