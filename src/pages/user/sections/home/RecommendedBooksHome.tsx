import BooksGrid from '@/components/shared/BooksGrid';
import EmptyState from '@/components/shared/EmptyState';
import LoadMoreButton from '@/components/shared/LoadMoreButton';
import { Skeleton } from '@/components/ui/skeleton';
import { useRecommendedBooks } from '@/features/book/hooks/useBook';

const RecommendedBookHome = () => {
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useRecommendedBooks();

  const recommendedBooks = data?.pages.flatMap((page) => page.data.books) ?? [];

  return (
    <section
      id='recommendation'
      className='relative flex flex-col gap-5 lg:gap-10'
    >
      <h2 className='font-bold text-display-xs lg:text-display-lg'>
        Recommendation
      </h2>

      {isLoading ? (
        <div className='grid gap-4 lg:gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className='h-92.5' />
          ))}
        </div>
      ) : error ? (
        <p className='absolute top-1/2 -translate-y-1/2 right-0 font-bold text-xl text-red-500'>
          {error.message}
        </p>
      ) : recommendedBooks.length > 0 ? (
        <div className='relative pb-15 lg:pb-22'>
          <BooksGrid books={recommendedBooks} />
          <LoadMoreButton
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        </div>
      ) : (
        <EmptyState className='h-50' />
      )}
    </section>
  );
};

export default RecommendedBookHome;
