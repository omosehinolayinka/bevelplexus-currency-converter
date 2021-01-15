import React from "react";
import {Link} from 'react-router-dom'
import "./PaymentSidebar.scss";

function PaymentSidebar({ payProgress }) {
  return (
    <div id='payment-sidebar'>
      <div className='heading'>
        <h4>Make Payment</h4>
      </div>

      <ul>
        <li className={payProgress === "1" ? "active" : ''}>
          {payProgress > 1 ? (
            <React.Fragment>
              <img src='./assets/svg/green-check.svg' alt='check' />{" "}
              <span><Link to='/payment/recipient'>Select recipient</Link></span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span className='label'>1</span> <span>Select recipient</span>
            </React.Fragment>
          )}
        </li>

        <li className={payProgress === "2" ? "active" : ''}>
          {payProgress > 2 ? (
            <React.Fragment>
              <img src='./assets/svg/green-check.svg' alt='check' />{" "}
              <span><Link to='/payment/transfer'>Transfer details</Link></span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span className='label'>2</span> <span>Transfer details</span>
            </React.Fragment>
          )}
        </li>

        <li className={payProgress === "3" ? "active" : ''}>
          {payProgress > 3 ? (
            <React.Fragment>
              <img src='./assets/svg/green-check.svg' alt='check' />{" "}
              <span><Link to='/payment/options'>Payment</Link></span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span className='label'>3</span> <span>Payment</span>
            </React.Fragment>
          )}
        </li>

        <li className={payProgress === "4" ? "active" : ''}>
          {payProgress > 4 ? (
            <React.Fragment>
              <img src='./assets/svg/green-check.svg' alt='check' />{" "}
              <span><Link to='/payment/review'>Review</Link></span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span className='label'>4</span> <span>Review</span>
            </React.Fragment>
          )}
        </li>
      </ul>
    </div>
  );
}

export default PaymentSidebar;
