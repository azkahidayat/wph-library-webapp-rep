import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types';
import type {
  AddMyReviewData,
  DeleteMyReviewData,
  MyReviewsData,
} from '../types/my-reviews';

interface AddMyReviewPayload {
  bookId: number;
  star: number;
  comment: string;
}

export const addMyReview = async (
  payload: AddMyReviewPayload
): Promise<ApiResponse<AddMyReviewData>> => {
  const { data } = await api.post<ApiResponse<AddMyReviewData>>(
    '/reviews',
    payload
  );
  return data;
};

interface DeleteMyReviewParams {
  reviewId: number;
  bookId: number;
}

export const deleteMyReview = async (
  params: DeleteMyReviewParams
): Promise<ApiResponse<DeleteMyReviewData>> => {
  const { reviewId } = params;
  const { data } = await api.delete<ApiResponse<DeleteMyReviewData>>(
    `/reviews/${reviewId}`
  );
  return data;
};

export interface GetMyReviewsParams {
  q?: string;
  page?: number;
  limit?: number;
}

export const getMyReviews = async ({
  q,
  page = 1,
  limit = 10,
}: GetMyReviewsParams): Promise<ApiResponse<MyReviewsData>> => {
  const { data } = await api.get<ApiResponse<MyReviewsData>>('/me/reviews', {
    params: {
      q,
      page,
      limit,
    },
  });
  return data;
};
