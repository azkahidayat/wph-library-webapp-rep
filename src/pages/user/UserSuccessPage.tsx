import { Button } from '@/components/ui/button';
import { useBorrowStore } from '@/features/checkout/store/useBorrowStore';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserSuccessPage = () => {
  const navigate = useNavigate();
  const dueDate = useBorrowStore((state) => state.dueDate);
  const removeDueDate = useBorrowStore((state) => state.removeDueDate);

  const handleBorrowedListClick = () => {
    navigate('/profile?tab=borrowed-list', { replace: true });
    removeDueDate();
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col gap-6 lg:gap-8 w-full max-w-159.5 items-center'>
        <div className='rounded-full border size-35.5 aspect-square shrink-0 flex justify-center items-center'>
          <div className='rounded-full border size-32.5 aspect-square shrink-0 flex justify-center items-center'>
            <div className='rounded-full border size-29.25 aspect-square shrink-0 flex justify-center items-center'>
              <div className='rounded-full border size-20.75 aspect-square shrink-0 flex justify-center items-center bg-primary-300 '>
                <FaCheck className='size-8.5 text-white' />
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <p className='font-bold tex-xl lg:text-display-sm'>
            Borrowing Successful!
          </p>
          <p className='font-semibold text-md lg:text-lg text-center'>
            Your book has been successfully borrowed. Please return it by{' '}
            <span className='text-[#EE1D52]'>{dueDate}</span>
          </p>
        </div>

        <Button className='w-full max-w-71.5' onClick={handleBorrowedListClick}>
          See Borrowed List
        </Button>
      </div>
    </div>
  );
};

export default UserSuccessPage;
