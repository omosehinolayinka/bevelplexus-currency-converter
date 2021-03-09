import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.scss";

import Layout from "../../components/layout/LayoutAlt";
import TransactionTable from "../../components/tables/TransactionsTable";
import LastTransaction from "./LastTransaction";

import TransactionContext from "../../context/transactions/transactionContext";

function Dashboard({ showTips }) {
  const transactionContext = useContext(TransactionContext);

  const total = () => {
    let amount = 0;

    transactionContext.state.transactions.forEach((item) => {
      amount += item.baseAmount;
    });

    return amount;
  };

  return (
    <div id='dashboard'>
      <Layout currentMenu='dashboard' showTips={showTips}>
        <div className='page-title'>
          <h1>DASHBOARD</h1>
        </div>

        <div className='shadow-box box-one'>
          <div className='box-one__title'>
            <h2>Send Again</h2>
          </div>

          {transactionContext.state.transactions.length > 0 ? (
            <LastTransaction data={transactionContext.state.transactions} />
          ) : (
            <p className='empty-text'>Your last transaction will appear here</p>
          )}
        </div>

        <div className='box-container double-box-container'>
          {/* <div className="shadow-box box-two">
            <div className="icon-container">
              <img src="/assets/svg/wallet-icon-alt.svg" alt="walllet"/>
            </div>

            <div className="box-two__text-wrapper">
              <p>AVAILABLE CREDIT</p>
              <h4>13,750.00 NGL</h4>
            </div>
          </div> */}

          <div className='shadow-box box-three' style={{ width: "100%" }}>
            <div className='icon-container'>
              <img
                src='./assets/svg/transaction-icon-alt.svg'
                alt='transaction'
              />
            </div>

            <div className='box-three__text-wrapper'>
              <p>TOTAL TRANSACTIONS</p>
              <h4>{total().toLocaleString()} NGL</h4>
            </div>
          </div>
        </div>

        <div className='shadow-box box-four'>
          <div className='box-four__title'>
            <h2>
              Recent Transactions
              <Link to='/transactions'>View All</Link>
            </h2>
          </div>

          <div className='box-one__content'>
            {transactionContext.state.transactions.length > 0 ? (
              <TransactionTable data={transactionContext.state.transactions} />
            ) : (
              <p className='empty-text' style={{ marginTop: "1rem" }}>
                You have not made any transactions yet
              </p>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Dashboard;
