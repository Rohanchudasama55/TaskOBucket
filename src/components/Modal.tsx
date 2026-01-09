import React from 'react'
import type { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  open?: boolean
  onClose?: () => void
  className?: string
}

export function Modal({ children, open, onClose, className = '' }: ModalProps) {
  if (!open) return null
  
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose?.()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose?.()
    }
  }
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 ${className}`}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-w-lg w-full max-h-full overflow-auto">
        {children}
      </div>
    </div>
  )
}
