import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

const UserRoute = () => {
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.user?.role);

  if (token && role === 'ADMIN') {
    return <Navigate to='/admin' replace />;
  }
  return <Outlet />;
};

export default UserRoute;
