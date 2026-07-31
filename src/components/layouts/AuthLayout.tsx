import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='flex justify-center items-center min-h-screen px-4 py-4'>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
