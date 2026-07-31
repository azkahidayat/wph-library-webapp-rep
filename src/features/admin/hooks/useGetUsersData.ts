import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  getUsersData,
  type GetUsersDataParams,
} from '../service/userAdmin.service';

export const useGetUsersData = (params: GetUsersDataParams) => {
  return useQuery({
    queryKey: ['admin', 'users', params],
    queryFn: () => getUsersData(params),
    placeholderData: keepPreviousData,
  });
};
