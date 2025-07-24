import {
  createContext,
  type FocusEvent,
  type FocusEventHandler,
  type MouseEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';

import { createPortal } from 'react-dom';

import { cn, getChildByType } from 'lib/utils';

import type {
  DropdownContextType,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuTriggerProps,
  DropdownProps
} from './types';

export const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('useDropdown must be used within Dropdown');
  return context;
};

const Overlay = () => {
  const { isOpen, setIsOpen } = useDropdown();
  return (
    <button
      onClick={() => setIsOpen(false)}
      className={cn(
        'fixed inset-0 bg-overlay opacity-0 invisible transition duration-300',
        isOpen ? 'opacity-100 visible' : ''
      )}
    ></button>
  );
};

export const DropdownMenuContent = ({ className, children }: DropdownMenuContentProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const { isOpen, dropdownRef } = useDropdown();
  let translate = 'origin-top';

  const calcPosition = () => {
    if (!isOpen || !dropdownRef || !menuRef.current) return;

    const rect = dropdownRef.getBoundingClientRect();
    const menuWidth = menuRef.current.offsetWidth;
    const menuHeight = menuRef.current.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = rect?.left;

    if (left + menuWidth > 1280) {
      const gap = (viewportWidth - 1280) / 2;
      left = viewportWidth - gap - menuWidth - 8;
    }

    // Jika menu keluar dari kanan, geser ke kiri
    if (left + menuWidth > viewportWidth) {
      left = viewportWidth - menuWidth - 8; // beri margin 8px
    }

    // Kalau terlalu kiri (misal layar kecil), geser ke kanan
    if (left < 8) left = 8;

    // --- Handle TOP position (bawah jika muat, atas jika tidak)
    let top = rect.bottom + 8;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < menuHeight && spaceAbove > menuHeight) {
      // Tampilkan di atas tombol
      top = rect.top - menuHeight - 8;
      translate = 'origin-bottom';
    }

    setPosition({
      top, // beri jarak 8px di bawah trigger
      left
      // width: rect.width,
    });
  };

  useLayoutEffect(() => {
    calcPosition();
    window.addEventListener('resize', calcPosition);
    return () => {
      window.removeEventListener('resize', calcPosition);
    };
  }, [dropdownRef, isOpen]);

  return (
    <div
      data-dropdown-menu
      className={cn(
        `overflow-x-hidden overflow-y-auto fixed flex flex-col py-2 bg-white rounded-lg border-[1px] border-neutral-200 shadow-md opacity-0 scale-y-0 invisible transition duration-300 appearance-none z-50`,
        translate,
        isOpen ? 'opacity-100 visible scale-y-100' : '',
        className
      )}
      ref={menuRef}
      style={{ top: position.top, left: position.left }}
    >
      {children}
    </div>
  );
};

export const DropdownMenuItem = ({ onClick, children, className }: DropdownMenuItemProps) => {
  const { setIsOpen } = useDropdown();
  const handleClick = () => {
    onClick?.();
    setIsOpen(false);
  };

  return (
    <div
      tabIndex={0}
      className={cn('hover:cursor-pointer py-1 px-4 hover:bg-neutral-200', className)}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

const MenuTrigger = ({ children, className, onClick }: Omit<DropdownMenuTriggerProps, 'layout'>) => {
  const { setIsOpen, isOpen, setShouldRender } = useDropdown();

  const handleBlur: FocusEventHandler<HTMLDivElement> = (e) => {
    const nextFocus = e.relatedTarget as HTMLElement;

    // Jika blur ke dalam dropdown (yang di-portal), biarkan tetap terbuka
    if (document.body.contains(nextFocus)) {
      const menu = document.querySelector('[data-dropdown-menu]');
      if (menu && menu.contains(nextFocus)) {
        return;
      }
    }
    setIsOpen(false);
  };

  const onClickItem = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const tag = target.tagName.toLowerCase();

    const isInputElement =
      ['input', 'textarea', 'select'].includes(tag) || target.getAttribute('contenteditable') === 'true';
    if (isInputElement) return;

    if (!isOpen) setShouldRender(true);
    if (isOpen) setIsOpen(false);
    onClick?.();
  };

  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const tag = target.tagName.toLowerCase();
    const isInputElement =
      ['input', 'textarea', 'select'].includes(tag) || target.getAttribute('contenteditable') === 'true';
    if (isInputElement) setShouldRender(true);
  };

  return (
    <div onClick={onClickItem} onFocus={onFocus} onBlur={handleBlur} className={cn('w-full', className)}>
      {children}
    </div>
  );
};

export const DropdownMenuTrigger = ({ children, className, onClick, layout }: DropdownMenuTriggerProps) => {
  if (layout)
    return layout(
      <MenuTrigger className={className} onClick={onClick}>
        {children}
      </MenuTrigger>
    );

  return (
    <MenuTrigger className={className} onClick={onClick}>
      {children}
    </MenuTrigger>
  );
};

const Dropdown = ({ children, className, showOverlay = true }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const item = getChildByType(children, DropdownMenuTrigger);
  const menu = getChildByType(children, DropdownMenuContent);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (shouldRender) {
      timeout = setTimeout(() => {
        setIsOpen(true);
      }, 10);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [shouldRender]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!isOpen) {
      timeout = setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <DropdownContext.Provider value={{ isOpen, dropdownRef, setIsOpen, setShouldRender }}>
      <div ref={(ref) => setDropdownRef(ref)} className={className}>
        {shouldRender && createPortal(menu, document.body)}
        {item}
        {showOverlay && shouldRender && createPortal(<Overlay />, document.body)}
      </div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
