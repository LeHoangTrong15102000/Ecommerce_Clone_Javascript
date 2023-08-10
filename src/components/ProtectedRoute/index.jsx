import React from 'react';
import { useSelector } from 'react-redux';

const RoleBaseRoute = (props) => {
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const user = useSelector((state) => state.account.user);
  const userRole = user.role;

  // dòng 2 thứ Có nghĩa là người dùng đã đăng nhập rồi
  if (
    (isAdminRoute && userRole === 'ADMIN') ||
    (!isAdminRoute && (userRole === 'USER' || userRole === 'ADMIN'))
  ) {
    return <>{props.children}</>;
  } else {
    return <NotPermitted />;
  }
};

const ProtectedRoute = (props) => {
  const { isAuthenticated } = useSelector((state) => state.account);
  return (
    <>
      {isAuthenticated === true ? (
        <>
          <RoleBaseRoute>{props.children}</RoleBaseRoute>
        </>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default ProtectedRoute;
