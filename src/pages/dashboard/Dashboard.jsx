import React, { useEffect, useContext } from "react";
import { Link } from 'react-router-dom'
import "./Dashboard.scss";

import Layout from "../../components/layout/LayoutAlt";
import TransactionTable from '../../components/tables/TransactionsTable'

import RecipentContext from '../../context/recipents/recipentContext'

function Dashboard({showTips}) {
  const recipentContext = useContext(RecipentContext);

  useEffect(() => {
    fetch('https://bp-user.herokuapp.com/graphql', {
      method: "POST",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        query: `
          mutation login {
            login(loginArgs: {
              email: "ashtoonsandgraphics@gmail.com",
              password: "12345678"
            }) {
              token,
              user {
                id,
                firstName,
                email,
              }
            }
          }
        `
      })
    })
    .then(res => res.json())
    .then(data => {
      const login = data.data.login;

      localStorage.setItem("token", login.token);
      localStorage.setItem("userId", login.user.id);
    })
    .then(() => {
      recipentContext.getRecipents();
    })
    .catch(err => console.log(err))

  }, [])

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

          <div className='box-one__content'>
            <div className='user-details'>
              <div className='user-details__avi'>
                <img src='/assets/img/avatar-square.png' alt='avi' />
                <img src="/assets/svg/brazil-flag.svg" alt="" className="user-details__avi__flag"/>
              </div>
              <span className='box-one__text-wrapper'>
                <h3>Phillip Mango</h3>
                <p>phillipmango@email.com</p>
              </span>
            </div>

            <div className="box-one__text-wrapper alt">
              <h3>
                <span>1000 CAD</span>
                <span className='material-icons'>arrow_right</span>
                <span>3900 BRL</span>
              </h3>
              <p>Last Transaction</p>
            </div>

            <div className="box-one__cta">
              <Link to='/payment'><button>Send Money</button></Link>
            </div>
          </div>
        </div>

        <div className="box-container double-box-container">
          <div className="shadow-box box-two">
            <div className="icon-container">
              <img src="/assets/svg/wallet-icon-alt.svg" alt="walllet"/>
            </div>

            <div className="box-two__text-wrapper">
              <p>AVAILABLE CREDIT</p>
              <h4>13,750.00 NGL</h4>
            </div>
          </div>

          <div className="shadow-box box-three">
            <div className="icon-container">
              <img src="/assets/svg/transaction-icon-alt.svg" alt="transaction"/>
            </div>

            <div className="box-three__text-wrapper">
              <p>TOTAL TRANSACTIONS</p>
              <h4>1,133,750.00 NGL</h4>
            </div>
          </div>
        </div>

        <div className="shadow-box box-four">
          <div className='box-four__title'>
            <h2>
              Recent Transactions
              <Link to='/transactions'>View All</Link>
            </h2>
          </div>

          <div className="box-one__content">
            <TransactionTable />
          </div>
        </div>

      </Layout>
    </div>
  );
}

export default Dashboard;
