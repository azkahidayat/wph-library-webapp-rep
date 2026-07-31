import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  addMyReview,
  deleteMyReview,
  getMyReviews,
  type GetMyReviewsParams,
} from '../service/my-review.service';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import type { ErrorResponse } from '@/types';

export const useAddMyReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addMyReview,
    onSuccess: (_, variables) => {
      const bookId = variables.bookId;
      queryClient.invalidateQueries({
        queryKey: ['books', 'detail', bookId],
      });

      queryClient.invalidateQueries({
        queryKey: ['books', 'reviews'],
      });

      queryClient.invalidateQueries({
        queryKey: ['my-reviews'],
      });
      toast.success('Review added successfully');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message ?? 'Something went wrong');
    },
  });
};

export const useDeleteMyReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMyReview,
    onSuccess: (_, { bookId }) => {
      queryClient.invalidateQueries({
        queryKey: ['books', 'detail', bookId],
      });
      queryClient.invalidateQueries({
        queryKey: ['books', 'reviews'],
      });
      queryClient.invalidateQueries({
        queryKey: ['my-reviews'],
      });
      toast.success('Review deleted successfully');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message ?? 'Something went wrong');
    },
  });
};

export const useGetMyReviews = (params: Omit<GetMyReviewsParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['my-reviews', params],
    queryFn: ({ pageParam }) => getMyReviews({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};
