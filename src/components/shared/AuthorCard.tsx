import type { PopularAuthor } from '@/features/book/types/author';
import { CiImageOff } from 'react-icons/ci';
import book from '@/assets/icons/book.svg';
import { useNavigate } from 'react-router-dom';

interface AuthorCardProps {
  author: PopularAuthor;
}
const AuthorCard = ({ author }: AuthorCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/authors/${id}/books`);
  };
  return (
    <div
      className='shadow-soft rounded-xl flex gap-3 p-3 lg:gap-4 lg:p-4 items-center hover-lift'
      onClick={() => handleCardClick(author.id)}
    >
      <div className='size-15 lg:size-20.25 rounded-full shrink-0 aspect-square border flex justify-center items-center'>
        <CiImageOff className='size-7 text-neutral-500' />
      </div>
      <div className='flex flex-col gap-0.5'>
        <p className='font-bold text-md lg:text-lg'>{author.name}</p>
        <div className='flex gap-2.5'>
          <img src={book} alt='book icon' />
          <p className='font-medium text-sm lg:text-md'>
            {author.bookCount} books
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
