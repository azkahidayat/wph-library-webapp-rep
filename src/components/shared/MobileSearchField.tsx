import { cn } from '@/lib/utils';
import SearchField from './SearchField';
import { IoMdClose } from 'react-icons/io';

interface MobileSearchFieldProps {
  isOpen: boolean;
  onClick: () => void;
}

const MobileSearchField = ({ isOpen, onClick }: MobileSearchFieldProps) => {
  return (
    <div
      className={cn(
        'md:hidden relative z-10 flex justify-between transition-opacity duration-300 items-center  w-full  gap-4',
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none '
      )}
    >
      <SearchField />
      <IoMdClose className='size-5 cursor-pointer' onClick={onClick} />
    </div>
  );
};

export default MobileSearchField;
