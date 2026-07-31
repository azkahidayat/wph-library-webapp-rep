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
