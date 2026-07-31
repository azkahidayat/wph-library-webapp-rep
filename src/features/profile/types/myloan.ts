import type {
  AuthorSummary,
  Book,
  CategorySummary,
} from '@/features/book/types/book';
import type { Pagination } from '@/types';

export interface LoanBook extends Omit<Book, 'author' | 'category'> {
  author: AuthorSummary;
  category: CategorySummary;
}

export interface MyLoan {
  id: number;
  status: 'BORROWED' | 'RETURNED' | 'LATE';
  displayStatus: string;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
  durationDays: number;
  book: LoanBook;
}

export interface LoanData {
  loans: MyLoan[];
  pagination: Pagination;
}
