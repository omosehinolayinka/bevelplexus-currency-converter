import React, { useState, useEffect, useContext } from "react";
import "./TransactionsTable.scss";

import dateFormat from "dateformat";
import { getBadge } from '../../helpers/transactionBadge'

import TransactionContext from "../../context/transactions/transactionContext";

function TransactionsTable({ data }) {
  const [expanded, setExpanded] = useState("");

  const toggleTableRow = (row) => {
    expanded === row ? setExpanded("") : setExpanded(row);
  };

  dateFormat.masks.custom = "dd/mm/yy";

  const transactions = data.slice(0, 5);

  const transactionContext = useContext(TransactionContext);

  useEffect(() => {
    const page = {
      offset: 0,
      limit: 5,
    };

    transactionContext.getTransactions(page);

    // eslint-disable-next-line
  }, []);


  return (
    <div id='transaction-table'>
      <table>
        <colgroup>
          <col style={{ width: "30%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "12%" }} />
          <col style={{ width: "28%" }} />
        </colgroup>

        <thead>
          <tr>
            <td>RECIPIENT</td>
            <td>TRANSACTION</td>
            <td>DATE</td>
            <td>STATUS</td>
          </tr>
        </thead>

        <tbody>
          {transactions.map((data) => (
            <React.Fragment key={data.id}>
              <tr className={expanded === data.id ? "expanded" : "collapsed"}>
                <td>
                  <div>
                    <img
                      src={
                        data.transactionType === "Individual"
                          ? "./assets/svg/avatar.svg"
                          : "./assets/svg/institution.svg"
                      }
                      alt='avatar'
                    />
                    <p style={{ fontSize: "0.9rem" }}>
                      {" "}
                      {data.recipient.name}{" "}
                    </p>
                  </div>
                </td>

                <td>
                  <div>
                    <span style={{ fontSize: "0.8rem" }}>
                      {" "}
                      {data.baseAmount.toLocaleString()} {data.sendCurrency}{" "}
                    </span>
                    <span className='material-icons'>arrow_right</span>
                    <span style={{ fontSize: "0.8rem" }}>
                      {" "}
                      {data.convertedAmount.toLocaleString()} {data.destinationCurrency}{" "}
                    </span>
                  </div>
                </td>

                <td>
                  <div>
                    <span style={{ fontSize: "0.8rem" }}>
                      {" "}
                      {dateFormat(data.createdAt, "custom")}{" "}
                    </span>
                  </div>
                </td>

                <td>
                  <div>
                    <span
                      style={{ fontSize: "0.6rem" }}
                      className={getBadge(data.status).badge}
                    >
                      {getBadge(data.status).status.toUpperCase()}
                    </span>
                    <button
                      className='toggle'
                      onClick={() => toggleTableRow(data.id)}
                    >
                      <span className='material-icons'>
                        {expanded === data.id
                          ? "arrow_drop_up"
                          : "arrow_drop_down"}
                      </span>
                    </button>
                  </div>
                </td>
              </tr>

              {expanded === data.id && (
                <tr className='tr-extension'>
                  <td colSpan='4'>
                    <div className='tr-extension__content'>
                      <div className='col-one'>
                        <span className='flag'>
                          <img
                            src={`https://www.countryflags.io/${data.sendCurrency
                              .slice(0, 2)
                              .toLowerCase()}/flat/24.png`}
                            alt='flag'
                          />{" "}
                        </span>
                        <span className='material-icons'>arrow_right</span>
                        <span className='flag'>
                          <img
                            src={`https://www.countryflags.io/${data.destinationCurrency
                              .slice(0, 2)
                              .toLowerCase()}/flat/24.png`}
                            alt='flag'
                          />
                        </span>
                      </div>

                      <div className='col-two'>
                        <small>Exchange Rate</small>
                        <p> {data.rate.toLocaleString()} </p>
                      </div>

                      <div className='col-three'>
                        <small>Amount (Before Fee)</small>
                        <p>
                          {data.baseAmount.toLocaleString()} {data.sendCurrency}
                        </p>
                      </div>

                      <div className='col-two'>
                        <small>Amount (After Fee)</small>
                        <p>
                          {data.actualAmount.toLocaleString()} {data.sendCurrency}
                        </p>
                      </div>

                      {/* <div className='col-five'>
                        <button>
                          <Link to={data.link}>View Details</Link>
                        </button>
                      </div> */}
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
