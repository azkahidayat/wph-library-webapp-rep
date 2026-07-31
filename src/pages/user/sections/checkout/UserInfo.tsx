import { Skeleton } from '@/components/ui/skeleton';

interface UserInfoProps {
  name?: string;
  email?: string;
  nomorHandphone?: string;
  isLoading: boolean;
}

interface UserData {
  id: number;
  label: string;
  value: string;
}
const UserInfo = ({
  name,
  email,
  nomorHandphone,
  isLoading,
}: UserInfoProps) => {
  const userData: UserData[] = [
    {
      id: 1,
      label: 'Name',
      value: name ?? 'N/A',
    },
    {
      id: 2,
      label: 'Email',
      value: email ?? 'N/A',
    },
    {
      id: 3,
      label: 'Nomor Handphone',
      value: nomorHandphone ?? 'N/A',
    },
  ];
  if (isLoading)
    return (
      <div className='flex flex-col gap-3 md:gap-4'>
        <h2 className='text-lg md:text-display-xs font-bold'>
          User Information
        </h2>

        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className='h-8 w-full' />
        ))}
      </div>
    );
  return (
    <div className='flex flex-col gap-2 md:gap-4'>
      <h2 className='text-lg md:text-display-xs font-bold'>User Information</h2>
      {userData.map((item) => (
        <div key={item.id} className='flex justify-between items-center'>
          <p className='font-medium text-sm md:text-md'>{item.label}</p>
          <p className='font-bold text-sm md:text-md'>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default UserInfo;
