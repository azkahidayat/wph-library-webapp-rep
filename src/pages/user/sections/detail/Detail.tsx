import HorizontalLine from '@/components/shared/HorizontalLine';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import BookInfo, { type BookInfoData } from './components/BookInfo';
import Description from './components/Description';
import BookActionButtons from './components/BookActionButtons';
import type { Book } from '@/features/book/types/book';

interface DetailProps {
  bookDetail?: Book;
  error: Error | null;
  isLoading: boolean;
}

const Detail = ({ bookDetail, error, isLoading }: DetailProps) => {
  const description = bookDetail?.description ?? '';

  if (error) return <p>{error.message}</p>;

  const bookInfoData: BookInfoData = {
    author: bookDetail?.author.name ?? 'Unknown Author',
    availableCopies: bookDetail?.availableCopies ?? 0,
    category: bookDetail?.category.name ?? 'Uncategorized',
    rating: bookDetail?.rating ?? 0,
    reviewCount: bookDetail?.reviewCount ?? 0,
    title: bookDetail?.title ?? 'Untitled',
    totalCopies: bookDetail?.totalCopies ?? 0,
  };
  return (
    <section id='detail'>
      <div className='flex flex-col gap-4 lg:gap-6'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink to='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink to='/books'>Category</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{bookDetail?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='flex flex-col gap-9 md:flex-row  items-start'>
          {isLoading ? (
            <Skeleton className='w-[222.75px] h-[328.83px] lg:w-84.25 lg:h-124.5 rounded-none mx-auto shrink-0' />
          ) : (
            <div className='w-[222.75px] h-[328.83px] lg:w-84.25 lg:h-124.5 shrink-0 bg-neutral-200 p-[5.29px] lg:p-2 mx-auto lg:mx-0'>
              <img
                src={bookDetail?.coverImage}
                alt={`${bookDetail?.title} image`}
                className='size-full object-cover'
              />
            </div>
          )}
          <div className='flex flex-col gap-4 lg:gap-5 w-full'>
            <BookInfo bookInfoData={bookInfoData} isLoading={isLoading} />
            <HorizontalLine />
            <Description description={description} isLoading={isLoading} />
            <BookActionButtons
              availableCopies={bookDetail?.availableCopies ?? 0}
              isLoading={isLoading}
              id={bookDetail?.id}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
