import type { CategoriesData } from '@/features/category/types/category';
import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types';

export const getAllCategories = async (): Promise<
  ApiResponse<CategoriesData>
> => {
  const { data } = await api.get<ApiResponse<CategoriesData>>('/categories');
  return data;
};
