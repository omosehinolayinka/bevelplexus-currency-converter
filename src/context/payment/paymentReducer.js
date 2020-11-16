import { SET_FX_PARAMETERS, SHOW_ALERT } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_FX_PARAMETERS:
      return {
        ...state,
        fxDetails: {
          ...state.fxDetails,
          ...action.payload
        }
      };
    
    case SHOW_ALERT:
      return {
        ...state,
        alert: {
          ...action.payload
        }
      }
    
    default:
      return state;
  }
};
