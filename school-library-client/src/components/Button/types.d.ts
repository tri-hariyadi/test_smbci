import { MouseEventHandler, ReactNode } from 'react';

export interface ButtonProps {
  type?: 'link';
  isLoading?: boolean;
  isDisabled?: boolean;
  children?: string | ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'text';
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isBlock?: boolean;
}
