import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addBookToCart,
  deleteOneItemFromCart,
  getMyCart,
} from '../service/cart.service';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import type { ErrorResponse } from '@/types';

export const useAddBookToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBookToCart,
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
      toast.success(result.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message ?? 'Something went wrong');
    },
  });
};

export const useGetMyCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getMyCart,
  });
};

export const useDeleteOneItemFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOneItemFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
  });
};
