import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types';
import type {
  AddBookToCartData,
  MyCartData,
  RemoveCartItemData,
} from '../types/cart';

interface AddBookToCartBody {
  bookId: number;
}

export const addBookToCart = async ({
  bookId,
}: AddBookToCartBody): Promise<ApiResponse<AddBookToCartData>> => {
  const { data } = await api.post<ApiResponse<AddBookToCartData>>(
    '/cart/items',
    { bookId }
  );
  return data;
};

export const getMyCart = async (): Promise<ApiResponse<MyCartData>> => {
  const { data } = await api.get<ApiResponse<MyCartData>>('/cart');
  return data;
};

export const deleteOneItemFromCart = async (
  itemId: number
): Promise<ApiResponse<RemoveCartItemData>> => {
  const { data } = await api.delete<ApiResponse<RemoveCartItemData>>(
    `/cart/items/${itemId}`
  );
  return data;
};
