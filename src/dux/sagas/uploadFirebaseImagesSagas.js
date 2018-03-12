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
    return console.error(error);
  }
}

function* handleEventEmitThumb(snapshot) {
  // yield console.log("saga handleEventEmitThumb started, snapshot:");
  // yield console.log(snapshot);
  const progress = snapshot.bytesTransferred * 100 / snapshot.totalBytes;
  yield put(
    storageDuxActions.updateStorageThumbStatus({
      percentUploaded: progress
    })
  );
}

function* uploadThumbImage(data) {
  yield console.log("saga uploadThumbImage started, data:");
  yield console.log(data);

  const file = yield data.payload.fileInfo;
  const filePath = yield `${globalTypes.STORAGE.THUMBS_PATH}/${file.name}`;

  const task = reduxSagaFirebase.storage.uploadFile(filePath, file);

  const channel = eventChannel(emit => task.on("state_changed", emit));
  yield takeEvery(channel, handleEventEmitThumb);

  yield task;
  const thumbDownloadUrl = yield syncFileUrl(filePath);
  yield put(
    storageDuxActions.sendStorageThumbSuccess({ downloadUrl: thumbDownloadUrl })
  );
  yield put(
    bandsDuxActions.updateBandThumbUrl({
      bandId: data.payload.bandId,
      downloadUrl: thumbDownloadUrl
    })
  );
}

function* handleEventEmitCard(snapshot) {
  // yield console.log("saga handleEventEmitCard started, snapshot:");
  // yield console.log(snapshot);
  const progress = snapshot.bytesTransferred * 100 / snapshot.totalBytes;
  yield put(
    storageDuxActions.updateStorageCardStatus({
      percentUploaded: progress
    })
  );
}

function* uploadCardImage(data) {
  yield console.log("saga uploadCardImage started, data:");
  yield console.log(data);

  const file = yield data.payload.fileInfo;
  const filePath = yield `${globalTypes.STORAGE.THUMBS_PATH}/${file.name}`;

  const task = reduxSagaFirebase.storage.uploadFile(filePath, file);

  const channel = eventChannel(emit => task.on("state_changed", emit));
  yield takeEvery(channel, handleEventEmitCard);

  yield task;
  const cardDownloadUrl = yield syncFileUrl(filePath);
  yield put(
    storageDuxActions.sendStorageCardSuccess({ downloadUrl: cardDownloadUrl })
  );
  yield put(
    bandsDuxActions.updateBandCardUrl({
      bandId: data.payload.bandId,
      downloadUrl: cardDownloadUrl
    })
  );
}

const uploadFirebaseImagesSagas = [
  takeEvery(storageActionTypes.SEND_STORAGE_THUMB_START, uploadThumbImage),
  takeEvery(storageActionTypes.SEND_STORAGE_CARD_START, uploadCardImage)
];

export default uploadFirebaseImagesSagas;
