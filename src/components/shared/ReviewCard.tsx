import type { Review } from '@/features/book/types/book';
import { formatDateTime } from '@/utils/formate-date';
import { CiImageOff } from 'react-icons/ci';
import { TiStarFullOutline } from 'react-icons/ti';

interface ReviewCardProps {
  review: Review;
}
const ReviewCard = ({ review }: ReviewCardProps) => {
  const dateTime = formatDateTime(review.createdAt);
  return (
    <div className='flex flex-col p-4 rounded-2xl shadow-soft'>
      <div className='flex gap-3 items-center mb-4 lg:mb-4.5'>
        <div className='size-14.5 lg:size-16 shrink-0 rounded-full border flex justify-center items-center'>
          <CiImageOff className='size-10 text-neutral-400' />
        </div>
        <div className='flex flex-col'>
          <p className='font-bold text-sm lg:text-lg'>{review.user.name}</p>
          <p className='font-medium lg:text-md'>{dateTime}</p>
        </div>
      </div>

      <div className='flex'>
        {Array.from({ length: review.star }).map((_, index) => (
          <TiStarFullOutline key={index} className='fill-[#FFAB0D]' />
        ))}
      </div>

      <p className='font-semibold tex-sm lg:text-md'>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
