import { useQuery } from '@tanstack/react-query';
import { getCheckoutData } from '../service/checkout.service';

export const useGetCheckoutData = () => {
  return useQuery({
    queryKey: ['cart', 'checkout'],
    queryFn: getCheckoutData,
  });
};
