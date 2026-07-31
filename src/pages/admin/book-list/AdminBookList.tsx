import AdminSearchField from '../components/shared/AdminSearchField';
import { useSearchParams } from 'react-router-dom';
import type {
  AvailabilityStatus,
  GetAllBooksForAdminParams,
} from '@/features/admin/service/userAdmin.service';
import LoadMoreButton from '@/components/shared/LoadMoreButton';
import EmptyState from '@/components/shared/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import AdminBookItem from './AdminBookItem';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Preview from './Preview';
import Edit from './Edit';
import Add from './Add';
import type { Actions } from './AdminActionButtons';
import { useGetAllBooksForAdmin } from '@/features/admin/hooks/useBookForAdmin';

const isAvailabilityStatus = (
  value: string | null
): value is AvailabilityStatus => {
  return (
    value === 'all' ||
    value === 'available' ||
    value === 'borrowed' ||
    value === 'returned'
  );
};

interface AdminBooksFilter {
  label: string;
  value: AvailabilityStatus;
}

const AdminBookList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const action = searchParams.get('action');
  const status = searchParams.get('status');
  const params: GetAllBooksForAdminParams = {
    q: query ?? undefined,
    status: isAvailabilityStatus(status) ? status : undefined,
  };
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAllBooksForAdmin(params);
  const adminBooks = data?.pages.flatMap((page) => page.data.books) ?? [];

  const adminBooksFilters: AdminBooksFilter[] = [
    { label: 'All', value: 'all' },
    { label: 'Available', value: 'available' },
    { label: 'Borrowed', value: 'borrowed' },
    { label: 'Returned', value: 'returned' },
  ];

  const handleStatusChange = (status?: AvailabilityStatus) => {
    const params = new URLSearchParams(searchParams);

    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }

    setSearchParams(params);
  };

  if (error) return <p>{error.message}</p>;

  if (action === 'preview') return <Preview />;
  if (action === 'edit') return <Edit />;
  if (action === 'add') return <Add />;

  const handleActionClick = (action: Actions) => {
    const params = new URLSearchParams(searchParams);
    params.set('action', action);
    params.delete('status');
    setSearchParams(params);
  };

  return (
    <div className='flex flex-col gap-4 lg:gap-6'>
      <h2 className='font-bold text-display-xs lg:text-display-sm'>
        Book List
      </h2>
      <Button className='max-w-60' onClick={() => handleActionClick('add')}>
        Add Book
      </Button>
      <AdminSearchField />
      <div className='flex gap-2 lg:gap-3'>
        {adminBooksFilters.map((filter) => {
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
      {isLoading ? (
        <div className='relative pb-15 lg:pb-22'>
          <div className='flex flex-col gap-4 lg:gap-6'>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className='h-42.5 lg:h-44.5' />
            ))}

            <Skeleton className='absolute bottom-0 rounded-full w-50 h-12 left-1/2 -translate-x-1/2' />
          </div>
        </div>
      ) : adminBooks.length > 0 ? (
        <div className='relative pb-15 lg:pb-22'>
          <div className='flex flex-col gap-4'>
            {adminBooks.map((book) => (
              <AdminBookItem key={book.id} book={book} />
            ))}
          </div>
          <LoadMoreButton
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        </div>
      ) : (
        <EmptyState className='h-50'>No Books</EmptyState>
      )}
    </div>
  );
};

export default AdminBookList;
