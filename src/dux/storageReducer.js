import { createSelector } from "reselect";

// import { stringSort } from "../helper-functions/sorting.js";

// Action type constants
const SEND_STORAGE_THUMB_START = "SEND_STORAGE_THUMB_START";
const SEND_STORAGE_CARD_START = "SEND_STORAGE_CARD_START";

export const actionTypes = {
  SEND_STORAGE_CARD_START,
  SEND_STORAGE_THUMB_START

};

const initialState = {
  thumbStatus: "",
  thumbError: "",
  thumbUrl: "",
  thumbProgress: 0,
  cardStatus: "",
  cardError: "",
  cardUrl: "",
  cardProgress: 0
};

// Reducer
const stagesReducer = (
  state = initialState
  action
) => {
  let idx, newStagesList;
  switch (action.type) {
    case FETCH_STORAGE_REQUEST:
      return { ...state, fetchStatus: "loading" };
    case FETCH_STORAGE_SUCCESS:
      return {
        ...state,
        fetchStatus: "",
        stagesList: action.payload
      };
    case FETCH_STORAGE_FAILURE:
      return { ...state, fetchStatus: "failure", fetchError: action.payload };
    case SAVE_NEW_STORAGE:
      return { ...state, stagesList: [...state.stagesList, action.payload] };
    case SAVE_STORAGE_REQUEST:
      return {
        ...state,
        saveStatus: "saving"
      };
    case SAVE_STORAGE_SUCCESS:
      return {
        ...state,
        saveStatus: ""
      };
    case SAVE_STORAGE_FAILED:
      return { ...state, saveStatus: "failure", saveError: action.payload };
    case SAVE_EDITED_STORAGE:
      idx = state.stagesList.findIndex(obj => obj.id === action.payload.id);
      newStagesList = [
        ...state.stagesList.slice(0, idx),
        action.payload,
        ...state.stagesList.slice(idx + 1)
      ];
      return { ...state, stagesList: newStagesList };
    default:
      return state;
  }
};

// Sort/filter functions for selectors
const selectStages = state => state.stagesList;
const selectStagesPicker = createSelector([selectStages], stagesList =>
  stagesList.map(stageMember => ({
    id: stageMember.id,
    name: stageMember.name
  }))
);

export const selectors = {
  selectStagesPicker
};

export const loadStagesNow = () => ({ type: LOAD_STORAGE_NOW });
// export const fetchStagesSucceeded = () => ({ type: FETCH_STORAGE_REQUEST });

const setFetchStagesRequest = () => ({
  type: FETCH_STORAGE_REQUEST
});
const setFetchStagesSucceeded = stagesList => ({
  type: FETCH_STORAGE_SUCCESS,
  payload: stagesList || []
});
const setFetchStagesFailed = errorMessage => ({
  type: FETCH_STORAGE_FAILURE,
  payload: errorMessage
});

export const saveNewStage = stageInfo => ({
  type: SAVE_NEW_STORAGE,
  payload: stageInfo
});

export const saveEditedStage = stageInfo => ({
  type: SAVE_EDITED_STORAGE,
  payload: stageInfo
});

export const saveStageRequest = () => ({
  type: SAVE_STORAGE_REQUEST
});

export const saveStageSucceeded = () => ({
  type: SAVE_STORAGE_SUCCESS
});

export const saveStageFailed = error => ({
  type: SAVE_STORAGE_FAILED,
  payload: error
});

export const stagesDuxActions = {
  setFetchStagesFailed,
  setFetchStagesRequest,
  setFetchStagesSucceeded,
  saveStageRequest,
  saveStageSucceeded,
  saveNewStage,
  saveStageFailed
};

// Getters
export const getStageInfoForId = (stagesList, stageId) =>
  stagesList.find(stageMember => stageMember.id === stageId);

export default stagesReducer;
