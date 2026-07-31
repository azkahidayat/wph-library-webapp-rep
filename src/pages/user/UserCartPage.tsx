import Container from '@/components/layouts/Container';
import EmptyState from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  useDeleteOneItemFromCart,
  useGetMyCart,
} from '@/features/cart/hooks/useCart';
import { GoTrash } from 'react-icons/go';
import LoanSummary from './sections/cart/LoanSummary';
import { Skeleton } from '@/components/ui/skeleton';
import { useCartStore } from '@/features/cart/store/useCartStore';
import BookListItem, {
  type BookListItemData,
} from '@/components/shared/BookListItem';
import { toast } from 'sonner';
import type { ErrorResponse } from '@/types';
import axios from 'axios';

const UserCartPage = () => {
  const { data, isLoading, error } = useGetMyCart();
  const { mutate } = useDeleteOneItemFromCart();
  const selectedItemIds = useCartStore((state) => state.itemIds);
  const addItemId = useCartStore((state) => state.addItemId);
  const addAllItemIds = useCartStore((state) => state.addAllItemIds);
  const deleteItemId = useCartStore((state) => state.deleteItemId);
  const deleteAllItemIds = useCartStore((state) => state.deleteAllItemIds);
  if (error) return <p>{error.message}</p>;
  const items = data?.data.items ?? [];

  const handleDeleteClick = (itemId: number) => {
    mutate(itemId, {
      onSuccess: (result) => {
        toast.success(result.message);
      },
      onError: (error) => {
        if (axios.isAxiosError<ErrorResponse>(error))
          toast.error(error.response?.data.message ?? 'Something went wrong');
      },
    });
    deleteItemId(itemId);
  };

  const handleSelectBook = (checked: boolean, itemId: number) => {
    if (checked) {
      addItemId(itemId);
    } else {
      deleteItemId(itemId);
    }
  };

  const handleSelectAllBooks = (checked: boolean) => {
    if (checked) {
      addAllItemIds(items.map((item) => item.id));
    } else {
      deleteAllItemIds();
    }
  };

  const totalBooks = selectedItemIds.length;
  return (
    <Container>
      <section id='cart' className='relative flex flex-col gap-5 lg:gap-10'>
        <h2 className='font-bold text-display-xs lg:text-display-lg'>
          My Cart
        </h2>

        <div className='flex md:gap-10 justify-between items-start'>
          <div className='flex flex-col gap-7.5 w-full'>
            <div className='flex gap-4 items-center'>
              <Checkbox
                id='selectAll'
                checked={
                  items.length > 0 && selectedItemIds.length === items.length
                }
                onCheckedChange={(checked) => handleSelectAllBooks(!!checked)}
              />
              <label htmlFor='selectAll'>Select All</label>
            </div>
            {isLoading ? (
              <div className='flex flex-col gap-4 lg:gap-6 divide-y w-full'>
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className='h-30 w-full' />
                ))}
              </div>
            ) : items.length > 0 ? (
              <div className='flex flex-col gap-4 lg:gap-6 divide-y w-full'>
                {items.map((item) => {
                  const booListItemData: BookListItemData = {
                    coverImage: item.book.coverImage,
                    authorName: item.book.author.name,
                    bookTitle: item.book.title,
                    categoryName: item.book.category.name,
                  };
                  return (
                    <div key={item.book.title} className='flex justify-between'>
                      <div key={item.id} className='flex gap-4 pb-4 lg:pb-6'>
                        <Checkbox
                          checked={selectedItemIds.includes(item.id)}
                          id={item.book.title}
                          onCheckedChange={(checked) =>
                            handleSelectBook(!!checked, item.id)
                          }
                        />
                        <label
                          htmlFor={item.book.title}
                          className='flex gap-3 lg:gap-4 items-center'
                        >
                          <BookListItem bookListItemData={booListItemData} />
                        </label>
                      </div>
                      <Button
                        variant='outline'
                        className='size-8 flex justify-center items-center aspect-square shrink-0'
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        <GoTrash />
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState className='h-50'>Cart is empty</EmptyState>
            )}
          </div>
          <LoanSummary totalBook={totalBooks} />
        </div>
      </section>
    </Container>
  );
};

export default UserCartPage;
