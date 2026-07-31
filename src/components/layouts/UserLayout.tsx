import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router';

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
