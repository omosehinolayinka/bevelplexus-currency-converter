import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../transactionHistory/TransactionHistory.scss";
import "./Recipients.scss";

import Layout from "../../components/layout/Layout";
import Table from "../../components/tables/RecipientsTable";
import Pagination from "../../components/pagination/Pagination";
import AddModal from "../../components/addRecipientModal/AddRecipientModal";

import RecipientContext from "../../context/recipients/recipientContext";

function TransactionHistory({ showTips }) {
  const [showAddModal, setShowAddModal] = useState(false);

  const recipientContext = useContext(RecipientContext);

  useEffect(() => {
    recipientContext.getRecipients();

    // eslint-disable-next-line
  }, []);

  return (
    <div id='recipients'>
      <Layout currentMenu='recipients' showTips={showTips}>
        <div className='page-header'>
          <div className='page-title'>
            <h4>Transactions</h4>
          </div>

          <div className='content-title'>
            <h2>
              Your recipients (5)
              <div className='side-link' onClick={() => setShowAddModal(true)}>
                <Link to='#'>Add new recipient</Link>
              </div>
            </h2>

            <form>
              <label>
                <span className='material-icons'>search</span>
                <input type='text' placeholder='Search' />
              </label>
            </form>
          </div>
        </div>

        <div className='table-container'>
          <Table />
        </div>

        <Pagination />
      </Layout>

      {showAddModal && <AddModal action={setShowAddModal} />}
    </div>
  );
}

export default TransactionHistory;
