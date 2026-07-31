import { useInfiniteQuery } from '@tanstack/react-query';
import { getLoanList, type GetLoanParams } from '../service/loan.service';

export const useGetLoanList = (params: Omit<GetLoanParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['loans', params],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getLoanList({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};
