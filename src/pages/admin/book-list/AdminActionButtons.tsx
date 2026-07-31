import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoIosMore } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useDeleteBookForAdmin } from '@/features/admin/hooks/useBookForAdmin';
import { useState } from 'react';

interface AdminActionButtonsProps {
  bookId: number;
}

export type Actions = 'preview' | 'edit' | 'add' | 'delete';

const AdminActionButtons = ({ bookId }: AdminActionButtonsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDeleteMobileDialog, setOpenDeleteMobileDialog] = useState(false);
  const [openMobileDropDown, setOpenMobileDropDown] = useState(false);
  const { mutate, isPending } = useDeleteBookForAdmin();

  const handleActionClick = (action: Actions, bookId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('action', action);
    params.set('bookId', String(bookId));
    params.delete('status');
    setSearchParams(params);
  };

  const handleDeleteBookClick = (bookId: number) => {
    mutate(bookId);
  };

  return (
    <>
      <div className='hidden md:flex justify-between items-center gap-3.25 w-full max-w-77.75'>
        <Button
          variant='outline'
          className='flex-1'
          onClick={() => handleActionClick('preview', bookId)}
        >
          Preview
        </Button>
        <Button
          variant='outline'
          className='flex-1'
          onClick={() => handleActionClick('edit', bookId)}
        >
          Edit
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='outline' className='flex-1 text-[#EE1D52]'>
              Delete
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className='data-[size=default]:sm:max-w-113'>
            <AlertDialogHeader>
              <AlertDialogTitle className='font-bold text-lg'>
                Delete Data
              </AlertDialogTitle>
              <AlertDialogDescription className='font-semibold text-md'>
                Once deleted, you won’t be able to recover this data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <div className='flex w-full gap-4 '>
                <AlertDialogCancel className='px-4 flex-1'>
                  No
                </AlertDialogCancel>
                <AlertDialogAction
                  className='px-4 flex-1 bg-red'
                  onClick={() => handleDeleteBookClick(bookId)}
                  disabled={isPending}
                >
                  {isPending ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <DropdownMenu
        open={openMobileDropDown}
        onOpenChange={setOpenMobileDropDown}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            className='md:hidden border-0 size-6 rounded-2xl'
          >
            <IoIosMore className='size-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => handleActionClick('preview', bookId)}
          >
            Preview
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleActionClick('edit', bookId)}>
            Edit
          </DropdownMenuItem>
          <AlertDialog
            open={openDeleteMobileDialog}
            onOpenChange={setOpenDeleteMobileDialog}
          >
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className='text-[#EE1D52]'
                onSelect={(e) => {
                  e.preventDefault();
                  setOpenDeleteMobileDialog(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>

            <AlertDialogContent className='data-[size=default]:sm:max-w-113'>
              <AlertDialogHeader>
                <AlertDialogTitle className='font-bold text-lg'>
                  Delete Data
                </AlertDialogTitle>
                <AlertDialogDescription className='font-semibold text-md'>
                  Once deleted, you won’t be able to recover this data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <div className='flex w-full gap-4 '>
                  <AlertDialogCancel
                    className='px-4 flex-1'
                    onClick={() => setOpenMobileDropDown(false)}
                  >
                    No
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className='px-4 flex-1 bg-red'
                    onClick={() => {
                      handleDeleteBookClick(bookId);
                      setOpenMobileDropDown(false);
                    }}
                    disabled={isPending}
                  >
                    {isPending ? 'Deleting...' : 'Delete'}
                  </AlertDialogAction>
                </div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AdminActionButtons;
