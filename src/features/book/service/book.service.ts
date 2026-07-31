import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types';
import type {
  BookDetailData,
  BookReviewData,
  BooksData,
  RecommendedBooksData,
} from '../types/book';

export interface GetAllBooksParams {
  q?: string;
  categoryId?: number;
  authorId?: number;
  minRating?: number;
  page?: number;
  limit?: number;
}

export const getAllBooks = async ({
  q,
  categoryId,
  authorId,
  minRating,
  page = 1,
  limit = 12,
}: GetAllBooksParams): Promise<ApiResponse<BooksData>> => {
  const { data } = await api.get<ApiResponse<BooksData>>('/books', {
    params: {
      q,
      categoryId,
      authorId,
      minRating,
      page,
      limit,
    },
  });
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
  id: number
): Promise<ApiResponse<BookDetailData>> => {
  const { data } = await api.get<ApiResponse<BookDetailData>>(`/books/${id}`);
  return data;
};

export interface GetBookReviewsParams {
  id: number;
  page?: number;
  limit?: number;
}

export const getBookReviews = async ({
  id,
  limit = 10,
  page = 1,
}: GetBookReviewsParams): Promise<ApiResponse<BookReviewData>> => {
  const { data } = await api.get<ApiResponse<BookReviewData>>(
    `/reviews/book/${id}`,
    {
      params: {
        page,
        limit,
      },
    }
  );
  return data;
};
