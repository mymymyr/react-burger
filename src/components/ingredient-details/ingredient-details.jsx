import ingredientDetailsStyles from './ingredient-details.module.css';
import { dataItemPropTypes } from '../utils/dataPropTypes.js'

function IngredientDetails({ item }) {
    return (
        <>
            <img className={ingredientDetailsStyles.maxWidth} src={item.image_large} alt={item.name} />
            <p className={`${ingredientDetailsStyles.maxWidth} text text_type_main-medium pt-4 pb-8`}>{item.name}</p>
            <ul className={ingredientDetailsStyles.list}>
                <li className={ingredientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{item.calories}</p>
                </li>
                <li className={ingredientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{item.proteins}</p>
                </li>
                <li className={ingredientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{item.fat}</p>
                </li>
                <li className={ingredientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{item.carbohydrates}</p>
                </li>
            </ul>
        </>
    );
}

IngredientDetails.propTypes = {
    item: dataItemPropTypes
}

export default IngredientDetails;