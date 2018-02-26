import { select, takeEvery } from "redux-saga/effects";
import { actionTypes as stagesActionTypes } from "../stagesReducer.js";
import firebaseApp from "../../apis/firebase.js";

import { types as globalTypes } from "../../constants/firebasePaths.js";

function* saveStages() {
  // Every saved edit, we write back to Firebase as an array.
  console.log("saveStages*...");
  // const stagesList = yield select(state => state.stagesState.stagesList);
  const stagesList = yield select(state => {
    console.log("In saga select.  state=" + state);
    return state.stagesState.stagesList;
  });
  yield console.log("Saga to server=" + JSON.stringify(stagesList, null, 4));

  const ref = firebaseApp
    .database()
    .ref(`${globalTypes.DATABASE.STAGES_PATH}test`);
  ref.set(stagesList);
}

const writeFirebaseSagas = [
  takeEvery(stagesActionTypes.SAVE_NEW_STAGE, saveStages),
  takeEvery(stagesActionTypes.SAVE_EDITED_STAGE, saveStages)
];

export default writeFirebaseSagas;
