import type { PropsWithChildren } from 'react';

import { cn, getChildByType } from 'lib/utils.ts';

export const LayoutLeft = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <div className={cn('sticky top-28 bg-white', className)}>{children}</div>
);
export const LayoutRight = ({ children }: PropsWithChildren) => children;

const Layout = ({ children }: PropsWithChildren) => {
  const item = getChildByType(children, LayoutRight);
  const menu = getChildByType(children, LayoutLeft);

  return (
    <div className="flex justify-center pb-12">
      <div className="grid grid-cols-16 gap-0 md:gap-6 mt-28 px-4 2xl:px-52 w-full">
        <div className="col-span-5 md:col-span-6 lg:col-span-5 xl:col-span-4 hidden md:block">{menu}</div>

        <div className="col-span-16 md:col-span-10 lg:col-span-11 xl:col-span-12">{item}</div>
      </div>
    </div>
  );
};

export default Layout;
