import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import loginPageStyles from './login.module.css';
import { useState, useEffect, type SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../hooks/hooks';
import { register } from '../services/actions/register';

function RegisterPage () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const userIsAuth = useSelector(store => store.user.isAuthenticated);
  const navigate = useNavigate();
  const registerSuccess = useSelector(store => store.register.success);
  const registerMessage = useSelector(store => store.register.message);
  const dispatch = useDispatch();
  const clickButton = (evt: SyntheticEvent<Element>) => {
    evt.preventDefault();
    dispatch(register(email, password, name));
  };

  useEffect(() => {
    if (registerSuccess) {
      navigate('/profile');
    } else if (userIsAuth) {
      navigate('/reset-password');
    }
  }, [registerSuccess, navigate, userIsAuth]);

  return (
        <div className={loginPageStyles.container}>
            <div className={loginPageStyles.content}>
                <form>
                    <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
                    <Input
                        placeholder='Имя'
                        onChange={e => { setName(e.target.value); }}
                        value={name}
                        name='name'
                        extraClass='mb-6'
                    />
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
                        registerMessage && (<p className="text text_type_main-small input__error mb-6">{registerMessage}</p>)
                    }
                    <Button htmlType='submit' type='primary' size='medium' extraClass='mb-20' onClick={clickButton}>
                        Зарегистрироваться
                    </Button>
                </form>
                <p className='text text_type_main-default text_color_inactive'>Уже зарегистрированы? <Link to='/login' className={loginPageStyles.link}>Войти</Link></p>
            </div>
        </div>
  );
}

export default RegisterPage;
