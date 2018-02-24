// Following instructions from redux-saga-firebase Github readme.
import { call, fork, put, take, takeEvery } from "redux-saga/effects";

import { authProvider, reduxSagaFirebase } from "../../apis/firebase.js";
import {
  types,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  syncUser
} from "../firebaseLoginDux.js";

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

function* logoutSaga() {
  try {
    const data = yield call(reduxSagaFirebase.auth.signOut);
    yield put(logoutSuccess(data));
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

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
  takeEvery(types.LOGOUT.REQUEST, logoutSaga),
  fork(syncUserSaga)
];

export default loginFirebaseSagas;
