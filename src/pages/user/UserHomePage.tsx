import HeroHome from './sections/home/HeroHome';
import CategoriesHome from './sections/home/CategoriesHome';
import RecommendedBookHome from './sections/home/RecommendedBooksHome';
import PopularAuthorsHome from './sections/home/PopularAuthorsHome';

const UserHomePage = () => {
  return (
    <div className='pt-4 lg:pt-12 flex flex-col gap-6 lg:gap-12 pb-4 lg:pb-29'>
      <HeroHome />
      <CategoriesHome />
      <RecommendedBookHome />
      <div className='border-b w-full' />
      <PopularAuthorsHome />
    </div>
  );
};

export default UserHomePage;
