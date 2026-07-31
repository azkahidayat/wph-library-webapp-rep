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
import { Link, useNavigate } from 'react-router-dom';
import { useGetMyCart } from '@/features/cart/hooks/useCart';

const Navbar = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { data: cartResponse } = useGetMyCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      setIsSearchOpen(false);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCartClick = () => {
    navigate('/cart');
  };

  const totalBooksInMyCart = cartResponse?.data.itemCount ?? 0;

  return (
    <header
      className={cn(
        'sticky top-0 flex justify-between items-center gap-4 h-20 shadow-soft z-20 px-4 lg:px-30 m-auto',
        isScrolled && 'backdrop-blur-lg'
      )}
    >
      <Logo />
      {token && <SearchField className='hidden md:block' />}

      {token && user && !isSearchOpen && (
        <div className='absolute md:static top-1/2 md:top-auto md:translate-y-0 md:right-auto -translate-y-1/2 right-4 flex gap-4 lg:gap-6 items-center'>
          <SearchIcon
            className={cn('cursor-pointer md:hidden')}
            onClick={() => setIsSearchOpen(true)}
          />

          <div className='relative cursor-pointer' onClick={handleCartClick}>
            <FaShoppingBag className='size-6 cus' />
            {totalBooksInMyCart > 0 && (
              <div className='flex justify-center items-center rounded-full size-5 absolute -top-1.5 right-[-6px] bg-[#EE1D52]'>
                <p className='font-bold text-[12px] text-white'>
                  {totalBooksInMyCart}
                </p>
              </div>
            )}
          </div>
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

      {token && (
        <MobileSearchField
          isOpen={isSearchOpen}
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
