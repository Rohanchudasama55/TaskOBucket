import React from 'react';
import type { ModalProps } from './Modal.types';
import { DEFAULT_OPEN, DEFAULT_CLASS_NAME, ESCAPE_KEY } from './Modal.constants';
import { getModalBackdropStyles, MODAL_CONTENT_STYLES } from './Modal.styles';

export function Modal({ 
  children, 
  open = DEFAULT_OPEN, 
  onClose, 
  className = DEFAULT_CLASS_NAME 
}: ModalProps) {
  if (!open) return null;
  
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ESCAPE_KEY) {
      onClose?.();
    }
  };
  
  const backdropStyles = getModalBackdropStyles(className);
  
  return (
    <div 
      className={backdropStyles}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
    >
      <div className={MODAL_CONTENT_STYLES}>
        {children}
      </div>
    </div>
  );
}