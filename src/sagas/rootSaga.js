import { all } from "redux-saga/effects";

import readFirebaseDataSagas from "./readFirebaseDataSagas.js";

// Combine sagas solution taken from Andarist's comment at:
// https://github.com/redux-saga/redux-saga/issues/160
function* sagas() {
  yield all([...readFirebaseDataSagas]);
}
export default sagas;
