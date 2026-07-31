import Container from '@/components/layouts/Container';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'react-router-dom';
import UsersList from './components/UserList';

type AdminDashboardTabSlugs = 'borrowed-list' | 'user' | 'book-list';

interface AdminDashboardTab {
  id: number;
  label: string;
  slug: AdminDashboardTabSlugs;
}

const AdminDashboard = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const query = searchParam.get('tab');
  const activeTab = query ? query : 'user';

  const handleTabClick = (tab: AdminDashboardTabSlugs) => {
    const params = new URLSearchParams();
    params.set('tab', tab);
    setSearchParam(params);
  };

  const adminDashboardTabs: AdminDashboardTab[] = [
    {
      id: 1,
      label: 'Borrowed List',
      slug: 'borrowed-list',
    },
    {
      id: 2,
      label: 'User',
      slug: 'user',
    },
    {
      id: 3,
      label: 'Book List',
      slug: 'book-list',
    },
  ];
  return (
    <Container>
      <section
        id='admin-dashboard'
        className='relative flex flex-col gap-5 lg:gap-10'
      >
        <div className='lg:max-w-139.25 flex justify-between items-center bg-neutral p-2 rounded-2xl gap-2 bg-neutral-100'>
          {adminDashboardTabs.map((tab) => {
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
        <UsersList />
      </section>
    </Container>
  );
};

export default AdminDashboard;
