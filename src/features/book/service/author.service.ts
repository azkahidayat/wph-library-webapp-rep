import type { ApiResponse } from '@/types';
import type { PopularAuthorsData } from '../types/author';
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
