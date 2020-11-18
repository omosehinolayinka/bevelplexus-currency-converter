import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../paymentRecipient/PaymentRecipient.scss";
import "./PaymentReview.scss";

import Layout from "../../components/layout/Layout";
import Alert from "../../components/alert/Alert";

function PaymentReview({showTips}) {
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState('4')

  return (
    <div id='payment-review'>
      <Layout currentMenu='payment' payProgress={progress} showTips={showTips}>
        <div className='page-title'>
          <h1>Review</h1>
        </div>

        <div className='section-three'>
          <div className='section-title'>
            <p>recipient Details</p>
          </div>

          <div className='box-container'>
            <div className='shadow-box'>
              <div className='action'>
                <Link to='#'>Edit</Link>
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
                    <h3>Rayana Rubin</h3>
                    <p>raynalubin@email.com</p>
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
                  +1 610 435 6354
                </p>

                <p>
                  <img src='/assets/svg/world.svg' alt='world' />
                  Canada
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='section-three payment-details-box'>
          <div className='box-container'>
            <div className='shadow-box'>
              <div className='action'>
                <Link to='#'>Edit</Link>
              </div>

              <div className='box__title'>
                <h3>Transfer summary</h3>
              </div>

              <div id='payment-summary-card'>
                <p>
                  <span>Send Amount</span>
                  <span>
                    <img src='/assets/svg/canada-flag.svg' alt='cad' />
                    1,000 USD
                  </span>
                </p>

                <p>
                  <span>Exchange rate</span>
                  <span>3.79</span>
                </p>

                <p>
                  <span>Fees</span>
                  <span className='greentext'>Free</span>
                </p>

                <p>
                  <span>recipient gets</span>
                  <span>
                    <img src='/assets/svg/brazil-flag.svg' alt='brl' />
                    3,900 BRL
                  </span>
                </p>

                <div className='section-divider'></div>

                <p>
                  <span>Your total</span>
                  <span>1,000 USD</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='section-three bank-details-box'>
          <div className='box-container'>
            <div className='shadow-box'>
              <div className='action'>
                <Link to='#'>Edit</Link>
              </div>

              <div className='box__title'>
                <h3>E-Transfer</h3>
              </div>

              <div id='payment-summary-card'>
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

                <p>
                  <span>Deposit Reference:</span>
                  <span>CodeQDX6MN3VSQL</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='section-four'>
          <Link to='/payment/options'>
            <button className='left'>PREVIOUS</button>
          </Link>
          <Link to='/payment/review'>
            <button className='right' onClick={() => [setCompleted(true), setProgress('5')]}>
              Next
            </button>
          </Link>
        </div>

        {completed && (
          <Alert
            type='success'
            title='Order Initiated'
            body="You will be notified once it's complete"
            action={() => setCompleted(false)}
          />
        )}
      </Layout>
    </div>
  );
}

export default PaymentReview;
