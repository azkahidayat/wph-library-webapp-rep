import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const { token, user } = useAuthStore();

  if (!token) {
    return <Navigate to='/auth/login' replace />;
  }

  if (user?.role !== 'ADMIN') {
    return <Navigate to='/' replace />;
  }
  return <Outlet />;
};

export default AdminRoute;
