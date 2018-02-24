// import { createSelector } from "reselect";

// import { stringSort } from "../helper-functions/sorting.js";

// Action type constants
const LOAD_STAGES_NOW = "LOAD_STAGES_NOW"; // Imperative, hence "NOW"!
const FETCH_STAGES_REQUEST = "FETCH_STAGES_REQUEST";
const FETCH_STAGES_SUCCESS = "FETCH_STAGES_SUCCESS";
const FETCH_STAGES_FAILURE = "FETCH_STAGES_FAILURE";
const SAVE_NEW_STAGE = "SAVE_NEW_STAGE";
const SAVE_EDITED_STAGE = "SAVE_EDITED_STAGE";

export const actionTypes = {
  SAVE_NEW_STAGE,
  SAVE_EDITED_STAGE
};

// Reducer
const stagesReducer = (
  state = { fetchStatus: "", fetchError: "", stagesList: [] },
  action
) => {
  switch (action.type) {
    case FETCH_STAGES_REQUEST:
      return { ...state, fetchStatus: "loading" };
    case FETCH_STAGES_SUCCESS:
      return {
        ...state,
        fetchStatus: "",
        stagesList: action.payload
      };
    case FETCH_STAGES_FAILURE:
      return { ...state, fetchStatus: "failure", fetchError: action.payload };
    case SAVE_NEW_STAGE:
      return { ...state, stagesList: [...state.stagesList, action.payload] };
    default:
      return state;
  }
};

// Sort/filter functions for selectors
// const selectStages = state => state.stagesList;

export const loadStagesNow = () => ({ type: LOAD_STAGES_NOW });
// export const fetchStagesSucceeded = () => ({ type: FETCH_STAGES_REQUEST });

const setFetchStagesRequest = () => ({
  type: FETCH_STAGES_REQUEST
});
const setFetchStagesSucceeded = stagesList => ({
  type: FETCH_STAGES_SUCCESS,
  payload: stagesList
});
const setFetchStagesFailed = errorMessage => ({
  type: FETCH_STAGES_FAILURE,
  payload: errorMessage
});

export const saveNewStage = stageInfo => ({
  type: SAVE_NEW_STAGE,
  payload: stageInfo
});

export const saveEditedStage = stageInfo => ({
  type: SAVE_EDITED_STAGE,
  payload: stageInfo
});

export const stagesDuxActions = {
  setFetchStagesFailed,
  setFetchStagesRequest,
  setFetchStagesSucceeded,
  saveNewStage
};

// Getters
export const getStageInfoForId = (stagesList, stageId) =>
  stagesList.find(stageMember => stageMember.id === stageId);

export default stagesReducer;