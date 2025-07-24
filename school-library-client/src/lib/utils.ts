import { Children, isValidElement, type ReactNode } from 'react';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const toggleTheme = () => {
  const theme = document.cookie
    .split('; ')
    .find((row) => row.startsWith('theme='))
    ?.split('=')[1];
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  document.cookie = `theme=${newTheme}; path=/;`;
};

export const getChildByType = (children: ReactNode, component: Any) => {
  const childArray = Children.toArray(children);
  return childArray.find((child: Any) => isValidElement(child) && child.type === component);
};

export const sprintf = (template: string, ...args: Any[]): string => {
  let argIndex = 0;
  return template.replace(/%v/g, () => {
    const value = args[argIndex++];
    return value !== undefined ? String(value) : '';
  });
};

export const titleCase = (text: string): string => {
  return text.replace(/\b\w+\b/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
};

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return (
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date) + ' WIB'
  );
};

export const parseJwt = <T>(token = ''): T | undefined => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );

    // Check expiry
    const parsed = JSON.parse(jsonPayload);
    if (Date.now() >= parsed.exp * 1000) return undefined;
    return parsed;
  } catch {
    return undefined;
  }
};

export const wrapPromise = <T>(promise: Promise<T>) => {
  let status = 'pending';
  let result: T;
  const suspender = promise.then(
    (res) => {
      status = 'success';
      result = res;
    },
    (err) => {
      status = 'error';
      result = err;
    }
  );

  return {
    read(): T {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else {
        return result;
      }
    }
  };
};
