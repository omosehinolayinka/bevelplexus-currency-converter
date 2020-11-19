import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./PaymentRecipient.scss";

import Layout from "../../components/layout/Layout";
import AddModal from "../../components/addRecipientModal/AddRecipientModal";
import EditModal from "../../components/editRecipientModal/EditRecipient";

import PaymentContext from "../../context/payment/paymentContext";
import RecipientContext from "../../context/recipients/recipientContext";

import { Tooltip, Select } from "antd";

function Paymentrecipient({ showTips }) {
  const paymentContext = useContext(PaymentContext);
  const recipientContext = useContext(RecipientContext);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const transactionType = paymentContext.state.transactionType;
  const allRecipients = recipientContext.state.recipients;
  const currentRecipient = paymentContext.state.recipient;

  const { Option } = Select;

  const tooltipStyle = {
    display: "flex",
    alignItems: "flex-start",
  };

  const text = (
    <div style={tooltipStyle}>
      <img
        src='/assets/svg/info-alt.svg'
        alt='icon'
        style={{ margin: "5px 12px 0 0" }}
      />
      <p style={{ marginBottom: "0", fontSize: "13px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec est
        ligula, accumsan nec fermentum nec, vulputate et tellus. In non tellus
        et erat dapibus aliquet.
      </p>
    </div>
  );

  useEffect(() => {
    recipientContext.getRecipients();
    console.log(currentRecipient);

    // eslint-disable-next-line
  }, []);

  const onChange = (value, name) => {
    paymentContext.setCurrentRecipient(name.name);
  };

  return (
    <div id='payment-recipient'>
      <Layout currentMenu='payment' payProgress='1' showTips={showTips}>
        <div className='page-title'>
          <h1>Select recipient</h1>
        </div>

        <div className='section-one'>
          <div className='section-title'>
            <p>Choose the transaction type</p>
          </div>

          <div className='box-container'>
            <div
              className={
                transactionType === "individual"
                  ? "shadow-box shadow-box-highlight"
                  : "shadow-box"
              }
              onClick={() => paymentContext.setTransactionType("individual")}
            >
              <img src='/assets/svg/recipient.svg' alt='recipient' />
              <p>To Individual</p>
            </div>
            <div
              className={
                transactionType === "tuition"
                  ? "shadow-box shadow-box-highlight"
                  : "shadow-box"
              }
              onClick={() => paymentContext.setTransactionType("tuition")}
            >
              <img src='/assets/svg/school.svg' alt='school' />
              <p>Tuition Payment</p>
            </div>
          </div>
        </div>

        <div className='section-two'>
          <div className='section-title'>
            <p>Choose your recipient</p>
          </div>

          <div className='box-container'>
            <div className='shadow-box'>
              <img src='/assets/svg/contact.svg' alt='contact' />
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder='Select recipient'
                optionFilterProp='children'
                onChange={onChange}
                filterOption={true}
              >
                {allRecipients.map((recipient) => (
                  <Option
                    value={recipient.name}
                    key={recipient.id}
                    name={recipient}
                  >
                    {recipient.name}
                    <img src='/assets/svg/green-check-alt.svg' alt='check' />
                  </Option>
                ))}
              </Select>
            </div>

            <div className='side-link'>
              <Link to='#'>
                <div onClick={() => setShowAddModal(true)}>
                  Add new recipient
                </div>
                <Tooltip placement='bottomRight' title={text}>
                  <span className='material-icons'> error_outline</span>
                </Tooltip>
              </Link>
            </div>
          </div>
        </div>

        <div className='section-divider'></div>

        <div className='section-three'>
          <div className='section-title'>
            <p>Profile recipient</p>
          </div>

          <div className='box-container'>
            {transactionType === "individual" &&
            currentRecipient === undefined ? (
              <div className='shadow-box error-notice small'>
                <span class='material-icons'>not_interested</span>
                <p>No recipient selected</p>
              </div>
            ) : (
              <div className='shadow-box'>
                <div className='action'>
                  {transactionType === "individual" ? (
                    <Link to='#' onClick={() => setShowEditModal(true)}>
                      Edit
                    </Link>
                  ) : (
                    <Link to='#' className='spacer'>spacer</Link>
                  )}
                </div>

                <div className='user-details'>
                  <div className='user-details__avi'>
                    <img
                      src={
                        transactionType === "individual"
                          ? "/assets/img/avatar-square.png"
                          : "/assets/svg/institution.svg"
                      }
                      alt='avi'
                    />
                    <img
                      src='/assets/svg/brazil-flag.svg'
                      alt=''
                      className='user-details__avi__flag'
                    />
                  </div>
                  <span className='user-details__text-wrapper'>
                    <h3>
                      {transactionType === "individual"
                        ? currentRecipient.name
                        : "Toronto School"}
                    </h3>
                    <p>
                      {transactionType === "individual"
                        ? currentRecipient.email
                        : "contact@ubc.com"}
                    </p>
                  </span>
                </div>

                <div className='contact-details'>
                  <p>
                    <img src='/assets/svg/smartphone.svg' alt='smartphone' />
                    {transactionType === "individual"
                      ? currentRecipient.phoneNumber
                      : "+1 610 435 6364"}
                  </p>

                  {transactionType === "individual" ? (
                    <React.Fragment>
                      <p>
                        <img src='/assets/svg/world.svg' alt='world' />
                        {currentRecipient.location}
                      </p>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <p>
                        <img src='/assets/svg/student.svg' alt='world' />
                        2.512
                      </p>

                      <p>
                        <img src='/assets/svg/world.svg' alt='world' />
                        Canada
                      </p>

                      <p>
                        <img src='/assets/svg/location.svg' alt='world' />
                        255 Wellington St W, Toronto, M5V 3P6
                      </p>
                    </React.Fragment>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='section-four'>
          <Link to='/'>
            <button className='left inactive'>Cancel</button>
          </Link>
          <Link to={!currentRecipient ? '#' : '/payment/transfer'} className={!currentRecipient && 'disabled'}>
            <button className='right'>Next</button>
          </Link>
        </div>
      </Layout>

      {showEditModal && (
        <EditModal
          action={setShowEditModal}
          recipientState={currentRecipient}
        />
      )}
      {showAddModal && <AddModal action={setShowAddModal} />}
    </div>
  );
}

export default Paymentrecipient;
