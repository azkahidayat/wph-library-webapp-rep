import { Button } from '../ui/button';

interface LoadMoreButtonProps {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onClick: () => void;
}

const LoadMoreButton = ({
  hasNextPage,
  isFetchingNextPage,
  onClick,
}: LoadMoreButtonProps) => {
  return (
    <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-50'>
      <Button
        variant='outline'
        className='w-full font-bold'
        disabled={isFetchingNextPage || !hasNextPage}
        onClick={onClick}
      >
        {isFetchingNextPage ? 'Loading...' : 'Load more'}
      </Button>
    </div>
  );
};

export default LoadMoreButton;
