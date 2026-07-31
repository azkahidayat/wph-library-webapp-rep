import type { Author } from './book';

export interface PopularAuthorsData {
  authors: PopularAuthor[];
}
export interface PopularAuthor extends Omit<Author, 'createdAt' | 'updatedAt'> {
  bookCount: number;
  accumulatedScore: number;
}
