import { useContext, useMemo } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { BURGER_COMPOSITION } from '../../utils/constants.js';
import { BurgerContext } from '../../utils/contexts.jsx';

function BurgerConstructor({ openModal }) {
    const { data } = useContext(BurgerContext);
    const bun = useMemo(() => data.filter((item) => item.type === BURGER_COMPOSITION.bun)[0], [data]);
    const internalIngredients = useMemo(() => data.filter((item) => item.type !== BURGER_COMPOSITION.bun), [data]);
    const sum = useMemo(() => bun.price * 2 +
        internalIngredients.reduce((prev, cur) => prev + cur.price, 0), [bun, internalIngredients]);
    const getIdsIngredients = useMemo(() => {
        const resultArr = internalIngredients.reduce((arr, item) => { arr.push(item._id); return arr; }, []);
        resultArr.push(bun._id);
        return resultArr;
    }, [internalIngredients, bun]);

    return (
        <section className={`${burgerConstructorStyles.section} mt-25 mr-4`}>
            <ul className={burgerConstructorStyles.list}>
                <li className='ml-8 mb-4'>
                    <ConstructorElement
                        type='top'
                        isLocked={true}
                        text={bun.name + ' (верх)'}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </li>
                <ul className={`${burgerConstructorStyles.list} ${burgerConstructorStyles.scroll}`}>
                    {useMemo(() => internalIngredients.map((item, index) => (
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
                    )), [internalIngredients])}
                </ul>
                <li className='ml-8 mb-10 mt-4'>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + ' (низ)'}
                        price={bun.price}
                        thumbnail={bun.image}
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
                <Button type='primary' size='large' htmlType='button' onClick={() => { openModal(getIdsIngredients); }}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    openModal: PropTypes.func.isRequired
};

export default BurgerConstructor;
