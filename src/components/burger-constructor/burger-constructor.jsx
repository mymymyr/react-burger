import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { burgerPropTypes } from '../utils/dataPropTypes.js';
import { BURGER_COMPOSITION } from '../utils/constants.js';

function BurgerConstructor({ data, openModal }) {
    const sum = data[0].price * 2 +
        data.reduce((prev, cur) => prev + cur.price, 0);
    return (
        <section className={`${burgerConstructorStyles.section} mt-25 mr-4`}>
            <ul className={burgerConstructorStyles.list}>
                <li className='ml-8 mb-4'>
                    <ConstructorElement
                        type='top'
                        isLocked={true}
                        text={data[0].name + ' (верх)'}
                        price={data[0].price}
                        thumbnail={data[0].image}
                    />
                </li>
                <ul className={`${burgerConstructorStyles.list} ${burgerConstructorStyles.scroll}`}>
                    {data.map((item, index) => (
                        item.type !== BURGER_COMPOSITION.bun && (
                            <li key={`${item._id}__${index}`} className={`${burgerConstructorStyles.element} mb-4`}>
                                <div className={burgerConstructorStyles.dragIcon}>
                                    <DragIcon type='primary' />
                                </div>
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            </li>
                        )
                    ))}
                </ul>
                <li className='ml-8 mb-10 mt-4'>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={data[0].name + ' (низ)'}
                        price={data[0].price}
                        thumbnail={data[0].image}
                    />
                </li>
            </ul>
            <div className={burgerConstructorStyles.container}>
                <p className='text text_type_digits-medium'>{
                    sum
                }</p>
                <div className={`${burgerConstructorStyles.currencyIcon} mr-10`}>
                    <CurrencyIcon type='primary' />
                </div>
                <Button type='primary' size='large' htmlType='button' onClick={() => { openModal(data); }}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(burgerPropTypes).isRequired,
    openModal: PropTypes.func.isRequired
};

export default BurgerConstructor;