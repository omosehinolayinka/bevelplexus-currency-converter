import React, { useState, useContext, useEffect } from "react";
import RecipeientContext from "../../context/recipients/recipientContext";

import { Select } from "antd";
import locations from "../locations.json";

import axios from "axios";

function Editrecipient({ action }) {
  const recipientContext = useContext(RecipeientContext);

  const [loading, setLoading] = useState(false);

  const [newRecipient, setNewRecipient] = useState({
    userId: localStorage.getItem("userId"),
    name: "",
    email: "",
    phoneNumber: "",
    location: "",
    bank: "",
    accountNumber: "",
    acctName: "Account Holder's Name",
    closeModal: action,
  });

  const handleChange = (e) => {
    setNewRecipient({
      ...newRecipient,
      [e.target.name]: e.target.value,
    });
  };

  const handleBank = (e) => {
    handleChange(e);
    if (e.target.value.length === 10) {
      axios
        .get(`https://app.nuban.com.ng/api/NUBAN-YGFQUYCA353?acc_no=${e.target.value}`)
        .then((res) =>{
          setNewRecipient({
            ...newRecipient,
            bank: res.data[0].bank_name,
            acctName: res.data[0].account_name
          })
        })
        .catch((err) => console.log(err));
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
              <img src='/assets/svg/contact.svg' alt='name' />
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
              <img src='/assets/svg/mail.svg' alt='settings' />
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
              <img src='/assets/svg/world-blue.svg' alt='phone' />
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
              <img src='/assets/svg/location-blue.svg' alt='location' />
            </span>
            <Select
              showSearch
              filterOption={true}
              optionFilterProp='children'
              onChange={handleSelect}
              name='location'
              placeholder='location'
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
              <img src='/assets/svg/bank.svg' alt='bank' />
            </span>
            <input
              required
              type='text'
              value={newRecipient.bank}
              placeholder='Bank'
              name='bank'
              disabled
              onChange={handleChange}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='/assets/svg/hashtag.svg' alt='number' />
            </span>
            <input
              required
              type='text'
              value={newRecipient.accountNumber}
              placeholder='Account Number'
              name='accountNumber'
              onChange={handleBank}
            />
          </div>
        </div>

        <div className='btn-big-container'>
          <button> {newRecipient.acctName} </button>
        </div>

        <div className='buttons-container'>
          <button onClick={() => action(false)}>Cancel</button>
          <button onClick={handleSubmit}>
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
