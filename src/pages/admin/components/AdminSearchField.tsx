import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

interface Search {
  query: string;
}

interface ProfileSearchFieldProps {
  className?: string;
}

const AdminSearchField = ({ className }: ProfileSearchFieldProps) => {
  const { register, handleSubmit } = useForm<Search>({
    defaultValues: {
      query: '',
    },
  });

  const [searchParam, setSearchParams] = useSearchParams();

  const onSubmit = (data: Search) => {
    const params = new URLSearchParams(searchParam);
    if (data.query) {
      params.set('q', data.query.trim());
    } else {
      params.delete('q');
    }

    setSearchParams(params);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('md:max-w-125 w-full', className)}
    >
      <div className='relative'>
        <input
          type='text'
          {...register('query')}
          placeholder='Search book'
          className='border rounded-full pl-9.5 lg:pl-10.5 h-10 w-full focus:outline-0 focus:placeholder:opacity-0'
        />
        <SearchIcon className='absolute top-1/2 -translate-y-1/2 left-3 lg:left-4 size-5 text-neutral-600' />
      </div>
    </form>
  );
};

export default AdminSearchField;
