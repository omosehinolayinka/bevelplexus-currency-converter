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
      baseAmount: "",
      destinationCurrency: "BRL",
      convertedAmount: "",
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
  const client = useApolloClient();

  

  // get fx rates
  const GetFxRates = (params) => {

    const FX_RATES = gql`
    query getFxRates($send: String!, $dest: String!, $base: Float!, $type: String) {
      getFxRate(
        input: {
          sendCurrency: $send
          destinationCurrency: $dest
          baseAmount: $base
          receiveType: $type
        }
      ) {
        rate
        fee
        actualAmount
        convertedAmount
      }
    }
  `;

    client
      .query({
        query: FX_RATES,
        fetchPolicy: "cache-first",
        variables: {
          send: params.sendCurrency,
          dest: params.destinationCurrency,
          base: params.baseAmount,
          type: "SameDay"
        }
      })
      .then((res) => {

        const data = res.data.getFxRate
        console.log(data);

        dispatch({
          type: SET_FX_PARAMETERS,
          payload: {
            sendCurrency: params.sendCurrency,
            destinationCurrency: params.destinationCurrency,
            baseAmount: params.baseAmount,
            actualAmount: data.actualAmount,
            fee: data.fee,
            rate: data.rate,
            convertedAmount: data.convertedAmount
          },
        });
      })
      .catch(err => console.log(err))
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
