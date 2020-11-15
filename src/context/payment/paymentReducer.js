import { SET_FX_PARAMETERS } from "../types";

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
    
    default:
      return state;
  }
};
