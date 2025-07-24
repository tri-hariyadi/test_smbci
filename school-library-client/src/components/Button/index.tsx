import { Link } from 'react-router';

import { cn } from 'lib/utils';

import type { ButtonProps } from './types';

const Button = ({
  type,
  isLoading,
  isDisabled,
  children,
  className,
  variant = 'primary',
  href,
  onClick,
  isBlock
}: ButtonProps) => {
  const classNames = ['text-sm  h-[42px] text-white px-4 py-2 rounded-xl hover:cursor-pointer'];

  if (variant === 'primary') classNames.push('bg-blue-800 hover:bg-blue-primary');
  if (variant === 'secondary') classNames.push('bg-violet-700');
  if (variant === 'danger') classNames.push('bg-red-600');
  if (variant === 'text') classNames.push('px-0 py-0');
  if (isBlock) classNames.push('block w-full');
  if (className) classNames.push(className);

  if (isDisabled) {
    return (
      <span className={cn(classNames.join(' '))}>
        <div className="flex justify-center items-center">{children}</div>
      </span>
    );
  }

  if (isLoading) {
    return (
      <span
        className={cn(
          [classNames.join(' '), 'flex justify-center items-center space-x-2 opacity-80 h-[42px]'].join(' ')
        )}
      >
        <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin text-white"></span>
        <span className="font-bold text-white">Loading...</span>
      </span>
    );
  }

  if (type === 'link') {
    return (
      <Link to={href as string} className={cn(classNames.join(' '))}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cn(classNames.join(' '))} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
