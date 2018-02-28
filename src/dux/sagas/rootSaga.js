import { all } from "redux-saga/effects";

import readFirebaseDataSagas from "./readFirebaseDataSagas.js";
import loginFirebaseSagas from "./loginFirebaseSagas.js";
import writeFirebaseBandSagas from "./writeFirebaseBandSagas.js";
import writeFirebaseStageSagas from "./writeFirebaseStageSagas.js";

// Combine sagas solution taken from Andarist's comment at:
// https://github.com/redux-saga/redux-saga/issues/160
function* sagas() {
  yield all([
    ...readFirebaseDataSagas,
    ...loginFirebaseSagas,
    ...writeFirebaseBandSagas,
    ...writeFirebaseStageSagas
  ]);
}
export default sagas;
