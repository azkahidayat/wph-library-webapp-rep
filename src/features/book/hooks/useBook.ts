import { useInfiniteQuery } from '@tanstack/react-query';
import { getRecommendedBooks } from '../service/book.service';

export const useRecommendedBooks = (by: 'rating' | 'popular' = 'rating') => {
  return useInfiniteQuery({
    queryKey: ['books', 'recommended', by],
    queryFn: ({ pageParam }) => getRecommendedBooks({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};
