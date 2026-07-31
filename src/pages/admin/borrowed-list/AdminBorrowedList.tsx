import { useSearchParams } from 'react-router-dom';
import AdminSearchField from '../components/shared/AdminSearchField';
import type { GetBorrowedBooksParams } from '@/features/admin/service/loanAdmin.service';
import type { LoanFilter } from '@/pages/user/sections/profile/BorrowedList';
import type { LoanFilterStatus } from '@/features/profile/service/loan.service';
import { useGetBorrowedBooksForAdmin } from '@/features/admin/hooks/useBorrowedBooksForAdmin';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import LoanCard from '@/pages/user/sections/profile/components/LoanCard';
import LoadMoreButton from '@/components/shared/LoadMoreButton';
import EmptyState from '@/components/shared/EmptyState';

const isLoanStatus = (value: string | null): value is LoanFilterStatus => {
  return (
    value === 'all' ||
    value === 'active' ||
    value === 'returned' ||
    value === 'overdue'
  );
};

const AdminBorrowedList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const status = searchParams.get('status');
  const params: GetBorrowedBooksParams = {
    q: query ?? undefined,
    status: isLoanStatus(status) ? status : undefined,
  };

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetBorrowedBooksForAdmin(params);

  const loanFilters: LoanFilter[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Returned', value: 'returned' },
    { label: 'Overdue', value: 'overdue' },
  ];

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
  return (
    <div className='flex flex-col gap-4 lg:gap-6'>
      <h2 className='font-bold text-display-xs lg:text-display-sm'>
        Borrowed List
      </h2>
      <AdminSearchField />
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
    </div>
  );
};

export default AdminBorrowedList;
