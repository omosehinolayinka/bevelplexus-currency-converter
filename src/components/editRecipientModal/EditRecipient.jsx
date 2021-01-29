import React, { useState, useEffect, useContext } from "react";
import "./EditRecipient.scss";
import locations from "../locations.json";
import RecipientContext from "../../context/recipients/recipientContext";

import axios from "axios";
import { Select } from "antd";

function Editrecipient({ action, recipientState }) {
  const recipientContext = useContext(RecipientContext);

  const [loading, setLoading] = useState(false);
  const [disableBank, setDisableBank] = useState(false);
  const [acctBox, showAcctBox] = useState(false);
  const [recipient, setRecipient] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    location: "",
    bank: "-",
    acctName: "Please wait...",
    accountNumber: "",
    bankCode: "",
    closeModal: action,
  });

  const invalidCheck = [
    recipient.name,
    recipient.email,
    recipient.phoneNumber,
    recipient.location,
    recipient.bank,
    recipient.accountNumber,
  ];

  useEffect(() => {
    setRecipient({
      ...recipient,
      ...recipientState,
      ...recipientState.bankInfo[0],
    });

    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setRecipient({
      ...recipient,
      [e.target.name]: e.target.value,
    });
  };

  const handleBank = (e) => {
    const num = e.target.value;

    showAcctBox(true);

    setRecipient({
      ...recipient,
      accountNumber: num,
      bank: "Fetching...",
      acctName: "Fetching...",
    });

    if (e.target.value.length === 10) {
      setDisableBank(true);

      axios
        .get(
          `https://app.nuban.com.ng/api/NUBAN-YGFQUYCA353?acc_no=${e.target.value}`
        )
        .then((res) => {
          setRecipient({
            ...recipient,
            accountNumber: num,
            bank: res.data[0].bank_name,
            acctName: res.data[0].account_name,
            bankCode: res.data[0].bank_code,
          });

          setDisableBank(false);
        })
        .catch(() => {
          setRecipient({
            ...recipient,
            accountNumber: num,
            bank: "Invalid Acct No",
            acctName: "Invalid Acct No",
          });

          setDisableBank(false);
        });
    } else {
      setRecipient({
        ...recipient,
        accountNumber: num,
        bank: "-",
        acctName: "Account holder's name",
      });
    }
  };

  const handleSelect = (value) => {
    setRecipient({
      ...recipient,
      location: value,
    });
  };

  const submitrecipient = () => {
    setLoading(true);
    recipientContext.updateRecipient(recipient);
  };

  const { Option } = Select;

  return (
    <div id='editrecipient'>
      <div className='box'>
        <div className='heading'>
          <h2>recipient Details</h2>
          <span className='material-icons' onClick={() => action(false)}>
            clear
          </span>
        </div>

        <div className='form-container'>
          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='./assets/svg/contact.svg' alt='name' />
            </span>
            <input type='hidden' value='something' />
            <input
              type='text'
              name='name'
              autocomplete='off'
              value={recipient.name}
              onChange={handleChange}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='./assets/svg/mail.svg' alt='settings' />
            </span>
            <input
              type='text'
              name='email'
              autoComplete='new-password'
              value={recipient.email}
              onChange={handleChange}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='./assets/svg/world-blue.svg' alt='phone' />
            </span>
            <input
              type='text'
              name='phoneNumber'
              autoComplete='new-password'
              value={recipient.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='./assets/svg/location-blue.svg' alt='location' />
            </span>
            <Select
              showSearch
              filterOption={true}
              optionFilterProp='children'
              onChange={handleSelect}
              name='location'
              autoComplete='dontshow'
              placeholder='location'
              value={recipient.location}
            >
              {locations.map((location) => (
                <Option key={location.code} value={location.name}>
                  {location.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='./assets/svg/bank.svg' alt='bank' />
            </span>
            <input
              type='text'
              name='bank'
              disabled
              value={recipient.bank}
              onChange={handleChange}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='./assets/svg/hashtag.svg' alt='number' />
            </span>
            <input
              type='text'
              autoComplete='new-password'
              name='accountNumber'
              disabled={disableBank}
              value={recipient.accountNumber}
              onChange={handleBank}
            />
          </div>

          {recipient.location === "Canada" && (
            <div className='shadow-box input-item'>
              <span className='icon'>
                <img src='./assets/svg/hashtag.svg' alt='number' />
              </span>
              <input
                required
                type='text'
                value={recipient.transitOrSortCode}
                placeholder='Transit Code'
                name='transitOrSortCode'
                onChange={handleChange}
              />
            </div>
          )}

          {recipient.location === "United Kingdom" && (
            <div className='shadow-box input-item'>
              <span className='icon'>
                <img src='./assets/svg/hashtag.svg' alt='number' />
              </span>
              <input
                required
                type='text'
                value={recipient.transitOrSortCode}
                placeholder='Sort Code'
                name='transitOrSortCode'
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        <div
          className='btn-big-container'
          style={{ visibility: acctBox ? "visible" : "hidden" }}
        >
          <button>{recipient.acctName}</button>
        </div>

        <div className='buttons-container'>
          <button onClick={() => action(false)}>Cancel</button>
          <button
            className={
              invalidCheck.includes("") ||
              invalidCheck.includes("Fetching...") ||
              invalidCheck.includes("Please wait...")
                ? "disabled"
                : ""
            }
            onClick={submitrecipient}
          >
            {loading ? (
              <img src='./assets/svg/spinner.svg' alt='spinner' />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Editrecipient;
