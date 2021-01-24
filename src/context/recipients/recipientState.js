import React, { useReducer } from "react";
import RecipientContext from "./recipientContext";
import RecipientReducer from "./recipientReducer";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { queries as gql } from "./gqlQueries";
import { setContext } from "@apollo/client/link/context";
import { toast } from "react-toastify";

import {
  GET_RECIPIENTS,
  CHANGE_PAGE
} from "../types";

const RecipientState = (props) => {
  const defaultState = {
    page: {
      offset: 0,
      limit: 5
    },
    recipients: [],
  };

  const [state, dispatch] = useReducer(RecipientReducer, defaultState);

  // create a custom client for recipient enpoint
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_USER_API,
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
  const getRecipients = (page) => {
    client
      .query({
        query: gql.ALL_RECIPIENTS,
        fetchPolicy: "cache-first",
        variables: {
          offset: page.offset,
          limit: page.limit
        }
      })
      .then((res) => {
        const data = res.data.recipientByUser;
        dispatch({
          type: GET_RECIPIENTS,
          payload: data,
        });
      })
      .catch(() => {
        showError("Failed to fetch recipients");
      });
  };

  // get single recipient
  const getRecipient = (id, callback) => {
    client.query({
      query: gql.SINGLE_RECIPIENT,
      fetchPolicy: "cache-first",
      variables: {
        id: id
      }
    })
    .then(res => {
      console.log(res.data.recipient);
      callback.setCurrentRecipient(res.data.recipient)
    })
    .catch(err => console.log(err))
  }

  // add recipents
  const addRecipient = (data) => {
    console.log(data);
    client.mutate({
      mutation: gql.NEW_RECIPIENT,
      variables: {
        userId: data.userId,
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        location: data.location
      }
    })
    .then(res => {
      const id = res.data.addRecipient.id
      addBankInfo(id, data)
    })
    .catch(() => {
      showError("Couldn't add recipient, please refresh")
    })
  };

  // add bank info
  const addBankInfo = (id, data) => {
    console.log(id, data);
    client.mutate({
      mutation: gql.ADD_BANK_INFO,
      variables: {
        recipientId: id,
        bank: data.bank,
        accountNumber: data.accountNumber,
        bankCode: data.bankCode
      }
    })
    .then(() => {
      getRecipients(defaultState.page)
      showSuccess("Recipient Added")
      data.closeModal(false)
    }) 
    .catch(() => {
      showError("Couldn't add bank details, please try again")
      // data.loading(false)
    })
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
        },
      })
      .then(() => {
        updateBank(data);
      })
      .catch(() => {
        showError("Error updating recipient");
        // data.loading(false)
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
          bankCode: data.bankCode
        },
      })
      .then(() => {
        getRecipients(defaultState.page);
        showSuccess("Recipient Updated")
        data.closeModal(false);
      })
      .catch(() => {
        showError("Coulnd't update bank info, check your network");
        data.loading(false)
      });
  };

  // change page
  const changePage = (page) => {
    dispatch({
      type: CHANGE_PAGE,
      payload: page
    })

    getRecipients(page);
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

  // show success notice
  const showSuccess = (message) => {
    toast.success(message, {
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
        getRecipient,
        updateRecipient,
        addRecipient,
        changePage
      }}
    >
      {props.children}
    </RecipientContext.Provider>
  );
};

export default RecipientState;
