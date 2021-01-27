import React, { useReducer } from "react";
import UserContext from "./userContext";
import UserReducer from "./userReducer";
import { queries as gql } from "./gqlQueries";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  createHttpLink,
  // createUploadLink,
  InMemoryCache,
} from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";

import { toast } from "react-toastify";

import { GET_USER } from "../types";

const UserState = (props) => {
  const defaultState = {
    user: {
      userVerification: {
        isEmailVerified: false,
        isIdentityVerified: false,
        isPhoneNumberVerified: false,
        isSchoolEnrollmentVerified: false,
        isUtilityBillVerified: false,
      },
    },
  };

  const [state, dispatch] = useReducer(UserReducer, defaultState);

  // user api from env file or default value
  const userApi = process.env.REACT_APP_USER_API || "https://bp-user.herokuapp.com/graphql"

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

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  // create client upload link
  const link = createUploadLink({
    uri: userApi,
  });

  const uploadClient = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache(),
  });

  // get user details
  const getUser = (setUser) => {
    client
      .query({
        query: gql.GET_USER,
        fetchPolicy: "cache-first",
        variables: {
          id: localStorage.getItem("userId"),
        },
      })
      .then((res) => {
        dispatch({
          type: GET_USER,
          payload: res.data.user,
        });

        setUser && setUser(res.data.user);
      });
  };

  //update user details
  const updateUser = (details) => {
    client
      .mutate({
        mutation: gql.UPDATE_USER,
        variables: {
          userId: localStorage.getItem("userId"),
          firstName: details.firstName,
          lastName: details.lastName,
          email: details.email,
          phoneNumber: details.phoneNumber,
        },
      })
      .then(() => {
        showSuccess("User Updated");
      })
      .catch(() => {
        showError("Couldn't update, An error occured");
      });
  };

  // reset password
  const resetPassword = (data, setLoading) => {
    client
      .mutate({
        mutation: gql.RESET_PASSWORD,
        variables: {
          userId: localStorage.getItem("userId"),
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
      })
      .then(() => {
        setLoading(false);
        showSuccess("Password Updated");
      })
      .catch(() => {
        showError("Old password is incorrect");
        setLoading(false);
      });
  };

  //verify identity
  const verifyIdentity = (file, setFile) => {
    uploadClient
      .mutate({
        mutation: gql.VERIFY_IDENTITY,
        variables: {
          file: file,
          userId: localStorage.getItem("userId"),
        },
      })
      .then(() => setFile("completed"))
      .catch(() => showError("Couldn't upload file, try again"));
  };

  //verify utility
  const verifyUtility = (file, setFile) => {
    uploadClient
      .mutate({
        mutation: gql.VERIFY_UTILITY,
        variables: {
          file: file,
          userId: localStorage.getItem("userId"),
        },
      })
      .then(() => setFile("completed"))
      .catch(() => showError("Couldn't upload file, try again"));
  };

  //verify enrollment
  const verifyEnrollment = (file, setFile) => {
    uploadClient
      .mutate({
        mutation: gql.VERIFY_ENROLLMENT,
        variables: {
          file: file,
          userId: localStorage.getItem("userId"),
        },
      })
      .then(() => setFile("completed"))
      .catch(() => showError("Couldn't upload file, try again"));
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
    <UserContext.Provider
      value={{
        state,
        getUser,
        updateUser,
        resetPassword,
        verifyIdentity,
        verifyUtility,
        verifyEnrollment,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
