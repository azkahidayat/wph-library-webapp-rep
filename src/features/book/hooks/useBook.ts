import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getAllBooks,
  getBookDetail,
  getBookReviews,
  getRecommendedBooks,
  type GetAllBooksParams,
  type GetBookReviewsParams,
} from '../service/book.service';

export const useGetAllBooks = (params: Omit<GetAllBooksParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['books', params],
    queryFn: ({ pageParam }) => getAllBooks({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

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

export const useGetBookDetail = (id: number) => {
  return useQuery({
    queryKey: ['books', 'detail', id],
    queryFn: () => getBookDetail(id),
  });
};

export const useGetBookReviews = (
  params: Omit<GetBookReviewsParams, 'page'>
) => {
  return useInfiniteQuery({
    queryKey: ['books', 'reviews', params],
    queryFn: ({ pageParam }) => getBookReviews({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};
