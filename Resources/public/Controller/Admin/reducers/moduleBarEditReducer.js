import uniqId from "../model/uniqId";
import {
  INITIALIZE_DEF,
  UPDATE_VALUE,
  ADD_DATASET
} from "../actions/moduleBarActions";

const INITIAL_BAR = {barDef: {}};
export function moduleBar(state = INITIAL_BAR, action) {
    switch (action.type) {
      case INITIALIZE_DEF:
        return Object.assign({}, state, {"barDef": action.barDef});
      case UPDATE_VALUE:
        return Object.assign({}, state, {
            "barDef": {...state.barDef, [action.name]: action.value}
        });
      case ADD_DATASET:
        const dataset = {};
        var datasets = state.barDef.datasets;
        datasets.push(dataset);
        
        var newState = {"barDef" : {...state.barDef, "datasets": datasets}};
        
        return Object.assign({}, state, newState);
      default:
        return state;
    }
};