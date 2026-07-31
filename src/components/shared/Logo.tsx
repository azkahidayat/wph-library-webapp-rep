import logo from '@/assets/images/logo.svg';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div
      onClick={handleClick}
      className={cn(
        'flex w-fit lg:w-auto items-center cursor-pointer gap-3.75',
        className
      )}
    >
      <div className='size-8.25 shrink-0'>
        <img src={logo} alt='Logo' />
      </div>
      <span className='hidden md:block font-bold text-[25.14px] leading-8.25'>
        Booky
      </span>
    </div>
  );
};

export default Logo;
