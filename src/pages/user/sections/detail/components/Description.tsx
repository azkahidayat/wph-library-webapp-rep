import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface DescriptionProps {
  description: string;
  isLoading: boolean;
}

const Description = ({ description, isLoading }: DescriptionProps) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [showButton, setShowButton] = useState(false);
  const [isSeenMore, setIsSeenMore] = useState(false);

  useEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;

    setShowButton(el.scrollHeight > el.clientHeight);
  }, [description]);

  if (isLoading)
    return (
      <div className='flex flex-col gap-1'>
        <Skeleton className='h-7 w-30' />
        <div className='flex flex-col gap-1'>
          <Skeleton className='h-5' />
          <Skeleton className='h-5' />
          <Skeleton className='h-5' />
          <Skeleton className='h-5 w-100' />
        </div>
      </div>
    );

  return (
    <div className='flex flex-col gap-1'>
      <p className='font-bold text-xl'>Description</p>
      <div className='flex flex-col gap-1'>
        <p
          ref={descriptionRef}
          className={cn(
            'font-medium text-sm lg:text-md',
            isSeenMore ? 'line-clamp-none' : 'line-clamp-3'
          )}
        >
          {description}
        </p>
        {showButton && (
          <button
            className='border rounded-lg w-fit h-6 lg:h-8 px-2 lg:px-4 cursor-pointer text-xs flex justify-center items-center'
            onClick={() => setIsSeenMore((prev) => !prev)}
          >
            {isSeenMore ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Description;
