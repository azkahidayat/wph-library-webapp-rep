export interface AddBookToCartData {
  item: CartItem;
}

export interface CartItem {
  id: number;
  cartId: number;
  bookId: number;
  createdAt: string;
  book: CartBook;
}

export interface CartBook {
  id: number;
  title: string;
  description: string;
  isbn: string;
  publishedYear: number | null;
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
  author: BookAuthor;
  category: BookCategory;
}

export interface BookAuthor {
  id: number;
  name: string;
}

export interface BookCategory {
  id: number;
  name: string;
}

export interface MyCartItem {
  id: number;
  bookId: number;
  addedAt: string;
  book: CartBook;
}

export interface MyCartData {
  cartId: number;
  items: MyCartItem[];
  itemCount: number;
}

export interface RemoveCartItemData {
  id: number;
}
