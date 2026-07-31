import type { Pagination } from '@/types';
import type { Author, Book } from './book';

export interface PopularAuthorsData {
  authors: PopularAuthor[];
}
export interface PopularAuthor extends Omit<Author, 'createdAt' | 'updatedAt'> {
  bookCount: number;
  accumulatedScore: number;
}

export interface AuthorBooksData {
  author: Author;
  bookCount: number;
  books: Book[];
  pagination: Pagination;
}
