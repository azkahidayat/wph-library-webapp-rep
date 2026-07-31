import Container from '@/components/layouts/Container';
import { useSearchParams } from 'react-router-dom';
import ProfileInfo from './sections/profile/ProfileInfo';
import BorrowedList from './sections/profile/BorrowedList';
import ReviewList from './sections/profile/ReviewList';
import { cn } from '@/lib/utils';
import type { TabSlug } from '@/components/shared/ProfileDropdownMenu';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

interface Tab {
  id: number;
  label: string;
  slug: TabSlug;
}

const UserProfilePage = () => {
  const role = useAuthStore((state) => state.user?.role);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab');

  const handleTabClick = (tab: TabSlug) => {
    const params = new URLSearchParams();

    params.set('tab', tab);
    setSearchParams(params);
  };

  const tabs: Tab[] = [
    {
      id: 1,
      label: 'Profile',
      slug: 'profile',
    },
    {
      id: 2,
      label: 'Borrowed List',
      slug: 'borrowed-list',
    },
    {
      id: 3,
      label: 'Reviews',
      slug: 'reviews',
    },
  ];
  return (
    <Container>
      <div className='flex flex-col gap-3.75 lg:gap-6'>
        <div className='max-w-250 w-full m-auto'>
          {role !== 'ADMIN' && (
            <div className='lg:max-w-139.25 flex justify-between items-center bg-neutral p-2 rounded-2xl gap-2 bg-neutral-100'>
              {tabs.map((tab) => {
                const isActive = activeTab === tab.slug;
                return (
                  <p
                    key={tab.id}
                    className={cn(
                      'text-neutral flex justify-center items-center font-medium text-sm lg:text-md w-full rounded-xl h-10 cursor-pointer',
                      isActive && 'shadow-soft bg-white'
                    )}
                    onClick={() => handleTabClick(tab.slug)}
                  >
                    {tab.label}
                  </p>
                );
              })}
            </div>
          )}
        </div>
        {activeTab === 'profile' && <ProfileInfo />}
        {activeTab === 'borrowed-list' && <BorrowedList />}
        {activeTab === 'reviews' && <ReviewList />}
      </div>
    </Container>
  );
};

export default UserProfilePage;
