import {
  GET_TRANSACTIONS,
  CHANGE_PAGE,
  GET_TRANSACTION_ANALYTICS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        ...action.payload
      };
    case GET_TRANSACTION_ANALYTICS:
      return {
        ...state,
        transactionAnalytics: action.payload
      };

    case CHANGE_PAGE:
      return {
        ...state,
        page: { ...action.payload }
      };

    default:
      return state;
  }
};
