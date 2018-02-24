// Following instructions from redux-saga-firebase Github readme.
import { call, put, takeEvery } from "redux-saga/effects";

import { authProvider, reduxSagaFirebase } from "../apis/firebase.js";
import {
  loginSuccess,
  loginFailure,
  LOGIN_SUBMIT
} from "../dux/firebaseLoginDux.js";

function* loginSaga() {
  try {
    const data = yield call(
      reduxSagaFirebase.auth.signInWithPopup,
      authProvider
    );
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

// function* loginFirebaseSaga() {
//   yield [takeEvery(LOGIN_SUBMIT, loginSaga)];
// }

const loginFirebaseSagas = [takeEvery(LOGIN_SUBMIT, loginSaga)];

export default loginFirebaseSagas;
