import { useMutation } from '@tanstack/react-query';
import { login, register } from '../service/auth.service';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import type { ErrorResponse } from '@/types';
import { useAuthStore } from '../store/useAuthStore';

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      useAuthStore.getState().login(result.data.token, result.data.user);
      toast.success(`${result.message} successfully`);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message ?? 'Something went wrong');
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: (result) => {
      toast.success(`${result.message}. Please log in`);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message ?? 'Something went wrong');
    },
  });
};
