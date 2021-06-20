import React, { useEffect, useContext } from "react";
import Alert from "./components/alert/Alert";
import PaymentContext from "./context/payment/paymentContext";
import CurrencyCalc from "./components/currencyCalc/CurrencyCalc";

function Routes() {
  const paymentContext = useContext(PaymentContext);

  useEffect(() => {
    async function login() {
      const query = {
        query: `mutation {
         login(loginArgs: { email: "tmy63454@cuoly.com", password: "T3m!l@de" }) {
              token
              user {
                id
                firstName
                lastName
                email
              }
      }
    }
    `
      };

      const body = JSON.stringify(query);
      const res = await fetch("https://api.bevelplexus.com/user/graphql", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      const token = data?.data?.login.token;
      console.log(token);
      localStorage.setItem("token", token);
      paymentContext.getAllCountries();
    }
    login();
  }, []);

  return (
    <React.Fragment>
      <CurrencyCalc />
      <Alert />
    </React.Fragment>
  );
}

export default Routes;
