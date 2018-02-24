export const types = {
  STAGES: {
    SYNC: "STAGES.SYNC",
    SET_STATUS: "STAGES.SET_STATUS",
    NEW: {
      CHANGE: "STAGES.NEW.CHANGE",
      SAVE: "STAGES.NEW.SAVE"
    }
  }
};

export const syncStages = Stages => ({
  type: types.STAGES.SYNC,
  Stages
});

export const changeNewStage = stage => ({
  type: types.STAGES.NEW.CHANGE,
  stage
});

export const saveNewStage = stageInfo => ({
  type: types.STAGES.NEW.SAVE,
  payload: stageInfo
});

export const setStageStatus = (stageId, done) => ({
  type: types.STAGES.SET_STATUS,
  stageId,
  done
});

const initialState = {
  list: [],
  opStageInfo: {
    id: "",
    name: "",
    sortOrder: 0
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.STAGES.SYNC:
      return {
        ...state,
        list: action.Stages
      };
    case types.STAGES.NEW.CHANGE:
      return {
        ...state,
        opStageInfo: action.payload
      };
    case types.STAGES.NEW.SAVE:
      return {
        ...state,
        opStageInfo: action.payload
      };
    default:
      return state;
  }
}
