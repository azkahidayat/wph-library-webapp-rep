import HeroHome from './sections/home/HeroHome';
import CategoriesHome from './sections/home/CategoriesHome';
import RecommendedBookHome from './sections/home/RecommendedBooksHome';

const UserHomePage = () => {
  return (
    <div className='pt-4 lg:pt-12 flex flex-col gap-6 lg:gap-12 pb-4 lg:pb-29'>
      <HeroHome />
      <CategoriesHome />
      <RecommendedBookHome />
      <div className='border-b w-full' />
      <section id='popular-authors'>
        <h2 className='font-bold text-display-xs lg:text-display-lg'>
          Popular Authors
        </h2>
      </section>
    </div>
  );
};

export default UserHomePage;
