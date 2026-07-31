import { ScrollToTop } from '../shared/ScrollToTop';
import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router';

const UserLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className='px-4 lg:px-30 max-w-360 m-auto'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
