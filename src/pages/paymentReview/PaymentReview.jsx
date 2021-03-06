import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import "../paymentRecipient/PaymentRecipient.scss";
import "./PaymentReview.scss";

import Layout from "../../components/layout/Layout";

import PaymentContext from "../../context/payment/paymentContext";
import AlertContext from "../../context/alert/alertContext";

function PaymentReview({ showTips }) {
  const [animate, isAnimated] = useState(false);

  const paymentContext = useContext(PaymentContext);
  const alertContext = useContext(AlertContext);

  const { name, email, phoneNumber, location } = paymentContext.state.recipient;

  const {
    sendCurrency,
    baseAmount,
    rate,
    destinationCurrency,
    convertedAmount
  } = paymentContext.state.fxDetails;

  const fee =
    paymentContext.state.paymentOption === ("E-transfer" || "Bank payment")
      ? "Free"
      : baseAmount * 0.01;

  const banks = paymentContext.state.paymentOptions.filter(
    (item) => item.paymentType === "Bank"
  );
  const eTransfers = paymentContext.state.paymentOptions.filter(
    (item) => item.paymentType === "ETransfer"
  );

  useEffect(() => {
    alertContext.showAlert({
      type: "warning",
      title: "Order Initiated",
      body:
        "Please read the INSTRUCTIONS on the next screen to complete payment process for this transaction",
      anchor: {
        target: "paymentInstructions",
        smooth: true,
        duration: 1000
      },
      action() {
        alertContext.hideAlert();
        isAnimated(true);
      }
    });

    //eslint-disable-next-line
  }, []);

  const flagCode = destinationCurrency.slice(0, 2).toLowerCase();
  const sendFlagCode = sendCurrency.slice(0, 2).toLowerCase();

  function transactionTitle(title) {
    if (title === "E-transfer") {
      return "E-Transfer";
    } else if (title === "Bank payment") {
      return "Bank Deposit";
    } else {
      return title;
    }
  }

  return (
    <div id="payment-review">
      <Layout currentMenu="payment" payProgress="5" showTips={showTips}>
        <div className="page-title">
          <h1>Review</h1>
        </div>

        <div className="section-three">
          <div className="section-title">
            <p>Recipient Details</p>
          </div>

          <div className="box-container">
            <div className="shadow-box">
              <div className="action">
                <Link to="#" className="spacer">
                  Edit
                </Link>
              </div>

              <div className="user-details">
                <div className="user-details__avi">
                  <img src="./assets/img/avatar-square.png" alt="avi" />
                  <img
                    src={
                      flagCode === "xa"
                        ? `https://www.countryflags.io/cg/flat/24.png`
                        : `https://www.countryflags.io/${flagCode}/flat/24.png`
                    }
                    // src='./assets/svg/brazil-flag.svg'
                    alt={flagCode}
                    className="user-details__avi__flag"
                  />
                </div>

                <div className="wrap">
                  <span className="user-details__text-wrapper">
                    <h3> {name} </h3>
                    <p> {email} </p>
                  </span>

                  <span className="user-details__text-wrapper">
                    <h3>Bank Deposit</h3>
                    <p>Receiving method</p>
                  </span>
                </div>
              </div>

              <div className="contact-details">
                <p>
                  <img src="./assets/svg/smartphone.svg" alt="smartphone" />
                  {phoneNumber}
                </p>

                <p>
                  <img src="./assets/svg/world.svg" alt="world" />
                  {location}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-three payment-details-box">
          <div className="box-container">
            <div className="shadow-box">
              <div className="action">
                <Link to="#" className="spacer">
                  Edit
                </Link>
              </div>

              <div className="box__title">
                <h3>Transfer Summary</h3>
              </div>

              <div id="payment-summary-card">
                <p>
                  <span>You Send</span>
                  <span>
                    <img
                      src={
                        sendFlagCode === "xa"
                          ? `https://www.countryflags.io/cg/flat/24.png`
                          : `https://www.countryflags.io/${sendFlagCode}/flat/24.png`
                      }
                      alt={sendFlagCode}
                    />
                    {baseAmount} {sendCurrency}
                  </span>
                </p>

                <p>
                  <span>Exchange Rate</span>
                  <span> {rate} </span>
                </p>

                <p>
                  <span>Fees</span>
                  <span className="greentext">{fee}</span>
                </p>

                <p>
                  <span>Recipient Receives</span>
                  <span>
                    <img
                      src={
                        flagCode === "xa"
                          ? `https://www.countryflags.io/cg/flat/24.png`
                          : `https://www.countryflags.io/${flagCode}/flat/24.png`
                      }
                      alt={flagCode}
                    />
                    {convertedAmount} {destinationCurrency}
                  </span>
                </p>

                <div className="section-divider"></div>

                <p>
                  <span>Your Total</span>
                  <span>
                    {paymentContext.state.paymentOption ===
                    ("E-transfer" || "Bank payment")
                      ? `${baseAmount} ${sendCurrency}`
                      : `${baseAmount + fee} ${sendCurrency}`}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="section-three bank-details-box"
          id="paymentInstructions"
        >
          <div className="box-container">
            <div
              className={`shadow-box ${
                animate && "shadow-box-highlight animated"
              }`}
            >
              <div className="action">
                <Link to="#" className="spacer">
                  Edit
                </Link>
              </div>

              <div className="box__title">
                <h3>
                  {" "}
                  {transactionTitle(paymentContext.state.paymentOption)}{" "}
                  Instructions
                </h3>
              </div>

              <div id="payment-summary-card">
                {paymentContext.state.paymentOption === "Bank payment" ? (
                  <React.Fragment>
                    {banks.map((option, index) => (
                      <React.Fragment key={index}>
                        <div className="payment-method">
                          <p>
                            <b> {option.header} </b>
                          </p>

                          {option.paymentProperties.map((item, index) => (
                            <p key={index}>
                              <span>{item.label}:</span>
                              <span className="greentext">{item.value}</span>
                            </p>
                          ))}
                        </div>
                      </React.Fragment>
                    ))}
                    {banks.length < 1 && (
                      <div className="payment-method">
                        <p>No banks available at the moment</p>
                      </div>
                    )}
                  </React.Fragment>
                ) : paymentContext.state.paymentOption === "E-transfer" ? (
                  <React.Fragment>
                    {eTransfers.map((option, index) => (
                      <React.Fragment key={index}>
                        <div className="payment-method">
                          <p>
                            <b> {option.header} </b>
                          </p>

                          {option.paymentProperties.map((item, index) => (
                            <p key={index}>
                              <span>{item.label}:</span>
                              <span className="greentext">{item.value}</span>
                            </p>
                          ))}
                        </div>
                      </React.Fragment>
                    ))}

                    {eTransfers.length < 1 && (
                      <div className="payment-method">
                        <p>No banks available at the moment</p>
                      </div>
                    )}
                  </React.Fragment>
                ) : (
                  <div className="payment-method">
                    <p>No payment methods available</p>
                  </div>
                )}

                <p className="reference-id">
                  <span>Deposit Reference:</span>
                  <span>{paymentContext.state.referenceID}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-four">
          <Link to="/payment/options" className="spacer">
            <button className="left">PREVIOUS</button>
          </Link>
          <Link to="/payment">
            <button
              className="right"
              onClick={() => paymentContext.resetState()}
            >
              Home
            </button>
          </Link>
        </div>
      </Layout>

      {paymentContext.reference === "" && <Redirect to="/payment/options" />}
    </div>
  );
}

export default PaymentReview;
