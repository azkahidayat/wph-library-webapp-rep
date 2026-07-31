import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { BorrowSchema } from '@/features/checkout/schema/borrowSchema';
import { addDays, format } from 'date-fns';
import { Controller, useFormContext } from 'react-hook-form';

const BorrowDuration = () => {
  const { control, watch } = useFormContext<BorrowSchema>();

  const durations = ['3', '5', '10'];

  const borrowDate = watch('borrowDate');
  const days = watch('days');

  const dueDate =
    borrowDate && days
      ? format(addDays(new Date(borrowDate), Number(days)), 'dd MMMM yyyy')
      : '';

  return (
    <div className='flex flex-col gap-4 lg:gap-6'>
      <div className='flex flex-col gap-3'>
        <p className='font-bold text-sm lg:text-md'>Borrow Duration</p>
        <Controller
          name='days'
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              {durations.map((duration) => (
                <div key={duration} className='flex items-center gap-2'>
                  <RadioGroupItem value={duration} id={`${duration}-day`} />
                  <label
                    htmlFor={`${duration}-day`}
                    className='font-semibold text-sm lg:text-md cursor-pointer w-full'
                  >
                    {duration} Days
                  </label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
      </div>
      <div className='rounded-xl bg-primary-100 p-3 lg:p-4 flex flex-col'>
        <p className='font-bold text-sm lg:text-md'>Return Date</p>
        <p className='font-medium text-sm lg:text-md'>
          Please return the book no later than{' '}
          <span className='font-bold text-sm lg:text-md text-[#EE1D52]'>
            {dueDate}
          </span>
        </p>
      </div>
    </div>
  );
};

export default BorrowDuration;
