import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const useRouteElements = () => {
  const routeElements = useRoutes([]);
  return routeElements;
};

export default useRouteElements;
