import LoadMoreButton from '@/components/shared/LoadMoreButton';
import ReviewCard from '@/components/shared/ReviewCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetBookReviews } from '@/features/book/hooks/useBook';
import { useParams } from 'react-router-dom';

const ReviewsGrid = () => {
  const { id } = useParams();
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetBookReviews({ id: Number(id), limit: 6 });

  if (error) return <p>{error.message}</p>;
  const reviews = data?.pages.flatMap((page) => page.data.reviews) ?? [];

  if (isLoading)
    return (
      <div className='relative pb-14.5 lg:pb-16.5'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4.5 lg:gap-5'>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className='h-11xl lg:h-45' />
          ))}
        </div>
        <Skeleton className='absolute bottom-0 rounded-full w-50 h-12 left-1/2 -translate-x-1/2' />
      </div>
    );
  return (
    <div className='relative pb-14.5 lg:pb-16.5'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4.5 lg:gap-5'>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <LoadMoreButton
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onClick={() => fetchNextPage()}
      />
    </div>
  );
};

export default ReviewsGrid;
