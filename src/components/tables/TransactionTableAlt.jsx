import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TransactionsTable.scss";
import dateFormat from "dateformat";

import { getBadge } from '../../helpers/transactionBadge';

function TransactionsTable({ data }) {

  const [expanded, setExpanded] = useState("");

  const toggleTableRow = (row) => {
    expanded === row ? setExpanded("") : setExpanded(row);
  };

  dateFormat.masks.custom = "dd/mm/yyyy";
  

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
            <React.Fragment key={data.id}>
              <tr className={expanded === data.id ? "expanded" : "collapsed"}>
                <td>
                  <div>
                    <section>
                      <img
                        src={
                          data.transactionType === "Individual"
                            ? "./assets/svg/avatar.svg"
                            : "./assets/svg/institution.svg"
                        }
                        alt='avatar'
                        className='avatar-img'
                      />
                      <img
                        src={`https://www.countryflags.io/${data.destinationCurrency
                          .slice(0, 2)
                          .toLowerCase()}/flat/24.png`}
                        alt='currency flag'
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
                      <small>Transaction date</small>
                    </p>
                  </div>
                </td>

                <td>
                  <div>
                    <p>
                      <span className='icon-wrap'>
                        <span>
                          {" "}
                          {data.baseAmount.toLocaleString()} {data.sendCurrency}{" "}
                        </span>
                        <span className='material-icons'>arrow_right</span>
                        <span>
                          {" "}
                          {data.convertedAmount.toLocaleString()} {data.destinationCurrency}{" "}
                        </span>
                      </span>
                      <small>Last transaction amount</small>
                    </p>
                  </div>
                </td>

                <td>
                  <div>
                    <span className={getBadge(data.status).badge}>
                      {getBadge(data.status).status}
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
                          />{" "}
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
