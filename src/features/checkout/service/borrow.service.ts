import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types';
import type { BorrowData } from '../types/borrow';

export interface ConfirmAndBorrowPayload {
  itemIds: number[];
  days: number;
  borrowDate: string;
}

export const confirmAndBorrowBooks = async (
  payLoad: ConfirmAndBorrowPayload
): Promise<ApiResponse<BorrowData>> => {
  const { data } = await api.post<ApiResponse<BorrowData>>(
    '/loans/from-cart',
    payLoad
  );
  return data;
};
