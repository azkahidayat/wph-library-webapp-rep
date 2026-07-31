export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// error
export interface ErrorResponse {
  success: boolean;
  message: string;
}

/**------------
 * Shared
 -------------*/

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
