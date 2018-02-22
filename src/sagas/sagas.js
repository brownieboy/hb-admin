// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { AsyncStorage } from "react-native";
import { buffers, eventChannel } from "redux-saga";
import { all, fork, put, select, take, takeLatest } from "redux-saga/effects";
// import FastImage from "react-native-fast-image";
import { ImageCache } from "react-native-img-cache";
import deepEqual from "deep-equal";
import firebaseApp from "../api/firebase.js";

import preloadRNICimages from "../helper-functions/preload-rnic-images.js";

// import bandsApi from "../api/bandsApi.js";
import {
  bandsDuxActions,
  // bandsDuxConstants,
  loadBandsNow
} from "./bandsReducer.js";
import {
  appearancesDuxActions
  // appearancesDuxConstants
} from "./appearancesReducer.js";
import { homeDuxActions } from "./homeReducer.js";
import {
  favouritesDuxActions,
  loadFavouritesNow
} from "./favouritesReducer.js";

/*
FastImage.preload([
  {
    uri: 'https://facebook.github.io/react/img/logo_og.png',
    headers: { Authorization: 'someAuthToken' },
  },
  {
    uri: 'https://facebook.github.io/react/img/logo_og.png',
    headers: { Authorization: 'someAuthToken' },
  },
])
 */

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

    // let response = yield AsyncStorage.getItem("localPublishedData");
    // console.log(
    //   "data from storage = " +
    //     JSON.stringify(response, null, 4).substring(0, 200)
    // );
  }
}

const preloadImages = bandsArray => {
  const arrayLength = bandsArray.length;
  const preloadArray = [];
  for (let x = 0; x < arrayLength; x++) {
    // preloadArray.push({ uri: bandsArray[x].thumbFullUrl });
    // preloadArray.push({ uri: bandsArray[x].cardFullUrl });
    if (bandsArray[x].thumbFullUrl && bandsArray[x].thumbFullUrl !== "") {
      preloadArray.push(bandsArray[x].thumbFullUrl);
    }
    if (bandsArray[x].cardFullUrl && bandsArray[x].cardFullUrl !== "") {
      preloadArray.push(bandsArray[x].cardFullUrl);
    }
  }
  // console.log("preloadArray=" + JSON.stringify(preloadArray, null, 4));
  // console.log("Preloading...preloadArray=" + JSON.stringify(preloadArray, null, 4));
  // FastImage.preload(preloadArray);
  preloadRNICimages(preloadArray);
};

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
    preloadImages(bandsArray);
  } catch (e) {
    console.log("loadBandsGen error=" + e);
    yield all([
      put(bandsDuxActions.setFetchBandsFailed(e)),
      put(appearancesDuxActions.setFetchAppearancesFailed(e))
    ]);
  }
}

function* loadFavouritesGen() {
  console.log("getting favourites");
  yield put(favouritesDuxActions.setFetchFavouritesRequest());
  try {
    // const bandsDataNormalised = yield call(bandsApi.fetchBandsData);
    const favouritesString = yield AsyncStorage.getItem("localFavourites");
    const favourites = JSON.parse(favouritesString);
    yield put(favouritesDuxActions.setFetchFavouritesSucceeded(favourites));
  } catch (e) {
    console.log("loadFavouritesGen error=" + e);
    yield put(favouritesDuxActions.setFetchAppearancesFailed(e));
  }
}

     // yield AsyncStorage.setItem(
     //      "localPublishedData",
     //      JSON.stringify(item.value)
     //    );

function* toggleFavouriteGen(bandObj) {
  // console.log("toggling favourite " + JSON.stringify(bandObj, null, 4));
  const state = yield select();
  const newFavourites = state.favouritesState.favourites;
  // console.log("toggling favourite state is " + JSON.stringify(state, null, 4));
  // console.log("newFavourites is "+ newFavourites);

  yield AsyncStorage.setItem("localFavourites", JSON.stringify(newFavourites));
}

function* mySaga() {
  // yield takeLatest(bandsDuxConstants.LOAD_BANDS_NOW, loadBandsGen);
  yield takeLatest(loadBandsNow().type, loadBandsGen);
  yield takeLatest(loadFavouritesNow().type, loadFavouritesGen);
  yield takeLatest(
    favouritesDuxActions.toggleBandFavouriteStatus().type,
    toggleFavouriteGen
  );
  yield fork(updatedItemSaga);
}

//  yield takeLatest(loadBandsNow(), loadBandsGen);

// const db = firebaseApp.database();

// const myRef = db.ref("publishedData");
// console.log("ref = " + myRef);
// myRef.on("value", snapshot => {
//   console.log("publishedData snapshot");
//   console.log(snapshot.val());
// });

// Need to change this to write to async storage
// Then need to change bandsApi to read from async storage
// or better still, do it right here in the Saga.

export default mySaga;
