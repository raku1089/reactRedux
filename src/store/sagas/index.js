import { takeEvery, all, takeLatest } from "redux-saga/effects";
import {
  loogoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSage,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./order";
import * as actionTypes from "../actions/actionsTypes";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITATE_LOGOUT, loogoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSage),
  ]);
}

export function* watcBburgerBuilder() {
  yield takeEvery(actionTypes.SET_INGREDIENTS_STATE, initIngredientsSaga);
}
export function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER_STATE, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS_STATE, fetchOrdersSaga);
}
