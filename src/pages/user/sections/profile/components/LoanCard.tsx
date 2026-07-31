import HorizontalLine from '@/components/shared/HorizontalLine';
import type { MyLoan } from '@/features/profile/types/my-loan';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/formate-date';
import ReviewDialog from './ReviewDialog';
import { useNavigate } from 'react-router-dom';
import type { AdminLoan } from '@/features/admin/types/admin-loan';

interface LoanCardProps {
  loans: MyLoan[] | AdminLoan[];
}

const LoanCard = ({ loans }: LoanCardProps) => {
  const navigate = useNavigate();
  const statusColor = {
    BORROWED: 'bg-[#24A5000D] text-[#24A500]',
    RETURNED: 'bg-[#0052CC0D] text-[#0052CC]',
    LATE: 'bg-[#EE1D520D] text-[#EE1D52]',
  };

  const handleLoanCardClick = (bookId: number) => {
    navigate(`/books/${bookId}`);
  };
  return loans.map((loan) => (
    <div
      key={loan.id}
      className='rounded-2xl shadow-soft p-4 flex flex-col gap-4 lg:gap-5 cursor-pointer'
    >
      <div className='flex justify-between items-center'>
        <div className='flex gap-1 lg:gap-3 items-center '>
          <p className='font-bold tex-sm lg:text-md'>Status</p>
          <p
            className={cn(
              'font-bold px-2 text-sm flex justify-center items-center h-8',
              statusColor[loan.status]
            )}
          >
            {loan.displayStatus}
          </p>
        </div>
        <div className='flex gap-1 lg:gap-3 items-center'>
          <p className='font-bold tex-sm lg:text-md text-right'>Due Date</p>
          <p
            className={cn(
              'font-bold px-2 text-sm flex justify-center items-center h-8 bg-[#EE1D520D] text-[#EE1D52] text-right'
            )}
          >
            {formatDate({ date: loan.dueAt, month: 'short' })}
          </p>
        </div>
      </div>
      <HorizontalLine />
      <div className='flex flex-col gap-6 sm:flex-row sm:justify-between'>
        <div className='flex gap-4 items-center'>
          <div
            className='w-23 h-34.5 shrink-0'
            onClick={() => handleLoanCardClick(loan.book.id)}
          >
            <img
              src={loan.book.coverImage}
              alt={`${loan.book.title} cover`}
              className='w-full h-full object-cover object-center '
            />
          </div>
          <div className='flex flex-col gap-1'>
            <p className='border rounded-sm flex items-center justify-center font-bold text-sm w-fit px-2'>
              {loan.book.category.name}
            </p>
            <p
              className='font-bold text-md lg:text-xl hover:underline'
              onClick={() => handleLoanCardClick(loan.book.id)}
            >
              {loan.book.title}
            </p>
            <p className='font-medium text-sm lg:text-md text-neutral-700 '>
              {loan.book.author.name}
            </p>
            <p className='font-bold text-sm lg:text-md'>
              {formatDate({ date: loan.borrowedAt, month: 'short' })} • Duration{' '}
              {loan.durationDays} Days
            </p>
          </div>
        </div>
        {loan.status === 'RETURNED' && !('borrower' in loan) && (
          <ReviewDialog bookId={loan.book.id} />
        )}
      </div>
      {'borrower' in loan && (
        <>
          <HorizontalLine />
          <div>
            <p className='font-semibold text-sm lg:text-md'>borrower's name</p>
            <p className='font-bold text-md lg:text-xl'>{loan.borrower.name}</p>
          </div>
        </>
      )}
    </div>
  ));
};

export default LoanCard;
