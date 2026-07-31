import type { ApiResponse } from '@/types';
import type { AuthorBooksData, PopularAuthorsData } from '../types/author';
import { api } from '@/lib/axios';

interface GetPopularAuthorsParams {
  limit?: number;
}

export const getPopularAuthors = async ({
  limit = 4,
}: GetPopularAuthorsParams): Promise<ApiResponse<PopularAuthorsData>> => {
  const { data } = await api.get<ApiResponse<PopularAuthorsData>>(
    '/authors/popular',
    {
      params: {
        limit,
      },
    }
  );

  return data;
};

export interface GetBooksByAuthorParams {
  id: number;
  page?: number;
  limit?: number;
}

export const getBooksByAuthor = async ({
  id,
  page = 1,
  limit = 12,
}: GetBooksByAuthorParams) => {
  const { data } = await api.get<ApiResponse<AuthorBooksData>>(
    `/authors/${id}/books`,
    {
      params: {
        page,
        limit,
      },
    }
  );
  return data;
};
