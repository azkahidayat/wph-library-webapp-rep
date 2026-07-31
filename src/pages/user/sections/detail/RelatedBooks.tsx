import BooksGrid from '@/components/shared/BooksGrid';
import LoadMoreButton from '@/components/shared/LoadMoreButton';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllBooks } from '@/features/book/hooks/useBook';

interface RelatedBooksProps {
  categoryId?: number;
}

const RelatedBooks = ({ categoryId }: RelatedBooksProps) => {
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAllBooks({ categoryId, limit: 5 });

  const books = data?.pages.flatMap((page) => page.data.books) ?? [];

  if (error) return <p>{error.message}</p>;

  if (isLoading)
    return (
      <section id='related' className='relative flex flex-col gap-5 lg:gap-10'>
        <h2 className='font-bold text-display-xs lg:text-display-lg'>
          Related Books
        </h2>
        <div className='relative pb-15 lg:pb-22'>
          <div className='grid gap-4 lg:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className='h-90 lg:h-100' />
            ))}
          </div>

          <Skeleton className='absolute bottom-0 rounded-full w-50 h-12 left-1/2 -translate-x-1/2' />
        </div>
      </section>
    );

  return (
    <section id='related' className='relative flex flex-col gap-5 lg:gap-10'>
      <h2 className='font-bold text-display-xs lg:text-display-lg'>
        Related Books
      </h2>
      <div className='relative pb-15 lg:pb-22'>
        <BooksGrid books={books} />
        <LoadMoreButton
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        />
      </div>
    </section>
  );
};

export default RelatedBooks;
