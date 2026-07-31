import type { ApiResponse } from '@/types';
import type { PopularAuthorsData } from '../types/author';
import { api } from '@/lib/axios';

export const getPopularAuthors = async (): Promise<
  ApiResponse<PopularAuthorsData>
> => {
  const { data } =
    await api.get<ApiResponse<PopularAuthorsData>>('/authors/popular');

  return data;
};
