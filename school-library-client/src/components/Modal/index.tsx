import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

import { cn } from 'lib/utils';

import type { ModalProps, ModalRefObject, OverlayModalProps } from './types';

import Show from '../Show';

const Overlay = ({ isOpen, setIsOpen }: OverlayModalProps) => {
  return (
    <button
      onClick={() => setIsOpen(false)}
      className={cn(
        'fixed inset-0 bg-black/50 opacity-0 invisible transition duration-300 z-50',
        isOpen ? 'opacity-100 visible' : ''
      )}
    ></button>
  );
};

const Modal = forwardRef<ModalRefObject, ModalProps>(({ children, className, title, showCloseBtn = true }, ref) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [render, setRender] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      toggle(value) {
        setIsOpen(value);
        if (value) setRender(true);
      }
    }),
    []
  );

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!isOpen) {
      timeout = setTimeout(() => {
        setRender(false);
      }, 300);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isOpen]);

  if (!render) return null;

  return (
    <>
      {createPortal(<Overlay isOpen={isOpen} setIsOpen={setIsOpen} />, document.body)}
      {createPortal(
        <div
          className={cn(
            'fixed bg-white top-1/2 left-1/2 rounded-xl p-4 -translate-y-1/2 -translate-x-1/2 z-50',
            isOpen ? 'animate-modal-open' : 'animate-modal-close',
            className
          )}
        >
          <div className={cn('flex mb-4', title ? '' : 'justify-end')}>
            <Show.When isTrue={title}>
              <h2 className="flex-1 text-lg font-bold">{title}</h2>
            </Show.When>
            <Show.When isTrue={showCloseBtn}>
              <button className="hover:cursor-pointer" onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6 text-neutral-400" />
              </button>
            </Show.When>
          </div>
          {children}
        </div>,
        document.body
      )}
    </>
  );
});

Modal.displayName = 'Modal';

export default Modal;
