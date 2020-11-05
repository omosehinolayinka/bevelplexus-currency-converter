import React, { useState } from "react";
import "./CurrencyCalc.scss";

import { Menu, Dropdown } from "antd";

const CurrencyCalc = () => {
  const [sendCurrency, setSendCurrency] = useState('CAD');
  const [receiveCurrency, setReceiveCurrency] = useState('BRL');

  const sendCurrencyMenuClick = e => {
    setSendCurrency(e.key)
  };

  const receiveCurrencyMenuClick = e => {
    setReceiveCurrency(e.key)
  };
  

  const sendCurrencyMenu = (
    <Menu onClick={sendCurrencyMenuClick} selectedKeys={sendCurrency}>
      <Menu.Item key='CAD'><img src="/assets/svg/canada-flag.svg" alt="cad flag"/> CAD</Menu.Item>

      <Menu.Item key='BRL'><img src="/assets/svg/brazil-flag.svg" alt="brl flag"/> BRL</Menu.Item>
    </Menu>
  );

  const receiveCurrencyMenu = (
    <Menu onClick={receiveCurrencyMenuClick} selectedKeys={receiveCurrency}>
      <Menu.Item key='CAD'><img src="/assets/svg/canada-flag.svg" alt="cad flag"/> CAD</Menu.Item>

      <Menu.Item key='BRL'><img src="/assets/svg/brazil-flag.svg" alt="brl flag"/> BRL</Menu.Item>
    </Menu>
  );

  return (
    <div id='currency-calculator'>

      <form>
        <label>
          <div className='currency-input'>
            <small>You Send</small>
            <input type='number' placeholder='1,000' />
          </div>

          <Dropdown overlay={sendCurrencyMenu}>
            <p className='currency-dropdown'> 

              {
                sendCurrency === 'CAD' ? <img src="/assets/svg/canada-flag.svg" alt="cad flag"/> 
                : sendCurrency === 'BRL' ? <img src="/assets/svg/brazil-flag.svg" alt="brl flag"/> 
                : ''
              } 
              
              {sendCurrency} <span className="material-icons">arrow_drop_down</span>
              </p>
          </Dropdown>
        </label>

        <div className="logic-box">
            <p> 
              <span className='logic__symbols'><small>–</small></span> 20.20 {sendCurrency} 
              <span className="logic__description">Fee (Including IOF)</span>
            </p>
            <p> 
              <span className='logic__symbols'><small>=</small></span> 970.80 {sendCurrency} 
              <span className="logic__description">Amount we'll convert</span>
            </p>
            <p> 
              <span className='logic__symbols'><small>÷</small></span> 2,27361
              <span className="logic__description">Commercial rate (144 hrs)</span>
            </p>
        </div>

        <label>
          <div className='currency-input'>
            <small>They Receive</small>
            <input type='number' placeholder='3,900' />
          </div>

          <Dropdown overlay={receiveCurrencyMenu}>
            <p className='currency-dropdown'> 

              {
                receiveCurrency === 'CAD' ? <img src="/assets/svg/canada-flag.svg" alt="cad flag"/> 
                : receiveCurrency === 'BRL' ? <img src="/assets/svg/brazil-flag.svg" alt="brl flag"/> 
                : ''
              } 
              
              {receiveCurrency} <span className="material-icons">arrow_drop_down</span>
              </p>
          </Dropdown>
        </label>

        <div className="notice">
          <p>This page is refreshed every 60 seconds</p>
        </div>

        <div className="form__submit">
          <button className="form__submit__button">
            Send this Amount
          </button>
        </div>

      </form>

      
    </div>
  );
};

export default CurrencyCalc;
