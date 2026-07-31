import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetUsersData } from '@/features/admin/hooks/useGetUsersData';
import { formatDateTime } from '@/utils/formate-date';
import { useSearchParams } from 'react-router-dom';
import AdminSearchField from './AdminSearchField';
import { useState } from 'react';
import Pagination from './Pagination';

const UsersTable = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const query = searchParams.get('q') ?? undefined;
  const { data, isPending } = useGetUsersData({ q: query, page, limit: 10 });

  const users = data?.data.users ?? [];
  const totalEntries = data?.data.pagination.total ?? 0;
  const totalPages = data?.data.pagination.totalPages ?? 0;
  const limit = data?.data.pagination.limit ?? 0;

  return (
    <div className='flex flex-col gap-4 lg:gap-6'>
      <h2 className='font-bold text-display-xs lg:text-display-sm'>User</h2>
      <AdminSearchField />
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <div className='border rounded-xl p-4 hidden md:block'>
          <Table>
            <TableHeader className='bg-neutral-50 '>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Nomor Handphone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{formatDateTime(user.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            limit={limit}
            onPageChange={setPage}
            page={page}
            totalEntries={totalEntries}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default UsersTable;
