import React from 'react'
import type { ReactNode } from 'react'

interface DragDropContextProps {
  children: ReactNode
}

export const DragDropContext: React.FC<DragDropContextProps> = ({ children }) => {
  return <div>{children}</div>
}
