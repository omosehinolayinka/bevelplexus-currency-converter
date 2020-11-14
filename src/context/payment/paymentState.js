import React, { useReducer } from "react";
import PaymentContext from "./paymentContext";
import PaymentReducer from "./paymentReducer";
import { gql, Query } from "@apollo/client";

import {
  GET_RECIPENT,
  SET_FX_PARAMETERS,
  GET_FXRATE,
  SET_TRANSACTION_TYPE,
  SET_STARTEND_DATES,
  SET_RECEIVING_METHOD,
  SET_PAYMENT_OPTION,
} from "../types";

const PaymentState = (props) => {
  const defaultState = {
    userId: "",
    recipentId: "",
    fxDetails: {
      sendCurrency: "CAD",
      baseAmount: null,
      destinationCurrency: "BRL",
      convertedAmount: 0.00,
      actualAmount: "",
      fee: 0.0,
      rate: 0.0,
      receiveType: "SameDay",
    },
    transactionType: "individual",
    startDate: "",
    completionDate: "",
    recipent: {
      name: "",
      email: "",
      avatarUrl: "",
      flag: "",
      phone: "",
      location: "",
      institutionAddress: "",
      institutionScore: "",
    },
    receivingMethod: {
      type: "",
      bank: "",
      accountName: "",
      accountNumber: "",
    },
    paymentOption: "",
    referenceID: "",
  };

  const [state, dispatch] = useReducer(PaymentReducer, defaultState);

  // get fx rates
  const getFxRates = (name, value) => {
    // const FX_RATES = gql`
    //   query GetExchangeRates {
    //     rates(currency: "USD") {
    //       currency
    //       rate
    //     }
    //   }
    // `;

    dispatch({
      type: SET_FX_PARAMETERS,
      payload: {
        name,
        value: parseFloat(value)
      }
    })
  };

  return (
    <PaymentContext.Provider
      value={{
        state,
        getFxRates
      }}
    >
      {props.children}
    </PaymentContext.Provider>
  );
};

export default PaymentState;
