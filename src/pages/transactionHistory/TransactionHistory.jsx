import React from "react";
import "./TransactionHistory.scss";

import Layout from "../../components/layout/Layout";
import Table from '../../components/tables/TransactionTableAlt'
import Pagination from '../../components/pagination/Pagination'

function TransactionHistory({showTips}) {
  return (
    <div id='transaction-history'>
      <Layout currentMenu='transaction' showTips={showTips}>
        <div className='page-header'>
          <div className='page-title'>
            <h4>Transactions</h4>
          </div>

          <div className='content-title'>
            <h2>Your Transactions (5)</h2>

            <form>
              <label>
                <span className='material-icons'>search</span>
                <input type='text' placeholder='Search' />
              </label>
            </form>
          </div>
        </div>

        <div className="table-container">
          <Table />
        </div>

        <Pagination />
      </Layout>
    </div>
  );
}

export default TransactionHistory;
