import { cn } from '@/lib/utils';

const HorizontalLine = ({ className }: { className?: string }) => {
  return <div className={cn('border-b w-full', className)} />;
};

export default HorizontalLine;
