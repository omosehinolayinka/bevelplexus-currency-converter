import React from 'react'
import './PaymentSummaryCard.scss'

function paymentSummaryCard() {
  return (
    <div id='payment-summary-card'>
      <p>
        <span>Send Amount</span>
        <span>1,000 USD</span>
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
        <span>Recipent gets</span>
        <span>3,900 BRL</span>
      </p>

      <div className="section-divider"></div>

      <p>
        <span>Receiving method</span>
        <span>Bank Deposit</span>
      </p>

      <div className="section-divider"></div>

      <p>
        <span>Your total</span>
        <span>1,000 USD</span>
      </p>
    </div>
  )
}

export default paymentSummaryCard
