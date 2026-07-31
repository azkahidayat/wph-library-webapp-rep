export interface BookListItemData {
  coverImage: string;
  categoryName: string;
  bookTitle: string;
  authorName: string;
}

interface BookListItemProps {
  bookListItemData: BookListItemData;
}

const BookListItem = ({ bookListItemData }: BookListItemProps) => {
  return (
    <>
      <div className='w-17.5 h-26.5 shrink-0'>
        <img
          src={bookListItemData.coverImage}
          alt='book cover'
          className='size-full object-cover'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <div className='border rounded-sm flex justify-center items-center font-bold text-sm w-fit px-2'>
          {bookListItemData.categoryName}
        </div>
        <p className='font-bold text-md lg:text-lg'>
          {bookListItemData.bookTitle}
        </p>
        <p className='font-medium text-neutral-700 text-sm lg:text-md'>
          {bookListItemData.authorName}
        </p>
      </div>
    </>
  );
};

export default BookListItem;
