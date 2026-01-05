import React from 'react'
import type { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <div className="main-layout">{children}</div>
}
