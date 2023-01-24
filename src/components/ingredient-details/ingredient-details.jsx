import ingredientDetailsStyles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

function IngredientDetails() {

    const { ingredient } = useSelector(store => store.currentIngredient);

    return (
        <div className={ingredientDetailsStyles.center}>
            <img className={ingredientDetailsStyles.maxWidth} src={ingredient.image_large} alt={ingredient.name} />
            <p className={`${ingredientDetailsStyles.maxWidth} text text_type_main-medium pt-4 pb-8`}>{ingredient.name}</p>
            <ul className={ingredientDetailsStyles.list}>
                <li className={ingredientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
                </li>
                <li className={ingredientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
                </li>
                <li className={ingredientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
                </li>
                <li className={ingredientDetailsStyles.listItem}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
}

export default IngredientDetails;
