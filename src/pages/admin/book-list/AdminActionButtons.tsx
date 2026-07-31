import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoIosMore } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';

interface AdminActionButtonsProps {
  bookId: number;
}

export type Actions = 'preview' | 'edit' | 'add' | 'delete';

const AdminActionButtons = ({ bookId }: AdminActionButtonsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleActionClick = (action: Actions, bookId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('action', action);
    params.set('bookId', String(bookId));
    params.delete('status');
    setSearchParams(params);
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
        <Button variant='outline' className='flex-1 text-[#EE1D52]'>
          Delete
        </Button>
      </div>
      <DropdownMenu>
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
          <DropdownMenuItem className='text-[#EE1D52]'>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AdminActionButtons;
