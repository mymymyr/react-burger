import headerStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { BASE_PATH, ORDER_FEED_PATH, PROFILE_PATH } from '../../utils/constants';

function AppHeader () {
  const location = useLocation();

  const getBurgerIconType = (pathname: string) => {
    return location.pathname === pathname ? 'primary' : 'secondary';
  };

  const getExtraActiveStyle = (pathname: string) => {
    return location.pathname === pathname ? '' : 'text_color_inactive';
  };

  return (
        <header className={headerStyles.header}>
            <div className={headerStyles.flex}>
                <div className={`${headerStyles.flex} ${headerStyles.element} p-5 mt-4 mb-4 mr-2`}>
                    <BurgerIcon type={getBurgerIconType(BASE_PATH)} />
                    <Link to={BASE_PATH} className={`${headerStyles.link} text text_type_main-default pl-2 ${getExtraActiveStyle(BASE_PATH)}`}>
                        Конструктор
                    </Link>
                </div>
                <div className={`${headerStyles.flex} ${headerStyles.element} p-5 mt-4 mb-4`}>
                    <ListIcon type={getBurgerIconType(ORDER_FEED_PATH)} />
                    <Link to={ORDER_FEED_PATH} className={`${headerStyles.link} text text_type_main-default pl-2 ${getExtraActiveStyle(ORDER_FEED_PATH)}`}>
                        Лента заказов
                    </Link>
                </div>
            </div>
            <Link to={BASE_PATH} className={headerStyles.position__center}>
                <Logo />
            </Link>
            <div className={headerStyles.position__end}>
                <div className={`${headerStyles.flex} ${headerStyles.element} p-5 mt-4 mb-4`}>
                    <ProfileIcon type={getBurgerIconType(PROFILE_PATH)} />
                    <Link to={PROFILE_PATH} className={`${headerStyles.link} text text_type_main-default pl-2 pr-5 ${getExtraActiveStyle(PROFILE_PATH)}`}>
                        Личный кабинет
                    </Link>
                </div>
            </div>
        </header>
  );
}

export default AppHeader;
