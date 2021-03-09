import { SHOW_INTRO, HIDE_INTRO } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SHOW_INTRO:
      return {
        ...state,
        introStatus: action.payload
      };
    
    case HIDE_INTRO:
      return {
        ...state,
        introStatus: action.payload
      }

    default:
      return state;
  }
};
