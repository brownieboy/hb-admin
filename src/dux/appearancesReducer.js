// import { createSelector } from "reselect";
import * as d3 from "d3-collection";
import { format } from "date-fns";
import { getBandInfoForId } from "./bandsReducer.js";
import { getStageInfoForId } from "./stagesReducer.js";

// import { d3 } from "d3-collection";
// import { stringThenDateTimeSort } from "../helper-functions/sorting.js";

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
const DELETE_APPEARANCES = "DELETE_APPEARANCES";

export const actionTypes = {
  SAVE_NEW_APPEARANCE,
  SAVE_EDITED_APPEARANCE,
  SAVE_APPEARANCE_REQUEST,
  SAVE_APPEARANCE_SUCCESS,
  SAVE_APPEARANCE_FAILED,
  DELETE_APPEARANCES
};

// Reducer
const appearancesReducer = (
  state = {
    fetchStatus: "",
    fetchError: "",
    saveStatus: "",
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

    case DELETE_APPEARANCES:
      newAppearancesList = state.appearancesList.filter(
        appearanceMember => action.payload.indexOf(appearanceMember.id) < 0
      );
      return { ...state, appearancesList: newAppearancesList };

    default:
      return state;
  }
};

// Sort/filter functions for selectors
// Definitely *is* being used.  So where is its state from?
const selectAppearances = state => state.appearancesList;

// Selectors use redux-select and are memoised.  But they need to be called
// before they get memoised!
// const selectAppearancesByDateTime = createSelector(
//   [selectAppearances],
//   appearancesList =>
//     appearancesList
//       .slice()
//       .sort((a, b) => new Date(a.dateTimeStart) - new Date(b.dateTimeStart))
// );

// Getters are just functions.
const getAppearancesByDateTime = appearancesList => {
  const newAppearances = [...appearancesList];
  return newAppearances
    .slice()
    .sort((a, b) => new Date(a.dateTimeStart) - new Date(b.dateTimeStart));
};

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
  const bandsList = state.bandsState.bandsList;
  const stagesList = state.stagesState.stagesList;
  let matchingBand, matchingStage, newAppearance;
  // const appearancesRaw = selectAppearancesByDateTime(state.appearancesState);
  const appearancesRaw = getAppearancesByDateTime(
    state.appearancesState.appearancesList
  );

  // const appearancesRaw = state.appearancesState.appearancesList;
  const appearancesWithBandNames = appearancesRaw.map(appearance => {
    matchingBand = getBandInfoForId(bandsList, appearance.bandId);
    matchingStage = getStageInfoForId(stagesList, appearance.stageId);
    // console.log("matchingStage");
    // console.log(matchingStage);
    newAppearance = { ...appearance };
    if (matchingBand) {
      newAppearance = {
        ...newAppearance,
        bandName: matchingBand.name,
        name: matchingBand.name,
        bandSummary: matchingBand.summary,
        bandThumbFullUrl: matchingBand.thumbFullUrl || null
      };
    }
    if (matchingStage) {
      newAppearance = {
        ...newAppearance,
        stageName: matchingStage.name,
        stageSummary:  // Because stage summary wasn't an original field
          typeof matchingStage.summary !== "undefined"
            ? matchingStage.summary
            : "",
        stageSortOrder: matchingStage.sortOrder
      };
    }
    return newAppearance;
  });
  // console.log(
  //   "appearancesReducer..getAppearancesWithBandAndStageNames returns:"
  // );
  // console.log(appearancesWithBandNames);
  return appearancesWithBandNames;
};

// Grouped by day, but within that sorted by start time then
// stage sort order
export const getAppearancesGroupedByDay = state => {
  const appearancesList = [...getAppearancesWithBandAndStageNames(state)];

  return d3
    .nest()
    .key(appearance =>
      format(new Date(appearance.dateTimeStart), "dddd DD/MM/YYYY")
    )
    .sortKeys(
      (a, b) => parseInt(a.split("~")[0], 10) - parseInt(b.split("~")[0], 10)
    )
    .entries(appearancesList);
};

export const getAppearancesGroupedByDayThenStage = state => {
  const appearancesList = [...getAppearancesWithBandAndStageNames(state)];

  return d3
    .nest()
    .key(appearance =>
      format(new Date(appearance.dateTimeStart), "dddd DD/MM/YYYY")
    )
    .key(appearance => `${appearance.stageSortOrder}~${appearance.stageName}`)
    .sortKeys(
      (a, b) => parseInt(a.split("~")[0], 10) - parseInt(b.split("~")[0], 10)
    )
    .entries(appearancesList.slice());
};

// export const selectAppearancesGroupedByDayThenStage = createSelector(
//   // [selectAppearancesByDateTime],
//   [getAppearancesWithBandAndStageNames],
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

// export const selectors = {
//   selectAppearancesByDateTime,
//   // selectAppearancesByBandNameThenDateTime
//   selectAppearancesGroupedByDayThenStage
// };

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

export const getAppearancesForStageId = (appearancesList, stageId) =>
  appearancesList.filter(appearance => appearance.stageId === stageId);

export const getAppearancesForBandId = (appearancesList, bandId) => {
  // console.log("getAppearancesForBandId bandId=" + bandId + ", appearancesList");
  // console.log(appearancesList);
  const matchingAppearances = appearancesList.filter(
    appearance => appearance.bandId === bandId
  );
  console.log("matchingAppearances for bandId:" + bandId);
  console.log(matchingAppearances);

  return matchingAppearances;
};

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

export const deleteAppearances = appearanceIdsArray => ({
  type: DELETE_APPEARANCES,
  payload: appearanceIdsArray
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
