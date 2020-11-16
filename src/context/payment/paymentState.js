import React, { useReducer } from "react";
import PaymentContext from "./paymentContext";
import PaymentReducer from "./paymentReducer";
import { gql, useApolloClient } from "@apollo/client";
import { toast } from "react-toastify";

import {
  SHOW_ALERT,
  SET_FX_PARAMETERS,
  // GET_RECIPENT,
  // GET_FXRATE,
  SET_TRANSACTION_TYPE,
  // SET_STARTEND_DATES,
  // SET_RECEIVING_METHOD,
  // SET_PAYMENT_OPTION,
} from "../types";

const PaymentState = (props) => {
  const defaultState = {
    userId: "",
    recipentId: "",
    fxDetails: {
      sendCurrency: "USD",
      baseAmount: "",
      destinationCurrency: "NGN",
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
  const getFxRates = (params) => {

    console.log(params.sendCurrency);
  
    const FX_RATES = gql`
      query getFxRates(
        $sendCurrency: String!
        $destinationCurrency: String!
        $baseAmount: Float!
        $receiveType: ReceiveType!
      ) {
        getFxRate(
          input: {
            sendCurrency: $sendCurrency
            destinationCurrency: $destinationCurrency
            baseAmount: $baseAmount
            receiveType: $receiveType
          }
        ) {
          rate
          fee
          actualAmount
          convertedAmount
        }
      }
    `;

    dispatch({
      type: SET_FX_PARAMETERS,
      payload: params
    });

    if (params.baseAmount !== "" || (params.reverse && params.convertedAmount !== "") ) {

      const obj = {
        sendCurrency: params.reverse ? params.destinationCurrency : params.sendCurrency,
        destinationCurrency: params.reverse ? params.sendCurrency : params.destinationCurrency,
        baseAmount: params.reverse ? params.convertedAmount : params.baseAmount,
        receiveType: "SameDay",
      }

      console.log(obj);

      client
        .query({
          query: FX_RATES,
          fetchPolicy: "cache-first",
          variables: {
            sendCurrency: params.reverse ? params.destinationCurrency : params.sendCurrency,
            destinationCurrency: params.reverse ? params.sendCurrency : params.destinationCurrency,
            baseAmount: params.reverse ? params.convertedAmount : params.baseAmount,
            receiveType: "SameDay",
          },
        })
        .then((res) => {
          const data = res.data.getFxRate;

          dispatch({
            type: SET_FX_PARAMETERS,
            payload: {
              sendCurrency: params.sendCurrency,
              destinationCurrency: params.destinationCurrency,
              baseAmount: params.reverse ? data.convertedAmount : params.baseAmount,
              actualAmount: data.actualAmount,
              fee: data.fee,
              rate: data.rate,
              convertedAmount: params.reverse ? params.convertedAmount : data.convertedAmount
            },
          });
        })
        .catch((err) => {
          toast.error("Sorry, an error occured", {
            autoClose: 3000,
            closeButton: true,
            pauseOnHover: true,
            position: "top-right",
            hideProgressBar: true,
            toastId: "Yes",
          });
        });
    }
  };

  // set transaction type
  const setTransactionType = (params) => {
    dispatch({
      type: SET_TRANSACTION_TYPE,
      payload: params
    });
  }

  return (
    <PaymentContext.Provider
      value={{
        state,
        getFxRates,
        setTransactionType
      }}
    >
      {props.children}
    </PaymentContext.Provider>
  );
};

export default PaymentState;
