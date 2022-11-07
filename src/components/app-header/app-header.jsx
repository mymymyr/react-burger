import React from 'react';
import headerStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.flex}>
                <div className={`${headerStyles.flex} p-5 mt-4 mb-4 mr-2`}>
                    <BurgerIcon type='primary' />
                    <p className='text text_type_main-default pl-2'>
                        Конструктор
                    </p>
                </div>
                <div className={`${headerStyles.flex} ${headerStyles.element} p-5 mt-4 mb-4`}>
                    <ListIcon type='secondary' />
                    <p className='text text_type_main-default text_color_inactive pl-2'>
                        Лента заказов
                    </p>
                </div>
            </div>
            <div className={headerStyles.position__center}>
                <Logo />
            </div>
            <div className={headerStyles.position__end}>
                <div className={`${headerStyles.flex} ${headerStyles.element} className='p-5 mt-4 mb-4`}>
                    <ProfileIcon type='secondary' />
                    <p className='text text_type_main-default text_color_inactive pl-2'>
                        Личный кабинет
                    </p>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;