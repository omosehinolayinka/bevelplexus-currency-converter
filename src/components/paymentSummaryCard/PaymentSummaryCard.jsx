import React from "react";
import "./PaymentSummaryCard.scss";

const PaymentSummaryCard = ({ data }) => {
  return (
    <div id="payment-summary-card">
      <p>
        <span>You Send</span>
        <span>
          {parseFloat(data.sendAmount).toLocaleString()} {data.sendCurrency}{" "}
        </span>
      </p>

      <p>
        <span>Exchange Rate</span>
        <span> {data.exchangeRate.toLocaleString()} </span>
      </p>

      <p>
        <span>Fees</span>
        <span className="greentext">
          {data.fees === "Free"
            ? data.fees
            : `${data.fees.toLocaleString()} ${data.sendCurrency}`}
        </span>
      </p>

      <p>
        <span>Recipient Gets</span>
        <span>
          {parseFloat(data.convertedAmount).toLocaleString()}{" "}
          {data.destinationCurrency}{" "}
        </span>
      </p>

      <div className="section-divider"></div>

      <p>
        <span>Receiving Method</span>
        <span> {data.receivingMethod} </span>
      </p>

      <div className="section-divider"></div>

      <p>
        <span>Your Total</span>
        <span>
          {data.fees === "Free"
            ? `${data.sendAmount.toLocaleString()} ${data.sendCurrency}`
            : `${parseFloat(data.fees + data.sendAmount).toLocaleString()} ${
                data.sendCurrency
              }`}
        </span>
      </p>
    </div>
  );
};

export default PaymentSummaryCard;
