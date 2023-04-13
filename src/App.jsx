import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './redux/counter/counterSlice';
import styles from './styles/Counter.module.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Contact from './pages/Contact';
import Book from './pages/Book';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

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
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <div>404 not found</div>,
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
      <RouterProvider router={router} />
    </>
  );
}
