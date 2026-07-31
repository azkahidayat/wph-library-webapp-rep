import { Textarea } from '@/components/ui/textarea';
import type { BookSchema } from '@/features/admin/schema/bookSchema';
import { useFormContext } from 'react-hook-form';

const Description = () => {
  const { register } = useFormContext<BookSchema>();
  return (
    <div className='flex flex-col'>
      <label htmlFor='description' className='font-bold text-sm'>
        Description
      </label>
      <Textarea
        id='description'
        className='h-25'
        {...register('description')}
      />
    </div>
  );
};

export default Description;
