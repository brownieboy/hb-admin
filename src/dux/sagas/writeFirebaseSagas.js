import { put, select, takeEvery } from "redux-saga/effects";
import {
  actionTypes as stagesActionTypes,
  saveStageRequest,
  saveStageSucceeded,
  saveStageFailed
} from "../stagesReducer.js";
import firebaseApp from "../../apis/firebase.js";

import { types as globalTypes } from "../../constants/firebasePaths.js";

function* saveData(action, configObj) {
  // Every saved edit, we write back to Firebase as an array.
  yield put(saveStageRequest());
  const stagesList = yield select(state => state.stagesState.stagesList);

  const ref = yield firebaseApp
    .database()
    .ref(`${configObj.path}test`);

  // The put statements didn't trigger Redux when I had them instead the .then()
  // and .catch() statements.  So I set a variable inside the .catch() then refer
  // to it in the if statement after the ref has run.  Clunky, but it works.
  let firebaseError = "";
  yield ref.set(stagesList).catch(e => {
    firebaseError = e;
    // console.log("Firebase stage save error=" + e);
  });

  if (firebaseError === "") {
    yield put(saveStageSucceeded());
  } else {
    yield put(saveStageFailed(firebaseError));
  }
}

const writeFirebaseSagas = [
  takeEvery(stagesActionTypes.SAVE_NEW_STAGE, saveData, {
    path: globalTypes.DATABASE.STAGES_PATH,
    requestAction: saveStageRequest,
    successAction: saveStageSucceeded,
    failAction: saveStageFailed
  }),
  takeEvery(stagesActionTypes.SAVE_EDITED_STAGE, saveData, ["second"])
];

export default writeFirebaseSagas;
