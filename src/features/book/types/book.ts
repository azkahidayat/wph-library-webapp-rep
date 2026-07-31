/**------------
 * Shared
 -------------*/

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**------------
 * Recommended
 -------------*/

export interface RecommendedBooksData {
  mode: string;
  books: RecommendedBook[];
  pagination: Pagination;
}

export interface RecommendedBook extends Omit<Book, 'author' | 'category'> {
  author: AuthorSummary;
  category: CategorySummary;
}

export interface AuthorSummary {
  id: number;
  name: string;
}

export interface CategorySummary {
  id: number;
  name: string;
}

/**------------
 * Books list
 -------------*/

export interface BooksData {
  books: Book[];
  pagination: Pagination;
}

export interface Book {
  id: number;
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
  coverImage: string;
  rating: number;
  reviewCount: number;
  totalCopies: number;
  availableCopies: number;
  borrowCount: number;
  authorId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
  category: Category;
}

export interface Author extends AuthorSummary {
  bio: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Category extends CategorySummary {
  createdAt: string;
  updatedAt: string;
}

/**------------
 * Books detail
 -------------*/
export interface BookDetailData extends Book {
  reviews: Review[];
}

export interface Review {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string;
  user: UserSummary;
}

export interface UserSummary {
  id: number;
  name: string;
}
