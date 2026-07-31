import VerticalLine from '@/components/shared/VerticalLine';
import { Skeleton } from '@/components/ui/skeleton';
import { TiStarFullOutline } from 'react-icons/ti';

export interface BookInfoData {
  category: string;
  title: string;
  author: string;
  rating: number;
  availableCopies: number;
  totalCopies: number;
  reviewCount: number;
}

interface BookInfoProps {
  bookInfoData: BookInfoData;
  isLoading: boolean;
}

function BookInfo({ bookInfoData, isLoading }: BookInfoProps) {
  if (isLoading)
    return (
      <div className='flex flex-col gap-3 lg:gap-5.5'>
        <div className='flex flex-col gap-1'>
          <Skeleton className='h-7 rounded-lg w-20' />
          <Skeleton className='h-8 w-100' />
          <Skeleton className='h-5 w-40' />
          <Skeleton className='h-5 w-10' />
        </div>
        <div className='flex gap-5 h-18'>
          <Skeleton className='w-20' />
          <VerticalLine />
          <Skeleton className='w-20' />
          <VerticalLine />
          <Skeleton className='w-20' />
        </div>
      </div>
    );

  return (
    <div className='flex flex-col gap-3 lg:gap-5.5'>
      <div className='flex flex-col'>
        <p className='border rounded-sm px-2 w-fit font-bold text-sm'>
          {bookInfoData?.category}
        </p>
        <p className='font-bold text-display-xs lg:text-display-sm'>
          {bookInfoData?.title}
        </p>
        <p className='font-semibold text-neutral-700 text-sm lg:text-md'>
          {bookInfoData?.author}
        </p>
        <div className='flex gap-0.5 items-center'>
          <TiStarFullOutline className='fill-[#FFAB0D]' />
          <p className='font-bold text-md'>{bookInfoData?.rating.toFixed(1)}</p>
        </div>
      </div>
      <div className='flex gap-5'>
        <div className='flex flex-col'>
          <p className='font-bold text-lg lg:text-display-xs'>
            {bookInfoData?.availableCopies}
          </p>
          <p className='font-medium text-md'>Stock</p>
        </div>
        <VerticalLine />
        <div className='flex flex-col'>
          <p className='font-bold text-lg lg:text-display-xs'>
            {bookInfoData?.totalCopies}
          </p>
          <p className='font-medium text-md'>Total Copies</p>
        </div>
        <VerticalLine />
        <div className='flex flex-col'>
          <p className='font-bold text-lg lg:text-display-xs'>
            {bookInfoData?.reviewCount}
          </p>
          <p className='font-medium text-md'>Review</p>
        </div>
      </div>
    </div>
  );
}

export default BookInfo;
