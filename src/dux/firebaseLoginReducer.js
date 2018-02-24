export const types = {
  LOGIN: {
    REQUEST: "LOGIN.REQUEST",
    SUCCESS: "LOGIN.SUCCESS",
    FAILURE: "LOGIN.FAILURE"
  },
  LOGOUT: {
    REQUEST: "LOGOUT.REQUEST",
    SUCCESS: "LOGOUT.SUCCESS",
    FAILURE: "LOGOUT.FAILURE"
  },
  SYNC_USER: "SYNC_USER"
};

export const login = () => ({
  type: types.LOGIN.REQUEST
});

export const loginSuccess = credential => ({
  type: types.LOGIN.SUCCESS,
  credential
});

export const loginFailure = error => ({
  type: types.LOGIN.FAILURE,
  error
});

export const logout = () => ({
  type: types.LOGOUT.REQUEST
});

export const logoutSuccess = () => ({
  type: types.LOGOUT.SUCCESS
});

export const logoutFailure = error => ({
  type: types.LOGOUT.FAILURE,
  error
});

export const syncUser = user => ({
  type: types.SYNC_USER,
  user
});

const initialState = {
  loading: false,
  loggedIn: false,
  user: null
};

export default function loginReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN.REQUEST:
    case types.LOGOUT.REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.LOGIN.SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true
      };
    case types.LOGIN.FAILURE:
      return {
        ...state,
        loading: false
      };
    case types.LOGOUT.SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: false
      };
    case types.LOGOUT.FAILURE:
      return {
        ...state,
        loading: false
      };
    case types.SYNC_USER:
      return {
        ...state,
        loggedIn: action.user != null,
        user: action.user
      };
    default:
      return state;
  }
}
