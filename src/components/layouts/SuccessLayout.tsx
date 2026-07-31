import { Outlet } from 'react-router-dom';
import { ScrollToTop } from '../shared/ScrollToTop';
import Navbar from './Navbar';

const SuccessLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className='px-4 lg:px-30 max-w-360 m-auto'>
        <Outlet />
      </main>
    </>
  );
};

export default SuccessLayout;
