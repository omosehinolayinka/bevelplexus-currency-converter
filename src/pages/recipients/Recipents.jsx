import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../transactionHistory/TransactionHistory.scss";
import "./Recipients.scss";

import { Pagination } from "antd";

import Layout from "../../components/layout/Layout";
import Table from "../../components/tables/RecipientsTable";
import AddModal from "../../components/addRecipientModal/AddRecipientModal";

import RecipientContext from "../../context/recipients/recipientContext";

function TransactionHistory({ showTips }) {
  const [showAddModal, setShowAddModal] = useState(false);

  const recipientContext = useContext(RecipientContext);

  useEffect(() => {
    recipientContext.getRecipients(recipientContext.state.page);

    // eslint-disable-next-line
  }, []);

  const changePage = (page) => {
    const limit = page * 5;

    const values = {
      offset: limit - 5,
      limit: limit,
    };

    recipientContext.changePage(values);
  };

  return (
    <div id='recipients'>
      <Layout currentMenu='recipients' showTips={showTips}>
        <div className='page-header'>
          <div className='page-title'>
            <h4>Transactions</h4>
          </div>

          <div className='content-title'>
            <h2>
              Your recipients ({recipientContext.state.total || "0"})
              <div className='side-link' onClick={() => setShowAddModal(true)}>
                <Link to='#'>Add new recipient</Link>
              </div>
            </h2>

            {/* <form>
              <label>
                <span className='material-icons'>search</span>
                <input type='text' placeholder='Search' />
              </label>
            </form> */}
          </div>
        </div>

        <div className='table-container'>
          {recipientContext.state.recipients.length !== 0 ? (
            <Table />
          ) : (
            <div className='shadow-box error-notice small transparent' >
              <i class='fas fa-ghost'></i>
              <p>You haven't added any recipients</p>
            </div>
          )}
        </div>

        <div className='pagination_container'>
          <Pagination
            defaultCurrent={1}
            total={recipientContext.state.total || 1}
            defaultPageSize={5}
            onChange={changePage}
          />
        </div>
        {/* <Pagination context={recipientContext} /> */}
      </Layout>

      {showAddModal && <AddModal action={setShowAddModal} />}
    </div>
  );
}

export default TransactionHistory;
