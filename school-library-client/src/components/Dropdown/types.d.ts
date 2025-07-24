import { ReactNode } from 'react';

export interface DropdownProps {
  children: ReactNode;
  showOverlay?: boolean;
  className?: string;
}

export interface DropdownMenuContentProps {
  children: ReactNode;
  className?: string;
}

export interface DropdownMenuItemProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export interface DropdownMenuTriggerProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  layout?: (children: ReactNode) => JSX.Element;
}

export interface DropdownContextType {
  isOpen: boolean;
  dropdownRef: HTMLDivElement | null;
  setIsOpen: (value: boolean) => void;
  setShouldRender: (value: boolean) => void;
}
