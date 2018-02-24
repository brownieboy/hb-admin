import { call, fork, select, takeEvery } from "redux-saga/effects";
import { types, syncStages } from "../stagesWriteReducer.js";
import { reduxSagaFirebase } from "../../apis/firebase.js";

import { types as globalTypes } from "../../constants/firebasePaths.js";

function* saveNewStage() {
  const user = yield select(state => state.login.user);
  const newStage = yield select(state => state.Stages.new);

  yield call(
    reduxSagaFirebase.database.create,
    globalTypes.DATABASE.STAGES_PATH,
    {
      creator: user ? user.uid : null,
      done: false,
      label: newStage
    }
  );
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

