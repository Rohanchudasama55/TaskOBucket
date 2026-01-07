import React, { useId, useState } from 'react';
import { cn } from '../../../utils/cn';
import type { InputProps } from './Input.types';
import { DEFAULT_TYPE, DEFAULT_SHOW_PASSWORD_TOGGLE, DEFAULT_CLASS_NAME } from './Input.constants';
import { 
  getInputStyles, 
  LABEL_STYLES, 
  ICON_CONTAINER_STYLES,
  LEFT_ICON_STYLES,
  RIGHT_ICON_STYLES,
  PASSWORD_TOGGLE_STYLES,
  ERROR_TEXT_STYLES,
  HELPER_TEXT_STYLES
} from './Input.styles';

export function Input({ 
  label, 
  error, 
  helperText, 
  className = DEFAULT_CLASS_NAME, 
  id,
  leftIcon,
  rightIcon,
  showPasswordToggle = DEFAULT_SHOW_PASSWORD_TOGGLE,
  type: initialType = DEFAULT_TYPE,
  ...props 
}: InputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState(initialType);

  React.useEffect(() => {
    if (showPasswordToggle && initialType === 'password') {
      setType(showPassword ? 'text' : 'password');
    }
  }, [showPassword, showPasswordToggle, initialType]);
  
  const inputStyles = getInputStyles(error, leftIcon, rightIcon, showPasswordToggle, className);
  
  return (
    <div>
      {label && (
        <label htmlFor={inputId} className={LABEL_STYLES}>
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className={LEFT_ICON_STYLES}>
            <div className={ICON_CONTAINER_STYLES}>
              {leftIcon}
            </div>
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(inputStyles)}
          {...props}
        />
        {(rightIcon || showPasswordToggle) && (
          <div className={RIGHT_ICON_STYLES}>
            {showPasswordToggle && initialType === 'password' ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={PASSWORD_TOGGLE_STYLES}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            ) : rightIcon ? (
              <div className={ICON_CONTAINER_STYLES}>
                {rightIcon}
              </div>
            ) : null}
          </div>
        )}
      </div>
      {error && (
        <p className={ERROR_TEXT_STYLES}>
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className={HELPER_TEXT_STYLES}>{helperText}</p>
      )}
    </div>
  );
}