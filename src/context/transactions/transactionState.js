import React, { useReducer } from "react";
import TransactionReducer from "./transactionReducer";
import TransactionContext from "./transactionContext";

import { useApolloClient } from "@apollo/client";
import { queries as gql } from "./gqlQueries";
import { toast } from "react-toastify";

import { GET_TRANSACTIONS } from "../types";

const TransactionState = (props) => {
  const defaultState = {
    transactions: []
  };

  const [state, dispatch] = useReducer(TransactionReducer, defaultState);

  const client = useApolloClient();

  // get all transactions
  const getTransactions = () => {
    client
      .query({
        query: gql.GET_ALL_TRANSACTIONS,
        fetchPolicy: "cache-first",
      })
      .then((res) => {
    
        dispatch({
          type: GET_TRANSACTIONS,
          payload: res.data.getAllTransaction
        })
      })
      .catch((err) => {
        console.log(err);
        showError("Failed to fetch recipients");
      });
  };

  // show error notice
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

  return (
    <TransactionContext.Provider
      value={{
        state,
        getTransactions,
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionState;