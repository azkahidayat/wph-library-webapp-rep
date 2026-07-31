import { Skeleton } from '@/components/ui/skeleton';
import { useGetProfile } from '@/features/profile/hooks/useProfile';
import { CiImageOff } from 'react-icons/ci';
import UpdateProfileDialog from './components/UpdateProfileDialog';

const ProfileInfo = () => {
  const { data, isLoading, error } = useGetProfile();

  if (error) return <p>{error.message}</p>;
  const profileData = data?.data.profile;

  const user = {
    userData: [
      {
        label: 'Name',
        value: profileData?.name ?? 'N/A',
      },
      {
        label: 'Email',
        value: profileData?.email ?? 'N/A',
      },
      {
        label: 'Nomor Handphone',
        value: profileData?.phone ?? 'N/A',
      },
    ],
    avatar: profileData?.profilePhoto,
  };

  if (isLoading)
    return (
      <section
        id='profile'
        className='flex flex-col gap-3.75 lg:gap-6 max-w-250 w-full m-auto'
      >
        <h2 className='font-bold text-display-xs lg:text-display-sm'>
          Profile
        </h2>

        <Skeleton className='h-80 rounded-2xl w-full max-w-139.25' />
      </section>
    );

  return (
    <section
      id='profile'
      className='flex flex-col gap-3.75 lg:gap-6 max-w-250 w-full m-auto'
    >
      <h2 className='font-bold text-display-xs lg:text-display-sm'>Profile</h2>
      <div className='shadow-soft rounded-2xl p-4 lg:p-5 w-full max-w-139.25 flex flex-col gap-4 lg:gap-6'>
        <div className='flex flex-col gap-2 lg:gap-3'>
          {user.avatar ? (
            <div className='size-16 aspect-square shrink-0 rounded-full overflow-hidden'>
              <img
                src={user.avatar}
                alt='user avatar'
                className='size-full object-cover object-center'
              />
            </div>
          ) : (
            <div className='size-16 aspect-square shrink-0 rounded-full flex justify-center items-center border'>
              <CiImageOff className='size-8 text-neutral-400' />
            </div>
          )}
          {user.userData.map((item) => (
            <div key={item.label} className='flex items-center justify-between'>
              <p className='font-medium text-sm lg:text-md'>{item.label}</p>
              <p className='font-bold text-sm lg:text-md'>{item.value}</p>
            </div>
          ))}
        </div>
        {profileData && (
          <UpdateProfileDialog
            name={profileData?.name}
            phone={profileData?.phone}
          />
        )}
      </div>
    </section>
  );
};

export default ProfileInfo;
