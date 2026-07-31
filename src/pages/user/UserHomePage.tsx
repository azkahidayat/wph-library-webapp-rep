import HeroHome from './sections/home/HeroHome';
import CategoriesHome from './sections/home/CategoriesHome';
import RecommendedBookHome from './sections/home/RecommendedBooksHome';
import PopularAuthorsHome from './sections/home/PopularAuthorsHome';
import Container from '@/components/layouts/Container';
import HorizontalLine from '@/components/shared/HorizontalLine';

const UserHomePage = () => {
  return (
    <Container>
      <HeroHome />
      <CategoriesHome />
      <RecommendedBookHome />
      <HorizontalLine />
      <PopularAuthorsHome />
    </Container>
  );
};

export default UserHomePage;
