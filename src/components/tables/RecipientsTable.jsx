import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./TransactionsTable.scss";

import dateFormat from "dateformat";

import EditModal from "../editRecipientModal/EditRecipient";

import PaymentContext from "../../context/payment/paymentContext";
import RecipientContext from "../../context/recipients/recipientContext";

function RecipientsTable() {
  const paymentContext = useContext(PaymentContext);
  const recipientContext = useContext(RecipientContext);

  const [showEditModal, setShowEditModal] = useState(false);
  const [recipient, setrecipient] = useState(null);

  dateFormat.masks.custom = "mmm dS yyyy";

  const editrecipient = (recipient) => {
    setrecipient(recipient);

    setShowEditModal(true);
  };

  const selectRecipient = (data) => {
    paymentContext.setCurrentRecipient(data);
  };

  return (
    <div id="transaction-table" className="recipients-table">
      <table className="mod-width">
        <colgroup>
          <col style={{ width: "30%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "22%" }} />
          <col style={{ width: "30%" }} />
        </colgroup>

        <tbody className="table-alt">
          {recipientContext.state.recipients.map((data) => (
            <React.Fragment key={data.id}>
              <tr className="collapsed">
                <td>
                  <div>
                    <section>
                      <img
                        src="./assets/svg/avatar.svg"
                        alt="avatar"
                        className="avatar-img"
                      />
                      {/* <img
                        src='./assets/svg/brazil-flag.svg'
                        alt=''
                        className='img-attachment'
                      /> */}
                    </section>
                    <p>
                      {data.name}
                      <small> {data.email} </small>
                    </p>
                  </div>
                </td>

                <td>
                  <div>
                    <p>
                      {data.transaction
                        ? dateFormat(data.transaction.createdAt, "custom")
                        : "No transactions"}
                      <small>Last transaction date</small>
                    </p>
                  </div>
                </td>

                <td>
                  <div>
                    <p>
                      {data.transaction ? (
                        <span className="icon-wrap">
                          <span>
                            {data.transaction.baseAmount}{" "}
                            {data.transaction.sendCurrency}
                          </span>
                          <span className="material-icons">arrow_right</span>
                          <span>
                            {data.transaction.convertedAmount}{" "}
                            {data.transaction.destinationCurrency}
                          </span>
                        </span>
                      ) : (
                        "No transactions"
                      )}
                      <small>Transaction amount</small>
                    </p>
                  </div>
                </td>

                <td>
                  <div>
                    <button
                      className="primary transparent"
                      onClick={() => editrecipient(data)}
                      style={{
                        width: "48%",
                        height: "100%",
                        padding: ".7rem 0"
                      }}
                    >
                      <Link to="#">Edit</Link>
                    </button>
                    <button
                      className="primary"
                      style={{
                        width: "48%",
                        height: "100%",
                        padding: ".7rem 0"
                      }}
                    >
                      <Link
                        onClick={() => selectRecipient(data)}
                        to="/payment/transfer"
                      >
                        Send Money
                      </Link>
                    </button>
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <EditModal action={setShowEditModal} recipientState={recipient} />
      )}
    </div>
  );
}

export default RecipientsTable;
