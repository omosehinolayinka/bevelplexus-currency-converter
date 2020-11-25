import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./TransactionsTable.scss";

import EditModal from "../editRecipientModal/EditRecipient";

import PaymentContext from '../../context/payment/paymentContext'
import RecipientContext from "../../context/recipients/recipientContext";

function RecipientsTable() {
  const paymentContext = useContext(PaymentContext);
  const recipientContext = useContext(RecipientContext);

  const [showEditModal, setShowEditModal] = useState(false);
  const [recipient, setrecipient] = useState(null);

  const editrecipient = (recipient) => {
    setrecipient(recipient);

    setShowEditModal(true);
  };

  const selectRecipient = (data) => {
    paymentContext.setCurrentRecipient(data);
  }

  return (
    <div id='transaction-table' className='recipients-table'>
      <table className='mod-width'>
        <colgroup>
          <col style={{ width: "30%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "22%" }} />
          <col style={{ width: "30%" }} />
        </colgroup>

        <tbody className='table-alt'>
          {recipientContext.state.recipients.map((data) => (
            <React.Fragment key={data.id}>
              <tr className='collapsed'>
                <td>
                  <div>
                    <section>
                      <img
                        src='/assets/svg/avatar.svg'
                        alt='avatar'
                        className='avatar-img'
                      />
                      {/* <img
                        src='/assets/svg/brazil-flag.svg'
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
                      May 17th 2020
                      <small>Last transaction date</small>
                    </p>
                  </div>
                </td>

                <td>
                  <div>
                    <p>
                      <span className='icon-wrap'>
                        <span>1000 CAD</span>
                        <span className='material-icons'>arrow_right</span>
                        <span>3900 BRL</span>
                      </span>
                      <small>Last transaction amount</small>
                    </p>
                  </div>
                </td>

                <td>
                  <div>
                    <button
                      className='primary transparent'
                      onClick={() => editrecipient(data)}
                      style={{
                        width: "48%",
                        height: "100%",
                        padding: ".7rem 0",
                      }}
                    >
                      <Link to='#'>Edit</Link>
                    </button>
                    <button
                      className='primary'
                      style={{
                        width: "48%",
                        height: "100%",
                        padding: ".7rem 0",
                      }}
                    >
                      <Link onClick={() => selectRecipient(data)} to='/payment'>Send Money</Link>
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
