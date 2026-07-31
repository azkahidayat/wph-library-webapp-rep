import type {
  AuthorSummary,
  CategorySummary,
} from '@/features/book/types/book';
import type { MyLoan } from '@/features/profile/types/my-loan';
import type { Pagination } from '@/types';

export interface AdminLoanBook {
  id: number;
  title: string;
  coverImage: string;
  author: AuthorSummary;
  category: CategorySummary;
}

export interface LoanBorrower {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface AdminLoan extends Omit<MyLoan, 'book'> {
  book: AdminLoanBook;
  borrower: LoanBorrower;
}

export interface LoanListData {
  loans: AdminLoan[];
  pagination: Pagination;
}
