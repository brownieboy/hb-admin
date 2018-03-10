import { call, put, select, takeEvery } from "redux-saga/effects";
import { reduxSagaFirebase } from "../../apis/firebase.js";

import {
  actionTypes as storageActionTypes,
  storageDuxActions
} from "../storageReducer.js";
// import firebaseApp from "../../apis/firebase.js";

import { types as globalTypes } from "../../constants/firebasePaths.js";

function* uploadCardImage(data) {
  // yield put(saveBandRequest());
  yield console.log("saga uploadCardImage started, data=");
  yield console.log(data);

  const file = yield data.payload.fileInfo;
  const filePath = yield `${globalTypes.STORAGE.THUMBS_PATH}/${file.name}`;
  console.log("filePath=");
  console.log(filePath);
  console.log("file=");
  console.log(file);


  const tempStorage = reduxSagaFirebase.storage;

  const task = reduxSagaFirebase.storage.uploadFile(filePath, file);

  task.on("state_changed", snapshot => {
    const pct = snapshot.bytesTransferred * 100 / snapshot.totalBytes;
    console.log(`${pct}%`);
  });
  
  yield task;

  // task.on("state_changed", snapshot => {
  //   const pct = snapshot.bytesTransferred * 100 / snapshot.totalBytes;
  //   console.log(`${pct}%`);
  // });

  /*
  const storageRef = yield firebaseApp.storage().ref();
  const uploadTask = storageRef
    .child(`${globalTypes.STORAGE.THUMBS_PATH}/${file.name}`)
    .put(file, { contentType: file.type });

  uploadTask.on(
    "state_changed",
    snapshot => {
      console.log("upload Task state_changed");
      const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      put(
        storageDuxActions.updateStorageThumbStatus({
          percentUploaded: progress
        })
      );
    },
    error => {
      console.log("File upload error: " + error);
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      console.log("uploadTask success");
      const downloadUrl = uploadTask.snapshot.downloadURL;
      put(storageDuxActions.updateStorageThumbStatus({ downloadUrl }));
    }
  );
  */

  // const bandsList = yield select(state => state.bandsState.bandsList);

  // const ref = yield firebaseApp.database().ref(globalTypes.DATABASE.BANDS_PATH);

  // The put statements didn't trigger Redux when I had them instead the .then()
  // and .catch() statements.  So I set a variable inside the .catch() then refer
  // to it in the if statement after the ref has run.  Clunky, but it works.
  // let firebaseError = "";
  // yield ref.set(bandsList).catch(e => {
  //   firebaseError = e;
  //   console.log("Firebase band save error=" + e);
  // });

  // if (firebaseError === "") {
  //   yield put(saveBandSucceeded());
  // } else {
  //   yield put(saveBandFailed(firebaseError));
  // }
}

// const bandsConfigObj = {
//   path: globalTypes.DATABASE.BANDS_PATH,
//   requestAction: saveBandRequest,
//   successAction: saveBandSucceeded,
//   failAction: saveBandFailed
// };

const uploadFirebaseImagesSagas = [
  takeEvery(storageActionTypes.SEND_STORAGE_THUMB_START, uploadCardImage)
];

export default uploadFirebaseImagesSagas;
