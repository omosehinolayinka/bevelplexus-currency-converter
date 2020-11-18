import React, { useState, useContext } from "react";
import RecipeientContext from '../../context/recipients/recipientContext'

function Editrecipient({ action }) {

  const recipientContext = useContext(RecipeientContext)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankNo, setBankNo] = useState("");

  

  return (
    <div id='addrecipient'>
      <div className='box'>
        <div className='heading'>
          <h2>recipient Details</h2>
          <span className='material-icons' onClick={() => action(false)} >clear</span>
        </div>

        <div className='form-container'>
          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='/assets/svg/contact.svg' alt='name' />
            </span>
            <input
              type='text'
              value={name}
              placeholder='Recipient Name'
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='/assets/svg/mail.svg' alt='settings' />
            </span>
            <input
              type='text'
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='/assets/svg/world-blue.svg' alt='phone' />
            </span>
            <input
              type='text'
              value={phone}
              placeholder='Phone Number'
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='/assets/svg/location-blue.svg' alt='location' />
            </span>
            <input
              type='text'
              value={country}
              placeholder='Location'
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='/assets/svg/bank.svg' alt='bank' />
            </span>
            <input
              type='text'
              value={bankName}
              placeholder='Bank'
              onChange={(e) => setBankName(e.target.value)}
            />
          </div>

          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='/assets/svg/hashtag.svg' alt='number' />
            </span>
            <input
              type='text'
              value={bankNo}
              placeholder='Account Number'
              onChange={(e) => setBankNo(e.target.value)}
            />
          </div>
        </div>

        <div className="btn-big-container">
          <button> Account Holder's Name </button>
        </div>

        <div className="buttons-container">
          <button onClick={() => action(false)}>Cancel</button>
          <button onClick={() => action(false)}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Editrecipient;
