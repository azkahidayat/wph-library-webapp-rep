import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types';
import type { LoanListData } from '../types/admin-loan';
import type { LoanFilterStatus } from '@/features/profile/service/loan.service';

export interface GetBorrowedBooksParams {
  status?: LoanFilterStatus;
  q?: string;
  page?: number;
  limit?: number;
}

export const getBorrowedBooks = async ({
  status,
  q,
  page = 1,
  limit = 20,
}: GetBorrowedBooksParams): Promise<ApiResponse<LoanListData>> => {
  const { data } = await api.get<ApiResponse<LoanListData>>('/admin/loans', {
    params: {
      status,
      q,
      page,
      limit,
    },
  });
  return data;
};
