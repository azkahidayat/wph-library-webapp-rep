import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types';
import type { GetUsersData } from '../types/user';

export interface GetUsersDataParams {
  q?: string;
  page?: number;
  limit?: number;
}

export const getUsersData = async ({
  q,
  page = 1,
  limit = 10,
}: GetUsersDataParams): Promise<ApiResponse<GetUsersData>> => {
  const { data } = await api.get<ApiResponse<GetUsersData>>('/admin/users', {
    params: {
      q,
      page,
      limit,
    },
  });
  return data;
};
