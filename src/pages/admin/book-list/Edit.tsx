import { useEditBookForAdmin } from '@/features/admin/hooks/useBookForAdmin';
import BackButton from './BackButton';
import Form, { type InitialValueData } from './Form';
import { useSearchParams } from 'react-router-dom';
import { useGetBookDetail } from '@/features/book/hooks/useBook';
import { Skeleton } from '@/components/ui/skeleton';

const Edit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const bookIdQuery = searchParams.get('bookId');
  const bookId = bookIdQuery ? Number(bookIdQuery) : undefined;
  const { data, isLoading } = useGetBookDetail(Number(bookId));
  const { mutate, isPending } = useEditBookForAdmin();

  const bookDetail = data?.data;

  const initialValueData: InitialValueData = {
    categoryId: bookDetail?.categoryId,
    isbn: bookDetail?.isbn,
    publishedYear: bookDetail?.publishedYear,
    title: bookDetail?.title,
    authorName: bookDetail?.author.name,
    description: bookDetail?.description,
  };

  return (
    <section id='add-book'>
      <div className='flex flex-col gap-4 lg:gap-6'>
        <BackButton>Edit Book</BackButton>
        {isLoading ? (
          <div>
            <Skeleton />
          </div>
        ) : (
          bookId && (
            <Form
              isPending={isPending}
              initialValueData={initialValueData}
              onSubmitBook={(payload) =>
                mutate(
                  { bookId: Number(bookId), payload },
                  {
                    onSuccess: () => {
                      const params = new URLSearchParams(searchParams);
                      params.delete('action');
                      params.delete('bookId');
                      setSearchParams(params);
                    },
                  }
                )
              }
            />
          )
        )}
      </div>
    </section>
  );
};

export default Edit;
