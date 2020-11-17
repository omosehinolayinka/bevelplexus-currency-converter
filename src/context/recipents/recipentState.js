import React, { useReducer } from "react";
import RecipentContext from "./recipentContext";
import RecipentReducer from "./recipentReducer";
import {
  gql,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { toast } from "react-toastify";

import { GET_RECIPENTS, SELECT_RECIPENT } from "../types";

const RecipentState = (props) => {
  const defaultState = {
    recipents: []
  };

  const [state, dispatch] = useReducer(RecipentReducer, defaultState);

  // create a custom client for recipent enpoint
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

  // get all recipents
  const getRecipents = () => {
    const RECIPENTS = gql`
      query getAllRecipient {
        getAllRecipient {
          id,
          userId,
          name,
          email,
          phoneNumber,
          location,
          updatedAt,
          bankInfo {
            bank,
            recipientId,
            accountNumber,
          }
        }
      }
    `;

    client
      .query({
        query: RECIPENTS,
        fetchPolicy: "cache-first",
      })
      .then((res) => {
        const data = res.data.getAllRecipient;

        dispatch({
          type: GET_RECIPENTS,
          payload: data
        })
      })
      .catch((err) => {
        toast.error("Failed to fetch recipents", {
          autoClose: 3000,
          closeButton: true,
          pauseOnHover: true,
          position: "top-right",
          hideProgressBar: true,
          toastId: "Yes",
        });
      });
  };

  return (
    <RecipentContext.Provider
      value={{
        state,
        getRecipents,
      }}
    >
      {props.children}
    </RecipentContext.Provider>
  );
};

export default RecipentState;
