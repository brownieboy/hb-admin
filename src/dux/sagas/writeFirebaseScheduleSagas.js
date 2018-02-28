import { put, select, takeEvery } from "redux-saga/effects";
import {
  actionTypes as appearancesActionTypes,
  saveAppearanceRequest,
  saveAppearanceSucceeded,
  saveAppearanceFailed
} from "../appearancesReducer.js";
import firebaseApp from "../../apis/firebase.js";

import { types as globalTypes } from "../../constants/firebasePaths.js";

function* saveData() {
  // Every saved edit, we write back to Firebase as an array.
  yield put(saveAppearanceRequest());
  const appearancesList = yield select(state => state.appearancesState.appearancesList);

  const ref = yield firebaseApp.database().ref(globalTypes.DATABASE.APPEARANCES_PATH);

  // The put statements didn't trigger Redux when I had them instead the .then()
  // and .catch() statements.  So I set a variable inside the .catch() then refer
  // to it in the if statement after the ref has run.  Clunky, but it works.
  let firebaseError = "";
  yield ref.set(appearancesList).catch(e => {
    firebaseError = e;
    console.log("Firebase appearance save error=" + e);
  });

  if (firebaseError === "") {
    yield put(saveAppearanceSucceeded());
  } else {
    yield put(saveAppearanceFailed(firebaseError));
  }
}

// const appearancesConfigObj = {
//   path: globalTypes.DATABASE.APPEARANCES_PATH,
//   requestAction: saveAppearanceRequest,
//   successAction: saveAppearanceSucceeded,
//   failAction: saveAppearanceFailed
// };

const writeFirebaseSagas = [
  takeEvery(appearancesActionTypes.SAVE_NEW_APPEARANCE, saveData),
  takeEvery(appearancesActionTypes.SAVE_EDITED_APPEARANCE, saveData)
];

export default writeFirebaseSagas;
