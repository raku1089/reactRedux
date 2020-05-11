import * as actionTypes from "./actionsTypes";
import axios from "axios";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.LOGOUT,
  };
};
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCDKoI37i56fjIafyW3TZ-2JzOVikTEpxM";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDKoI37i56fjIafyW3TZ-2JzOVikTEpxM";
    }
    axios
      .post(url, authData)
      .then((resp) => {
        console.log(resp);
        const expirationdate = new Date(
          new Date().getTime() + resp.data.expiresIn * 1000
        );
        localStorage.setItem("token", resp.data.idToken);
        localStorage.setItem("expirationDate", expirationdate);
        dispatch(authSuccess(resp.data.idToken, resp.data.localId));
        dispatch(checkAuthTimeout(resp.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT,
    path: path,
  };
};
