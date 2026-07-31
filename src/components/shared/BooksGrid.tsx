import type { Book, RecommendedBook } from '@/features/book/types/book';
import type { BookDataCard } from './BookCard';
import BookCard from './BookCard';
import { cn } from '@/lib/utils';

interface BooksGridProps {
  books: Book[] | RecommendedBook[];
  className?: string;
}

const BooksGrid = ({ books, className }: BooksGridProps) => {
  return (
    <div
      className={cn(
        'grid gap-4 lg:gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5',
        className
      )}
    >
      {books.map((book) => {
        const bookDataCard: BookDataCard = {
          coverImage: book.coverImage,
          authorName: book.author.name,
          id: book.id,
          rating: book.rating,
          title: book.title,
        };
        return <BookCard key={book.id} bookDataCard={bookDataCard} />;
      })}
    </div>
  );
};

export default BooksGrid;
