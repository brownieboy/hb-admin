// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
// import { AsyncStorage } from "react-native";
import { buffers, eventChannel } from "redux-saga";
import { all, fork, put, select, take, takeLatest } from "redux-saga/effects";
// import FastImage from "react-native-fast-image";
import firebaseApp from "../apis/firebase.js";

// import bandsApi from "../api/bandsApi.js";
import {
  bandsDuxActions,
  loadBandsNow
  // bandsDuxConstants,
} from "../dux/bandsReducer.js";
import {
  appearancesDuxActions
  // appearancesDuxConstants
} from "../dux/appearancesReducer.js";
import { homeDuxActions } from "../dux/homeReducer.js";

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

function* readBandsSaga() {
  // console.log("running updatedItemSaga...");
  const updateChannel = createEventChannel(
    firebaseApp.database().ref("bandsList")
  );

  while (true) {
    const item = yield take(updateChannel);
    console.log(
      "readBandsSaga=" + JSON.stringify(item, null, 4).substring(0, 500)
    );
  }
}

function* readStagesSaga() {
  // console.log("running updatedItemSaga...");
  const updateChannel = createEventChannel(
    firebaseApp.database().ref("stages")
  );

  while (true) {
    const item = yield take(updateChannel);
    console.log(
      "readStagesSaga=" + JSON.stringify(item, null, 4).substring(0, 500)
    );
  }
}

/*
function* updatedItemSaga() {
  // console.log("running updatedItemSaga...");
  const updateChannel = createEventChannel(
    firebaseApp.database().ref("publishedData")
  );
  while (true) {
    // console.log("running updatedItemSaga, inside loop...");
    const item = yield take(updateChannel);
    // console.log(
    //   "from FB item=" + JSON.stringify(item, null, 4).substring(0, 200)
    // );
    let overwriteLocal = false;
    try {
      // console.log("getting local data");
      const existingBandsDataString = yield AsyncStorage.getItem(
        "localPublishedData"
      );
      // console.log("type of existingBandsData=" + typeof existingBandsDataString);
      const existingBandsData = JSON.parse(existingBandsDataString);
      // console.log("existingBandsData=" + JSON.stringify(existingBandsData, null, 4).substring(0, 200));
      if (!deepEqual(existingBandsData, item.value)) {
        console.log("local and server don't match, so update...");
        overwriteLocal = true;
      } else {
        console.log("local and server match, don't update..");
      }
    } catch (e) {
      console.log(
        "Error in parsing local storage.  Overwriting with Firebase.  Error=" +
          e
      );
      overwriteLocal = true;
    } finally {
      if (overwriteLocal) {
        console.log("Clearing images cache, the whole smash....");
        ImageCache.get().clear();

        yield AsyncStorage.setItem(
          "localPublishedData",
          JSON.stringify(item.value)
        );
        yield put({ type: "LOAD_BANDS_NOW" });
      }
    }

  }
}
*/

/*
// worker Saga: will be fired on LOAD_BANDS_NOW actions
function* loadBandsGen() {
  // yield console.log("loadBands() triggered in sagas.js");ß
  yield all([
    put(homeDuxActions.setFetchHomeRequest()),
    put(bandsDuxActions.setFetchBandsRequest()),
    put(appearancesDuxActions.setFetchAppearancesRequest())
  ]);
  try {
    // const bandsDataNormalised = yield call(bandsApi.fetchBandsData);
    const bandsDataNormalisedString = yield AsyncStorage.getItem(
      "localPublishedData"
    );
    // console.log(
    //   "typeof bandsDataNormalisedString=" + typeof bandsDataNormalisedString
    // );ß
    // console.log(
    //   "bandsDataNormalisedString=" + bandsDataNormalisedString.substring(0, 200)
    // );
    const bandsDataNormalised = JSON.parse(bandsDataNormalisedString);
    // yield console.log(
    //   "bandsDataNormalised" +
    //     JSON.stringify(bandsDataNormalised, null, 4).substring(0, 200)
    // );
    // console.log("Data parsed");
    // .filter(bandMember => bandMember.bandId && bandMember.bandId !== "")

    // Filter out any half-completed data that we might have pulled
    // down from Firebase
    //
    const homeText = bandsDataNormalised.homePageText || "Helstonbury...";
    const bandsArray = bandsDataNormalised.bandsArray.filter(
      bandMember => bandMember.bandId && bandMember.bandId !== ""
    );
    const appearancesArray = bandsDataNormalised.appearancesArray.filter(
      appearancesMember =>
        appearancesMember.bandId && appearancesMember.bandId !== ""
    );

    yield all([
      put(homeDuxActions.setFetchHomeSucceeded(homeText)),
      put(bandsDuxActions.setFetchBandsSucceeded(bandsArray)),
      put(appearancesDuxActions.setFetchAppearancesSucceeded(appearancesArray))
    ]);
  } catch (e) {
    console.log("loadBandsGen error=" + e);
    yield all([
      put(bandsDuxActions.setFetchBandsFailed(e)),
      put(appearancesDuxActions.setFetchAppearancesFailed(e))
    ]);
  }
}
*/

//  yield takeLatest(loadBandsNow(), loadBandsGen);

// const db = firebaseApp.database();

// const myRef = db.ref("publishedData");
// console.log("ref = " + myRef);
// myRef.on("value", snapshot => {
//   console.log("publishedData snapshot");
//   console.log(snapshot.val());
// });

function* mySaga() {
  // yield takeLatest(loadBandsNow().type, loadBandsGen);
  yield fork(readBandsSaga);
  yield fork(readStagesSaga);
}

// Need to change this to write to async storage
// Then need to change bandsApi to read from async storage
// or better still, do it right here in the Saga.

export default mySaga;
