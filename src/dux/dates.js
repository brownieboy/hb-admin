// The three dates upon which the festival is running this year
// Action type constants
const LOAD_DATES_NOW = "LOAD_DATES_NOW"; // Imperative, hence "NOW"!
const FETCH_DATES_REQUEST = "FETCH_DATES_REQUEST";
const FETCH_DATES_SUCCESS = "FETCH_DATES_SUCCESS";
const FETCH_DATES_FAILURE = "FETCH_DATES_FAILURE";

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
const setFetchDatesSucceeded = datesText => ({
  type: FETCH_DATES_SUCCESS,
  payload: datesText
});
const setFetchDatesFailed = errorMessage => ({
  type: FETCH_DATES_FAILURE,
  payload: errorMessage
});

export const datesDuxActions = {
  setFetchDatesFailed,
  setFetchDatesRequest,
  setFetchDatesSucceeded
};


export default datesReducer;

