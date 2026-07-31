import type { User } from '@/features/auth/types';
import type { Pagination } from '@/types';

export interface AdminUser extends User {
  createdAt: string;
}

export type GetUsersData = {
  users: AdminUser[];
  pagination: Pagination;
};
