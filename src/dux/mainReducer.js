import { combineReducers } from "redux";

import homeReducer from "./homeReducer.js";
import bandsReducer from "./bandsReducer";
import appearancesReducer from "./appearancesReducer.js";
import stagesReducer from "./stagesReducer.js";
import firebaseLoginReducer from "./firebaseLoginReducer.js";
import datesReducer from "./datesReducer.js";
import storageReducer from "./storageReducer";
import publishReducer from "./publishReducer.js";
import contactsReducer from "./contactusReducer.js";
// import { getAppearancesWithBandAndStageNames as fromAppearancesGetAppearancesWithBandAndStageNames } from "./appearancesReducer.js";

const mainReducer = combineReducers({
  appearancesState: appearancesReducer,
  bandsState: bandsReducer,
  contactsState: contactsReducer,
  homeState: homeReducer,
  firebaseLoginState: firebaseLoginReducer,
  publishState: publishReducer,
  stagesState: stagesReducer,
  datesState: datesReducer,
  storageState: storageReducer
});

export default mainReducer;

// export const getAppearancesWithBandAndStageNames = state =>
//   fromAppearancesGetAppearancesWithBandAndStageNames(state);
