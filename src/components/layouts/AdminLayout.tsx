import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
