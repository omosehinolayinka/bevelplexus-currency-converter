import React, { useReducer } from "react";
import TransactionReducer from "./transactionReducer";
import TransactionContext from "./transactionContext";

import { useApolloClient } from "@apollo/client";
import { queries as gql } from "./gqlQueries";
import { toast } from "react-toastify";

import { GET_TRANSACTIONS, CHANGE_PAGE } from "../types";

const TransactionState = (props) => {
  const defaultState = {
    page: {
      offset: 0,
      limit: 5
    },
    transactions: []
  };

  const [state, dispatch] = useReducer(TransactionReducer, defaultState);

  const client = useApolloClient();

  // get all transactions
  const getTransactions = (page) => {
    client
      .query({
        query: gql.GET_ALL_TRANSACTIONS,
        fetchPolicy: "cache-first",
        variables: {
          offset: page.offset,
          limit: page.limit
        }
      })
      .then((res) => {
        console.log(page);
        console.log(res);
        dispatch({
          type: GET_TRANSACTIONS,
          payload: res.data.getAllTransaction
        })
      })
      .catch((err) => {
        console.log(err);
        showError("Failed to fetch transactions");
      });
  };

  const changePage = (page) => {
    dispatch({
      type: CHANGE_PAGE,
      payload: page
    })

    getTransactions(page)

  }

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
        changePage
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionState;