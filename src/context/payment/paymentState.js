import React, { useReducer } from "react";
import PaymentContext from "./paymentContext";
import PaymentReducer from "./paymentReducer";
import { useApolloClient } from "@apollo/client";
import { queries as gql } from "./gqlQueries";
import { toast } from "react-toastify";

import {
  SET_FX_PARAMETERS,
  SELECT_RECIPIENT,
  SET_TRANSACTION_TYPE,
  SET_RECEIVE_TYPE,
  CALCULATION_TYPE,
  SET_PAYMENT_OPTION,
  SET_REFERENCE,
  SET_PAYMENT_METHODS,
  RESET_STATE
} from "../types";

const PaymentState = (props) => {
  const defaultState = {
    fxDetails: {
      sendCurrency: "USD",
      baseAmount: "",
      destinationCurrency: "NGN",
      convertedAmount: "",
      actualAmount: 0.0,
      fee: 0.0,
      rate: 0.0,
      receiveType: "SameDay",
      reverse: false,
    },
    recipient: {
      name: null,
    },
    transactionType: "Individual",
    paymentOption: "E-transfer",
    referenceID: "",
    paymentOptions: []
  };

  const [state, dispatch] = useReducer(PaymentReducer, defaultState);
  const client = useApolloClient();

  // set calculation type
  const setReverseCalc = (value) => {
    dispatch({
      type: CALCULATION_TYPE,
      payload: value,
    });
  };

  // get fx rates
  const getFxRates = (params) => {
    dispatch({
      type: SET_FX_PARAMETERS,
      payload: params,
    });

    if (
      params.baseAmount !== "" ||
      (params.reverse && params.convertedAmount !== "")
    ) {
      client
        .query({
          query: gql.GET_FX_RATES,
          fetchPolicy: "cache-first",
          variables: {
            sendCurrency: params.reverse
              ? params.destinationCurrency
              : params.sendCurrency,
            destinationCurrency: params.reverse
              ? params.sendCurrency
              : params.destinationCurrency,
            baseAmount: params.reverse
              ? params.convertedAmount
              : params.baseAmount,
            receiveType: params.receiveType,
          },
        })
        .then((res) => {
          const data = res.data.getFxRate;

          dispatch({
            type: SET_FX_PARAMETERS,
            payload: {
              sendCurrency: params.sendCurrency,
              destinationCurrency: params.destinationCurrency,
              baseAmount: params.reverse
                ? data.convertedAmount
                : params.baseAmount,
              actualAmount: data.actualAmount,
              fee: data.fee,
              rate: data.rate,
              convertedAmount: params.reverse
                ? params.convertedAmount
                : data.convertedAmount,
            },
          });
        })
        .catch((err) => {
          console.log(err);
          showError("Sorry, an error occured");
        });
    }
  };

  // set transaction type
  const setTransactionType = (params) => {
    dispatch({
      type: SET_TRANSACTION_TYPE,
      payload: params,
    });
  };

  // set current recipient
  const setCurrentRecipient = (recipient) => {
    dispatch({
      type: SELECT_RECIPIENT,
      payload: recipient,
    });
  };

  // set transaction type
  const setReceiveType = (receiveType, params) => {
    dispatch({
      type: SET_RECEIVE_TYPE,
      payload: receiveType,
    });
  };

  //set payment option
  const setPaymentOption = (value) => {
    dispatch({
      type: SET_PAYMENT_OPTION,
      payload: value,
    });
  };

  // create transaction
  const createTransaction = (data, alert) => {
    client
      .mutate({
        mutation: gql.CREATE_TRANSACTION,
        variables: { ...data },
      })
      .then((res) => {
        const reference = res.data.createTransaction.reference;

        dispatch({
          type: SET_REFERENCE,
          payload: reference,
        });

        getCountryId(data.destinationCurrency, alert)
        // alert(true);
      })
      .catch((err) => {
        console.log(err);
        showError("Couldn't process transaction, please try again");
      });
  };

  const getCountryId = (currency, alert) => {
    client.query({
      query: gql.GET_COUNTRY_ID,
      variables: { currencyCode: currency },
    })
    .then((res) => {
      getPaymentMethods(res.data.getCountryByCurrencyCode.id, alert)
    })
    .catch(() => {
      showError("Opps! Your transaction may have not been proccessed correctly, please try again")
    })
  };

  const getPaymentMethods = (id, alert) => {
    client.query({
      query: gql.GET_PAYMENT_METHODS,
      variables: {countryId: id}
    })
    .then((res) => {
      dispatch({
        type: SET_PAYMENT_METHODS,
        payload: res.data.getPaymentChannelByCountryId
      })
      alert(true)
    })
    .catch(err => {
      console.log(err)
      showError("Error in getting payment options")
    })
  }

  const resetState = () => {
    dispatch({
      type: RESET_STATE,
      payload: defaultState
    })
  }

  // show error
  const showError = (message) => {
    toast.error(message, {
      autoClose: 3000,
      closeButton: true,
      pauseOnHover: true,
      position: "top-right",
      hideProgressBar: true,
      toastId: "Yes",
    });
  };

  // show success notice
  // const showSuccess = (message) => {
  //   toast.success(message, {
  //     autoClose: 3000,
  //     closeButton: true,
  //     pauseOnHover: true,
  //     position: "top-right",
  //     hideProgressBar: true,
  //     toastId: "Yes",
  //   });
  // };

  return (
    <PaymentContext.Provider
      value={{
        state,
        setReverseCalc,
        getFxRates,
        setTransactionType,
        setCurrentRecipient,
        setReceiveType,
        setPaymentOption,
        createTransaction,
        resetState
      }}
    >
      {props.children}
    </PaymentContext.Provider>
  );
};

export default PaymentState;
