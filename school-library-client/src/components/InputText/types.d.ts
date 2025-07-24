import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

export interface InputTextProps {
  id: string;
  name: string;
  label?: string;
  value?: string | string[] | number;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | 'textarea';
  onChange?: ChangeEventHandler<HTMLInputElement> | ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
  autoComplete?: string;
}
