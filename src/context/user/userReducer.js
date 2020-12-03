import { GET_USER } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    // case SET_VERIFICATION:
    //   return {
    //     ...state,
    //     verification: action.payload,
    //   };

    default:
      return state;
  }
};
