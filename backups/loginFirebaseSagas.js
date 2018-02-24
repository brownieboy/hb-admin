import { login } from "./api";
import { take, put, fork, call, race } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  LOGIN_SUBMIT,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from "./actions";
import { loginRequest, loginError, loginSuccess } from "../dux/firebaseLoginDux.js";
import { startSubmit, stopSubmit } from "../form/actions";
import { clearState } from "../router/actions";

function* handleLoginSubmit() {
  // run the daemon
  while (true) {
    // wait for a login submit
    const { payload } = yield take(LOGIN_SUBMIT);
    // start submitting the form
    yield put(startSubmit("authLogin"));
    // put a login request
    yield put(loginRequest(payload));
    // wait for a response
    const { error } = yield race({
      success: take(LOGIN_SUCCESS),
      error: take(LOGIN_ERROR)
    });
    // if not an error, pop the screen
    if (!error) {
      // finalize the form
      yield put(stopSubmit("authLogin"));
      yield put(clearState());
    } else {
      // finalize the form
      yield put(stopSubmit("authLogin", error.payload));
    }
  }
}

function* handleLoginRequest() {
  // run the daemon
  while (true) {
    try {
      // wait for a login request
      const { payload } = yield take(LOGIN_REQUEST);
      // call the api
      const user = yield call(login, payload);
      // call the success
      yield put(loginSuccess(user));
    } catch (e) {
      // call the error
      yield put(loginError(e));
    }
  }
}

export default function* auth(getState) {
  yield fork(handleLoginRequest);
  yield fork(handleLoginSubmit);
}
