export interface InputDateTimeProps {
  value?: Date;
  onChange?: (e: Date | null) => void;
  label?: string;
  error?: string;
  className?: string;
  id: string;
  disabled?: boolean;
}

export interface DateWrapperProps {
  value?: string;
  onClick?: () => void;
  className?: string;
}
