import IngredientDetailsStyles from './ingredient-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { dataItemPropTypes } from '../utils/dataPropTypes.js'

function IngredientDetails(props) {
    return (
        <div className={IngredientDetailsStyles.container}>
            <div className={`${IngredientDetailsStyles.header} pl-10 pt-10 pr-10`} >
                <p className='text text_type_main-large pr-9'>
                    Детали ингредиента
                </p>
                <p className={IngredientDetailsStyles.cursor}>
                    <CloseIcon type="primary" onClick={props.onCloseModal} />
                </p>
            </div >
            <img className={IngredientDetailsStyles.maxWidth} src={props.image_large} alt={props.name} />
            <p className={`${IngredientDetailsStyles.maxWidth} text text_type_main-medium pt-4 pb-8`}>{props.name}</p>
            <ul className={IngredientDetailsStyles.list}>
                <li className={IngredientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{props.calories}</p>
                </li>
                <li className={IngredientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{props.proteins}</p>
                </li>
                <li className={IngredientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{props.fat}</p>
                </li>
                <li className={IngredientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{props.carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
}

IngredientDetails.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    ...dataItemPropTypes
}

export default IngredientDetails;