import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}
const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn(
        'pt-4 lg:pt-12 flex flex-col gap-6 lg:gap-12 pb-4 lg:pb-29',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
