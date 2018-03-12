import { createSelector } from "reselect";

import { stringSort } from "../helper-functions/sorting.js";

// Action type constants
const LOAD_BANDS_NOW = "LOAD_BANDS_NOW"; // Imperative, hence "NOW"!
const FETCH_BANDS_REQUEST = "FETCH_BANDS_REQUEST";
const FETCH_BANDS_SUCCESS = "FETCH_BANDS_SUCCESS";
const FETCH_BANDS_FAILURE = "FETCH_BANDS_FAILURE";
const SAVE_NEW_BAND = "SAVE_NEW_BAND";
const SAVE_EDITED_BAND = "SAVE_EDITED_BAND";
const SAVE_BAND_REQUEST = "SAVE_BAND_REQUEST";
const SAVE_BAND_SUCCESS = "SAVE_BAND_SUCCESS";
const SAVE_BAND_FAILED = "SAVE_BAND_FAILED";
const SAVE_BAND_CLEAR = "SAVE_BAND_CLEAR";
const UPDATE_BAND_THUMB_URL = "UPDATE_BAND_THUMB_URL";
const UPDATE_BAND_CARD_URL = "UPDATE_BAND_CARD_URL";

export const actionTypes = {
  SAVE_NEW_BAND,
  SAVE_EDITED_BAND,
  SAVE_BAND_REQUEST,
  SAVE_BAND_SUCCESS,
  SAVE_BAND_FAILED
};

// Reducer
const bandsReducer = (
  state = { fetchStatus: "", fetchError: "", bandsList: [] },
  action
) => {
  let idx, newBandsList, currentBandObj;
  switch (action.type) {
    case FETCH_BANDS_REQUEST:
      return { ...state, fetchStatus: "loading" };
    case FETCH_BANDS_SUCCESS:
      console.log("FETCH_BANDS_SUCCESS");
      return {
        ...state,
        fetchStatus: "",
        bandsList: action.payload
      };
    case FETCH_BANDS_FAILURE:
      return { ...state, fetchStatus: "failure", fetchError: action.payload };
    case SAVE_NEW_BAND:
      return { ...state, bandsList: [...state.bandsList, action.payload] };
    case SAVE_BAND_REQUEST:
      return {
        ...state,
        saveStatus: "saving"
      };
    case SAVE_BAND_SUCCESS:
      return {
        ...state,
        saveStatus: "success"
      };
    case SAVE_BAND_CLEAR:
      return {
        ...state,
        saveStatus: ""
      };
    case SAVE_BAND_FAILED:
      return { ...state, saveStatus: "failure", saveError: action.payload };
    case SAVE_EDITED_BAND:
      idx = state.bandsList.findIndex(
        bandObj => bandObj.id === action.payload.id
      );
      newBandsList = [
        ...state.bandsList.slice(0, idx),
        action.payload,
        ...state.bandsList.slice(idx + 1)
      ];
      return { ...state, bandsList: newBandsList };

    case UPDATE_BAND_THUMB_URL:
      console.log("UPDATE_BAND_THUMB_URL reducer");
      idx = state.bandsList.findIndex(
        bandObj => bandObj.id === action.payload.bandId
      );
      currentBandObj = state.bandsList.slice()[idx];
      currentBandObj.thumbFullUrl = action.payload.downloadUrl;
      newBandsList = [
        ...state.bandsList.slice(0, idx),
        currentBandObj,
        ...state.bandsList.slice(idx + 1)
      ];
      return { ...state, bandsList: newBandsList };

    case UPDATE_BAND_CARD_URL:
      console.log("UPDATE_BAND_CARD_URL reducer");
      idx = state.bandsList.findIndex(
        bandObj => bandObj.id === action.payload.bandId
      );
      currentBandObj = state.bandsList.slice()[idx];
      currentBandObj.cardFullUrl = action.payload.downloadUrl;
      newBandsList = [
        ...state.bandsList.slice(0, idx),
        currentBandObj,
        ...state.bandsList.slice(idx + 1)
      ];
      return { ...state, bandsList: newBandsList };

    default:
      return state;
  }
};

// Sort/filter functions for selectors
const selectBands = state => state.bandsList || [];

// Selectors
// const selectBandsByDateTime = createSelector([selectBands], bandsList => {
//   return bandsList.slice().sort((a, b) => {
//     return a.appearances &&
//       b.appearances & (a.appearances.length > 0) &&
//       b.appearances.length > 0
//       ? new Date(a.appearances[0].dateTimeStart) -
//           new Date(b.appearances[0].dateTimeStart)
//       : 1;
//   });
// });

const selectAlphabetical = createSelector([selectBands], bandsList =>
  stringSort(bandsList.slice(), "name")
);

// const selectAlphabetical = () => selectBands();

// const selectPeopleAlpha = createSelector([selectPeople], peopleList =>
//   stringSort(peopleList.slice(), "name")
// );

const selectBandsPicker = createSelector([selectAlphabetical], bandsList =>
  bandsList.map(bandMember => ({
    id: bandMember.id,
    name: bandMember.name
  }))
);

export const selectors = {
  selectAlphabetical,
  selectBandsPicker
};

/*
// Sort/filter functions for selectors
const selectPeople = state => state.people.peopleList;
// const selectSortStyle = state => state.people.sortStyle;

// Selectors
const selectPeopleDateStartReverse = createSelector(
  [selectPeople],
  peopleList =>
    peopleList
      .slice()
      .sort((a, b) => new Date(b.dateTimeStart) - new Date(a.dateTimeStart))
);

const selectPeopleAlpha = createSelector([selectPeople], peopleList =>
  stringSort(peopleList.slice(), "name")
);

const selectPeopleStateSortOrder = createSelector([selectPeople], peopleList =>
  peopleList.slice().sort((a, b) => a.stateSortOrder - b.stateSortOrder)
);

const selectPeopleStateSortOrderThenDate = createSelector(
  [selectPeople],
  peopleList =>
    peopleList
      .slice()
      .sort(
        (a, b) =>
          a.stateSortOrder - b.stateSortOrder ||
          (a.dateTimeStart && b.dateTimeStart
            ? new Date(a.dateTimeStart) - new Date(b.dateTimeStart)
            : 1)
      )
);

export const selectors = {
  selectPeopleAlpha,
  selectPeopleDateStartReverse,
  selectPeopleStateSortOrder,
  selectPeopleStateSortOrderThenDate
};


 */

export const loadBandsNow = () => ({ type: LOAD_BANDS_NOW });
// export const fetchBandsSucceeded = () => ({ type: FETCH_BANDS_REQUEST });

const setFetchBandsRequest = () => ({
  type: FETCH_BANDS_REQUEST
});
const setFetchBandsSucceeded = bandsList => ({
  type: FETCH_BANDS_SUCCESS,
  payload: bandsList || []
});
const setFetchBandsFailed = errorMessage => ({
  type: FETCH_BANDS_FAILURE,
  payload: errorMessage
});

export const saveNewBand = BandInfo => ({
  type: SAVE_NEW_BAND,
  payload: BandInfo
});

export const saveEditedBand = BandInfo => ({
  type: SAVE_EDITED_BAND,
  payload: BandInfo
});

export const saveBandRequest = () => ({
  type: SAVE_BAND_REQUEST
});

export const saveBandSucceeded = () => ({
  type: SAVE_BAND_SUCCESS
});

export const saveBandClear = () => ({
  type: SAVE_BAND_CLEAR
});

export const saveBandFailed = error => ({
  type: SAVE_BAND_FAILED,
  payload: error
});

const updateBandThumbUrl = updateInfo => ({
  type: UPDATE_BAND_THUMB_URL,
  payload: updateInfo // {bandId, downloadUrl}
});
const updateBandCardUrl = updateInfo => ({
  type: UPDATE_BAND_CARD_URL,
  payload: updateInfo // {bandId, downloadUrl}
});

export const bandsDuxActions = {
  setFetchBandsFailed,
  setFetchBandsRequest,
  setFetchBandsSucceeded,
  saveBandRequest,
  saveBandSucceeded,
  saveNewBand,
  saveBandFailed,
  updateBandCardUrl,
  updateBandThumbUrl
};

// Getters
export const getBandInfoForId = (bandsList, bandId) =>
  (bandsList ? bandsList.find(bandMember => bandMember.id === bandId) : null);

// export const bandsDuxConstants = {
//   LOAD_BANDS_NOW,
//   FETCH_BANDS_REQUEST,
//   FETCH_BANDS_SUCCESS,
//   FETCH_BANDS_FAILURE
// };

export default bandsReducer;

// A thunk must return a function, hence the double () => dispatch =>
// export const loadBands = () => dispatch => {
//   dispatch(loadingBands(true));
//   bandsApi
//     .getBandsData()
//     .then(bandsData => {
//       // addFireBaseImagesToData(bandsData);
//       console.log(
//         "bandsData in reducer=" + JSON.stringify(bandsData[0], null, 4)
//       );
//       dispatch(
//         batchActions([loadedBandsSuccess(bandsData), loadingBands(false)])
//       );
//     })
//     .catch(err => {
//       console.log(`error in data retrieval: ${err}`);
//       dispatch(batchActions([loadedBandsFailure(), loadingBands(false)]));
//       return err;
//     });
// };
