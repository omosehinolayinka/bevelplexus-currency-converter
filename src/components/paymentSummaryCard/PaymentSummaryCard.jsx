import React from "react";
import "./PaymentSummaryCard.scss";

const PaymentSummaryCard = ({ data }) => {
  return (
    <div id='payment-summary-card'>
      <p>
        <span>Send Amount</span>
        <span>
          {data.sendAmount} {data.sendCurrency}{" "}
        </span>
      </p>

      <p>
        <span>Exchange rate</span>
        <span> {data.exchangeRate} </span>
      </p>

      <p>
        <span>Fees</span>
        <span className='greentext'> {data.fees} </span>
      </p>

      <p>
        <span>recipient gets</span>
        <span>
          {data.convertedAmount} {data.destinationCurrency}{" "}
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
            ? `${data.sendAmount} ${data.sendCurrency}`
            : `${data.fees + data.sendAmount} ${data.sendCurrency}`}
        </span>
      </p>
    </div>
  );
};

export default PaymentSummaryCard;
