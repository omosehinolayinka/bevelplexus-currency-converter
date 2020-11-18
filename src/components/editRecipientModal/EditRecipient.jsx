import React, { useState, useEffect, useContext } from "react";
import "./EditRecipient.scss";

import RecipientContext from '../../context/recipients/recipientContext'

function Editrecipient({ action, recipientState }) {
  const recipientContext = useContext(RecipientContext);

  const [loading, setLoading] = useState(false)
  const [recipient, setRecipient] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    location: "",
    bank: "",
    bankName: "",
    accountNumber: "",
    closeModal: action
  });

  useEffect(() => {
    setRecipient({
      ...recipient,
      ...recipientState,
      ...recipientState.bankInfo[0],
      bankName: recipientState.name
    });

    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {

    setRecipient({
      ...recipient,
      [e.target.name]: e.target.value,
    });
    
  };

  const submitrecipient = () => {
    setLoading(true);
    recipientContext.updateRecipient(recipient);
  }

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
              <img src='/assets/svg/contact.svg' alt='name' />
            </span>
            <input
              type='text'
              name='name'
              value={recipient.name}
              onChange={handleChange}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='/assets/svg/mail.svg' alt='settings' />
            </span>
            <input
              type='text'
              name='email'
              value={recipient.email}
              onChange={handleChange}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='/assets/svg/world-blue.svg' alt='phone' />
            </span>
            <input
              type='text'
              name='phoneNumber'
              value={recipient.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='/assets/svg/location-blue.svg' alt='location' />
            </span>
            <input
              type='text'
              name='location'
              value={recipient.location}
              onChange={handleChange}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='/assets/svg/bank.svg' alt='bank' />
            </span>
            <input
              type='text'
              name='bank'
              value={recipient.bank}
              onChange={handleChange}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='/assets/svg/hashtag.svg' alt='number' />
            </span>
            <input
              type='text'
              name='accountNumber'
              value={recipient.accountNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='btn-big-container'>
          <button> {recipient.bankName} </button>
        </div>

        <div className='buttons-container'>
          <button onClick={() => action(false)}>Cancel</button>
          <button onClick={submitrecipient}> {
            loading ? <img src="/assets/svg/spinner" alt="spinner"/> : "Save"
          } </button>
        </div>
      </div>
    </div>
  );
}

export default Editrecipient;
