export interface RadiobuttonProps {
  data: Array<{ label: string; value: Any }>;
  name: string;
  label?: string;
  error?: string;
  value?: string | string[] | number;
  onChange?: (value: Any) => void;
}
