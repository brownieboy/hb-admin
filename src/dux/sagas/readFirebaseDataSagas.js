// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
// import { AsyncStorage } from "react-native";
import { buffers, eventChannel } from "redux-saga";
import { fork, put, take } from "redux-saga/effects";
// import FastImage from "react-native-fast-image";
import firebaseApp from "../../apis/firebase.js";

// import bandsApi from "../api/bandsApi.js";
import {
  bandsDuxActions
  // bandsDuxConstants,
} from "../bandsReducer.js";
import {
  appearancesDuxActions
  // appearancesDuxConstants
} from "../appearancesReducer.js";
import { homeDuxActions } from "../homeReducer.js";
import { stagesDuxActions } from "../stagesReducer.js";

export function createEventChannel(ref) {
  const listener = eventChannel(emit => {
    ref.on("value", snap => {
      emit({
        key: snap.key,
        value: snap.val()
      });
    });
    return () => {
      ref.off();
    };
  }, buffers.expanding(1));
  return listener;
}

function* readHomeSaga() {
  // console.log("running updatedItemSaga...");
  const updateChannel = createEventChannel(
    firebaseApp.database().ref("homePage")
  );

  while (true) {
    const item = yield take(updateChannel);
    // yield console.log(
    //   "readHomeSaga=" + JSON.stringify(item, null, 4).substring(0, 500)
    // );
    yield put(homeDuxActions.setFetchHomeSucceeded(item.value.homePageText));
  }
}

function* readBandsSaga() {
  // console.log("running updatedItemSaga...");
  const updateChannel = createEventChannel(
    firebaseApp.database().ref("bandsList")
  );

  while (true) {
    const item = yield take(updateChannel);
    // yield console.log(
    //   "readBandsSaga=" + JSON.stringify(item, null, 2).substring(0, 300)
    // );
    yield put(bandsDuxActions.setFetchBandsSucceeded(item.value));
  }
}

function* readAppearancesSaga() {
  // console.log("running updatedItemSaga...");
  const updateChannel = createEventChannel(
    firebaseApp.database().ref("appearances")
  );

  while (true) {
    const item = yield take(updateChannel);
    // yield console.log(
    //   "readBandsSaga=" + JSON.stringify(item, null, 4).substring(0, 500)
    // );
    yield put(appearancesDuxActions.setFetchAppearancesSucceeded(item.value));
  }
}

function* readStagesSaga() {
  // console.log("running updatedItemSaga...");
  const updateChannel = createEventChannel(
    firebaseApp.database().ref("stages")
  );

  while (true) {
    const item = yield take(updateChannel);
    // console.log(
    //   "readStagesSaga=" + JSON.stringify(item, null, 4).substring(0, 500)
    // );
    yield put(stagesDuxActions.setFetchStagesSucceeded(item.value));
  }
}

// function* mySaga() {
//   yield fork(readBandsSaga);
//   yield fork(readHomeSaga);
//   yield fork(readStagesSaga);
//   yield fork(readAppearancesSaga);
// }

// export default mySaga;

const readFirebaseDataSagas = [
  fork(readBandsSaga),
  fork(readHomeSaga),
  fork(readStagesSaga),
  fork(readAppearancesSaga)
];

export default readFirebaseDataSagas;
