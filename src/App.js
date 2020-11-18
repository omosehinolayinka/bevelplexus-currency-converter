import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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

import Dashboard from "./pages/dashboard/Dashboard";
import Paymentrecipient from "./pages/paymentRecipient/PaymentRecipient";
import PaymentTransfer from "./pages/paymentTransfer/PaymentTransfer";
import PaymentOptions from "./pages/paymentOptions/PaymentOptions";
import PaymentReview from "./pages/paymentReview/PaymentReview";
import TransactionHistory from "./pages/transactionHistory/TransactionHistory";
import recipients from "./pages/recipients/Recipents";
import AccountSettings from "./pages/account/AccountSettings";

//apollo client init

const httpLink = createHttpLink({
  uri: "https://bp-transaction.herokuapp.com/graphql",
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
        <RecipientState>
          <PaymentState>
            <div className='App'>
              <Router>
                <Switch>
                  <Route exact path='/' component={Dashboard} />
                  <Route exact path='/payment'>
                    <Redirect to='/payment/recipient' />
                  </Route>
                  <Route
                    exact
                    path='/payment/recipient'
                    component={Paymentrecipient}
                  />
                  <Route
                    exact
                    path='/payment/transfer'
                    component={PaymentTransfer}
                  />
                  <Route
                    exact
                    path='/payment/options'
                    component={PaymentOptions}
                  />
                  <Route
                    exact
                    path='/payment/review'
                    component={PaymentReview}
                  />
                  <Route
                    exact
                    path='/transactions'
                    component={TransactionHistory}
                  />
                  <Route exact path='/recipients' component={recipients} />
                  <Route exact path='/account'>
                    <Redirect to='/account/settings' />
                  </Route>
                  <Route
                    exact
                    path='/account/settings'
                    component={AccountSettings}
                  />
                </Switch>
              </Router>
              <ToastContainer />
            </div>
          </PaymentState>
        </RecipientState>
      </IntroState>
    </ApolloProvider>
  );
}

export default App;
