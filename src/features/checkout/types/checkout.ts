import type {
  AuthorSummary,
  Book,
  CategorySummary,
} from '@/features/book/types/book';

export interface CheckoutCartData {
  user: CheckoutUser;
  items: CheckoutCartItem[];
  itemCount: number;
}

export interface CheckoutUser {
  name: string;
  email: string;
  nomorHandphone: string;
}

export interface CheckoutCartItem {
  id: number;
  bookId: number;
  book: Omit<Book, 'author' | 'category'> & {
    author: AuthorSummary;
    category: CategorySummary;
  };
}
