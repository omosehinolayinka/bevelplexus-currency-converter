import { SET_FX_PARAMETERS, SET_TRANSACTION_TYPE } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_FX_PARAMETERS:
      return {
        ...state,
        fxDetails: {
          ...state.fxDetails,
          ...action.payload,
        },
      };

    case SET_TRANSACTION_TYPE:
      return {
        ...state,
        transactionType: action.payload,
      };

    default:
      return state;
  }
};
