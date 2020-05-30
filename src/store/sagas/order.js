import { put } from "redux-saga/effects";
import axios from "../../axios-order";
import * as actions from "../actions";

export function* purchaseBurgerSaga(action) {
  yield actions.purcahseBurgerStart();
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );

    yield put(
      actions.purcahseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
    yield put(actions.purcahseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());

  const queryParams = yield "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  try {
    const response = yield axios.get("/orders.json" + queryParams);
    const fetchOrders = [];
    for (let key in response.data) {
      fetchOrders.push({ ...response.data[key], id: key });
    }

    yield put(actions.fetchOrdersSuccess(fetchOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}
