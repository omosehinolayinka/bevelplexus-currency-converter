import React, { useReducer } from "react";
import RecipientContext from "./recipientContext";
import RecipientReducer from "./recipientReducer";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { queries as gql }  from "./gqlQueries";
import { setContext } from "@apollo/client/link/context";
import { toast } from "react-toastify";

import {
  GET_RECIPIENTS,
  // SELECT_RECIPIENT,
  // UPDATE_RECIPIENT,
  // UPDATE_BANK_INFO,
} from "../types";

const RecipientState = (props) => {
  const defaultState = {
    recipients: [],
  };

  const [state, dispatch] = useReducer(RecipientReducer, defaultState);

  // create a custom client for recipient enpoint
  const httpLink = createHttpLink({
    uri: "https://bp-user.herokuapp.com/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  // get all recipients
  const getRecipients = () => {
    client
      .query({
        query: gql.ALL_RECIPIENTS,
        fetchPolicy: "cache-first",
      })
      .then((res) => {
        const data = res.data.getAllRecipient;

        dispatch({
          type: GET_RECIPIENTS,
          payload: data,
        });
      })
      .catch(() => {
        showError("Failed to fetch recipients");
      });
  };

  // add recipents
  const addRecipient = (data) => {};

  // add bank info
  const addBankInfo = () => {};

  // update recipients
  const updateRecipient = (data) => {
    client
      .mutate({
        mutation: gql.UPDATED_RECIPIENT_INFO,
        variables: {
          recipientId: data.recipientId,
          userId: data.userId,
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          location: data.location,
        },
      })
      .then(() => {
        updateBank(data);
      })
      .then(() => {
        getRecipients();
      })
      .catch(() => {
        showError("Unexpected error, check your network");
      });
  };

  // update bank details
  const updateBank = (data) => {
    client
      .mutate({
        mutation: gql.UPDATED_BANK_INFO,
        variables: {
          bankInfoId: data.bankInfo[0].id,
          recipientId: data.bankInfo[0].recipientId,
          bank: data.bank,
          accountNumber: data.accountNumber,
        },
      })
      .then(() => {
        getRecipients();
      })
      .catch(() => {
        showError("Coulnd't update bank info, check your network");
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
    <RecipientContext.Provider
      value={{
        state,
        getRecipients,
        updateRecipient,
      }}
    >
      {props.children}
    </RecipientContext.Provider>
  );
};

export default RecipientState;
