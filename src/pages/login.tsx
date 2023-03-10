import loginPageStyles from './login.module.css';
import { useState, useEffect, type SyntheticEvent } from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../services/actions/login';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../hooks/hooks';
import { forgotPasswordRequestAction } from '../services/actions/send-code';

function LoginPage () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userIsAuth = useSelector(store => store.user.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const loginMessage = useSelector(store => store.login.message);
  const clickButton = (evt: SyntheticEvent<Element>) => {
    evt.preventDefault();
    dispatch(login(email, password));
  };

  const toForgotPassword = () => {
    dispatch(forgotPasswordRequestAction());
  };

  useEffect(() => {
    if (userIsAuth) {
      const redirectPath = location.search.split('redirect=')[1];
      navigate(!redirectPath ? '/profile' : redirectPath);
    }
  }, [userIsAuth, navigate, location.search]);

  return (
    <div className={loginPageStyles.container}>
      <div className={loginPageStyles.content}>
        <form>
          <h1 className='text text_type_main-medium mb-6'>Вход</h1>
          <EmailInput
            placeholder='E-mail'
            onChange={e => { setEmail(e.target.value); }}
            value={email}
            name='email'
            extraClass='mb-6'
          />
          <PasswordInput
            placeholder='Пароль'
            onChange={e => { setPassword(e.target.value); }}
            value={password}
            name='password'
            icon='HideIcon'
            extraClass='mb-6'
          />
          {
            loginMessage && (<p className="text text_type_main-small input__error mb-6">{loginMessage}</p>)
          }
          <Button htmlType='submit' type='primary' size='medium' extraClass='mb-20' onClick={clickButton}>
            Войти
          </Button>
        </form>
        <p className='text text_type_main-default text_color_inactive mb-4'>Вы — новый пользователь? <Link to='/register' className={loginPageStyles.link}>Зарегистрироваться</Link></p>
        <p className='text text_type_main-default text_color_inactive'>Забыли пароль? <Link to='/forgot-password' className={loginPageStyles.link} onClick={toForgotPassword}>Восстановить пароль</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
