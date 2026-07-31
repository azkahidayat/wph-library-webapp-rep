import { useAddBookForAdmin } from '@/features/admin/hooks/useBookForAdmin';
import BackButton from './BackButton';
import Form from './Form';

const Add = () => {
  const { isPending } = useAddBookForAdmin();
  return (
    <section id='add-book'>
      <div className='flex flex-col gap-4 lg:gap-6'>
        <BackButton>Add Book</BackButton>
        <Form isPending={isPending} />
      </div>
    </section>
  );
};

export default Add;
