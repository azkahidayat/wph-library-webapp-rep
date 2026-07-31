import BookCard, { type BookDataCard } from '@/components/shared/BookCard';
import { Button } from '@/components/ui/button';
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

  console.log(data);
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
        <div className='grid gap-4 lg:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
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
          <div className='grid gap-4 lg:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {recommendedBooks.map((book) => {
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
          <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-50'>
            <Button
              variant='outline'
              className='w-full font-bold'
              disabled={isFetchingNextPage || !hasNextPage}
              onClick={() => fetchNextPage()}
            >
              {isFetchingNextPage ? 'Loading' : 'Load more'}
            </Button>
          </div>
        </div>
      ) : (
        <div className='h-50 flex justify-center items-center w-full font-semibold shadow-soft rounded-2xl'>
          Data empty
        </div>
      )}
    </section>
  );
};

export default RecommendedBookHome;
