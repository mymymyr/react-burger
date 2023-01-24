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

function App() {
  return (
    <div className={appStyles.page}>
      <ProvideAuth>
        <Router>
          <AppHeader />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
            <Route path="/ingredients/:id" element={<IngredientPage />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;
