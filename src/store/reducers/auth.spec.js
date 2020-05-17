import reducer from "./auth";
import * as actionsTypes from "../actions/actionsTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    const iState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    };

    expect(reducer(undefined, {})).toEqual(iState);
  });
  it("SHould store token upon login", () => {
    const iState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    };
    const iStateUpdated = {
      token: "some value",
      userId: "some user",
      error: null,
      loading: false,
      authRedirectPath: "/",
    };
    expect(
      reducer(iState, {
        type: actionsTypes.AUTH_SUCCESS,
        idToken: "some value",
        userId: "some user",
      })
    ).toEqual(iStateUpdated);
  });
});
