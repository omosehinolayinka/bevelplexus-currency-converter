import {
  SET_FX_PARAMETERS,
  SET_TRANSACTION_TYPE,
  SELECT_RECIPIENT,
  SET_RECEIVE_TYPE,
  CALCULATION_TYPE,
  SET_PAYMENT_OPTION,
  SET_REFERENCE,
  SET_PAYMENT_METHODS,
  SET_COUNTRIES,
  RESET_STATE,
  SET_INSTITUTION,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case CALCULATION_TYPE:
      return {
        ...state,
        fxDetails: {
          ...state.fxDetails,
          reverse: action.payload,
        },
      };

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

    case SELECT_RECIPIENT:
      return {
        ...state,
        recipient: action.payload,
      };

    case SET_RECEIVE_TYPE:
      return {
        ...state,
        fxDetails: {
          ...state.fxDetails,
          receiveType: action.payload,
        },
      };

    case SET_PAYMENT_OPTION:
      return {
        ...state,
        paymentOption: action.payload,
      };

    case SET_REFERENCE:
      return {
        ...state,
        referenceID: action.payload,
      };

    case SET_PAYMENT_METHODS:
      return {
        ...state,
        paymentOptions: action.payload,
      };

    case SET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };

    case SET_INSTITUTION:
      return {
        ...state,
        institution: action.payload,
      };
    case RESET_STATE:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};
