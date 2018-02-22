import { createSelector } from "reselect";

import { stringSort } from "../helper-functions/sorting.js";

// Action type constants
const LOAD_BANDS_NOW = "LOAD_BANDS_NOW"; // Imperative, hence "NOW"!
const FETCH_BANDS_REQUEST = "FETCH_BANDS_REQUEST";
const FETCH_BANDS_SUCCESS = "FETCH_BANDS_SUCCESS";
const FETCH_BANDS_FAILURE = "FETCH_BANDS_FAILURE";

// Reducer
const bandsReducer = (
  state = { fetchStatus: "", fetchError: "", bandsList: [] },
  action
) => {
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
    default:
      return state;
  }
};

// Sort/filter functions for selectors
const selectBands = state => state.bandsList;

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

export const selectors = {
  selectAlphabetical
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
  payload: bandsList
});
const setFetchBandsFailed = errorMessage => ({
  type: FETCH_BANDS_FAILURE,
  payload: errorMessage
});

export const bandsDuxActions = {
  setFetchBandsFailed,
  setFetchBandsRequest,
  setFetchBandsSucceeded
};

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
