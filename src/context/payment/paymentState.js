import React, { useReducer } from "react";
import PaymentContext from "./paymentContext";
import PaymentReducer from "./paymentReducer";
import { gql, useApolloClient } from "@apollo/client";

import {
  // GET_RECIPENT,
  SET_FX_PARAMETERS,
  // GET_FXRATE,
  // SET_TRANSACTION_TYPE,
  // SET_STARTEND_DATES,
  // SET_RECEIVING_METHOD,
  // SET_PAYMENT_OPTION,
} from "../types";

const PaymentState = (props) => {
  const defaultState = {
    userId: "",
    recipentId: "",
    fxDetails: {
      sendCurrency: "CAD",
      baseAmount: null,
      destinationCurrency: "BRL",
      convertedAmount: null,
      actualAmount: 0.0,
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

  const FX_RATES = gql`
    query getFxRates {
      getFxRate(
        input: {
          sendCurrency: "USD"
          destinationCurrency: "NGN"
          baseAmount: 1000
          receiveType: SameDay
        }
      ) {
        rate
        fee
        actualAmount
        convertedAmount
      }
    }
  `;

  const client = useApolloClient();

  // get fx rates
  const GetFxRates = (name, value) => {

    client
      .query({
        query: FX_RATES,
        fetchPolicy: "cache-first",
      })
      .then((data) => console.log(data));

    dispatch({
      type: SET_FX_PARAMETERS,
      payload: {
        name,
        value,
      },
    });
  };

  return (
    <PaymentContext.Provider
      value={{
        state,
        getFxRates: GetFxRates,
      }}
    >
      {props.children}
    </PaymentContext.Provider>
  );
};

export default PaymentState;
