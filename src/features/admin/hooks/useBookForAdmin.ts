import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getAllBooksForAdmin,
  type GetAllBooksForAdminParams,
} from '../service/userAdmin.service';
import {
  addBookAdmin,
  deleteBookAdmin,
  editBookAdmin,
} from '../service/bookAdmin.service';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import type { ErrorResponse } from '@/types';

export const useGetAllBooksForAdmin = (
  params: Omit<GetAllBooksForAdminParams, 'page'>
) => {
  return useInfiniteQuery({
    queryKey: ['admin', 'books', params],
    queryFn: ({ pageParam }) =>
      getAllBooksForAdmin({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

export const useAddBookForAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBookAdmin,
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'books'],
      });
      toast.success(result.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message ?? 'Something went wrong');
    },
  });
};

export const useEditBookForAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editBookAdmin,
    onSuccess: (result, variables) => {
      const bookId = variables.bookId;

      queryClient.invalidateQueries({
        queryKey: ['books', 'detail', bookId],
      });

      queryClient.invalidateQueries({
        queryKey: ['admin', 'books'],
      });
      toast.success(result.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message ?? 'Something went wrong');
    },
  });
};

export const useDeleteBookForAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBookAdmin,
    onSuccess: (result, bookId) => {
      queryClient.invalidateQueries({
        queryKey: ['books', 'detail', bookId],
      });

      queryClient.invalidateQueries({
        queryKey: ['admin', 'books'],
      });
      toast.success(result.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message ?? 'Something went wrong');
    },
  });
};
