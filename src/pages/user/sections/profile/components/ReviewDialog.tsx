import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAddMyReview } from '@/features/profile/hooks/useMyReview';
import {
  reviewSchema,
  type ReviewSchema,
} from '@/features/profile/schema/reviewSchema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { TiStarFullOutline } from 'react-icons/ti';
import { toast } from 'sonner';

interface ReviewDialogProps {
  bookId: number;
}

const ReviewDialog = ({ bookId }: ReviewDialogProps) => {
  const { mutate, isPending } = useAddMyReview();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, control, setValue, reset } =
    useForm<ReviewSchema>({
      defaultValues: {
        star: 0,
        comment: '',
      },
      resolver: zodResolver(reviewSchema),
    });

  const star = useWatch({
    control,
    name: 'star',
  });

  const onSubmit = (data: ReviewSchema) => {
    const reviewPayload = {
      ...data,
      bookId,
    };

    if (data.star === 0) {
      toast.error('Please rate');
      return;
    }
    mutate(reviewPayload, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='w-full sm:max-w-45.5'>Give Review</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-100'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <div className='flex justify-between'>
            <h3 className='font-bold text-lg lg:text-display-xs'>
              Give Review
            </h3>
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='p-2 border-0'
              onClick={() => setOpen(false)}
            >
              <IoMdClose />
            </Button>
          </div>

          <div className='flex flex-col gap-6'>
            <div className='flex flex-col items-center'>
              <p className='font-bold text-sm lg:text-md'>Give Rating</p>
              <div className='flex gap-1'>
                {Array.from({ length: 5 }).map((_, index) => {
                  return (
                    <TiStarFullOutline
                      key={index}
                      className={cn(
                        'size-8.75',
                        index < star
                          ? 'fill-[#FFAB0D] text-[#FFAB0D]'
                          : 'fill-neutral-400 text-neutral-400'
                      )}
                      onClick={() => setValue('star', index + 1)}
                    />
                  );
                })}
              </div>
            </div>
            <textarea
              id='comment'
              {...register('comment')}
              placeholder='Please share your thoughts about this book'
              className='border rounded-xl py-2 px-3'
              rows={5}
            />
          </div>

          <Button type='submit' disabled={isPending}>
            {isPending ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
