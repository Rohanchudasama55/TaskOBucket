import type { ReactNode } from 'react';

export interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  showHeader?: boolean;
  showSidebar?: boolean;
}

export interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
}

export interface MainLayoutProps {
  children?: ReactNode;
  className?: string;
}