import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = { ...action.orders, id: action.orderId };
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true,
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
