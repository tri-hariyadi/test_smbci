import { ReactNode } from 'react';

export interface ModalRefObject {
  toggle: (_value: boolean) => void;
}

export interface ModalProps {
  children: ReactNode;
  className?: string;
  title?: string;
  showCloseBtn?: boolean;
}

export interface OverlayModalProps {
  isOpen: boolean | null;
  setIsOpen: (_value: boolean) => void;
}
