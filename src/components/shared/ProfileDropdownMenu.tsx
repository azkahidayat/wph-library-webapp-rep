import type { User } from '@/features/auth/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CiImageOff } from 'react-icons/ci';
import { FaChevronDown } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '../ui/skeleton';
import { useQueryClient } from '@tanstack/react-query';

interface ProfileDropdownMenuProps {
  user: User;
  isLoading: boolean;
}

export type TabSlug = 'profile' | 'borrowed-list' | 'reviews';

const ProfileDropdownMenu = ({ user, isLoading }: ProfileDropdownMenuProps) => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();
  const role = useAuthStore((state) => state.user?.role);

  const handleTabClick = (tab: TabSlug) => {
    const params = new URLSearchParams();
    params.set('tab', tab);
    navigate(`/profile?${params.toString()}`);
  };

  const handleLogoutClick = () => {
    navigate('/auth/login');
    toast.success('Logged out successfully');
    setTimeout(() => {
      logout();
      queryClient.clear();
    }, 300);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type='button'
          className='group flex gap-4 cursor-pointer items-center focus:outline-0'
        >
          {isLoading ? (
            <Skeleton className='size-10 lg:size-12 aspect-square shrink-0 rounded-full' />
          ) : user.profilePhoto ? (
            <div className='size-10 lg:size-12 aspect-square shrink-0 rounded-full overflow-hidden'>
              <img
                src={user.profilePhoto}
                alt={`${user.name} avatar`}
                className='size-full object-cover object-center'
              />
            </div>
          ) : (
            <div className='border rounded-full aspect-square shrink-0 size-10 lg:size-12 flex justify-center items-center'>
              <CiImageOff className='size-6 text-neutral-400' />
            </div>
          )}

          <span className='hidden md:block border-0 p-0 font-semibold text-lg'>
            {user.name}
          </span>
          <FaChevronDown
            className={cn(
              'hidden md:block transition-transform duration-300 cursor-pointer group-data-[state=open]:rotate-180'
            )}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleTabClick('profile')}>
            Profile
          </DropdownMenuItem>
          {role !== 'ADMIN' && (
            <>
              <DropdownMenuItem onClick={() => handleTabClick('borrowed-list')}>
                Borrowed List
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTabClick('reviews')}>
                Reviews
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem
            className='text-[#EE1D52]'
            onClick={handleLogoutClick}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdownMenu;
