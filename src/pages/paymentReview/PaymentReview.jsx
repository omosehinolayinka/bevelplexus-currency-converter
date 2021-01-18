import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import "../paymentRecipient/PaymentRecipient.scss";
import "./PaymentReview.scss";

import Layout from "../../components/layout/Layout";
import Alert from "../../components/alert/Alert";

import PaymentContext from "../../context/payment/paymentContext";

function PaymentReview({ showTips }) {
  const [alert, setAlert] = useState(true);
  const [animate, isAnimated] = useState(false);

  const paymentContext = useContext(PaymentContext);
  const { name, email, phoneNumber, location } = paymentContext.state.recipient;

  const {
    sendCurrency,
    baseAmount,
    rate,
    destinationCurrency,
    convertedAmount,
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

  return (
    <div id='payment-review'>
      <Layout currentMenu='payment' payProgress="5" showTips={showTips}>
        <div className='page-title'>
          <h1>Review</h1>
        </div>

        <div className='section-three'>
          <div className='section-title'>
            <p>Recipient Details</p>
          </div>

          <div className='box-container'>
            <div className='shadow-box'>
              <div className='action'>
                <Link to='#' className='spacer'>
                  Edit
                </Link>
              </div>

              <div className='user-details'>
                <div className='user-details__avi'>
                  <img src='/assets/img/avatar-square.png' alt='avi' />
                  <img
                    src='/assets/svg/brazil-flag.svg'
                    alt=''
                    className='user-details__avi__flag'
                  />
                </div>

                <div className='wrap'>
                  <span className='user-details__text-wrapper'>
                    <h3> {name} </h3>
                    <p> {email} </p>
                  </span>

                  <span className='user-details__text-wrapper'>
                    <h3>Bank Deposit</h3>
                    <p>Receiving method</p>
                  </span>
                </div>
              </div>

              <div className='contact-details'>
                <p>
                  <img src='/assets/svg/smartphone.svg' alt='smartphone' />
                  {phoneNumber}
                </p>

                <p>
                  <img src='/assets/svg/world.svg' alt='world' />
                  {location}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='section-three payment-details-box'>
          <div className='box-container'>
            <div className='shadow-box'>
              <div className='action'>
                <Link to='#' className='spacer'>
                  Edit
                </Link>
              </div>

              <div className='box__title'>
                <h3>Transfer summary</h3>
              </div>

              <div id='payment-summary-card'>
                <p>
                  <span>Send Amount</span>
                  <span>
                    <img src='/assets/svg/canada-flag.svg' alt='cad' />
                    {baseAmount} {sendCurrency}
                  </span>
                </p>

                <p>
                  <span>Exchange rate</span>
                  <span> {rate} </span>
                </p>

                <p>
                  <span>Fees</span>
                  <span className='greentext'>{fee}</span>
                </p>

                <p>
                  <span>recipient gets</span>
                  <span>
                    <img src='/assets/svg/brazil-flag.svg' alt='brl' />
                    {convertedAmount} {destinationCurrency}
                  </span>
                </p>

                <div className='section-divider'></div>

                <p>
                  <span>Your total</span>
                  <span>
                    {paymentContext.state.paymentOption ===
                    ("E-transfer" || "Bank payment")
                      ? `${baseAmount} ${sendCurrency}`
                      : `${baseAmount + fee} ${destinationCurrency}`}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-three bank-details-box" id="paymentInstructions">
          <div className='box-container'>
            <div className={`shadow-box ${animate && 'shadow-box-highlight animated'}`}>
              <div className='action'>
                <Link to='#' className='spacer'>
                  Edit
                </Link>
              </div>

              <div className='box__title'>
                <h3> {paymentContext.state.paymentOption} Instructions</h3>
              </div>

              <div id='payment-summary-card'>
                {paymentContext.state.paymentOption === "Bank payment" ? (
                  <React.Fragment>
                    {banks.map((option, index) => (
                      <React.Fragment key={index}>
                        <div className='payment-method'>
                          <p>
                            <b> {option.header} </b>
                          </p>

                          {option.paymentProperties.map((item, index) => (
                            <p key={index}>
                              <span>{item.label}:</span>
                              <span className='greentext'>{item.value}</span>
                            </p>
                          ))}
                        </div>
                      </React.Fragment>
                    ))}
                    {banks.length < 1 && (
                      <div className='payment-method'>
                        <p>No banks available at the moment</p>
                      </div>
                    )}
                  </React.Fragment>
                ) : paymentContext.state.paymentOption === "E-transfer" ? (
                  <React.Fragment>
                    {eTransfers.map((option, index) => (
                      <React.Fragment key={index}>
                        <div className='payment-method'>
                          <p>
                            <b> {option.header} </b>
                          </p>

                          {option.paymentProperties.map((item, index) => (
                            <p key={index}>
                              <span>{item.label}:</span>
                              <span className='greentext'>{item.value}</span>
                            </p>
                          ))}
                        </div>
                      </React.Fragment>
                    ))}

                    {eTransfers.length < 1 && (
                      <div className='payment-method'>
                        <p>No banks available at the moment</p>
                      </div>
                    )}
                  </React.Fragment>
                ) : (
                  <div className='payment-method'>
                    <p>No payment methods available</p>
                  </div>
                )}

                <p className='reference-id'>
                  <span>Deposit Reference:</span>
                  <span>{paymentContext.state.referenceID}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='section-four'>
          <Link to='/payment/options' className='spacer'>
            <button className='left'>PREVIOUS</button>
          </Link>
          <Link to='/dashboard'>
            <button className='right' onClick={() => paymentContext.resetState()}>
              Home
            </button>
          </Link>
        </div>
      </Layout>

      {alert && (
          <Alert
            type='warning'
            title='Order Initiated'
            body="Please read the INSTRUCTIONS on the next screen to complete payment process for this transaction"
            action={() => [setAlert(false), isAnimated(true)]}
          />
        )}

      {paymentContext.reference === "" && <Redirect to='/payment/options' />}
    </div>
  );
}

export default PaymentReview;
