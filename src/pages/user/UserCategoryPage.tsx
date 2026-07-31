import Container from '@/components/layouts/Container';
import { useGetAllCategories } from '@/features/category/hooks/useCategories';
import { useSearchParams } from 'react-router-dom';
import SideBar from './sections/category/SideBar';
import BooksGrid from '@/components/shared/BooksGrid';
import { useGetAllBooks } from '@/features/book/hooks/useBook';
import type { GetAllBooksParams } from '@/features/book/service/book.service';
import LoadMoreButton from '@/components/shared/LoadMoreButton';
import { Skeleton } from '@/components/ui/skeleton';
import EmptyState from '@/components/shared/EmptyState';

const UserCategoryPage = () => {
  const [searchParam] = useSearchParams();
  const categoryName = searchParam.get('category');
  const { data: categoriesResponse } = useGetAllCategories();
  const categoryId = categoriesResponse?.data.categories.find(
    (category) => category.name.toLowerCase() === categoryName
  )?.id;
  const queries: GetAllBooksParams = {
    q: searchParam.get('q') || undefined,
    categoryId: categoryId,
    minRating: Number(searchParam.get('minRating')) || undefined,
  };

  const {
    data: booksResponse,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAllBooks(queries);

  if (error) return <p>{error.message}</p>;

  const books = booksResponse?.pages.flatMap((page) => page.data.books) ?? [];

  return (
    <Container>
      <section
        id='book-list'
        className='relative flex flex-col gap-5 lg:gap-10'
      >
        <h2 className='font-bold text-display-xs lg:text-display-lg'>
          Book List
        </h2>
        <div className='flex lg:gap-10'>
          <SideBar />
          {isLoading ? (
            <div className='relative pb-15 lg:pb-22 w-full'>
              <div className='grid gap-4 lg:gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full'>
                {Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton key={index} className='h-90 lg:h-100' />
                ))}
              </div>

              <Skeleton className='absolute bottom-0 rounded-full w-50 h-12 left-1/2 -translate-x-1/2' />
            </div>
          ) : books.length > 0 ? (
            <div className='relative pb-15 lg:pb-22'>
              <BooksGrid
                books={books}
                className='lg:grid-cols-3 xl:grid-cols-4'
              />
              <LoadMoreButton
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                onClick={() => fetchNextPage()}
              />
            </div>
          ) : (
            <EmptyState className='flex-1'>Books Not Found</EmptyState>
          )}
        </div>
      </section>
    </Container>
  );
};

export default UserCategoryPage;
