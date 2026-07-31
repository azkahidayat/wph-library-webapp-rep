import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types';
import type {
  BookDetailData,
  BooksData,
  RecommendedBooksData,
} from '../types/book';

export const getAllBooks = async (): Promise<ApiResponse<BooksData>> => {
  const { data } = await api.get<ApiResponse<BooksData>>('/books');
  return data;
};

interface GetRecommendedBooksParams {
  page?: number;
  by?: 'rating' | 'popular';
  limit?: number;
}

export const getRecommendedBooks = async ({
  page,
  by = 'rating',
  limit = 8,
}: GetRecommendedBooksParams): Promise<ApiResponse<RecommendedBooksData>> => {
  const { data } = await api.get<ApiResponse<RecommendedBooksData>>(
    'books/recommend',
    {
      params: {
        by,
        page,
        limit,
      },
    }
  );
  return data;
};

export const getBookDetail = async (
  id: string
): Promise<ApiResponse<BookDetailData>> => {
  const { data } = await api.get<ApiResponse<BookDetailData>>(`/books/${id}`);
  return data;
};
