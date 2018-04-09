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
} from "../firebaseLoginReducer.js";

/*
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
 */

function* loginSaga(loginCredentials) {
  try {
    // const data = yield call(
    //   reduxSagaFirebase.auth.signInWithPopup,
    //   authProvider
    // );
    const { email, password } = loginCredentials;
    console.log("logging in...");
    // const data = yield call(
    //   reduxSagaFirebase.auth().signInWithEmailAndPassword(email, password)
    // );
    const user = yield call(
      reduxSagaFirebase.auth.createUserWithEmailAndPassword,
      email,
      password
    );
    yield console.log("Login success?, data:");
    yield console.log(data);
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
