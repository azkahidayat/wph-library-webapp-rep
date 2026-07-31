import { CiImageOff } from 'react-icons/ci';
import { TiStarFullOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

export interface BookDataCard {
  id: number;
  title: string;
  authorName: string;
  coverImage: string;
  rating: number;
}

interface BookCardProps {
  bookDataCard: BookDataCard;
}

const BookCard = ({ bookDataCard }: BookCardProps) => {
  const navigate = useNavigate();
  const handleCardClick = (id: number) => {
    navigate(`/books/${id}`);
  };
  return (
    <div
      className='shadow-soft flex flex-col rounded-xl overflow-hidden hover-lift '
      onClick={() => handleCardClick(bookDataCard.id)}
    >
      <div className='h-64.5 overflow-hidden'>
        {bookDataCard.coverImage ? (
          <img
            src={bookDataCard.coverImage}
            alt='cover image'
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='flex h-full justify-center items-center'>
            <CiImageOff className='size-10 text-neutral-400' />
          </div>
        )}
      </div>
      <div className='flex flex-col gap-0.5 lg:gap-1 p-4'>
        <p className='font-bold text-sm lg:text-lg hover:underline'>
          {bookDataCard.title}
        </p>
        <p className='font-medium text-sm lg:text-md text-neutral-700'>
          {bookDataCard.authorName}
        </p>
        <div className='flex gap-0.5 items-center'>
          <TiStarFullOutline className='fill-[#FFAB0D]' />
          {bookDataCard.rating.toFixed(1)}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
