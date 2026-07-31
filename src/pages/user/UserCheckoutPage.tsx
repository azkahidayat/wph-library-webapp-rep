import Container from '@/components/layouts/Container';
import HorizontalLine from '@/components/shared/HorizontalLine';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { useGetCheckoutData } from '@/features/checkout/hooks/useCheckout';
import UserInfo from './sections/checkout/UserInfo';
import BookList from './sections/checkout/BookList';
import BorrowRequest from './sections/checkout/BorrowRequest';

const UserCheckoutPage = () => {
  const { data, isLoading, error } = useGetCheckoutData();
  const selectedItemIds = useCartStore((state) => state.itemIds);
  if (error) return <p>{error.message}</p>;
  const selectedItems =
    data?.data.items.filter((item) => selectedItemIds.includes(item.id)) ?? [];
  const user = data?.data.user;
  return (
    <Container>
      <section
        id='checkout'
        className='relative flex flex-col gap-5 lg:gap-10 max-w-250 w-full m-auto'
      >
        <h2 className='font-bold text-display-xs lg:text-display-lg'>
          Checkout
        </h2>
        <div className='flex flex-col gap-6 md:gap-14.5 md:flex-row md:items-start md:justify-between'>
          <div
            id='left-sidebar'
            className='flex flex-col gap-4 md:gap-8 w-full md:max-w-116.5'
          >
            <UserInfo
              name={user?.name}
              email={user?.email}
              nomorHandphone={user?.nomorHandphone}
              isLoading={isLoading}
            />
            <HorizontalLine />
            <BookList selectedItems={selectedItems} isLoading={isLoading} />
          </div>
          <div id='right-sidebar' className='w-full'>
            <BorrowRequest itemIds={selectedItemIds} />
          </div>
        </div>
      </section>
    </Container>
  );
};

export default UserCheckoutPage;
