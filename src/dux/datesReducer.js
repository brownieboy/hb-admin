// The three dates upon which the festival is running this year
// Action type constants
const LOAD_DATES_NOW = "LOAD_DATES_NOW"; // Imperative, hence "NOW"!
const FETCH_DATES_REQUEST = "FETCH_DATES_REQUEST";
const FETCH_DATES_SUCCESS = "FETCH_DATES_SUCCESS";
const FETCH_DATES_FAILURE = "FETCH_DATES_FAILURE";
const SAVE_EDITED_DATES = "SAVE_EDITED_DATES";
const SAVE_DATES_REQUEST = "SAVE_DATES_REQUEST";
const SAVE_DATES_SUCCESS = "SAVE_DATES_SUCCESS";
const SAVE_DATES_FAILED = "SAVE_DATES_FAILED";

export const actionTypes = {
  SAVE_EDITED_DATES,
  SAVE_DATES_REQUEST,
  SAVE_DATES_SUCCESS,
  SAVE_DATES_FAILED
};

// Reducer
const datesReducer = (
  state = { fetchStatus: "", fetchError: "", datesList: [] },
  action
) => {
  switch (action.type) {
    case FETCH_DATES_REQUEST:
      return { ...state, fetchStatus: "loading" };
    case FETCH_DATES_SUCCESS:
      return {
        ...state,
        fetchStatus: "",
        datesList: action.payload
      };
    case FETCH_DATES_FAILURE:
      return { ...state, fetchStatus: "failure", fetchError: action.payload };
    default:
      return state;
  }
};

export const loadDatesNow = () => ({ type: LOAD_DATES_NOW });

const setFetchDatesRequest = () => ({
  type: FETCH_DATES_REQUEST
});
const setFetchDatesSucceeded = datesItem => ({
  type: FETCH_DATES_SUCCESS,
  payload: datesItem.datesList || []
});
const setFetchDatesFailed = errorMessage => ({
  type: FETCH_DATES_FAILURE,
  payload: errorMessage
});

export const saveEditedDates = datesList => ({
  type: SAVE_EDITED_DATES,
  payload: datesList
});

export const saveDatesRequest = () => ({
  type: SAVE_DATES_REQUEST
});

export const saveDatesSucceeded = () => ({
  type: SAVE_DATES_SUCCESS
});

export const saveDatesFailed = error => ({
  type: SAVE_DATES_FAILED,
  payload: error
});


export const datesDuxActions = {
  setFetchDatesFailed,
  setFetchDatesRequest,
  setFetchDatesSucceeded,
  saveDatesRequest,
  saveDatesSucceeded,
  saveEditedDates,
  saveDatesFailed
};



export default datesReducer;
