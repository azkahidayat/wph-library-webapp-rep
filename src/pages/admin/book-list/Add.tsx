import { useAddBookForAdmin } from '@/features/admin/hooks/useBookForAdmin';
import BackButton from './BackButton';
import Form from './Form';
import { useSearchParams } from 'react-router-dom';

const Add = () => {
  const { isPending, mutate } = useAddBookForAdmin();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <section id='add-book'>
      <div className='flex flex-col gap-4 lg:gap-6 lg:max-w-132.25 m-auto'>
        <BackButton>Add Book</BackButton>
        <Form
          isPending={isPending}
          onSubmitBook={(payload) =>
            mutate(payload, {
              onSuccess: () => {
                const params = new URLSearchParams(searchParams);
                params.delete('action');
                params.delete('bookId');
                setSearchParams(params);
              },
            })
          }
        />
      </div>
    </section>
  );
};

export default Add;
