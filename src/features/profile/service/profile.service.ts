import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types';
import type { ProfileData, UpdateProfileData } from '../types/profile';

export const getProfile = async (): Promise<ApiResponse<ProfileData>> => {
  const { data } = await api.get<ApiResponse<ProfileData>>('/me');
  return data;
};

interface UpdateProfilePayload {
  name: string;
  phone: string;
  profilePhoto?: File | null;
}

export const updateProfile = async (
  payload: UpdateProfilePayload
): Promise<ApiResponse<UpdateProfileData>> => {
  const formData = new FormData();
  if (payload.name) {
    formData.append('name', payload.name);
  }
  if (payload.phone) {
    formData.append('phone', payload.phone);
  }
  if (payload.profilePhoto) {
    formData.append('profilePhoto', payload.profilePhoto);
  }
  const { data } = await api.patch<ApiResponse<UpdateProfileData>>(
    '/me',
    formData
  );
  return data;
};
