export const types = {
  SEND_FILE: "SEND_FILE",
  SET_FILE: "SET_FILE",
  SET_FILE_URL: "SET_FILE_URL"
};

export const setFile = file => ({
  type: types.SET_FILE,
  file
});

export const setFileURL = url => ({
  type: types.SET_FILE_URL,
  url
});

export const sendFile = () => ({
  type: types.SEND_FILE
});

const initialState = {
  file: null,
  loading: false,
  url: null
};

const storageReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_FILE:
      return {
        ...state,
        file: action.file
      };
    case types.SET_FILE_URL:
      return {
        ...state,
        loading: false,
        url: action.url
      };
    case types.SEND_FILE:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default storageReducer;
