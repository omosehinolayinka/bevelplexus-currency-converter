import React from "react";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Routes from './Routes'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import IntroState from "./context/intro/introState";
import PaymentState from "./context/payment/paymentState";
import RecipientState from "./context/recipients/recipientState";
import TransactionState from "./context/transactions/transactionState";
import UserState from "./context/user/userState";



//apollo client init

// payment api from env file or default value
const paymentApi = process.env.REACT_APP_PAYMENTAPI || "https://bp-transaction.herokuapp.com/graphql"

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <IntroState>
        <UserState>
          <RecipientState>
            <PaymentState>
              <TransactionState>
                <div className='App'>
                  <Routes />
                  <ToastContainer />
                </div>
              </TransactionState>
            </PaymentState>
          </RecipientState>
        </UserState>
      </IntroState>
    </ApolloProvider>
  );
}

export default App;
