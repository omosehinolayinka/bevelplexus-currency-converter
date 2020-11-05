import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./TransactionsTable.scss";

import EditModal from "../editRecipentModal/EditRecipent";

function RecipentsTable() {
  const [showEditModal, setShowEditModal] = useState(false);

  const tableData = [
    {
      key: 1,
      avatar: "/assets/svg/institution.svg",
      name: "Phillip Mango",
      email: "phillipmango@gmail.com",
      sendAmount: "1000",
      sendCurrency: "CAD",
      sendCurrencyFlag: "/assets/svg/canada-flag.svg",
      receiveAmount: "3900",
      receiveCurrency: "BRL",
      receiveCurrencyFlag: "/assets/svg/brazil-flag.svg",
      date: "Jun 6th 2020",
      status: "completed",
      exchangeRate: "3.90",
      amountBF: "1000",
      amountAF: "970",
      link: "/payment",
    },

    {
      key: 2,
      avatar: "/assets/svg/institution.svg",
      name: "Phillip Mango",
      email: "phillipmango@gmail.com",
      sendAmount: "1000",
      sendCurrency: "CAD",
      sendCurrencyFlag: "/assets/svg/canada-flag.svg",
      receiveAmount: "3900",
      receiveCurrency: "BRL",
      receiveCurrencyFlag: "/assets/svg/brazil-flag.svg",
      date: "Jun 1st 2020",
      status: "completed",
      exchangeRate: "3.90",
      amountBF: "1000",
      amountAF: "970",
      link: "/payment",
    },
    {
      key: 3,
      avatar: "/assets/svg/institution.svg",
      name: "Erin Culhane",
      email: "ericculhane@gmail.com",
      sendAmount: "1000",
      sendCurrency: "CAD",
      sendCurrencyFlag: "/assets/svg/canada-flag.svg",
      receiveAmount: "3900",
      receiveCurrency: "BRL",
      receiveCurrencyFlag: "/assets/svg/brazil-flag.svg",
      date: "May 17th 2020",
      status: "pending",
      exchangeRate: "3.90",
      amountBF: "1000",
      amountAF: "970",
      link: "/payment",
    },
    {
      key: 4,
      avatar: "/assets/svg/institution.svg",
      name: "Erin Culhane",
      email: "ericculhane@gmail.com",
      sendAmount: "1000",
      sendCurrency: "CAD",
      sendCurrencyFlag: "/assets/svg/canada-flag.svg",
      receiveAmount: "3900",
      receiveCurrency: "BRL",
      receiveCurrencyFlag: "/assets/svg/brazil-flag.svg",
      date: "May 17th 2020",
      status: "cancelled",
      exchangeRate: "3.90",
      amountBF: "1000",
      amountAF: "970",
      link: "/payment",
    },
  ];

  return (
    <div id='transaction-table' className='recipents-table'>
      <table className='mod-width'>
        <colgroup>
          <col style={{ width: "30%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "22%" }} />
          <col style={{ width: "30%" }} />
        </colgroup>

        <tbody className='table-alt'>
          {tableData.map((data) => (
            <React.Fragment key={data.key}>
              <tr className='collapsed'>
                <td>
                  <div>
                    <section>
                      <img src={data.avatar} alt='avatar' className='avatar-img' />
                      <img src={data.receiveCurrencyFlag} alt='' className='img-attachment' />
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
                      {data.date}
                      <small>Last transaction date</small>
                    </p>
                  </div>
                </td>

                <td>
                  <div>
                    <p>
                      <span className='icon-wrap'>
                        <span>
                          {" "}
                          {data.sendAmount} {data.sendCurrency}{" "}
                        </span>
                        <span className='material-icons'>arrow_right</span>
                        <span>
                          {" "}
                          {data.receiveAmount} {data.receiveCurrency}{" "}
                        </span>
                      </span>
                      <small>Last transaction amount</small>
                    </p>
                  </div>
                </td>

                <td>
                  <div>
                    <button
                      className='primary transparent'
                      onClick={() => setShowEditModal(true)}
                      style={{
                        width: "48%",
                        height: "100%",
                        padding: ".7rem 0",
                      }}
                    >
                      <Link to='#' >Edit</Link>
                    </button>
                    <button
                      className='primary'
                      style={{
                        width: "48%",
                        height: "100%",
                        padding: ".7rem 0",
                      }}
                    >
                      <Link to={data.link}>Send Money</Link>
                    </button>
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {showEditModal && <EditModal action={setShowEditModal} />}
    </div>
  );
}

export default RecipentsTable;
