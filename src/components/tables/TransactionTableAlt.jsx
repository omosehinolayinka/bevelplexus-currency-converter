import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./TransactionsTable.scss";
import TransactionContext from '../../context/transactions/transactionContext'
import dateFormat from "dateformat";

function TransactionsTable( {data} ) {
  const transactionContext = useContext(TransactionContext)


  const [expanded, setExpanded] = useState("");

  const toggleTableRow = (row) => {
    expanded === row ? setExpanded("") : setExpanded(row);
  };

  dateFormat.masks.custom = 'dd/mm/yyyy';

  // const tableData = [
  //   {
  //     key: 1,
  //     avatar: "/assets/svg/avatar.svg",
  //     name: "Phillip Mango",
  //     email: "phillipmango@gmail.com",
  //     sendAmount: "1000",
  //     sendCurrency: "CAD",
  //     sendCurrencyFlag: "/assets/svg/canada-flag.svg",
  //     receiveAmount: "3900",
  //     receiveCurrency: "BRL",
  //     receiveCurrencyFlag: "/assets/svg/brazil-flag.svg",
  //     date: "Jun 6th 2020",
  //     status: "completed",
  //     exchangeRate: "3.90",
  //     amountBF: "1000",
  //     amountAF: "970",
  //     link: "#",
  //   },

  //   {
  //     key: 2,
  //     avatar: "/assets/svg/avatar.svg",
  //     name: "Phillip Mango",
  //     email: "phillipmango@gmail.com",
  //     sendAmount: "1000",
  //     sendCurrency: "CAD",
  //     sendCurrencyFlag: "/assets/svg/canada-flag.svg",
  //     receiveAmount: "3900",
  //     receiveCurrency: "BRL",
  //     receiveCurrencyFlag: "/assets/svg/brazil-flag.svg",
  //     date: "Jun 1st 2020",
  //     status: "completed",
  //     exchangeRate: "3.90",
  //     amountBF: "1000",
  //     amountAF: "970",
  //     link: "#",
  //   },
  //   {
  //     key: 3,
  //     avatar: "/assets/svg/avatar.svg",
  //     name: "Erin Culhane",
  //     email: "ericculhane@gmail.com",
  //     sendAmount: "1000",
  //     sendCurrency: "CAD",
  //     sendCurrencyFlag: "/assets/svg/canada-flag.svg",
  //     receiveAmount: "3900",
  //     receiveCurrency: "BRL",
  //     receiveCurrencyFlag: "/assets/svg/brazil-flag.svg",
  //     date: "May 17th 2020",
  //     status: "pending",
  //     exchangeRate: "3.90",
  //     amountBF: "1000",
  //     amountAF: "970",
  //     link: "#",
  //   },
  //   {
  //     key: 4,
  //     avatar: "/assets/svg/avatar.svg",
  //     name: "Erin Culhane",
  //     email: "ericculhane@gmail.com",
  //     sendAmount: "1000",
  //     sendCurrency: "CAD",
  //     sendCurrencyFlag: "/assets/svg/canada-flag.svg",
  //     receiveAmount: "3900",
  //     receiveCurrency: "BRL",
  //     receiveCurrencyFlag: "/assets/svg/brazil-flag.svg",
  //     date: "May 17th 2020",
  //     status: "cancelled",
  //     exchangeRate: "3.90",
  //     amountBF: "1000",
  //     amountAF: "970",
  //     link: "#",
  //   },
  // ];

  return (
    <div id='transaction-table'>
      <table className='mod-width'>
        <colgroup>
          <col style={{ width: "30%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>

        <tbody className='table-alt'>
          {data.map((data) => (
            <React.Fragment key={data.key}>
              <tr className={expanded === data.key ? "expanded" : "collapsed"}>
                <td>
                  <div>
                    <section>
                      <img src={data.transactionType === "Individual" ? "/assets/svg/avatar.svg" : "/assets/svg/institution.svg"} alt='avatar' className='avatar-img' />
                      <img
                        src="/assets/svg/canada-flag.svg"
                        alt=''
                        className='img-attachment'
                      />
                    </section>
                    <p>
                      {data.recipient.name}
                      <small> {data.recipient.email} </small>
                    </p>
                  </div>
                </td>

                <td>
                  <div>
                    <p>
                      {dateFormat(data.createdAt, "custom")}
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
                    <span
                      className={
                        data.status === "completed"
                          ? "badge success"
                          : data.status === "pending"
                          ? "badge warning"
                          : "badge danger"
                      }
                    >
                      {data.status.toUpperCase()}{" "}
                    </span>
                    <button
                      className='toggle'
                      onClick={() => toggleTableRow(data.key)}
                    >
                      <span className='material-icons'>
                        {expanded === data.key
                          ? "arrow_drop_up"
                          : "arrow_drop_down"}
                      </span>
                    </button>
                  </div>
                </td>
              </tr>

              {expanded === data.key && (
                <tr className='tr-extension'>
                  <td colSpan='4'>
                    <div className='tr-extension__content'>
                      <div className='col-one'>
                        <span className='flag'>
                          <img src={data.sendCurrencyFlag} alt='flag' />{" "}
                        </span>
                        <span className='material-icons'>arrow_right</span>
                        <span className='flag'>
                          <img src={data.receiveCurrencyFlag} alt='flag' />
                        </span>
                      </div>

                      <div className='col-two'>
                        <small>Exchange Rate</small>
                        <p> {data.exchangeRate} </p>
                      </div>

                      <div className='col-three'>
                        <small>Amount (Before Fee)</small>
                        <p>
                          {data.amountAF} {data.sendCurrency}
                        </p>
                      </div>

                      <div className='col-two'>
                        <small>Amount (After Fee)</small>
                        <p>
                          {data.amountAF} {data.sendCurrency}
                        </p>
                      </div>

                      <div className='col-five'>
                        <button>
                          <Link to={data.link}>View Details</Link>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;
