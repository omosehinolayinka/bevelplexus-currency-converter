import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.scss";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import IntroState from "./context/intro/introState";

import Dashboard from "./pages/dashboard/Dashboard";
import PaymentRecipent from "./pages/paymentRecipent/PaymentRecipent";
import PaymentTransfer from "./pages/paymentTransfer/PaymentTransfer";
import PaymentOptions from "./pages/paymentOptions/PaymentOptions";
import PaymentReview from "./pages/paymentReview/PaymentReview";
import TransactionHistory from "./pages/transactionHistory/TransactionHistory";
import Recipents from "./pages/recipents/Recipents";
import AccountSettings from "./pages/account/AccountSettings";

//apollo client init

const client = new ApolloClient({
  url: "https://bp-transaction.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [intro, setIntro] = useState(true);

  return (
    <ApolloProvider client={client}>
      <IntroState>
        <div className='App'>
          <Router>
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => <Dashboard showTips={setIntro} />}
              />
              <Route exact path='/payment'>
                <Redirect to='/payment/recipent' />
              </Route>
              <Route
                exact
                path='/payment/recipent'
                render={(props) => <PaymentRecipent showTips={setIntro} />}
              />
              <Route
                exact
                path='/payment/transfer'
                render={(props) => <PaymentTransfer showTips={setIntro} />}
              />
              <Route
                exact
                path='/payment/options'
                render={(props) => <PaymentOptions showTips={setIntro} />}
              />
              <Route
                exact
                path='/payment/review'
                render={(props) => <PaymentReview showTips={setIntro} />}
              />
              <Route
                exact
                path='/transactions'
                render={(props) => <TransactionHistory showTips={setIntro} />}
              />
              <Route
                exact
                path='/recipents'
                render={(props) => <Recipents showTips={setIntro} />}
              />
              <Route exact path='/account'>
                <Redirect to='/account/settings' />
              </Route>
              <Route
                exact
                path='/account/settings'
                render={(props) => <AccountSettings showTips={setIntro} />}
              />
            </Switch>
          </Router>
        </div>
      </IntroState>
    </ApolloProvider>
  );
}

export default App;
