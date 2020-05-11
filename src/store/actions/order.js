import * as actionTypes from "./actionsTypes";
import axios from "../../axios-order";

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

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    purcahseBurgerStart();
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((res) => {
        dispatch(purcahseBurgerSuccess(res.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purcahseBurgerFail(error));
      });
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};
export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token) => {
  return (dispatch) => {
    fetchOrdersStart();
    axios
      .get("/orders.json?auth=" + token)
      .then((response) => {
        const fetchOrders = [];
        for (let key in response.data) {
          fetchOrders.push({ ...response.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(fetchOrders));
      })
      .catch((error) => {
        dispatch(fetchOrdersFail(error));
      });
  };
};
