import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./PaymentRecipient.scss";

import Layout from "../../components/layout/Layout";
import AddModal from "../../components/addRecipientModal/AddRecipientModal";
import EditModal from "../../components/editRecipientModal/EditRecipient";

import PaymentContext from "../../context/payment/paymentContext";
import RecipientContext from "../../context/recipients/recipientContext";
import UserContext from "../../context/user/userContext";

import { Tooltip, Select } from "antd";
import dateFormat from "dateformat";

function Paymentrecipient({ showTips }) {
  const paymentContext = useContext(PaymentContext);
  const recipientContext = useContext(RecipientContext);
  const userContext = useContext(UserContext);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [chooseInstitution, setChooseInstitution] = useState(false);

  const transactionType = paymentContext.state.transactionType;
  const allRecipients = recipientContext.state.recipients;
  const currentRecipient = paymentContext.state.recipient;

  const institution = paymentContext.state.institution;

  const { Option } = Select;

  const tooltipStyle = {
    display: "flex",
    alignItems: "flex-start"
  };

  const text = (
    <div style={tooltipStyle}>
      <img
        src="./assets/svg/info-alt.svg"
        alt="icon"
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
    recipientContext.getRecipients({
      offset: 0,
      limit: 1000
    });

    if (userContext.state.user.userType === "Student") {
      const institutionId =
        userContext.state.user.studentAccountDetail.institutionId;
      paymentContext.getInstitution(institutionId);
    }

    // eslint-disable-next-line
  }, []);

  const onChange = (value, name) => {
    paymentContext.setCurrentRecipient(name.name);
  };

  return (
    <div id="payment-recipient">
      <Layout currentMenu="payment" payProgress="1" showTips={showTips}>
        <div className="page-title">
          <h1>Select Recipient</h1>
        </div>
        <div className="section-one">
          <div className="section-title">
            {transactionType === "Individual" ? (
              <p>Choose the transaction type</p>
            ) : (
              ""
            )}
          </div>

          <div className="box-container">
            <div
              className={
                transactionType === "Individual"
                  ? "shadow-box shadow-box-highlight"
                  : "shadow-box"
              }
              onClick={() => {
                paymentContext.setTransactionType("Individual");
                setChooseInstitution(false);
              }}
            >
              <img src="./assets/svg/recipient.svg" alt="recipient" />
              <p>To Individual</p>
            </div>

            {userContext.state.user.userType === "Student" && (
              <div
                className={
                  transactionType === "Tuition"
                    ? "shadow-box shadow-box-highlight"
                    : "shadow-box"
                }
                onClick={() => {
                  paymentContext.setTransactionType("Tuition");
                  setChooseInstitution(true);
                }}
              >
                <img src="./assets/svg/school.svg" alt="school" />
                <p>Tuition Payment</p>
              </div>
            )}
          </div>
        </div>

        <div className="section-two">
          {transactionType === "Individual" && (
            <React.Fragment>
              <div className="section-title">
                <p>Select Your Recipient</p>
              </div>
              <div className="box-container">
                <div className="shadow-box">
                  <img src="./assets/svg/contact.svg" alt="contact" />
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select Recipient"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={true}
                    defaultValue={paymentContext.state.recipient.name}
                  >
                    {allRecipients.map((recipient) => (
                      <Option
                        value={recipient.id}
                        key={recipient.id}
                        name={recipient}
                      >
                        {recipient.name}
                        <img
                          src="./assets/svg/green-check-alt.svg"
                          alt="check"
                        />
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="side-link">
                  <Link to="#">
                    <div onClick={() => setShowAddModal(true)}>
                      Add A New Recipient
                    </div>
                    <Tooltip placement="bottomRight" title={text}>
                      <span className="material-icons"> error_outline</span>
                    </Tooltip>
                  </Link>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>

        <div className="section-divider"></div>

        <div className="section-three">
          <div className="section-title">
            {transactionType === "Individual" ? (
              <p>Recipient's Profile</p>
            ) : (
              <p>Institution Details</p>
            )}
          </div>

          <div className="box-container">
            {transactionType === "Individual" &&
            currentRecipient.name === null ? (
              <div className="shadow-box error-notice small">
                <i className="fas fa-ghost"></i>
                <p>No recipient selected</p>
              </div>
            ) : (
              <div className="shadow-box">
                <div className="action">
                  {transactionType === "Individual" ? (
                    <Link to="#" onClick={() => setShowEditModal(true)}>
                      Edit
                    </Link>
                  ) : (
                    <Link to="#" className="spacer">
                      spacer
                    </Link>
                  )}
                </div>

                <div className="user-details">
                  <div className="user-details__avi">
                    <img
                      src={
                        transactionType === "Individual"
                          ? "./assets/img/avatar-square.png"
                          : "./assets/svg/institution.svg"
                      }
                      alt="avi"
                    />
                    {/* <img
                      src='./assets/svg/brazil-flag.svg'
                      alt='flag'
                      className='user-details__avi__flag'
                    /> */}
                  </div>
                  <span className="user-details__text-wrapper">
                    <h3>
                      {transactionType === "Individual"
                        ? currentRecipient.name
                        : institution.name}
                    </h3>
                    <p>
                      {transactionType === "Individual"
                        ? currentRecipient.email
                        : userContext.state.user.studentAccountDetail
                            .studentEmail}
                    </p>
                  </span>
                </div>

                <div className="contact-details">
                  <p>
                    <img src="./assets/svg/smartphone.svg" alt="smartphone" />
                    {transactionType === "Individual"
                      ? currentRecipient.phoneNumber
                      : userContext.state.user.studentAccountDetail
                          .studentNumber}
                  </p>

                  {transactionType === "Individual" ? (
                    <React.Fragment>
                      <p>
                        <img src="./assets/svg/world.svg" alt="world" />
                        {currentRecipient.location}
                      </p>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <p>
                        <img src="./assets/svg/student.svg" alt="world" />
                        {dateFormat(
                          userContext.state.user.studentAccountDetail
                            .yearOfGraduation,
                          "mmmm dS, yyyy"
                        )}
                      </p>

                      <p>
                        <img src="./assets/svg/world.svg" alt="world" />
                        {institution.country.name}
                      </p>

                      <p>
                        <img src="./assets/svg/location.svg" alt="world" />
                        {institution.city}
                      </p>
                    </React.Fragment>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="section-four">
          <Link to="/payment">
            <button className="left inactive">Cancel</button>
          </Link>
          <Link
            to={!currentRecipient ? "#" : "/payment/transfer"}
            className={!currentRecipient ? "disabled" : ""}
          >
            <button
              className="right"
              onClick={() => {
                if (chooseInstitution) {
                  paymentContext.setCurrentRecipient(institution);
                } else {
                  return;
                }
                // chooseInstitution ? paymentContext.setCurrentRecipient(currentRecipient) : '';
              }}
            >
              Next
            </button>
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
