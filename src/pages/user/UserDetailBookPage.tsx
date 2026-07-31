import Container from '@/components/layouts/Container';
import HorizontalLine from '@/components/shared/HorizontalLine';
import Detail from './sections/detail/Detail';
import Reviews from './sections/detail/Reviews';
import RelatedBooks from './sections/detail/RelatedBooks';
import { useParams } from 'react-router-dom';
import { useGetBookDetail } from '@/features/book/hooks/useBook';

const UserDetailBookPage = () => {
  const { id } = useParams();
  const {
    data: detailResponse,
    isLoading,
    error,
  } = useGetBookDetail(Number(id));

  const bookDetail = detailResponse?.data;
  return (
    <Container className='lg:gap-16'>
      <Detail bookDetail={bookDetail} error={error} isLoading={isLoading} />
      <HorizontalLine />
      <Reviews />
      <HorizontalLine />
      <RelatedBooks categoryId={bookDetail?.categoryId} />
    </Container>
  );
};

export default UserDetailBookPage;
