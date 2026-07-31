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
  authorName: string;
  publishedYear: number;
  description?: string;
  coverImage?: File;
  authorId?: number;
  totalCopies?: number;
  availableCopies?: number;
}

export const addBookAdmin = async (
  payload: BookAdminPayload
): Promise<ApiResponse<AdminBookData>> => {
  const formData = new FormData();

  formData.append('title', payload.title);
  formData.append('isbn', payload.isbn);
  formData.append('categoryId', String(payload.categoryId));
  formData.append('authorName', payload.authorName);
  formData.append('publishedYear', String(payload.publishedYear));

  if (payload.description) {
    formData.append('description', payload.description);
  }

  if (payload.coverImage) {
    formData.append('coverImage', payload.coverImage);
  }

  if (payload.authorId) {
    formData.append('authorId', String(payload.authorId));
  }

  if (payload.totalCopies !== undefined) {
    formData.append('totalCopies', String(payload.totalCopies));
  }

  if (payload.availableCopies !== undefined) {
    formData.append('availableCopies', String(payload.availableCopies));
  }

  const { data } = await api.post<ApiResponse<AdminBookData>>(
    '/books',
    formData
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
