import AppHeader from '../app-header/app-header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound404 from '../../pages/not-found';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import ProtectedRoute from '../protected-route/protected-route';
import { ProvideAuth } from '../provide-auth/provide-auth';
import HomePage from '../../pages/home';
import IngredientPage from '../../pages/ingredient';
import FeedPage from '../../pages/feed';
import OrderPage from '../../pages/order';
import ProfileOrderPage from '../../pages/profile-order';
import { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { wsSendMessage, wsSendMessageWithToken, wsStartHeartbeat, wsStartHeartbeatWithToken, wsStopHeartbeat, wsStopHeartbeatWithToken, type TWsSendMessageWithToken, type TWsSendMessage } from '../../services/actions/ws';
import appStyles from './app.module.css';

function App () {
  const dispatch = useDispatch();
  const { wsConnected, wsConnectedWithToken, startHeartbeat, startHeartbeatWithToken } = useSelector(
    (store) => store.orders
  );
  const actionTimeout = useRef<ReturnType<typeof setInterval> | null>(null);
  const actionTimeoutWithToken = useRef<ReturnType<typeof setInterval> | null>(null);
  const pingWebsockets = useCallback((action: TWsSendMessage | TWsSendMessageWithToken) => {
    dispatch(action);
  }, [dispatch]);

  useEffect(() => {
    if (!startHeartbeat && wsConnected) {
      dispatch(wsStartHeartbeat());
      actionTimeout.current = setInterval(pingWebsockets, 5000, wsSendMessage({ message: 'ping' }));
    } else if (startHeartbeat && !wsConnected) {
      dispatch(wsStopHeartbeat());
      clearInterval(actionTimeout.current as NodeJS.Timeout);
    }
    if (!startHeartbeatWithToken && wsConnectedWithToken) {
      dispatch(wsStartHeartbeatWithToken());
      actionTimeoutWithToken.current = setInterval(pingWebsockets, 5000, wsSendMessageWithToken({ message: 'ping' }));
    } else if (startHeartbeatWithToken && !wsConnectedWithToken) {
      dispatch(wsStopHeartbeatWithToken());
      clearInterval(actionTimeoutWithToken.current as NodeJS.Timeout);
    }
  }, [dispatch, pingWebsockets, startHeartbeat, startHeartbeatWithToken, wsConnectedWithToken, wsConnected]);

  return (
    <div className={appStyles.page}>
      <Router basename={'/react-burger'}>
        <ProvideAuth>
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
            <Route path="/ingredients/:id" element={<IngredientPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/feed/:id" element={<OrderPage />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </ProvideAuth>
      </Router>
    </div>
  );
}

export default App;
