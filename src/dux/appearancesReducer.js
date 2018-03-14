import { createSelector } from "reselect";
import * as d3 from "d3-collection";
import { format } from "date-fns";
import { getBandInfoForId } from "./bandsReducer.js";
import { getStageInfoForId } from "./stagesReducer.js";

// import { d3 } from "d3-collection";
import { stringThenDateTimeSort } from "../helper-functions/sorting.js";

// Action type constants
const LOAD_APPEARANCES_NOW = "LOAD_APPEARANCES_NOW"; // Imperative, hence "NOW"!
const FETCH_APPEARANCES_REQUEST = "FETCH_APPEARANCES_REQUEST";
const FETCH_APPEARANCES_SUCCESS = "FETCH_APPEARANCES_SUCCESS";
const FETCH_APPEARANCES_FAILURE = "FETCH_APPEARANCES_FAILURE";
const SAVE_NEW_APPEARANCE = "SAVE_NEW_APPEARANCE";
const SAVE_EDITED_APPEARANCE = "SAVE_EDITED_APPEARANCE";
const SAVE_APPEARANCE_REQUEST = "SAVE_APPEARANCE_REQUEST";
const SAVE_APPEARANCE_SUCCESS = "SAVE_APPEARANCE_SUCCESS";
const SAVE_APPEARANCE_FAILED = "SAVE_APPEARANCE_FAILED";
const SAVE_APPEARANCE_CLEAR = "SAVE_APPEARANCE_CLEAR";

export const actionTypes = {
  SAVE_NEW_APPEARANCE,
  SAVE_EDITED_APPEARANCE,
  SAVE_APPEARANCE_REQUEST,
  SAVE_APPEARANCE_SUCCESS,
  SAVE_APPEARANCE_FAILED
};

// Reducer
const appearancesReducer = (
  state = {
    fetchStatus: "",
    fetchError: "",
    saveStatus: "",
    fetchError: "",
    appearancesList: []
  },
  action
) => {
  let idx, newAppearancesList;

  switch (action.type) {
    case FETCH_APPEARANCES_REQUEST:
      return { ...state, fetchStatus: "loading" };
    case FETCH_APPEARANCES_SUCCESS:
      return {
        ...state,
        fetchStatus: "",
        appearancesList: action.payload
      };
    case FETCH_APPEARANCES_FAILURE:
      return { ...state, fetchStatus: "failure", fetchError: action.payload };
    case SAVE_NEW_APPEARANCE:
      return {
        ...state,
        appearancesList: [...state.appearancesList, action.payload]
      };
    case SAVE_APPEARANCE_REQUEST:
      return {
        ...state,
        saveStatus: "saving"
      };
    case SAVE_APPEARANCE_SUCCESS:
      return {
        ...state,
        saveStatus: "success"
      };
    case SAVE_APPEARANCE_CLEAR:
      return {
        ...state,
        saveStatus: ""
      };
    case SAVE_APPEARANCE_FAILED:
      return { ...state, saveStatus: "failure", saveError: action.payload };
    case SAVE_EDITED_APPEARANCE:
      idx = state.appearancesList.findIndex(
        obj => obj.id === action.payload.id
      );
      newAppearancesList = [
        ...state.appearancesList.slice(0, idx),
        action.payload,
        ...state.appearancesList.slice(idx + 1)
      ];
      return { ...state, appearancesList: newAppearancesList };

    default:
      return state;
  }
};

// Sort/filter functions for selectors
// Definitely *is* being used.  So where is its state from?
const selectAppearances = state => state.appearancesList;

// Selectors
const selectAppearancesByDateTime = createSelector(
  [selectAppearances],
  appearancesList =>
    appearancesList
      .slice()
      .sort((a, b) => new Date(a.dateTimeStart) - new Date(b.dateTimeStart))
);

// const selectAppearancesByDateTimeWithNames = createSelector

// const selectBandsByDateTime = createSelector(
//   [selectBands],
//   bandsList =>
//     bandsList
// );
//

/*
export const getVisibleTodos = (state, filter) => {
  switch (filter) {
    case 'all':
      return state;
    case 'completed':
      return state.filter(t => t.completed);
    case 'active':
      return state.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};
 */

// export const getAppearancesWithBandAndStageNames = state => {
//   const bandsList = state.bandsState.bandsList;
//   const stagesList = state.stagesState.stagesList();

//   return ["a", "b"];
// };

export const getAppearancesWithBandAndStageNames = state => {
  console.log("appearancesReducer..getAppearancesWithBandAndStageNames start");
  const bandsList = state.bandsState.bandsList.slice();
  const stagesList = state.stagesState.stagesList.slice();
  let matchingBand, matchingStage, newAppearance;
  // const appearancesRaw = selectAppearancesByDateTime(
  //   state.appearancesState
  // ).slice(); // Defensive copying.
  const appearancesRaw = state.appearancesState.appearancesList.slice(); // Defensive copying.
  const appearancesWithBandNames = appearancesRaw.map(appearance => {
    matchingBand = getBandInfoForId(bandsList, appearance.bandId);
    matchingStage = getStageInfoForId(stagesList, appearance.stageId);
    newAppearance = { ...appearance };
    if (matchingBand) {
      // appearance.bandName = matchingBand.name;
      newAppearance = { ...newAppearance, bandName: matchingBand.name };
    }
    if (matchingStage) {
      // appearance.stageName = matchingStage.name;
      // appearance.stageSortOrder = matchingStage.sortOrder;
      newAppearance = {
        ...newAppearance,
        stagename: matchingStage.name,
        stageSortOrder: matchingStage.sortOrder
      };
    }
    return newAppearance;
  });
  console.log(
    "appearancesReducer..getAppearancesWithBandAndStageNames returns:"
  );
  console.log(appearancesWithBandNames);
  return appearancesWithBandNames;
};

// const selectAppearancesGroupedByDayThenStage = createSelector(
//   [selectAppearancesByDateTime],
//   // [getAppearancesWithBandAndStageNames],
//   appearancesList =>
//     d3
//       .nest()
//       .key(appearance => format(new Date(appearance.dateTimeStart), "dddd"))
//       .key(appearance => `${appearance.stageSortOrder}~${appearance.stageName}`)
//       .sortKeys(
//         (a, b) => parseInt(a.split("~")[0], 10) - parseInt(b.split("~")[0], 10)
//       )
//       .entries(appearancesList.slice())
// );

/*
const nest = d3.nest()
    .key(d => +d.date)
    .sortKeys((a, b) => a - b)
    .entries(data);
*/

// const selectAppearancesByBandNameThenDateTime = createSelector(
//   [selectAppearances],
//   appearancesList =>
//     stringThenDateTimeSort(appearancesList.slice(), "name", "dateTimeStart")
// );

// These getters have a supplied parameter, so they'll channge ever time.  Hence no
// point in using Reselect library with them.
// The function actually returns a function that's a closure over selectAppearancesByBandNameThenDateTimem
// so needs to be run in the connector.
// const getAppearancesForBand = () => bandKey =>
//   selectAppearancesByBandNameThenDateTime
//     .slice()
//     .filter(bandMember => bandMember.bandId === bandKey);

// const selectAppearancesByDateTime = () => [];

export const selectors = {
  selectAppearancesByDateTime
  // selectAppearancesByBandNameThenDateTime
  // selectAppearanceGroupedByDayThenStage
};

/*
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


export const selectors = {
  selectPeopleAlpha,
  selectPeopleDateStartReverse,
  selectPeopleStateSortOrder,
  selectPeopleStateSortOrderThenDate
};


 */

// Getters
// Note that we're computing the appearanceId in appearances list rather than storing
// it in Redux.  Doing the latter might be quicker for computational speed, but would
// mean storing duplicate data
export const getAppearanceInfoForId = (appearancesList, appearanceId) =>
  appearancesList.find(
    appearanceMember => appearanceMember.id === appearanceId
  );

// New one

// Action creators
export const loadAppearances = () => ({ type: LOAD_APPEARANCES_NOW });

const setFetchAppearancesRequest = () => ({
  type: FETCH_APPEARANCES_REQUEST
});
const setFetchAppearancesSucceeded = appearancesList => ({
  type: FETCH_APPEARANCES_SUCCESS,
  payload: appearancesList || []
});
const setFetchAppearancesFailed = errorMessage => ({
  type: FETCH_APPEARANCES_FAILURE,
  payload: errorMessage
});

export const saveNewAppearance = appearanceInfo => ({
  type: SAVE_NEW_APPEARANCE,
  payload: appearanceInfo
});

export const saveEditedAppearance = appearanceInfo => ({
  type: SAVE_EDITED_APPEARANCE,
  payload: appearanceInfo
});

export const saveAppearanceRequest = () => ({
  type: SAVE_APPEARANCE_REQUEST
});

export const saveAppearanceSucceeded = () => ({
  type: SAVE_APPEARANCE_SUCCESS
});

export const saveAppearanceFailed = error => ({
  type: SAVE_APPEARANCE_FAILED,
  payload: error
});

export const saveAppearanceClear = () => ({
  type: SAVE_APPEARANCE_CLEAR
});

export const appearancesDuxActions = {
  setFetchAppearancesFailed,
  setFetchAppearancesRequest,
  setFetchAppearancesSucceeded,
  saveAppearanceRequest,
  saveAppearanceSucceeded,
  saveNewAppearance,
  saveAppearanceFailed,
  saveAppearanceClear
};

export const appearancesDuxConstants = {
  LOAD_APPEARANCES_NOW,
  FETCH_APPEARANCES_REQUEST,
  FETCH_APPEARANCES_SUCCESS,
  FETCH_APPEARANCES_FAILURE
};

export default appearancesReducer;
