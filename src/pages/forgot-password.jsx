import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import loginPageStyles from './login.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendCode } from '../services/actions/send-code';
import { useEffect } from 'react';
import { changePasswordFailedAction } from '../services/actions/change-password';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const userIsAuth = useSelector(store => store.user.isAuthenticated);
    const codeSend = useSelector(store => store.code.codeSend);
    const message = useSelector(store => store.code.message);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const clickButton = (evt) => {
        evt.preventDefault();
        dispatch(sendCode(email));
    }
    const toResetPassword = () => {
        dispatch(changePasswordFailedAction());
    };

    useEffect(() => {
        if (userIsAuth) {
            navigate('/');
        } else if (codeSend) {
            navigate('/reset-password');
        }
    }, [userIsAuth, codeSend, navigate]);

    return (
        <div className={loginPageStyles.container}>
            <div className={loginPageStyles.content}>
                <form>
                    <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
                    <EmailInput
                        placeholder='Укажите e-mail'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name='email'
                        extraClass='mb-6'
                        errorText='Указан некорректный E-mail'
                    />
                    {
                        message && (<p className="text text_type_main-small input__error mb-6">{message}</p>)
                    }
                    <Button htmlType='submit' type='primary' size='medium' extraClass='mb-20' onClick={clickButton}>
                        Восстановить
                    </Button>
                </form>
                <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль? <Link to='/login' className={loginPageStyles.link} onClick={toResetPassword}>Войти</Link></p>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
