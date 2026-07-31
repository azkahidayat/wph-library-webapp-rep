import BookListItem, {
  type BookListItemData,
} from '@/components/shared/BookListItem';
import { Skeleton } from '@/components/ui/skeleton';
import type { CheckoutCartItem } from '@/features/checkout/types/checkout';

interface BookListProps {
  selectedItems: CheckoutCartItem[];
  isLoading: boolean;
}

const BookList = ({ selectedItems, isLoading }: BookListProps) => {
  if (isLoading)
    return (
      <div className='flex flex-col gap-2 md:gap-4'>
        <h2 className='text-lg md:text-display-xs font-bold'>Book List</h2>

        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className='h-20 w-full' />
        ))}
      </div>
    );

  return (
    <div className='flex flex-col gap-2 md:gap-4'>
      <h2 className='text-lg md:text-display-xs font-bold'>Book List</h2>
      {selectedItems.map((item) => {
        const bookListItemData: BookListItemData = {
          authorName: item.book.author.name,
          bookTitle: item.book.title,
          categoryName: item.book.category.name,
          coverImage: item.book.coverImage,
        };
        return (
          <div key={item.id} className='flex gap-3 lg:gap-4 items-center'>
            <BookListItem bookListItemData={bookListItemData} />
          </div>
        );
      })}
    </div>
  );
};

export default BookList;
