import type { ReactNode } from 'react';

export interface AlertProps {
  variant?: 'error' | 'success' | 'warning' | 'info';
  title?: string;
  children: ReactNode;
  className?: string;
}

export type AlertVariant = 'error' | 'success' | 'warning' | 'info';