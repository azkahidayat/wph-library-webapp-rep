import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUpdateProfile } from '@/features/profile/hooks/useProfile';
import {
  profileSchema,
  type ProfileSchema,
} from '@/features/profile/schema/profileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const UpdateProfileDialog = ({ name, phone }: ProfileSchema) => {
  const { register, handleSubmit, reset, control } = useForm<ProfileSchema>({
    defaultValues: {
      name,
      phone,
      profilePhoto: undefined,
    },
    resolver: zodResolver(profileSchema),
  });
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useUpdateProfile();

  useEffect(() => {
    reset({
      name,
      phone,
      profilePhoto: undefined,
    });
  }, [name, phone, reset]);

  const onSubmit = (data: ProfileSchema) => {
    mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Update Profile</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-100'>
        <form
          onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log(errors);
          })}
        >
          <DialogHeader>
            <DialogTitle className='text-xl'>Edit profile</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>
              <label htmlFor='name' className='font-semibold'>
                Name
              </label>
              <input
                type='text'
                id='name'
                {...register('name')}
                className='rounded-2xl border py-2 px-4 focus:outline-0'
              />
            </div>
            <div className='flex flex-col gap-4'>
              <label htmlFor='phone' className='font-semibold'>
                Phone Number
              </label>
              <input
                type='text'
                id='phone'
                {...register('phone')}
                className='rounded-2xl border py-2 px-4 focus:outline-0'
              />
            </div>
            <div className='flex flex-col gap-4'>
              <label htmlFor='profilePhoto' className='font-semibold'>
                Profile Photo
              </label>
              <Controller
                name='profilePhoto'
                control={control}
                render={({ field: { onChange, ref } }) => (
                  <input
                    ref={ref}
                    type='file'
                    id='profilePhoto'
                    accept='.jpg,.jpeg,.png'
                    onChange={(e) => onChange(e.target.files?.[0] ?? null)}
                    className='rounded-2xl border py-2 px-4 focus:outline-0'
                  />
                )}
              />
            </div>
          </div>
          <DialogFooter className='justify-between'>
            <DialogClose asChild>
              <Button variant='outline' className='w-[48%]'>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' disabled={isPending} className='w-[48%]'>
              {isPending ? 'Updating...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
