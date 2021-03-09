import React, { useContext } from "react";
import { Link } from "react-router-dom";

import PaymentContext from "../../context/payment/paymentContext";
import RecipientContext from '../../context/recipients/recipientContext'

function LastTransaction({ data }) {
  const paymentContext = useContext(PaymentContext);
  const recipientContext = useContext(RecipientContext)

  const selectRecipient = () => {
    const id = data[0].recipient.id
    paymentContext.setCurrentRecipient(data[0])
    recipientContext.getRecipient(id, paymentContext);
  };

  return (
    <div className='box-one__content'>
      <div className='user-details'>
        <div className='user-details__avi'>
          <img src='./assets/img/avatar-square.png' alt='avi' />
          {/* <img src="/assets/svg/brazil-flag.svg" alt="" className="user-details__avi__flag"/> */}
        </div>
        <span className='box-one__text-wrapper'>
          <h3> {data[0].recipient.name} </h3>
          <p> {data[0].recipient.email} </p>
        </span>
      </div>

      <div className='box-one__text-wrapper alt'>
        <h3>
          <span>
            {data[0].baseAmount} {data[0].sendCurrency}
          </span>
          <span className='material-icons'>arrow_right</span>
          <span>
            {data[0].convertedAmount} {data[0].destinationCurrency}
          </span>
        </h3>
        <p>Last Transaction</p>
      </div>

      <div className='box-one__cta'>
        <Link to='/dashboard/transfer' onClick={selectRecipient} >
          <button>Send Money</button>
        </Link>
      </div>
    </div>
  );
}

export default LastTransaction;

// onClick={selectRecipient}
