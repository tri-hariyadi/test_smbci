import type { RadiobuttonProps } from './types';

import { Show } from '../index.ts';

const RadioButton = ({ data, name, label, onChange, error, value }: RadiobuttonProps) => {
  return (
    <fieldset className="mb-4">
      <Show.When isTrue={label}>
        <label className="text-[#6B6B6B] text-sm block mb-2 ml-1">{label}</label>
      </Show.When>

      <div className="flex gap-3 items-center">
        {data.map(({ label, value: v }, idx) => (
          <div key={`radio-${name}-${idx}`} className="flex items-center ml-1">
            <input
              id={`${name}-option-${idx}`}
              type="radio"
              name={name}
              value={value}
              className="w-4 h-4 border-gray-300 focus:ring-0 focus:outline-0 hover:cursor-pointer"
              onChange={(e) => onChange?.(e.target.checked ? v : '')}
              checked={value === v}
            />
            <label
              htmlFor={`${name}-option-${idx}`}
              className="block ms-2  text-sm font-medium text-gray-900 hover:cursor-pointer"
            >
              {label}
            </label>
          </div>
        ))}
      </div>

      <Show.When isTrue={error}>
        <span className="text-red-600 text-sm mt-1 ml-1">{error}</span>
      </Show.When>
    </fieldset>
  );
};

export default RadioButton;
