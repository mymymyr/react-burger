import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks/hooks';
import { type FC, type ReactElement } from 'react';

type TProtectedRouteProps = {
  element: ReactElement
}

const ProtectedRoute: FC<TProtectedRouteProps> = ({ element }) => {
  const userIsAuth = useSelector(store => store.user.isAuthenticated);
  const location = useLocation();
  return userIsAuth ? element : <Navigate to={`/login?redirect=${location.pathname}`} replace />;
};

export default ProtectedRoute;
