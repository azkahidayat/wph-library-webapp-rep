import Container from '@/components/layouts/Container';
import AuthorCard, {
  type AuthorCardData,
} from '@/components/shared/AuthorCard';
import BooksGrid from '@/components/shared/BooksGrid';
import LoadMoreButton from '@/components/shared/LoadMoreButton';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetBooksByAuthor } from '@/features/book/hooks/useAuthor';
import { useParams } from 'react-router-dom';

const UserBookByAuthorPage = () => {
  const { id } = useParams();
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetBooksByAuthor({ id: Number(id) });

  if (error) return <p>{error.message}</p>;
  const books = data?.pages.flatMap((page) => page.data.books) ?? [];
  const author = data?.pages[0].data.author;
  const bookCount = data?.pages[0].data.bookCount;
  const authorCardData: AuthorCardData = {
    id: author?.id ?? 0,
    name: author?.name ?? '',
    bookCount: bookCount ?? 0,
  };

  if (isLoading)
    return (
      <Container>
        <section id='author-info'>
          <Skeleton className='w-full h-30' />
        </section>
        <section
          id='author-book-list'
          className='relative flex flex-col gap-5 lg:gap-10'
        >
          <h2 className='font-bold text-display-xs lg:text-display-lg'>
            Book List
          </h2>

          <div className='relative pb-15 lg:pb-22'>
            <div className='grid gap-4 lg:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className='h-80 lg:h-90' />
              ))}
            </div>

            <Skeleton className='absolute bottom-0 rounded-full w-50 h-12 left-1/2 -translate-x-1/2' />
          </div>
        </section>
      </Container>
    );

  return (
    <Container>
      <section id='author-info'>
        {author && <AuthorCard authorCardData={authorCardData} />}
      </section>
      <section
        id='recommendation'
        className='relative flex flex-col gap-5 lg:gap-10'
      >
        <h2 className='font-bold text-display-xs lg:text-display-lg'>
          Book List
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
    </Container>
  );
};

export default UserBookByAuthorPage;
