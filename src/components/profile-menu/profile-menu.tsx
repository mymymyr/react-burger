import { useDispatch } from '../../hooks/hooks';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from '../../services/actions/user';
import { BASE_PATH, ORDER_HISTORY_PATH, PROFILE_PATH } from '../../utils/constants';
import profileMenuStyles from './profile-menu.module.css';
import { type FC, type MouseEvent } from 'react';

type TProfileMenuProps = {
  subtitle: string
}

const ProfileMenu: FC<TProfileMenuProps> = ({ subtitle }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const toSignOut = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(signOut());
  };
  const getExtraActiveStyle = (pathname: string) => {
    return location.pathname === pathname ? `${profileMenuStyles.active}` : 'text_color_inactive';
  };

  return (
        <div className={`${profileMenuStyles.menu} pr-15`}>
            <Link to={PROFILE_PATH} className={`${profileMenuStyles.link} text text_type_main-medium ${getExtraActiveStyle(PROFILE_PATH)}`}>
                Профиль
            </Link>
            <Link to={ORDER_HISTORY_PATH} className={`${profileMenuStyles.link} text text_type_main-medium ${getExtraActiveStyle(ORDER_HISTORY_PATH)}`}>
                История заказов
            </Link>
            <Link to={BASE_PATH} className={`${profileMenuStyles.link} text text_type_main-medium text_color_inactive`} onClick={toSignOut}>
                Выход
            </Link>
            <p className='text text_type_main-default text_color_inactive mt-20'>{subtitle}</p>
        </div>
  );
};

export default ProfileMenu;
