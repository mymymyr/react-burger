import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import loginPageStyles from './login.module.css';
import { useEffect, useState, type SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../hooks/hooks';
import { changePassword } from '../services/actions/change-password';

function ResetPasswordPage () {
  const [newPassword, setNewPassword] = useState('');
  const [code, setCode] = useState('');
  const userIsAuth = useSelector(store => store.user.isAuthenticated);
  const { codeSend, passwordRequest } = useSelector(store => store.code);
  const { passwordRequest: passwordChangeRequest, passwordChange } = useSelector(store => store.password);
  const message = useSelector(store => store.password.message);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clickButton = (evt: SyntheticEvent<Element>) => {
    evt.preventDefault();
    dispatch(changePassword(newPassword, code));
  };

  useEffect(() => {
    if (userIsAuth) {
      navigate('/');
    } else if ((!passwordRequest && !codeSend) || (!passwordChangeRequest && passwordChange)) {
      navigate('/login');
    }
  }, [userIsAuth, navigate, codeSend, passwordChange, passwordRequest]);

  return (
        <div className={loginPageStyles.container}>
            <div className={loginPageStyles.content}>
                <form>
                    <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
                    <PasswordInput
                        placeholder='Введите новый пароль'
                        onChange={e => { setNewPassword(e.target.value); }}
                        value={newPassword}
                        name='new_password'
                        icon='HideIcon'
                        extraClass='mb-6'
                    />
                    <Input
                        placeholder='Введите код из письма'
                        onChange={e => { setCode(e.target.value); }}
                        value={code}
                        name='code'
                        extraClass='mb-6'
                    />
                    {
                        message && (<p className="text text_type_main-small input__error mb-6">{message}</p>)
                    }
                    <Button htmlType='submit' type='primary' size='medium' extraClass='mb-20' onClick={clickButton}>
                        Сохранить
                    </Button>
                </form>
                <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль? <Link to='/login' className={loginPageStyles.link}>Войти</Link></p>
            </div>
        </div>
  );
}

export default ResetPasswordPage;
