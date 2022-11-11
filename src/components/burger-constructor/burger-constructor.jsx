import BurgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { burgerPropTypes } from '../utils/dataPropTypes.js';

function BurgerConstructor(props) {
    const sum = props.data[0].price * 2 +
        props.data.reduce((prev, cur) => prev + cur.price, 0);
    return (
        <section className={`${BurgerConstructorStyles.section} mt-25 mr-4`}>
            <ul className={BurgerConstructorStyles.list}>
                <li className='ml-8 mb-4'>
                    <ConstructorElement
                        type='top'
                        isLocked={true}
                        text={props.data[0].name + ' (верх)'}
                        price={props.data[0].price}
                        thumbnail={props.data[0].image}
                    />
                </li>
                <ul className={`${BurgerConstructorStyles.list} ${BurgerConstructorStyles.scroll}`}>
                    {props.data.map((item, index) => (
                        <li key={`${item._id}__${index}`} className={`${BurgerConstructorStyles.element} mb-4`}>
                            <div className={BurgerConstructorStyles.dragIcon}>
                                <DragIcon type='primary' />
                            </div>
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>
                    ))}
                </ul>
                <li className='ml-8 mb-10 mt-4'>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={props.data[0].name + ' (низ)'}
                        price={props.data[0].price}
                        thumbnail={props.data[0].image}
                    />
                </li>
            </ul>
            <div className={BurgerConstructorStyles.container}>
                <p className='text text_type_digits-medium'>{
                    sum
                }</p>
                <div className={`${BurgerConstructorStyles.currencyIcon} mr-10`}>
                    <CurrencyIcon type='primary' />
                </div>
                <Button type='primary' size='large' htmlType='button' onClick={() => { props.openModal("order", props.data); }}>
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