import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PaymentOptions.scss";
import "../paymentRecipent/PaymentRecipent.scss";

import Layout from "../../components/layout/Layout";
import CustomCheckbox from "../../components/customCheckbox/CustomCheckbox";
import PaymentSummaryCard from '../../components/paymentSummaryCard/PaymentSummaryCard'

function PaymentOptions({showTips}) {
  const [selected, setSelected] = useState(1);

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
      cost: '8.99 CAD',
    },
    {
      key: 4,
      title: 'Credit card',
      speed: '1 hour',
      cost: '8.99 CAD',
    },
  ]

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
              <div className='shadow-box' key={card.key} onClick={() => setSelected(card.key)}>
                <CustomCheckbox
                  checked={selected === card.key}
                  title={card.title}
                  subLeft={`Transfer speed ${card.speed}`}
                  action={card.cost}
                  green={card.cost === 'Free'}
                />
              </div>
            ))}
          </div>

          <div className='section-two'>
          <div className='shadow-box'>
            <PaymentSummaryCard />
          </div>  
          </div>
        </div>

        <div className='section-four'>
          <Link to='/payment/transfer'>
            <button className='left'>Previous</button>
          </Link>
          <Link to='/payment/review'>
            <button className='right'>Next</button>
          </Link>
        </div>
      </Layout>
    </div>
  );
}

export default PaymentOptions;
