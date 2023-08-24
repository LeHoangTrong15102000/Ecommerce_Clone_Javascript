import React, { useState, useEffect, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Book from './pages/Admin/Book/Book';
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
import AdminPage from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import LayoutAdmin from './components/Admin/LayoutAdmin';
import './styles/reset.scss';
import './styles/global.scss';
import UserTable from './components/Admin/User/UserTable';
import BookPage from './pages/Book/Book';
import ContactPage from './pages/contact';
import OrderPage from './pages/Order';
import OrderHistory from './pages/OrderHistory';
import Order from './pages/Admin/Order';

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="layout-app">
      {/* truyền props theo cha con */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* Truyền context theo cha con */}
      <Outlet context={[searchTerm, setSearchTerm]} />
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

    // console.log('.>>>> Check account', res);

    //  Mỗi là chúng ta F5 lại trang, bản chất của vấn đề ở đây là chúng ta gọi lại api và chúng ta lấy thông tin user
    if (res && res?.data) dispatch(doGetAccountAction(res.data)); // Sau khi đã lấy được thông tin user rồi thì chúng ta nạp ngược lại redux
  };

  //  Viết trong useEffect bởi vì bây giờ là lúc dom nó đã được render
  useEffect(() => {
    getAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: '/',
          index: true,
          element: (
            <Suspense fallback={<div className="text-center">Loading...</div>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: '/contact',
          element: (
            <Suspense>
              <ContactPage />
            </Suspense>
          ),
        },
        {
          path: '/book/:slug',
          element: (
            <Suspense>
              <BookPage fallback={<div className="text-center">Loading...</div>} />
            </Suspense>
          ),
        },
        {
          path: '/order',
          element: (
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/history',
          element: (
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          ),
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
        {
          path: 'order',
          element: <Order />,
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
