import React, { useReducer } from "react";
import UserContext from "./userContext";
import UserReducer from "./userReducer";
import { queries as gql } from "./gqlQueries";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

import { GET_USER } from "../types";

const UserState = (props) => {
  const defaultState = {
    user: []
  };

  const [state, dispatch] = useReducer(UserReducer, defaultState);

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

  // get user details
  const getUser = (setUser) => {
    client.query({
      query: gql.GET_USER,
      fetchPolicy: "cache-first",
      variables: {
        id: localStorage.getItem("userId")
      }
    })
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data.user
      })

      setUser && setUser(res.data.user)
    })
  };

  //update user details
  const updateUser = ( details ) => {
  
    client.mutate({
      mutation: gql.UPDATE_USER,
      variables: {
        userId: localStorage.getItem("userId"),
        firstName: details.firstName,
        lastName: details.lastName,
        email: details.email,
        phoneNumber: details.phoneNumber
      }
    })
    .then(res => {
      console.log(res);

      // show success alert
    })
    .catch(err => {
      console.log(err);
    })
  }
  

  // reset password
  const resetPassword = (data, setLoading) => {
    client.mutate({
      mutation: gql.RESET_PASSWORD,
      variables: {
        userId: localStorage.getItem("userId"),
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      }
    })
    .then(res => {
      console.log(res.data);
      setLoading(false)
    })
    .catch(err => console.log(err))
  }

  return (
    <UserContext.Provider
      value={{
        state,
        getUser,
        updateUser,
        resetPassword
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
