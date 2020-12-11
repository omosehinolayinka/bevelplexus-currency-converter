import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import "./PaymentOptions.scss";
import "../paymentRecipient/PaymentRecipient.scss";

import Layout from "../../components/layout/Layout";
import Alert from "../../components/alert/Alert";
import CustomCheckbox from "../../components/customCheckbox/CustomCheckbox";
import PaymentSummaryCard from '../../components/paymentSummaryCard/PaymentSummaryCard'

import PaymentContext from '../../context/payment/paymentContext'

function PaymentOptions({showTips}) {
  const paymentContext = useContext(PaymentContext);

  const selected = paymentContext.state.paymentOption
  const recipient = paymentContext.state.recipient;
  const fx = paymentContext.state.fxDetails

  const [summary, setSummary] = useState({
    sendAmount: fx.baseAmount,
    sendCurrency: fx.sendCurrency,
    exchangeRate: fx.rate,
    fees: "Free",
    convertedAmount: fx.convertedAmount,
    destinationCurrency: fx.destinationCurrency,
    receivingMethod: selected
  })

  const [alert, setAlert] = useState(false);
  const [redirect, setRedirect] = useState(false)


  const paymentMethods = [
    {
      key: 1,
      title: 'E-transfer',
      speed: '1 hour',
      cost: 'Free',
    },
    {
      key: 2,
      title: 'Bank payment',
      speed: '1 hour',
      cost: 'Free',
    },
    {
      key: 3,
      title: 'Debit card',
      speed: '1 hour',
      cost: fx.baseAmount * 0.01,
    },
    {
      key: 4,
      title: 'Credit card',
      speed: '1 hour',
      cost: fx.baseAmount * 0.01,
    },
  ]

  const handleClick = (card) => {
    paymentContext.setPaymentOption(card.title)

    setSummary({
      ...summary,
      fees: card.cost
    })
  }

  const initiateTransaction = () => {
    const transactionDetails = {
      recipientId: recipient.id,
      userId: localStorage.getItem("userId"),
      bankInfoId: recipient.bankInfo[0].id,
      sendCurrency: fx.sendCurrency,
      destinationCurrency: fx.destinationCurrency,
      baseAmount: fx.baseAmount,
      transactionType: paymentContext.state.transactionType,
      receiveType: fx.receiveType
    }

    paymentContext.createTransaction(transactionDetails, setAlert)
  }

  return (
    <div id='payment-options'>
      <Layout currentMenu='payment' payProgress='3' showTips={showTips}>
        <div className='page-title'>
          <h1>Payment</h1>
        </div>

        <div className='section-wrap'>
          <div className='section-one'>
            <div className='section-title'>
              <p>Select the payment options</p>
            </div>

            {paymentMethods.map(card => (
              <div className='shadow-box' key={card.key} onClick={() => handleClick(card)}>
                <CustomCheckbox
                  checked={selected === card.title}
                  title={card.title}
                  subLeft={`Transfer speed ${card.speed}`}
                  action={card.cost}
                  currency={fx.sendCurrency}
                  green={card.cost === 'Free'}
                />
              </div>
            ))}
          </div>

          <div className='section-two'>
          <div className='shadow-box'>
            <PaymentSummaryCard data={summary} />
          </div>  
          </div>
        </div>

        <div className='section-four'>
          <Link to='/payment/transfer'>
            <button className='left'>Previous</button>
          </Link>
          <Link to='/payment/review'>
            <button className='right' onClick={initiateTransaction}>Pay</button>
          </Link>
        </div>

        {alert && (
          <Alert
            type='success'
            title='Order Initiated'
            body="You will be notified once it's complete"
            action={() => setRedirect(true)}
          />
        )}
        {!recipient && <Redirect to='/payment/transfer' />}
        {redirect && <Redirect to='/payment/review' />}
      </Layout>
    </div>
  );
}

export default PaymentOptions;
