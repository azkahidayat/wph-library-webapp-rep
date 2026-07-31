import type {
  AuthorSummary,
  Book,
  CategorySummary,
} from '@/features/book/types/book';
import type { Pagination } from '@/types';

/**
 *  Get My Reviews
 */

export interface MyReviewsData {
  reviews: MyReview[];
  pagination: Pagination;
}

export interface MyReview {
  id: number;
  star: number;
  comment: string | null;
  createdAt: string;
  book: ReviewBook;
}

export interface ReviewBook extends Omit<Book, 'author' | 'category'> {
  author: AuthorSummary;
  category: CategorySummary;
}

/**
 * Add Review
 */

export interface AddMyReviewData {
  review: Review;
  bookStats: BookStats;
}

export interface Review {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string;
}

export interface BookStats {
  rating: number;
  reviewCount: number;
}

/**
 * Delete Review
 */

export interface DeleteMyReviewData {
  bookStats: BookStats;
}
