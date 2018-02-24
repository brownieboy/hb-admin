import { combineReducers } from "redux";

import homeReducer from "./homeReducer.js";
import bandsReducer from "./bandsReducer";
import appearancesReducer from "./appearancesReducer.js";
import stagesReducer from "./stagesReducer.js";
import firebaseLoginReducer from "./firebaseLoginDux.js";

const mainReducer = combineReducers({
  appearancesState: appearancesReducer,
  bandsState: bandsReducer,
  homeState: homeReducer,
  firebaseLoginState: firebaseLoginReducer,
  stagesState: stagesReducer
});

export default mainReducer;
