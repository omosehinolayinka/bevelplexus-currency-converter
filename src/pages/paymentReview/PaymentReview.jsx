import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import "../paymentRecipient/PaymentRecipient.scss";
import "./PaymentReview.scss";

import Layout from "../../components/layout/Layout";

import PaymentContext from "../../context/payment/paymentContext";

function PaymentReview({ showTips }) {
  const paymentContext = useContext(PaymentContext);

  const [progress, setProgress] = useState("4");

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

  return (
    <div id='payment-review'>
      <Layout currentMenu='payment' payProgress={progress} showTips={showTips}>
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

        <div className='section-three bank-details-box'>
          <div className='box-container'>
            <div className='shadow-box'>
              <div className='action'>
                <Link to='#' className='spacer'>
                  Edit
                </Link>
              </div>

              <div className='box__title'>
                <h3> {paymentContext.state.paymentOption} </h3>
              </div>

              <div id='payment-summary-card'>
                {paymentContext.state.paymentOption === "Bank payment" ? (
                  <div className='payment-method'>
                    <p>
                      <span>Bank:</span>
                      <span>Access (Diamond Bank)</span>
                    </p>

                    <p>
                      <span>Account Name:</span>
                      <span>Bevel Plexus Texnologies</span>
                    </p>

                    <p>
                      <span>Account Number:</span>
                      <span className='greentext'>0110214749</span>
                    </p>
                  </div>
                ) : paymentContext.state.paymentOption === "E-transfer" ? (
                  <React.Fragment>
                    <div className='payment-method'>
                      <p>
                        <b>CashApp</b>
                      </p>

                      <p>
                        <span>Cashapp ID:</span>
                        <span className='greentext'>$bevelplexus</span>
                      </p>

                      <p className='instructions'>
                        Please cashapp{" "}
                        {paymentContext.state.fxDetails.baseAmount}{" "}
                        {paymentContext.state.fxDetails.sendCurrency} into the
                        cashapp id above to complete this transaction
                      </p>
                    </div>

                    <div className='payment-method'>
                      <p>
                        <b>Venmo</b>
                      </p>

                      <p>
                        <span>Number:</span>
                        <span className='greentext'>+1 (444) 000 0000</span>
                      </p>

                      <p className='instructions'>
                        Please send{" "}
                        {paymentContext.state.fxDetails.baseAmount}{" "}
                        {paymentContext.state.fxDetails.sendCurrency} to the venmo
                        phone number above to complete this transaction
                      </p>
                    </div>

                    <div className='payment-method'>
                      <p>
                        <b>Paypal</b>
                      </p>

                      <p>
                        <span>Email:</span>
                        <span className='greentext'>payment@bevelplexus.com</span>
                      </p>

                      <p className='instructions'>
                        Please send{" "}
                        {paymentContext.state.fxDetails.baseAmount}{" "}
                        {paymentContext.state.fxDetails.sendCurrency} through paypal to the email
                        above to complete this transaction
                      </p>
                    </div>
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
          <Link to='/payment/review'>
            <button className='right' onClick={() => setProgress("5")}>
              Home
            </button>
          </Link>
        </div>
      </Layout>

      {paymentContext.reference === "" && <Redirect to='/payment/options' />}
    </div>
  );
}

export default PaymentReview;
