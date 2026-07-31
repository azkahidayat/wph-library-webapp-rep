import type { BookListItemData } from '@/components/shared/BookListItem';
import BookListItem from '@/components/shared/BookListItem';
import HorizontalLine from '@/components/shared/HorizontalLine';
import type { MyReview } from '@/features/profile/types/myreviews';
import { formatDateTime } from '@/utils/formate-date';
import { TiStarFullOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

interface MyReviewsCardProps {
  myReview: MyReview;
}

const MyReviewsCard = ({ myReview }: MyReviewsCardProps) => {
  const bookListItemData: BookListItemData = {
    authorName: myReview.book.author.name,
    bookTitle: myReview.book.title,
    categoryName: myReview.book.category.name,
    coverImage: myReview.book.coverImage,
  };
  const navigate = useNavigate();
  const handleCardClick = (bookId: number) => {
    navigate(`/books/${bookId}`);
  };
  return (
    <div className='shadow-soft rounded-2xl p-4 flex flex-col gap-4 lg:gap-5'>
      <p className='font-semibold text-sm lg:text-md'>
        {formatDateTime(myReview.createdAt)}
      </p>
      <HorizontalLine />
      <div
        className='flex gap-3 lg:gap-4'
        onClick={() => handleCardClick(myReview.book.id)}
      >
        <BookListItem bookListItemData={bookListItemData} />
      </div>
      <HorizontalLine />
      <div className='flex'>
        {Array.from({ length: myReview.star }).map((_, index) => (
          <TiStarFullOutline key={index} className='fill-[#FFAB0D]' />
        ))}
      </div>

      <p className='font-semibold tex-sm lg:text-md'>{myReview.comment}</p>
    </div>
  );
};

export default MyReviewsCard;
