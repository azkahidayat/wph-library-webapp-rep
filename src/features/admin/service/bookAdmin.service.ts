import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types';
import type {
  AdminBookData,
  DeleteBookData,
  UpdateBookData,
} from '../types/admin-book';

export interface BookAdminPayload {
  title: string;
  isbn: string;
  categoryId: number;
  authorId?: number;
  authorName?: string;
  coverImage?: File;
  description?: string;
  publishedYear?: number;
  totalCopies?: number;
  availableCopies?: number;
}

export const addBookAdmin = async (
  payload: BookAdminPayload
): Promise<ApiResponse<AdminBookData>> => {
  const { data } = await api.post<ApiResponse<AdminBookData>>(
    '/books',
    payload
  );
  return data;
};

export interface EditBookAdminPayload {
  bookId: number;
  payload: BookAdminPayload;
}

export const editBookAdmin = async ({
  bookId,
  payload,
}: EditBookAdminPayload): Promise<ApiResponse<UpdateBookData>> => {
  const { data } = await api.put<ApiResponse<UpdateBookData>>(
    `/books/${bookId}`,
    payload
  );

  return data;
};

export const deleteBookAdmin = async (
  bookId: number
): Promise<ApiResponse<DeleteBookData>> => {
  const { data } = await api.delete<ApiResponse<DeleteBookData>>(
    `/books/${bookId}`
  );
  return data;
};
