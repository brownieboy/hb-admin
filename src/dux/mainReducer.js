import { combineReducers } from "redux";

import homeReducer from "./homeReducer.js";
import bandsReducer from "./bandsReducer";
import appearancesReducer from "./appearancesReducer.js";
import stagesReadReducer from "./stagesReadReducer.js";
import stagesWriteReducer from "./stagesWriteReducer.js";
import firebaseLoginReducer from "./firebaseLoginReducer.js";

const mainReducer = combineReducers({
  appearancesState: appearancesReducer,
  bandsState: bandsReducer,
  homeState: homeReducer,
  firebaseLoginState: firebaseLoginReducer,
  stagesState: stagesReadReducer,
  stagesWriteState: stagesWriteReducer
});

export default mainReducer;
