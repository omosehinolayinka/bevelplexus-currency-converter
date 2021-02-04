import React, { useState, useContext } from "react";
import RecipeientContext from "../../context/recipients/recipientContext";

import { Select } from "antd";
import locations from "../locations.json";

import axios from "axios";

function Editrecipient({ action }) {
  const recipientContext = useContext(RecipeientContext);

  const [loading, setLoading] = useState(false);
  const [disableBank, setDisableBank] = useState(false);
  const [newRecipient, setNewRecipient] = useState({
    userId: localStorage.getItem("userId"),
    name: "",
    email: "",
    phoneNumber: "",
    location: "",
    bank: "",
    accountNumber: "",
    acctName: "Account Holder's Name",
    bankCode: "",
    closeModal: action,
  });

  const invalidCheck = [
    newRecipient.name,
    newRecipient.email,
    newRecipient.phoneNumber,
    newRecipient.location,
    newRecipient.bank,
    newRecipient.accountNumber,
  ];

  const handleChange = (e) => {
    setNewRecipient({
      ...newRecipient,
      [e.target.name]: e.target.value,
    });
  };

  const handleBank = (e) => {
    const num = e.target.value;

    

    if (e.target.value.length === 10 && newRecipient.location === "Nigeria") {
      setDisableBank(true);

      setNewRecipient({
        ...newRecipient,
        accountNumber: num,
        bank: "Fetching...",
        acctName: "Fetching...",
      });

      axios
        .get(
          `https://app.nuban.com.ng/api/NUBAN-YGFQUYCA353?acc_no=${e.target.value}`
        )
        .then((res) => {
          setNewRecipient({
            ...newRecipient,
            accountNumber: num,
            bank: res.data[0].bank_name,
            acctName: res.data[0].account_name,
            bankCode: res.data[0].bank_code,
          });

          setDisableBank(false);
        })
        .catch(() => {
          setNewRecipient({
            ...newRecipient,
            accountNumber: num,
            bank: "Invalid Acct No",
            acctName: "Invalid Acct No",
          });

          setDisableBank(false);
        });
    } else {
      setNewRecipient({
        ...newRecipient,
        accountNumber: num,
        // bank: "-",
        // acctName: "Account holder's name",
      });
    }
  };

  const handleSelect = (value) => {
    setNewRecipient({
      ...newRecipient,
      location: value,
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    recipientContext.addRecipient(newRecipient);
  };

  const { Option } = Select;

  return (
    <div id='addrecipient'>
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
            <input
              required
              type='text'
              value={newRecipient.name}
              placeholder='Recipient Name'
              name='name'
              onChange={handleChange}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='./assets/svg/mail.svg' alt='settings' />
            </span>
            <input
              required
              type='text'
              value={newRecipient.email}
              placeholder='Email'
              name='email'
              onChange={handleChange}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='./assets/svg/world-blue.svg' alt='phone' />
            </span>
            <input
              required
              type='text'
              value={newRecipient.phoneNumber}
              placeholder='Phone Number'
              name='phoneNumber'
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
              placeholder='Location'
              autoComplete='dontshow'
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
              <img src='./assets/svg/hashtag.svg' alt='number' />
            </span>
            <input
              required
              type='text'
              disabled={disableBank}
              value={newRecipient.accountNumber}
              placeholder='Account Number'
              name='accountNumber'
              onChange={handleBank}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='./assets/svg/bank.svg' alt='bank' />
            </span>
            <input
              required
              type='text'
              value={newRecipient.bank}
              placeholder='Bank Name'
              name='bank'
              disabled= {newRecipient.location === "Nigeria"}
              onChange={handleChange}
            />
          </div>

          {newRecipient.location === "Canada" && (
            <div className='shadow-box input-item'>
              <span className='icon'>
                <img src='./assets/svg/hashtag.svg' alt='number' />
              </span>
              <input
                required
                type='text'
                value={newRecipient.transitOrSortCode}
                placeholder='Transit Number'
                name='transitOrSortCode'
                onChange={handleChange}
              />
            </div>
          )}

          {newRecipient.location === "United Kingdom" && (
            <div className='shadow-box input-item'>
              <span className='icon'>
                <img src='./assets/svg/hashtag.svg' alt='number' />
              </span>
              <input
                required
                type='text'
                value={newRecipient.transitOrSortCode}
                placeholder='Sort Code'
                name='transitOrSortCode'
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        {newRecipient.location === "Nigeria" && (
          <div className='btn-big-container'>
            <button> {newRecipient.acctName} </button>
          </div>
        )}

        <div className='buttons-container'>
          <button onClick={() => action(false)}>Cancel</button>
          <button
            className={
              invalidCheck.includes("") ||
              invalidCheck.includes("Fetching...") ||
              invalidCheck.includes("Please wait...") ||
              invalidCheck.includes("Invalid Acct No")
                ? "disabled"
                : ""
            }
            onClick={handleSubmit}
          >
            {" "}
            {loading ? (
              <img src='assets/svg/spinner.svg' alt='spinner' />
            ) : (
              "Save"
            )}{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Editrecipient;
