import * as actionTypes from "./actionsTypes";
import axios from "axios";

export const purcahseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purcahseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};
export const purcahseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    purcahseBurgerStart();
    axios
      .post("/orders.json", orderData)
      .then((res) => {
        dispatch(purcahseBurgerSuccess(res.data.name, orderData));
      })
      .cactch((error) => {
        dispatch(purcahseBurgerFail(error));
      });
  };
};
