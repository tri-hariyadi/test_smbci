import { forwardRef, useRef } from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { cn } from 'lib/utils.ts';

import type { DateWrapperProps, InputDateTimeProps } from './types.d.tsx';

import Show from '../Show';

const InputDateTime = ({ className, error, id, label, onChange, value, disabled }: InputDateTimeProps) => {
  const datePickerRef = useRef<DatePicker>(null);

  const classNames = cn(
    'w-full outline outline-1 outline-transparent focus-within:shadow-md bg-[#F6F5F5] px-4 rounded-lg flex items-center gap-2 h-11',
    error
      ? 'border-red-600 focus-within:outline-red-700 focus-within:shadow-red-500/50'
      : 'border-gray-300 focus-within:outline-blue-500 focus-within:shadow-blue-500/50',
    disabled ? ' opacity-60 pointer-events-none' : 'opacity-100',
    className
  );

  const DateWrapper = forwardRef<Any, DateWrapperProps>(({ value, onClick }, ref) => (
    <button className={classNames} onClick={onClick} ref={ref}>
      <span className="text-[16px] text-black">{value}</span>
    </button>
  ));

  return (
    <div className="mb-4">
      <Show.When isTrue={label}>
        <label htmlFor={id} className="text-[#6B6B6B] text-sm ml-1 self-start">
          {label}
        </label>
      </Show.When>
      <div className="w-full mt-1 [&>div]:w-full [&>div]:h-11">
        <DatePicker
          ref={datePickerRef}
          id={id}
          selected={value}
          onChange={(date) => onChange?.(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={1}
          timeCaption="time"
          dateFormat="MMMM d, yyyy HH:mm"
          className="h-[34px]"
          customInput={<DateWrapper />}
          disabled={disabled}
        />
      </div>
      <Show.When isTrue={error}>
        <p className="text-red-600 text-sm mt-1 ml-1">{error}</p>
      </Show.When>
    </div>
  );
};

export default InputDateTime;
