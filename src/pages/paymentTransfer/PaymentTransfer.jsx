import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PaymentTransfer.scss";
import "../paymentRecipent/PaymentRecipent.scss"

import Layout from "../../components/layout/Layout";
import Calculator from "../../components/currencyCalc/CurrencyCalc"
import CustomCheckbox from '../../components/customCheckbox/CustomCheckbox'
import Modal from '../../components/addReceivingMethod/AddReceivingMethod'

function PaymentTransfer({showTips}) {
  const [plan, setPlan] = useState("individual");
  const [showModal, setShowModal] = useState(false)

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
                plan === "free"
                  ? "shadow-box shadow-box-highlight"
                  : "shadow-box"
              }
              onClick={() => setPlan("free")}
            >
              <img src='/assets/svg/calender.svg' alt='recipent' />
              <p className='flexible-text'>
                1-2 Business Day
                <span>Free</span>
              </p>
            </div>
            <div
              className={
                plan === "paid"
                  ? "shadow-box shadow-box-highlight"
                  : "shadow-box"
              }
              onClick={() => setPlan("paid")}
            >
              <img src='/assets/svg/hourglass.svg' alt='school' />
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

            <div className="transfer-info">
              <p>Expected start date: <span>July 8th 2020</span> <span className='material-icons'> error_outline</span></p>
              <p>Expected completion date: <span>July 10th 2020</span> <span className='material-icons'> error_outline</span></p>
            </div>
          </div>
        </div>

        <div className='section-divider'></div>

        <div className='section-three'>
          <div className='section-title'>
            <p>Choose the receiving method</p> <Link to='#' onClick={() => setShowModal(true)} >Add new</Link>
          </div>

          <div className='box-container'>
            <div className='shadow-box'>
              <CustomCheckbox checked={true} title='Bank Deposit' subLeft='Zenith Bank' subRight='Account: 236252666666' />
            </div>
          </div>
        </div>

        <div className="section-four">
        <Link to='/payment/recipent'><button className='left'>Previous</button></Link>
        <Link to='/payment/options'><button className='right'>Next</button></Link>
        </div>
      </Layout>

      {showModal && <Modal action={setShowModal} />}
    </div>
  );
}

export default PaymentTransfer;
