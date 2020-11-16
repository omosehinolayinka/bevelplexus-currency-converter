import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PaymentRecipent.scss";

import Layout from "../../components/layout/Layout";
import AddModal from '../../components/addRecipentModal/AddRecipent'
import EditModal from "../../components/editRecipentModal/EditRecipent";

import { Tooltip, Select } from "antd";

function PaymentRecipent({ showTips }) {
  const [payType, setPayType] = useState("individual");
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false);

  const { Option } = Select;

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  const tooltipStyle = {
    display: "flex",
    alignItems: "flex-start",
  };

  const text = (
    <div style={tooltipStyle}>
      <img
        src='/assets/svg/info-alt.svg'
        alt='icon'
        style={{ margin: "5px 12px 0 0" }}
      />
      <p style={{ marginBottom: "0", fontSize: "13px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec est
        ligula, accumsan nec fermentum nec, vulputate et tellus. In non tellus
        et erat dapibus aliquet.
      </p>
    </div>
  );

  return (
    <div id='payment-recipent'>
      <Layout currentMenu='payment' payProgress='1' showTips={showTips}>
        <div className='page-title'>
          <h1>Select Recipent</h1>
        </div>

        <div className='section-one'>
          <div className='section-title'>
            <p>Choose the transaction type</p>
          </div>

          <div className='box-container'>
            <div
              className={
                payType === "individual"
                  ? "shadow-box shadow-box-highlight"
                  : "shadow-box"
              }
              onClick={() => setPayType("individual")}
            >
              <img src='/assets/svg/recipent.svg' alt='recipent' />
              <p>To Individual</p>
            </div>
            <div
              className={
                payType === "tuition"
                  ? "shadow-box shadow-box-highlight"
                  : "shadow-box"
              }
              onClick={() => setPayType("tuition")}
            >
              <img src='/assets/svg/school.svg' alt='school' />
              <p>Tuition Payment</p>
            </div>
          </div>
        </div>

        <div className='section-two'>
          <div className='section-title'>
            <p>Choose your recipent</p>
          </div>

          <div className='box-container'>
            <div className='shadow-box'>
              <img src='/assets/svg/contact.svg' alt='contact' />
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder='Select recipent'
                optionFilterProp='children'
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value='jack'>
                  Phillip Mango
                  <img src='/assets/svg/green-check-alt.svg' alt='check' />
                </Option>
                <Option value='lucy'>
                  Ellie Jean
                  <img src='/assets/svg/green-check-alt.svg' alt='check' />
                </Option>
                <Option value='tom'>
                  Oreva Daniels
                  <img src='/assets/svg/green-check-alt.svg' alt='check' />
                </Option>
              </Select>
            
            </div>

            <div className='side-link'>
              <Link to='#'>
                <div onClick={() => setShowAddModal(true)}> 
                  Add new recipent
                </div>
                <Tooltip placement='bottomRight' title={text}>
                  <span className='material-icons'> error_outline</span>
                </Tooltip>
              </Link>
            </div>
          </div>
        </div>

        <div className='section-divider'></div>

        <div className='section-three'>
          <div className='section-title'>
            <p>Profile Recipent</p>
          </div>

          <div className='box-container'>
            <div className='shadow-box'>
              <div className='action'>
                <Link to='#' onClick={() => setShowEditModal(true)}>
                  Edit
                </Link>
              </div>

              <div className='user-details'>
                <div className='user-details__avi'>
                  <img
                    src={
                      payType === "individual"
                        ? "/assets/img/avatar-square.png"
                        : "/assets/svg/institution.svg"
                    }
                    alt='avi'
                  />
                  <img
                    src='/assets/svg/brazil-flag.svg'
                    alt=''
                    className='user-details__avi__flag'
                  />
                </div>
                <span className='user-details__text-wrapper'>
                  <h3>
                    {payType === "individual"
                      ? "Phillip Mango"
                      : "Toronto School"}
                  </h3>
                  <p>
                    {payType === "individual"
                      ? "phillipmango@email.com"
                      : "contact@ubc.com"}
                  </p>
                </span>
              </div>

              <div className='contact-details'>
                <p>
                  <img src='/assets/svg/smartphone.svg' alt='smartphone' />
                  +1 610 435 6354
                </p>

                {payType === "individual" ? (
                  <React.Fragment>
                    <p>
                      <img src='/assets/svg/world.svg' alt='world' />
                      Canada
                    </p>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <p>
                      <img src='/assets/svg/student.svg' alt='world' />
                      2.512
                    </p>

                    <p>
                      <img src='/assets/svg/world.svg' alt='world' />
                      Canada
                    </p>

                    <p>
                      <img src='/assets/svg/location.svg' alt='world' />
                      255 Wellington St W, Toronto, M5V 3P6
                    </p>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='section-four'>
          <Link to='/'>
            <button className='left inactive'>Cancel</button>
          </Link>
          <Link to='/payment/transfer'>
            <button className='right'>Next</button>
          </Link>
        </div>
      </Layout>

      {showEditModal && <EditModal action={setShowEditModal} />}
      {showAddModal && <AddModal action={setShowAddModal} />}
    </div>
  );
}

export default PaymentRecipent;
