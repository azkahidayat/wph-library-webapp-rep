import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <main className='px-4 lg:px-30 max-w-360 m-auto'>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
