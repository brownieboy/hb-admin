import { put, select, takeEvery } from "redux-saga/effects";
import {
  actionTypes as datesActionTypes,
  saveDatesRequest,
  saveDatesSucceeded,
  saveDatesFailed
} from "../datesReducer.js";
import firebaseApp from "../../apis/firebase.js";

import { types as globalTypes } from "../../constants/firebasePaths.js";

function* saveData() {
  // Every saved edit, we write back to Firebase as an array.
  console.log("saveData saga handlere for SAVE_EDITED_DATES");
  yield put(saveDatesRequest());
  const datesList = yield select(state => state.datesState.datesList);

  const ref = yield firebaseApp.database().ref(globalTypes.DATABASE.DATES_PATH);

  // The put statements didn't trigger Redux when I had them instead the .then()
  // and .catch() statements.  So I set a variable inside the .catch() then refer
  // to it in the if statement after the ref has run.  Clunky, but it works.
  let firebaseError = "";
  yield ref.set(datesList).catch(e => {
    firebaseError = e;
    // console.log("Firebase stage save error=" + e);
  });

  if (firebaseError === "") {
    yield put(saveDatesSucceeded());
  } else {
    yield put(saveDatesFailed(firebaseError));
  }
}


const writeFirebaseSagas = [
  takeEvery(datesActionTypes.SAVE_EDITED_DATES, saveData)
];

export default writeFirebaseSagas;
