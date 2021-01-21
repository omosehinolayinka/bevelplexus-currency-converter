import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import "./PaymentTransfer.scss";
import "../paymentRecipient/PaymentRecipient.scss";

import Layout from "../../components/layout/Layout";
import Calculator from "../../components/currencyCalc/CurrencyCalc";
import CustomCheckbox from "../../components/customCheckbox/CustomCheckbox";
import Modal from "../../components/addReceivingMethod/AddReceivingMethod";

import PaymentContext from "../../context/payment/paymentContext";
import dateFormat from "dateformat";

function PaymentTransfer({ showTips }) {
  const paymentContext = useContext(PaymentContext);
  const receiveType = paymentContext.state.fxDetails.receiveType;
  const isEmpty =
    paymentContext.state.fxDetails.actualAmount > 0 ? false : true;

  const recipient = paymentContext.state.recipient;

  const [showModal, setShowModal] = useState(false);

  const handleClick = (receiveType) => {
    paymentContext.setReceiveType(receiveType);

    // getFxRates();
  };

  // const getFxRates = () => {
  //   const {
  //     sendCurrency,
  //     baseAmount,
  //     destinationCurrency,
  //   } = paymentContext.state.fxDetails;
  // };

  // transaction dates
  const now = new Date();
  const twoDays = new Date(now.getTime() + 172800000);
  return (
    <div id='payment-transfer'>
      <Layout currentMenu='payment' payProgress='2' showTips={showTips}>
        <div className='page-title'>
          <h1>Transfer Details</h1>
        </div>

        <div className='section-one'>
          <div className='section-title'>
            <p>When you want they receive?</p>
          </div>

          <div className='box-container'>
            <div
              className={
                receiveType === "Delayed"
                  ? "shadow-box shadow-box-highlight"
                  : "shadow-box"
              }
              onClick={() => handleClick("Delayed")}
            >
              <img src='./assets/svg/calender.svg' alt='recipient' />
              <p className='flexible-text'>
                1-2 Business Day
                <span>Free</span>
              </p>
            </div>
            <div
              className={
                receiveType === "SameDay"
                  ? "shadow-box shadow-box-highlight"
                  : "shadow-box"
              }
              onClick={() => handleClick("SameDay")}
            >
              <img src='./assets/svg/hourglass.svg' alt='school' />
              <p className='flexible-text'>
                Same day
                <span>1% of transaction</span>
              </p>
            </div>
          </div>
        </div>

        <div className='section-two'>
          <div className='section-title'>
            <p>How much you would like to send?</p>
          </div>

          <div className='box-container'>
            <Calculator />

            <div className='transfer-info'>
              <p>
                Expected start date:{" "}
                <span> {dateFormat(now, "mmmm dS, yyyy")} </span>{" "}
                <span className='material-icons'> error_outline</span>
              </p>
              <p>
                Expected completion date:
                <span>
                  {" "}
                  {receiveType === "SameDay"
                    ? dateFormat(now, "mmmm dS, yyyy")
                    : dateFormat(twoDays, "mmmm dS, yyyy")}{" "}
                </span>
                <span className='material-icons'> error_outline</span>
              </p>
            </div>
          </div>
        </div>

        <div className='section-divider'></div>

        <div className='section-three'>
          <div className='section-title'>
            <p>Receiving method</p>{" "}
            <Link to='#' className='spacer' onClick={() => setShowModal(true)}>
              Add new
            </Link>
          </div>

          <div className='box-container'>
            <div className='shadow-box'>
              {!recipient.id && <Redirect to='/dashboard' />}
              {recipient.bankInfo && (
                <CustomCheckbox
                  checked={true}
                  title='Bank Deposit'
                  subLeft={recipient.bankInfo[0].bank}
                  subRight={`Account: ${recipient.bankInfo[0].accountNumber}`}
                />
              )}
            </div>
          </div>
        </div>

        <div className='section-four'>
          <Link to='/dashboard/recipient'>
            <button className='left'>Previous</button>
          </Link>
          <Link
            to={isEmpty ? "#" : "/dashboard/options"}
            className={isEmpty ? "disabled" : ""}
          >
            <button className='right'>Next</button>
          </Link>
        </div>
      </Layout>

      {showModal && <Modal action={setShowModal} recipientStae={recipient} />}
    </div>
  );
}

export default PaymentTransfer;
