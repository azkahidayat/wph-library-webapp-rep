import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface LoanSummaryProps {
  totalBook: number;
}

const LoanSummary = ({ totalBook }: LoanSummaryProps) => {
  const navigate = useNavigate();
  const handleBorrowBookClick = () => {
    if (totalBook <= 0) {
      toast.error('Please select at least 1 book');
      return;
    }
    navigate('/cart/checkout');
  };
  return (
    <div className='fixed bottom-0 left-0 z-10 flex w-full items-center justify-between border-t bg-white px-4 py-5 shadow-soft gap-6 md:static md:max-w-80 md:flex-col md:items-start md:rounded-2xl md:p-5 md:border-0'>
      <p className='hidden md:block font-bold text-xl'>Loan Summary</p>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between md:w-full'>
        <p className='font-medium text-md'>Total book</p>
        <p className='font-bold text-md'>{totalBook} items</p>
      </div>
      <Button onClick={handleBorrowBookClick} className='w-37.5 md:w-full'>
        Borrow Book
      </Button>
    </div>
  );
};

export default LoanSummary;
