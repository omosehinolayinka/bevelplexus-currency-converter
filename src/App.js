import React from "react";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Alert from "./components/alert/Alert";
import Routes from "./Routes";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import IntroState from "./context/intro/introState";
import AlertState from "./context/alert/alertState";
import PaymentState from "./context/payment/paymentState";
import RecipientState from "./context/recipients/recipientState";
import TransactionState from "./context/transactions/transactionState";
import UserState from "./context/user/userState";

//apollo client init

// payment api from env file or default value
const paymentApi =
  process.env.REACT_APP_PAYMENTAPI ||
  "https://bp-transaction.herokuapp.com/graphql";

const httpLink = createHttpLink({
  uri: paymentApi,
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

function App() {
  return (
    <ApolloProvider client={client}>
      <IntroState>
        <AlertState>
          <UserState>
            <RecipientState>
              <PaymentState>
                <TransactionState>
                  <div className='App'>
                    <Routes />
                    <ToastContainer />
                    <Alert />
                  </div>
                </TransactionState>
              </PaymentState>
            </RecipientState>
          </UserState>
        </AlertState>
      </IntroState>
    </ApolloProvider>
  );
}

export default App;
