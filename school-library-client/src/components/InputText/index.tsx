import { type ChangeEventHandler, useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { cn } from 'lib/utils.ts';

import type { InputTextProps } from './types';

import Button from '../Button';
import Show from '../Show';

const InputText = ({
  id,
  name,
  label,
  disabled,
  placeholder,
  onChange,
  className,
  type,
  value,
  error,
  autoComplete
}: InputTextProps) => {
  const [secure, setSecure] = useState(type === 'password');

  const classNames = cn(
    'outline outline-1 outline-transparent focus-within:shadow-md bg-[#F6F5F5] py-2 px-4 rounded-lg mt-1 flex justify-center items-center gap-2',
    error
      ? 'border-red-600 focus-within:outline-red-700 focus-within:shadow-red-500/50'
      : 'border-gray-300 focus-within:outline-blue-500 focus-within:shadow-blue-500/50',
    className
  );

  return (
    <div className="mb-4 flex flex-col">
      <Show.When isTrue={label}>
        <label htmlFor={id} className="text-[#6B6B6B] text-sm ml-1 self-start">
          {label}
        </label>
      </Show.When>
      <div className={classNames}>
        <Show>
          <Show.When isTrue={type === 'textarea'}>
            <textarea
              id="message"
              rows={4}
              value={value}
              className="flex-1 text-black focus:outline-none focus:ring-0 focus:border-none w-full text-[16px]"
              placeholder={placeholder}
              onChange={onChange as ChangeEventHandler<HTMLTextAreaElement>}
            ></textarea>
          </Show.When>
          <Show.Else>
            <input
              id={id}
              name={name}
              value={value}
              type={!secure ? 'text' : type}
              disabled={disabled}
              placeholder={placeholder}
              autoComplete={autoComplete}
              onChange={(e) => (onChange as ChangeEventHandler<HTMLInputElement>)?.(e)}
              className="flex-1 text-black focus:outline-none focus:ring-0 focus:border-none w-full h-7 text-[16px]"
            />
          </Show.Else>
        </Show>
        <Show.When isTrue={type === 'password'}>
          <Button variant="text" className="px-0 py-0 h-7" onClick={() => setSecure((v) => !v)}>
            <Show>
              <Show.When isTrue={secure}>
                <EyeOff className="w-5 h-5 text-neutral-400" />
              </Show.When>
              <Show.Else>
                <Eye className="w-5 h-5 text-neutral-400" />
              </Show.Else>
            </Show>
          </Button>
        </Show.When>
      </div>
      <Show.When isTrue={error}>
        <p className="text-red-600 text-sm mt-1 ml-1 self-start">{error}</p>
      </Show.When>
    </div>
  );
};

export default InputText;
