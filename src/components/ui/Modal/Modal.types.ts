import type { ReactNode } from 'react';

export interface ModalProps {
  children: ReactNode;
  open?: boolean;
  onClose?: () => void;
  className?: string;
}