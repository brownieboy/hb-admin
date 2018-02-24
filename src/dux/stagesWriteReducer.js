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

export const changeNewstage = stage => ({
  type: types.STAGES.NEW.CHANGE,
  stage
});

export const saveNewStage = () => ({
  type: types.STAGES.NEW.SAVE
});

export const setStageStatus = (stageId, done) => ({
  type: types.STAGES.SET_STATUS,
  stageId,
  done
});

const initialState = {
  list: [],
  new: ""
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
        new: action.stage
      };
    default:
      return state;
  }
}
