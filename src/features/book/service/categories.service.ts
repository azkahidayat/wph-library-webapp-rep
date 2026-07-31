import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types';
import type { CategoriesData } from '../types/category';

export const getAllCategories = async (): Promise<
  ApiResponse<CategoriesData>
> => {
  const { data } = await api.get<ApiResponse<CategoriesData>>('/categories');
  return data;
};
