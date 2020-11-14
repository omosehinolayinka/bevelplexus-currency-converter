import React, { useState, useContext } from "react";
import "./CurrencyCalc.scss";

import PaymentContext from "../../context/payment/paymentContext";

import { Menu, Dropdown } from "antd";

const CurrencyCalc = () => {
  const paymentContext = useContext(PaymentContext);

  const {
    sendCurrency,
    baseAmount,
    destinationCurrency,
    convertedAmount,
    actualAmount,
    fee,
    rate,
    receiveType,
   } = paymentContext.state.fxDetails;

  const handleClick = (e, name) => {
    console.log("hello");
  };

  const handleChange = (e) => {
    paymentContext.getFxRates(e.target.name, e.target.value);
  }

  const sendCurrencyMenu = (
    <Menu
      // trigger={handleClick("sendCurrency")}
      name='sendCurrency'
      selectedKeys={sendCurrency}
    >
      <Menu.Item key='CAD'>
        <img src='/assets/svg/canada-flag.svg' alt='cad flag' /> CAD
      </Menu.Item>

      <Menu.Item key='BRL'>
        <img src='/assets/svg/brazil-flag.svg' alt='brl flag' /> BRL
      </Menu.Item>
    </Menu>
  );

  const receiveCurrencyMenu = (
    <Menu
      name='destinationCurrency'
      onClick={handleClick("destinationCurrency")}
      selectedKeys={destinationCurrency}
    >
      <Menu.Item key='CAD'>
        <img src='/assets/svg/canada-flag.svg' alt='cad flag' /> CAD
      </Menu.Item>

      <Menu.Item key='BRL'>
        <img src='/assets/svg/brazil-flag.svg' alt='brl flag' /> BRL
      </Menu.Item>
    </Menu>
  );

  return (
    <div id='currency-calculator'>
      <form>
        <label>
          <div className='currency-input'>
            <small>You Send</small>
            <input
              type='number'
              name='baseAmount'
              placeholder='1,000'
              onChange={handleChange}
            />
          </div>

          <Dropdown overlay={sendCurrencyMenu}>
            <p className='currency-dropdown'>
              {sendCurrency === "CAD" ? (
                <img src='/assets/svg/canada-flag.svg' alt='cad flag' />
              ) : sendCurrency === "BRL" ? (
                <img src='/assets/svg/brazil-flag.svg' alt='brl flag' />
              ) : (
                ""
              )}
              {sendCurrency}{" "}
              <span className='material-icons'>arrow_drop_down</span>
            </p>
          </Dropdown>
        </label>

        <div className='logic-box'>
          <p>
            <span className='logic__symbols'>
              <small>–</small>
            </span>{" "}
            20.20 {sendCurrency}
            <span className='logic__description'>Fee (Including IOF)</span>
          </p>
          <p>
            <span className='logic__symbols'>
              <small>=</small>
            </span>{" "}
            970.80 {sendCurrency}
            <span className='logic__description'>Amount we'll convert</span>
          </p>
          <p>
            <span className='logic__symbols'>
              <small>÷</small>
            </span>{" "}
            2,27361
            <span className='logic__description'>
              Commercial rate (144 hrs)
            </span>
          </p>
        </div>

        <label>
          <div className='currency-input'>
            <small>They Receive</small>
            <input
              type='number'
              name='convertedAmount'
              placeholder='3,900'
              onChange={handleChange}
            />
          </div>

          <Dropdown overlay={receiveCurrencyMenu}>
            <p className='currency-dropdown'>
              {destinationCurrency === "CAD" ? (
                <img src='/assets/svg/canada-flag.svg' alt='cad flag' />
              ) : destinationCurrency ===
                "BRL" ? (
                <img src='/assets/svg/brazil-flag.svg' alt='brl flag' />
              ) : (
                ""
              )}
              {destinationCurrency}{" "}
              <span className='material-icons'>arrow_drop_down</span>
            </p>
          </Dropdown>
        </label>

        <div className='notice'>
          <p>This page is refreshed every 60 seconds</p>
        </div>

        <div className='form__submit'>
          <button className='form__submit__button'>Send this Amount</button>
        </div>
      </form>
    </div>
  );
};

export default CurrencyCalc;
