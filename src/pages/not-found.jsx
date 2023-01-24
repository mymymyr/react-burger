import notFound404Styles from './not-found.module.css';
import { Link } from 'react-router-dom';

function NotFound404() {
    return (
        <div className={notFound404Styles.container}>
            <div className={notFound404Styles.content}>
                <h1 className='text text_type_main-large mb-8'>Ооой! 404 Ошибка</h1>
                <p className='text text_type_main-medium mb-8'>Запрашиваемая страница не существует</p>
                <p className='text text_type_main-medium'>Перейти на <Link to='/' className={notFound404Styles.link}>главную</Link></p>
            </div>
        </div>
    );
}

export default NotFound404;
