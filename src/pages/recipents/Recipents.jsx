import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../transactionHistory/TransactionHistory.scss";
import "./Recipents.scss";

import Layout from "../../components/layout/Layout";
import Table from "../../components/tables/RecipentsTable";
import Pagination from "../../components/pagination/Pagination";
import AddModal from "../../components/addRecipentModal/AddRecipent";

import RecipentContext from "../../context/recipents/recipentContext";

function TransactionHistory({ showTips }) {
  const [showAddModal, setShowAddModal] = useState(false);

  const recipentContext = useContext(RecipentContext);

  useEffect(() => {
    recipentContext.getRecipents();

    // eslint-disable-next-line
  }, []);

  return (
    <div id='recipents'>
      <Layout currentMenu='recipents' showTips={showTips}>
        <div className='page-header'>
          <div className='page-title'>
            <h4>Transactions</h4>
          </div>

          <div className='content-title'>
            <h2>
              Your recipents (5)
              <div className='side-link' onClick={() => setShowAddModal(true)}>
                <Link to='#'>Add new recipent</Link>
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
          <Table data={recipentContext.state.recipents} />
        </div>

        <Pagination />
      </Layout>

      {showAddModal && <AddModal action={setShowAddModal} />}
    </div>
  );
}

export default TransactionHistory;
