import React, { useReducer, useContext } from "react";
import TransactionReducer from "./transactionReducer";
import TransactionContext from "./transactionContext";

import AlertContext from "../alert/alertContext";

import { useApolloClient } from "@apollo/client";
import { queries as gql } from "./gqlQueries";

import {
  GET_TRANSACTIONS,
  CHANGE_PAGE,
  GET_TRANSACTION_ANALYTICS
} from "../types";

const TransactionState = (props) => {
  const defaultState = {
    page: {
      offset: 0,
      limit: 5
    },
    transactions: [],
    transactionAnalytics: []
  };

  const [state, dispatch] = useReducer(TransactionReducer, defaultState);
  const alertContext = useContext(AlertContext);
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
        dispatch({
          type: GET_TRANSACTIONS,
          payload: res.data.getTransactionByUser
        });
      })
      .catch(() => {
        alertContext.showAlert({
          type: "error",
          title: "Oops!",
          body: "Failed to fetch transactions, please try again",
          action() {
            alertContext.hideAlert();
          }
        });
      });
  };
  const getTransactionAnalytics = (currencyCode) => {
    client
      .query({
        query: gql.GET_TRANSACTION_ANALYTICS,
        fetchPolicy: "cache-first",
        variables: {
          currencyCode: currencyCode
        }
      })
      .then((res) => {
        dispatch({
          type: GET_TRANSACTION_ANALYTICS,
          payload: res.data.getTransactionAnalyticsByUser
        });
      });
  };

  const changePage = (page) => {
    dispatch({
      type: CHANGE_PAGE,
      payload: page
    });

    getTransactions(page);
  };

  return (
    <TransactionContext.Provider
      value={{
        state,
        getTransactions,
        changePage,
        getTransactionAnalytics
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionState;
