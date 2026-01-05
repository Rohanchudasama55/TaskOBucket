import React from 'react'

export const Modal: React.FC<{ open?: boolean; onClose?: () => void }> = ({ children, open }) => {
  if (!open) return null
  return <div className="modal">{children}</div>
}
