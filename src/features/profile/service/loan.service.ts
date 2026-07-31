import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types';
import type { LoanData } from '../types/my-loan';

export type LoanFilterStatus = 'all' | 'active' | 'returned' | 'overdue';

export interface GetLoanParams {
  status?: LoanFilterStatus;
  q?: string;
  page?: number;
  limit?: number;
}

export const getLoanList = async ({
  status,
  q,
  page = 1,
  limit = 10,
}: GetLoanParams = {}): Promise<ApiResponse<LoanData>> => {
  const { data } = await api.get<ApiResponse<LoanData>>('/loans/my', {
    params: {
      status,
      q,
      page,
      limit,
    },
  });
  return data;
};
