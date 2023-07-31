import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Book from './pages/book';
import Contact from './pages/contact';
import Login from './pages/Login/Login';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Register from './pages/Register/Register';
import { callFetchAccount } from './services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccountAction } from './redux/account/accountSlice';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import AdminPage from './pages/admin';
import ProtectedRoute from './components/ProtectedRoute';
import LayoutAdmin from './components/Admin/LayoutAdmin';
import './styles/reset.scss';
import UserTable from './components/Admin/User/UserTable';

const Layout = () => {
  return (
    <div className="layout-app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.account);

  const getAccount = async () => {
    // Nếu đang url login hay register thì trả về undefined
    // Ban đầu kih chưa đăng nhập hoặc là chưa đăng kí thì không gọi getAccount()
    if (window.location.pathname === '/login' || window.location.pathname === '/register')
      return;

    const res = await callFetchAccount();

    //  Mỗi là chúng ta F5 lại trang, bản chất của vấn đề ở đây là chúng ta gọi lại api và chúng ta lấy thông tin user
    if (res && res?.data) dispatch(doGetAccountAction(res.data)); // Sau khi đã lấy được thông tin user rồi thì chúng ta nạp ngược lại redux
  };

  //  Viết trong useEffect bởi vì bây giờ là lúc dom nó đã được render
  useEffect(() => {
    getAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'contact',
          element: <Contact />,
        },
        {
          path: 'book',
          elementt: <Book />,
        },
      ],
    },

    // Sẽ viết cái layout riêng cho phần admin
    {
      path: '/admin',
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
        },
        // Khi đã vào được AdminPage rồi thì không cần phải chèn `ProtectedRoute` vào những thz bên trong nữa
        {
          path: 'user',
          element: <UserTable />,
        },
        {
          path: 'book',
          element: <Book />,
        },
      ],
    },

    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ]);
  return (
    <>
      {isLoading === false ||
      window.location.pathname === '/login' ||
      window.location.pathname === '/register' ||
      window.location.pathname === '/' ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  );
}
