// import { createSelector } from "reselect";

// Action type constants
const SEND_STORAGE_THUMB_START = "SEND_STORAGE_THUMB_START";
const SEND_STORAGE_THUMB_SUCCESS = "SEND_STORAGE_THUMB_SUCCESS";
const SEND_STORAGE_THUMB_FAILURE = "SEND_STORAGE_THUMB_FAILURE";
const UPDATE_STORAGE_THUMB_STATUS = "UPDATE_STORAGE_THUMB_STATUS";
const SEND_STORAGE_CARD_START = "SEND_STORAGE_CARD_START";
const SEND_STORAGE_CARD_SUCCESS = "SEND_STORAGE_CARD_SUCCESS";
const SEND_STORAGE_CARD_FAILURE = "SEND_STORAGE_CARD_FAILURE";
const UPDATE_STORAGE_CARD_STATUS = "UPDATE_STORAGE_CARD_STATUS";

export const actionTypes = {
  SEND_STORAGE_THUMB_START,
  SEND_STORAGE_THUMB_SUCCESS,
  SEND_STORAGE_THUMB_FAILURE,
  UPDATE_STORAGE_THUMB_STATUS,
  SEND_STORAGE_CARD_START,
  SEND_STORAGE_CARD_SUCCESS,
  SEND_STORAGE_CARD_FAILURE,
  UPDATE_STORAGE_CARD_STATUS
};

// Action creators
const sendStorageThumbStart = storageInfo => ({
  type: SEND_STORAGE_THUMB_START,
  payload: storageInfo // e.g { postUrl: "" }
});

const sendStorageThumbSuccess = successInfo => ({
  type: SEND_STORAGE_THUMB_SUCCESS,
  payload: successInfo // e.g. {readUrl: ""}
});

const sendStorageThumbFailure = errorMessage => ({
  type: SEND_STORAGE_THUMB_FAILURE,
  payload: errorMessage
});

const updateStorageThumbStatus = statusInfo => ({
  type: UPDATE_STORAGE_THUMB_STATUS,
  payload: statusInfo // e.g. {percentUploaded: 15}
});

const sendStorageCardStart = storageInfo => ({
  type: SEND_STORAGE_CARD_START,
  payload: storageInfo // e.g { postUrl: "" }
});

const sendStorageCardSuccess = successInfo => ({
  type: SEND_STORAGE_CARD_SUCCESS,
  payload: successInfo // e.g. {readUrl: ""}
});

const sendStorageCardFailure = errorMessage => ({
  type: SEND_STORAGE_CARD_FAILURE,
  payload: errorMessage
});

const updateStorageCardStatus = statusInfo => ({
  type: UPDATE_STORAGE_CARD_STATUS,
  payload: statusInfo // e.g. {percentUploaded: 15}
});

export const storageDuxActions = {
  sendStorageThumbStart,
  sendStorageThumbSuccess,
  sendStorageThumbFailure,
  updateStorageThumbStatus,
  sendStorageCardStart,
  sendStorageCardSuccess,
  sendStorageCardFailure,
  updateStorageCardStatus
};

const initialState = {
  thumbStatus: "",
  thumbError: "",
  thumbPostUrl: "",
  thumbReadUrl: "",
  thumbProgress: 0,
  cardStatus: "",
  cardError: "",
  cardPostUrl: "",
  cardReadUrl: "",
  cardProgress: 0
};

// Reducer
const storageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEND_STORAGE_THUMB_START:
      return { ...state, thumbStatus: "posting", thumbPostUrl: payload.postURL };

    case SEND_STORAGE_THUMB_SUCCESS:
      return {
        ...state,
        thumbStatus: "success",
        thumbError: "",
        thumbReadUrl: action.readUrl
      };
    case SEND_STORAGE_THUMB_FAILURE:
      return { ...state, thumbStatus: "failure", fetchError: payload };
    case UPDATE_STORAGE_THUMB_STATUS:
      return { ...state, thumbStatus: "posting", thumbPostUrl: payload.postURL, thumbProgress: payload.percentUploaded };
    case SEND_STORAGE_CARD_START:
      return { ...state, cardStatus: "posting", cardPostUrl: payload.postURL };
    case SEND_STORAGE_CARD_SUCCESS:
      return {
        ...state,
        cardStatus: "success",
        cardError: "",
        cardReadUrl: action.readUrl
      };
    case SEND_STORAGE_CARD_FAILURE:
      return { ...state, cardStatus: "failure", fetchError: payload };
    case UPDATE_STORAGE_CARD_STATUS:
      return { ...state, cardStatus: "posting", cardPostUrl: payload.postURL, cardProgress: payload.percentUploaded };
    default:
      return state;
  }
};

export default storageReducer;
