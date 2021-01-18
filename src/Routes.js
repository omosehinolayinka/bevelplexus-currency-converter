import React, { useState, useEffect, useContext } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState();

  const userContext = useContext(UserContext);
  const recipientContext = useContext(RecipientContext);
  const transactionContext = useContext(TransactionContext);

  useEffect(() => {
    const fetchData = () => {
      userContext.getUser();
      recipientContext.getRecipients(recipientContext.state.page);
      transactionContext.getTransactions(transactionContext.state.page);
    };

    localStorage.getItem("token")
      ? setIsAuthenticated(true, fetchData())
      : setIsAuthenticated(false);

    // eslint-disable-next-line
  }, []);

  if (isAuthenticated === false) {
    return (
      <Router>
        <Redirect to='/' />
      </Router>
    );
  }

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path='/dashboard' component={Dashboard} />
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
