import AuthorCard from '@/components/shared/AuthorCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetPopularAuthors } from '@/features/book/hooks/useAuthor';

const PopularAuthorsHome = () => {
  const { data, isLoading, error } = useGetPopularAuthors();
  const popularAuthors = data?.data.authors ?? [];

  return (
    <section
      id='popular-authors'
      className='relative flex flex-col gap-5 lg:gap-10'
    >
      <h2 className='font-bold text-display-xs lg:text-display-lg'>
        Popular Authors
      </h2>
      {isLoading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 '>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className='h-28.25  w-full' />
          ))}
        </div>
      ) : error ? (
        <p className='absolute top-1/2 -translate-y-1/2 right-0 font-bold text-xl text-red-500'>
          {error.message}
        </p>
      ) : popularAuthors.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 '>
          {popularAuthors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        ''
      )}
    </section>
  );
};

export default PopularAuthorsHome;
