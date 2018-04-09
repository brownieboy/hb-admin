// Action type constants
const LOAD_CONTACTUS_NOW = "LOAD_CONTACTUS_NOW"; // Imperative, hence "NOW"!
const FETCH_CONTACTUS_REQUEST = "FETCH_CONTACTUS_REQUEST";
const FETCH_CONTACTUS_SUCCESS = "FETCH_CONTACTUS_SUCCESS";
const FETCH_CONTACTUS_FAILURE = "FETCH_CONTACTUS_FAILURE";
const SAVE_EDITED_CONTACTUS = "SAVE_EDITED_CONTACTUS";
const SAVE_CONTACTUS_REQUEST = "SAVE_CONTACTUS_REQUEST";
const SAVE_CONTACTUS_SUCCESS = "SAVE_CONTACTUS_SUCCESS";
const SAVE_CONTACTUS_FAILED = "SAVE_CONTACTUS_FAILED";

export const actionTypes = {
  SAVE_EDITED_CONTACTUS
};

// Reducer
const homeReducer = (
  state = {
    fetchStatus: "",
    fetchError: "",
    saveHome: "",
    saveError: {},
    homeText: ""
  },
  action
) => {
  switch (action.type) {
    case FETCH_CONTACTUS_REQUEST:
      return { ...state, fetchStatus: "loading" };
    case FETCH_CONTACTUS_SUCCESS:
      return {
        ...state,
        fetchStatus: "",
        homeText: action.payload
      };
    case FETCH_CONTACTUS_FAILURE:
      return { ...state, fetchStatus: "failure", fetchError: action.payload };
    case SAVE_CONTACTUS_REQUEST:
      return {
        ...state,
        saveStatus: "saving"
      };
    case SAVE_CONTACTUS_SUCCESS:
      return {
        ...state,
        saveStatus: ""
      };
    case SAVE_CONTACTUS_FAILED:
      return { ...state, saveStatus: "failure", saveError: action.payload };

    default:
      return state;
  }
};

export const loadHomeNow = () => ({ type: LOAD_CONTACTUS_NOW });
// export const fetchCONTACTUSSucceeded = () => ({ type: FETCH_CONTACTUS_REQUEST });

const setFetchHomeRequest = () => ({
  type: FETCH_CONTACTUS_REQUEST
});
const setFetchHomeSucceeded = homeText => ({
  type: FETCH_CONTACTUS_SUCCESS,
  payload: homeText || ""
});
const setFetchHomeFailed = errorMessage => ({
  type: FETCH_CONTACTUS_FAILURE,
  payload: errorMessage
});

export const saveEditedHome = homeInfo => ({
  type: SAVE_EDITED_CONTACTUS,
  payload: homeInfo
});

export const saveHomeRequest = () => ({
  type: SAVE_CONTACTUS_REQUEST
});

export const saveHomeSucceeded = () => ({
  type: SAVE_CONTACTUS_SUCCESS
});

export const saveHomeFailed = error => ({
  type: SAVE_CONTACTUS_FAILED,
  payload: error
});

export const homeDuxActions = {
  setFetchHomeFailed,
  setFetchHomeRequest,
  setFetchHomeSucceeded
};





export default homeReducer;
