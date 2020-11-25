import React, { useContext } from "react";
import { Link } from "react-router-dom";

import PaymentContext from "../../context/payment/paymentContext";

function LastTransaction({ data }) {
  const paymentContext = useContext(PaymentContext);

  const selectRecipient = () => {
    paymentContext.setCurrentRecipient(data[0]);
  };

  return (
    <div className='box-one__content'>
      <div className='user-details'>
        <div className='user-details__avi'>
          <img src='/assets/img/avatar-square.png' alt='avi' />
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
        <Link to='/payment' > 
          <button>Send Money</button>
        </Link>
      </div>
    </div>
  );
}

export default LastTransaction;

// onClick={selectRecipient}