import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';

interface BookActionButtonsProps {
  availableCopies: number;
  id?: number;
  isLoading: boolean;
}

const BookActionButtons = ({
  availableCopies,
  id,
  isLoading,
}: BookActionButtonsProps) => {
  const navigate = useNavigate();

  const handleAddToCartClick = (id: number | undefined) => {
    if (!id) return;
    console.log(id);
  };
  const handleBorrowBookClick = () => {
    navigate('/cart/checkout');
  };

  if (isLoading)
    return (
      <div className='w-full lg:max-w-103 flex gap-3 justify-between'>
        <Skeleton className='h-12 w-[48%] rounded-full' />
        <Skeleton className='h-12 w-[48%] rounded-full' />
      </div>
    );

  return (
    <div className='w-full md:max-w-103 flex gap-3 justify-between'>
      <Button
        variant='outline'
        className='w-[48%]'
        disabled={availableCopies === 0}
        onClick={() => handleAddToCartClick(id)}
      >
        Add to Cart
      </Button>
      <Button
        className='w-[48%]'
        disabled={availableCopies === 0}
        onClick={handleBorrowBookClick}
      >
        Borrow Book
      </Button>
    </div>
  );
};

export default BookActionButtons;
