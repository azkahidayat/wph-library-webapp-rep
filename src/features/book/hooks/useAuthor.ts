import { useQuery } from '@tanstack/react-query';
import { getPopularAuthors } from '../service/author.service';

export const useGetPopularAuthors = () => {
  return useQuery({
    queryKey: ['authors', 'popular'],
    queryFn: () => getPopularAuthors({}),
  });
};
