import AdminLayout from '@/components/layouts/AdminLayout';
import AuthLayout from '@/components/layouts/AuthLayout';
import UserLayout from '@/components/layouts/UserLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import UserBookByAuthorPage from '@/pages/user/UserBookByAuthorPage';
import UserCartPage from '@/pages/user/UserCartPage';
import UserCategoryPage from '@/pages/user/UserCategoryPage';
import UserCheckoutPage from '@/pages/user/UserCheckoutPage';
import UserDetailBookPage from '@/pages/user/UserDetailBookPage';
import UserHomePage from '@/pages/user/UserHomePage';
import UserProfilePage from '@/pages/user/UserProfilePage';
import UserSuccessPage from '@/pages/user/UserSuccessPage';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <LoginPage />,
      },
      {
        path: '/auth/register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <UserHomePage />,
      },
      {
        path: '/books/:id',
        element: <UserDetailBookPage />,
      },
      {
        path: '/books',
        element: <UserCategoryPage />,
      },
      {
        path: '/books/author/:author',
        element: <UserBookByAuthorPage />,
      },
      {
        path: '/cart',
        element: <UserCartPage />,
      },
      {
        path: '/checkout',
        element: <UserCheckoutPage />,
      },
      {
        path: '/checkout/success',
        element: <UserSuccessPage />,
      },
      {
        path: '/profile',
        element: <UserProfilePage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
    ],
  },
]);
