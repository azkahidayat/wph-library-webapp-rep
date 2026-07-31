import { api } from '@/lib/axios';
import type {
  LoginData,
  LoginPayload,
  RegisterData,
  RegisterPayload,
} from '../types';
import type { ApiResponse } from '@/types';

export const login = async (
  loginPayload: LoginPayload
): Promise<ApiResponse<LoginData>> => {
  const { data } = await api.post<ApiResponse<LoginData>>(
    '/auth/login',
    loginPayload
  );
  return data;
};

export const register = async (
  registerPayload: RegisterPayload
): Promise<ApiResponse<RegisterData>> => {
  const { data } = await api.post<ApiResponse<RegisterData>>(
    '/auth/register',
    registerPayload
  );
  return data;
};
