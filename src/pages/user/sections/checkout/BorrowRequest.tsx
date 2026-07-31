import DatePicker from './DatePicker';
import { FormProvider, useForm } from 'react-hook-form';
import {
  borrowSchema,
  type BorrowSchema,
} from '@/features/checkout/schema/borrowSchema';
import type { ConfirmAndBorrowPayload } from '@/features/checkout/service/borrow.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import BorrowDuration from './BorrowDuration';
import { format } from 'date-fns';
import { useConfirmAndBorrow } from '@/features/checkout/hooks/useBorrow';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { ErrorResponse } from '@/types';
import { toast } from 'sonner';

interface BorrowRequestProps {
  itemIds: number[];
}

const BorrowRequest = ({ itemIds }: BorrowRequestProps) => {
  const { mutate, isPending } = useConfirmAndBorrow();
  const navigate = useNavigate();
  const form = useForm<BorrowSchema>({
    defaultValues: {
      days: '3',
      borrowDate: format(new Date(), 'yyyy-MM-dd'),
      acceptPolicy: true,
      agreeToReturn: true,
    },
    resolver: zodResolver(borrowSchema),
  });

  const onSubmit = (data: BorrowSchema) => {
    const confirmAnddBorrowPayload: ConfirmAndBorrowPayload = {
      itemIds: itemIds,
      days: Number(data.days),
      borrowDate: data.borrowDate,
    };
    console.log(confirmAnddBorrowPayload);
    mutate(confirmAnddBorrowPayload, {
      onSuccess: () => {
        navigate('/checkout/success');
      },
      onError: (error) => {
        if (axios.isAxiosError<ErrorResponse>(error)) {
          toast.error(error.response?.data.message);
        }
      },
    });
  };

  return (
    <div className='p-4 lg:p-5 rounded-3xl shadow-soft flex flex-col gap-4 lg:gap-6 w-full lg:max-w-119.5'>
      <h2 className='font-bold text-xl lg:text-display-sm'>
        Complete Your Borrow Request
      </h2>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-4'
        >
          <DatePicker />
          <BorrowDuration />
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Loading...' : 'Confirm & Borrow'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default BorrowRequest;
