import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound404 from '../../pages/not-found.jsx';
import LoginPage from '../../pages/login.jsx';
import RegisterPage from '../../pages/register.jsx';
import ForgotPasswordPage from '../../pages/forgot-password.jsx';
import ResetPasswordPage from '../../pages/reset-password.jsx';
import ProfilePage from '../../pages/profile.jsx';
import ProtectedRoute from '../protected-route/protected-route';
import { ProvideAuth } from '../provide-auth/provide-auth';
import HomePage from '../../pages/home';
import IngredientPage from '../../pages/ingredient';
import FeedPage from '../../pages/feed';
import OrderPage from '../../pages/order';
import ProfileOrderPage from '../../pages/profile-order';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { wsSendMessage, wsSendMessageWithToken, wsStartHeartbeat, wsStartHeartbeatWithToken } from '../../redux/actions/wsActions';

function App() {
  const dispatch = useDispatch();
  const { wsConnected, wsConnectedWithToken, startHeartbeat, startHeartbeatWithToken } = useSelector(
    (store) => store.orders
  );
  
  const pingWebsockets = useCallback((action) => {
    dispatch(action);
    setTimeout(pingWebsockets, 5000, action);
  }, [dispatch]);

  useEffect(()=> {
    if (!startHeartbeat && wsConnected) {
      dispatch(wsStartHeartbeat());
      setTimeout(pingWebsockets, 5000, wsSendMessage({message: "ping"}));
    }
    if (!startHeartbeatWithToken && wsConnectedWithToken) {
      dispatch(wsStartHeartbeatWithToken());
      setTimeout(pingWebsockets, 5000, wsSendMessageWithToken({message: "ping"}));
    }
    
  }, [dispatch, pingWebsockets, startHeartbeat, startHeartbeatWithToken, wsConnectedWithToken, wsConnected]);

  return (
    <div className={appStyles.page}>
      <ProvideAuth>
        <Router basename={'/react-burger'}>
          <AppHeader />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
            <Route path="/profile/orders" element={<ProtectedRoute element={<ProfileOrderPage />} />} />
            <Route path="/profile/orders/:id" element={<ProtectedRoute element={<OrderPage />} />} />
            <Route path="/feed/:id" element={<OrderPage />} />
            <Route path="/ingredients/:id" element={<IngredientPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;
