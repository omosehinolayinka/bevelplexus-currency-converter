import React, { useState, useContext } from "react";

import RecipientContext from "../../context/recipients/recipientContext";

function Editrecipient({ action, recipientState }) {
  const recipientContext = useContext(RecipientContext);

  const [bankName, setBankName] = useState("");
  const [bankNo, setBankNo] = useState("");

  const handleSubmit = () => {
    const data = {
      ...recipientState,
      closeModal: action,
    };

    recipientContext.addRecipient(data)
  };

  return (
    <div id='addReceivingMethod'>
      <div className='box'>
        <div className='heading'>
          <h2>Add Recieving Method</h2>
          <span className='material-icons' onClick={() => action(false)}>
            clear
          </span>
        </div>

        <div className='form-container'>
          <div className='shadow-box input-item'>
            <span className='icon'>
              <img src='./assets/svg/bank.svg' alt='bank' />
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
              <img src='./assets/svg/hashtag.svg' alt='number' />
            </span>
            <input
              type='text'
              value={bankNo}
              placeholder='Account Number'
              onChange={(e) => setBankNo(e.target.value)}
            />
          </div>
        </div>

        <div className='btn-big-container'>
          <button> Account Holder's Name </button>
        </div>

        <div className='buttons-container'>
          <button onClick={() => action(false)}>Cancel</button>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Editrecipient;
