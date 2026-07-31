import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router';

const UserLayout = () => {
  return (
    <div className='px-4 lg:px-30 max-w-360 m-auto'>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
