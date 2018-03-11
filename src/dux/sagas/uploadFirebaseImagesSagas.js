import { call, put, takeEvery } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { reduxSagaFirebase } from "../../apis/firebase.js";

import {
  actionTypes as storageActionTypes,
  storageDuxActions
} from "../storageReducer.js";

import { bandsDuxActions } from "../bandsReducer.js";
// import firebaseApp from "../../apis/firebase.js";

import { types as globalTypes } from "../../constants/firebasePaths.js";

function* syncFileUrl(filePath) {
  try {
    const url = yield call(reduxSagaFirebase.storage.getDownloadURL, filePath);
    return url;
  } catch (error) {
    console.error(error);
  }
}

function* handleEventEmit(snapshot) {
  // yield console.log("saga uploadCardImage started, snapshot:");
  // yield console.log(snapshot);
  const progress = snapshot.bytesTransferred * 100 / snapshot.totalBytes;
  yield put(
    storageDuxActions.updateStorageThumbStatus({
      percentUploaded: progress
    })
  );
}

function* uploadCardImage(data) {
  yield console.log("saga handleEventEmit started, data:");
  yield console.log(data);

  const file = yield data.payload.fileInfo;
  const filePath = yield `${globalTypes.STORAGE.THUMBS_PATH}/${file.name}`;

  const task = reduxSagaFirebase.storage.uploadFile(filePath, file);

  const channel = eventChannel(emit => task.on("state_changed", emit));
  yield takeEvery(channel, handleEventEmit);

  yield task;
  const thumbDownloadUrl = yield syncFileUrl(filePath);
  yield put(
    storageDuxActions.sendStorageThumbSuccess({ downloadUrl: thumbDownloadUrl })
  );
  console.log("Down here already...");
  yield put(
    bandsDuxActions.updateBandThumbUrl({
      bandId: data.payload.bandId,
      downloadUrl: thumbDownloadUrl
    })
  );
}

const uploadFirebaseImagesSagas = [
  takeEvery(storageActionTypes.SEND_STORAGE_THUMB_START, uploadCardImage)
];

export default uploadFirebaseImagesSagas;
