import { combineReducers } from "redux";

import homeReducer from "./homeReducer.js";
import bandsReducer from "./bandsReducer";
import appearancesReducer from "./appearancesReducer.js";
import stagesReducer from "./stagesReducer.js";
import firebaseLoginReducer from "./firebaseLoginReducer.js";
import datesReducer from "./datesReducer.js";
import storageReducer from "./storageReducer";
// import { getAppearancesWithBandAndStageNames as fromAppearancesGetAppearancesWithBandAndStageNames } from "./appearancesReducer.js";

const mainReducer = combineReducers({
  appearancesState: appearancesReducer,
  bandsState: bandsReducer,
  homeState: homeReducer,
  firebaseLoginState: firebaseLoginReducer,
  stagesState: stagesReducer,
  datesState: datesReducer,
  storageState: storageReducer
});

export default mainReducer;

// export const getAppearancesWithBandAndStageNames = state =>
//   fromAppearancesGetAppearancesWithBandAndStageNames(state);
