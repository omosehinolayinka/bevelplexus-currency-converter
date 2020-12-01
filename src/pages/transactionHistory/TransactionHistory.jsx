import React, { useContext, useEffect } from "react";
import "./TransactionHistory.scss";

import { Pagination } from "antd";

import Layout from "../../components/layout/Layout";
import Table from '../../components/tables/TransactionTableAlt'
// import Pagination from '../../components/pagination/Pagination'

import TransactionContext from '../../context/transactions/transactionContext'

function TransactionHistory({showTips}) {

  const transactionContext = useContext(TransactionContext);

  useEffect(() => {
    transactionContext.getTransactions(transactionContext.state.page);

    // eslint-disable-next-line
  }, [])


  const changePage = (page) => {
    const limit = page * 5

    const values = {
      offset: limit - 5,
      limit: limit
    }

    transactionContext.changePage(values)
  }

  
  return (
    <div id='transaction-history'>
      <Layout currentMenu='transaction' showTips={showTips}>
        <div className='page-header'>
          <div className='page-title'>
            <h4>Transactions</h4>
          </div>

          <div className='content-title'>
            <h2>Your Transactions {`(${transactionContext.state.total})`} </h2>

            <form>
              <label>
                <span className='material-icons'>search</span>
                <input type='text' placeholder='Search' />
              </label>
            </form>
          </div>
        </div>

        <div className="table-container">
          <Table data={transactionContext.state.transactions} />
        </div>

        <div className='pagination_container'>
          <Pagination
            defaultCurrent={1}
            total={transactionContext.state.total || 1}
            defaultPageSize={5}
            onChange={changePage}
          />
        </div>

        {/* <Pagination /> */}
      </Layout>
    </div>
  );
}

export default TransactionHistory;
