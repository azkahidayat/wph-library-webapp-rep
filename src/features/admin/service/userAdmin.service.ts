import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types';
import type { GetUsersData } from '../types/admin-user';
import type { BooksData } from '@/features/book/types/book';

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

export type AvailabilityStatus = 'all' | 'available' | 'borrowed' | 'returned';

export interface GetAllBooksForAdminParams {
  status?: AvailabilityStatus;
  q?: string;
  categoryId?: number;
  authorId?: number;
  page?: number;
  limit?: number;
}

export const getAllBooksForAdmin = async ({
  status,
  q,
  categoryId,
  authorId,
  page = 1,
  limit = 20,
}: GetAllBooksForAdminParams): Promise<ApiResponse<BooksData>> => {
  const { data } = await api.get<ApiResponse<BooksData>>('/admin/books', {
    params: {
      status,
      q,
      categoryId,
      authorId,
      page,
      limit,
    },
  });

  return data;
};
