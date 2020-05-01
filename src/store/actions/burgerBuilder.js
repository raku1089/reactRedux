import * as actionTypes from "./actionsTypes";
import axios from "../../axios-order";

export const addIngredients = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};
export const removeIngredients = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://react-burger-69519.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => dispatch(fetchIngredientsFailed()));
  };
};
