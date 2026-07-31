import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  children?: ReactNode;
  className?: string;
}

const EmptyState = ({ children, className }: EmptyStateProps) => {
  return (
    <div
      className={cn(
        'flex justify-center items-center font-semibold shadow-soft rounded-2xl',
        className
      )}
    >
      {children ? children : 'Data empty'}
    </div>
  );
};

export default EmptyState;
