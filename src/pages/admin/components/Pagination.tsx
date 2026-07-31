import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getPaginationItems } from '@/utils/getPaginationItems';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  totalEntries: number;
  page: number;
  limit: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  limit,
  page,
  totalEntries,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalPages);
  const paginationItems = getPaginationItems(page, totalPages);
  return (
    <div className='flex justify-between items-center'>
      <p className='font-medium text-md'>
        Showing {start} to {end} of {totalEntries} entries
      </p>
      <div className='flex justify-between gap-4'>
        <Button
          variant='ghost'
          className='font-medium text-md flex items-center gap-[6px]'
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <FaChevronLeft />
          Prev
        </Button>
        <div className='flex gap-1 items-center'>
          {paginationItems.map((item, index) => {
            if (item === '...') {
              return (
                <span key={index} className='px-2'>
                  ...
                </span>
              );
            }

            const activePage = item === page;

            return (
              <Button
                variant='ghost'
                key={index}
                className={cn(
                  'rounded-lg size-10',
                  activePage && 'border-border'
                )}
                onClick={() => onPageChange(item)}
              >
                {item}
              </Button>
            );
          })}
        </div>
        <Button
          variant='ghost'
          className='font-medium text-md flex items-center gap-[6px]'
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next <FaChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
