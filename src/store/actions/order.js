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

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    purcahseBurgerStart();
    axios
      .post("/orders.json", orderData)
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

export const fetchOrders = () => {
  return (dispatch) => {
    fetchOrdersStart();
    axios
      .get("/orders.json")
      .then((response) => {
        const fetchOrders = [];
        console.log("resp..fetc");
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
