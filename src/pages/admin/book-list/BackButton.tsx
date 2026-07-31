import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

const BackButton = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleBackClick = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('action');
    params.delete('bookId');
    setSearchParams(params);
  };

  return (
    <div className='flex gap-[6px] lg:gap-3 items-center'>
      <Button
        variant='outline'
        className='border-0 size-6 lg:size-8'
        onClick={handleBackClick}
      >
        <FaArrowLeft className='size-5' />
      </Button>
      <p className='font-bold text-xl lg:text-display-xs'>{children}</p>
    </div>
  );
};

export default BackButton;
