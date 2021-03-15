import React, { useReducer, useContext } from "react";
import RecipientContext from "./recipientContext";
import RecipientReducer from "./recipientReducer";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { queries as gql } from "./gqlQueries";
import { setContext } from "@apollo/client/link/context";

import AlertContext from "../alert/alertContext";

import { GET_RECIPIENTS, CHANGE_PAGE } from "../types";

const RecipientState = (props) => {
  const defaultState = {
    page: {
      offset: 0,
      limit: 5,
    },
    recipients: [],
  };

  const [state, dispatch] = useReducer(RecipientReducer, defaultState);
  const alertContext = useContext(AlertContext);

  // user api from env file or default value
  const userApi =
    process.env.REACT_APP_USER_API || "https://bp-user.herokuapp.com/graphql";

  // create a custom client for recipient enpoint
  const httpLink = createHttpLink({
    uri: userApi,
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

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((err) => {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            window.location = process.env.REACT_APP_BASEURL || "https://app.bevelplexus.com";
            break;
          default:
            console.log(err.message);
        }
      });
    }

    if (networkError) {
      console.log(`[Network Error]: ${networkError}`);
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(errorLink).concat(httpLink),
    cache: new InMemoryCache(),
  });

  // get all recipients
  const getRecipients = (page) => {
    client
      .query({
        query: gql.ALL_RECIPIENTS,
        fetchPolicy: "cache-first",
        variables: {
          offset: page.offset,
          limit: page.limit,
        },
      })
      .then((res) => {
        const data = res.data.recipientByUser;
        dispatch({
          type: GET_RECIPIENTS,
          payload: data,
        });
      })
      .catch(() => {
        alertContext.showAlert({
          type: "error",
          title: "Oops!",
          body: "Failed to fetch recipients",
          action() {
            alertContext.hideAlert();
          },
        });
      });
  };

  // get single recipient
  const getRecipient = (id, callback) => {
    client
      .query({
        query: gql.SINGLE_RECIPIENT,
        fetchPolicy: "cache-first",
        variables: {
          id: id,
        },
      })
      .then((res) => {
        console.log(res.data.recipient);
        callback.setCurrentRecipient(res.data.recipient);
      })
      .catch(() => {
        alertContext.showAlert({
          type: "error",
          title: "Oops!",
          body:
            "We are finding it difficult to get this recipient's details. Please try again",
          action() {
            alertContext.hideAlert();
          },
        });
      });
  };

  // add recipents
  const addRecipient = (data) => {
    client
      .mutate({
        mutation: gql.NEW_RECIPIENT,
        variables: {
          userId: data.userId,
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          location: data.location,
          bankCode: data.transitOrSortCode,
        },
      })
      .then((res) => {
        const id = res.data.addRecipient.id;
        addBankInfo(id, data);
      })
      .catch(() => {
        alertContext.showAlert({
          type: "error",
          title: "Oops!",
          body: "Couldn't add recipient, please try again",
          action() {
            alertContext.hideAlert();
          },
        });
      });
  };

  // add bank info
  const addBankInfo = (id, data) => {
    console.log(id, data);
    client
      .mutate({
        mutation: gql.ADD_BANK_INFO,
        variables: {
          recipientId: id,
          bank: data.bank,
          accountNumber: data.accountNumber,
          bankCode: data.bankCode,
          transitOrSortCode: data.transitOrSortCode,
        },
      })
      .then(() => {
        getRecipients(defaultState.page);
        alertContext.showAlert({
          type: "success",
          title: "Success!",
          body: `${data.name} has been added as a recipient`,
          action() {
            alertContext.hideAlert();
          },
        });
        data.closeModal(false);
      })
      .catch(() => {
        alertContext.showAlert({
          type: "error",
          title: "Oops!",
          body: "Couldn't add bank details, please try again",
          action() {
            alertContext.hideAlert();
          },
        });
      });
  };

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
          bankCode: data.transitOrSortCode,
        },
      })
      .then(() => {
        updateBank(data);
      })
      .catch(() => {
        alertContext.showAlert({
          type: "error",
          title: "Oops!",
          body: "Error updating recipient, please try again",
          action() {
            alertContext.hideAlert();
          },
        });
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
          bankCode: data.bankCode,
          transitOrSortCode: data.transitOrSortCode,
        },
      })
      .then(() => {
        getRecipients(defaultState.page);
        alertContext.showAlert({
          type: "success",
          title: "Success!",
          body: `${data.name}'s details have been updated successfully`,
          action() {
            alertContext.hideAlert();
          },
        });
        data.closeModal(false);
      })
      .catch(() => {
        alertContext.showAlert({
          type: "error",
          title: "Oops!",
          body: "Coulnd't update bank info, check your network and try again",
          action() {
            alertContext.hideAlert();
          },
        });
        data.loading(false);
      });
  };

  // change page
  const changePage = (page) => {
    dispatch({
      type: CHANGE_PAGE,
      payload: page,
    });

    getRecipients(page);
  };

  return (
    <RecipientContext.Provider
      value={{
        state,
        getRecipients,
        getRecipient,
        updateRecipient,
        addRecipient,
        changePage,
      }}
    >
      {props.children}
    </RecipientContext.Provider>
  );
};

export default RecipientState;
