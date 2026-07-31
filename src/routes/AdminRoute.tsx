import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  console.log(useAuthStore.getState().user?.role);
  const { token, user } = useAuthStore();
  console.log({
    token,
    role: user?.role,
  });

  if (!token) {
    return <Navigate to='/auth/login' replace />;
  }

  if (user?.role !== 'ADMIN') {
    return <Navigate to='/' replace />;
  }
  return <Outlet />;
};

export default AdminRoute;
