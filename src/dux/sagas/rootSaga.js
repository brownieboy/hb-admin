import { all } from "redux-saga/effects";

import firebaseDataSagas from "./firebaseDataSagas.js";
import loginFirebaseSagas from "./loginFirebaseSagas.js";
import writeFirebaseStagesSagas from "./writeFirebaseStagesSagas.js";

// Combine sagas solution taken from Andarist's comment at:
// https://github.com/redux-saga/redux-saga/issues/160
function* sagas() {
  yield all([
    ...firebaseDataSagas,
    ...loginFirebaseSagas,
    ...writeFirebaseStagesSagas
  ]);
}
export default sagas;
