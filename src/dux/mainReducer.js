import { combineReducers } from "redux";

import homeReducer from "./homeReducer.js";
import bandsReducer from "./bandsReducer";
import appearancesReducer from "./appearancesReducer.js";
import stagesReducer from "./stagesReducer.js";
import firebaseLoginReducer from "./firebaseLoginReducer.js";
import datesReducer from "./datesReducer.js";
import storageReducer from "./storageReducer";
import { getAppearancesWithBandNames as fromAppearancesGetAppearancesWithBandsNames } from "./appearancesReducer.js";

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

export const getAppearancesWithBandsNames = state => {
  console.log("mainReducer..getAppearancesWithBandsNames, state:");
  console.log(state);
  fromAppearancesGetAppearancesWithBandsNames(state);
};

/*
import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';

const todoApp = combineReducers({
  todos,
});

export default todoApp;

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);
 */
