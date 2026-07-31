import { useGetLoanList } from '@/features/profile/hooks/useLoan';
import type { LoanFilterStatus } from '@/features/profile/service/loan.service';
import { useSearchParams } from 'react-router-dom';
import ProfileSearchField from './components/ProfileSearchField';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import EmptyState from '@/components/shared/EmptyState';
import LoanCard from './components/LoanCard';
import LoadMoreButton from '@/components/shared/LoadMoreButton';

const isLoanStatus = (value: string | null): value is LoanFilterStatus => {
  return (
    value === 'all' ||
    value === 'active' ||
    value === 'returned' ||
    value === 'overdue'
  );
};

export interface LoanFilter {
  label: string;
  value: LoanFilterStatus;
}

const BorrowedList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get('status');
  const query = searchParams.get('q') ?? undefined;
  const loanStatus = isLoanStatus(status) ? status : undefined;
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetLoanList({ q: query, status: loanStatus });

  if (error) return <p>{error.message}</p>;

  const handleStatusChange = (status?: LoanFilterStatus) => {
    const params = new URLSearchParams(searchParams);

    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }

    params.set('page', '1');

    setSearchParams(`?${params.toString()}`);
  };

  const loans = data?.pages.flatMap((page) => page.data.loans) ?? [];

  const loanFilters: LoanFilter[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Returned', value: 'returned' },
    { label: 'Overdue', value: 'overdue' },
  ];

  return (
    <section
      id='borrowed-list'
      className='flex flex-col gap-3.75 lg:gap-6 max-w-250 w-full m-auto'
    >
      <h2 className='font-bold text-display-xs lg:text-display-sm'>
        Borrowed List
      </h2>
      <ProfileSearchField className='lg:max-w-136' />
      <div className='flex gap-2 lg:gap-3'>
        {loanFilters.map((filter) => {
          const status = searchParams.get('status');
          const isActive =
            filter.value === 'all'
              ? status === null || status === 'all'
              : status === filter.value;
          return (
            <Button
              key={filter.label}
              variant='outline'
              onClick={() => handleStatusChange(filter.value)}
              className={cn(
                'px-4 py-2 font-semibold text-sm lg:text-md',
                isActive && 'border-primary-300 text-primary-300 bg-primary-100'
              )}
            >
              {filter.label}
            </Button>
          );
        })}
      </div>
      <div className='relative flex flex-col gap-4 pb-16'>
        {isLoading ? (
          <Skeleton className='h-50 w-full' />
        ) : loans.length > 0 ? (
          <>
            <LoanCard loans={loans} />
            <LoadMoreButton
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            />
          </>
        ) : (
          <EmptyState className='h-50' />
        )}
      </div>
    </section>
  );
};

export default BorrowedList;
