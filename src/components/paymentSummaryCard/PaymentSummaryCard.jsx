import React from "react";
import "./PaymentSummaryCard.scss";

const PaymentSummaryCard = ({ data }) => {
  return (
    <div id='payment-summary-card'>
      <p>
        <span>Send Amount</span>
        <span>
          {parseFloat(data.sendAmount).toLocaleString()} {data.sendCurrency}{" "}
        </span>
      </p>

      <p>
        <span>Exchange rate</span>
        <span> {data.exchangeRate.toLocaleString()} </span>
      </p>

      <p>
        <span>Fees</span>
        <span className='greentext'> 
        {
          data.fees === "Free" ? data.fees : `${data.fees.toLocaleString()} ${data.sendCurrency}`
        } 
        </span>
      </p>

      <p>
        <span>recipient gets</span>
        <span>
          {parseFloat(data.convertedAmount).toLocaleString()} {data.destinationCurrency}{" "}
        </span>
      </p>

      <div className='section-divider'></div>

      <p>
        <span>Receiving method</span>
        <span> {data.receivingMethod} </span>
      </p>

      <div className='section-divider'></div>

      <p>
        <span>Your total</span>
        <span>
          {data.fees === "Free"
            ? `${data.sendAmount.toLocaleString()} ${data.sendCurrency}`
            : `${parseFloat(data.fees + data.sendAmount).toLocaleString()} ${data.sendCurrency}`}
        </span>
      </p>
    </div>
  );
};

export default PaymentSummaryCard;
