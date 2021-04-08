import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Paymentrecipient from "./pages/paymentRecipient/PaymentRecipient";
import PaymentTransfer from "./pages/paymentTransfer/PaymentTransfer";
import PaymentOptions from "./pages/paymentOptions/PaymentOptions";
import PaymentReview from "./pages/paymentReview/PaymentReview";
import TransactionHistory from "./pages/transactionHistory/TransactionHistory";
import recipients from "./pages/recipients/Recipents";
import AccountSettings from "./pages/account/AccountSettings";
import Alert from "./components/alert/Alert";

import UserContext from "./context/user/userContext";
import RecipientContext from "./context/recipients/recipientContext";
import TransactionContext from "./context/transactions/transactionContext";
import PaymentContext from "./context/payment/paymentContext";

function Routes() {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [fetchInstitution, setFetchInstitution] = useState(true);

  const userContext = useContext(UserContext);
  const recipientContext = useContext(RecipientContext);
  const transactionContext = useContext(TransactionContext);
  const paymentContext = useContext(PaymentContext);
  useEffect(() => {
    localStorage.getItem("token") ? setIsAuthenticated(true) : setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated === true) {
      userContext.getUser();
      recipientContext.getRecipients(recipientContext.state.page);
      transactionContext.getTransactions(transactionContext.state.page);
      paymentContext.getAllCountries();
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);

  if (isAuthenticated === false) {
    window.location = process.env.REACT_APP_BASEURL || "https://app.bevelplexus.com";
  }

  if (userContext.state.user?.studentAccountDetail?.institutionId && fetchInstitution) {
    const institutionId = userContext.state.user.studentAccountDetail.institutionId;
    paymentContext.getInstitution(institutionId);
    setFetchInstitution(false);
  }
  return (
    <React.Fragment>
      <Router>
        {isAuthenticated === true && <Redirect to="/payment" />}
        <Switch>
          <Route exact path="/payment/dashboard" component={Dashboard} />
          <Route exact path="/payment/recipient" component={Paymentrecipient} />
          <Route exact path="/payment/transfer" component={PaymentTransfer} />
          <Route exact path="/payment/options" component={PaymentOptions} />
          <Route exact path="/payment/review" component={PaymentReview} />
          <Route exact path="/payment/transactions" component={TransactionHistory} />
          <Route exact path="/payment/recipients" component={recipients} />
          <Route exact path="/payment/account">
            <Redirect to="/payment/account/settings" />
          </Route>
          <Route exact path="/payment/account/settings" component={AccountSettings} />
          <Route exact path="/payment">
            <Redirect to="/payment/dashboard" />
          </Route>
          <Redirect to="/payment/dashboard" />
        </Switch>
        <Alert />
      </Router>
    </React.Fragment>
  );
}

export default Routes;
