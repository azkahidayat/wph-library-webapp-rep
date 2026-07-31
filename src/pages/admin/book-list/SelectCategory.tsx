import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { BookSchema } from '@/features/admin/schema/bookSchema';
import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';

const SelectCategory = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookSchema>();
  return (
    <Controller
      control={control}
      name='categoryId'
      render={({ field }) => (
        <Select
          value={field.value ? String(field.value) : ''}
          onValueChange={(value) => field.onChange(Number(value))}
        >
          <div className='flex flex-col '>
            <label htmlFor='category' className='font-bold text-sm'>
              Category *
            </label>
            <SelectTrigger
              id='category'
              className={cn('w-full h-12', errors.categoryId && 'border-red')}
            >
              <SelectValue placeholder='Select Category' />
            </SelectTrigger>
            {errors.categoryId && (
              <p id={`category-error`} className='text-red text-sm'>
                {errors.categoryId.message}
              </p>
            )}
          </div>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='1'>Computer</SelectItem>
              <SelectItem value='8'>Education</SelectItem>
              <SelectItem value='4'>Fiction</SelectItem>
              <SelectItem value='9'>Finance</SelectItem>
              <SelectItem value='5'>Lifestyle</SelectItem>
              <SelectItem value='10'>Non-Fiction</SelectItem>
              <SelectItem value='6'>Religious</SelectItem>
              <SelectItem value='11'>Science</SelectItem>
              <SelectItem value='12'>Science-Fiction</SelectItem>
              <SelectItem value='7'>Self-Improvement</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default SelectCategory;
