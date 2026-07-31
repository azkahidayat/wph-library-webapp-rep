import { FaShoppingBag } from 'react-icons/fa';
import Logo from '../shared/Logo';
import SearchField from '../shared/SearchField';
import Avatar from '../shared/Avatar';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import MobileSearchField from '../shared/MobileSearchField';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSearchOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className='relative flex justify-between items-center gap-4 h-20'>
      <Logo />
      {token && <SearchField className='hidden md:block' />}

      {token && user && !isSearchOpen && (
        <div className='absolute md:static top-1/2 md:top-auto md:translate-y-0 md:right-auto -translate-y-1/2 right-0 flex gap-4 lg:gap-6 items-center'>
          <SearchIcon
            className={cn('cursor-pointer md:hidden')}
            onClick={() => setIsSearchOpen(true)}
          />

          <FaShoppingBag className='size-6' />
          <Avatar user={user} />
        </div>
      )}
      {!token && (
        <div className='flex justify-between max-w-85.5 w-full'>
          <Link to='/auth/login' className='w-full max-w-40.75'>
            <Button variant='outline' className='w-full'>
              Login
            </Button>
          </Link>
          <Link to='/auth/register' className='w-full max-w-40.75'>
            <Button className='w-full'>Register</Button>
          </Link>
        </div>
      )}

      <MobileSearchField
        isOpen={isSearchOpen}
        onClick={() => setIsSearchOpen(false)}
      />
    </header>
  );
};

export default Navbar;
