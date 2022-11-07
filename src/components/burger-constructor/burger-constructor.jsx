import React from 'react';
import BurgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerConstructor(props) {
    return (
        <section className={`${BurgerConstructorStyles.section} mt-25 mr-4`}>
            <ul className={BurgerConstructorStyles.list}>
                <li key='firstIngredient' className='ml-8 mb-4'>
                    <ConstructorElement
                        type='top'
                        isLocked={true}
                        text={props.cards.bunArr[0].name + ' (верх)'}
                        price={props.cards.bunArr[0].price}
                        thumbnail={props.cards.bunArr[0].image}
                    />
                </li>
                <ul className={`${BurgerConstructorStyles.list} ${BurgerConstructorStyles.scroll}`}>
                    {props.cards.mainArr.map((item, index) => (
                        <li key={`${item.id} + '__' + ${index}`} className={`${BurgerConstructorStyles.element} mb-4`}>
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
                    {props.cards.sauceArr.map((item, index) => (
                        <li key={`${item.id} + '__' + ${index}`} className={`${BurgerConstructorStyles.element} mb-4`}>
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
                <li key='lastIngredient' className='ml-8 mb-10 mt-4'>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={props.cards.bunArr[0].name + ' (низ)'}
                        price={props.cards.bunArr[0].price}
                        thumbnail={props.cards.bunArr[0].image}
                    />
                </li>
            </ul>
            <div className={BurgerConstructorStyles.container}>
                <p className='text text_type_digits-medium'>{
                    props.cards.bunArr[0].price * 2 +
                    props.cards.mainArr.reduce((prev, cur) => prev + cur.price, 0) +
                    props.cards.sauceArr.reduce((prev, cur) => prev + cur.price, 0)
                }</p>
                <div className={`${BurgerConstructorStyles.currencyIcon} mr-10`}>
                    <CurrencyIcon type='primary' />
                </div>
                <Button type='primary' size='large' htmlType='button'>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    cards: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired
    }))).isRequired
};

export default BurgerConstructor;