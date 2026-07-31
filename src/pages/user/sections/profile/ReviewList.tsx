import { useGetMyReviews } from '@/features/profile/hooks/useMyReview';
import { useSearchParams } from 'react-router-dom';
import ProfileSearchField from './components/ProfileSearchField';
import { Skeleton } from '@/components/ui/skeleton';
import EmptyState from '@/components/shared/EmptyState';
import LoadMoreButton from '@/components/shared/LoadMoreButton';
import MyReviewsCard from './components/MyReviewsCard';

const ReviewList = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? undefined;
  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetMyReviews({ q: query });

  if (error) return <p>{error.message}</p>;

  const reviews = data?.pages.flatMap((page) => page.data.reviews) ?? [];
  return (
    <section
      id='review'
      className='flex flex-col gap-3.75 lg:gap-6 max-w-250 w-full m-auto'
    >
      <h2 className='font-bold text-display-xs lg:text-display-sm'>Reviews</h2>
      <ProfileSearchField />
      {isLoading ? (
        <div className='relative flex flex-col gap-4 pb-15 lg:gap-6 lg:pb-16'>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className='h-86.5 lg:h-95' />
          ))}

          <Skeleton className='absolute bottom-0 rounded-full w-50 h-12 left-1/2 -translate-x-1/2' />
        </div>
      ) : reviews.length > 0 ? (
        <div className='relative flex flex-col gap-4 pb-15 lg:gap-6 lg:pb-16'>
          {reviews.map((review) => (
            <MyReviewsCard key={review.id} myReview={review} />
          ))}
          <LoadMoreButton
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        </div>
      ) : (
        <EmptyState className='h-50'>No Reviews</EmptyState>
      )}
    </section>
  );
};

export default ReviewList;
