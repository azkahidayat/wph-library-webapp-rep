import { Calendar } from '@/components/ui/calendar';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { BorrowSchema } from '@/features/checkout/schema/borrowSchema';
import { formatDate } from '@/utils/formate-date';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const DatePicker = () => {
  const { setValue } = useFormContext<BorrowSchema>();

  const initialDate = new Date();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [month, setMonth] = useState<Date | undefined>(initialDate);
  const [displayValue, setDisplayValue] = useState(formatDate(initialDate));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className='flex flex-col'>
      <p className='font-bold text-sm'>Borrow Date</p>
      <InputGroup className='bg-neutral-100 h-12 px-4 rounded-xl'>
        <InputGroupInput
          id='date-required'
          value={displayValue}
          readOnly
          className='font-semibold text-md'
        />
        <InputGroupAddon align='inline-end'>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <InputGroupButton
                id='date-picker'
                variant='ghost'
                size='icon-xs'
                aria-label='Select date'
              >
                <CalendarIcon className='size-5' />
                <span className='sr-only'>Select date</span>
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto overflow-hidden p-0'
              align='end'
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode='single'
                selected={date}
                month={month}
                onMonthChange={setMonth}
                disabled={(date) => date < today}
                onSelect={(selectedDate) => {
                  if (!selectedDate) return;
                  setDate(selectedDate);
                  setDisplayValue(formatDate(selectedDate));
                  setValue('borrowDate', format(selectedDate, 'yyyy-MM-dd'));
                  setOpen(false);
                }}
                className='disabled:pointer-events-none'
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default DatePicker;
