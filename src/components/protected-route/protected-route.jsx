import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ element }) {
    const userIsAuth = useSelector(store => store.user.isAuthenticated);
    const location = useLocation();
    return userIsAuth ? element : <Navigate to={`/login?redirect=${location.pathname}`} replace />;
}

export default ProtectedRoute;
