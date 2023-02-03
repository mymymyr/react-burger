import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import profilePageStyles from './profile.module.css';
import { useState } from 'react';
import { updateProfile } from '../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAccessToken } from '../utils/token';
import ProfileMenu from '../components/profile-menu/profile-menu';

function ProfilePage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [visibleButtons, setVisibleButtons] = useState(false);
    const userName = useSelector(store => store.user.user.name);
    const userEmail = useSelector(store => store.user.user.email);
    const dispatch = useDispatch();
    const clickSaveButton = async (evt) => {
        evt.preventDefault();
        const accessToken = await getAccessToken();
        dispatch(updateProfile(accessToken, email, name, password));
    }
    const clickСancelButton = (evt) => {
        evt.preventDefault();
        setEmail(userEmail);
        setName(userName);
        setVisibleButtons(false);
    }

    useEffect(() => {
        setEmail(userEmail);
        setName(userName);
    }, [userName, userEmail])

    return (
        <div className={profilePageStyles.container}>
            <ProfileMenu subtitle='В этом разделе вы можете изменить свои персональные данные' />
            <form className={profilePageStyles.form}>
                <Input
                    placeholder='Имя'
                    onChange={e => setName(e.target.value)}
                    value={name}
                    name='name'
                    icon='EditIcon'
                    extraClass='mb-6'
                    onFocus={() => setVisibleButtons(true)}
                />
                <EmailInput
                    placeholder='Логин'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name='email'
                    icon='EditIcon'
                    extraClass='mb-6'
                    onFocus={() => setVisibleButtons(true)}
                    errorText='Указан некорректный E-mail'
                />
                <PasswordInput
                    placeholder='Пароль'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name='password'
                    icon='EditIcon'
                    extraClass='mb-6'
                    onFocus={() => setVisibleButtons(true)}
                />
                {visibleButtons && (
                    <div className={profilePageStyles.buttonContainer}>
                        <Button htmlType="button" type="secondary" size="medium" onClick={clickСancelButton}>
                            Отмена
                        </Button>
                        <Button htmlType='submit' type='primary' size='medium' onClick={clickSaveButton}>
                            Сохранить
                        </Button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default ProfilePage;
