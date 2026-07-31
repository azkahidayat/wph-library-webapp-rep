import Container from '@/components/layouts/Container';
import HorizontalLine from '@/components/shared/HorizontalLine';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { useGetCheckoutData } from '@/features/checkout/hooks/useCheckout';
import UserInfo from './sections/checkout/UserInfo';
import BookList from './sections/checkout/BookList';

const UserCheckoutPage = () => {
  const { data, isLoading, error } = useGetCheckoutData();
  const selectedItemIds = useCartStore((state) => state.itemIds);
  if (error) return <p>{error.message}</p>;
  const selectedItems =
    data?.data.items.filter((item) => selectedItemIds.includes(item.id)) ?? [];
  const user = data?.data.user;
  console.log(user);
  return (
    <Container>
      <section id='checkout' className='relative flex flex-col gap-5 lg:gap-10'>
        <h2 className='font-bold text-display-xs lg:text-display-lg'>
          Checkout
        </h2>
        <div className='flex flex-col md:flex-row md:items-start md:justify-between'>
          <div id='left-sidebar' className='flex flex-col gap-4 md:gap-8'>
            <UserInfo
              name={user?.name}
              email={user?.email}
              nomorHandphone={user?.nomorHandphone}
              isLoading={isLoading}
            />
            <HorizontalLine />
            <BookList selectedItems={selectedItems} isLoading={isLoading} />
          </div>
          <div id='right-sidebar'></div>
        </div>
      </section>
    </Container>
  );
};

export default UserCheckoutPage;
