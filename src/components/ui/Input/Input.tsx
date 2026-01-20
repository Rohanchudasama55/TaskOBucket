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
import { Eye, EyeOff } from 'lucide-react';

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
                  <EyeOff />
                ) : (
                  <Eye />
                  
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