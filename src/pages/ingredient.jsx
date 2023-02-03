import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { setCurrentIngredientAction } from "../services/actions/current-ingredient";
import { getIngredients } from "../services/actions/ingredients";
import HomePage from "./home";
import ingredientDetailsStyles from '../components/ingredient-details/ingredient-details.module.css';


function IngredientPage() {
    const params = useParams();
    const dispatch = useDispatch();
    const { ingredient, modal } = useSelector(store => store.currentIngredient);
    const { ingredients, ingredientsRequest } = useSelector(store => store.ingredients);
    useEffect(() => {
        if (!ingredientsRequest && ingredients.length === 0 && !ingredient) {
            dispatch(getIngredients());
        } else if (!ingredient && ingredients.length !== 0) {
            dispatch(setCurrentIngredientAction(ingredients.find((el) => el._id === params.id)));
        }
    }, [dispatch, ingredient, ingredients, ingredientsRequest, params.id]);

    return ingredient && (modal ? (<HomePage />) : (
        <>
            <p className={` text text_type_main-large mt-30 ${ingredientDetailsStyles.center}`}>Детали ингредиента</p>
            <IngredientDetails />
        </>));
}

export default IngredientPage;
