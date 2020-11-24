import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Paymentrecipient from "./pages/paymentRecipient/PaymentRecipient";
import PaymentTransfer from "./pages/paymentTransfer/PaymentTransfer";
import PaymentOptions from "./pages/paymentOptions/PaymentOptions";
import PaymentReview from "./pages/paymentReview/PaymentReview";
import TransactionHistory from "./pages/transactionHistory/TransactionHistory";
import recipients from "./pages/recipients/Recipents";
import AccountSettings from "./pages/account/AccountSettings";

import UserContext from "./context/user/userContext";
import RecipientContext from "./context/recipients/recipientContext";
import TransactionContext from "./context/transactions/transactionContext";

function Routes() {
  const userContext = useContext(UserContext);
  const recipientContext = useContext(RecipientContext);
  const transactionContext = useContext(TransactionContext);

  useEffect(() => {
    fetch("https://bp-user.herokuapp.com/graphql", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation login {
            login(loginArgs: {
              email: "ashtoonsandgraphics@gmail.com",
              password: "12345678"
            }) {
              token,
              user {
                id,
                firstName,
                email,
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const login = data.data.login;

        localStorage.setItem("token", login.token);
        localStorage.setItem("userId", login.user.id);
      })
      .then(() => {
        userContext.getUser();
        recipientContext.getRecipients();
        transactionContext.getTransactions();
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/payment'>
            <Redirect to='/payment/recipient' />
          </Route>
          <Route exact path='/payment/recipient' component={Paymentrecipient} />
          <Route exact path='/payment/transfer' component={PaymentTransfer} />
          <Route exact path='/payment/options' component={PaymentOptions} />
          <Route exact path='/payment/review' component={PaymentReview} />
          <Route exact path='/transactions' component={TransactionHistory} />
          <Route exact path='/recipients' component={recipients} />
          <Route exact path='/account'>
            <Redirect to='/account/settings' />
          </Route>
          <Route exact path='/account/settings' component={AccountSettings} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default Routes;
