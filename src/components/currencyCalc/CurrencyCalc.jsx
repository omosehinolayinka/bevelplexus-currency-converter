import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./CurrencyCalc.scss";

import PaymentContext from "../../context/payment/paymentContext";

import { Menu, Dropdown } from "antd";
import { ToastContainer, toast } from "react-toastify";

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
  } = paymentContext.state.fxDetails;

  paymentContext.state.alert.status &&
    toast.error(paymentContext.state.alert.message, {
      autoClose: 3000,
      closeButton: true,
      pauseOnHover: true,
      position: "top-right",
      hideProgressBar: true,
      toastId: "Yes",
    });

  const handleClick = (e, name) => {
    const data = {
      sendCurrency: name === "sendCurrency" ? e.key : sendCurrency,
      destinationCurrency:
        name === "destinationCurrency" ? e.key : destinationCurrency,
      baseAmount,
      convertedAmount: baseAmount === "" ? "" : convertedAmount,
    };

    paymentContext.getFxRates(data);
  };

  const handleChange = (e) => {
    const data = {
      sendCurrency,
      destinationCurrency,
      baseAmount: parseFloat(e.target.value) || "",
      convertedAmount: baseAmount === "" ? "" : convertedAmount,
      actualAmount: baseAmount === "" ? 0 : actualAmount,
      fee: baseAmount === "" ? 0 : fee,
      rate: baseAmount === "" ? 0 : rate,
      reverse: e.target.name === "convertedAmount" ? true : false,
    };

    paymentContext.getFxRates(data);
  };

  const currencies = [
    {
      name: "USD",
      flag: "https://www.countryflags.io/us/flat/24.png",
    },
    {
      name: "NGN",
      flag: "https://www.countryflags.io/ng/flat/24.png",
    },
    {
      name: "GBP",
      flag: "https://www.countryflags.io/gb/flat/24.png",
    },
    {
      name: "CAD",
      flag: "https://www.countryflags.io/ca/flat/24.png",
    },
    {
      name: "BRL",
      flag: "https://www.countryflags.io/br/flat/24.png",
    },
    // {
    //   name: "EUR",
    //   flag: "https://www.countryflags.io/eu/flat/24.png",
    // },
  ];

  const sendCurrencyMenu = (
    <Menu
      onClick={(e) => handleClick(e, "sendCurrency")}
      name='sendCurrency'
      selectedKeys={sendCurrency}
    >
      {currencies.map((currency) => (
        <Menu.Item key={currency.name}>
          <img src={currency.flag} alt={currency.name} /> {currency.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const receiveCurrencyMenu = (
    <Menu
      onClick={(e) => handleClick(e, "destinationCurrency")}
      selectedKeys={destinationCurrency}
    >
      {currencies.map((currency) => (
        <Menu.Item key={currency.name}>
          <img src={currency.flag} alt={currency.name} /> {currency.name}
        </Menu.Item>
      ))}
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
              value={baseAmount}
              onChange={handleChange}
              onKeyUp={handleChange}
            />
          </div>

          <Dropdown overlay={sendCurrencyMenu}>
            <p className='currency-dropdown'>
              <img
                src={`https://www.countryflags.io/${sendCurrency
                  .slice(0, 2)
                  .toLowerCase()}/flat/24.png`}
                alt={sendCurrency}
              />
              {sendCurrency}
              <span className='material-icons'>arrow_drop_down</span>
            </p>
          </Dropdown>
        </label>

        <div className='logic-box'>
          <p>
            <span className='logic__symbols'>
              <small>–</small>
            </span>{" "}
            {fee} {sendCurrency}
            <span className='logic__description'>Fee (Including IOF)</span>
          </p>
          <p>
            <span className='logic__symbols'>
              <small>=</small>
            </span>{" "}
            {actualAmount} {sendCurrency}
            <span className='logic__description'>Amount we'll convert</span>
          </p>
          <p>
            <span className='logic__symbols'>
              <small>÷</small>
            </span>{" "}
            {rate}
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
              value={convertedAmount}
              disabled
            />
          </div>

          <Dropdown overlay={receiveCurrencyMenu}>
            <p className='currency-dropdown'>
              <img
                src={`https://www.countryflags.io/${destinationCurrency
                  .slice(0, 2)
                  .toLowerCase()}/flat/24.png`}
                alt={destinationCurrency}
              />
              {destinationCurrency}
              <span className='material-icons'>arrow_drop_down</span>
            </p>
          </Dropdown>
        </label>

        <div className='notice'>
          <p>This page is refreshed every 60 seconds</p>
        </div>

        <div className='form__submit'>
          <Link to='/payment/recipent'>
            <button type='button' className='form__submit__button'>
              Send this Amount
            </button>
          </Link>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default CurrencyCalc;
