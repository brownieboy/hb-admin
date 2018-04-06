import { createSelector } from "reselect";

// import { stringSort } from "../helper-functions/sorting.js";

// Action type constants
const LOAD_STAGES_NOW = "LOAD_STAGES_NOW"; // Imperative, hence "NOW"!
const FETCH_STAGES_REQUEST = "FETCH_STAGES_REQUEST";
const FETCH_STAGES_SUCCESS = "FETCH_STAGES_SUCCESS";
const FETCH_STAGES_FAILURE = "FETCH_STAGES_FAILURE";
const SAVE_NEW_STAGE = "SAVE_NEW_STAGE";
const SAVE_EDITED_STAGE = "SAVE_EDITED_STAGE";
const SAVE_STAGE_REQUEST = "SAVE_STAGE_REQUEST";
const SAVE_STAGE_SUCCESS = "SAVE_STAGE_SUCCESS";
const SAVE_STAGE_FAILED = "SAVE_STAGE_FAILED";
const SAVE_STAGE_CLEAR = "SAVE_STAGE_CLEAR";
const DELETE_STAGES = "DELETE_STAGES";

export const actionTypes = {
  SAVE_NEW_STAGE,
  SAVE_EDITED_STAGE,
  SAVE_STAGE_REQUEST,
  SAVE_STAGE_SUCCESS,
  SAVE_STAGE_FAILED,
  DELETE_STAGES
};

// Reducer
const stagesReducer = (
  state = {
    fetchStatus: "",
    fetchError: "",
    saveStage: "",
    saveError: {},
    stagesList: []
  },
  action
) => {
  let idx, newStagesList;
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
    case SAVE_STAGE_REQUEST:
      return {
        ...state,
        saveStatus: "saving"
      };
    case SAVE_STAGE_SUCCESS:
      return {
        ...state,
        saveStatus: "success"
      };
    case SAVE_STAGE_CLEAR:
      return {
        ...state,
        saveStatus: ""
      };
    case SAVE_STAGE_FAILED:
      return { ...state, saveStatus: "failure", saveError: action.payload };
    case SAVE_EDITED_STAGE:
      idx = state.stagesList.findIndex(obj => obj.id === action.payload.id);
      newStagesList = [
        ...state.stagesList.slice(0, idx),
        action.payload,
        ...state.stagesList.slice(idx + 1)
      ];
      return { ...state, stagesList: newStagesList };
    case DELETE_STAGES:
      newStagesList = state.stagesList.filter(
        stageMember => action.payload.indexOf(stageMember.id) < 0
      );
      return { ...state, stagesList: newStagesList };
    default:
      return state;
  }
};

// Sort/filter functions for selectors
export const selectStages = state => state.stagesState.stagesList;
const selectStagesPicker = createSelector([selectStages], stagesList =>
  stagesList.map(stageMember => ({
    id: stageMember.id,
    name: stageMember.name
  }))
);

export const selectors = {
  selectStagesPicker
};

export const loadStagesNow = () => ({ type: LOAD_STAGES_NOW });
// export const fetchStagesSucceeded = () => ({ type: FETCH_STAGES_REQUEST });

const setFetchStagesRequest = () => ({
  type: FETCH_STAGES_REQUEST
});
const setFetchStagesSucceeded = stagesList => ({
  type: FETCH_STAGES_SUCCESS,
  payload: stagesList || []
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

export const saveStageRequest = () => ({
  type: SAVE_STAGE_REQUEST
});

export const saveStageSucceeded = () => ({
  type: SAVE_STAGE_SUCCESS
});

export const saveStageFailed = error => ({
  type: SAVE_STAGE_FAILED,
  payload: error
});

export const saveStageClear = () => ({
  type: SAVE_STAGE_CLEAR
});

export const deleteStages = stageIdsArray => ({
  type: DELETE_STAGES,
  payload: stageIdsArray
});

export const stagesDuxActions = {
  setFetchStagesFailed,
  setFetchStagesRequest,
  setFetchStagesSucceeded,
  saveStageRequest,
  saveStageSucceeded,
  saveNewStage,
  saveStageClear,
  saveStageFailed
};

// Getters
export const getStageInfoForId = (stagesList, stageId) =>
  stagesList.find(stageMember => stageMember.id === stageId);

export default stagesReducer;
