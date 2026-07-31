import { useInfiniteQuery } from '@tanstack/react-query';
import {
  getBorrowedBooks,
  type GetBorrowedBooksParams,
} from '../service/loanAdmin.service';

export const useGetBorrowedBooksForAdmin = (
  params: Omit<GetBorrowedBooksParams, 'page'>
) => {
  return useInfiniteQuery({
    queryKey: ['admin', 'borrowed-books', params],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getBorrowedBooks({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};
