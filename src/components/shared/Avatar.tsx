import type { User } from '@/features/auth/types';
import ProfileDropdownMenu from './ProfileDropdownMenu';

interface AvatarProps {
  user: User;
}
const Avatar = ({ user }: AvatarProps) => {
  return (
    <div className='flex lg:gap-4'>
      <ProfileDropdownMenu user={user} />
    </div>
  );
};

export default Avatar;
