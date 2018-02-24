// Following instructions from redux-saga-firebase Github readme.
import { call, fork, put, take, takeEvery } from "redux-saga/effects";

import { authProvider, reduxSagaFirebase } from "../apis/firebase.js";
import {
  types,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  syncUser
} from "../dux/firebaseLoginDux.js";

function* loginSaga() {
  try {
    const data = yield call(
      reduxSagaFirebase.auth.signInWithPopup,
      authProvider
    );
    // yield console.log("Login success?, data=" + JSON.stringify(data, null, 4));
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

// function* loginFirebaseSaga() {
//   yield [takeEvery(LOGIN_SUBMIT, loginSaga)];
// }

function* syncUserSaga() {
  const channel = yield call(reduxSagaFirebase.auth.channel);

  while (true) {
    const { user } = yield take(channel);

    if (user) {
      yield put(syncUser(user));
    } else {
      yield put(syncUser(null));
    }
  }
}

const loginFirebaseSagas = [
  takeEvery(types.LOGIN.REQUEST, loginSaga),
  fork(syncUserSaga)
];

export default loginFirebaseSagas;
