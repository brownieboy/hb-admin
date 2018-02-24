import { call, fork, select, takeEvery } from "redux-saga/effects";
import { types, syncStages } from "../stagesWriteReducer.js";
import firebaseApp, { reduxSagaFirebase } from "../../apis/firebase.js";

import { types as globalTypes } from "../../constants/firebasePaths.js";

function* saveNewStage() {
  // const user = yield select(state => state.login.user);
  const newStageInfo = yield select(
    state => state.stagesWriteState.opStageInfo
  );
  console.log("newStageInfo=" + newStageInfo);

  // firebaseApp.database().object(`${globalTypes.DATABASE.STAGES_PATH}/5`).set(newStageInfo);
  const ref = firebaseApp.database().ref(`${globalTypes.DATABASE.STAGES_PATH}`);
  const newChildRef = ref.child("5");
  newChildRef.set(newStageInfo);
}

function* setStageStatus(action) {
  yield call(
    reduxSagaFirebase.database.patch,
    `${globalTypes.DATABASE.STAGES_PATH}/${action.StageId}`,
    {
      done: action.done
    }
  );
}

const StagesTransformer = ({ value }) =>
  Object.keys(value).map(key => ({
    ...value[key],
    id: key
  }));

function* syncStagesSaga() {
  yield fork(
    reduxSagaFirebase.database.sync,
    globalTypes.DATABASE.STAGES_PATH,
    {
      successActionCreator: syncStages,
      transform: StagesTransformer
    }
  );
}

// export default function* rootSaga() {
//   yield [
//     fork(syncStagesSaga),
//     takeEvery(types.StageS.NEW.SAVE, saveNewStage),
//     takeEvery(types.StageS.SET_STATUS, setStageStatus)
//   ];
// }

const writeFirebaseStagesSagas = [
  fork(syncStagesSaga),
  takeEvery(types.STAGES.NEW.SAVE, saveNewStage),
  takeEvery(types.STAGES.SET_STATUS, setStageStatus)
];

export default writeFirebaseStagesSagas;
