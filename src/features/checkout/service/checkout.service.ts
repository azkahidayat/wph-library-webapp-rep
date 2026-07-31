import type { ApiResponse } from '@/types';
import { api } from '@/lib/axios';
import type { CheckoutCartData } from '../types/checkout';

export const getCheckoutData = async (): Promise<
  ApiResponse<CheckoutCartData>
> => {
  const { data } =
    await api.get<ApiResponse<CheckoutCartData>>('/cart/checkout');
  return data;
};
