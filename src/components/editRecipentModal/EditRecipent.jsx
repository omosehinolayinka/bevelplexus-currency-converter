import React, { useState } from "react";

import "./EditRecipent.scss";

function EditRecipent({ action }) {
  const [name, setName] = useState("Rayana Lubin");
  const [email, setEmail] = useState("Jordywakman@gmail.com");
  const [phone, setPhone] = useState("+87 456 899 2345");
  const [country, setCountry] = useState("Canada");
  const [bankName, setBankName] = useState("Zenith Bank");
  const [bankNo, setBankNo] = useState("34567777777778");

  return (
    <div id='editRecipent'>
      <div className='box'>
        <div className='heading'>
          <h2>Recipent Details</h2>
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
              onChange={(e) => setBankNo(e.target.value)}
            />
          </div>
        </div>

        <div className="btn-big-container">
          <button> {name} </button>
        </div>

        <div className="buttons-container">
          <button onClick={() => action(false)}>Cancel</button>
          <button onClick={() => action(false)}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default EditRecipent;
