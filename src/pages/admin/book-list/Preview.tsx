import HorizontalLine from '@/components/shared/HorizontalLine';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetBookDetail } from '@/features/book/hooks/useBook';
import BookInfo, {
  type BookInfoData,
} from '@/pages/user/sections/detail/components/BookInfo';
import Description from '@/pages/user/sections/detail/components/Description';
import { CiImageOff } from 'react-icons/ci';
import { useSearchParams } from 'react-router-dom';
import BackButton from './BackButton';

const Preview = () => {
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get('bookId');
  const { data, isLoading } = useGetBookDetail(Number(bookId));

  const bookDetail = data?.data;
  const bookInfoData: BookInfoData = {
    author: bookDetail?.author.name ?? 'Unknown Author',
    availableCopies: bookDetail?.availableCopies ?? 0,
    category: bookDetail?.category.name ?? 'Uncategorized',
    rating: bookDetail?.rating ?? 0,
    reviewCount: bookDetail?.reviewCount ?? 0,
    title: bookDetail?.title ?? 'Untitled',
    totalCopies: bookDetail?.totalCopies ?? 0,
  };
  const description = bookDetail?.description ?? '';

  return (
    <section id='preview'>
      <div className='flex flex-col gap-4 lg:gap-6'>
        <BackButton>Preview Book</BackButton>
        <div className='flex flex-col gap-9 md:flex-row  items-start'>
          {isLoading ? (
            <Skeleton className='w-[222.75px] h-[328.83px] lg:w-84.25 lg:h-124.5 rounded-none mx-auto shrink-0' />
          ) : bookDetail?.coverImage ? (
            <div className='w-[222.75px] h-[328.83px] lg:w-84.25 lg:h-124.5 shrink-0 bg-neutral-200 p-[5.29px] lg:p-2 mx-auto lg:mx-0'>
              <img
                src={bookDetail?.coverImage}
                alt={`${bookDetail?.title} image`}
                className='size-full object-cover'
              />
            </div>
          ) : (
            <div className='border w-[222.75px] h-[328.83px] lg:w-84.25 lg:h-124.5 shrink-0 flex  justify-center items-center mx-auto lg:mx-0'>
              <CiImageOff className='size-10 text-neutral-400' />
            </div>
          )}
          <div className='flex flex-col gap-4 lg:gap-5 w-full'>
            <BookInfo bookInfoData={bookInfoData} isLoading={isLoading} />
            <HorizontalLine />
            <Description description={description} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;
