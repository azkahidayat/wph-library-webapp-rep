import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getBooksByAuthor,
  getPopularAuthors,
  type GetBooksByAuthorParams,
} from '../service/author.service';

export const useGetPopularAuthors = () => {
  return useQuery({
    queryKey: ['authors', 'popular'],
    queryFn: () => getPopularAuthors({}),
  });
};

export const useGetBooksByAuthor = (
  params: Omit<GetBooksByAuthorParams, 'page'>
) => {
  return useInfiniteQuery({
    queryKey: ['author', params],
    queryFn: ({ pageParam }) =>
      getBooksByAuthor({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};
