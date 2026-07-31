import type { User } from '@/features/auth/types';
import ProfileDropdownMenu from './ProfileDropdownMenu';

interface AvatarProps {
  user: User;
  isLoading: boolean;
}
const Avatar = ({ user, isLoading }: AvatarProps) => {
  return (
    <div className='flex lg:gap-4'>
      <ProfileDropdownMenu user={user} isLoading={isLoading} />
    </div>
  );
};

export default Avatar;
