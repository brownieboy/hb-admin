import { select, takeEvery } from "redux-saga/effects";
import { actionTypes as stagesActionTypes } from "../stagesReducer.js";
import firebaseApp from "../../apis/firebase.js";

import { types as globalTypes } from "../../constants/firebasePaths.js";

function* saveNewStage() {
  // const user = yield select(state => state.login.user);
  const stagesList = yield select(state => state.stagesState.stagesList);

  const ref = firebaseApp
    .database()
    .ref(`${globalTypes.DATABASE.STAGES_PATH}test`);
  ref.set(stagesList);
}

const writeFirebaseStagesSagas = [
  takeEvery(stagesActionTypes.SAVE_NEW_STAGE, saveNewStage)
];

export default writeFirebaseStagesSagas;
