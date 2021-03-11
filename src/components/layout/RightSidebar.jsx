import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./RightSidebar.scss";

import Calculator from "../currencyCalc/CurrencyCalc";

import UserContext from "../../context/user/userContext";

import { Dropdown, Tooltip, Button } from "antd";

function RightSidebar({ collapsed, collapseRightSidebar }) {
  const userContext = useContext(UserContext);

  const logout = () => {
    window.location = process.env.REACT_APP_BASEURL || "https://app.bevelplexus.com";
  }

  const {
    isEmailVerified,
    isIdentityVerified,
    isPhoneNumberVerified,
    isSchoolEnrollmentVerified,
    isUtilityBillVerified,
  } = userContext.state.user.userVerification;

  const getRegularVerification = () => {
    let status = 0;

    const verification = [
      isEmailVerified,
      isPhoneNumberVerified,
      isIdentityVerified,
      isUtilityBillVerified,
    ];

    verification.forEach((item) => {
      item === true && status++;
    });

    switch (status) {
      case 0:
        return "0% VERIFIED";
      case 1:
        return "25% VERIFIED";
      case 2:
        return "50% VERIFIED";
      case 3:
        return "75% VERIFIED";
      case 4:
        return "100% VERIFIED";

      default:
        break;
    }
  };

  const getStudentVerification = () => {
    let status = 0;

    const verification = [
      isEmailVerified,
      isPhoneNumberVerified,
      isIdentityVerified,
      isUtilityBillVerified,
      isSchoolEnrollmentVerified,
    ];

    verification.forEach((item) => {
      item === true && status++;
    });

    switch (status) {
      case 0:
        return "0% VERIFIED";
      case 1:
        return "20% VERIFIED";
      case 2:
        return "40% VERIFIED";
      case 3:
        return "60% VERIFIED";
      case 4:
        return "80% VERIFIED";
      case 5:
        return "100% VERIFIED";

      default:
        break;
    }
  };

  const menu = (
    <div id='profile-dropdown'>
      <ul>
        <li>
          <Link to='/payment/account'>View my account</Link>
        </li>
        <li>
          <Link to='/payment/transactions'>Transaction history</Link>
        </li>
      </ul>

      <Link to="#" onClick={() => logout()} className='logout-link'>
        Logout
      </Link>
    </div>
  );

  // const notifications = (
  //   <div id='notifications-dropdown'>
  //     <div className='pointer'></div>
  //     <div className='top-border'></div>

  //     <ul>
  //       <li>
  //         <img src='assets/svg/greendot.svg' alt='' />
  //         <p>
  //           Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
  //           sint. Velit nostrud amet.
  //         </p>
  //       </li>

  //       <li>
  //         <img src='assets/svg/greendot.svg' alt='' />
  //         <p>
  //           Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
  //           sint. Velit
  //         </p>
  //       </li>

  //       <li>
  //         <img src='assets/svg/greendot.svg' alt='' />
  //         <p>
  //           Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
  //           sint. Velit
  //         </p>
  //       </li>

  //       <li>
  //         <img src='assets/svg/orangecheck.svg' alt='' />
  //         <p>
  //           Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
  //           sint. Velit
  //         </p>
  //       </li>

  //       <li>
  //         <img src='assets/svg/orangecheck.svg' alt='' />
  //         <p>
  //           Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
  //           sint. Velit
  //         </p>
  //       </li>
  //     </ul>
  //   </div>
  // );

  const tooltipStyle = {
    display: "flex",
    alignItems: "flex-start",
  };

  const text = (
    <div style={tooltipStyle}>
      <img
        src='./assets/svg/info-alt.svg'
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
    <section
      className={
        collapsed === true ? "r-sidebar-wrapper" : "r-sidebar-wrapper-closed"
      }
    >
      <div
        className='close-section'
        onClick={() => collapseRightSidebar(false)}
      ></div>

      <div
        className={
          collapsed === false
            ? "rightSidebar"
            : "rightSidebar rightSidebarExpanded"
        }
      >
        <div>
          <div className='header'>
            <button
              className='close-button'
              onClick={() => collapseRightSidebar(false)}
            >
              <span className='material-icons'>close</span>
            </button>

            <div className='right'>
              {/* <div className='notifications'>
                <Dropdown overlay={notifications} placement='bottomRight'>
                  <div>
                    <img
                      src='./assets/svg/bell-icon-light.svg'
                      alt='notifications'
                    />
                    <span></span>
                  </div>
                </Dropdown>
              </div> */}

              <Dropdown overlay={menu} placement='bottomRight' arrow>
                <Button>
                  <img
                    src='./assets/svg/avatar.svg'
                    alt='avi'
                    className='avatar'
                  />
                  <span className='profile-name'>
                    {userContext.state.user.firstName}{" "}
                    {userContext.state.user.lastName}{" "}
                  </span>
                  <span className='material-icons'>arrow_drop_down</span>
                </Button>
              </Dropdown>
            </div>
          </div>

          <section>
            <div className='calc-container'>
              <h2>Quick Currency Converter</h2>
              <Calculator />
            </div>

            <div className='mini-profile'>
              <div className='mini-profile__avatar'>
                <img src='assets/svg/ellipse-bcg.svg' alt='' />
                <img
                  src='assets/svg/ellipse-cover.svg'
                  alt=''
                  className='ellipse'
                />

                <img
                  src='assets/svg/ellipse-cover.svg'
                  alt=''
                  className='ellipse inverted'
                />
                <div className='avatar-container'>
                  <img
                    src='./assets/img/profileimage.png'
                    alt='avatar'
                    className='avatar'
                  />
                </div>
              </div>

              <div className='mini-profile__details'>
                <p>
                  {userContext.state.user.firstName}{" "}
                  {userContext.state.user.lastName}
                </p>
                <p>{userContext.state.user.email}</p>
              </div>

              <div className='mini-profile__notification'>
                {userContext.state.user.userType === "Regular" ? (
                  <span className='badge success'>
                    {getRegularVerification()}
                  </span>
                ) : (
                  <span className='badge success'>
                    {getStudentVerification()}
                  </span>
                )}
                <Tooltip placement='bottomRight' title={text}>
                  <span className='material-icons'>error_outline</span>
                </Tooltip>
              </div>
              <div className='mini-profile__cta'>
                <Link to='/account'>
                  {userContext.state.user.userType === "Regular" &&
                  getRegularVerification() === "100% VERIFIED" ? (
                    <button>View Profile</button>
                  ) : userContext.state.user.userType === "Regular" &&
                    getStudentVerification() === "100% VERIFIED" ? (
                    <button>View Profile</button>
                  ) : (
                    <button>Complete Your Profile</button>
                  )}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
