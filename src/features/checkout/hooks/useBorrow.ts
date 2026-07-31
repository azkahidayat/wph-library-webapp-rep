import { useMutation, useQueryClient } from '@tanstack/react-query';
import { confirmAndBorrowBooks } from '../service/borrow.service';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { useDeleteOneItemFromCart } from '@/features/cart/hooks/useCart';
import type { AxiosError } from 'axios';
import type { ErrorResponse } from '@/types';
import { toast } from 'sonner';

export const useConfirmAndBorrow = () => {
  const queryclient = useQueryClient();
  const deleteItemId = useCartStore((state) => state.deleteItemId);
  const { mutate } = useDeleteOneItemFromCart();
  return useMutation({
    mutationFn: confirmAndBorrowBooks,
    onSuccess: (_, variables) => {
      variables.itemIds.forEach((itemId) => {
        deleteItemId(itemId);
        mutate(itemId);
      });

      queryclient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message ?? 'Something went wrong');
    },
  });
};
