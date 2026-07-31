import { useGetUsersData } from '@/features/admin/hooks/useGetUsersData';
import { useSearchParams } from 'react-router-dom';
import AdminSearchField from './AdminSearchField';
import { Skeleton } from '@/components/ui/skeleton';
import UserCards from './UserCards';
import UserTable from './UserTable';
import Pagination from './Pagination';

const UsersList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageQuery = searchParams.get('page');
  const page = pageQuery ? Number(pageQuery) : 1;

  const handleChangePage = (page: number): void => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    setSearchParams(params);
  };

  const query = searchParams.get('q') ?? undefined;
  const { data, isPending } = useGetUsersData({ q: query, page, limit: 10 });

  const users = data?.data.users ?? [];
  const totalEntries = data?.data.pagination.total ?? 0;
  const totalPages = data?.data.pagination.totalPages ?? 0;
  const limit = data?.data.pagination.limit ?? 0;
  const start = (page - 1) * limit + 1;

  return (
    <div className='flex flex-col gap-4 lg:gap-6'>
      <h2 className='font-bold text-display-xs lg:text-display-sm'>User</h2>
      <AdminSearchField />
      {isPending ? (
        <>
          <div className='border rounded-xl p-4 hidden md:block'>
            <Skeleton className='h-200 w-full' />
          </div>
          <div className='md:hidden '>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className='h-100 w-full' />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className='border rounded-xl p-4 hidden md:block'>
            <UserTable users={users} start={start} />
            <Pagination
              limit={limit}
              onPageChange={handleChangePage}
              page={page}
              totalEntries={totalEntries}
              totalPages={totalPages}
            />
          </div>
          <div className='md:hidden'>
            <UserCards users={users} start={start} />
            <Pagination
              limit={limit}
              onPageChange={handleChangePage}
              page={page}
              totalEntries={totalEntries}
              totalPages={totalPages}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UsersList;
