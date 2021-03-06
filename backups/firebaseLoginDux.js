// This approach taken from article at:
// https://medium.com/@MattiaManzati/tips-to-handle-authentication-in-redux-2-introducing-redux-saga-130d6872fbe7

import { combineReducers } from "redux";

// Triggered whenever the user clicks the login submit button
export const LOGIN_SUBMIT = "core_auth/LOGIN_SUBMIT";
export function loginSubmit(data) {
  return {
    type: LOGIN_SUBMIT,
    payload: data
  };
}

// Triggered whenever a login request is dispatched from whenever point in the code
export const LOGIN_REQUEST = "core_auth/LOGIN_REQUEST";
export function loginRequest(data) {
  return {
    type: LOGIN_REQUEST,
    payload: data
  };
}

// triggered when the login has succeded
export const LOGIN_SUCCESS = "core_auth/LOGIN_SUCCESS";
export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
}

// triggered when the login failed
export const LOGIN_ERROR = "core_auth/LOGIN_ERROR";
export function loginError(errors) {
  return {
    type: LOGIN_ERROR,
    error: true,
    payload: errors
  };
}

// triggered to logout the user
export const LOGOUT = "core_auth/LOGOUT";
export function logout() {
  return {
    type: LOGOUT
  };
}

const users = (state = {}, action) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    default:
      return state;
  }
};

const auth = (state = null, action) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case LOGIN_SUCCESS:
    console.log("LOGIN_SUCCESS reducer, action.payload=" + JSON.stringify(action.payload, null, 4));
      return action.payload.id;
    case LOGOUT:
      return null;
    default:
      return state;
  }
};

export default combineReducers({ users, auth });

